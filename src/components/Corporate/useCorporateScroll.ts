"use client";

import { RefObject, useLayoutEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useCorporateScroll(containerRef: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Clear any existing scroll triggers
      ScrollTrigger.getAll().forEach((t) => t.kill());

      // Set initial states
      gsap.set(".screen-1", { opacity: 1, display: "block" });
      gsap.set([".screen-2", ".screen-3"], { opacity: 0, display: "none" });
      gsap.set(".screen-1-mockup", { scale: 1, x: 0 });

      // Screen 2 initial positions
      gsap.set(".screen-2-big", { y: 200 });
      gsap.set(".screen-2-small-a", { y: 300 });
      gsap.set(".screen-2-small-b", { y: 400 });

      // Screen 3 initial positions
      gsap.set(".screen-3-big", { x: 300 });
      gsap.set(".screen-3-small-a", { y: -200 });
      gsap.set(".screen-3-small-b", { y: 200 });

      // Create a timeline for the scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current?.parentElement,
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Screen 1 animation (first 33% of scroll)
      tl.to(".screen-1-mockup", {
        scale: 0.8,
        x: -200,
        duration: 0.5,
      })
        .to(
          ".screen-1",
          {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              gsap.set(".screen-1", { display: "none" });
              gsap.set(".screen-2", { display: "block" });
            },
          },
          "-0.3",
        )

        // Screen 2 animation (33-66% of scroll)
        .to(".screen-2", {
          opacity: 1,
          duration: 0.5,
        })
        .to(
          [".screen-2-big", ".screen-2-small-a", ".screen-2-small-b"],
          {
            y: 0,
            duration: 1,
            stagger: 0.1,
          },
          "<",
        )

        // Transition to Screen 3 (66-100% of scroll)
        .to(".screen-2", {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            gsap.set(".screen-2", { display: "none" });
            gsap.set(".screen-3", { display: "block" });
          },
        })
        .to(".screen-3", {
          opacity: 1,
          duration: 0.5,
        })
        .to(
          [".screen-3-big", ".screen-3-small-a", ".screen-3-small-b"],
          {
            x: 0,
            y: 0,
            duration: 1,
            stagger: 0.1,
          },
          "<",
        );

      // Force a refresh of ScrollTrigger
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef]);
}
