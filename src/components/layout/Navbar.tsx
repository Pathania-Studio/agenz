"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;

    // Detect scroll direction
    if (latest > prev && latest > 80) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // Background change
    setScrolled(latest > 40);
  });

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 z-50 w-full transition-colors duration-300
        ${scrolled ? "bg-black/70 backdrop-blur border-b border-white/10" : "bg-transparent"}
      `}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-lg font-semibold">
          Agenz
        </Link>

        {/* Nav links */}
        <nav className="hidden items-center gap-8 text-sm md:flex">
          <Link href="#work" className="text-gray-300 hover:text-white">
            Work
          </Link>
          <Link href="#about" className="text-gray-300 hover:text-white">
            About
          </Link>
          <Link href="#contact" className="text-gray-300 hover:text-white">
            Contact
          </Link>
        </nav>

        {/* CTA */}
        <Link
          href="/contact"
          className="rounded-full border border-white/20 px-5 py-2 text-sm
                     transition hover:bg-white hover:text-black">
          Start Project
        </Link>
      </div>
    </motion.header>
  );
}
