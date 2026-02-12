"use client";
import React, { useLayoutEffect, useRef } from "react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";
import TabletReel from "./TabletReel";
import MobileReel from "./MobileReel";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const content = [
  {
    title: "Social Media & Content",
    description: "Content, strategy, and management built for how people actually scroll.",
    pointers: ["Short-form videos and social promos", "Content strategy and planning", "Platform-specific creatives", "Account management across social platforms"],
    content: <div className="device-container"><MobileReel /></div>,
  },
  {
    title: "Performance Marketing",
    description: " Data-led campaigns focused on visibility, efficiency, and growth.",
    pointers: ["Paid campaigns across search and social", "Funnel-based ad strategy", "Performance tracking and optimization", "Reporting and insights"],
    content: (
      <div className="device-container">
        <div className="relative w-[790px] h-[520px] mx-auto">
          {/* Laptop Frame */}
          <img src="/laptop.webp" alt="Laptop Mockup" className="w-full h-full object-contain pointer-events-none select-none" />

          {/* Screen Content */}
          <div className="absolute left-[12%] top-[13%] w-[76%] h-[74%] overflow-hidden rounded-md bg-black shadow-inner">
            <img src="https://images.unsplash.com/photo-1562577309-4932fdd64cd1" alt="App UI" className="w-full h-full object-cover" />
          </div>

          {/* Enhanced Floating UI with Glass Effect */}
          <div className="absolute top-8 right-8 floating-ui glass-effect bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-4 shadow-lg transition-all duration-300 hover:bg-white/20">
            <div className="text-white text-sm font-semibold animated-text">Performance</div>
            <div className="text-green-400 text-xs animated-text">+24%</div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Branding & Design",
    description: "Design systems that shape how brands look, feel, and communicate.",
    pointers: ["Brand identity and logo systems", "Website design and UI/UX", "Brand collaterals and assets", "Visual consistency across platforms"],
    content: <div className="device-container"><TabletReel /></div>,
  },
];

export function StickyScrollRevealDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate all device containers with sophisticated scroll-based transitions
      const devices = gsap.utils.toArray(".device-container");
      
      // Set initial state for all devices
      devices.forEach((device: any, index) => {
        gsap.set(device, {
          x: index === 0 ? 0 : "100vw",
          opacity: index === 0 ? 1 : 0,
          rotationY: index === 0 ? 0 : 25,
          rotationZ: index === 0 ? 0 : -5,
          scale: index === 0 ? 1 : 0.7,
          zIndex: devices.length - index
        });
      });

      // Create sophisticated scroll-based animation
      devices.forEach((device: any, index) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: device,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1.5,
            onUpdate: (self) => {
              const progress = self.progress;
              
              // Animate current device (growing in)
              gsap.to(device, {
                x: 0,
                opacity: 1,
                rotationY: 0,
                rotationZ: 0,
                scale: 1,
                zIndex: devices.length,
                duration: 0.5,
                ease: "power3.out"
              });

              // Animate previous devices (shrinking out)
              for (let i = 0; i < index; i++) {
                const prevDevice = devices[i];
                const shrinkProgress = Math.max(0, progress - 0.3);
                
                gsap.to(prevDevice, {
                  x: "-20vw",
                  opacity: 1 - shrinkProgress,
                  rotationY: -15 * shrinkProgress,
                  rotationZ: -3 * shrinkProgress,
                  scale: 1 - (0.4 * shrinkProgress),
                  zIndex: devices.length - (index - i),
                  duration: 0.5,
                  ease: "power3.inOut"
                });
              }

              // Animate next devices (waiting to enter)
              for (let i = index + 1; i < devices.length; i++) {
                const nextDevice = devices[i];
                
                gsap.to(nextDevice, {
                  x: "100vw",
                  opacity: 0,
                  rotationY: 25,
                  rotationZ: -5,
                  scale: 0.7,
                  zIndex: devices.length - i,
                  duration: 0.5,
                  ease: "power3.inOut"
                });
              }
            }
          }
        });

        // Add subtle floating animation when active
        tl.to(device, {
          y: -3,
          rotationZ: 0.5,
          duration: 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
      });

      // Enhanced text animation with stagger
      const textElements = gsap.utils.toArray(".animated-text");
      
      textElements.forEach((element: any, index) => {
        gsap.set(element, {
          opacity: 0,
          y: 30,
          scale: 0.9,
          filter: "blur(8px)"
        });

        gsap.to(element, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "bottom 15%",
            scrub: 1
          }
        });
      });

      // Floating UI elements with enhanced physics
      const floatingElements = gsap.utils.toArray(".floating-ui");
      
      floatingElements.forEach((element: any, index) => {
        gsap.set(element, {
          opacity: 0,
          scale: 0.3,
          y: 20,
          rotation: Math.random() * 8 - 4
        });

        gsap.to(element, {
          opacity: 1,
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.5,
          ease: "back.out(1.8)",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            end: "bottom 10%",
            scrub: 0.8
          }
        });

        // Subtle floating when visible
        gsap.to(element, {
          y: -6,
          rotation: 1.5,
          duration: 1.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
      });

      // Glass morphism hover effects
      const glassElements = gsap.utils.toArray(".glass-effect");
      
      glassElements.forEach((element: any) => {
        element.addEventListener("mouseenter", () => {
          gsap.to(element, {
            backdropFilter: "blur(15px)",
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            scale: 1.02,
            duration: 0.4,
            ease: "power2.out"
          });
        });

        element.addEventListener("mouseleave", () => {
          gsap.to(element, {
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            scale: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full py-4">
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
