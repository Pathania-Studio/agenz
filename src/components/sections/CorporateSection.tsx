import { cn } from "@/lib/utils";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Corporate Project 1",
    description: "A comprehensive corporate branding solution",
    image: "/images/corporate/1.jpg",
    size: "large" as const,
  },
  {
    id: 2,
    title: "Corporate Project 2",
    description: "Annual report design and layout",
    image: "/images/corporate/2.jpg",
    size: "small" as const,
  },
  {
    id: 3,
    title: "Corporate Project 3",
    description: "Brand identity and guidelines",
    image: "/images/corporate/3.jpg",
    size: "small" as const,
  },
  {
    id: 4,
    title: "Corporate Project 4",
    description: "Product packaging design",
    image: "/images/corporate/4.jpg",
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
          <Image src={project.image} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      ))}
    </div>
  );
}
