export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  channelName: string;
  views: string;
  duration: string;
  publishedDate: string;
  tags?: string[];
}

export interface FilterState {
  query: string;
  class: string;
  expansion: string;
  contentType: string;
  sortBy: 'relevance' | 'date' | 'views';
}

export enum WowClass {
  None = "",
  Warrior = "Guerrier",
  Paladin = "Paladin",
  Hunter = "Chasseur",
  Rogue = "Voleur",
  Priest = "Prêtre",
  DeathKnight = "Chevalier de la mort",
  Shaman = "Chaman",
  Mage = "Mage",
  Warlock = "Démoniste",
  Monk = "Moine",
  Druid = "Druide",
  DemonHunter = "Chasseur de démons",
  Evoker = "Évocateur"
}

export enum Expansion {
  None = "",
  TheWarWithin = "The War Within",
  Dragonflight = "Dragonflight",
  Shadowlands = "Shadowlands",
  BFA = "Battle for Azeroth",
  Legion = "Legion",
  WotLK = "Wrath of the Lich King (Classic)",
  Hardcore = "Classic Hardcore",
  Classic = "Classic Era"
}

export enum ContentType {
  None = "",
  PVE = "PVE / Raid / M+",
  PVP = "PVP / Arène",
  Leveling = "Leveling / Speedrun",
  Gold = "Gold Farming",
  Lore = "Histoire / Lore",
  Addons = "Addons & UI"
}