"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function VideoInterlude() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const iframe = iframeRef.current;
    if (!section || !iframe) return;

    // Disable on mobile (important)
    if (window.innerWidth < 768) return;

    // Load YouTube API once
    if (!(window as any).YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    }

    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player(iframe, {
        events: {
          onReady: () => initScroll(),
        },
      });
    };

    const initScroll = () => {
      const player = playerRef.current;

      gsap.fromTo(
        iframe,
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "bottom 30%",
            onEnter: () => player.playVideo(),
            onEnterBack: () => player.playVideo(),
            onLeave: () => player.pauseVideo(),
            onLeaveBack: () => player.pauseVideo(),
          },
        },
      );

      // Smooth fade-out before next section
      gsap.to(iframe, {
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section,
          start: "bottom 60%",
          end: "bottom top",
          scrub: true,
        },
      });
    };

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative flex h-screen items-center justify-center bg-black overflow-hidden">
      <div className="relative w-[80vw] max-w-5xl aspect-video overflow-hidden rounded-2xl">
        <iframe ref={iframeRef} className="h-full w-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1&mute=1&controls=0&rel=0&modestbranding=1" allow="autoplay; encrypted-media" allowFullScreen />
      </div>
    </section>
  );
}
