const API_BASE = "https://ai-career-optimizer.onrender.com";

/* =========================================================
   RESUME CREATOR (FIXED — NO UNDEFINED)
   ========================================================= */
async function generateResume() {
  const name = document.querySelector(
    'input[placeholder="Full Name"]'
  )?.value.trim();

  const skills = document.querySelector(
    'input[placeholder="Skills"]'
  )?.value.trim();

  const education = document.querySelector(
    'input[placeholder="Education"]'
  )?.value.trim();

  const projects = document.querySelector(
    'input[placeholder="Projects"]'
  )?.value.trim();

  if (!name || !skills || !education) {
    alert("Please fill Name, Skills and Education");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/resume/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        skills,
        education,
        projects
      })
    });

    const data = await res.json();

    if (!data.resume) {
      throw new Error("Resume not returned");
    }

    document.getElementById("resumeOutput").innerText = data.resume;
  } catch (err) {
    console.error(err);
    alert("Resume generation failed");
  }
}

/* =========================================================
   RESUME ENHANCER (FIXED — NO UNDEFINED)
   ========================================================= */
async function enhanceResume() {
  const resumeText = document.querySelector(
    'textarea[placeholder="Paste your resume here"]'
  )?.value.trim();

  const targetRole = document.querySelector(
    'input[placeholder="Target Role"]'
  )?.value.trim();

  if (!resumeText || !targetRole) {
    alert("Please paste resume and enter target role");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/api/resume/enhance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resume: resumeText,
        targetRole
      })
    });

    const data = await res.json();

    if (!data.enhancedResume) {
      throw new Error("Enhanced resume missing");
    }

    document.getElementById("enhancedOutput").innerText =
      data.enhancedResume;
  } catch (err) {
    console.error(err);
    alert("Resume enhancement failed");
  }
}
