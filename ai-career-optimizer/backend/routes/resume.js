const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

router.post("/create", async (req, res) => {
  try {
    const { name, skills, education, projects } = req.body;

    if (!name || !skills || !education) {
      return res.status(400).json({
        error: "Name, skills, and education are required"
      });
    }

    const prompt = `
Create a professional resume using:
Name: ${name}
Skills: ${skills}
Education: ${education}
Projects: ${projects || "Not provided"}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({
      resume: completion.choices[0].message.content
    });
  } catch (err) {
    res.status(500).json({
      error: "Resume generation failed",
      details: err.message
    });
  }
});

module.exports = router;
