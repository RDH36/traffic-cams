"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-[#121212]">
      <h1 className="text-4xl font-bold mb-6 text-white font-montserrat">
        Oops, an error occurred
      </h1>
      <p className="text-xl mb-8 text-white/70">
        Sorry for the inconvenience. We're working to fix this issue.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="accent" onClick={reset} className="min-w-[180px]">
          Try Again
        </Button>

        <Button
          variant="outline"
          asChild
          className="min-w-[180px] bg-white/10 text-white border-white/20 hover:bg-white/20"
        >
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  )
}
