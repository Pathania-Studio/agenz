import { cn } from "@/lib/utils";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Executive Branding Package",
    description: "Comprehensive corporate identity and branding solution for a Fortune 500 client",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    size: "large" as const,
  },
  {
    id: 2,
    title: "Annual Report Design",
    description: "Innovative annual report design with data visualization",
    image: "https://images.unsplash.com/photo-1554224155-3a58922a22c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1965&q=80",
    size: "small" as const,
  },
  {
    id: 3,
    title: "Brand Guidelines",
    description: "Comprehensive brand identity system and guidelines",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    size: "small" as const,
  },
  {
    id: 4,
    title: "Product Packaging",
    description: "Luxury packaging design for premium consumer goods",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    size: "large" as const,
  },
];

export default function CorporateSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <div key={project.id} className={cn("group relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:shadow-2xl", project.size === "large" ? "md:col-span-2 h-96" : "h-80")}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 flex flex-col justify-end p-6">
            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
            <p className="text-gray-200">{project.description}</p>
          </div>
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={project.size === "large" ? "(max-width: 768px) 100vw, 100vw" : "(max-width: 768px) 100vw, 50vw"}
            priority={project.size === "large"}
          />
        </div>
      ))}
    </div>
  );
}
