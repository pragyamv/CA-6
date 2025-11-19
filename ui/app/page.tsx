"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Splash() {
  const router = useRouter();
  const [stage, setStage] = useState("in");
  const [loader, setLoader] = useState(""); 

  useEffect(() => {
    const holdDelay = 1200 + 2400;

    setTimeout(() => setStage("hold"), 1200);
    setTimeout(() => setStage("out"), holdDelay);
    setTimeout(() => router.push("/page2"), holdDelay + 1200);

    setTimeout(() => {
      let index = 0;
      const sequence = ["-", "--", "---", "--"];
      setLoader(sequence[index]);

      const interval = setInterval(() => {
        index = (index + 1) % sequence.length;
        setLoader(sequence[index]);
      }, 350);

      return () => clearInterval(interval);
    }, 1000);
  }, [router]);

return (
  <div
    style={{ height: "100vh", position: "relative" }}
    className={
      stage === "in"
        ? "fade-slow-in"
        : stage === "out"
        ? "fade-slow-out"
        : ""
    }
  >
    <div className="center" style={{ height: "100%", flexDirection: "column" }}>
      
      <div className="logo" style={{ marginBottom: "12px" }}>CA - 6</div>

      {stage !== "in" && (
        <div
          style={{
            marginTop: "10px",
            fontFamily: "Space Mono, monospace",
            fontSize: "18px",
            letterSpacing: "6px",
            color: "var(--accent)",
          }}
        >
          {loader}
        </div>
      )}

    </div>
  </div>
)}
