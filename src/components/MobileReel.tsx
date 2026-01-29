"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function MobileReel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const height = el.scrollHeight / 2;

    gsap.to(el, {
      y: -height,
      duration: 18,
      ease: "none",
      repeat: -1,
    });
  }, []);

  const videos = [
    "https://res.cloudinary.com/dhhb38ito/video/upload/v1769586570/5_Reasons_xqgpzk.mp4",
    "https://res.cloudinary.com/dhhb38ito/video/upload/v1769586570/5_Reasons_xqgpzk.mp4",
    "https://res.cloudinary.com/dhhb38ito/video/upload/v1769586570/5_Reasons_xqgpzk.mp4",
  ];

  return (
    <div className="relative w-[360px] h-[720px] mx-auto">
      {/* Phone Frame */}
      {/* <img src="/images/phone-frame.png" alt="Phone" className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10" /> */}

      {/* Screen */}
      <div className="absolute left-[8%] top-[5%] w-[84%] h-[90%] rounded-[2rem] overflow-hidden bg-black">
        <div ref={trackRef} className="flex flex-col gap-2">
          {[...videos, ...videos].map((src, i) => (
            <video key={i} src={src} autoPlay muted loop playsInline className="w-full h-[520px] object-cover rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
