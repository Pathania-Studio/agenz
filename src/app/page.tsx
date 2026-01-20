import Hero from "../components/Home/hero/Hero";
// Section Components
import CorporateSection from "@/components/sections/CorporateSection";
import SocialMediaSection from "@/components/sections/SocialMediaSection";
import RealEstateSection from "@/components/sections/RealEstateSection";
import ProductShootsSection from "@/components/sections/ProductShootsSection";
import DesignSection from "@/components/sections/DesignSection";
import LogoCarousel from "@/components/sections/LogoCarousel";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

// Mock Data - Replace with your actual data
const COMPANY_LOGOS = [
  { id: 1, src: "/logos/company1.svg", alt: "Company 1" },
  { id: 2, src: "/logos/company2.svg", alt: "Company 2" },
  { id: 3, src: "/logos/company3.svg", alt: "Company 3" },
  { id: 4, src: "/logos/company4.svg", alt: "Company 4" },
  { id: 5, src: "/logos/company5.svg", alt: "Company 5" },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO, Company A",
    content: "Amazing work! The team delivered beyond our expectations.",
    avatar: "/avatars/avatar1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Marketing Director, Company B",
    content: "Highly professional and creative team. Will work with them again!",
    avatar: "/avatars/avatar2.jpg",
  },
];
export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-background">
      {/* Hero Section */}
      <section className="w-full">
        <Hero />
      </section>

      {/* Corporate Section */}
      <section id="corporate" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Corporate Work</h2>
          <CorporateSection />
        </div>
      </section>

      {/* Social Media Section */}
      <section id="social-media" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Social Media</h2>
          <SocialMediaSection />
        </div>
      </section>

      {/* Real Estate Section */}
      <section id="real-estate" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Real Estate</h2>
          <RealEstateSection />
        </div>
      </section>

      {/* Product Shoots Section */}
      <section id="product-shoots" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Product Shoots</h2>
          <ProductShootsSection />
        </div>
      </section>

      {/* Design Section */}
      <section id="design" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Design Work</h2>
          <DesignSection />
        </div>
      </section>

      {/* Logo Carousel */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Trusted By</h2>
          <LogoCarousel logos={COMPANY_LOGOS} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Clients Say</h2>
          <TestimonialsSection testimonials={TESTIMONIALS} />
        </div>
      </section>
    </main>
  );
}
