"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

type Props = {
  id: string;
  youtubeId: string;
  className?: string;
};

export default function VideoCard({ id, youtubeId, className }: Props) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layoutId={id}
      className={`relative aspect-video rounded-2xl overflow-hidden bg-black cursor-pointer ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={{
        scale: hovered ? 1.06 : 1,
        zIndex: hovered ? 40 : 10,
      }}
      transition={{ duration: 0.35, ease: "easeOut" }}>
      {/* THUMBNAIL */}
      <div className="relative w-full h-full">
        <Image src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`} alt="Corporate Video" fill className="object-cover" priority />
      </div>

      {/* PLAY BUTTON OVERLAY */}
      <motion.div className="absolute inset-0 bg-black/40 flex items-center justify-center" animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.25 }}>
        <span className="text-white text-sm tracking-widest uppercase">Play Film</span>
      </motion.div>
    </motion.div>
  );
}
