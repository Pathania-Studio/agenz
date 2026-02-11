"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function MiniGraph() {
  const pathRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: "power2.out",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <svg viewBox="0 0 200 80" className="w-full h-16">
      <path
        ref={pathRef}
        d="M0,60 Q40,20 80,40 T160,30 T200,50"
        fill="none"
        stroke="url(#grad)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="200" y2="0">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  );
}
