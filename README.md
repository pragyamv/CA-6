## **CA-6 — Local Image Classification & Description System**

A fully local image-understanding system that performs object classification and scene description using a Flask API, OpenCV preprocessing, and the **LLaVA-Phi-3** vision-language model executed through **Ollama**.

---

![Model](https://img.shields.io/badge/Model-LLaVA--Phi3-lightgrey)
![Runtime](https://img.shields.io/badge/Model%20Runtime-Ollama-lightgrey)
![Framework](https://img.shields.io/badge/Framework-Flask-lightgrey)
![Computer Vision](https://img.shields.io/badge/Computer%20Vision-OpenCV-lightgrey)
![Language](https://img.shields.io/badge/Language-Python-lightgrey)
![Architecture](https://img.shields.io/badge/Architecture-REST%20API-lightgrey)

---

### **Key Features**

* **Local Vision-Language Inference:** Uses the LLaVA-Phi-3 model entirely on-device via Ollama for private, offline classification and description.
* **REST API Architecture:** The backend exposes two clean endpoints for model listing and image classification.
* **Dual Classification Modes:**  
  - *Auto Mode:* Identify the primary object in an image.  
  - *Label-Constrained Mode:* Choose one class from user-provided labels.
* **Computer Vision Preprocessing:**  
  Performed with OpenCV for consistent, high-quality inputs (resizing, RGB conversion, PNG export).

---

### **Core Functionality**
* Accepts image uploads via the `/classify` API route.
* Performs preprocessing using OpenCV:
  - Image loading  
  - Resizing to 512×512  
  - BGR → RGB color correction  
  - PNG conversion  
  - Base64 encoding  
* Sends fully processed image data to Ollama for inference.
* Returns:
  - Classification label  
  - Full scene description  
  - Mode used (auto or user-defined)

### **Primary Use Cases**
* Image classification demos  
* Vision-language model experimentation  
* Local inference prototyping  
* Secure or offline image-understanding workflows  

---

### **Flow**
Upload → OpenCV Pipeline → Base64 → Ollama (LLaVA-Phi-3) → Classification + Description → JSON Response → UI

#### **Backend Stack**

* Python  
* Flask  
* OpenCV (cv2)  
* Pillow  
* Base64 Encoding  
* Requests (HTTP)  
* Ollama  
* LLaVA-Phi-3 Vision-Language Model  

#### **API Endpoints**

**GET /models**  
Returns a list of all installed Ollama models.

**POST /classify**  
Accepts an image and optional label list.  
Returns classification, description, and mode.

#### **Image Processing Pipeline**

* Load image  
* Validate  
* Resize to 512×512  
* Convert BGR → RGB  
* Save as PNG  
* Encode to Base64  
* Submit to model  

---

### **Model Overview: LLaVA-Phi-3**

LLaVA-Phi-3 is a compact, fast vision-language model capable of:

* Object recognition  
* Scene understanding  
* Natural-language generation  
* Visual reasoning  

Its small size and efficiency make it ideal for **local inference through Ollama**, with no cloud connection required.

---

### **Example Classification**

A sample result showing both the predicted label and the generated natural-language description for an uploaded cat image.


