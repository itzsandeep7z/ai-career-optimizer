const API = "https://ai-career-optimizer.onrender.com";

// ========== RESUME CREATOR ==========
async function generateResume() {
  const name = document.getElementById("rc-name").value.trim();
  const skills = document.getElementById("rc-skills").value.trim();
  const education = document.getElementById("rc-education").value.trim();
  const projects = document.getElementById("rc-projects").value.trim();

  const output = document.getElementById("resumeOutput");
  output.innerText = "Generating AI resume...";

  try {
    const res = await fetch(`${API}/api/resume/create`, {
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

    if (data.resume) {
      output.innerText = data.resume;
    } else {
      output.innerText = "AI did not return a resume.";
    }
  } catch (err) {
    output.innerText = "Resume generation failed.";
  }
}

// ========== RESUME ENHANCER ==========
async function enhanceResume() {
  const resume = document.getElementById("re-text").value.trim();
  const targetRole = document.getElementById("re-role").value.trim();

  const output = document.getElementById("enhancedOutput");
  output.innerText = "Enhancing resume with AI...";

  try {
    const res = await fetch(`${API}/api/enhance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resume,
        targetRole
      })
    });

    const data = await res.json();

    if (data.enhancedResume) {
      output.innerText = data.enhancedResume;
    } else {
      output.innerText = "AI did not return enhanced resume.";
    }
  } catch (err) {
    output.innerText = "Resume enhancement failed.";
  }
}
