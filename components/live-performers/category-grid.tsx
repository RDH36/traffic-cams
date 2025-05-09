"use client"

import { getChaturbateLinks, openChaturbateLink } from "@/lib/chaturbate-links"

interface CategoryItem {
  name: string
  linkKey: keyof ReturnType<typeof getChaturbateLinks>
}

// Catégories disponibles avec leurs clés de lien
const categories: CategoryItem[] = [
  { name: "Female", linkKey: "homeFemale" },
  { name: "Male", linkKey: "homeMale" },
  { name: "Couples", linkKey: "homeCouple" },
  { name: "Trans", linkKey: "homeTrans" },
  { name: "HD", linkKey: "homeAll" },
  { name: "Asian", linkKey: "regionAsian" },
  { name: "Euro/Russian", linkKey: "regionEuroRussian" },
  { name: "North America", linkKey: "regionNorthAmerican" },
  { name: "South America", linkKey: "regionSouthAmerican" },
  { name: "Featured", linkKey: "topRoom" },
]

export function CategoryGrid() {
  const links = getChaturbateLinks()

  const handleCategoryClick = (
    linkKey: keyof ReturnType<typeof getChaturbateLinks>
  ) => {
    openChaturbateLink(links[linkKey])
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-12">
      {categories.map((category) => (
        <div
          key={category.name}
          onClick={() => handleCategoryClick(category.linkKey)}
          className="bg-black/30 hover:bg-black/50 rounded-lg p-4 text-center cursor-pointer transition"
        >
          <span className="text-white/90 font-medium">{category.name}</span>
        </div>
      ))}
    </div>
  )
}
