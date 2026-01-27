"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import WorkRow from "./WorkRow";

gsap.registerPlugin(ScrollTrigger);
//comment
export default function SelectedWorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  const works = [
    { video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1769485719/BrighChamps_Property_xlpqto.mp4", images: ["/images/1.jpg", "/images/2.jpg"] },
    { video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1769485276/Happilo_Video_1_bg1f8a.mp4", images: ["https://res.cloudinary.com/dhhb38ito/image/upload/v1769486781/H210_F3_Coworking_Breakout_2_nfzadb.jpg", "https://res.cloudinary.com/dhhb38ito/image/upload/v1769486979/DSC02179s_1_gtqrfh.jpg"] },
  ];

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      /* TEXT */
      if (!prefersReducedMotion) {
        gsap.fromTo(
          fillRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 30%",
              scrub: true,
            },
          },
        );

        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left",
            duration: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 55%",
            },
          },
        );

        gsap.fromTo(
          descRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 45%",
            },
          },
        );
      }

      /* BLOBS */
      if (!prefersReducedMotion && window.innerWidth >= 1024) {
        gsap.to(blob1Ref.current, {
          y: 160,
          rotation: 25,
          duration: 26,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(blob2Ref.current, {
          y: -180,
          rotation: -30,
          duration: 32,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.fromTo(
          blob1Ref.current,
          { yPercent: -12 },
          {
            yPercent: 12,
            scrub: 1.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
            },
          },
        );

        gsap.fromTo(
          blob2Ref.current,
          { yPercent: 14 },
          {
            yPercent: -14,
            scrub: 1.4,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
            },
          },
        );

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = Math.abs(self.getVelocity());
            const o = gsap.utils.clamp(0.18, 0.35, v / 2500);

            gsap.to(blob1Ref.current, { opacity: o, duration: 0.3 });
            gsap.to(blob2Ref.current, { opacity: o * 0.85, duration: 0.3 });
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[220vh] overflow-hidden"
    >
      {/* BACKGROUND BLOBS */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div
          ref={blob1Ref}
          className="absolute -top-48 -left-48 w-[760px] h-[760px] rounded-full
                     bg-purple-500/40 blur-[200px]
                     mix-blend-screen opacity-25"
        />
        <div
          ref={blob2Ref}
          className="absolute top-1/3 -right-60 w-[860px] h-[860px] rounded-full
                     bg-sky-400/35 blur-[220px]
                     mix-blend-screen opacity-25"
        />
      </div>

      {/* HEADER */}
      <div className="relative z-10 max-w-[90%] mx-auto pt-24 mb-56">
        <h2 className="relative text-[clamp(4rem,9vw,8rem)] font-semibold tracking-tight leading-none">
          <span className="block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]">
            SELECTED WORK
          </span>
          <span ref={fillRef} className="absolute inset-0 text-white">
            SELECTED WORK
          </span>
        </h2>

        <div ref={lineRef} className="mt-10 h-px w-44 bg-white/60 scale-x-0" />

        <p ref={descRef} className="mt-8 max-w-xl text-lg text-white/70">
          A curated selection of projects blending design, motion,
          and engineering into polished digital experiences.
        </p>
      </div>

      {/* WORK */}
      <div className="relative z-10 max-w-[90%] mx-auto space-y-28">
        {works.map((work, i) => (
          <WorkRow key={i} index={i} {...work} />
        ))}
      </div>
    </section>
  );
}
