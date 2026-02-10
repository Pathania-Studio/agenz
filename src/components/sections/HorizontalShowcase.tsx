"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Video from "../Video";

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
const textFill = textBlock.querySelector(".text-fill");
const textDesc = textBlock.querySelector(".text-desc");

/* ─────────────────────────────────────────────
   TEXT FILL ON SCROLL
───────────────────────────────────────────── */
gsap.fromTo(
  textFill,
  { clipPath: "inset(0 100% 0 0)" },
  {
    clipPath: "inset(0 0% 0 0)",
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top+=120",
      end: "+=420",
      scrub: true,
    },
  },
);

/* TEXT PARALLAX DRIFT */
gsap.to(textBlock, {
  x: -120,
  ease: "none",
  scrollTrigger: {
    trigger: section,
    start: "top top",
    end: "+=500",
    scrub: true,
  },
});

/* DESCRIPTION FADE */
gsap.to(textDesc, {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: section,
    start: "top top+=180",
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
          start: "left center+=220",
          end: "right center-=220",

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
        start: "left center+=220",
        end: "right center-=220",

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
    <section ref={sectionRef} className="relative h-screen  transition-colors duration-500">
      <div className="h-full overflow-hidden">
        <div ref={trackRef} className="flex h-full items-center gap-[240px] px-[200px]">
          {/* TEXT */}
<div className="min-w-[520px] relative">
  <h2 className="relative text-[72px] font-bold leading-[1.05] tracking-tight">
    {/* Outline */}
    <span className="block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]">
      MEDIA PRODUCTION
    </span>

    {/* Fill */}
    <span
      className="text-fill absolute inset-0 text-white
                 [clip-path:inset(0_100%_0_0)]"
    >
      MEDIA PRODUCTION
    </span>
  </h2>

  <p
    className="text-desc mt-8 text-lg text-zinc-400 max-w-md opacity-0"
  >
     Films and visual content crafted for brands, platforms, and scale.
  </p>
</div>


          {/* PREVIEW CARD */}
          <div className="relative min-w-[820px] h-[520px] rounded-[32px] overflow-hidden bg-zinc-800 shadow-2xl">
            <Video
  src="https://res.cloudinary.com/dhhb38ito/video/upload/v1770353808/W_Ad_Films_kxvrhm.mp4"
  className="w-full h-full object-cover"
/>
            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-[2]" />

            {/* TEXT OVERLAY */}
            <div className="absolute inset-0 z-[3] flex items-center justify-center text-center px-6">
              <h3 className="text-white text-[42px] md:text-[56px] font-semibold tracking-wide drop-shadow-[0_4px_18px_rgba(0,0,0,0.7)]">
                Brand Films
              </h3>
            </div>
          </div>

          {/* HERO VIDEO CARD */}
          <div className="relative min-w-[820px] h-[520px] rounded-[32px] overflow-hidden bg-zinc-800 shadow-2xl">
            <Video src="https://res.cloudinary.com/dhhb38ito/video/upload/v1770353814/W_Promos_onlccd.mp4" loop playsInline className="w-full h-full object-cover" />
            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-[2]" />

            {/* TEXT OVERLAY */}
            <div className="absolute inset-0 z-[3] flex items-center justify-center text-center px-6">
              <h3 className="text-white text-[42px] md:text-[56px] font-semibold tracking-wide drop-shadow-[0_4px_18px_rgba(0,0,0,0.7)]">
                Ad Films
              </h3>
            </div>
            <button className="mute-btn absolute top-4 right-4 z-10 opacity-0 pointer-events-none transition-opacity duration-300">🔇</button>
          </div>
          <div className="relative min-w-[820px] h-[520px] rounded-[32px] overflow-hidden bg-zinc-800 shadow-2xl">
            <Video
              src="https://res.cloudinary.com/dhhb38ito/video/upload/v1770353816/W_Corporate_Films_bqphi2.mp4"
              className="w-full h-full object-cover"
            />
            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-[2]" />

            {/* TEXT OVERLAY */}
            <div className="absolute inset-0 z-[3] flex items-center justify-center text-center px-6">
              <h3 className="text-white text-[42px] md:text-[56px] font-semibold tracking-wide drop-shadow-[0_4px_18px_rgba(0,0,0,0.7)]">
                Corporate Films
              </h3>
            </div>
          </div>

          {/* HERO VIDEO CARD */}
          <div className="relative min-w-[820px] h-[520px] rounded-[32px] overflow-hidden bg-zinc-800 shadow-2xl">
            <Video src="https://res.cloudinary.com/dhhb38ito/video/upload/v1770353822/1_xazou5.mp4" loop playsInline className="w-full h-full object-cover" />
            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-[2]" />

            {/* TEXT OVERLAY */}
            <div className="absolute inset-0 z-[3] flex items-center justify-center text-center px-6">
              <h3 className="text-white text-[42px] md:text-[56px] font-semibold tracking-wide drop-shadow-[0_4px_18px_rgba(0,0,0,0.7)]">
                Product & Promo Videos
              </h3>
            </div>

            <button className="mute-btn absolute top-4 right-4 z-10 opacity-0 pointer-events-none transition-opacity duration-300">🔇</button>
          </div>
        </div>
      </div>
    </section>
  );
}
