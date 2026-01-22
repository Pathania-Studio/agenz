"use client";

import { useEffect } from "react";
import { SECTIONS } from "../../../constants";
import { DeviceType } from "../../../types";
import DeviceMockup from "../../components/DeviceMockup";
import SectionContent from "../../components/SectionContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
//declare const gsap: any;
// declare const ScrollTrigger: any;

export default function SocialMediaSection() {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* ===============================
       TEXT SLIDE ANIMATIONS
    =============================== */

    const sections = gsap.utils.toArray(".scroll-section");

    sections.forEach((section: any, i: number) => {
      const content = section.querySelector(".content-wrapper");

      const fromX = i % 2 === 0 ? 160 : -160;

      // FIRST SECTION → play on load
      if (i === 0) {
        gsap.fromTo(
          content,
          { opacity: 0, x: fromX, filter: "blur(10px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            ease: "power3.out",
            duration: 1.3
          }
        );
        return;
      }

      // OTHER SECTIONS → scroll
      gsap.fromTo(
        content,
        { opacity: 0, x: fromX, filter: "blur(10px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "top 30%",
            scrub: 1.3
          }
        }
      );
    });

    /* ===============================
       MOCKUP 1 CROSS + FLIP
    =============================== */

    const mock1 = document.querySelector(".mock-1");

    gsap.set(mock1, {
      left: "20%",
      top: "0%",
      xPercent: -120,
      yPercent: -120,
      rotationY: 0,
      transformPerspective: 1200,
      transformStyle: "preserve-3d"
    });

    gsap.to(mock1, {
      rotationY: 360,
      ease: "none",
      top: "1090px",
      left: "90%",
      scrollTrigger: {
        trigger: ".scroll-section",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 3
      }
    });

    return () => ScrollTrigger.getAll().forEach((st: any) => st.kill());
  }, []);

  return (
    <div className="bg-[#050505] text-white overflow-x-hidden">

      {/* ========== SECTION 1 ========== */}
      <section className="scroll-section min-h-screen flex items-center max-w-7xl mx-auto px-16 overflow-visible">

        {/* Mockup Left */}
        <div className="w-[40vw] mock-1 flex justify-center relative z-10">
          <DeviceMockup
            type={DeviceType.MOBILE}
            image={SECTIONS[0].image}
          />
        </div>

        {/* Text Right */}
        <div className="content-wrapper w-[60vw] flex justify-center relative z-20">
          <SectionContent
            title={SECTIONS[0].title}
            subtitle={SECTIONS[0].subtitle}
            description={SECTIONS[0].description}
          />
        </div>
      </section>

      {/* ========== SECTION 2 ========== */}
      <section className="scroll-section min-h-screen flex items-center max-w-7xl mx-auto px-16 overflow-visible">

        {/* Text Left */}
        <div className="content-wrapper w-[60vw] flex justify-center relative z-20">
          <SectionContent
            title={SECTIONS[1].title}
            subtitle={SECTIONS[1].subtitle}
            description={SECTIONS[1].description}
          />
        </div>

        {/* Mockup Right */}
        <div className="w-[40vw] flex justify-center relative z-10">
          <DeviceMockup
            type={DeviceType.TABLET}
            image={SECTIONS[1].image}
          />
        </div>
      </section>

      {/* ========== SECTION 3 ========== */}
      <section className="scroll-section min-h-screen flex items-center max-w-7xl mx-auto px-16 overflow-visible">

        {/* Mockup Left */}
        <div className="w-[40vw] flex justify-center relative z-10">
          <DeviceMockup
            type={DeviceType.LAPTOP}
            image={SECTIONS[2].image}
          />
        </div>

        {/* Text Right */}
        <div className="content-wrapper w-[60vw] flex justify-center relative z-20">
          <SectionContent
            title={SECTIONS[2].title}
            subtitle={SECTIONS[2].subtitle}
            description={SECTIONS[2].description}
          />
        </div>
      </section>

    </div>
  );
}
