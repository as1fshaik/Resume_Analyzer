const express = require("express");
const cors = require("cors");

const resumeRoutes = require("./routes/resume");

const app = express();
const PORT = process.env.PORT || 5000;

// Setup CORS whitelist
const allowedOrigins = ["http://localhost:5173"];
if (process.env.FRONTEND_URL) {
    process.env.FRONTEND_URL.split(",")
        .map(url => url.trim())
        .filter(url => url.length > 0)
        .forEach(url => allowedOrigins.push(url));
}

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like server-to-server or development tools)
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}));

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

// Bind explicitly to 0.0.0.0 to make it accessible in container deployments (like Render)
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});