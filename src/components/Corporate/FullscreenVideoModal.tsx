"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ActiveVideo = {
  id: string;
  youtubeId: string;
};

export default function FullscreenVideoModal() {
  const [active, setActive] = useState<ActiveVideo | null>(null);

  useEffect(() => {
    const openHandler = (e: Event) => {
      const { id, youtubeId } = (e as CustomEvent<ActiveVideo>).detail;
      setActive({ id, youtubeId });
      document.body.style.overflow = "hidden";
    };

    const closeHandler = () => {
      setActive(null);
      document.body.style.overflow = "";
    };

    window.addEventListener("open-video", openHandler);
    window.addEventListener("close-video", closeHandler);

    return () => {
      window.removeEventListener("open-video", openHandler);
      window.removeEventListener("close-video", closeHandler);
    };
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {/* BACKDROP */}
          <div className="absolute inset-0" onClick={() => window.dispatchEvent(new Event("close-video"))} />

          {/* PLAYER */}
          <motion.div layoutId={active.id} className="relative w-[92vw] max-w-6xl aspect-video rounded-2xl overflow-hidden bg-black z-10">
            <iframe src={`https://www.youtube.com/embed/${active.youtubeId}?autoplay=1&rel=0`} allow="autoplay; encrypted-media" allowFullScreen className="w-full h-full" />

            <button onClick={() => window.dispatchEvent(new Event("close-video"))} className="absolute top-4 right-4 text-white text-2xl">
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
