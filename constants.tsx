
import { ClassType, ExpansionType, ContentType } from './types.ts';

export const CLASSES: ClassType[] = [
  'Tous', 'Guerrier', 'Paladin', 'Chasseur', 'Voleur', 'Prêtre', 
  'Chevalier de la mort', 'Chaman', 'Mage', 'Démoniste', 'Moine', 
  'Druide', 'Chasseur de démons', 'Évocateur'
];

export const EXPANSIONS: ExpansionType[] = [
  'Toutes', 'The War Within', 'Dragonflight', 'Shadowlands', 'Classic', 'WotLK', 'Hardcore'
];

export const CONTENTS: ContentType[] = [
  'Tous', 'PVE', 'PVP', 'Leveling', 'Farming PO', 'Métiers', 'Addons'
];

export const SORT_OPTIONS = [
  { value: 'relevance', label: 'Pertinence' },
  { value: 'date', label: 'Récents' },
  { value: 'views', label: 'Plus vus' },
  { value: 'popularity', label: 'Popularité' },
];
