"use client";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const Gsap = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    // gsap.from(headingRef.current, {
    //   opacity: 0,
    //   y: 50,
    //   duration: 1,
    //   ease: "power3.out",
    // });
    gsap.from(headingRef.current, {
      x: "-100%",
      rotate: 720,
      borderRadius: "50%",
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power1.out",
    });
  }, []);

  return (
    <main style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <h1 ref={headingRef} style={{ fontSize: "48px" }}>
        Hello GSAP 🚀
      </h1>
    </main>
  );
};

export default Gsap;
