"use client";

import { useEffect } from "react";
import gsap from "gsap";

export function useMouseGlow(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const el = ref.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      gsap.to(el, {
        x: e.clientX - 160,
        y: e.clientY - 160,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [ref]);
}
