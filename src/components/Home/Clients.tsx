"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const logos = ["/logos/google.svg", "/logos/meta.svg", "/logos/netflix.svg", "/logos/spotify.svg", "/logos/adobe.svg", "/logos/airbnb.svg"];

export default function Clients() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowARef = useRef<HTMLDivElement>(null);
  const rowBRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Reveal section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      },
    );

    // Marquee timelines
    const tlA = gsap.to(rowARef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 40,
      ease: "none",
    });

    const tlB = gsap.to(rowBRef.current, {
      xPercent: 50,
      repeat: -1,
      duration: 45,
      ease: "none",
    });

    return () => {
      tlA.kill();
      tlB.kill();
    };
  }, []);

  return (
    <section className="relative bg-black pt-24 pb-32 text-white overflow-hidden -mt-24">
      {/* Heading */}
      <div className="mb-20 text-center">
        <p className="mb-3 text-sm uppercase tracking-widest text-gray-400">Trusted by</p>
        <h2 className="text-3xl font-semibold md:text-4xl">Brands & Growing Companies</h2>
      </div>

      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

      {/* Row A */}
      <div className="mb-10 overflow-hidden">
        <div ref={rowARef} className="flex w-[200%] items-center gap-24 opacity-80">
          {[...logos, ...logos].map((logo, i) => (
            <LogoItem key={`a-${i}`} src={logo} />
          ))}
        </div>
      </div>

      {/* Row B (optional but recommended) */}
      <div className="overflow-hidden">
        <div ref={rowBRef} className="flex w-[200%] items-center gap-24 opacity-60">
          {[...logos, ...logos].map((logo, i) => (
            <LogoItem key={`b-${i}`} src={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoItem({ src }: { src: string }) {
  return (
    <div className="flex h-16 w-40 items-center justify-center">
      <img src={src} alt="Client logo" className="max-h-10 object-contain grayscale transition duration-300 hover:grayscale-0" />
    </div>
  );
}
