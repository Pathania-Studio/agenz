import Hero from "../components/Home/hero/Hero";
// Section Components
import CorporateSection from "@/components/sections/CorporateSection";
import SocialMediaSection from "@/components/sections/SocialMediaSection";
import RealEstateSection from "@/components/sections/RealEstateSection";
import ProductShootsSection from "@/components/sections/ProductShootsSection";
import DesignSection from "@/components/sections/DesignSection";
import LogoCarousel from "@/components/sections/LogoCarousel";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

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
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Corporate Storytelling</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Crafting compelling narratives for brands through authentic visual storytelling that resonates with stakeholders and drives engagement.</p>
          </div>
          <CorporateSection />
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Featured: Annual Reports | Executive Portraits | Corporate Events | Internal Communications</p>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section id="social-media" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Social Media Excellence</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Creating scroll-stopping content that drives engagement and builds communities across all major platforms.</p>
          </div>
          <SocialMediaSection />
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Platforms: Instagram | LinkedIn | Twitter | Facebook | TikTok | YouTube</p>
          </div>
        </div>
      </section>

      {/* Real Estate Section */}
      <section id="real-estate" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Estate Visuals</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Showcasing properties in their best light with professional photography, videography, and virtual tours that sell before the first showing.</p>
          </div>
          <RealEstateSection />
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Services: Architectural Photography | Aerial Drone Shots | Virtual Staging | 3D Walkthroughs</p>
          </div>
        </div>
      </section>

      {/* Product Shoots Section */}
      <section id="product-shoots" className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Product Photography</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Transforming products into compelling visual assets that drive e-commerce conversions and tell your brand's story.</p>
          </div>
          <ProductShootsSection />
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Specializations: E-commerce | Lifestyle | Packshots | 360° Spins | Technical Details</p>
          </div>
        </div>
      </section>

      {/* Design Section */}
      <section id="design" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Digital & Print Design</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Creating visually stunning designs that communicate your message effectively across all mediums.</p>
          </div>
          <DesignSection />
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Expertise: Brand Identity | Web Design | Print Collateral | Marketing Materials | UI/UX</p>
          </div>
        </div>
      </section>

      {/* Logo Carousel */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Trusted by Leading Brands</h2>
            <p className="text-gray-600 dark:text-gray-300">We're proud to collaborate with innovative companies across various industries</p>
          </div>
          <LogoCarousel logos={COMPANY_LOGOS} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Client Success Stories</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">Hear from the brands we've helped transform through our creative solutions</p>
          </div>
          <TestimonialsSection testimonials={TESTIMONIALS} />
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">Average Client Satisfaction Rating: 4.8/5.0 across 120+ projects</p>
          </div>
        </div>
      </section>
    </main>
  );
}
