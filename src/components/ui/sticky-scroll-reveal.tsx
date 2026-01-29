"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, motion } from "motion/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const breakpoints = content.map((_, index) => index / (cardLength - 1));
    const closest = breakpoints.reduce((acc, point, index) => {
      const distance = Math.abs(latest - point);
      if (distance < Math.abs(latest - breakpoints[acc])) return index;
      return acc;
    }, 0);
    setActiveCard(closest);
  });

  // 🎬 Smooth GSAP Heading Animation
  useEffect(() => {
    const current = headingRefs.current[activeCard];
    const others = headingRefs.current.filter((_, i) => i !== activeCard);

    if (!current) return;

    // Fade out other headings smoothly
    gsap.to(others, {
      y: -40,
      opacity: 0.15,
      scale: 0.96,
      duration: 0.6,
      ease: "power2.out",
    });

    // Animate active heading
    gsap.fromTo(
      current,
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power4.out",
      },
    );
  }, [activeCard]);

  return (
    <div ref={ref} className="relative flex h-[300vh] justify-center gap-16 p-10 bg-neutral-950">
      {/* LEFT TEXT */}
      <div className="max-w-xl">
        {content.map((item, index) => (
          <div key={index} className="h-screen flex flex-col justify-center">
            <h2
              ref={(el) => {
                headingRefs.current[index] = el;
              }}
              className="text-5xl md:text-7xl font-bold text-white leading-tight will-change-transform"
              style={{ opacity: index === 0 ? 1 : 0.15 }}>
              {item.title}
            </h2>

            <motion.p animate={{ opacity: activeCard === index ? 1 : 0.3 }} transition={{ duration: 0.4 }} className="mt-8 text-neutral-300 text-lg md:text-xl">
              {item.description}
            </motion.p>
          </div>
        ))}
      </div>

      {/* RIGHT STICKY MOCKUP */}
      <div className={cn("sticky top-20 hidden h-[80vh] w-full max-w-[550px] lg:flex items-center justify-center", contentClassName)}>
        <motion.div key={activeCard} initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }} className="flex items-center justify-center">
          {content[activeCard].content}
        </motion.div>
      </div>
    </div>
  );
};
