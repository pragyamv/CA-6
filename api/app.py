from flask import Flask, request, jsonify
import os
import base64
import requests

import cv2, base64, string
from PIL import Image

from flask_cors import CORS

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = "static/uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024
app.config['UPLOAD_EXTENSIONS'] = ['.jpg', '.jpeg', '.png', '.webp']

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Image Classification API!"})

@app.route("/models", methods=["GET"])
def list_models():
    try:
        response = requests.get("http://localhost:11434/api/tags")
        data = response.json()
        return jsonify({"available_models": data.get("models", [])})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/classify", methods=["POST"])
def classify_image():
    
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files["image"]
    labels_raw = request.form.get("labels", "").strip()

    file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
    file.save(file_path)

    image_cv = cv2.imread(file_path)
    if image_cv is None:
        return jsonify({"error": "Invalid image file"}), 400

    image_cv = cv2.resize(image_cv, (512, 512))
    image_rgb = cv2.cvtColor(image_cv, cv2.COLOR_BGR2RGB)
    processed_path = file_path + "_processed.png"
    Image.fromarray(image_rgb).save(processed_path, format="PNG")

    with open(processed_path, "rb") as f:
        b64_image = base64.b64encode(f.read()).decode("utf-8")

    if labels_raw:
        labels = [lbl.strip() for lbl in labels_raw.split(",") if lbl.strip()]
        list_str = ", ".join([f'"{lbl}"' for lbl in labels])

        classification_prompt = (
            f"Choose EXACTLY one label from this list: [{list_str}]. "
            "Return ONLY the label with no explanation, no punctuation, no quotes."
        )
        mode_used = "user-defined"
    else:
        classification_prompt = (
            "You are an image classification system. "
            "Look at the image carefully. "
            "Answer with EXACTLY ONE WORD. "
            "This word must be the single main object in the image. "
            "Do not use sentences. "
            "Do not add punctuation. "
            "Do not add adjectives. "
            "Do not add explanations. "
            "ONLY output one noun. Example: dog"
        )


        labels = None
        mode_used = "auto"

    classification_payload = {
        "model": "llava-phi3:latest",
        "messages": [{
            "role": "user",
            "content": classification_prompt,
            "images": [b64_image]
        }],
        "stream": False
    }

    classification_response = requests.post(
        "http://localhost:11434/api/chat", json=classification_payload
    ).json()

    raw = classification_response.get("message", {}).get("content", "") or ""
    raw = raw.strip()
    lines = raw.splitlines()
    raw = lines[0].strip() if lines else ""
    raw = raw.strip(string.punctuation + string.whitespace)

    if labels:
        match = None
        for lbl in labels:
            if raw.lower() == lbl.lower():
                match = lbl
                break

        if not match:
            for lbl in labels:
                if raw.lower() in lbl.lower() or lbl.lower() in raw.lower():
                    match = lbl
                    break

        classification = match if match else "unknown"
    else:
        classification = raw or "unknown"

    description_prompt = (
    "Describe this image in a natural, detailed, and human-like sentence. "
    "Base your description ONLY on what is clearly visible. "
    "Do not invent objects or actions that cannot be seen, "
    "but feel free to describe colors, shapes, positions, and relationships between visible items."
)

    description_payload = {
        "model": "llava-phi3:latest",
        "messages": [{
            "role": "user",
            "content": description_prompt,
            "images": [b64_image]
        }],
        "stream": False
    }

    description_response = requests.post(
        "http://localhost:11434/api/chat", json=description_payload
    ).json()

    description = description_response.get("message", {}).get("content", "").strip()

    return jsonify({
        "mode": mode_used,
        "classification": classification,
        "description": description
    })

if __name__ == "__main__":
    app.run(debug=True)
