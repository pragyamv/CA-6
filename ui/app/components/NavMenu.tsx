"use client";
import Link from "next/link";

export default function NavMenu() {
  return (
    <div className="navbox">
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        <li style={{ padding: "8px 0" }}>
          <Link href="/">Home</Link>
        </li>
        <li style={{ padding: "8px 0" }}>
          <Link href="/page3">Classify an image</Link>
        </li>
        <li style={{ padding: "8px 0" }}>
          <Link href="/page5">The model</Link>
        </li>
      </ul>
    </div>
  );
}
