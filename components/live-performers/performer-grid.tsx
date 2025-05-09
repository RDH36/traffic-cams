"use client"

import { StreamerCard, StreamerCardProps } from "@/components/streamer-card"
import { Skeleton } from "@/components/ui/skeleton"

interface PerformerGridProps {
  performers: StreamerCardProps[]
  isLoading: boolean
}

export function PerformerGrid({ performers, isLoading }: PerformerGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="rounded-lg overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <div className="p-3 bg-card">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {performers.slice(0, 8).map((performer) => (
        <StreamerCard key={performer.id} {...performer} />
      ))}
    </div>
  )
}
