const express = require("express");
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const router = express.Router();

// Store uploaded files temporarily
const upload = multer({ dest: "uploads/" });

const AI_SERVICE_URL = "http://127.0.0.1:8000";

/**
 * Creates FormData containing the uploaded resume file.
 */
function createFormData(file) {
    const formData = new FormData();

    formData.append(
        "file",
        fs.createReadStream(file.path),
        file.originalname
    );

    return formData;
}

/**
 * Deletes temporary uploaded file.
 */
function deleteTempFile(file) {
    if (file && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
    }
}

/* ------------------------- Parse Resume ------------------------- */

router.post("/upload", upload.single("resume"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required."
            });
        }

        const formData = createFormData(req.file);

        const response = await axios.post(
            `${AI_SERVICE_URL}/parse-resume`,
            formData,
            {
                headers: formData.getHeaders()
            }
        );

        res.json(response.data);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Resume parsing failed."
        });

    } finally {
        deleteTempFile(req.file);
    }
});

/* ------------------------- Analyze Resume ------------------------- */

router.post("/analyze", upload.single("resume"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume file is required."
            });
        }

        if (!req.body.job_description?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Job description is required."
            });
        }

        const formData = createFormData(req.file);

        formData.append(
            "job_description",
            req.body.job_description
        );

        const response = await axios.post(
            `${AI_SERVICE_URL}/analyze`,
            formData,
            {
                headers: formData.getHeaders()
            }
        );

        res.json(response.data);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Resume analysis failed."
        });

    } finally {
        deleteTempFile(req.file);
    }
});

module.exports = router;