"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const roles = ["Creative Agency", "Media Agency", "Digital Agency", "Branding Agency"];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const glowRef = useRef<HTMLDivElement>(null);

  // text loop
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // mouse glow
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const move = (e: MouseEvent) => {
      gsap.to(glow, {
        x: e.clientX - 150,
        y: e.clientY - 150,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-black text-white">
      {/* Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0 h-[300px] w-[300px] rounded-full 
                   bg-gradient-to-r from-purple-500/40 to-pink-500/40 blur-3xl"
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        {/* Logo */}
        <img src="/logo.png" alt="Agenz" className="mb-6 h-96 opacity-90" />

        <p className="mb-2 text-sm uppercase tracking-widest text-gray-400">We are a</p>

        <div className="relative h-[60px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1 key={roles[index]} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.6, ease: "easeInOut" }} className="text-4xl font-bold md:text-6xl">
              {roles[index]}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
