import { Video, WowClass, Expansion, ContentType } from './types';

export const WOW_CLASSES = Object.values(WowClass).filter(c => c !== "");
export const WOW_EXPANSIONS = Object.values(Expansion).filter(e => e !== "");
export const CONTENT_TYPES = Object.values(ContentType).filter(t => t !== "");

// Mock data to display when API key is missing or fails (fallback)
export const MOCK_VIDEOS: Video[] = [
  {
    id: "mock1",
    title: "The War Within : guide complet du Guerrier Armes",
    description: "Tout ce qu'il faut savoir sur le Guerrier Armes : talents, rotation et équipement.",
    thumbnailUrl: "https://picsum.photos/seed/warrior/640/360",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    channelName: "WoW Guides FR",
    views: "125k vues",
    duration: "14:20",
    publishedDate: "Il y a 2 jours",
    tags: ["Guerrier", "PVE"]
  },
  {
    id: "mock2",
    title: "Comment monter ses métiers rapidement dans Dragonflight",
    description: "Optimisez votre temps et vos pièces d'or avec ce guide des métiers.",
    thumbnailUrl: "https://picsum.photos/seed/professions/640/360",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    channelName: "GoldGoblin",
    views: "45k vues",
    duration: "08:45",
    publishedDate: "Il y a 1 semaine",
    tags: ["Métiers", "Gold"]
  },
  {
    id: "mock3",
    title: "Mage Givre PvP : dominez l'arène",
    description: "Les meilleures compositions et stratégies pour monter en cote en 3v3.",
    thumbnailUrl: "https://picsum.photos/seed/mage/640/360",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    channelName: "ArenaMaster",
    views: "89k vues",
    duration: "21:10",
    publishedDate: "Il y a 3 semaines",
    tags: ["Mage", "PVP"]
  },
  {
    id: "mock4",
    title: "Le lore expliqué : qui est Xal'atath ?",
    description: "Plongez dans l'histoire sombre de l'Empire noir et de l'arme prodigieuse.",
    thumbnailUrl: "https://picsum.photos/seed/lore/640/360",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    channelName: "NobbelLike",
    views: "210k vues",
    duration: "45:00",
    publishedDate: "Il y a 1 mois",
    tags: ["Lore"]
  }
];
