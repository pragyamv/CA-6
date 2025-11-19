"use client";
import { useState } from "react";
import NavMenu from "../components/NavMenu";

export default function Page5() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div
      className="container fade-fast"
      style={{
        height: "100vh",
        paddingTop: "60px" 
      }}
    >
      <div className="hamburger">
        <button onClick={() => setShowMenu(!showMenu)}>☰</button>
      </div>
      {showMenu && <NavMenu />}

      <h1 style={{ textAlign: "center", letterSpacing: 6 }}>THE MODEL</h1>

      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          lineHeight: 1.8,
          fontSize: "18px" 
        }}
      >
        <h3
          style={{
            color: "var(--accent)",
            fontSize: "22px"
          }}
        >
          LLaVA-Phi-3
        </h3>

        <p>
          Our system uses LLaVA-Phi-3, a lightweight yet powerful
          vision-language model designed for fast and accurate image
          understanding. It belongs to the LLaVA family of models, which
          combine visual processing with natural-language reasoning.
        </p>

        <p>
          LLaVA-Phi-3 is trained on a large combination of vision datasets and
          language tasks, making it efficient while delivering reliable results.
          It is optimized for local on-device inference, meaning all processing
          happens on your machine without relying on cloud services.
        </p>

        <p>
          It provides a balanced mix of speed, accuracy, and small size —
          ideal for object classification, scene understanding, accessibility
          tools, and image-driven automation.
        </p>

        <p>
          By combining deep visual understanding with natural-language
          reasoning, LLaVA-Phi-3 enables CA-6 to generate accurate
          classifications and clear descriptions entirely offline.
        </p>
      </div>
    </div>
  );
}
