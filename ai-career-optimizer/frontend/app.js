const API_BASE = "https://ai-career-optimizer.onrender.com";

/* =========================================================
   RESUME CREATOR (FIXED — NO UNDEFINED)
   ========================================================= */
async function generateResume() {
  const name = document.getElementById("rc-name").value.trim();
  const skills = document.getElementById("rc-skills").value.trim();
  const education = document.getElementById("rc-education").value.trim();
  const projects = document.getElementById("rc-projects").value.trim();

  if (!name || !skills || !education) {
    alert("Provide valid name, skill and education");
    return;
  }

  try {
    const res = await fetch(
      "https://ai-career-optimizer.onrender.com/api/resume/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          skills,
          education,
          projects
        })
      }
    );

    const data = await res.json();

    document.getElementById("resumeOutput").innerText =
      data.resume || "Resume generation failed";

  } catch (err) {
    console.error(err);
    alert("Server error");
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



