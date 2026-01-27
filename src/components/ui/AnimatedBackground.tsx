"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  /* ─────────────────────────────
     MOUSE FOLLOW (DESKTOP ONLY)
  ───────────────────────────── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const y = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 220);
      mouseY.set(e.clientY - 220);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  /* ─────────────────────────────
     GSAP SECTION SYNC
  ───────────────────────────── */
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const sections = document.querySelectorAll("[data-bg='glow']");

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",

        onEnter: () => {
          gsap.to(glow, {
            opacity: 0.45,
            scale: 1.1,
            duration: 1,
            ease: "power3.out",
          });
        },

        onLeave: () => {
          gsap.to(glow, {
            opacity: 0.18,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          });
        },

        onEnterBack: () => {
          gsap.to(glow, {
            opacity: 0.45,
            scale: 1.1,
            duration: 1,
            ease: "power3.out",
          });
        },

        onLeaveBack: () => {
          gsap.to(glow, {
            opacity: 0.18,
            scale: 1,
            duration: 1,
            ease: "power3.out",
          });
        },
      });
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* BASE */}
      <div className="absolute inset-0 bg-[#0b0b0d]" />

      {/* FLOWING GRADIENTS */}
      <motion.div
        className="absolute -top-1/3 -left-1/4 h-[900px] w-[900px]
                   rounded-full bg-purple-600/20 blur-[240px]"
        animate={{
          x: [0, 140, -80, 0],
          y: [0, 90, -60, 0],
        }}
        transition={{
          duration: 42,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-[-35%] right-[-20%] h-[800px] w-[800px]
                   rounded-full bg-cyan-500/15 blur-[260px]"
        animate={{
          x: [0, -120, 60, 0],
          y: [0, -100, 80, 0],
        }}
        transition={{
          duration: 48,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* SECTION SYNC GLOW */}
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-[0.18]
                   bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_65%)]
                   transition-opacity duration-700"
      />

      {/* MOUSE LIGHT (DESKTOP) */}
      {typeof window !== "undefined" && window.innerWidth >= 768 && (
        <motion.div
          className="absolute h-[420px] w-[420px]
                     rounded-full bg-white/10 blur-[150px]"
          style={{ x, y }}
        />
      )}

      {/* VIGNETTE */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      {/* GRAIN */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCI+PHJlY3Qgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')",
        }}
      />
    </div>
  );
}
