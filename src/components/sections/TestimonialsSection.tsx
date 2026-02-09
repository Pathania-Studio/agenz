"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  titleRef?: React.RefObject<HTMLHeadingElement | null>;
  lineRef?: React.RefObject<HTMLDivElement | null>;
  introRef?: React.RefObject<HTMLParagraphElement | null>;
}

export default function TestimonialsSection({ testimonials, titleRef, lineRef, introRef }: TestimonialsSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const cards = gsap.utils.toArray<HTMLElement>(".testimonial-card");

      // duplicate cards once (no re-render, no index reset)
      cards.forEach((card) => {
        const clone = card.cloneNode(true) as HTMLElement;
        track.appendChild(clone);
      });

      const totalWidth = cards.reduce((acc, card) => acc + card.offsetWidth + 24, 0);

      gsap.set(track, { x: 0 });

      // infinite timeline
      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease: "none" },
      });

      tl.to(track, {
        x: `-=${totalWidth}`,
        duration: totalWidth / 60, // speed (px/sec)
      });

      tlRef.current = tl;

      // hover pause
      containerRef.current?.addEventListener("mouseenter", () => {
        tl.pause();
      });
      containerRef.current?.addEventListener("mouseleave", () => {
        tl.resume();
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const nudge = (dir: number) => {
    if (!tlRef.current) return;
    gsap.to(tlRef.current, {
      timeScale: dir > 0 ? 1.8 : 0.4,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(tlRef.current!, {
          timeScale: 1,
          duration: 0.6,
          ease: "power2.out",
        });
      },
    });
  };

  return (
    <section className="relative bg-neutral-950 text-white py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        {/* LEFT EXPLAINER */}
        <div className="space-y-6">
          <h2 ref={titleRef} className="text-4xl font-bold leading-tight">
            What Our <br /> Clients Say
          </h2>

          <div ref={lineRef} className="h-1 w-20 bg-gradient-to-r from-violet-500 to-blue-500" />

          <p ref={introRef} className="text-neutral-400 max-w-md">
            {" "}
            Trusted by teams who value clarity, creativity, and execution.
          </p>
        </div>

        {/* RIGHT INFINITE FLOW */}
        <div ref={containerRef} className="lg:col-span-2 relative overflow-hidden">
          {/* MASKS */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10" />

          <div ref={trackRef} className="flex gap-6 will-change-transform">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CARD ---------------- */

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="testimonial-card min-w-[300px] max-w-[300px] rounded-2xl bg-neutral-900 p-6 border border-white/10 hover:border-white/30 transition">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-12 w-12 rounded-full bg-neutral-700 flex items-center justify-center text-sm font-bold">
          {testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-xs text-neutral-400">{testimonial.role}</p>
        </div>
      </div>

      <p className="text-sm text-neutral-300 italic mb-4">“{testimonial.content}”</p>

      <div className="flex text-yellow-400 text-sm">{"★★★★★".slice(0, testimonial.rating || 5)}</div>
    </div>
  );
}
