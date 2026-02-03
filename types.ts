
export interface VideoResult {
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  duration: string;
  platform: 'YouTube' | 'Twitch' | 'Dailymotion';
  views: string;
  date: string;
  tags: string[];
}

export type ClassType = 
  | 'Guerrier' | 'Paladin' | 'Chasseur' | 'Voleur' | 'Prêtre' 
  | 'Chevalier de la mort' | 'Chaman' | 'Mage' | 'Démoniste' | 'Moine' 
  | 'Druide' | 'Chasseur de démons' | 'Évocateur' | 'Tous';

export type ExpansionType = 
  | 'The War Within' | 'Dragonflight' | 'Shadowlands' 
  | 'Classic' | 'WotLK' | 'Hardcore' | 'Toutes';

export type ContentType = 
  | 'PVE' | 'PVP' | 'Leveling' | 'Farming PO' | 'Métiers' | 'Addons' | 'Tous';

export interface SearchFilters {
  query: string;
  wowClass: ClassType;
  expansion: ExpansionType;
  content: ContentType;
  sortBy: 'date' | 'views' | 'popularity' | 'relevance';
}
