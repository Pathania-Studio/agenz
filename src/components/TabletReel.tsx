"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function TabletReel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const width = el.scrollWidth / 2;

    gsap.to(el, {
      x: -width,
      duration: 25,
      ease: "none",
      repeat: -1,
    });
  }, []);

  const videos = [
    "https://res.cloudinary.com/dhhb38ito/video/upload/v1770467195/Screen_Recording_2026-02-07_175458_bhbq6u.mp4",
    "https://res.cloudinary.com/dhhb38ito/video/upload/v1770467194/Screen_Recording_2026-02-07_175355_prnvbr.mp4",
    "https://res.cloudinary.com/dhhb38ito/video/upload/v1770467193/Screen_Recording_2026-02-07_175242_fnjr7h.mp4",
  ];
  return (
    <div className="relative w-[620px] aspect-[4/3] mx-auto">
      {/* Tablet Frame */}
      <img src="/tablet-frame.png" alt="Tablet" className="absolute inset-0 w-full h-full object-fill pointer-events-none z-10" />

      {/* Screen Area */}
      <div className="absolute left-[6%] top-[8%] w-[88%] h-[82%] rounded-xl overflow-hidden bg-black">
        <div ref={trackRef} className="flex h-full w-max">
          {[...videos, ...videos].map((src, i) => (
            <video key={i} src={src} autoPlay muted loop playsInline className="h-full w-[620px] flex-shrink-0 object-cover" />
          ))}
        </div>
      </div>
    </div>
  );
}
