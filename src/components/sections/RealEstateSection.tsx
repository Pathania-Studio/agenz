import { cn } from "@/lib/utils";
import { Play, Camera, Video, Drone, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

type ProjectType = "featured" | "standard";
type MediaType = "cinematic" | "drone" | "stills" | "virtual-tour";

interface ProductionProject {
  id: number;
  title: string;
  client: string;
  type: ProjectType;
  mediaType: MediaType;
  description: string;
  deliverables: string[];
  thumbnail: string;
  aspectRatio?: string;
}

const productionProjects: ProductionProject[] = [
  {
    id: 1,
    title: "Luxury Development Series",
    client: "Horizon Properties",
    type: "featured",
    mediaType: "cinematic",
    description: "A cinematic showcase of a luxury residential development, highlighting architectural details and lifestyle.",
    deliverables: ["4K Cinematic Film", "Drone Aerials", "Architectural Stills", "Social Media Cuts"],
    // TEMPORARY: Using placeholder image - Replace with actual production assets
    thumbnail: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    aspectRatio: "aspect-[21/9]",
  },
  {
    id: 2,
    title: "Urban Living Campaign",
    client: "Metro Living",
    type: "standard",
    mediaType: "stills",
    description: "Editorial photography capturing the essence of contemporary urban living spaces.",
    deliverables: ["Interior Photography", "Lifestyle Shots", "Detail Shots"],
    // TEMPORARY: Using placeholder image - Replace with actual production assets
    thumbnail: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
  {
    id: 3,
    title: "Coastal Estates",
    client: "Azure Shores",
    type: "standard",
    mediaType: "drone",
    description: "Aerial perspectives of exclusive coastal properties and their stunning surroundings.",
    deliverables: ["Drone Footage", "Aerial Photography", "Site Overviews"],
    // TEMPORARY: Using placeholder image - Replace with actual production assets
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    id: 4,
    title: "Architectural Digest",
    client: "Moderna Architects",
    type: "standard",
    mediaType: "virtual-tour",
    description: "Interactive virtual tours showcasing innovative architectural design and space planning.",
    deliverables: ["3D Virtual Tours", "Floor Plan Visualizations", "Matterport Integration"],
    // TEMPORARY: Using placeholder image - Replace with actual production assets
    thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
  },
];

const MediaTypeIcon = ({ type }: { type: MediaType }) => {
  const icons = {
    cinematic: <Video className="w-4 h-4" />,
    drone: <Drone className="w-4 h-4" />,
    stills: <Camera className="w-4 h-4" />,
    "virtual-tour": <ImageIcon className="w-4 h-4" />,
  };

  const labels = {
    cinematic: "Cinematic Film",
    drone: "Aerial",
    stills: "Photography",
    "virtual-tour": "Virtual Tour",
  };

  return (
    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 dark:text-gray-300">
      {icons[type]}
      <span>{labels[type]}</span>
    </div>
  );
};

export default function RealEstateSection() {
  const featuredProject = productionProjects.find((project) => project.type === "featured");
  const otherProjects = productionProjects.filter((project) => project.type !== "featured");

  return (
    <div className="space-y-12">
      {/* Featured Project */}
      {featuredProject && (
        <div className="group relative rounded-xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
          <div className={cn("relative", featuredProject.aspectRatio || "aspect-video", "bg-gray-50 dark:bg-gray-800")}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 z-10 flex items-end p-6">
              <div className="text-white">
                <span className="inline-block text-sm font-medium mb-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full">Featured Production</span>
                <h2 className="text-2xl md:text-3xl font-bold mt-2">{featuredProject.title}</h2>
                <p className="text-gray-200 text-sm mt-1">{featuredProject.client}</p>
              </div>
            </div>
            <div className="absolute top-4 right-4 z-10">
              <MediaTypeIcon type={featuredProject.mediaType} />
            </div>
            <div className="relative w-full h-full">
              <Image src={featuredProject.thumbnail} alt={`${featuredProject.title} - ${featuredProject.client}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1400px" priority />
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-300 mb-4">{featuredProject.description}</p>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">DELIVERABLES</h4>
              <div className="flex flex-wrap gap-2">
                {featuredProject.deliverables.map((item, index) => (
                  <span key={index} className="text-xs font-medium px-3 py-1.5 bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-200 rounded-full">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherProjects.map((project) => (
          <div key={project.id} className="group rounded-lg overflow-hidden bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="aspect-[4/3] relative bg-gray-50 dark:bg-gray-800">
              <div className="absolute top-3 right-3 z-10">
                <MediaTypeIcon type={project.mediaType} />
              </div>
              <div className="relative w-full h-full">
                <Image src={project.thumbnail} alt={`${project.title} - ${project.client}`} fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-medium text-gray-900 dark:text-white">{project.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{project.client}</p>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex flex-wrap gap-1.5">
                  {project.deliverables.slice(0, 2).map((item, index) => (
                    <span key={index} className="text-xs px-2.5 py-1 bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 rounded-full">
                      {item}
                    </span>
                  ))}
                  {project.deliverables.length > 2 && <span className="text-xs px-2.5 py-1 bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 rounded-full">+{project.deliverables.length - 2} more</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
