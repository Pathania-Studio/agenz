"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

const content = [
  {
    title: "Social Media Content",
    description: "Optimized for smartphones. Your app looks perfect on every mobile device.",
    content: (
      <div className="w-[320px] h-[540px] overflow-hidden pb-2 rounded-3xl border-4 border-neutral-800 bg-neutral-900 p-2 shadow-xl">
        <div className="h-2 w-16 mx-auto mb-3 rounded-full bg-neutral-800"></div>
        <div className="h-[95%] rounded-2xl bg-black text-white overflow-hidden relative">
          <div className="absolute inset-0 mobile-video-scroll flex flex-col gap-2 p-1">
            {[
              "https://res.cloudinary.com/dhhb38ito/video/upload/v1769586570/5_Reasons_xqgpzk.mp4",
              "https://res.cloudinary.com/dhhb38ito/video/upload/v1769586570/5_Reasons_xqgpzk.mp4",
              "https://res.cloudinary.com/dhhb38ito/video/upload/v1769586570/5_Reasons_xqgpzk.mp4",
            ].map((src, i) => (
              <video key={i} src={src} autoPlay muted loop playsInline className="w-full h-[400px] object-cover rounded-xl" />
            ))}

            {/* duplicate for seamless loop */}
            {[
              "https://res.cloudinary.com/dhhb38ito/video/upload/v1769586570/5_Reasons_xqgpzk.mp4",
              "https://res.cloudinary.com/dhhb38ito/video/upload/v1769586570/5_Reasons_xqgpzk.mp4",
              "https://res.cloudinary.com/dhhb38ito/video/upload/v1769586570/5_Reasons_xqgpzk.mp4",
            ].map((src, i) => (
              <video key={"dup" + i} src={src} autoPlay muted loop playsInline className="w-full h-[400px] object-cover rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Manage Social Media",
    description: "Beautiful layouts for tablets. More space, better interactions.",
    content: (
      <div className="w-[370px] h-[500px] rounded-3xl border-4 border-neutral-800 bg-neutral-900 p-3 shadow-xl flex flex-col">
        {/* Camera notch */}
        <div className="h-5 w-20 mx-auto mb-3 rounded-full bg-neutral-800"></div>

        {/* Screen */}
        <div className="relative flex-1 rounded-2xl overflow-hidden bg-black">
          <div className="absolute inset-0 overflow-hidden">
            <div className="tablet-video-scroll flex h-full w-max">
              {Array.from({ length: 4 }).map((_, i) => (
                <video key={i} src="https://res.cloudinary.com/dhhb38ito/video/upload/v1769693544/Screen_Recording_2026-01-29_190002_wqima8.mp4" autoPlay muted loop playsInline className="h-full w-[370px] flex-shrink-0 object-cover" />
              ))}

              {/* duplicate set for seamless loop */}
              {Array.from({ length: 4 }).map((_, i) => (
                <video key={"dup" + i} src="https://res.cloudinary.com/dhhb38ito/video/upload/v1769693544/Screen_Recording_2026-01-29_190002_wqima8.mp4" autoPlay muted loop playsInline className="h-full w-[370px] flex-shrink-0 object-cover" />
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Digital Marketing",
    description: "Full productivity on desktop and laptop screens.",
    content: (
      <div className="relative w-[620px] h-[420px] mx-auto">
        {/* Laptop Frame */}
        <img src="images/laptop-frame.png" alt="Laptop Mockup" className="w-full h-full object-contain pointer-events-none select-none" />

        {/* Screen Content */}
        <div className="absolute left-[12%] top-[8%] w-[76%] h-[74%] overflow-hidden rounded-md bg-black shadow-inner">
          <img src="https://images.unsplash.com/photo-1562577309-4932fdd64cd1" alt="App UI" className="w-full h-full object-cover" />
        </div>
      </div>
    ),
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
