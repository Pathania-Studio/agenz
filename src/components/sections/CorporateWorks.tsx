"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const corporateWorks = [
  {
    title: "Corporate Brand Film",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    title: "Product Launch Film",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

export default function CorporateWorks() {
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    itemsRef.current.forEach((item) => {
      const center = item.querySelector(".center");
      const left = item.querySelector(".left");
      const right = item.querySelector(".right");

      gsap.fromTo(
        center,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 70%",
            end: "bottom 40%",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        left,
        { y: -80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 65%",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        right,
        { y: -80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 65%",
            scrub: true,
          },
        },
      );
    });
  }, []);

  return (
    <section className="bg-black text-white">
      {corporateWorks.map((work, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) itemsRef.current[i] = el;
          }}
          className="relative flex min-h-screen items-center justify-center overflow-hidden">
          {/* Center mockup */}
          <div className="center relative z-10 w-[70vw] max-w-4xl aspect-video rounded-2xl overflow-hidden">
            <iframe className="h-full w-full" src={`${work.video}?mute=1&controls=0`} allow="autoplay; encrypted-media" />
          </div>

          {/* Left floating */}
          <div className="left absolute left-10 top-24 w-[220px] aspect-video rounded-xl overflow-hidden opacity-80">
            <iframe className="h-full w-full" src={`${work.video}?mute=1&controls=0`} />
          </div>

          {/* Right floating */}
          <div className="right absolute right-10 top-32 w-[220px] aspect-video rounded-xl overflow-hidden opacity-80">
            <iframe className="h-full w-full" src={`${work.video}?mute=1&controls=0`} />
          </div>
        </div>
      ))}
    </section>
  );
}
