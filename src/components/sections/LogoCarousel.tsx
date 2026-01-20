"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface Logo {
  id: number;
  src: string;
  alt: string;
}

interface LogoCarouselProps {
  logos: Logo[];
}

export default function LogoCarousel({ logos }: LogoCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const container = containerRef.current;
    const scroller = scrollerRef.current;

    // Duplicate logos for infinite effect
    const logosToShow = [...logos, ...logos];

    // Calculate total width needed
    const totalWidth = logosToShow.length * 160; // 160px per logo (w-40)

    // Set the scroller width
    scroller.style.width = `${totalWidth}px`;

    // Animation
    let animationFrameId: number;
    let position = 0;
    const speed = 0.5; // pixels per frame

    const animate = () => {
      position -= speed;

      // Reset position when scrolled one full width
      if (position <= -totalWidth / 2) {
        position = 0;
      }

      scroller.style.transform = `translateX(${position}px)`;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(animate);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [logos]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden py-8">
      <div ref={scrollerRef} className="flex items-center space-x-10 will-change-transform">
        {[...logos, ...logos].map((logo, index) => (
          <div key={`${logo.id}-${index}`} className="flex-shrink-0 w-40 h-20 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
            <div className="relative w-full h-full">
              <Image src={logo.src} alt={logo.alt} fill className="object-contain" sizes="(max-width: 768px) 100px, 160px" />
            </div>
          </div>
        ))}
      </div>

      {/* Gradient fades */}
      <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white dark:from-gray-800 to-transparent z-10"></div>
      <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white dark:from-gray-800 to-transparent z-10"></div>
    </div>
  );
}
