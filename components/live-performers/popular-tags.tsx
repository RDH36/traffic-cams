"use client"

interface PopularTagsProps {
  tags: string[]
}

export function PopularTags({ tags }: PopularTagsProps) {
  if (!tags || tags.length === 0) return null

  return (
    <div className="bg-black/30 p-6 rounded-xl mb-12">
      <h3 className="text-xl font-semibold mb-4 font-montserrat">
        Popular Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-[#FF3860]/20 text-[#FF3860] px-3 py-1 rounded-full text-sm hover:bg-[#FF3860]/30 cursor-pointer transition"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
