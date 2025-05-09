"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { PerformerGrid } from "./performer-grid"
import { StreamerCardProps } from "@/components/streamer-card"
import { getChaturbateLinks, openChaturbateLink } from "@/lib/chaturbate-links"

interface PerformerTabsProps {
  performers: StreamerCardProps[]
  isLoading: boolean
  activeTab: string
  onTabChange: (value: string) => void
}

interface TabInfo {
  value: string
  label: string
  linkKey: keyof ReturnType<typeof getChaturbateLinks>
}

const tabLinks: TabInfo[] = [
  { value: "popular", label: "Most Watched", linkKey: "topRoom" },
  { value: "female", label: "Female", linkKey: "topRoomFemale" },
  { value: "male", label: "Male", linkKey: "topRoomMale" },
  { value: "couples", label: "Couples", linkKey: "topRoomCouple" },
  { value: "trans", label: "Trans", linkKey: "topRoomTrans" },
]

export function PerformerTabs({
  performers,
  isLoading,
  activeTab,
  onTabChange,
}: PerformerTabsProps) {
  const links = getChaturbateLinks()

  // Fonction pour ouvrir directement le lien d'affiliation lorsqu'on double-clique sur un onglet
  const handleDoubleClick = (
    linkKey: keyof ReturnType<typeof getChaturbateLinks>
  ) => {
    openChaturbateLink(links[linkKey])
  }

  return (
    <Tabs defaultValue="female" className="mb-12" onValueChange={onTabChange}>
      <TabsList className="bg-black/20 mb-8 flex flex-wrap">
        {tabLinks.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            onDoubleClick={() => handleDoubleClick(tab.linkKey)}
            title="Double-click to open on Chaturbate"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabLinks.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="animate-in fade-in-50"
        >
          <PerformerGrid
            performers={performers}
            isLoading={isLoading && activeTab === tab.value}
          />
        </TabsContent>
      ))}
    </Tabs>
  )
}
