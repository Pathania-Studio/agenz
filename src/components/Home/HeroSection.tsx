"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const words = ["CREATIVE", "MEDIA", "DIGITAL", "BRANDING"];

export default function HeroSection() {
  const logoRef = useRef<HTMLImageElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const desc1Ref = useRef<HTMLDivElement | null>(null);
  const desc2Ref = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const dataWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Logo intro
    gsap.fromTo(
      logoRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" }
    );

    // Typing animation
    let currentWord = 0;
    let currentChar = 0;
    let deleting = false;

    const type = () => {
      const word = words[currentWord];
      if (!deleting) {
        currentChar++;
        textRef.current!.textContent = word.slice(0, currentChar);
        if (currentChar === word.length)
          gsap.delayedCall(1, () => (deleting = true));
      } else {
        currentChar--;
        textRef.current!.textContent = word.slice(0, currentChar);
        if (currentChar === 0) {
          deleting = false;
          currentWord = (currentWord + 1) % words.length;
        }
      }
    };

    gsap.ticker.add(type);
    gsap.ticker.fps(18);

    // SCROLL STORY
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.to(logoRef.current, { scale: 0.7, y: -80, opacity: 0.6 })
      .fromTo(desc1Ref.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1 }, "<0.2")
      .fromTo(desc2Ref.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1 }, "<0.3");

    // DATA LAYER REVEAL
    gsap.fromTo(
      dataWrapRef.current,
      { opacity: 0, y: 120 },
      {
        opacity: 1,
        y: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );

    // FLOATING MOTION
    gsap.utils.toArray(".float-card").forEach((el: any, i) => {
      gsap.to(el, {
        y: i % 2 === 0 ? -30 : 30,
        duration: 4 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    // COUNTERS
    gsap.utils.toArray(".counter").forEach((el: any) => {
      let obj = { val: 0 };
      gsap.to(obj, {
        val: el.dataset.target,
        duration: 2,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
        onUpdate: () => {
          el.textContent = Math.floor(obj.val);
        },
      });
    });

    return () => gsap.ticker.remove(type);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[200vh] w-full bg-[#050507] overflow-hidden">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">

        {/* Glow Background */}
        <div className="absolute w-[600px] h-[600px] bg-violet-600/30 blur-[140px] rounded-full animate-pulse" />

        {/* Glass Title */}
        <div className="absolute top-20 px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl">
          <div ref={textRef} className="text-white font-bold text-4xl md:text-6xl" />
        </div>

        {/* Logo */}
        <img
          ref={logoRef}
          src="/logo.png"
          alt="logo"
          className="relative z-10 w-[60vw] md:w-[40vw] max-w-[600px]"
        />

        {/* Descriptions */}
        <div ref={desc1Ref} className="absolute bottom-40 w-[80%] md:w-[50%] glass-card text-center">
          <p className="text-white text-lg">
            We craft futuristic digital experiences powered by AI & design intelligence.
          </p>
        </div>

        <div ref={desc2Ref} className="absolute bottom-20 w-[80%] md:w-[50%] glass-card text-center">
          <p className="text-white text-lg">
            Building brands that live at the intersection of creativity & technology.
          </p>
        </div>

        {/* 🔥 DATA VISUAL LAYER */}
        <div ref={dataWrapRef} className="absolute inset-0 pointer-events-none">

          <div className="float-card absolute top-[20%] left-[10%] glass-ui p-4 w-[180px]">
            <img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400" className="rounded-lg mb-2" />
            <p className="text-white text-sm">AI Processing</p>
            <p className="counter text-2xl font-bold text-violet-400" data-target="98">0</p>
          </div>

          <div className="float-card absolute top-[35%] right-[12%] glass-ui p-4 w-[200px]">
            <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400" className="rounded-lg mb-2" />
            <p className="text-white text-sm">Creative Assets</p>
            <p className="counter text-2xl font-bold text-pink-400" data-target="320">0</p>
          </div>

          <div className="float-card absolute bottom-[25%] left-[18%] glass-ui p-4 w-[190px]">
            <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400" className="rounded-lg mb-2" />
            <p className="text-white text-sm">Campaign Reach</p>
            <p className="counter text-2xl font-bold text-indigo-400" data-target="12">0</p>
          </div>

        </div>
      </div>
    </section>
  );
}
