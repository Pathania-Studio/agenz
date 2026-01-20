import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

const properties = [
  {
    id: 1,
    title: "Luxury Villa with Ocean View",
    location: "Malibu, California",
    price: "$4,200,000",
    beds: 5,
    baths: 4.5,
    sqft: "4,200",
    type: "video",
    media: "/videos/property1.mp4",
    thumbnail: "/images/real-estate/1.jpg",
  },
  {
    id: 2,
    title: "Modern Downtown Apartment",
    location: "New York, NY",
    price: "$1,850,000",
    beds: 3,
    baths: 2,
    sqft: "2,100",
    type: "image",
    media: "/images/real-estate/2.jpg",
  },
  {
    id: 3,
    title: "Mountain Retreat",
    location: "Aspen, Colorado",
    price: "$3,750,000",
    beds: 6,
    baths: 5,
    sqft: "5,800",
    type: "video",
    media: "/videos/property2.mp4",
    thumbnail: "/images/real-estate/3.jpg",
  },
  {
    id: 4,
    title: "Beachfront Penthouse",
    location: "Miami, Florida",
    price: "$6,500,000",
    beds: 4,
    baths: 4.5,
    sqft: "3,800",
    type: "image",
    media: "/images/real-estate/4.jpg",
  },
];

export default function RealEstateSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {properties.map((property) => (
        <div key={property.id} className="group relative rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
          <div className="relative aspect-video bg-gray-200 dark:bg-gray-700">
            {property.type === "video" ? (
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
                  <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-gray-900 ml-1" fill="currentColor" />
                  </div>
                </div>
                <img src={property.thumbnail} alt={property.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">Property Image</span>
              </div>
            )}
            <div className="absolute bottom-4 left-4 bg-blue-600 text-white text-sm font-medium px-3 py-1 rounded-full">{property.type === "video" ? "Video Tour" : "Photo Gallery"}</div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{property.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{property.location}</p>
              </div>
              <span className="text-2xl font-bold text-blue-600">{property.price}</span>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-4 text-sm text-gray-600 dark:text-gray-300">
                <span>{property.beds} Beds</span>
                <span>{property.baths} Baths</span>
                <span>{property.sqft} sq ft</span>
              </div>
            </div>

            <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">View Property</button>
          </div>
        </div>
      ))}
    </div>
  );
}
