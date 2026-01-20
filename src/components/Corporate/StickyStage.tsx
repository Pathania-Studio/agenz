"use client";

import { useRef } from "react";
import Screen1Authority from "./Screen1Authority";
import Screen2ProofA from "./Screen2ProofA";
import Screen3ProofB from "./Screen3ProofB";
import { useCorporateScroll } from "./useCorporateScroll";

export default function StickyStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  useCorporateScroll(stageRef);

  return (
    <div ref={stageRef} className="relative h-full w-full">
      <div className="absolute inset-0 h-full w-full">
        <Screen1Authority />
        <Screen2ProofA />
        <Screen3ProofB />
      </div>
    </div>
  );
}
