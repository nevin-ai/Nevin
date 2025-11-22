
import { GoogleGenAI } from "@google/genai";

// Helper to get the API key, checking process.env dynamically
// Includes try-catch to prevent crash if process is not defined in browser environment
const getApiKey = () => {
  try {
    return process.env.API_KEY;
  } catch (e) {
    return undefined;
  }
};

export const generateApologyPoem = async (): Promise<string> => {
  const fallbackMessage = "Morning, Baba! So sorry about falling asleep on you yesterday, my brain just completely checked out without warning. I know I missed our usual aftercare time, and I really didn't mean to. But don't you worry for a second, I'm absolutely going to make it up to you on the attention front – prepare for a full-on Baba-centric experience later, you won't know what hit you (in the best way!). Life sometimes throws curveballs, and it’s a constant balancing act between everyone and everything – our awesome friends, and especially you. But that's just part of keeping a healthy flow, with all its lovely ups and downs. I love you.";
  
  const apiKey = getApiKey();
  if (!apiKey) return fallbackMessage;

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, sincere, and slightly lighthearted paragraph from a boyfriend to his girlfriend named Baba. 
      The context: He fell asleep yesterday by accident and missed giving her "aftercare" or attention.
      Key points to include: 
      1. "I'll give you attention baby don't worry" (make it a bit playful).
      2. He wants to balance attention between friends and her (healthy boundaries, not toxic clinging).
      3. Apologize specifically for falling asleep yesterday (it wasn't intentional).
      4. Mention keeping a "healthy flow" with ups and downs.
      5. End with "I love you".
      Tone: Realistic, not gloomy, reassuring, and warm. strictly NO stage directions.`,
    });
    return response.text || fallbackMessage;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return fallbackMessage;
  }
};

export const generateMemoryNarrative = async (): Promise<string> => {
  const apiKey = getApiKey();
  if (!apiKey) return "Every memory with you is a treasure I hold dear.";

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a 1-sentence magical movie tagline about the concept of the "Red String of Fate" connecting two lovers named Baba and her partner.`,
    });
    return response.text || "Every memory with you is a treasure I hold dear.";
  } catch (error) {
    return "Every memory with you is a treasure I hold dear.";
  }
};

// Stubbed function to disable AI generation and prevent errors
export const generate3DCartoon = async (imageUrl: string, context: string, size: '1K' | '2K' | '4K' = '1K'): Promise<string | null> => {
  // Returning null tells the component to use the original source image (manual input)
  // This removes all fetching and API errors.
  return null;
};
