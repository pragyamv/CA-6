"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NavMenu from "../components/NavMenu";

export default function Page3() {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [labels, setLabels] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState("");

  const router = useRouter();

  function onFile(e: any) {
    const f = e.target.files?.[0];
    if (!f) return;
    setSelectedFile(f);
    setFileUrl(URL.createObjectURL(f));
  }

  return (
    <div
      className="container fade-fast"
      style={{
        textAlign: "center",
        minHeight: "100vh",
        paddingTop: "80px",
      }}
    >
      <div className="hamburger">
        <button onClick={() => setShowMenu(!showMenu)}>☰</button>
      </div>

      {showMenu && <NavMenu />}

      <h1
        style={{
          textAlign: "center",
          letterSpacing: "6px",
          fontSize: "32px",
          marginTop: "0px",
          marginBottom: "40px",
        }}
      >
        CLASSIFY AN IMAGE
      </h1>

      <div className="center" style={{ marginBottom: "42px" }}>
        <label
          className="box"
          onClick={() => document.getElementById("file-input")?.click()}
          style={{ cursor: "pointer" }}
        >
          {fileUrl ? (
            <img
              src={fileUrl}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 10,
              }}
            />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              Drop or choose image
            </div>
          )}
        </label>
      </div>

      <p
        style={{
          color: "var(--accent)",
          marginBottom: "14px",
        }}
      >
        Add a list of categories you want the model to choose from, or leave it
        blank to let it decide on its own <br />
        (eg: dog, cat, rabbit)
      </p>

      <div
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <input
          className="input"
          placeholder="dog, cat, rabbit"
          value={labels}
          onChange={(e) => setLabels(e.target.value)}
          style={{
            width: "50%",
            marginBottom: "20px",
          }}
        />

        <button
          className="btn"
          onClick={async () => {
            if (!selectedFile) {
              alert("Please upload an image first.");
              return;
            }

            // Start loading overlay
            setLoading(true);

            // dash animation
            let index = 0;
            const sequence = ["-", "--", "---", "--"];
            setLoader(sequence[index]);

            const interval = setInterval(() => {
              index = (index + 1) % sequence.length;
              setLoader(sequence[index]);
            }, 350);

            // Save preview
            sessionStorage.setItem("ca6_image", fileUrl || "");

            const formData = new FormData();
            formData.append("image", selectedFile);
            formData.append("labels", labels);

            try {
              const res = await fetch("http://127.0.0.1:5000/classify", {
                method: "POST",
                body: formData,
              });

              const data = await res.json();

              sessionStorage.setItem("ca6_classification", data.classification);
              sessionStorage.setItem("ca6_description", data.description);

              clearInterval(interval);
              router.push("/page4");
            } catch (error) {
              clearInterval(interval);
              setLoading(false);
              alert("Backend error");
            }
          }}
        >
          Classify
        </button>
      </div>

      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={onFile}
        style={{ display: "none" }}
      />

      {/* --- Processing Overlay --- */}
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.85)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Space Mono, monospace",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              letterSpacing: "6px",
              color: "var(--accent)",
              marginBottom: "8px",
            }}
          >
            {loader}
          </div>

          <div
            style={{
              fontSize: "16px",
              letterSpacing: "4px",
              color: "#222",
            }}
          >
            processing
          </div>
        </div>
      )}
    </div>
  );
}
