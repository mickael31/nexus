
import { GoogleGenAI, Type } from "@google/genai";
import { SearchFilters, VideoResult } from "../types.ts";

export const searchVideos = async (filters: SearchFilters): Promise<VideoResult[]> => {
  const apiKey = process.env.API_KEY;
  
  if (!apiKey) {
    throw new Error("Clé API manquante. Veuillez vérifier votre configuration.");
  }
  
  const ai = new GoogleGenAI({ apiKey });
  
  const classPart = filters.wowClass !== 'Tous' ? `classe ${filters.wowClass}` : '';
  const expPart = filters.expansion !== 'Toutes' ? filters.expansion : 'Retail';
  const contentPart = filters.content !== 'Tous' ? filters.content : 'guide de jeu';
  
  const queryContext = `World of Warcraft ${expPart} ${classPart} ${contentPart} ${filters.query}`.trim();

  const prompt = `Tu es l'Archimage du Nexus, un expert de World of Warcraft.
    Trouve les 6 meilleurs guides vidéo YouTube récents pour : "${queryContext}".
    
    CRITÈRES :
    - Langue : Français exclusivement.
    - Type : Guides, tutoriels, explications stratégiques.
    - Qualité : Favorise les chaînes reconnues de la communauté francophone.

    RETOURNE UN JSON UNIQUEMENT sous cette forme :
    {
      "videos": [
        {
          "title": "Titre du guide",
          "description": "Bref résumé du contenu",
          "thumbnail": "URL de la miniature YouTube",
          "url": "URL directe vers la vidéo",
          "duration": "MM:SS",
          "platform": "YouTube",
          "views": "Nombre de vues approx",
          "date": "Date de publication"
        }
      ]
    }`;

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
                required: ["title", "url"]
              }
            }
          }
        }
      },
    });

    const text = response.text;
    if (!text) return [];

    try {
      const data = JSON.parse(text.replace(/```json|```/g, '').trim());
      return data.videos || [];
    } catch (parseError) {
      console.error("Erreur de parsing JSON:", parseError);
      return [];
    }
  } catch (error) {
    console.error("Erreur Gemini:", error);
    throw error;
  }
};
