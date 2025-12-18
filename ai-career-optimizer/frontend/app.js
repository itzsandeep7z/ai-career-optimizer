const API = "https://ai-career-optimizer.onrender.com";

/* ================= RESUME CREATOR ================= */
async function generateResume() {
  const name = document.getElementById("rc-name").value;
  const skills = document.getElementById("rc-skills").value;
  const education = document.getElementById("rc-education").value;
  const projects = document.getElementById("rc-projects").value;

  if (!name || !skills || !education) {
    resumeOutput.textContent = "Please fill all required fields.";
    return;
  }

  const res = await fetch(`${API}/api/resume/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, skills, education, projects })
  });

  const data = await res.json();
  resumeOutput.textContent = data.resume || data.error;
}

/* ================= RESUME ENHANCER ================= */
async function enhanceResume() {
  const resume = document.getElementById("re-resume").value;
  const targetRole = document.getElementById("re-role").value;

  if (!resume || !targetRole) {
    enhancedOutput.textContent = "Resume and target role required.";
    return;
  }

  const res = await fetch(`${API}/api/resume/enhance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume, targetRole })
  });

  const data = await res.json();
  enhancedOutput.textContent = data.enhancedResume || data.error;
}
