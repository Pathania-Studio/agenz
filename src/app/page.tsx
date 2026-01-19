import Clients from "../components/Home/Clients";
import CTA from "../components/Home/CTA";
import Hero from "../components/Home/hero/Hero";
import Testimonials from "../components/Home/Testimonials";
import VideoIntro from "../components/Home/VideoIntro";
import WorkShowcase from "../components/Home/WorkShowcase";
import CorporateWorks from "../components/sections/CorporateWorks";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <Hero />
      </div>

      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <VideoIntro />
      </div>

      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <CorporateWorks />
      </div>

      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <WorkShowcase />
      </div>

      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <Clients />
      </div>

      <div className="mx-auto w-full max-w-[1920px] px-4 sm:px-6 lg:px-8">
        <Testimonials />
      </div>

      <div className="w-full">
        <CTA />
      </div>
    </main>
  );
}
