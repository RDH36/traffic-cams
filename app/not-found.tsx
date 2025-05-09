import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-[#121212]">
      <h1 className="text-6xl font-bold mb-4 text-white font-montserrat">
        404
      </h1>
      <h2 className="text-3xl font-semibold mb-6 text-white">Page Not Found</h2>
      <p className="text-lg mb-4">
        La page que vous recherchez n&apos;existe pas ou a été déplacée.
      </p>

      <Button variant="accent" asChild className="min-w-[200px]">
        <Link href="/">Return Home</Link>
      </Button>

      <div className="mt-16 text-white/50">
        <p>You might be looking for:</p>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <Link href="/discover" className="text-[#FF3860] underline">
            Discover
          </Link>
          <Link href="/categories" className="text-[#FF3860] underline">
            Categories
          </Link>
          <Link href="/performers" className="text-[#FF3860] underline">
            Performers
          </Link>
        </div>
      </div>
    </div>
  )
}
