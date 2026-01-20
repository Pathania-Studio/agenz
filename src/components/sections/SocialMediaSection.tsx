import { cn } from "@/lib/utils";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import Image from "next/image";

type SocialPlatform = "instagram" | "twitter" | "facebook" | "youtube";

interface BasePost {
  id: number;
  platform: SocialPlatform;
  username: string;
}

interface SocialPost extends BasePost {
  platform: Exclude<SocialPlatform, "youtube">;
  content: string;
  image: string;
  likes: string;
  comments?: string;
  retweets?: string;
  shares?: string;
}

interface YoutubePost extends BasePost {
  platform: "youtube";
  title: string;
  views: string;
  timestamp: string;
  thumbnail: string;
}

type SocialMediaPost = SocialPost | YoutubePost;

const socialMediaPosts: SocialMediaPost[] = [
  {
    id: 1,
    platform: "instagram",
    username: "@creative.media",
    content: "Behind the scenes of our latest photoshoot. The details make all the difference. ✨ #photography #behindthescenes",
    image: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    likes: "2.4k",
    comments: "143",
  },
  {
    id: 2,
    platform: "twitter",
    username: "@creativemedia_hq",
    content: "Just launched our new campaign! Check out how we're pushing creative boundaries this season. 🚀 #creativityunleashed #digitalmarketing",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
    retweets: "356",
    likes: "1.2k",
  },
  {
    id: 3,
    platform: "facebook",
    username: "Creative Media Studios",
    content: "We're celebrating 1 million followers! None of this would be possible without your incredible support. Here's to creating more amazing content together! 🎉 #milestone #thankyou",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    likes: "5.2k",
    comments: "324",
    shares: "1.1k",
  },
  {
    id: 4,
    platform: "facebook",
    username: "Creative Media Studios",
    content: "We're celebrating 1 million followers! None of this would be possible without your incredible support. Here's to creating more amazing content together! 🎉 #milestone #thankyou",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    likes: "5.2k",
    comments: "324",
    shares: "1.1k",
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
                <div className="absolute inset-0">
                  <Image src={post.thumbnail} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />
                </div>
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-16 h-16 bg-black/60 rounded-full flex items-center justify-center">
                    <Youtube className="w-8 h-8 text-white" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{post.timestamp}</span>
              </div>
            ) : (
              <div className="relative aspect-square rounded-lg mb-3 overflow-hidden bg-gray-100 dark:bg-gray-700">
                {"image" in post && <Image src={post.image} alt={post.content} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" />}
              </div>
            )}

            <div className="space-y-2">
              {post.platform === "youtube" ? (
                <>
                  <h3 className="font-medium">{post.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{post.views}</p>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{post.content}</p>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4 pt-2">
                    <span>{post.likes} likes</span>
                    {post.comments && <span>{post.comments} comments</span>}
                    {post.platform === "twitter" && post.retweets && <span>{post.retweets} retweets</span>}
                    {post.platform === "facebook" && post.shares && <span>{post.shares} shares</span>}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
