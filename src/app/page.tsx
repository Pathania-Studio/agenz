import CorporateSection from "../components/Corporate/CorporateSection";
export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      {/* <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <Hero />
      </div> */}

      {/* <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <VideoIntro />
      </div> */}

      <CorporateSection />

      {/* <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <WorkShowcase />
      </div> */}

      {/* <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <Clients />
      </div> */}

      {/* <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <Testimonials />
      </div> */}

      {/* <div className="w-full">
        <CTA />
      </div> */}
    </main>
  );
}
