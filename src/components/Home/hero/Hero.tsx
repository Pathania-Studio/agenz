"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const maskWrapRef = useRef<HTMLDivElement>(null);
  const fullVideoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    if (
      !heroRef.current ||
      !logoRef.current ||
      !maskWrapRef.current ||
      !fullVideoRef.current
    )
      return;

    /* -----------------------------
       INITIAL STATES
    ------------------------------ */
    gsap.set(maskWrapRef.current, {
      scale: 0.6,
      opacity: 0,
      transformOrigin: "center center",
    });

    gsap.set(fullVideoRef.current, {
      opacity: 0,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom+=200% top", // 🔥 TOTAL = 3 SCROLLS
        scrub: true,
        pin: true,
        pinSpacing: true, // 🔥 CRITICAL
        anticipatePin: 1,
      },
    });

    /* =================================================
       SCROLL 1 — LOGO → TEXT (FAST)
       ================================================= */
    tl.to(logoRef.current, {
      opacity: 0,
      scale: 0.9,
      ease: "power1.out",
      duration: 1,
    });

    tl.to(
      maskWrapRef.current,
      {
        opacity: 1,
        scale: 1,
        ease: "power1.out",
        duration: 1,
      },
      "<"
    );

    /* =================================================
       SCROLL 2 — TEXT → FULLSCREEN VIDEO
       ================================================= */
    tl.to(maskWrapRef.current, {
      scale: 5,
      ease: "power2.inOut",
      duration: 1,
    });

    tl.to(maskWrapRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power1.out",
    });

    tl.to(
      fullVideoRef.current,
      {
        opacity: 1,
        duration: 0.3,
        ease: "power1.out",
      },
      "<"
    );

    /* =================================================
       SCROLL 3 — HOLD VIDEO (NO CHANGE)
       ================================================= */
    tl.to({}, { duration: 1 }); // 🔥 HOLD

  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* LOGO */}
      <img
        ref={logoRef}
        src="/logo.png"
        alt="Agenz logo"
        className="absolute inset-0 m-auto z-30 w-[420px]"
      />

      {/* TEXT MASK VIDEO */}
      <div
        ref={maskWrapRef}
        className="absolute inset-0 z-20 flex items-center justify-center"
      >
        <div className="w-[80vw] max-w-[1400px] aspect-[1600/600]">
          <svg
            viewBox="0 0 1600 600"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <mask id="text-mask">
                <rect width="100%" height="100%" fill="black" />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="260"
                  fontWeight="800"
                  fill="white"
                >
                  Agenz
                </text>
              </mask>
            </defs>

            <foreignObject width="100%" height="100%" mask="url(#text-mask)">
              <video
                src="/videos/hero-bg.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </foreignObject>
          </svg>
        </div>
      </div>

      {/* FULLSCREEN VIDEO */}
      <video
        ref={fullVideoRef}
        src="/videos/hero-bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 z-10 w-full h-full object-cover"
      />
    </section>
  );
}
