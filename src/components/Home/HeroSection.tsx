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

        if (currentChar === word.length) gsap.delayedCall(1, () => (deleting = true));

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



    // SCROLL STORY TIMELINE

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



    return () => gsap.ticker.remove(type);

  }, []);



  return (

    <section ref={sectionRef} className="relative h-[200vh] w-full bg-[#050507] overflow-hidden">



      {/* Sticky Content */}

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



        {/* Description Panels */}

        <div ref={desc1Ref} className="absolute bottom-40 w-[80%] md:w-[50%] glass-card text-center">

          <p className="text-white text-lg">We craft futuristic digital experiences powered by AI & design intelligence.</p>

        </div>



        <div ref={desc2Ref} className="absolute bottom-20 w-[80%] md:w-[50%] glass-card text-center">

          <p className="text-white text-lg">Building brands that live at the intersection of creativity & technology.</p>

        </div>



      </div>

    </section>

  );

}

