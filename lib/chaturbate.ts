import { ChaturbateAffiliateCampaign, ChaturbateRoom, Streamer } from "@/types"
import { generatePerformerLink } from "./chaturbate-links"

// Configuration par défaut pour l'affiliation Chaturbate
export const DEFAULT_AFFILIATE: ChaturbateAffiliateCampaign = {
  tour: "x1Rwd",
  campaign: "2AJgW",
  track: "default",
}

export const FORCE_SIGNUP = true // Activer globalement la fonctionnalité de force signup

// Chaturbate API configuration
const API_BASE_URL = "https://chaturbate.com/api/public/affiliates/onlinerooms/"
const DEFAULT_LIMIT = 100

/**
 * Génère un lien d'affiliation Chaturbate
 * @param username Nom d'utilisateur du performer Chaturbate
 * @param campaign Configuration de campagne (optionnel)
 * @returns URL complète pour le performer avec l'affiliation
 */
export function generateChaturbateLink(
  username: string,
  campaign: ChaturbateAffiliateCampaign = DEFAULT_AFFILIATE
): string {
  // Nettoyer le nom d'utilisateur (enlever les espaces, caractères spéciaux, etc.)
  const cleanUsername = username.trim().toLowerCase()

  // Construire l'URL d'affiliation
  return `https://chaturbate.com/${cleanUsername}/?tour=${campaign.tour}&campaign=${campaign.campaign}&track=${campaign.track}`
}

/**
 * Génère un lien pour la page d'enregistrement Chaturbate
 * @param campaign Configuration de campagne (optionnel)
 * @returns URL complète pour l'enregistrement avec l'affiliation
 */
export function generateChaturbateSignupLink(
  campaign: ChaturbateAffiliateCampaign = DEFAULT_AFFILIATE
): string {
  return `https://chaturbate.com/in/?tour=${campaign.tour}&campaign=${campaign.campaign}&track=${campaign.track}`
}

/**
 * Ouvre un lien Chaturbate dans un nouvel onglet
 * @param url URL à ouvrir
 */
export function openChaturbateLink(url: string): void {
  window.open(url, "_blank")
}

/**
 * Fetches online rooms from Chaturbate API
 * @param options API request options
 * @returns Promise with API response data
 */
export async function fetchChaturbateRooms({
  limit = DEFAULT_LIMIT,
  offset = 0,
  gender,
  tag,
  hd,
}: {
  limit?: number
  offset?: number
  gender?: "f" | "m" | "t" | "c" | Array<"f" | "m" | "t" | "c">
  tag?: string | string[]
  hd?: boolean
} = {}): Promise<{ count: number; results: ChaturbateRoom[] }> {
  // Build the API URL with parameters
  const params = new URLSearchParams({
    wm: DEFAULT_AFFILIATE.campaign,
    client_ip: "request_ip", // Use the client's IP address
    format: "json",
    limit: limit.toString(),
    offset: offset.toString(),
  })

  // Add gender filter(s) if specified
  if (gender) {
    if (Array.isArray(gender)) {
      gender.forEach((g) => params.append("gender", g))
    } else {
      params.append("gender", gender)
    }
  }

  // Add tag filter(s) if specified (up to 5)
  if (tag) {
    if (Array.isArray(tag)) {
      tag.slice(0, 5).forEach((t) => params.append("tag", t))
    } else {
      params.append("tag", tag)
    }
  }

  // Add HD filter if specified
  if (hd !== undefined) {
    params.append("hd", hd ? "true" : "false")
  }

  try {
    const response = await fetch(`${API_BASE_URL}?${params.toString()}`)

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching Chaturbate rooms:", error)
    // Return empty data in case of error
    return { count: 0, results: [] }
  }
}

/**
 * Maps a Chaturbate API room to our Streamer model
 * @param room The Chaturbate room data from API
 * @returns Formatted streamer data for our application
 */
export function mapChaturbateRoomToStreamer(
  room: ChaturbateRoom
): Omit<Streamer, "category"> {
  // Extract tags from the room subject
  const extractTags = (subject: string): string[] => {
    // Common keywords to extract as tags
    const commonTags = [
      "dance",
      "new",
      "shy",
      "play",
      "toys",
      "young",
      "latina",
      "asian",
      "ebony",
      "white",
      "blonde",
      "brunette",
      "redhead",
      "curvy",
      "petite",
      "busty",
      "bbw",
      "skinny",
      "fit",
      "anal",
      "squirt",
      "cum",
      "dildo",
      "vibrator",
      "lovense",
      "feet",
      "bdsm",
      "fetish",
      "smoking",
      "lingerie",
    ]

    // Extract keywords that appear in the subject
    const extractedTags = commonTags.filter((tag) =>
      subject.toLowerCase().includes(tag.toLowerCase())
    )

    // If we have less than 2 tags, add some generic ones
    if (extractedTags.length < 2) {
      if (room.is_hd) extractedTags.push("hd")
      if (room.is_new) extractedTags.push("new")
      if (extractedTags.length < 2) extractedTags.push("live")
    }

    return extractedTags.slice(0, 5) // Limit to 5 tags
  }

  // Create a unique ID
  const id = `cb_${room.username}`

  // Extract location from room subject if possible
  const locationRegex = /\b(from|in)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)\b/i
  const locationMatch = room.room_subject.match(locationRegex)
  const location = locationMatch ? locationMatch[2] : "Unknown"

  // Convert seconds online to hours
  const hoursOnline = Math.floor(room.seconds_online / 3600)

  return {
    id,
    name: room.display_name || room.username,
    username: room.username,
    image: room.image_url,
    previewImage: room.image_url_360x270,
    viewers: room.num_users,
    isLive: true,
    chaturbateLink: generatePerformerLink(room.username, FORCE_SIGNUP),
    tags: room.tags || extractTags(room.room_subject),
    country: location,
    // Additional properties
    isVerified: true,
    hoursStreamed: hoursOnline,
    bio: room.room_subject,
  }
}
