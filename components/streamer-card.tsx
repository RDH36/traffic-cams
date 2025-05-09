"use client"

import { useState } from "react"
import Image from "next/image"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { openChaturbateLink } from "@/lib/chaturbate"
import { Streamer } from "@/types"

export interface StreamerCardProps extends Omit<Streamer, "username"> {
  previewVideo?: string
  rating?: number
}

export function StreamerCard({
  name,
  image,
  previewVideo = "/videos/preview1.mp4", // Default fallback
  category,
  viewers = 0,
  rating = 4.5, // Default fallback
  isLive,
  chaturbateLink,
  tags = [],
}: StreamerCardProps) {
  const [imageError, setImageError] = useState(false)
  const fallbackImage = "/images/fallback-thumbnail.jpg" // Assurez-vous d'avoir cette image dans votre dossier public

  const handleClick = () => {
    openChaturbateLink(chaturbateLink)
  }

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div
          className="group relative overflow-hidden rounded-lg cursor-pointer transition-all duration-300"
          onClick={handleClick}
        >
          <div className="aspect-video relative overflow-hidden bg-black">
            <Image
              src={imageError ? fallbackImage : image}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              onError={handleImageError}
              unoptimized
            />

            {isLive && (
              <Badge variant="live" className="absolute top-2 left-2">
                LIVE
              </Badge>
            )}

            <div className="absolute bottom-2 left-2 flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M12 6c-4.5 0-8 2.5-8 5.5 0 1.1.4 2.1 1 3 .2.2.2.6 0 1l-1 2h2a9.9 9.9 0 0 0 6-2c4.5 0 8-2.5 8-5.5S16.5 6 12 6Z"></path>
                </svg>
                <span>{viewers}</span>
              </div>

              <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-yellow-400"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
                <span>{rating.toFixed(1)}</span>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
              <Button
                variant="accent"
                size="sm"
                className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
              >
                Watch Live
              </Button>
            </div>
          </div>

          <div className="p-3 bg-card">
            <h3 className="font-semibold text-sm truncate">{name}</h3>
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground truncate">
                {category}
              </p>
              {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1 justify-end">
                  {tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-[#FF3860]/80 px-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </HoverCardTrigger>

      <HoverCardContent className="w-80 p-0 overflow-hidden">
        <div className="relative aspect-video">
          {previewVideo ? (
            <video
              src={previewVideo}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={imageError ? fallbackImage : image}
              alt={name}
              fill
              className="object-cover"
              onError={handleImageError}
              unoptimized
            />
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-bold">{name}</h4>
              <p className="text-sm text-muted-foreground">{category}</p>
            </div>
            {isLive && <Badge variant="live">LIVE</Badge>}
          </div>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-[#FF3860]/10 text-[#FF3860] px-2 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center space-x-1 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 6c-4.5 0-8 2.5-8 5.5 0 1.1.4 2.1 1 3 .2.2.2.6 0 1l-1 2h2a9.9 9.9 0 0 0 6-2c4.5 0 8-2.5 8-5.5S16.5 6 12 6Z"></path>
              </svg>
              <span>{viewers} viewers</span>
            </div>
            <Button variant="accent" size="sm" onClick={handleClick}>
              Watch Live
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
