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

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] }
    };

    if (useSearch) {
        payload.tools = [{ "google_search": {} }];
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
        
        return res.status(200).json({ text: text });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}