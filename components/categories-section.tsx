"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { StreamerCard } from "@/components/streamer-card"
import { generateChaturbateLink } from "@/lib/chaturbate"
import { Streamer } from "@/types"

// Demo data for performers with Chaturbate affiliate links
const demoStreamers: (Streamer & { previewVideo: string; rating: number })[] = [
  {
    id: "1",
    name: "MelodyLove",
    username: "melody_love",
    image: "/images/streamers/melody.jpg",
    previewVideo: "/videos/preview1.mp4",
    category: "female",
    viewers: 1245,
    rating: 4.8,
    isLive: true,
    chaturbateLink: generateChaturbateLink("melody_love"),
    tags: ["brunette", "tattoo", "busty"],
  },
  {
    id: "2",
    name: "AsianDream",
    username: "asian_dream",
    image: "/images/streamers/travel.jpg",
    previewVideo: "/videos/preview2.mp4",
    category: "female",
    viewers: 856,
    rating: 4.6,
    isLive: true,
    chaturbateLink: generateChaturbateLink("asian_dream"),
    tags: ["asian", "petite", "toys"],
  },
  {
    id: "3",
    name: "JackMuscle",
    username: "jack_muscle",
    image: "/images/streamers/gaming.jpg",
    previewVideo: "/videos/preview3.mp4",
    category: "male",
    viewers: 2103,
    rating: 4.9,
    isLive: true,
    chaturbateLink: generateChaturbateLink("jack_muscle"),
    tags: ["athletic", "muscular", "fitness"],
  },
  {
    id: "4",
    name: "CosplayQueen",
    username: "cosplay_queen",
    image: "/images/streamers/cooking.jpg",
    previewVideo: "/videos/preview4.mp4",
    category: "female",
    viewers: 543,
    rating: 4.7,
    isLive: false,
    chaturbateLink: generateChaturbateLink("cosplay_queen"),
    tags: ["cosplay", "roleplay", "gaming"],
  },
  {
    id: "5",
    name: "FitCouple",
    username: "fit_couple",
    image: "/images/streamers/fitness.jpg",
    previewVideo: "/videos/preview5.mp4",
    category: "couples",
    viewers: 781,
    rating: 4.5,
    isLive: true,
    chaturbateLink: generateChaturbateLink("fit_couple"),
    tags: ["fit", "couple", "athletic"],
  },
  {
    id: "6",
    name: "KinkyDuo",
    username: "kinky_duo",
    image: "/images/streamers/art.jpg",
    previewVideo: "/videos/preview6.mp4",
    category: "couples",
    viewers: 428,
    rating: 4.8,
    isLive: false,
    chaturbateLink: generateChaturbateLink("kinky_duo"),
    tags: ["bdsm", "fetish", "kinky"],
  },
  {
    id: "7",
    name: "TransBeauty",
    username: "trans_beauty",
    image: "/images/streamers/tech.jpg",
    previewVideo: "/videos/preview7.mp4",
    category: "trans",
    viewers: 967,
    rating: 4.7,
    isLive: true,
    chaturbateLink: generateChaturbateLink("trans_beauty"),
    tags: ["trans", "latina", "sexy"],
  },
  {
    id: "8",
    name: "DanceHottie",
    username: "dance_hottie",
    image: "/images/streamers/dance.jpg",
    previewVideo: "/videos/preview8.mp4",
    category: "female",
    viewers: 658,
    rating: 4.9,
    isLive: true,
    chaturbateLink: generateChaturbateLink("dance_hottie"),
    tags: ["dancer", "flexible", "athletic"],
  },
  {
    id: "9",
    name: "GentleBear",
    username: "gentle_bear",
    image: "/images/streamers/male1.jpg",
    previewVideo: "/videos/preview9.mp4",
    category: "male",
    viewers: 412,
    rating: 4.5,
    isLive: true,
    chaturbateLink: generateChaturbateLink("gentle_bear"),
    tags: ["bear", "muscular", "hairy"],
  },
  {
    id: "10",
    name: "CurvyQueen",
    username: "curvy_queen",
    image: "/images/streamers/female2.jpg",
    previewVideo: "/videos/preview10.mp4",
    category: "female",
    viewers: 892,
    rating: 4.8,
    isLive: true,
    chaturbateLink: generateChaturbateLink("curvy_queen"),
    tags: ["curvy", "bbw", "busty"],
  },
  {
    id: "11",
    name: "GroupFun",
    username: "group_fun",
    image: "/images/streamers/group1.jpg",
    previewVideo: "/videos/preview11.mp4",
    category: "couples",
    viewers: 1532,
    rating: 4.9,
    isLive: false,
    chaturbateLink: generateChaturbateLink("group_fun"),
    tags: ["group", "party", "orgy"],
  },
  {
    id: "12",
    name: "TwinkBoy",
    username: "twink_boy",
    image: "/images/streamers/male2.jpg",
    previewVideo: "/videos/preview12.mp4",
    category: "male",
    viewers: 378,
    rating: 4.6,
    isLive: true,
    chaturbateLink: generateChaturbateLink("twink_boy"),
    tags: ["twink", "slim", "young"],
  },
]

export function CategoriesSection() {
  return (
    <section className="py-16 px-4 bg-[#121212]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 font-montserrat">
          Explore <span className="text-[#FF3860]">categories</span>
        </h2>

        <Tabs defaultValue="popular" className="mb-12">
          <TabsList className="bg-black/20 mb-8 flex flex-wrap">
            <TabsTrigger value="popular">Most Watched</TabsTrigger>
            <TabsTrigger value="female">Female</TabsTrigger>
            <TabsTrigger value="male">Male</TabsTrigger>
            <TabsTrigger value="couples">Couples</TabsTrigger>
            <TabsTrigger value="trans">Trans</TabsTrigger>
            <TabsTrigger value="new">New Models</TabsTrigger>
          </TabsList>

          <TabsContent value="popular" className="animate-in fade-in-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {demoStreamers
                .sort((a, b) => (b.viewers || 0) - (a.viewers || 0))
                .slice(0, 8)
                .map((streamer) => (
                  <StreamerCard key={streamer.id} {...streamer} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="female" className="animate-in fade-in-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {demoStreamers
                .filter((streamer) => streamer.category === "female")
                .slice(0, 8)
                .map((streamer) => (
                  <StreamerCard key={streamer.id} {...streamer} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="male" className="animate-in fade-in-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {demoStreamers
                .filter((streamer) => streamer.category === "male")
                .slice(0, 8)
                .map((streamer) => (
                  <StreamerCard key={streamer.id} {...streamer} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="couples" className="animate-in fade-in-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {demoStreamers
                .filter((streamer) => streamer.category === "couples")
                .slice(0, 8)
                .map((streamer) => (
                  <StreamerCard key={streamer.id} {...streamer} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="trans" className="animate-in fade-in-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {demoStreamers
                .filter((streamer) => streamer.category === "trans")
                .slice(0, 8)
                .map((streamer) => (
                  <StreamerCard key={streamer.id} {...streamer} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="animate-in fade-in-50">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {demoStreamers
                .slice()
                .reverse()
                .slice(0, 8)
                .map((streamer) => (
                  <StreamerCard key={streamer.id} {...streamer} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
