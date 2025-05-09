"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  generateChaturbateSignupLink,
  openChaturbateLink,
} from "@/lib/chaturbate"

export function Navbar() {
  const handleSignupClick = () => {
    const signupLink = generateChaturbateSignupLink({
      tour: "3Mc9",
      campaign: "2AJgW",
      track: "default",
    })
    openChaturbateLink(signupLink)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="text-xl font-bold font-montserrat text-white">
          Live<span className="text-[#FF3860]">Pulse</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-4">
          <Link href="/" className="text-white/70 hover:text-white transition">
            Home
          </Link>
          <Link
            href="#categories"
            className="text-white/70 hover:text-white transition"
          >
            Categories
          </Link>
          <Link
            href="#performers"
            className="text-white/70 hover:text-white transition"
          >
            Performers
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Button variant="ghost" className="text-white hover:text-white/70">
            FAQ
          </Button>
          <Button variant="accent" onClick={handleSignupClick}>
            Join
          </Button>
        </div>
      </div>
    </header>
  )
}
