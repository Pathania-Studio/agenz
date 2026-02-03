"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const data = [
  {
    video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1769485719/BrighChamps_Property_xlpqto.mp4",
    images: ["/images/1.jpg", "/images/2.jpg"],
  },
  {
    video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1769485276/Happilo_Video_1_bg1f8a.mp4",
    images: ["https://res.cloudinary.com/dhhb38ito/image/upload/v1769486781/H210_F3_Coworking_Breakout_2_nfzadb.jpg", "https://res.cloudinary.com/dhhb38ito/image/upload/v1769486979/DSC02179s_1_gtqrfh.jpg"],
  },
  {
    video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1769485719/BrighChamps_Property_xlpqto.mp4",
    images: ["/images/1.jpg", "/images/2.jpg"],
  },
  {
    video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1769485276/Happilo_Video_1_bg1f8a.mp4",
    images: ["https://res.cloudinary.com/dhhb38ito/image/upload/v1769486781/H210_F3_Coworking_Breakout_2_nfzadb.jpg", "https://res.cloudinary.com/dhhb38ito/image/upload/v1769486979/DSC02179s_1_gtqrfh.jpg"],
  },
  {
    video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1769485719/BrighChamps_Property_xlpqto.mp4",
    images: ["/images/1.jpg", "/images/2.jpg"],
  },
  {
    video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1769485276/Happilo_Video_1_bg1f8a.mp4",
    images: ["https://res.cloudinary.com/dhhb38ito/image/upload/v1769486781/H210_F3_Coworking_Breakout_2_nfzadb.jpg", "https://res.cloudinary.com/dhhb38ito/image/upload/v1769486979/DSC02179s_1_gtqrfh.jpg"],
  },
];

export default function PremiumCarousel() {
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const videosRef = useRef<HTMLVideoElement[]>([]);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const total = data.length;

  const updatePositions = (active: number) => {
    cardsRef.current.forEach((card, i) => {
      let offset = i - active;

      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;

      let x = 0,
        scale = 0.6,
        rotateY = 0,
        opacity = 0;

      if (offset === 0) {
        x = 0;
        scale = 1;
        rotateY = 0;
        opacity = 1;
      } else if (offset === -1) {
        x = -520;
        scale = 0.8;
        rotateY = 35;
        opacity = 0.6;
      } else if (offset === 1) {
        x = 520;
        scale = 0.8;
        rotateY = -35;
        opacity = 0.6;
      } else {
        x = offset < 0 ? -700 : 700;
      }

      gsap.to(card, {
        x,
        scale,
        rotateY,
        opacity,
        duration: 0.8,
        ease: "power3.inOut",
      });
    });

    videosRef.current.forEach((v, i) => {
      if (!v) return;
      i === active ? v.play() : v.pause();
    });
  };

  useEffect(() => {
    updatePositions(index);

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <>
      <div className="relative z-10 max-w-[90%] mx-auto pt-24">
        <h2 className="relative text-[clamp(4rem,9vw,8rem)] font-semibold tracking-tight leading-none">
          <span className="block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.35)]">SELECTED WORK</span>
          <span ref={fillRef} className="absolute inset-0 text-white">
            SELECTED WORK
          </span>
        </h2>
      </div>
      <div className="w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-300 h-130 perspective-[2000px]">
          {data.map((card, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el!;
              }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-155  p-6 ">
              <div className="h-95 mb-4 rounded-2xl overflow-hidden">
                <video
                  ref={(el) => {
                    videosRef.current[i] = el!;
                  }}
                  src={card.video}
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {card.images.map((img, j) => (
                  <img key={j} src={img} className="w-full h-48 object-cover rounded-xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
