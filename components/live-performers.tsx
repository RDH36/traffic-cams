"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { StreamerCard, StreamerCardProps } from "@/components/streamer-card"
import {
  fetchChaturbateRooms,
  mapChaturbateRoomToStreamer,
} from "@/lib/chaturbate"
import { ChaturbateRoom } from "@/types"
import { Skeleton } from "./ui/skeleton"

export function LivePerformers() {
  const [performers, setPerformers] = useState<StreamerCardProps[]>([])
  const [femalePerformers, setFemalePerformers] = useState<StreamerCardProps[]>(
    []
  )
  const [malePerformers, setMalePerformers] = useState<StreamerCardProps[]>([])
  const [couplePerformers, setCouplePerformers] = useState<StreamerCardProps[]>(
    []
  )
  const [transPerformers, setTransPerformers] = useState<StreamerCardProps[]>(
    []
  )
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("female")

  const mapRoomsToCardProps = (
    rooms: ChaturbateRoom[],
    category: "female" | "male" | "couples" | "trans",
    previewVideo: string
  ): StreamerCardProps[] => {
    return rooms.map((room) => {
      const streamer = mapChaturbateRoomToStreamer(room)
      return {
        ...streamer,
        category,
        previewVideo,
        rating: 4.5,
      }
    })
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true)
      try {
        // Fetch female performers first (for initial display)
        const femaleData = await fetchChaturbateRooms({
          gender: "f",
          limit: 20,
        })

        if (femaleData.results.length === 0) {
          console.warn("No female performers found")
          setIsLoading(false)
          return
        }

        const mappedFemale = mapRoomsToCardProps(
          femaleData.results,
          "female",
          "/videos/preview1.mp4"
        )
        setFemalePerformers(mappedFemale)
        setPerformers(mappedFemale)

        // Load other categories in the background
        loadOtherCategories()
      } catch (error) {
        console.error("Error fetching performers:", error)
      } finally {
        setIsLoading(false)
      }
    }

    const loadOtherCategories = async () => {
      try {
        // Male performers
        const maleData = await fetchChaturbateRooms({ gender: "m", limit: 20 })
        const mappedMale = mapRoomsToCardProps(
          maleData.results,
          "male",
          "/videos/preview2.mp4"
        )
        setMalePerformers(mappedMale)

        // Couple performers
        const coupleData = await fetchChaturbateRooms({
          gender: "c",
          limit: 20,
        })
        const mappedCouple = mapRoomsToCardProps(
          coupleData.results,
          "couples",
          "/videos/preview3.mp4"
        )
        setCouplePerformers(mappedCouple)

        // Trans performers
        const transData = await fetchChaturbateRooms({ gender: "t", limit: 20 })
        const mappedTrans = mapRoomsToCardProps(
          transData.results,
          "trans",
          "/videos/preview4.mp4"
        )
        setTransPerformers(mappedTrans)
      } catch (error) {
        console.error("Error fetching other categories:", error)
      }
    }

    fetchInitialData()
  }, [])

  const handleTabChange = (value: string) => {
    setActiveTab(value)

    switch (value) {
      case "female":
        setPerformers(femalePerformers)
        break
      case "male":
        setPerformers(malePerformers)
        break
      case "couples":
        setPerformers(couplePerformers)
        break
      case "trans":
        setPerformers(transPerformers)
        break
      case "popular":
        // Combine all performers and sort by viewers
        const allPerformers = [
          ...femalePerformers,
          ...malePerformers,
          ...couplePerformers,
          ...transPerformers,
        ]
        setPerformers(
          allPerformers
            .sort((a, b) => (b.viewers || 0) - (a.viewers || 0))
            .slice(0, 20)
        )
        break
      default:
        setPerformers(femalePerformers)
    }
  }

  // Calculate popular tags across all performers
  const popularTags = () => {
    const allPerformers = [
      ...femalePerformers,
      ...malePerformers,
      ...couplePerformers,
      ...transPerformers,
    ]

    const tagCounts: Record<string, number> = {}

    allPerformers.forEach((performer) => {
      if (performer.tags && performer.tags.length) {
        performer.tags.forEach((tag) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1
        })
      }
    })

    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 14)
      .map(([tag]) => tag)
  }

  return (
    <section className="py-16 px-4 bg-[#121212]" id="performers">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 font-montserrat">
          Explore <span className="text-[#FF3860]">performers</span>
        </h2>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF3860]"></div>
            <p className="mt-4 text-muted-foreground">Loading performers...</p>
          </div>
        ) : performers.length === 0 ? (
          <div className="text-center py-12 bg-black/30 rounded-xl">
            <p className="text-lg">No performers available at the moment.</p>
            <p className="text-muted-foreground mt-2">
              Please check back later or try refreshing the page.
            </p>
          </div>
        ) : (
          <>
            <Tabs
              defaultValue="female"
              className="mb-12"
              onValueChange={handleTabChange}
            >
              <TabsList className="bg-black/20 mb-8 flex flex-wrap">
                <TabsTrigger value="popular">Most Watched</TabsTrigger>
                <TabsTrigger value="female">Female</TabsTrigger>
                <TabsTrigger value="male">Male</TabsTrigger>
                <TabsTrigger value="couples">Couples</TabsTrigger>
                <TabsTrigger value="trans">Trans</TabsTrigger>
              </TabsList>

              <TabsContent value="popular" className="animate-in fade-in-50">
                <PerformerGrid
                  performers={performers}
                  isLoading={isLoading && activeTab === "popular"}
                />
              </TabsContent>

              <TabsContent value="female" className="animate-in fade-in-50">
                <PerformerGrid
                  performers={performers}
                  isLoading={isLoading && activeTab === "female"}
                />
              </TabsContent>

              <TabsContent value="male" className="animate-in fade-in-50">
                <PerformerGrid
                  performers={performers}
                  isLoading={isLoading && activeTab === "male"}
                />
              </TabsContent>

              <TabsContent value="couples" className="animate-in fade-in-50">
                <PerformerGrid
                  performers={performers}
                  isLoading={isLoading && activeTab === "couples"}
                />
              </TabsContent>

              <TabsContent value="trans" className="animate-in fade-in-50">
                <PerformerGrid
                  performers={performers}
                  isLoading={isLoading && activeTab === "trans"}
                />
              </TabsContent>
            </Tabs>

            {!isLoading && performers.length > 0 && (
              <div className="bg-black/30 p-6 rounded-xl mb-12">
                <h3 className="text-xl font-semibold mb-4 font-montserrat">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags().map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#FF3860]/20 text-[#FF3860] px-3 py-1 rounded-full text-sm hover:bg-[#FF3860]/30 cursor-pointer transition"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

interface PerformerGridProps {
  performers: StreamerCardProps[]
  isLoading: boolean
}

function PerformerGrid({ performers, isLoading }: PerformerGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <div className="p-3 bg-card">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {performers.slice(0, 8).map((performer) => (
        <StreamerCard key={performer.id} {...performer} />
      ))}
    </div>
  )
}
