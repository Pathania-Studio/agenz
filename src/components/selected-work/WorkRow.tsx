"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Volume2, VolumeX } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  index: number;
  video: string;
  images: string[];
};

export default function WorkRow({ index, video, images }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const bigRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const smallRefs = useRef<(HTMLDivElement | null)[]>([]);
  const smallImgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [muted, setMuted] = useState(true);
  const isReversed = index % 2 !== 0;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const row = rowRef.current!;
      const big = bigRef.current!;
      const videoEl = videoRef.current!;
      const smalls = smallRefs.current.filter(Boolean) as HTMLDivElement[];

      videoEl.muted = muted;
      videoEl.pause();

      /* ENTRY */
      const fromX = isReversed ? 120 : -120;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 85%",
          end: "top 30%",
          scrub: 1.6,
        },
      });

      tl.fromTo(
        big,
        { x: fromX, scale: 0.9, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, ease: "power4.out" },
      );

      smalls.forEach((card, i) => {
        tl.fromTo(
          card,
          { y: i === 0 ? 80 : -80, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, ease: "power3.out" },
          "-=0.6",
        );
      });

      /* VIDEO PLAY */
      ScrollTrigger.create({
        trigger: row,
        start: "top 45%",
        end: "bottom 45%",
        onEnter: () => videoEl.play(),
        onLeave: () => videoEl.pause(),
        onEnterBack: () => videoEl.play(),
        onLeaveBack: () => videoEl.pause(),
      });

      /* PARALLAX */
      [big, ...smalls].forEach((card) => {
        const media = card.querySelector("video, img");
        if (!media) return;

        gsap.fromTo(
          media,
          { y: -40 },
          {
            y: 40,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          },
        );
      });

      /* HOVER / TAP OVERLAY */
      [...smalls, big].forEach((card, i) => {
        const overlay = overlayRefs.current[i];
        const img = smallImgRefs.current[i];

        if (!overlay) return;

        const show = () => {
          if (img) gsap.to(img, { scale: 1.12, duration: 0.6 });
          gsap.to(overlay, { y: 0, opacity: 1, duration: 0.35 });
        };

        const hide = () => {
          if (img) gsap.to(img, { scale: 1, duration: 0.6 });
          gsap.to(overlay, { y: 40, opacity: 0, duration: 0.35 });
        };

        card.addEventListener("mouseenter", show);
        card.addEventListener("mouseleave", hide);
        card.addEventListener("touchstart", show);
        card.addEventListener("touchend", hide);
      });
    }, rowRef);

    return () => ctx.revert();
  }, [isReversed, muted]);

  return (
    <div
      ref={rowRef}
      className={`flex flex-col lg:flex-row ${
        isReversed ? "lg:flex-row-reverse" : ""
      } gap-16 lg:gap-28`}
    >
      {/* BIG VIDEO */}
      <div
        ref={bigRef}
        className="relative w-full lg:w-[60%] h-[320px] sm:h-[420px] lg:h-[540px] rounded-3xl overflow-hidden bg-zinc-900"
      >
        <video
          ref={videoRef}
          src={video}
          muted={muted}
          loop
          playsInline
          className="w-full h-full object-cover"
        />

        {/* AUDIO */}
        <button
          onClick={() => setMuted((v) => !v)}
          className="absolute bottom-4 left-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 backdrop-blur border border-white/10 text-white active:scale-95"
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

        {/* VIDEO OVERLAY */}
        <div
          ref={(el) => {
            if (el) overlayRefs.current[images.length] = el;
          }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 translate-y-10 opacity-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6"
        >
          <h3 className="text-base sm:text-lg font-medium">Brand Film</h3>
          <p className="text-xs sm:text-sm text-white/60">
            Motion · Strategy · Visual
          </p>
        </div>
      </div>

      {/* IMAGES */}
      <div className="flex w-full lg:w-[40%] flex-col gap-10">
        {images.map((img, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) smallRefs.current[i] = el;
            }}
            className="relative h-[200px] sm:h-[240px] rounded-2xl overflow-hidden bg-zinc-800"
          >
            <img
              ref={(el) => {
                if (el) smallImgRefs.current[i] = el;
              }}
              src={img}
              alt=""
              className="w-full h-full object-cover will-change-transform"
            />

            <div
              ref={(el) => {
                if (el) overlayRefs.current[i] = el;
              }}
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 translate-y-10 opacity-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5"
            >
              <p className="text-sm font-medium">Product Visual</p>
              <p className="text-xs text-white/60">UI · Marketing</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
