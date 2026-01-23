"use client";

import { forwardRef } from "react";

const HeroSvg = forwardRef<SVGSVGElement>((_, ref) => {
  return (
    <svg
      ref={ref}
      viewBox="0 0 1200 600"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* MASK using SAME PATH */}
        <mask id="hero-mask">
          <rect width="100%" height="100%" fill="black" />
          <path
            id="mask-path"
            fill="white"
            d="M10 300 ..." /* LOGO PATH INITIALLY */
          />
        </mask>
      </defs>

      {/* LOGO / TEXT PATH (VISIBLE INITIALLY) */}
      <path
        id="hero-path"
        fill="white"
        d="M10 300 ..." /* LOGO PATH INITIALLY */
      />

      {/* VIDEO (HIDDEN INITIALLY) */}
      <foreignObject
        width="100%"
        height="100%"
        mask="url(#hero-mask)"
      >
        <video
          className="h-full w-full object-cover"
          src="/videos/hero-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </foreignObject>
    </svg>
  );
});

HeroSvg.displayName = "HeroSvg";
export default HeroSvg;
