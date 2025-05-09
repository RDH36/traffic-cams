"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { openChaturbateLink } from "@/lib/chaturbate"
import { Streamer } from "@/types"

interface FeaturedStreamerProps extends Omit<Streamer, "username"> {
  bio: string
}

export function FeaturedStreamer({
  name,
  image,
  bio,
  category,
  viewers,
  isLive,
  chaturbateLink,
  tags,
  location,
  age,
}: FeaturedStreamerProps) {
  const handleClick = () => {
    openChaturbateLink(chaturbateLink)
  }

  return (
    <div className="relative overflow-hidden rounded-xl h-[500px] md:h-[400px] w-full">
      <div className="absolute inset-0">
        <Image src={image} alt={name} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="relative h-full w-full max-w-6xl mx-auto flex flex-col justify-end p-6 md:p-8 z-10">
        <div className="max-w-xl space-y-4">
          <div className="flex items-center space-x-2">
            {isLive && <Badge variant="live">LIVE</Badge>}
            <span className="text-white/80 text-sm font-medium">
              {category}
            </span>
            <div className="flex items-center space-x-1 text-white/80 text-sm">
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
          </div>

          <h2 className="text-2xl md:text-4xl font-bold font-montserrat text-white">
            {name}
          </h2>

          <p className="text-white/80 text-sm md:text-base leading-relaxed">
            {bio}
          </p>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#FF3860]/20 text-[#FF3860] px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3 pt-2">
            <Button variant="accent" size="lg" onClick={handleClick}>
              Watch Live on Chaturbate
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              onClick={handleClick}
            >
              Join Free Chat
            </Button>
          </div>

          <div className="flex items-center gap-2 text-white/60 text-sm mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#FF3860]"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>Verified Chaturbate Performer</span>
          </div>
        </div>
      </div>
    </div>
  )
}
