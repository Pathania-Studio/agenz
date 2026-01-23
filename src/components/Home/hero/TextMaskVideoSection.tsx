"use client";

import { forwardRef, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const TextMaskVideoSection = forwardRef<HTMLDivElement>((_, externalRef) => {
  const sectionRef = useRef<HTMLElement>(null);
  const maskWrapRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useGSAP(
    () => {
      if (!sectionRef.current || !maskWrapRef.current) return;

      gsap.set(maskWrapRef.current, {
        scale: isMobile ? 1 : 0.4,
        transformOrigin: "center center",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 1.5,
          pin: true,
        },
      });

      tl.to(maskWrapRef.current, {
        scale: isMobile ? 3 : 6,
        ease: "power1.inOut",
      });
    },
    { dependencies: [isMobile] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <div
        ref={(node) => {
          // 🔥 this connects BOTH refs
          maskWrapRef.current = node!;
          if (typeof externalRef === "function") externalRef(node);
          else if (externalRef) externalRef.current = node;
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 1600 600"
          className="w-[80vw] max-w-[1400px]"
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
                agenz
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
    </section>
  );
});

TextMaskVideoSection.displayName = "TextMaskVideoSection";
export default TextMaskVideoSection;
