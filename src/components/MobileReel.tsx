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
      duration: 20,
      ease: "none",
      repeat: -1,
    });
  }, []);

  const video = "https://res.cloudinary.com/dhhb38ito/video/upload/v1769586570/5_Reasons_xqgpzk.mp4";

  return (
    <div className="relative w-[350px] h-[600px] mx-auto">
      {/* Phone Frame */}
      <img src="/phone-frame.png" className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none" />
      {/* Screen */}
      <div className="absolute left-[8%] top-[5%] w-[84%] h-[90%] rounded-[2rem] overflow-hidden bg-black">
        <div ref={trackRef} className="flex flex-col gap-2">
          {[...Array(4), ...Array(4)].map((_, i) => (
            <video key={i} src={video} autoPlay muted loop playsInline className="w-full h-[520px] object-cover rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
