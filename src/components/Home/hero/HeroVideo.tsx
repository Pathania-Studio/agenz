"use client";

import { forwardRef } from "react";

const HeroVideo = forwardRef<HTMLVideoElement>((_, ref) => {
  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover opacity-0"
      src="/videos/hero-bg.mp4"
      muted
      loop
      playsInline
      autoPlay
    />
  );
});

HeroVideo.displayName = "HeroVideo";
export default HeroVideo;
