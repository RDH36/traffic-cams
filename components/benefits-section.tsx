"use client"

import { Button } from "@/components/ui/button"
import {
  generateChaturbateSignupLink,
  openChaturbateLink,
} from "@/lib/chaturbate"

export function BenefitsSection() {
  const handleSignupClick = () => {
    const signupLink = generateChaturbateSignupLink()
    openChaturbateLink(signupLink)
  }

  return (
    <section className="py-16 md:py-24 px-4 bg-[#121212]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-16 font-montserrat">
          Why Choose <span className="text-[#FF3860]">Live</span>Pulse
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center space-y-4 p-6">
            <div className="w-16 h-16 rounded-full bg-[#FF3860]/10 flex items-center justify-center mb-4">
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
                className="text-[#FF3860]"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m8 11 3 3 5-5" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold font-montserrat">
              Ad-Free Navigation
            </h3>
            <p className="text-white/70">
              Enjoy Chaturbate streams without the annoying popups and ads found
              on the original site.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 p-6">
            <div className="w-16 h-16 rounded-full bg-[#FF3860]/10 flex items-center justify-center mb-4">
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
                className="text-[#FF3860]"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold font-montserrat">
              Optimized Organization
            </h3>
            <p className="text-white/70">
              Discover Chaturbate performers in a clean interface organized by
              categories and popular tags.
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-4 p-6">
            <div className="w-16 h-16 rounded-full bg-[#FF3860]/10 flex items-center justify-center mb-4">
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
                className="text-[#FF3860]"
              >
                <path d="M21 15V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9" />
                <path d="M21 15H3" />
                <path d="M6 18h12" />
                <path d="M3 21h18" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold font-montserrat">
              Instant Access
            </h3>
            <p className="text-white/70">
              One click is all it takes to directly access your favorite
              performer's stream on Chaturbate, without intermediaries.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button variant="accent" size="lg" onClick={handleSignupClick}>
            Join Chaturbate Free
          </Button>
        </div>
      </div>
    </section>
  )
}
