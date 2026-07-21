const express = require("express");
const cors = require("cors");

const resumeRoutes = require("./routes/resume");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Resume Analyzer Backend is Running!"
    });
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found."
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});