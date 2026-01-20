import { cn } from "@/lib/utils";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";

const socialMediaPosts = [
  {
    id: 1,
    platform: "instagram",
    username: "@yourbrand",
    content: "Check out our latest product launch! #newarrival",
    image: "/images/social/instagram-1.jpg",
    likes: "2.4k",
    comments: "143",
  },
  {
    id: 2,
    platform: "twitter",
    username: "@yourbrand",
    content: "Exciting news coming your way! Stay tuned for our big announcement tomorrow. #staytuned",
    image: "/images/social/twitter-1.jpg",
    retweets: "356",
    likes: "1.2k",
  },
  {
    id: 3,
    platform: "facebook",
    username: "Your Brand",
    content: "We're celebrating 1 million followers! Thank you for your incredible support. 🎉",
    image: "/images/social/facebook-1.jpg",
    likes: "5.2k",
    comments: "324",
    shares: "1.1k",
  },
  {
    id: 4,
    platform: "youtube",
    username: "Your Brand",
    title: "Behind the Scenes: Making of Our Latest Campaign",
    views: "24.5K views",
    timestamp: "2 days ago",
    thumbnail: "/images/social/youtube-1.jpg",
  },
];

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "instagram":
      return <Instagram className="w-5 h-5" />;
    case "twitter":
      return <Twitter className="w-5 h-5 text-blue-400" />;
    case "facebook":
      return <Facebook className="w-5 h-5 text-blue-600" />;
    case "youtube":
      return <Youtube className="w-5 h-5 text-red-600" />;
    default:
      return null;
  }
};

export default function SocialMediaSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {socialMediaPosts.map((post) => (
        <div
          key={post.id}
          className={cn(
            "bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1",
            post.platform === "instagram" ? "border-pink-500 border-t-4" : "",
            post.platform === "twitter" ? "border-blue-400 border-t-4" : "",
            post.platform === "facebook" ? "border-blue-600 border-t-4" : "",
            post.platform === "youtube" ? "border-red-600 border-t-4" : "",
          )}>
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <PlatformIcon platform={post.platform} />
              <span className="font-medium capitalize">{post.platform}</span>
            </div>

            {post.platform === "youtube" ? (
              <div className="aspect-w-16 aspect-h-9 mb-3 relative">
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <Youtube className="w-12 h-12 text-red-600" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{post.timestamp}</span>
              </div>
            ) : (
              <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">Image</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              {post.platform === "youtube" && <h3 className="font-medium">{post.title}</h3>}
              <p className="text-sm text-gray-600 dark:text-gray-300">{post.platform === "youtube" ? post.views : post.content}</p>

              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4 pt-2">
                {post.platform !== "youtube" && <span>{post.likes} likes</span>}
                {post.comments && <span>{post.comments} comments</span>}
                {post.retweets && <span>{post.retweets} retweets</span>}
                {post.shares && <span>{post.shares} shares</span>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
