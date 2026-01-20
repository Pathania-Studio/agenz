"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const VideoPinSection = () => {
  const sectionRef = useRef(null);
  const videoBoxRef = useRef(null);
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useGSAP(
    () => {
      if (!isMobile && sectionRef.current && videoBoxRef.current) {
        // Ensure initial state
        gsap.set(videoBoxRef.current, {
          clipPath: "circle(6% at 50% 50%)",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=200%",
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.to(videoBoxRef.current, {
          clipPath: "circle(100% at 50% 50%)",
          ease: "power1.inOut",
          duration: 1,
        });
      }
    },
    { dependencies: [isMobile] }
  );

  return (
    <section ref={sectionRef} className="vd-pin-section relative w-full">
      <div
        ref={videoBoxRef}
        style={{
          clipPath: isMobile ? "circle(100% at 50% 50%)" : "circle(6% at 50% 50%)",
        }}
        className="size-full video-box absolute inset-0">
        <video 
          src="/videos/pin-video.mp4" 
          playsInline 
          muted 
          loop 
          autoPlay 
          className="w-full h-full object-cover"
        />

        <div className="abs-center md:scale-100 scale-200">
          <img src="/images/circle-text.svg" alt="" className="spin-circle" />
          <div className="play-btn">
            <img src="/images/play.svg" alt="" className="size-[3vw] ml-[.5vw]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPinSection;
