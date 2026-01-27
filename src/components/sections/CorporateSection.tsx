import { cn } from "@/lib/utils";
import Image from "next/image";

type Project = {
  id: number;
  title: string;
  tags: string[];
  image: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Executive Branding",
    tags: ["Brand Identity", "Visual System", "Strategy"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Annual Report",
    tags: ["Editorial", "Data Vis"],
    image: "https://images.unsplash.com/photo-1554224155-3a58922a22c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
  },
  {
    id: 3,
    title: "Brand System",
    tags: ["Identity", "Guidelines"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
  },
  {
    id: 4,
    title: "Packaging",
    tags: ["Luxury", "Consumer"],
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
  {
    id: 5,
    title: "Packaging",
    tags: ["Luxury", "Consumer"],
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
  {
    id: 6,
    title: "Packaging",
    tags: ["Luxury", "Consumer"],
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
];

const ProjectCard = ({ project, className = "" }: { project: Project; className?: string }) => (
  <div className={cn("group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/80", "border border-gray-800/50 backdrop-blur-sm", "transition-all duration-300 hover:border-cyan-400/30", className)}>
    <div className="relative aspect-[4/3]">
      <Image src={project.image} alt={project.title} fill className="object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-lg font-medium text-white">{project.title}</h3>
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs font-mono text-cyan-300/80 px-2 py-0.5 bg-cyan-900/20 border border-cyan-400/20 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
      {project.featured && <div className="absolute top-3 right-3 bg-cyan-500/90 text-white text-xs font-medium px-2 py-1 rounded-full">Featured</div>}
    </div>
  </div>
);

export default function CorporateSection() {
  const featuredProject = projects.find((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <div className="relative">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

      <div className="grid grid-cols-1 md:grid-cols-6 gap-5 p-6 mx-auto">
        {/* Featured Project - Takes 2/3 width on desktop */}
        <div className="md:col-span-4">
          <ProjectCard project={featuredProject!} className="h-full" />
        </div>

        {/* Secondary Projects - Takes 1/3 width on desktop */}
        <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-1 gap-5">
          {otherProjects.slice(0, 2).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Bottom Row - Full width for remaining projects */}
        <div className="md:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-5">
          {otherProjects.slice(2).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
