import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt, systemInstruction, useSearch } = req.body;
    
    // Securely loads API key from Vercel's Environment Variables
    const apiKey = process.env.GEMINI_API_KEY; 
    
    if (!apiKey) {
        return res.status(500).json({ error: 'Server misconfiguration: API Key missing' });
    }

    // Initialize the new Google Gen AI SDK
    const ai = new GoogleGenAI({ apiKey: apiKey });

    // Setup the configuration object for the Gemini 3 family
    const config = {
        systemInstruction: systemInstruction,
        temperature: 1.0 // Recommended for Gemini 3 stability
    };

    // Attach Google Search grounding if requested
    // Note: The new SDK uses 'googleSearch' instead of 'google_search'
    if (useSearch) {
        config.tools = [{ googleSearch: {} }];
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.1-flash-lite-preview", 
            contents: prompt,
            config: config
        });

        // The new SDK automatically parses the response text for us
        const text = response.text || "No response generated.";
        
        return res.status(200).json({ text: text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: error.message });
    }
}