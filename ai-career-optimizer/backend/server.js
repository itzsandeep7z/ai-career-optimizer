const express = require("express");
const cors = require("cors");
require("dotenv").config();

const resumeRoutes = require("./route/resume");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Career Optimizer Backend Running");
});

app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;
const enhanceRoutes = require("./routes/enhance");
app.use("/api/resume", enhanceRoutes);
const interviewRoutes = require("./routes/interview");
app.use("/api/interview", interviewRoutes);
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});

