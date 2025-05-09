export interface Streamer {
  id: string
  name: string
  username: string
  image: string
  category: "female" | "male" | "couples" | "trans" | "stream"
  isLive: boolean
  viewers?: number
  chaturbateLink: string
  tags?: string[]
  description?: string
  languages?: string[]
  age?: number
  isVerified?: boolean
  location?: string
  country?: string
  previewImage?: string
  bio?: string
  hoursStreamed?: number
}

export interface Category {
  id: string
  name: string
  slug: "female" | "male" | "couples" | "trans"
  count: number
  image?: string
}

export interface Tag {
  id: string
  name: string
  count: number
}

export type ChaturbateAffiliateCampaign = {
  tour: string
  campaign: string
  track: string
}

// Chaturbate API Room type based on the API documentation
export interface ChaturbateRoom {
  username: string
  display_name?: string
  room_subject: string
  is_hd: boolean
  is_new: boolean
  tags: string[]
  seconds_online: number
  gender: "f" | "m" | "t" | "c" // f = female, m = male, t = trans, c = couple
  current_show: "public" | "private" | "group" | "away"
  chat_room_url: string
  chat_room_url_revshare: string
  image_url: string
  image_url_360x270: string
  iframe_embed: string
  iframe_embed_revshare: string
  num_users: number
  num_followers: number
  spoken_languages: string
  birthday?: string // YYYY-MM-DD if publicly visible, otherwise blank
  age?: number
  location?: string
  country?: string // alpha-2 ISO code
}
