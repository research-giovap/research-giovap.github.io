// NOTE: Change this endpoint to your secure Vercel URL once deployed
// e.g., const endpoint = `https://your-site.vercel.app/api/gemini`;
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
        const formattedExplanation = explanation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
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
        You are the official AI Research Assistant on Giovanni Pasini's website. 
        Facts about Giovanni: 
        - He successfully obtained his PhD in Industrial and Management Engineering at Sapienza University on January 22, 2026.
        - As of December 1, 2025, he is a Postdoc Researcher (Assegnista di Ricerca) at the Institute of Bioimaging and Complex Biological Systems (IBSBC-CNR).
        - He is also an Associate Collaborator at INFN-LNS since June 2025.
        - Creator of 'matRadiomics' software (freeware for radiomics pipelines using MATLAB).
        - Research fields: Medical imaging, radiomics, machine learning, CNNs, oncology, neurodegenerative diseases.
        Rules: Be polite, concise. Answer strictly based on Giovanni's profile. You MUST reply entirely in ${currentLang === 'en' ? 'English' : 'Italian'}.
    `;

    try {
        const response = await callBackend(text, assistantContext, false);
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
    msgDiv.innerHTML = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
    chatMessages.insertBefore(msgDiv, typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}