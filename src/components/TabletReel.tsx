"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ChartArea, Clock } from "lucide-react";

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
    <div className="relative w-[720px] aspect-[4/3] mx-auto">
      {/* Tablet Frame */}
      <img src="/pc.webp" alt="PC" className="absolute inset-0 z-10 w-full h-full object-fill pointer-events-none" />

      {/* Screen Area */}
      <div className="absolute left-[4%] top-[7%] w-[93%] h-[61%] overflow-hidden bg-black">
        <div ref={trackRef} className="flex h-full w-max">
          {[...videos, ...videos].map((src, i) => (
            <video key={i} src={src} autoPlay muted loop playsInline className="h-full w-[620px] flex-shrink-0 object-cover" />
          ))}
        </div>
      </div>

      {/* Simple Floating Elements */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* bottom left badge */}
        <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-800 font-semibold text-lg">40%</span>
          </div>
        </div>
        {/* top Left badge */}
        <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
              <Clock className="w-3 h-3 text-white" />
            </div>
            <div>
              <div className="text-gray-800 font-semibold text-sm">60% Less</div>
              <div className="text-green-600 font-bold text-xs">Manual Work</div>
            </div>
          </div>
        </div>
        {/* top right badge */}
        <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-white/20">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center">
              <Clock className="w-3 h-3 text-white" />
            </div>
            <div>
              <div className="text-gray-800 font-semibold text-sm">60% Less</div>
              <div className="text-green-600 font-bold text-xs">Manual Work</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
