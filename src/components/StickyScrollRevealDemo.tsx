"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import TabletReel from "./TabletReel";
import MobileReel from "./MobileReel";

const content = [
  {
    title: "Social Media Content",
    description: "Optimized for smartphones. Your app looks perfect on every mobile device.",
    content: <MobileReel />,
  },
  {
    title: "Manage Social Media",
    description: "Beautiful layouts for tablets. More space, better interactions.",
    content: <TabletReel />,
  },
  {
    title: "Digital Marketing",
    description: "Full productivity on desktop and laptop screens.",
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
];

export function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}
