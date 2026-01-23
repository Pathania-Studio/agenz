"use client";
import { forwardRef } from "react";

const HeroMaskedVideo = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      ref={ref}
      className="
        absolute z-10
        w-[80vw] max-w-[1400px]
        aspect-[1600/600]
        opacity-0 scale-75
        flex items-center justify-center
      "
    >
      <svg
        viewBox="0 0 1600 600"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <mask id="text-mask">
            <rect width="100%" height="100%" fill="black" />
            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="260"
              fontWeight="800"
              fill="white"
            >
              Agenz
            </text>
          </mask>
        </defs>

        <foreignObject width="100%" height="100%" mask="url(#text-mask)">
          <video
            src="/videos/hero-bg.mp4"
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        </foreignObject>
      </svg>
    </div>
  );
});

HeroMaskedVideo.displayName = "HeroMaskedVideo";
export default HeroMaskedVideo;
