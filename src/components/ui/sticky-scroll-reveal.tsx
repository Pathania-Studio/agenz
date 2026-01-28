"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
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

  return (
    <div
      ref={ref}
      className="relative flex h-[300vh] justify-center gap-16 p-10 bg-neutral-950"
    >
      {/* LEFT TEXT */}
      <div className="max-w-xl">
        {content.map((item, index) => (
          <div
            key={index}
            className="h-screen flex flex-col justify-center"
          >
            <motion.h2
              animate={{ opacity: activeCard === index ? 1 : 0.3 }}
              className="text-3xl font-bold text-white"
            >
              {item.title}
            </motion.h2>

            <motion.p
              animate={{ opacity: activeCard === index ? 1 : 0.3 }}
              className="mt-6 text-neutral-300 text-lg"
            >
              {item.description}
            </motion.p>
          </div>
        ))}
      </div>

      {/* RIGHT STICKY MOCKUP */}
      <div
        className={cn(
          "sticky top-20 hidden h-[80vh] w-full max-w-[550px] lg:flex items-center justify-center"
,
          contentClassName
        )}
      >
        <motion.div
          key={activeCard}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center"
        >
          {content[activeCard].content}
        </motion.div>
      </div>
    </div>
  );
};
