"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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
  const smallRefs = useRef<HTMLDivElement[]>([]);
  const smallImgRefs = useRef<HTMLImageElement[]>([]);
  const overlayRefs = useRef<HTMLDivElement[]>([]);

  const isReversed = index % 2 !== 0;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const row = rowRef.current!;
      const big = bigRef.current!;
      const videoEl = videoRef.current!;
      const smalls = smallRefs.current;

      videoEl.pause();

      // ─────────────────────────────────────
      // ENTRY TIMELINE (CINEMATIC)
      // ─────────────────────────────────────
      const fromX = isReversed ? 180 : -180;
      const fromRot = isReversed ? -2 : 2;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 85%",
          end: "top 30%",
          scrub: 1.8,
        },
      });

      tl.set(row, { perspective: 1200 });

      tl.fromTo(
        big,
        {
          x: fromX,
          rotationY: fromRot,
          scale: 0.88,
          opacity: 0,
        },
        {
          x: 0,
          rotationY: 0,
          scale: 1,
          opacity: 1,
          ease: "power4.out",
          duration: 1.4,
        },
      );

      tl.fromTo(
        smalls[0],
        { y: 120, scale: 0.94, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          duration: 0.9,
        },
        "-=0.8",
      );

      tl.fromTo(
        smalls[1],
        { y: -120, scale: 0.94, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          duration: 0.9,
        },
        "-=0.75",
      );

      // ─────────────────────────────────────
      // VIDEO PLAY WHEN ROW ACTIVE
      // ─────────────────────────────────────
      let rowActive = false;

      ScrollTrigger.create({
        trigger: row,
        start: "top 45%",
        end: "bottom 45%",
        onEnter: () => {
          rowActive = true;
          videoEl.play();
        },
        onLeave: () => {
          rowActive = false;
          videoEl.pause();
        },
        onEnterBack: () => {
          rowActive = true;
          videoEl.play();
        },
        onLeaveBack: () => {
          rowActive = false;
          videoEl.pause();
        },
      });

      // ─────────────────────────────────────
      // PARALLAX INSIDE CARDS
      // ─────────────────────────────────────
      [big, ...smalls].forEach((card) => {
        const media = card.querySelector("video, img");
        if (!media) return;

        gsap.fromTo(
          media,
          { y: -50 },
          {
            y: 50,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.6,
            },
          },
        );
      });

      // ─────────────────────────────────────
      // SCROLL VELOCITY SKEW
      // ─────────────────────────────────────
      const proxy = { skew: 0 };
      const skewSetter = gsap.quickSetter([big, ...smalls], "skewY", "deg");

      ScrollTrigger.create({
        trigger: row,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-3, 3, self.getVelocity() / -400);
          if (Math.abs(v) > Math.abs(proxy.skew)) {
            proxy.skew = v;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3.out",
              onUpdate: () => skewSetter(proxy.skew),
            });
          }
        },
      });

      // ─────────────────────────────────────
      // HOVER LOGIC (IMAGE ZOOM + VIDEO PAUSE)
      // ─────────────────────────────────────
      smallRefs.current.forEach((card, i) => {
        const img = smallImgRefs.current[i];
        const overlay = overlayRefs.current[i + 1];

        card.addEventListener("mouseenter", () => {
          // pause video when inspecting images
          videoEl.pause();

          gsap.to(img, {
            scale: 1.25,
            duration: 0.8,
            ease: "power3.out",
          });

          gsap.to(card, {
            scale: 1.05,
            duration: 0.4,
            ease: "power3.out",
          });

          gsap.to(overlay, {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(img, {
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          });

          gsap.to(card, {
            scale: 1,
            duration: 0.4,
            ease: "power3.out",
          });

          gsap.to(overlay, {
            y: 40,
            opacity: 0,
            duration: 0.4,
            ease: "power3.out",
          });

          // resume video only if row still active
          if (rowActive) videoEl.play();
        });
      });
    }, rowRef);

    return () => ctx.revert();
  }, [isReversed]);

  return (
    <div ref={rowRef} className={`flex items-center gap-28 ${isReversed ? "flex-row-reverse" : ""}`}>
      {/* BIG VIDEO */}
      <div ref={bigRef} className="relative w-[60%] h-[540px] rounded-3xl overflow-hidden bg-zinc-800">
        <video ref={videoRef} src={video} muted loop playsInline className="w-full h-full object-cover" />

        <div
          ref={(el) => {
            if (el) overlayRefs.current[0] = el;
          }}
          className="absolute inset-0 bg-black/40 opacity-0 translate-y-12 flex items-end p-10">
          <div>
            <h3 className="text-2xl font-semibold">Project Title</h3>
          </div>
        </div>
      </div>

      {/* SMALL STACK */}
      <div className="flex flex-col gap-14 w-[40%]">
        {images.map((img, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) smallRefs.current[i] = el;
            }}
            className="relative h-[240px] rounded-2xl overflow-hidden bg-zinc-700">
            <img
              ref={(el) => {
                if (el) smallImgRefs.current[i] = el;
              }}
              src={img}
              className="w-full h-full object-cover will-change-transform"
              alt=""
            />
          </div>
        ))}
      </div>
    </div>
  );
}
