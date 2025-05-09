import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { LivePerformers } from "@/components/live-performers/live-performers"
import { FeaturedStreamer } from "@/components/featured-streamer"
import { BenefitsSection } from "@/components/benefits-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { generatePerformerLink } from "@/lib/chaturbate-links"
import { Streamer } from "@/types"

export default function Home() {
  const featuredStreamer: Omit<Streamer, "username"> & {
    bio: string
    username: string
  } = {
    id: "featured1",
    username: "sophielust",
    name: "SophieLust",
    image: "/images/streamers/featured.jpg",
    bio: "Passionate about intimate connections, I share my sensual adventures live with you. Join me for exclusive adult content and unforgettable moments.",
    category: "female",
    viewers: 3567,
    isLive: true,
    chaturbateLink: generatePerformerLink("sophielust"),
    tags: ["blonde", "busty", "toys", "interactive"],
    isVerified: true,
    location: "United States",
    age: 24,
  }

  return (
    <main className="bg-[#121212] text-white">
      <Navbar />

      <HeroSection />

      <LivePerformers />

      <section className="py-16 px-4 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 font-montserrat">
            Featured <span className="text-[#FF3860]">Performer</span>
          </h2>

          <FeaturedStreamer {...featuredStreamer} />
        </div>
      </section>

      <BenefitsSection />

      <CTASection />

      <Footer />
    </main>
  )
}
