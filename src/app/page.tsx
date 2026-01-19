import Clients from "../components/Home/Clients";
import CTA from "../components/Home/CTA";
import Hero from "../components/Home/hero/Hero";
import Testimonials from "../components/Home/Testimonials";
import VideoIntro from "../components/Home/VideoIntro";
import WorkShowcase from "../components/Home/WorkShowcase";

export default function Home() {
  return (
    <div>
      <Hero />
      <VideoIntro />
      <WorkShowcase />
      <Clients />
      <Testimonials />
      <CTA />
    </div>
  );
}
