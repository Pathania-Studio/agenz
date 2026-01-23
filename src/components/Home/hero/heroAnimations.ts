import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const heroScrollAnimation = (
  section: HTMLElement,
  logo: HTMLImageElement,
  textVideo: HTMLDivElement
) => {
  gsap.set(textVideo, { transformOrigin: "center center" });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: "+=600%",
      scrub: true,
      pin: true,
    },
  });

  /* 🔹 PHASE 1 — LOGO VISIBLE */
  tl.to({}, { duration: 1 });

  /* 🔹 PHASE 2 — LOGO OUT */
  tl.to(logo, {
    opacity: 0,
    scale: 0.9,
    ease: "none",
    duration: 1,
  });

  /* 🔹 PHASE 3 — TEXT + VIDEO IN */
  tl.to(
    textVideo,
    {
      opacity: 1,
      scale: 1,
      ease: "none",
      duration: 1,
    },
    "<"
  );

  /* 🔹 PHASE 4 — EXPAND TO FULLSCREEN */
  tl.to(textVideo, {
    scale: window.innerWidth < 768 ? 3 : 6,
    ease: "none",
    duration: 3,
  });

  return tl;
};
