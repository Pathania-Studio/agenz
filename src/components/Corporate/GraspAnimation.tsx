"use client";

import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Play, Pause, ArrowUpRight, MoveRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  videoSrc: string;
  colors: {
    from: string;
    to: string;
    className: string;
  };
  tags: string[];
  year: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Luxury Real Estate",
    description: "High-end property development with breathtaking views",
    videoSrc: "/videos/luxury-real-estate.mp4",
    colors: {
      from: "#3b82f6", // blue-500
      to: "#22d3ee", // cyan-400
      className: "from-blue-500 to-cyan-400",
    },
    tags: ["Architecture", "Interior", "Luxury"],
    year: "2024",
  },
  {
    id: 2,
    title: "Fashion Campaign",
    description: "Elegant fashion showcase for premium brands",
    videoSrc: "/videos/fashion-campaign.mp4",
    colors: {
      from: "#a855f7", // purple-500
      to: "#ec4899", // pink-500
      className: "from-purple-500 to-pink-500",
    },
    tags: ["Fashion", "Lifestyle", "Branding"],
    year: "2024",
  },
  {
    id: 3,
    title: "Automotive Excellence",
    description: "Showcasing engineering marvels on wheels",
    videoSrc: "/videos/automotive-showcase.mp4",
    colors: {
      from: "#f59e0b", // amber-500
      to: "#ef4444", // red-500
      className: "from-amber-500 to-red-500",
    },
    tags: ["Automotive", "Technology", "Design"],
    year: "2023",
  },
  {
    id: 4,
    title: "Gourmet Experience",
    description: "Culinary artistry at its finest",
    videoSrc: "/videos/culinary-showcase.mp4",
    colors: {
      from: "#10b981", // emerald-500
      to: "#2dd4bf", // teal-400
      className: "from-emerald-500 to-teal-400",
    },
    tags: ["Culinary", "Hospitality", "Branding"],
    year: "2023",
  },
];

const ProjectCard = ({ project, index, isActive, onClick }: { project: Project; index: number; isActive: boolean; onClick: () => void }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { amount: 0.5, once: false });

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -50 : 50, index % 2 === 0 ? -150 : 150]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, isActive ? 1.05 : 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, isActive ? 1 : 0.6]);

  return (
    <motion.div
      ref={cardRef}
      className={`relative cursor-pointer ${isActive ? "z-10" : "z-0"}`}
      onClick={onClick}
      style={{ y, scale, opacity }}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: isInView ? 1 : 0.2,
        y: isInView ? 0 : 50,
      }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      }}>
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl">
        <motion.div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" initial={{ opacity: 0.8 }} animate={{ opacity: isActive ? 0.5 : 0.8 }} transition={{ duration: 0.3 }} />
        <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-105">
          <source src={project.videoSrc} type="video/mp4" />
        </video>

        <motion.div
          className="absolute bottom-0 left-0 p-8 z-20 w-full"
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: isActive ? 0 : 20,
            opacity: isActive ? 1 : 0.8,
          }}
          transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-3 mb-3">
            {project.tags.map((tag: string, i: number) => (
              <span key={i} className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm rounded-full text-white/90">
                {tag}
              </span>
            ))}
            <span className="ml-auto text-sm text-white/70">{project.year}</span>
          </div>
          <h3 className="text-4xl font-bold text-white mb-2">{project.title}</h3>
          <p className="text-white/80 mb-4 max-w-lg">{project.description}</p>
          <button className="flex items-center gap-2 text-white/90 hover:text-white transition-colors group">
            <span>View Project</span>
            <motion.span animate={{ x: isActive ? 5 : 0 }} transition={{ repeat: isActive ? Infinity : 0, duration: 1, repeatType: "reverse" }}>
              <ArrowUpRight size={18} />
            </motion.span>
          </button>
        </motion.div>

        <motion.div
          className={`absolute inset-0 rounded-2xl border-2 pointer-events-none`}
          style={{
            borderColor: "rgba(255,255,255,0.1)",
            background: `linear-gradient(45deg, ${project.colors.from}, ${project.colors.to})`,
            opacity: isActive ? 0.3 : 0.1,
          }}
          animate={{
            scale: isActive ? 1.02 : 1,
            boxShadow: isActive ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)" : "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default function GraspAnimation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2, once: false });

  // Auto-rotate projects
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section className="relative min-h-[200vh] py-20 overflow-x-hidden" ref={containerRef}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center mb-12 md:mb-20 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isInView ? 1 : 0.5,
              y: isInView ? 0 : 20,
            }}
            transition={{ duration: 0.8, delay: 0.2 }}>
            <motion.h2
              className="text-5xl md:text-7xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 inline-block"
              animate={{
                backgroundPosition: isInView ? "200% 0" : "0% 0%",
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 100%",
              }}>
              Crafting Digital Excellence
            </motion.h2>
            <motion.p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: isInView ? 1 : 0.5 }} transition={{ delay: 0.4 }}>
              Immerse yourself in our portfolio of premium projects that push creative boundaries
            </motion.p>
          </motion.div>

          <div className="relative h-[80vh] w-full">
            <AnimatePresence mode="wait">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} isActive={activeIndex === index} onClick={() => setActiveIndex(index)} />
              ))}
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-30">
              {projects.map((_, index) => (
                <button key={index} onClick={() => setActiveIndex(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${activeIndex === index ? "bg-white w-8 scale-110" : "bg-white/30"}`} aria-label={`Go to project ${index + 1}`} />
              ))}
            </div>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-3xl -z-10"
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-20 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 blur-3xl -z-10"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
              scale: [1, 0.95, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 text-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
          <span>Scroll to explore</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <MoveRight size={20} className="rotate-90" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
