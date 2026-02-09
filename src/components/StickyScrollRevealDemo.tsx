"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import TabletReel from "./TabletReel";
import MobileReel from "./MobileReel";

const content = [
  {
    title: "Social Media & Content",
    description: "Content, strategy, and management built for how people actually scroll.",
    pointers: ["Short-form videos and social promos", "Content strategy and planning", "Platform-specific creatives", "Account management across social platforms"],
    content: <MobileReel />,
  },
  {
    title: "Performance Marketing",
    description: " Data-led campaigns focused on visibility, efficiency, and growth.",
    pointers: ["Paid campaigns across search and social", "Funnel-based ad strategy", "Performance tracking and optimization", "Reporting and insights"],
    content: (
      <div className="relative w-[790px] h-[520px] mx-auto">
        {/* Laptop Frame */}
        <img src="images/laptop-frame.png" alt="Laptop Mockup" className="w-full h-full object-contain pointer-events-none select-none" />

        {/* Screen Content */}
        <div className="absolute left-[12%] top-[13%] w-[76%] h-[74%] overflow-hidden rounded-md bg-black shadow-inner">
          <img src="https://images.unsplash.com/photo-1562577309-4932fdd64cd1" alt="App UI" className="w-full h-full object-cover" />
        </div>
      </div>
    ),
  },
  {
    title: "Branding & Design",
    description: "Design systems that shape how brands look, feel, and communicate.",
    pointers: ["Brand identity and logo systems", "Website design and UI/UX", "Brand collaterals and assets", "Visual consistency across platforms"],
    content: <TabletReel />,
  },
];

export function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
