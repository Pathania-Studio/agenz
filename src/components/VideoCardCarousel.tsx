"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

// ✅ Infinite auto-scrolling center carousel
// • Always 3 cards visible on desktop
// • Mobile unchanged (1 card feel)
// • No arrows
// • Auto scroll only right → left
// • No reset jump (loop illusion)
// • Pause on hover / touch

const baseCards = [
  {
    video: "/videos/sample1.mp4",
    images: [
      "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    ],
  },
  {
    video: "/videos/sample2.mp4",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    ],
  },
  {
    video: "/videos/sample3.mp4",
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    ],
  },
  {
    video: "/videos/sample4.mp4",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    ],
  },
  {
    video: "/videos/sample4.mp4",
    images: [
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
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
    <div className="w-full py-14  bg-gray-500 overflow-hidden">
      <div className="w-full -ml-[50px] mx-auto overflow-hidden px-4">
        <h2 className="text-2xl font-bold text-white mb-10">Video Cards</h2>

        <div
          className="overflow-hidden"
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
                    scale: isActive ? 1 : 0.82,
                    opacity: isActive ? 1 : 0.45,
                  }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl shadow-xl p-4 flex-shrink-0"
                  style={{ width: cardWidth }}
                >
                  <div className="w-full h-52 sm:h-60 rounded-xl overflow-hidden mb-4">
                    <video
                      src={card.video}
                      className="w-full h-full object-cover"
                      controls
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
