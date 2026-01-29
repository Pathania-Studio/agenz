"use client";
import React from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

const content = [
  {
    title: "Social Media Content",
    description:
      "Optimized for smartphones. Your app looks perfect on every mobile device.",
    content: (
      <div className="w-[220px] h-[440px] overflow-hidden pb-2 rounded-3xl border-4 border-neutral-800 bg-neutral-900 p-2 shadow-xl">
        <div className="h-2 w-16 mx-auto mb-3 rounded-full bg-neutral-800"></div>
        <div className="h-[95%] rounded-2xl bg-black text-white grid place-content-center text-sm">
          {/* <img className="h-[400px]" src="https://plus.unsplash.com/premium_photo-1740530840078-688751aa332c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8" alt="Mobile UI Mockup" />   */}
          <video
  src="https://res.cloudinary.com/dhhb38ito/video/upload/v1769586570/5_Reasons_xqgpzk.mp4"
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-[400px] object-cover rounded-xl"
/>
        </div>
      </div>
    ),
  },
  {
    title: "Manage Social Media",
    description:
      "Beautiful layouts for tablets. More space, better interactions.",
content: (
  <div className="w-[370px] h-[500px] rounded-3xl border-4 border-neutral-800 bg-neutral-900 p-3 shadow-xl flex flex-col">
    
    {/* Camera notch */}
    <div className="h-5 w-20 mx-auto mb-3 rounded-full bg-neutral-800"></div>

    {/* Screen */}
    <div className="relative flex-1 rounded-2xl overflow-hidden bg-black">

      {/* Scrolling content */}
      <div className="absolute inset-0">
        <div className="tablet-scroll space-y-4 px-2">
          
          {/* Repeat images */}
          {Array.from({ length: 10 }).map((_, i) => (
            <img
              key={i}
              className="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
              alt=""
            />
          ))}

          {/* Duplicate once more for seamless loop */}
          {Array.from({ length: 10 }).map((_, i) => (
            <img
              key={"dup"+i}
              className="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg"
              alt=""
            />
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
      <div className="w-[500px] h-[360px] overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-xl">
        <div className="flex items-center gap-2 px-3 py-2 border-b border-neutral-800 bg-neutral-950 rounded-t-xl">
          <div className="flex gap-1">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
          <div className="ml-3 text-xs text-neutral-400 bg-neutral-800 px-2 py-1 rounded w-full">
            https://yourapp.com
          </div>
        </div>
        <div className="h-[100%] overflow-hidden grid place-content-center text-white">
          <img className="h-[100%]" alt="" src="https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRpZ2l0YWwlMjBtYXJrZXRpbmd8ZW58MHx8MHx8fDA%3D" />
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
