"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TestimonialsSection from "./TestimonialsSection";

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialsWrapper({ testimonials }: { testimonials: any[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const words = titleRef.current!.querySelectorAll(".word");

      gsap.set(words, { y: 80, opacity: 0 });
      gsap.set(lineRef.current, { scaleX: 0 });
      gsap.set(introRef.current, { y: 20, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      tl.to(introRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out",
      })
        .to(
          words,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.08,
          },
          "-=0.2",
        )
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="pt-32 pb-20">
      <div className="container mx-auto">
        {/* HEADER */}
        <div className="max-w-3xl mx-auto text-center ">
          <p ref={introRef} className="text-sm uppercase tracking-widest text-neutral-500 mb-4">
            Testimonials
          </p>

          <h2 ref={titleRef} className="text-3xl md:text-5xl font-bold leading-tight">
            {["What", "people", "say", "after", "working", "with", "us"].map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-2">
                <span className="word inline-block">{word}</span>
              </span>
            ))}
          </h2>
        </div>

        {/* TESTIMONIALS */}
        <TestimonialsSection testimonials={testimonials} />
      </div>
    </section>
  );
}
