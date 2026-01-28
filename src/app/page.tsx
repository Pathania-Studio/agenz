"use client";
import Hero from "../components/Home/hero/Hero";
// Section Components
import LogoCarousel from "@/components/sections/LogoCarousel";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import HorizontalShowcase from "@/components/sections/HorizontalShowcase";
import SelectedWorkSection from "@/components/selected-work/SelectedWorkSection";
import BenefitSection from "@/components/BenefitSection";
import TestimonialsWrapper from "@/components/sections/TestimonialsWrapper";
import SocialMediaSection from "@/components/sections/SocialMediaSection";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import AnimatedWord from "@/components/Home/hero/AnimatedWord";
import AnimatedCard from "@/components/sections/AnimatedCard";


// Brand assets from trusted sources (placeholder URLs)
const COMPANY_LOGOS = [
  {
    id: 1,
    name: "TechNova",
    src: "https://img.icons8.com/color/256/tech-company.png",
    alt: "TechNova",
    industry: "Enterprise Software",
  },
  {
    id: 2,
    name: "UrbanStyle",
    src: "https://img.icons8.com/color/256/online-store.png",
    alt: "UrbanStyle",
    industry: "Fashion Retail",
  },
  {
    id: 3,
    name: "GreenLife",
    src: "https://img.icons8.com/color/256/eco-food.png",
    alt: "GreenLife",
    industry: "Organic Food",
  },
  {
    id: 4,
    name: "FinSecure",
    src: "https://img.icons8.com/color/256/bank-building.png",
    alt: "FinSecure",
    industry: "Financial Services",
  },
  {
    id: 5,
    name: "StayWell",
    src: "https://img.icons8.com/color/256/health-book.png",
    alt: "StayWell",
    industry: "Healthcare",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CMO, TechNova",
    content: "The team transformed our brand presence with stunning visuals that perfectly captured our innovative spirit. Their attention to detail and creative direction resulted in a 40% increase in engagement across our digital channels.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    project: "Corporate Rebranding",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, UrbanStyle",
    content: "Working with this team was a game-changer for our e-commerce business. Their product photography increased our conversion rate by 28% in the first month. Their ability to understand and showcase our brand's aesthetic is unmatched.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    project: "E-commerce Campaign",
    rating: 5,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Marketing Director, FinSecure",
    content: "The corporate videos they produced for our financial services helped us explain complex products simply and beautifully. The feedback from both our clients and internal teams has been overwhelmingly positive.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    project: "Financial Product Launch",
    rating: 4,
  },
];
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { useEffect } from "react";
import { StickyScrollRevealDemo } from "@/components/StickyScrollRevealDemo";
export default function Home() {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create a single ScrollTrigger.refresh() call after all components are mounted
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
    // Cleanup
    return () => {
      clearTimeout(timer);
      // Kill all ScrollTrigger instances on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <main className="min-h-screen w-full bg-background">
      <AnimatedBackground />
      {/* Hero Section */}
       
      <section className="w-full">
        <Hero />
      </section>
      {/* <section>
        <BenefitSection />
      </section> */}
      <section>
        <HorizontalShowcase />
      </section>
      <section>
        <StickyScrollRevealDemo/>
      </section>
      <section>
        {/* <SocialMediaSection /> */}
      </section>
      <section>
        <SelectedWorkSection />
      </section>
     <section className="relative overflow-hidden">
</section>

      {/* Corporate Section */}
      {/* <section id="corporate" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Corporate Storytelling</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Crafting compelling narratives for brands through authentic visual storytelling that resonates with stakeholders and drives engagement.</p>
          </div>
          <CorporateSection />
        </div>
      </section> */}

      {/* Social Media Section */}
      {/* <section id="social-media" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Social Media Excellence</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Creating scroll-stopping content that drives engagement and builds communities across all major platforms.</p>
          </div>
          <SocialMediaSection />
        </div>
      </section> */}

      {/* Real Estate Section */}
      {/* <section id="real-estate" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Estate Visuals</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Showcasing properties in their best light with professional photography, videography, and virtual tours that sell before the first showing.</p>
          </div>
          <RealEstateSection />
        </div>
      </section> */}

      {/* Product Shoots Section */}
      {/* <section id="product-shoots" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Product Photography</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Transforming products into compelling visual assets that drive e-commerce conversions and tell your brand's story.</p>
          </div>
          <ProductShootsSection />
          <div className="mt-6 flex items-center justify-between">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-gray-800"></div>
              ))}
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs text-gray-500">+3</div>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">View Project</button>
          </div>
        </div>
      </section> */}

      {/* Design Section */}
      {/* <section id="design" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Digital & Print Design</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Creating visually stunning designs that communicate your message effectively across all mediums.</p>
          </div>
          <DesignSection />
        </div>
      </section> */}

      {/* Logo Carousel */}
      <section className="py-16">
        <LogoCarousel logos={COMPANY_LOGOS} />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <TestimonialsWrapper testimonials={TESTIMONIALS} />
      </section>
    </main>
  );
}
