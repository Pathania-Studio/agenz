"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-black py-40 text-white">
      {/* Background glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[600px] w-[600px] 
                   -translate-x-1/2 -translate-y-1/2 rounded-full 
                   bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} className="mb-6 text-4xl font-semibold md:text-5xl">
          Let’s build something meaningful.
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.8 }} className="mx-auto mb-12 max-w-xl text-gray-400">
          Whether it’s a brand, website, or product — we help ambitious teams move forward with clarity and confidence.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-3 rounded-full 
                     bg-white px-8 py-4 font-medium text-black 
                     transition hover:bg-gray-100">
          Start a Project
          <span className="text-lg">→</span>
        </motion.a>
      </div>
    </section>
  );
}
