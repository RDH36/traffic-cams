"use client"

import { useEffect, useState } from "react"
import { StreamerCardProps } from "@/components/streamer-card"
import {
  fetchChaturbateRooms,
  mapChaturbateRoomToStreamer,
} from "@/lib/chaturbate"
import { ChaturbateRoom } from "@/types"
import { PerformerTabs } from "./performer-tabs"
import { PopularTags } from "./popular-tags"
import { CategoryGrid } from "./category-grid"

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
  const [popularTagsList, setPopularTagsList] = useState<string[]>([])

  // Helper function to map API rooms to StreamerCard props
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
    fetchInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fetch initial data (female performers)
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

  // Load other categories (male, couples, trans)
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

      // Calculate popular tags once all data is loaded
      updatePopularTags([...mappedMale, ...mappedCouple, ...mappedTrans])
    } catch (error) {
      console.error("Error fetching other categories:", error)
    }
  }

  // Handle tab change
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
  const updatePopularTags = (
    additionalPerformers: StreamerCardProps[] = []
  ) => {
    const allPerformers = [...femalePerformers, ...additionalPerformers]

    const tagCounts: Record<string, number> = {}

    allPerformers.forEach((performer) => {
      if (performer.tags && performer.tags.length) {
        performer.tags.forEach((tag) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1
        })
      }
    })

    const popular = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 14)
      .map(([tag]) => tag)

    setPopularTagsList(popular)
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
            <PerformerTabs
              performers={performers}
              isLoading={isLoading}
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />

            <PopularTags tags={popularTagsList} />

            <CategoryGrid />
          </>
        )}
      </div>
    </section>
  )
}
