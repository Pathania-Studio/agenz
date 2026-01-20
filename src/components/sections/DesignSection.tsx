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

  const icons: Record<DeviceType, JSX.Element> = {
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {designProjects.map((project) => {
        const hasMultipleDevices = project.devices.length > 1;

        return (
          <div key={project.id} className="group relative">
            <div className={cn("relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 p-8 transition-all duration-300", "border border-gray-200 dark:border-gray-700", "group-hover:shadow-lg group-hover:-translate-y-1")}>
              {/* Device Mockup */}
              <div className={cn("relative mx-auto transition-transform duration-500", hasMultipleDevices ? "h-64" : "h-80")}>
                <div className="relative h-full w-full flex items-center justify-center">
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">Design Preview</span>
                  </div>

                  {project.devices.map((device) => (
                    <DeviceMockup key={`${project.id}-${device}`} device={device} />
                  ))}
                </div>
              </div>

              {/* Project Info */}
              <div className="mt-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
                  <div className="flex space-x-1">
                    {project.devices.map((device) => (
                      <span key={`${project.id}-${device}-icon`} className="p-1.5 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300" title={device.charAt(0).toUpperCase() + device.slice(1)}>
                        <DeviceIcon device={device} />
                      </span>
                    ))}
                  </div>
                </div>

                <p className="mt-2 text-gray-600 dark:text-gray-300">{project.description}</p>

                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" onClick={() => console.log(`Viewing case study for ${project.title}`)}>
                    View Case Study →
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
