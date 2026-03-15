// NOTE: Ensure this points exactly to `/api/gemini` for Vercel Serverless
const endpoint = `/api/gemini`; 

async function callBackend(prompt, systemInstruction, useSearch = false) {
    const payload = {
        prompt: prompt,
        systemInstruction: systemInstruction,
        useSearch: useSearch
    };

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });
    
    if (!response.ok) throw new Error("Failed to fetch from backend");
    
    const data = await response.json();
    return data.text;
}

// Helper function to robustly format Gemini's output
function formatAIResponse(text) {
    return text
        // Removes citation tags like
        .replace(/\]*\]/gi, '')
        // Removes standard numerical citations like [1] or [1, 2] if they pop up
        .replace(/\[\d+(?:,\s*\d+)*\]/g, '')
        // Matches **bold text** even if it spans multiple lines
        .replace(/\*\*([\s\S]*?)\*\*/g, '<strong>$1</strong>')
        // Converts standard newlines into HTML line breaks
        .replace(/\n/g, '<br>');
}

/* Explainer Feature */
async function simplifyText(titleId, descId, resultId) {
    const titleContainer = document.getElementById(titleId);
    const title = titleContainer.querySelector(`.lang-${currentLang}`)?.innerText || titleContainer.innerText;
    
    const resultDiv = document.getElementById(resultId);
    const btn = resultDiv.parentElement.querySelector('.ai-btn') || resultDiv.previousElementSibling;
    
    const doiBtn = resultDiv.parentElement.querySelector('.doi-btn');
    const doiLink = doiBtn ? doiBtn.href : 'No link available';

    btn.disabled = true;
    btn.innerHTML = currentLang === 'en' ? '✨ Analyzing...' : '✨ Analizzando...';
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = currentLang === 'en' ? '<em>Searching the DOI link to generate a scientific summary...</em>' : '<em>Ricerca del link DOI per generare un riassunto scientifico...</em>';

    const systemPrompt = `You are an expert scientific researcher and communicator. Your task is to provide a scientifically accurate summary of the academic paper provided.
    IMPORTANT INSTRUCTIONS:
    1. Use the Google Search tool to look up the provided DOI link and read the paper's official abstract or content.
    2. Summarize the actual scientific findings, methodology, and conclusions based on the abstract you find online.
    3. Keep the summary concise (3-4 sentences) but preserve the correct scientific terminology and context. Do NOT make up a generic summary based only on the title.
    4. You MUST reply entirely in ${currentLang === 'en' ? 'English' : 'Italian'}.`;
    
    const userPrompt = `Title: ${title}\nPaper Link/DOI: ${doiLink}\nPlease search this DOI link and summarize the paper's scientific abstract.`;

    try {
        const explanation = await callBackend(userPrompt, systemPrompt, true);
        const formattedExplanation = formatAIResponse(explanation);
        resultDiv.innerHTML = `<strong>✨ AI:</strong> ${formattedExplanation}`;
    } catch (error) {
        resultDiv.innerHTML = `<span style="color: #ef4444;">Error: ${error.message}</span>`;
    } finally {
        btn.disabled = false;
        btn.innerHTML = currentLang === 'en' ? '✨ Explain with AI' : '✨ Spiega con l\'AI';
    }
}

/* Chatbot Feature */
const chatWindow = document.getElementById('chat-window');
const chatMessages = document.getElementById('chat-messages');
const typingIndicator = document.getElementById('typing-indicator');

function toggleChat() {
    chatWindow.classList.toggle('open');
    if (chatWindow.classList.contains('open')) {
        const activeInput = currentLang === 'en' ? document.getElementById('chat-input') : document.getElementById('chat-input-it');
        activeInput.focus();
    }
}

function handleKeyPress(e) { if (e.key === 'Enter') sendMessage(); }

