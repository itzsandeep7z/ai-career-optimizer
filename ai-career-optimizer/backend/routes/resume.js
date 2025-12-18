const express = require("express");
const router = express.Router();

router.post("/create", (req, res) => {
  const { name, skills, education, projects } = req.body;

  if (!name || !skills || !education) {
    return res.json({
      resume: "Please provide Name, Skills and Education."
    });
  }

  const resumeText = `
${name}

EDUCATION
${education}

SKILLS
${skills}

PROJECTS
${projects || "Not provided"}
`;

  // 🔑 IMPORTANT: ALWAYS RETURN resume AS STRING
  return res.json({
    resume: resumeText
  });
});

module.exports = router;
