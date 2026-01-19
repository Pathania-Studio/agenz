"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoIntro() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !videoRef.current) return;

    gsap.fromTo(
      videoRef.current,
      { scale: 1.1, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      },
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black py-32 text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:items-center">
        {/* Text */}
        <div>
          <p className="mb-3 text-sm uppercase tracking-widest text-gray-400">About Agenz</p>
          <h2 className="mb-6 text-3xl font-semibold md:text-4xl">We craft digital experiences that move brands forward.</h2>
          <p className="text-gray-400">Agenz is a creative agency focused on building strong digital identities through design, motion, and technology.</p>
        </div>

        {/* Video */}
        <div className="overflow-hidden rounded-2xl">
          <video ref={videoRef} className="h-full w-full object-cover" src="/agency-intro.mp4" muted loop playsInline autoPlay />
        </div>
      </div>
    </section>
  );
}
