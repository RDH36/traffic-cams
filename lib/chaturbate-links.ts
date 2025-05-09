import { ChaturbateAffiliateCampaign } from "@/types"

// Configuration par défaut pour l'affiliation
export const DEFAULT_AFFILIATE: ChaturbateAffiliateCampaign = {
  tour: "g4pe", // Home page
  campaign: "2AJgW",
  track: "default",
}

// Types de liens spécifiques disponibles
export interface ChaturbateLinks {
  // Home Pages
  homeAll: string
  homeFemale: string
  homeMale: string
  homeCouple: string
  homeTrans: string
  homeNoPopup: string
  homeFemaleNoPopup: string
  homeMaleNoPopup: string
  homeCoupleNoPopup: string
  homeTransNoPopup: string

  // Top Rooms
  topRoom: string
  topRoomFemale: string
  topRoomMale: string
  topRoomCouple: string
  topRoomTrans: string
  topRoomNoPopup: string
  topRoomFemaleNoPopup: string
  topRoomMaleNoPopup: string
  topRoomCoupleNoPopup: string
  topRoomTransNoPopup: string

  // Random Rooms
  randomRoomFemale: string
  randomRoomMale: string
  randomRoomCouple: string
  randomRoomTrans: string

  // Region Filters
  regionAsian: string
  regionEuroRussian: string
  regionNorthAmerican: string
  regionSouthAmerican: string
  regionOther: string

  // Full Video Mode
  fullVideoMode: string
  fullVideoModeFemale: string
  fullVideoModeMale: string
  fullVideoModeCouple: string
  fullVideoModeTrans: string

  // Autres liens
  broadcasterSignup: string
  contestDetails: string
  affiliateProgram: string
}

/**
 * Génère tous les liens d'affiliation Chaturbate
 * @param campaign Configuration de la campagne d'affiliation
 * @returns Objet contenant tous les liens d'affiliation formatés
 */
export function getChaturbateLinks(
  campaign: ChaturbateAffiliateCampaign = DEFAULT_AFFILIATE
): ChaturbateLinks {
  const baseUrl = "https://chaturbate.com/in/"
  const campaignParam = `tour={tour}&campaign=${campaign.campaign}&track=${campaign.track}`

  // Fonction helper pour construire un lien
  const buildLink = (tour: string, additionalParams: string = ""): string => {
    const params = campaignParam.replace("{tour}", tour)
    return `${baseUrl}?${params}${
      additionalParams ? "&" + additionalParams : ""
    }`
  }

  return {
    // Home Pages
    homeAll: buildLink("g4pe"),
    homeFemale: buildLink("wFE6"),
    homeMale: buildLink("EyB0"),
    homeCouple: buildLink("ZLaY"),
    homeTrans: buildLink("xC0v"),
    homeNoPopup: buildLink("IGtJ"),
    homeFemaleNoPopup: buildLink("0fQq"),
    homeMaleNoPopup: buildLink("SVAj"),
    homeCoupleNoPopup: buildLink("3u46"),
    homeTransNoPopup: buildLink("Vgtp"),

    // Top Rooms
    topRoom: buildLink("ZmU7"),
    topRoomFemale: buildLink("OgA6"),
    topRoomMale: buildLink("OCGj"),
    topRoomCouple: buildLink("ypQj"),
    topRoomTrans: buildLink("pn6o"),
    topRoomNoPopup: buildLink("tdBw"),
    topRoomFemaleNoPopup: buildLink("YSRU"),
    topRoomMaleNoPopup: buildLink("uxJr"),
    topRoomCoupleNoPopup: buildLink("bCMX"),
    topRoomTransNoPopup: buildLink("9bn1"),

    // Random Rooms
    randomRoomFemale: buildLink("bfpW"),
    randomRoomMale: buildLink("RDvD"),
    randomRoomCouple: buildLink("gT8O"),
    randomRoomTrans: buildLink("z7da"),

    // Region Filters
    regionAsian: buildLink("AZcp"),
    regionEuroRussian: buildLink("ERcp"),
    regionNorthAmerican: buildLink("NAcp"),
    regionSouthAmerican: buildLink("SAcp"),
    regionOther: buildLink("ORcp"),

    // Full Video Mode
    fullVideoMode: buildLink("dM8p", "signup_notice=1"),
    fullVideoModeFemale: buildLink("eQof", "signup_notice=1"),
    fullVideoModeMale: buildLink("jC8b", "signup_notice=1"),
    fullVideoModeCouple: buildLink("7Xqm", "signup_notice=1"),
    fullVideoModeTrans: buildLink("NPcg", "signup_notice=1"),

    // Autres liens
    broadcasterSignup: buildLink("5zjT"),
    contestDetails: buildLink("PFml"),
    affiliateProgram: buildLink("9O7D"),
  }
}

/**
 * Ouvre un lien d'affiliation Chaturbate dans un nouvel onglet
 * @param url URL complète à ouvrir
 */
export function openChaturbateLink(url: string): void {
  window.open(url, "_blank", "noopener,noreferrer")
}

/**
 * Génère un lien d'affiliation Chaturbate pour un performer spécifique
 * @param username Nom d'utilisateur du performer
 * @param campaign Configuration de la campagne (optionnel)
 * @returns URL complète pour le performer avec l'affiliation
 */
export function generatePerformerLink(
  username: string,
  campaign: ChaturbateAffiliateCampaign = DEFAULT_AFFILIATE
): string {
  // Nettoyer le nom d'utilisateur (enlever les espaces, caractères spéciaux, etc.)
  const cleanUsername = username.trim().toLowerCase()

  // Construire l'URL d'affiliation
  return `https://chaturbate.com/${cleanUsername}/?tour=${campaign.tour}&campaign=${campaign.campaign}&track=${campaign.track}`
}
