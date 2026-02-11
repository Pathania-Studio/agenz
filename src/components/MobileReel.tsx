"use client";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Video from "./Video";
import { Clock } from "lucide-react";
import MiniGraph from "./MiniGraph";

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
  ];

  const glass =
    "bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)] rounded-2xl p-3 transition duration-300 hover:scale-105 hover:-translate-y-1";

  return (
    <div className="relative w-[350px] h-[650px] mx-auto">

      {/* Phone Frame */}
      <img
        src="/mobile.webp"
        className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none"
      />

      {/* Screen Area */}
      <div className="absolute left-[10%] top-[6%] w-[80%] h-[90%] rounded-[2rem] overflow-hidden bg-black">

        {/* Video Reel */}
        <div ref={trackRef} className="flex flex-col gap-2">
          {[...videos, ...videos].map((src, i) => (
            <Video
              key={i}
              src={src}
              className="w-full h-[520px] object-cover rounded-xl"
            />
          ))}
        </div>
      </div>

      {/* Glass Floating UI */}
      <div className="absolute inset-0 z-20 pointer-events-none text-white">

        {/* Bottom Left Badge */}
        <div className="absolute bottom-1 right-20 -translate-x-1/2 -translate-y-1/2 w-[75%] z-20">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.25)] rounded-2xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white text-xs font-semibold tracking-wide">Efficiency Growth</span>
              <span className="text-green-400 text-xs font-semibold">+24%</span>
            </div>
            <MiniGraph />
          </div>
        </div>

        {/* Top Left Badge */}
        <div className={`absolute top-8 left-8 ${glass}`}>
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center border border-white/20">
              <Clock className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-sm">60% Less</div>
              <div className="text-green-300 font-semibold text-xs">Manual Work</div>
            </div>
          </div>
        </div>

        {/* Top Right Badge */}
        <div className={`absolute top-8 right-8 ${glass}`}>
          <div className="flex items-center space-x-3">
            <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center border border-white/20">
              <Clock className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-sm">2× Faster</div>
              <div className="text-blue-300 font-semibold text-xs">Audits</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
