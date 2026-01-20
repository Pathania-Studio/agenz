"use client";

import { cn } from "@/lib/utils";
import { Monitor, Smartphone, Tablet } from "lucide-react";

type DeviceType = "desktop" | "tablet" | "mobile";
type ProjectType = "web" | "mobile";

interface DesignProject {
  id: number;
  title: string;
  description: string;
  type: ProjectType;
  devices: DeviceType[];
  image: string;
}

const designProjects: DesignProject[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A modern e-commerce platform with focus on user experience and conversions.",
    type: "web",
    devices: ["desktop", "tablet", "mobile"],
    image: "/images/design/ecommerce.jpg",
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description: "Secure and intuitive mobile banking application design.",
    type: "mobile",
    devices: ["mobile"],
    image: "/images/design/banking.jpg",
  },
  {
    id: 3,
    title: "SaaS Dashboard",
    description: "Analytics dashboard for a software as a service product.",
    type: "web",
    devices: ["desktop"],
    image: "/images/design/dashboard.jpg",
  },
  {
    id: 4,
    title: "Fitness App",
    description: "Mobile application for fitness tracking and workout plans.",
    type: "mobile",
    devices: ["mobile", "tablet"],
    image: "/images/design/fitness.jpg",
  },
];

const DeviceIcon = ({ device, className = "" }: { device: DeviceType; className?: string }) => {
  const iconProps = { className: cn("w-4 h-4", className) };

  const icons: Record<DeviceType, React.ReactNode> = {
    desktop: <Monitor {...iconProps} />,
    tablet: <Tablet {...iconProps} />,
    mobile: <Smartphone {...iconProps} />,
  };

  return icons[device] || null;
};

const DeviceMockup = ({ device }: { device: DeviceType }) => {
  const deviceClasses = {
    desktop: "hidden md:block w-full max-w-3xl h-4/5 bg-white dark:bg-gray-900 rounded-lg border-8 border-gray-900 dark:border-gray-700 overflow-hidden",
    tablet: "hidden md:block w-48 h-3/4 bg-white dark:bg-gray-900 rounded-lg border-8 border-gray-800 dark:border-gray-600 overflow-hidden",
    mobile: "w-24 h-48 bg-white dark:bg-gray-900 rounded-2xl border-8 border-gray-800 dark:border-gray-600 overflow-hidden",
  };

  return (
    <div className={deviceClasses[device]}>
      {device === "desktop" && (
        <div className="absolute top-0 left-0 right-0 h-6 bg-gray-900 dark:bg-gray-700 flex items-center px-4">
          <div className="flex space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="w-3 h-3 rounded-full bg-green-500" />
          </div>
        </div>
      )}
      {device === "tablet" && <div className="absolute top-0 left-0 right-0 h-4 bg-gray-800 dark:bg-gray-700" />}
      {device === "mobile" && (
        <>
          <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 dark:bg-gray-700 flex items-center justify-center">
            <div className="w-12 h-1 bg-gray-600 rounded-full" />
          </div>
          <div className="absolute bottom-2 left-0 right-0 flex justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-500" />
          </div>
        </>
      )}
    </div>
  );
};

export default function DesignSection() {
  const [featuredProject, ...otherProjects] = designProjects;

  return (
    <div className="space-y-8">
      {/* Featured Project */}
      <div className="group bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 border border-gray-100 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 space-y-5">
            <span className="inline-block text-xs font-medium text-blue-600 dark:text-blue-400 mb-2">Featured Project</span>
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">{featuredProject.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{featuredProject.description}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              {featuredProject.devices.map((device) => (
                <span
                  key={`${featuredProject.id}-${device}-icon`}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50"
                  title={device.charAt(0).toUpperCase() + device.slice(1)}>
                  <DeviceIcon device={device} className="mr-1.5 w-3 h-3" />
                  {device.charAt(0).toUpperCase() + device.slice(1)}
                </span>
              ))}
            </div>
            <button className="mt-3 px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium rounded-lg hover:opacity-90" onClick={() => console.log(`Viewing case study for ${featuredProject.title}`)}>
              View Case Study →
            </button>
          </div>
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="relative w-full h-80 bg-gray-50 dark:bg-gray-700/30 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center p-4">
                {featuredProject.devices.map((device) => (
                  <DeviceMockup key={`${featuredProject.id}-${device}`} device={device} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {otherProjects.map((project, index) => {
          const isWide = index % 3 === 0 && index !== 0;

          return (
            <div key={project.id} className={cn("bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700", "transition-shadow hover:shadow-md", isWide ? "md:col-span-2" : "")}>
              <div className="aspect-[4/3] bg-gray-50 dark:bg-gray-700/30 relative">
                <div className="absolute inset-0 p-6 flex items-center justify-center">
                  {project.devices.map((device) => (
                    <DeviceMockup key={`${project.id}-${device}`} device={device} />
                  ))}
                </div>
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{project.title}</h3>
                  <div className="flex gap-1.5">
                    {project.devices.map((device) => (
                      <span key={`${project.id}-${device}-icon`} className="w-5 h-5 flex items-center justify-center text-gray-500 dark:text-gray-400" title={device.charAt(0).toUpperCase() + device.slice(1)}>
                        <DeviceIcon device={device} className="w-3.5 h-3.5" />
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{project.description}</p>

                <button className="mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center" onClick={() => console.log(`Viewing case study for ${project.title}`)}>
                  View Project
                  <svg className="w-3.5 h-3.5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
