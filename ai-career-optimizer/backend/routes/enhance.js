const express = require("express");
const askGroq = require("../services/groq");

const router = express.Router();

router.post("/enhance", async (req, res) => {
  try {
    const { resume, targetRole } = req.body;

    if (!resume || !targetRole) {
      return res.status(400).json({
        error: "Resume and target role are required"
      });
    }

    const prompt = `
Improve this resume for the role of ${targetRole}:

${resume}

Return improved resume only.
`;

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }]
    });

    res.json({
      enhancedResume: completion.choices[0].message.content
    });

  } catch (err) {
    res.status(500).json({ error: "Resume enhancement failed" });
  }
});

module.exports = router;
