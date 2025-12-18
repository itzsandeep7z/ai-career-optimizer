const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

router.post("/", async (req, res) => {
  try {
    const { resume, targetRole } = req.body;

    if (!resume || !targetRole) {
      return res.status(400).json({ error: "Missing input" });
    }

    const prompt = `
Improve this resume for the role of ${targetRole}:

${resume}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({
      enhancedResume: completion.choices[0].message.content
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
