"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const data = [
  {
    title: "Real Estate",
    subtitle: "Residential Architecture",
    video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1769485719/BrighChamps_Property_xlpqto.mp4",
    images: ["https://res.cloudinary.com/dhhb38ito/image/upload/v1770520204/003-Brunton_Residence10569_tiuam0.jpg", "https://res.cloudinary.com/dhhb38ito/image/upload/v1770520219/Screenshot_2024-12-19_194314_co0efj.png"],
  },

  {
    title: "Product Shoots",
    video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1770520255/W_Commercial_Spaces_rpzoce.mp4",
    images: ["https://res.cloudinary.com/dhhb38ito/image/upload/v1770520263/Screenshot_2025-01-28_205803_fk9kdv.png", "https://res.cloudinary.com/dhhb38ito/image/upload/v1770520257/5123f0cc53f273327868db6913bcf086_1_tycxut.jpg"],
  },

  {
    title: "Events",
    video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1770520255/W_Commercial_Spaces_rpzoce.mp4",
    images: ["https://res.cloudinary.com/dhhb38ito/image/upload/v1770520210/Screenshot_2024-12-19_195129_lw6d8x.png", "https://res.cloudinary.com/dhhb38ito/image/upload/v1770520215/Screenshot_2024-12-19_193605_adipgk.png"],
  },
  {
    title: "Real Estate",
    video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1770520255/W_Commercial_Spaces_rpzoce.mp4",
    images: ["https://res.cloudinary.com/dhhb38ito/image/upload/v1770520204/003-Brunton_Residence10569_tiuam0.jpg", "https://res.cloudinary.com/dhhb38ito/image/upload/v1770520207/Bedroom_2_one_point_perspective_viirvf.jpg"],
  },
  {
    title: "Product Shoots",
    video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1770520255/W_Commercial_Spaces_rpzoce.mp4",
    images: ["https://res.cloudinary.com/dhhb38ito/image/upload/v1770520262/p8_39_xlaghv.png", "https://res.cloudinary.com/dhhb38ito/image/upload/v1770520266/Screenshot_2025-01-28_205849_foy2s6.png"],
  },
  {
    title: "Events",
    video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1770520255/W_Commercial_Spaces_rpzoce.mp4",
    images: ["https://res.cloudinary.com/dhhb38ito/image/upload/v1770520210/Screenshot_2024-12-19_195129_lw6d8x.png", "https://res.cloudinary.com/dhhb38ito/image/upload/v1770520215/Screenshot_2024-12-19_193605_adipgk.png"],
  },
];

// connfic
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
        x = -1060;

        scale = 0.8;

        rotateY = 35;

        opacity = 0.6;
      } else if (offset === 1) {
        x = 1060;

        scale = 0.8;

        rotateY = -35;

        opacity = 0.6;
      } else {
        x = offset < 0 ? -1030 : 1030;
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
              className="absolute top-0 left-1/2 -translate-x-1/2 p-6">
              {/* Card Headings */}

              <div className="text-center">
                <h3 className="text-7xl font-bold text-white mb-2">{card.title}</h3>
              </div>

              {/* Video Section - Old Component */}

              {card.video && (
                <div className="flex gap-4">
                  <div className="h-[30rem] w-[70rem] mb-4 rounded-2xl overflow-hidden">
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

                  <div className="grid grid-cols-1 gap-3">
                    {card.images.map((img, j) => (
                      <img key={j} src={img} className="w-[30rem] h-[15rem] object-cover rounded-xl overflow-hidden group transition-all duration-500 hover:scale-105" />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
