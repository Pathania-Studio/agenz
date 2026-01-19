"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const testimonials = [
  {
    quote: "Agenz didn’t just design our website — they shaped how our brand feels online.",
    name: "Rahul Mehta",
    role: "Founder, SaaSly",
  },
  {
    quote: "The team understands design, motion, and business. Rare combination.",
    name: "Ananya Sharma",
    role: "Marketing Lead, Growix",
  },
  {
    quote: "Working with Agenz felt effortless. Clear communication and strong execution.",
    name: "Kunal Verma",
    role: "Creative Director, Studio North",
  },
  {
    quote: "Design that actually converts. We saw results within weeks.",
    name: "Neha Kapoor",
    role: "Head of Growth, Scaleup",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  return (
    <section className="relative bg-black py-40 text-white overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 md:grid-cols-2 md:items-center">
        {/* LEFT SIDE */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <p className="mb-3 text-sm uppercase tracking-widest text-gray-400">Testimonials</p>
          <h2 className="mb-6 text-3xl font-semibold md:text-4xl">Loved by founders, creatives & teams</h2>
          <p className="max-w-md text-gray-400">We work closely with ambitious teams to build meaningful digital experiences that perform and inspire.</p>
        </motion.div>

        {/* RIGHT SIDE – SLIDER */}
        <div className="relative">
          {/* Cards track */}
          <motion.div className="flex gap-6" animate={{ x: `-${index * 320}px` }} transition={{ duration: 0.8, ease: "easeInOut" }}>
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`w-[300px] flex-shrink-0 rounded-2xl border 
                border-white/10 bg-white/5 p-6 backdrop-blur
                ${i === index ? "ring-1 ring-purple-500/40" : ""}`}>
                <p className="mb-6 text-gray-200">“{t.quote}”</p>
                <div>
                  <p className="font-medium text-white">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Arrows */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full 
                         border border-white/20 text-white hover:bg-white/10">
              ←
            </button>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full 
                         border border-white/20 text-white hover:bg-white/10">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
