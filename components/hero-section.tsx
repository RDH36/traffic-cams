"use client"

import { Button } from "@/components/ui/button"
import {
  generateChaturbateSignupLink,
  openChaturbateLink,
} from "@/lib/chaturbate"

export function HeroSection() {
  const handleEnterClick = () => {
    const signupLink = generateChaturbateSignupLink()
    openChaturbateLink(signupLink)
  }

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover blur-sm filter scale-110"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-[#121212]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl w-full px-4 py-20 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-montserrat text-white">
          Discover Chaturbate <span className="text-[#FF3860]">Performers</span>{" "}
          <br />
          Without <span className="text-[#FF3860]">Distractions</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl">
          Access the best Chaturbate performers without ads or popups. Enjoy the
          experience like never before.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
          <Button
            variant="accent"
            size="lg"
            className="min-w-[180px]"
            onClick={handleEnterClick}
          >
            Join Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="min-w-[180px] bg-white/10 text-white border-white/20 hover:bg-white/20"
          >
            Browse Categories
          </Button>
        </div>

        <div className="mt-16 md:mt-24 pt-8 grid grid-cols-3 gap-8 md:gap-16 lg:gap-24">
          <div className="flex flex-col items-center">
            <div className="text-2xl md:text-3xl font-bold text-white">
              1000+
            </div>
            <div className="text-sm text-white/60">Chaturbate Performers</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl md:text-3xl font-bold text-white">
              24/7
            </div>
            <div className="text-sm text-white/60">Live Shows</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-2xl md:text-3xl font-bold text-white">
              100%
            </div>
            <div className="text-sm text-white/60">Ad-Free</div>
          </div>
        </div>
      </div>

      {/* Scroll down icon */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/50"
        >
          <path d="M7 13l5 5 5-5" />
          <path d="M7 7l5 5 5-5" />
        </svg>
      </div>
    </section>
  )
}
