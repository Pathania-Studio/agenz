"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Video from "./Video";

// ✅ Infinite auto-scrolling center carousel
// • Always 3 cards visible on desktop
// • Mobile unchanged (1 card feel)
// • No arrows
// • Auto scroll only right → left
// • No reset jump (loop illusion)
// • Pause on hover / touch

const baseCards = [
  {
    video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1769485719/BrighChamps_Property_xlpqto.mp4",
    images: [
      "/images/1.jpg",
      "/images/2.jpg",
    ],
  },
  {
    video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1769485276/Happilo_Video_1_bg1f8a.mp4",
    images: [
      "https://res.cloudinary.com/dhhb38ito/image/upload/v1769486781/H210_F3_Coworking_Breakout_2_nfzadb.jpg",
      "https://res.cloudinary.com/dhhb38ito/image/upload/v1769486979/DSC02179s_1_gtqrfh.jpg",
    ],
  },
  {
    video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1769485719/BrighChamps_Property_xlpqto.mp4",
    images: [
      "/images/1.jpg",
      "/images/2.jpg",
    ],
  },
  {
    video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1769485276/Happilo_Video_1_bg1f8a.mp4",
    images: [
      "https://res.cloudinary.com/dhhb38ito/image/upload/v1769486781/H210_F3_Coworking_Breakout_2_nfzadb.jpg",
      "https://res.cloudinary.com/dhhb38ito/image/upload/v1769486979/DSC02179s_1_gtqrfh.jpg",
    ],
  },
  {
    video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1769485719/BrighChamps_Property_xlpqto.mp4",
    images: [
      "/images/1.jpg",
      "/images/2.jpg",
    ],
  },
  {
    video: "https://res.cloudinary.com/dhhb38ito/video/upload/v1769485276/Happilo_Video_1_bg1f8a.mp4",
    images: [
      "https://res.cloudinary.com/dhhb38ito/image/upload/v1769486781/H210_F3_Coworking_Breakout_2_nfzadb.jpg",
      "https://res.cloudinary.com/dhhb38ito/image/upload/v1769486979/DSC02179s_1_gtqrfh.jpg",
    ],
  },
  
];

export default function VideoCardCarousel() {
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(0);
  const [cardWidth, setCardWidth] = useState(420); // desktop = 3 cards view

  const GAP = 28;

  // duplicate cards for infinite illusion
  const cards = useMemo(() => [...baseCards, ...baseCards, ...baseCards], []);
  const baseLen = baseCards.length;

  // responsive widths
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setCardWidth(260);
      else if (window.innerWidth < 1024) setCardWidth(320);
      else setCardWidth(420); // 3 cards in viewport
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // start from middle block so no edge reset visible
  useEffect(() => {
    setActive(baseLen);
  }, [baseLen]);

  // auto scroll → right to left only
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActive((v) => v + 1);
    }, 3000);
    return () => clearInterval(id);
  }, [paused]);

  // when reaching far end, jump back silently to middle block
  useEffect(() => {
    if (active > baseLen * 2) {
      setActive(baseLen);
    }
  }, [active, baseLen]);

  const viewportWidth = typeof window !== "undefined" ? window.innerWidth : 1400;
  const centerOffset = viewportWidth / 2 - cardWidth / 2;

  const x = -(active * (cardWidth + GAP)) + centerOffset;

  return (
    <div className="w-full py-14 ">
      <div className="w-full  -ml-[30px] mx-auto px-4">
       

        <div
          className=""
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <motion.div
            className="flex cursor-grab active:cursor-grabbing"
            style={{ gap: GAP }}
            drag="x"
            onDragEnd={(e, info) => {
              if (info.offset.x < -60) setActive((v) => v + 1);
              if (info.offset.x > 60) setActive((v) => v - 1);
            }}
            animate={{ x }}
            transition={{ type: "spring", stiffness: 120, damping: 18 }}
          >
            {cards.map((card, i) => {
              const isActive = i === active;
              return (
                <motion.div
                  key={i}
                  animate={{
                    scale: isActive ? 1.2 : 0.82,
                    opacity: isActive ? 1 : 0.45,
                  }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl shadow-xl p-4 flex-shrink-0"
                  style={{ width: cardWidth }}
                >
                  <div className="w-full aspect-video rounded-xl  mb-4">
  <video
    src={card.video}
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover"
  />
</div>


                  <div className="grid grid-cols-2 gap-3">
                    {card.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt=""
                        className="w-full h-24 sm:h-28 object-cover rounded-xl"
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
