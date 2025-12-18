const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

/* =======================
   RESUME CREATOR
======================= */
router.post("/create", async (req, res) => {
  try {
    const { name, skills, education, projects } = req.body;

    // VALIDATION (IMPORTANT)
    if (!name || !skills || !education) {
      return res.status(400).json({
        error: "Name, skills, and education are required"
      });
    }

    const prompt = `
Create a professional resume using this data:

Name: ${name}
Skills: ${skills}
Education: ${education}
Projects: ${projects || "Not provided"}

Return ONLY the resume text.
`;

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({
      resume: completion.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({ error: "Resume generation failed" });
  }
});
