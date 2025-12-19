import { GoogleGenAI, Type } from "@google/genai";

// Initialize the GoogleGenAI client using the API key from environment variables directly.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getCulturalInsight = async (topic: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a detailed and engaging cultural insight about Mangatarem, Pangasinan specifically regarding: ${topic}. Focus on local pride, history, and traditions.`,
      config: {
        systemInstruction: "You are a professional local historian and tourism guide for Mangatarem, Pangasinan. Use a welcoming and informative tone."
      }
    });
    // Use the .text property directly as per the latest SDK guidelines.
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I couldn't retrieve that cultural information right now. Please try again later.";
  }
};

export const suggestItinerary = async (preferences: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Suggest a 1-day travel itinerary for Mangatarem, Pangasinan based on these preferences: ${preferences}. Format with bullet points.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            schedule: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING },
                  activity: { type: Type.STRING },
                  location: { type: Type.STRING }
                },
                required: ["time", "activity", "location"]
              }
            },
            tips: { type: Type.STRING }
          },
          required: ["title", "schedule", "tips"]
        }
      }
    });
    // Extract the text content from the response property before parsing.
    const jsonStr = response.text;
    return jsonStr ? JSON.parse(jsonStr) : null;
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};