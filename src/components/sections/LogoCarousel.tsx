"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

interface Logo {
  id: number;
  src: string;
  alt: string;
}

interface LogoCarouselProps {
  logos: Logo[];
}

export default function LogoInfiniteCarousel({ logos }: LogoCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const items = Array.from(track.children) as HTMLElement[];

      // Duplicate items ONCE
      items.forEach((item) => {
        const clone = item.cloneNode(true) as HTMLElement;
        track.appendChild(clone);
      });

      const itemWidth = items[0].offsetWidth;
      const gap = 48; // must match gap-x
      const totalWidth = (itemWidth + gap) * items.length;

      gsap.set(track, { x: 0 });

      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none" },
      });

      tl.to(track, {
        x: `-=${totalWidth}`,
        duration: totalWidth / 40, // SPEED CONTROL (lower = faster)
      });

      tlRef.current = tl;

      // Hover = slow down
      containerRef.current?.addEventListener("mouseenter", () => {
        gsap.to(tl, { timeScale: 0.35, duration: 0.4, ease: "power2.out" });
      });

      containerRef.current?.addEventListener("mouseleave", () => {
        gsap.to(tl, { timeScale: 1, duration: 0.6, ease: "power2.out" });
      });

      // Subtle float (very light)
      gsap.to(".logo-item", {
        y: () => gsap.utils.random(-6, 6),
        duration: () => gsap.utils.random(4, 7),
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.15,
          from: "random",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      <div ref={trackRef} className="flex items-center gap-12 will-change-transform">
        {logos.map((logo) => (
          <div key={logo.id} className="logo-item shrink-0 w-40 h-20 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300">
            <div className="relative w-full h-full">
              <Image src={logo.src} alt={logo.alt} fill className="object-contain grayscale hover:grayscale-0 transition duration-300" sizes="160px" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
