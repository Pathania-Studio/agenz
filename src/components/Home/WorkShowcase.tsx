"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    title: "Nike Campaign",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    title: "Spotify Motion",
    category: "Motion Design",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
  },
  {
    title: "SaaS Platform",
    category: "Web Design",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    title: "Fashion Reel",
    category: "Video Production",
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
  },
  {
    title: "Creative Studio",
    category: "UI / UX",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function WorkShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const panels = gsap.utils.toArray<HTMLElement>(".work-panel");
    const scrollWidth = track.scrollWidth - window.innerWidth;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${track.scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // horizontal scroll
    tl.to(track, {
      x: -scrollWidth,
      ease: "none",
    });

    // per-panel animations
    panels.forEach((panel) => {
      const image = panel.querySelector("img");
      const text = panel.querySelector(".work-text");

      gsap.fromTo(
        image,
        { scale: 1.2 },
        {
          scale: 1,
          scrollTrigger: {
            trigger: panel,
            start: "left center",
            end: "right center",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        text,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: panel,
            start: "left center",
            end: "center center",
            scrub: true,
          },
        },
      );
    });

    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black text-white">
      {/* Section intro */}
      <div className="absolute left-0 top-20 z-20 w-full text-center">
        <p className="mb-2 text-sm uppercase tracking-widest text-gray-400">Selected Work</p>
        <h2 className="text-4xl font-bold md:text-6xl">Projects That Define Us</h2>
      </div>

      {/* Horizontal track */}
      <div ref={trackRef} className="flex h-screen">
        {projects.map((project, i) => (
          <div key={i} className="work-panel relative h-full w-screen flex-shrink-0 overflow-hidden">
            {/* Background image */}
            <img src={project.image} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Text */}
            <div className="work-text relative z-10 flex h-full flex-col items-center justify-center text-center">
              <p className="mb-3 text-sm uppercase tracking-widest text-gray-300">{project.category}</p>
              <h3 className="text-4xl font-bold md:text-6xl">{project.title}</h3>
            </div>
          </div>
        ))}
      </div>
      {/* Exit gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-b from-transparent to-black" />
    </section>
  );
}
