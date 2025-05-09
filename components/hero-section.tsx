"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { getChaturbateLinks, openChaturbateLink } from "@/lib/chaturbate-links"
import { FORCE_SIGNUP } from "@/lib/chaturbate"

interface CategoryItem {
  name: string
  icon: React.ReactNode
  linkKey: keyof ReturnType<typeof getChaturbateLinks>
  color: string
}

export function HeroSection() {
  const links = getChaturbateLinks(FORCE_SIGNUP)

  const categoryItems: CategoryItem[] = [
    {
      name: "Female",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="6" />
          <path d="M14 16.5a4 4 0 0 0-4 0" />
          <line x1="12" y1="14" x2="12" y2="19" />
        </svg>
      ),
      linkKey: "homeFemale",
      color: "bg-pink-500/10 text-pink-500 hover:bg-pink-500/20",
    },
    {
      name: "Male",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="5" r="4" />
          <path d="M15.5 12H13a1 1 0 0 0-1 1v6" />
          <path d="M8 12h2a1 1 0 0 1 1 1v6" />
          <path d="M12 19h2" />
        </svg>
      ),
      linkKey: "homeMale",
      color: "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
    },
    {
      name: "Couples",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
          <circle cx="9" cy="7" r="3" />
          <circle cx="15" cy="7" r="3" />
        </svg>
      ),
      linkKey: "homeCouple",
      color: "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20",
    },
    {
      name: "Trans",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="9" r="5" />
          <line x1="12" y1="14" x2="12" y2="20" />
          <line x1="9" y1="17" x2="15" y2="17" />
        </svg>
      ),
      linkKey: "homeTrans",
      color: "bg-teal-500/10 text-teal-500 hover:bg-teal-500/20",
    },
    {
      name: "HD",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 3v4a1 1 0 0 0 1 1h4" />
          <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="9 15 12 15 12 8" />
          <polyline points="15 15 15 8" />
        </svg>
      ),
      linkKey: "homeAll",
      color: "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20",
    },
    {
      name: "Trending",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.1 1.1L3.2 12l5.8 1.9a2 2 0 0 1 1.1 1.1L12 21l1.9-5.8a2 2 0 0 1 1.1-1.1L21 12l-5.8-1.9a2 2 0 0 1-1.1-1.1Z" />
        </svg>
      ),
      linkKey: "topRoom",
      color: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
    },
  ]

  const handleCategoryClick = (
    linkKey: keyof ReturnType<typeof getChaturbateLinks>
  ) => {
    openChaturbateLink(links[linkKey])
  }

  return (
    <section className="relative bg-[#0a0a0a] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF3860]/20 to-black/0 mix-blend-overlay"></div>
      <div className="absolute inset-0 bg-[url('/images/hero-pattern.png')] opacity-10"></div>

      <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 font-montserrat">
          Discover the <span className="text-[#FF3860]">best live streams</span>
          <br className="hidden md:inline" /> right now
        </h1>

        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl">
          Find your favorite performers, explore different categories and enjoy
          an optimized viewing experience
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-10 w-full max-w-3xl">
          {categoryItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleCategoryClick(item.linkKey)}
              className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all ${item.color}`}
            >
              <div className="mb-2">{item.icon}</div>
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            size="lg"
            variant="accent"
            onClick={() => handleCategoryClick("topRoom")}
            className="text-base"
          >
            View Popular Streams
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => handleCategoryClick("broadcasterSignup")}
            className="text-base border-[#FF3860] text-[#FF3860] hover:bg-[#FF3860]/10"
          >
            Become a Performer
          </Button>
        </div>
      </div>
    </section>
  )
}
