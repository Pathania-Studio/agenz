"use client";

import { motion } from "framer-motion";

type Props = {
  word: string;
};

export default function AnimatedWord({ word }: Props) {
  return (
    <span
      className="
        relative inline-flex items-center justify-center
        h-[1em] leading-none
      ">
      {word.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: "40%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "-40%" }}
          transition={{
            duration: 0.4,
            delay: i * 0.06,
            ease: "easeOut",
          }}
          className="inline-block">
          {char}
        </motion.span>
      ))}
    </span>
  );
}
