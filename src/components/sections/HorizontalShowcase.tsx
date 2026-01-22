"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const track = trackRef.current!;
      const items = Array.from(track.children) as HTMLElement[];

      const textBlock = items[0];
      const cards = items.slice(1);

      const heroCard = cards[cards.length - 1];
      const heroVideo = heroCard.querySelector("video") as HTMLVideoElement;
      const muteBtn = heroCard.querySelector(".mute-btn") as HTMLButtonElement;

      // ─────────────────────────────────────────────
      // SCROLL DISTANCE (CENTER + HOLD)
      // ─────────────────────────────────────────────
      const getScrollDistance = () => {
        const centerX = heroCard.offsetLeft - window.innerWidth / 2 + heroCard.offsetWidth / 2;

        const hold = window.innerWidth * 0.35;
        return centerX + hold;
      };

      // ─────────────────────────────────────────────
      // MAIN HORIZONTAL SCROLL
      // ─────────────────────────────────────────────
      const containerTween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 1.4,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ─────────────────────────────────────────────
      // TEXT ENTER
      // ─────────────────────────────────────────────
      gsap.fromTo(
        textBlock,
        { opacity: 0, x: 120 },
        {
          opacity: 1,
          x: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        },
      );

      // TEXT DRIFT
      gsap.to(textBlock, {
        x: -80,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=400",
          scrub: true,
        },
      });

      // ─────────────────────────────────────────────
      // CARD DEPTH
      // ─────────────────────────────────────────────
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.94, opacity: 0.6 },
          {
            scale: 1,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              containerAnimation: containerTween,
              start: "left center",
              end: "center center",
              scrub: true,
            },
          },
        );
      });

      // ─────────────────────────────────────────────
      // VIDEO VISIBILITY (ALL CARDS)
      // ─────────────────────────────────────────────
      cards.forEach((card) => {
        const vid = card.querySelector("video") as HTMLVideoElement | null;
        if (!vid) return;

        vid.pause();
        vid.currentTime = 0;

        ScrollTrigger.create({
          trigger: card,
          containerAnimation: containerTween,

          // fully visible window
          start: "left center+=160",
          end: "right center-=160",

          onEnter: () => vid.play(),
          onEnterBack: () => vid.play(),
          onLeave: () => vid.pause(),
          onLeaveBack: () => vid.pause(),
        });
      });

      // ─────────────────────────────────────────────
      // HERO VIDEO ENHANCEMENTS
      // ─────────────────────────────────────────────
      muteBtn.onclick = () => {
        heroVideo.muted = !heroVideo.muted;
        muteBtn.textContent = heroVideo.muted ? "🔇" : "🔊";
      };

      ScrollTrigger.create({
        trigger: heroCard,
        containerAnimation: containerTween,
        start: "left center+=160",
        end: "right center-=160",

        onEnter: () => {
          gsap.to(heroCard, {
            scale: 1.03,
            duration: 0.6,
            ease: "power3.out",
          });

          section.classList.add("video-focus-bg");
          muteBtn.classList.remove("opacity-0", "pointer-events-none");
        },

        onLeave: () => {
          gsap.to(heroCard, {
            scale: 1,
            duration: 0.4,
            ease: "power3.out",
          });

          section.classList.remove("video-focus-bg");
          muteBtn.classList.add("opacity-0", "pointer-events-none");
        },

        onEnterBack: () => {
          gsap.to(heroCard, {
            scale: 1.03,
            duration: 0.6,
            ease: "power3.out",
          });

          section.classList.add("video-focus-bg");
          muteBtn.classList.remove("opacity-0", "pointer-events-none");
        },

        onLeaveBack: () => {
          gsap.to(heroCard, {
            scale: 1,
            duration: 0.4,
            ease: "power3.out",
          });

          section.classList.remove("video-focus-bg");
          muteBtn.classList.add("opacity-0", "pointer-events-none");
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen bg-black text-white transition-colors duration-500">
      <div className="h-full overflow-hidden">
        <div ref={trackRef} className="flex h-full items-center gap-[240px] px-[200px]">
          {/* TEXT */}
          <div className="min-w-[520px]">
            <h2 className="text-[72px] font-bold leading-[1.05]">Media Production</h2>
            <p className="mt-8 text-lg text-zinc-400 max-w-md">Award-winning digital experiences built with motion, storytelling, and performance in mind.</p>
          </div>

          {/* PREVIEW CARD */}
          <div className="relative min-w-[820px] h-[520px] rounded-[32px] overflow-hidden bg-zinc-800 shadow-2xl">
            <video src="/videos/hero-bg.mp4" muted loop playsInline className="w-full h-full object-cover" />
          </div>

          {/* HERO VIDEO CARD */}
          <div className="relative min-w-[820px] h-[520px] rounded-[32px] overflow-hidden bg-zinc-800 shadow-2xl">
            <video src="/videos/hero-bg.mp4" muted loop playsInline className="w-full h-full object-cover" />

            <button className="mute-btn absolute top-4 right-4 z-10 opacity-0 pointer-events-none transition-opacity duration-300">🔇</button>
          </div>
        </div>
      </div>
    </section>
  );
}
