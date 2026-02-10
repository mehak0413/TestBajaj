import axios from 'axios';

export const getAiAnswer = async (question) => {
    try {
        const apiKey = process.env.GEMINI_KEY;
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
        
        const payload = {
            contents: [{
                parts: [{
                    text: `${question} Answer in one word.`
                }]
            }]
        };

        const response = await axios.post(apiUrl, payload);
        
        if (response.data && response.data.candidates && response.data.candidates.length > 0) {
            const answer = response.data.candidates[0].content.parts[0].text;
            return answer.trim();
        }
        return "No answer";
    } catch (error) {
        console.error("Gemini API Error:", error.response ? error.response.data : error.message);
        throw new Error("Failed to fetch AI response");
    }
};
