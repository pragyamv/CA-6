"use client";
import { useState, useEffect } from "react";
import NavMenu from "../components/NavMenu";

export default function Page4() {
  const [img, setImg] = useState<string | null>(null);
  const [labels, setLabels] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const storedImg = sessionStorage.getItem("ca6_image");
    const storedLabels = sessionStorage.getItem("ca6_labels");
    setImg(storedImg);
    setLabels(storedLabels);
  }, []);

  return (
    <div
      className="container fade-fast"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <div className="hamburger">
        <button onClick={() => setShowMenu(!showMenu)}>☰</button>
      </div>

      {showMenu && <NavMenu />}

      <div className="card">
        <img
          src={img ? img : "/image-dog.webp"}
          alt="uploaded"
          className="big-img"
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className="text-block">
        <h3>
            Classification: {sessionStorage.getItem("ca6_classification") ?? "unknown"}
        </h3>

        <p
            style={{
                whiteSpace: "normal",
                overflow: "visible",
                lineHeight: 1.8
            }}
        >
            {sessionStorage.getItem("ca6_description") ?? "No description available."}
        </p>

      </div>

    <div
    style={{
        position: "fixed",
        bottom: 40,
        left: "50%",
        transform: "translateX(-50%)",
    }}
    >
    <button className="btn" onClick={() => window.location.href = "/page3"}>
        Go back and try another
    </button>
    </div>

</div>
  );
}
