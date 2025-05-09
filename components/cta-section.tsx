"use client"

import { Button } from "@/components/ui/button"
import {
  generateChaturbateSignupLink,
  openChaturbateLink,
} from "@/lib/chaturbate"

export function CTASection() {
  const handleChaturbateClick = () => {
    const signupLink = generateChaturbateSignupLink({
      tour: "3Mc9",
      campaign: "2AJgW",
      track: "default",
    })
    openChaturbateLink(signupLink)
  }

  return (
    <section className="py-20 px-4 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-6 font-montserrat bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
          Discover 1000+ Chaturbate performers in one place
        </h2>

        <p className="text-white/70 mb-8 max-w-2xl mx-auto">
          Get direct access to the best Chaturbate performers without ads or
          popups. Join millions of users enjoying premium adult content right
          now.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            variant="accent"
            size="lg"
            className="px-8"
            onClick={handleChaturbateClick}
          >
            Join Chaturbate Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="px-8 bg-white/10 text-white border-white/20 hover:bg-white/20"
          >
            Explore Categories
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4 text-white/60 text-sm">
          <div className="flex items-center gap-1">
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
              className="text-[#FF3860]"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>Free Registration</span>
          </div>
          <div className="flex items-center gap-1">
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
              className="text-[#FF3860]"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>100% Secure</span>
          </div>
          <div className="flex items-center gap-1">
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
              className="text-[#FF3860]"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>24/7 Live Shows</span>
          </div>
        </div>
      </div>
    </section>
  )
}
