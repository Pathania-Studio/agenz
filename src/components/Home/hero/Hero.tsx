"use client";

import gsap from "gsap";
import AnimatedWord from "./AnimatedWord";
import { useMouseGlow } from "./useMouseGlow";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const glowRef = useRef<HTMLDivElement>(null);

  useMouseGlow(glowRef);
  const words = ["Media", "Digital", "Creative", "Branding"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2400);

    return () => clearInterval(interval);
  }, []);
  // Ambient glow breathing
  useEffect(() => {
    if (!glowRef.current) return;

    gsap.to(glowRef.current, {
      scale: 1.1,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section
      className="
        relative h-screen overflow-hidden text-white
        bg-[radial-gradient(ellipse_at_top,_rgba(139,92,246,0.14),_transparent_60%),_linear-gradient(to_bottom,_#050505,_#000)]
      ">
      {/* Glow */}
      <div
        ref={glowRef}
        className="
          pointer-events-none absolute left-0 top-0 z-0
          h-[340px] w-[340px] rounded-full
          bg-[radial-gradient(circle,_rgba(168,85,247,0.35),_transparent_60%)]
          blur-3xl opacity-80
        "
      />

      {/* Grain */}
      <div
        className="
          pointer-events-none absolute inset-0 z-[1]
          bg-[url('/noise.png')]
          opacity-[0.035]
          mix-blend-overlay
        "
      />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="mx-auto max-w-3xl text-center">
          {/* Heading */}
          <h1
            className="
    flex items-center justify-center gap-3
    text-4xl font-medium tracking-tight
    leading-none
    md:text-6xl
  ">
            {/* Animated word container */}
            <span className="relative inline-flex w-[190px] justify-end">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[index]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className=" absolute right-0 flex items-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                  <AnimatedWord word={words[index]} />
                </motion.span>
              </AnimatePresence>
            </span>

            {/* Static word */}
            {/* <span className="text-white/90 font-semibold leading-none">Agency</span> */}
          </h1>
          {/* Logo */}
          <img src="/logo.png" alt="Agenz" className="mx-auto mb-10 h-96 opacity-90" />
        </div>
      </div>
    </section>
  );
}