async function sendMessage() {
    const activeInput = currentLang === 'en' ? document.getElementById('chat-input') : document.getElementById('chat-input-it');
    const text = activeInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    activeInput.value = '';
    
    typingIndicator.style.display = 'block';
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const assistantContext = `
        You are the official AI Research Assistant on the personal website of Giovanni Pasini.
        Base your knowledge on the hardcoded facts below, and actively USE THE GOOGLE SEARCH TOOL to find accurate, up-to-date information when asked for details outside of this prompt.

        CORE FACTS ABOUT GIOVANNI (From the CV page of this website):
        - Postdoc Researcher (Ricercatore Postdoc) at the Institute of Bioimaging and Complex Biological Systems (IBSBC-CNR), Cefalù (Dec 2025 - Present). Focus: AI and radiomics applied to medical images, Breast Integrated Solution (BIS) project.
        - Associate Collaborator (Collaboratore di Ricerca) at INFN-LNS, Catania (Jun 2025 - Present). Focus: AIM_MIA project.
        - PhD in Industrial and Management Engineering at Sapienza University & IBSBC-CNR (Nov 2022 - Jan 2026). Graduated Jan 22, 2026. Thesis focused on personalized medicine, AI, and radiomics in oncology and neurodegenerative diseases.
        - Associate Collaborator at IBSBC-CNR (Jan 2023 - Nov 2025).
        - Research Collaborator at IBSBC-CNR (May 2022 - Jan 2023). Developed first version of matRadiomics.
        - Master's Degree in Biomedical Engineering (110/110 e lode) at Sapienza University (Sep 2019 - Jan 2022).
        - Bachelor's Degree in Clinical Engineering (108/110) at Sapienza University (Sep 2016 - Oct 2019).
        - Core technical skills: Radiomics, Machine Learning, Deep Learning, Medical Image Processing, XR, Python, MATLAB, C#, Flutter.

        SEARCH INSTRUCTIONS (MANDATORY WHEN ASKED):
        1. If asked about his CV, experience, or profile, you MUST utilize the core facts above (from his website's CV page, live at: https://pasinigiovanni.com/cv.html ), AND use the Google Search tool to search his LinkedIn (https://it.linkedin.com/in/giovap), his ResearchGate (https://www.researchgate.net/profile/Giovanni-Pasini-2), or use the exact search queries: "Giovanni Pasini Sapienza University of Rome" or "Giovanni Pasini National Research Council".
        2. If asked about "matRadiomics", you MUST search the web for his paper "matRadiomics: A Novel and Complete Radiomics Framework, from Image Visualization to Predictive Model" or search its exact DOI (10.3390/jimaging8080221) to provide technical details.
        3. If asked about his institutional collaborations, you MUST search his published papers to identify the affiliations of his co-authors. Use these exact DOIs: 10.1186/s41824-025-00280-6, 10.1007/978-3-032-11317-7_13, 10.3390/diagnostics15080953, 10.1007/s00259-025-07085-6, 10.1007/s10278-024-01281-w, 10.3390/biomedinformatics4040125, 10.3390/jimaging10110290, 10.3390/jimaging10040096, 10.1007/978-3-031-51026-7_4, 10.3390/diagnostics13243640, 10.3390/jimaging9100213, 10.3390/diagnostics13061167, 10.3390/jimaging8080221, 10.1007/978-3-031-13321-3_33, 10.1007/978-3-031-13321-3_32. 
           * CRITICAL INSTRUCTION: If you identify a co-author but their institutional affiliation is missing or unclear from the paper metadata, you MUST execute a new Google Search with the query "[Co-author Full Name] affiliation" or "[Co-author Full Name] university hospital" to definitively determine their institution before answering.

        RULES:
        - Be polite, concise, and professional.
        - Answer strictly based on Giovanni's profile, the provided CV facts, and search results. Do not hallucinate outside information.
        - You MUST reply entirely in ${currentLang === 'en' ? 'English' : 'Italian'}.
    `;

    try {
        const response = await callBackend(text, assistantContext, true);
        typingIndicator.style.display = 'none';
        appendMessage(response, 'ai');
    } catch (error) {
        typingIndicator.style.display = 'none';
        appendMessage("API Error: " + error.message, 'ai');
    }
}

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${sender}`;
    msgDiv.innerHTML = sender === 'user' ? text : formatAIResponse(text);
    chatMessages.insertBefore(msgDiv, typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}