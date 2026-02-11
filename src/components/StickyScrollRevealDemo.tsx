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
        <img src="/laptop.webp" alt="Laptop Mockup" className="w-full h-full object-contain pointer-events-none select-none" />

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
// "use client";
// import { useLayoutEffect, useRef } from "react";
// import gsap from "gsap";
// import Video from "./Video";
// import { Clock, BarChart3, Heart, MessageCircle } from "lucide-react";

// export default function MobileReel() {
//   const trackRef = useRef<HTMLDivElement>(null);

//   useLayoutEffect(() => {
//     const el = trackRef.current;
//     if (!el) return;

//     const height = el.scrollHeight / 2;

//     gsap.to(el, {
//       y: -height,
//       duration: 20,
//       ease: "none",
//       repeat: -1,
//     });
//   }, []);

//   const videos = [
//     "https://res.cloudinary.com/dhhb38ito/video/upload/v1770354525/W_SM4_i1np6f.mp4",
//     "https://res.cloudinary.com/dhhb38ito/video/upload/v1770354517/W_SM2_vlqpmy.mp4",
//     "https://res.cloudinary.com/dhhb38ito/video/upload/v1770354515/W_SM1_yqckaj.mp4",
//     "https://res.cloudinary.com/dhhb38ito/video/upload/v1770354522/W_SM3_scseni.mp4",
//   ];

//   return (
//     <div className="relative w-[350px] h-[650px] mx-auto">

//       <img src="/mobile.webp" className="absolute inset-0 w-full h-full object-contain z-10 pointer-events-none" />

//       <div className="absolute left-[10%] top-[6%] w-[80%] h-[90%] rounded-[2rem] overflow-hidden bg-black">
//         <div ref={trackRef} className="flex flex-col gap-2">
//           {[...videos, ...videos].map((src, i) => (
//             <Video key={i} src={src} className="w-full h-[520px] object-cover rounded-xl" />
//           ))}
//         </div>
//       </div>

//       <FloatingCard position="bottom-8 left-8" title="Engagement" icon={<Heart />} />
//       <FloatingCard position="top-8 left-8" title="Performance" icon={<BarChart3 />} />
//       <FloatingCard position="top-8 right-8" title="Messages" icon={<MessageCircle />} />
//     </div>
//   );
// }

// function FloatingCard({ position, title, icon }: any) {
//   const cardRef = useRef<HTMLDivElement>(null);
//   const contentRef = useRef<HTMLDivElement>(null);

//   const expand = () => {
//     gsap.to(cardRef.current, {
//       width: 260,
//       height: 180,
//       borderRadius: 24,
//       duration: 0.4,
//       ease: "power3.out",
//     });
//     gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.3 });
//   };

//   const collapse = () => {
//     gsap.to(cardRef.current, {
//       width: 70,
//       height: 70,
//       borderRadius: 16,
//       duration: 0.4,
//       ease: "power3.inOut",
//     });
//     gsap.to(contentRef.current, { opacity: 0, y: 20, duration: 0.2 });
//   };

//   return (
//     <div
//       className={`absolute ${position} z-20`}
//       onMouseEnter={expand}
//       onMouseLeave={collapse}
//     >
//       <div
//         ref={cardRef}
//         className="w-[70px] h-[70px] p-4 flex items-center justify-center text-white backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl cursor-pointer overflow-hidden transition-all"
//       >
//         <div className="absolute top-4 left-4">{icon}</div>

//         <div ref={contentRef} className="opacity-0 translate-y-4 w-full mt-6 text-xs space-y-2">
//           <h3 className="text-sm font-semibold">{title}</h3>
//           <div className="h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-md"></div>
//           <div className="flex justify-between text-[10px] text-white/70">
//             <span>+24%</span>
//             <span>Today</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
