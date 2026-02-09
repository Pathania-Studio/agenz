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
      // Check if refs exist before accessing them
      if (!titleRef.current || !lineRef.current || !introRef.current) return;

      const words = titleRef.current.querySelectorAll(".word");

      // Only animate words if they exist, otherwise animate the whole title
      if (words.length > 0) {
        gsap.set(words, { y: 80, opacity: 0 });
      } else {
        gsap.set(titleRef.current, { y: 80, opacity: 0 });
      }

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
      });

      // Animate words if they exist, otherwise animate the whole title
      if (words.length > 0) {
        tl.to(
          words,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power4.out",
            stagger: 0.08,
          },
          "-=0.2",
        );
      } else {
        tl.to(
          titleRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power4.out",
          },
          "-=0.2",
        );
      }

      tl.to(
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
    <section id="testimonials" ref={sectionRef}>
      <div className="container mx-auto">
        <TestimonialsSection testimonials={testimonials} titleRef={titleRef} lineRef={lineRef} introRef={introRef} />
      </div>
    </section>
  );
}
