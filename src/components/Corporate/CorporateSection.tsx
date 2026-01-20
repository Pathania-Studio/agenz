"use client";

import StickyStage from "./StickyStage";

export default function CorporateSection() {
  return (
    <section className="relative min-h-[300vh] bg-white">
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <StickyStage />
      </div>
    </section>
  );
}
