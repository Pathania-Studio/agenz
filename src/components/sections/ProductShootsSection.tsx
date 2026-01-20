import { cn } from "@/lib/utils";

const products = [
  {
    id: 1,
    name: "Premium Headphones",
    category: "Audio",
    images: ["/images/products/headphones-1.jpg", "/images/products/headphones-2.jpg", "/images/products/headphones-3.jpg"],
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    category: "Wearables",
    images: ["/images/products/watch-1.jpg", "/images/products/watch-2.jpg"],
  },
  {
    id: 3,
    name: "Wireless Earbuds",
    category: "Audio",
    images: ["/images/products/earbuds-1.jpg", "/images/products/earbuds-2.jpg", "/images/products/earbuds-3.jpg"],
  },
  {
    id: 4,
    name: "DSLR Camera",
    category: "Photography",
    images: ["/images/products/camera-1.jpg", "/images/products/camera-2.jpg"],
  },
  {
    id: 5,
    name: "Gaming Console",
    category: "Gaming",
    images: ["/images/products/console-1.jpg", "/images/products/console-2.jpg"],
  },
  {
    id: 6,
    name: "Smartphone Pro",
    category: "Mobile",
    images: ["/images/products/phone-1.jpg", "/images/products/phone-2.jpg", "/images/products/phone-3.jpg"],
  },
];

export default function ProductShootsSection() {
  return (
    <div className="space-y-12">
      {products.map((product) => (
        <div key={product.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-full mb-2">{product.category}</span>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{product.name}</h3>
              </div>
              <button className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">View All ({product.images.length})</button>
            </div>

            <div className={cn("grid gap-4", product.images.length > 2 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2")}>
              {product.images.map((image, index) => (
                <div key={index} className={cn("aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center", index === 0 && product.images.length > 1 ? "sm:row-span-2" : "")}>
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400">
                      {product.name} {index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-gray-800"></div>
                ))}
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs text-gray-500">+3</div>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">View Project</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
