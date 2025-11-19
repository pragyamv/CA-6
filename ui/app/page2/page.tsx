"use client";
import Link from "next/link";

export default function Page2() {
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
      <div className="card">
        <img src="/image-dog.webp" alt="example" className="big-img" />
      </div>

      <div className="text-block" style={{ maxWidth: "600px" }}>
        <h3>Classification: dog</h3>

        <p style={{ lineHeight: 1.8, whiteSpace: "normal", overflow: "visible" }}>
          Description: A light brown dog with a red collar stands in front of two
          water containers. The dog has its head tilted upwards as if listening
          intently. One container is white and the other is black. They are both
          close to each other. The ground beneath them is made of brick, giving
          an urban feel to the scene. In the background, there's a wooden
          structure which appears to be a shed or perhaps part of a larger
          building. The relative positions of the objects suggest that the dog
          might be in a backyard or similar outdoor space.
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
        <Link href="/page3">
          <button className="btn">Classify your own image</button>
        </Link>
      </div>
    </div>
  );
}
