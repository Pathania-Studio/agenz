"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Video from "./Video";

export default function MobileReel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const height = el.scrollHeight / 2;

    gsap.to(el, {
      y: -height,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  }, []);

  const videos = [
    "https://res.cloudinary.com/dhhb38ito/video/upload/v1770354525/W_SM4_i1np6f.mp4",
    "https://res.cloudinary.com/dhhb38ito/video/upload/v1770354517/W_SM2_vlqpmy.mp4",
    "https://res.cloudinary.com/dhhb38ito/video/upload/v1770354515/W_SM1_yqckaj.mp4",
    "https://res.cloudinary.com/dhhb38ito/video/upload/v1770354522/W_SM3_scseni.mp4",
    "https://res.cloudinary.com/dhhb38ito/video/upload/v1770354525/W_SM4_i1np6f.mp4",
  ];
  return (
    <div className="relative w-[350px] h-[650px] mx-auto">
      {/* Phone Frame */}
      <img src="/mobile.webp" className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none" />
      {/* Screen */}
      <div className="absolute left-[10%] top-[6%] w-[80%] h-[90%] rounded-[2rem] overflow-hidden bg-black">
        <div ref={trackRef} className="flex flex-col gap-2">
          {[...videos, ...videos].map((src, i) => (
            <Video key={i} src={src} className="w-full h-[520px] object-cover rounded-xl" />
          ))}
        </div>
      </div>
      
    </div>
  );
}
