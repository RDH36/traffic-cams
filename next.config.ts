import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    domains: [
      "thumb.live.mmcdn.com", // Chaturbate thumbnails
      "roomimg.stream.highwebmedia.com", // Chaturbate room images
      "media.streamlivemodels.com", // Possible other domains
      "media.streamatelive.com",
      "static-cdn77.streamate.com",
      "roomlister.stream",
    ],
  },
}

export default nextConfig
