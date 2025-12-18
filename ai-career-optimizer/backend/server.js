const express = require("express");
const cors = require("cors");
require("dotenv").config();

const resumeRoutes = require("./routes/resume");
const enhanceRoutes = require("./routes/enhance");
const interviewRoutes = require("./routes/interview");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.use("/api/resume", resumeRoutes);
app.use("/api/resume", enhanceRoutes);
app.use("/api/interview", interviewRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on", PORT));
