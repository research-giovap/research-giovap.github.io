const { GoogleGenAI } = require("@google/genai");

module.exports = async function handler(req, res) {
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

    // Setup the configuration object
    const config = {
        systemInstruction: systemInstruction,
        temperature: 1.0 
    };

    if (useSearch) {
        config.tools = [{ googleSearch: {} }];
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3.1-pro-preview", 
            contents: prompt,
            config: config
        });

        const text = response.text || "No response generated.";
        
        return res.status(200).json({ text: text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: error.message });
    }
};