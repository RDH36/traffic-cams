"use client"

import { useState } from "react"
import { StreamerCard, StreamerCardProps } from "@/components/streamer-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { getChaturbateLinks, openChaturbateLink } from "@/lib/chaturbate-links"
import { FORCE_SIGNUP } from "@/lib/chaturbate"

interface PerformerGridProps {
  performers: StreamerCardProps[]
  isLoading: boolean
  category?: string
}

export function PerformerGrid({
  performers,
  isLoading,
  category = "female",
}: PerformerGridProps) {
  const [displayCount, setDisplayCount] = useState(16)
  const links = getChaturbateLinks(FORCE_SIGNUP)

  // Déterminer quelle clé de lien utiliser en fonction de la catégorie
  const getCategoryLinkKey = () => {
    switch (category) {
      case "female":
        return "homeFemale"
      case "male":
        return "homeMale"
      case "couples":
        return "homeCouple"
      case "trans":
        return "homeTrans"
      default:
        return "homeAll"
    }
  }

  const handleViewMoreClick = () => {
    // Si nous avons déjà affiché tous les performers, redirigez vers Chaturbate
    if (displayCount >= performers.length) {
      const linkKey = getCategoryLinkKey()
      openChaturbateLink(links[linkKey])
    } else {
      // Sinon, affichez 16 performers de plus
      setDisplayCount((prevCount) =>
        Math.min(prevCount + 16, performers.length)
      )
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(16)
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {performers.slice(0, displayCount).map((performer) => (
          <StreamerCard key={performer.id} {...performer} />
        ))}
      </div>

      {performers.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={handleViewMoreClick}
            className="border-[#FF3860] text-[#FF3860] hover:bg-[#FF3860]/10"
          >
            {displayCount >= performers.length
              ? "Voir plus sur Chaturbate"
              : `Voir plus (${
                  Math.min(displayCount + 16, performers.length) - displayCount
                } de plus)`}
          </Button>
        </div>
      )}
    </div>
  )
}
