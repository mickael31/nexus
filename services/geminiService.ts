
import { GoogleGenAI, Type } from "@google/genai";
import { SearchFilters, VideoResult } from "../types";

export const searchVideos = async (filters: SearchFilters): Promise<VideoResult[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Agis en tant qu'expert World of Warcraft (WoW). Recherche des tutoriels vidéo RÉCENTS et UNIQUEMENT EN FRANÇAIS.
    
    Critères de recherche :
    - Mot-clé : ${filters.query || 'tutoriel WoW'}
    - Classe : ${filters.wowClass}
    - Extension : ${filters.expansion}
    - Type : ${filters.content}
    
    Utilise Google Search pour trouver les vidéos les plus populaires sur YouTube et Twitch.
    Retourne impérativement un objet JSON avec une clé "videos" contenant :
    title, description, thumbnail, url, duration, platform, views, date.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            videos: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  thumbnail: { type: Type.STRING },
                  url: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  platform: { type: Type.STRING },
                  views: { type: Type.STRING },
                  date: { type: Type.STRING },
                },
                required: ["title", "url", "platform"],
              },
            },
          },
        },
      },
    });

    const text = response.text;
    if (!text) return [];

    // Nettoyage de la réponse pour extraire le JSON pur
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const cleanJson = jsonMatch ? jsonMatch[0] : text;
    const data = JSON.parse(cleanJson);
    
    return data.videos || [];
  } catch (error) {
    console.error("Erreur API Gemini:", error);
    return [];
  }
};
