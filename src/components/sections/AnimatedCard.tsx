"use client";

import { SECTIONS } from "../../../constants";
import { DeviceType } from "../../../types";
import DeviceMockup from "../DeviceMockup";
import SectionContent from "../SectionContent";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

export default function Page() {

  // ✅ Hook MUST be inside component
  const [deviceType, setDeviceType] = useState<DeviceType>(DeviceType.MOBILE);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* ===============================
       TEXT SLIDE ANIMATIONS
    =============================== */

    const sections = gsap.utils.toArray<HTMLElement>(".scroll-section");

    sections.forEach((section, i) => {
      const content = section.querySelector(".content-wrapper");
      const fromX = i % 2 === 0 ? 160 : -160;

      if (i === 0) {
        gsap.fromTo(
          content,
          { opacity: 0, x: fromX, filter: "blur(10px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            ease: "power3.out",
            duration: 1.3,
          }
        );
        return;
      }

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
            scrub: 1.3,
          },
        }
      );
    });

    /* ===============================
       MOCKUP MOVE + FLIP
    =============================== */

    const mock1 = document.querySelector(".mock-1");

    gsap.set(mock1, {
  left: "20%",
  top: "300px",
  xPercent: -120,
  yPercent: -120,
  rotationY: 0,
  transformPerspective: 1200,
  transformStyle: "preserve-3d",
});


    gsap.to(mock1, {
      rotationY: 360,
      ease: "none",
      top: "890px",
      left: "1080px",
      scrollTrigger: {
        trigger: ".scroll-section",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 3,
      },
    });
    
    

    /* ===============================
       DEVICE SWITCH PER SECTION
    =============================== */

    ScrollTrigger.create({
      trigger: sections[0],
      start: "top center",
      onEnter: () => setDeviceType(DeviceType.MOBILE),
      onEnterBack: () => setDeviceType(DeviceType.MOBILE),
    });

    ScrollTrigger.create({
      trigger: sections[1],
      start: "top center",
      onEnter: () => setDeviceType(DeviceType.TABLET),
      onEnterBack: () => setDeviceType(DeviceType.TABLET),
    });

    

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <div className="bg-[#050505] text-white overflow-x-hidden">

      {/* ========== SECTION 1 ========== */}
      <section className="scroll-section min-h-screen flex items-center max-w-7xl mx-auto px-16 overflow-visible">

        {/* Mockup Left */}
        <div className="w-[40vw] mock-1 flex justify-center relative z-10">
          <DeviceMockup
            type={deviceType}
            image={
              deviceType === DeviceType.MOBILE
                ? SECTIONS[0].image
                : deviceType === DeviceType.TABLET
                ? SECTIONS[1].image
                : SECTIONS[2].image
            }
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
        <div className="content-wrapper w-[60vw] flex justify-center relative z-20">
          <SectionContent
            title={SECTIONS[1].title}
            subtitle={SECTIONS[1].subtitle}
            description={SECTIONS[1].description}
          />
        </div>
      </section>

      {/* ========== SECTION 3 ========== */}
      {/* <section className="scroll-section min-h-screen flex items-center max-w-7xl mx-auto px-16 overflow-visible">
        <div className="content-wrapper w-[60vw] flex justify-center relative z-20">
          <SectionContent
            title={SECTIONS[2].title}
            subtitle={SECTIONS[2].subtitle}
            description={SECTIONS[2].description}
          />
        </div>
      </section> */}

    </div>
  );
}
