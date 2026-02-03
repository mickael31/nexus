import { GoogleGenAI } from "@google/genai";
import { FilterState, Video } from '../types';

const getThumbnailFromUrl = (url: string): string => {
  if (!url) return "https://picsum.photos/640/360?blur=2";
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  const id = (match && match[7].length === 11) ? match[7] : null;
  if (id) {
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
  }
  return "https://picsum.photos/640/360?blur=2"; // Fallback
};

export const searchVideos = async (filters: FilterState): Promise<Video[]> => {
  const apiKey = process.env.API_KEY;

  // Use mock data if no key is present (safe fallback for demo)
  if (!apiKey) {
    console.warn("No API_KEY found. Returning mock data.");
    const { MOCK_VIDEOS } = await import('../constants'); 
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_VIDEOS;
  }

  const ai = new GoogleGenAI({ apiKey });

  // Construct a natural language query based on filters
  let queryParts = [];
  if (filters.expansion) queryParts.push(`World of Warcraft ${filters.expansion}`);
  else queryParts.push("World of Warcraft");
  
  if (filters.class) queryParts.push(`${filters.class} guide`);
  if (filters.contentType) queryParts.push(filters.contentType);
  if (filters.query) queryParts.push(filters.query);
  
  const finalQuery = queryParts.join(" ");
  const sortByInstruction = filters.sortBy === 'date' ? "recent" : filters.sortBy === 'views' ? "most viewed" : "best matching";

  const systemInstruction = `
    You are an expert World of Warcraft assistant. Your goal is to find the best YouTube tutorials.
    
    1. Search for YouTube videos matching: "${finalQuery}".
    2. Focus on "${sortByInstruction}" videos.
    3. Return a list of 8-12 videos.
    4. For each video, provide: title, description, videoUrl, channelName, views (estimate), duration (estimate), publishedDate.
    5. Output the result strictly as a JSON array inside a markdown code block (e.g. \`\`\`json ... \`\`\`).
    6. Ensure 'videoUrl' is a valid YouTube link.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-latest",
      contents: `Find high quality World of Warcraft tutorial videos for: "${finalQuery}".`,
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }],
        // responseMimeType and responseSchema are removed to avoid conflict with Search Grounding
      }
    });

    let jsonText = response.text || "";
    
    // Extract JSON from markdown code block if present
    const jsonMatch = jsonText.match(/```json\n?([\s\S]*?)\n?```/) || jsonText.match(/```\n?([\s\S]*?)\n?```/);
    if (jsonMatch) {
      jsonText = jsonMatch[1];
    }

    // Clean up
    jsonText = jsonText.trim();

    let rawVideos;
    try {
      rawVideos = JSON.parse(jsonText);
    } catch (parseError) {
      console.error("JSON Parse Error on text:", jsonText);
      // Fallback: try to find array in text
      const arrayMatch = jsonText.match(/\[[\s\S]*\]/);
      if (arrayMatch) {
         try {
            rawVideos = JSON.parse(arrayMatch[0]);
         } catch(e) {
            throw new Error("Could not parse video data from response");
         }
      } else {
         throw new Error("Invalid JSON format from model");
      }
    }
    
    if (!Array.isArray(rawVideos)) {
      throw new Error("Response is not an array");
    }

    // Transform into our internal Video type, adding generated IDs and Thumbnails
    const processedVideos: Video[] = rawVideos.map((v: any, index: number) => ({
      id: `gen_${index}_${Date.now()}`,
      title: v.title || "Titre indisponible",
      description: v.description || "Pas de description disponible.",
      videoUrl: v.videoUrl || "",
      thumbnailUrl: getThumbnailFromUrl(v.videoUrl),
      channelName: v.channelName || "Chaîne inconnue",
      views: v.views || "N/A",
      duration: v.duration || "N/A",
      publishedDate: v.publishedDate || "Récent",
      tags: [filters.class, filters.expansion].filter(Boolean) as string[]
    }));

    return processedVideos;

  } catch (error) {
    console.error("Gemini Search Error:", error);
    // Fallback to mock data on error for UX continuity
    const { MOCK_VIDEOS } = await import('../constants');
    return MOCK_VIDEOS;
  }
};