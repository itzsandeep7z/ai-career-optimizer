const axios = require("axios");

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.1-8b-instant";

async function chat(prompt) {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: GROQ_MODEL,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    // ✅ THIS LINE IS THE MOST IMPORTANT
    return response.data.choices[0].message.content;

  } catch (error) {
    console.error(
      "Groq API Error:",
      error.response?.data || error.message
    );
    throw new Error("Groq API failed");
  }
}

module.exports = {
  chat
};
