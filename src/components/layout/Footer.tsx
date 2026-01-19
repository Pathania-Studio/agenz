"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const glow = glowRef.current;
    if (!footer || !glow) return;

    // Disable on mobile
    if (window.innerWidth < 768) return;

    // Idle floating animation (always alive)
    gsap.to(glow, {
      x: "+=40",
      y: "+=30",
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Mouse follow (relative to footer)
    const move = (e: MouseEvent) => {
      const rect = footer.getBoundingClientRect();

      const x = e.clientX - rect.left - 250;
      const y = e.clientY - rect.top - 250;

      gsap.to(glow, {
        x,
        y,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    footer.addEventListener("mousemove", move);
    return () => footer.removeEventListener("mousemove", move);
  }, []);

  return (
    <footer ref={footerRef} className="relative h-screen overflow-hidden bg-black text-white">
      {/* Glow Ball */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute left-0 top-0
                   h-[500px] w-[500px] rounded-full
                   bg-gradient-to-r from-purple-500/30 to-pink-500/30
                   blur-3xl"
      />

      {/* Center Logo */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <Image src="/logo.png" alt="Agenz" width={680} height={680} priority className="opacity-95" />
      </div>

      {/* Bottom-left copyright */}
      <p className="absolute bottom-8 left-8 z-10 text-sm text-gray-400">© 2026 Agenz</p>
    </footer>
  );
}
