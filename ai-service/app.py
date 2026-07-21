from fastapi import FastAPI, UploadFile, File, Form, HTTPException, status
import shutil
import os

from resume_parser import extract_text
from skill_matcher import extract_skills
from match_engine import compare_skills

app = FastAPI()

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def validate_file(file: UploadFile):
    """Validate uploaded resume file type."""
    file_ext = os.path.splitext(file.filename)[1].lower()

    if file_ext not in [".pdf", ".docx"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported file format. Please upload a PDF or DOCX file."
        )


def save_uploaded_file(file: UploadFile) -> str:
    """Save uploaded file and return its path."""
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return file_path


@app.get("/")
def home():
    return {
        "message": "Resume Analyzer AI Service is Running!"
    }


@app.post("/parse-resume")
async def parse_resume(file: UploadFile = File(...)):
    validate_file(file)

    file_path = save_uploaded_file(file)

    try:
        extracted_text = extract_text(file_path)
        skills = extract_skills(extracted_text)

        return {
            "text": extracted_text,
            "skills": skills
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Resume parsing failed: {str(e)}"
        )

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)


@app.post("/analyze")
async def analyze(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    """
    Analyze a resume against a job description.
    """

    if not job_description.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Job description cannot be empty."
        )

    validate_file(file)

    file_path = save_uploaded_file(file)

    try:
        # Extract resume text
        resume_text = extract_text(file_path)

        # Extract skills
        resume_skills = extract_skills(resume_text)
        job_skills = extract_skills(job_description)

        # Compare skills
        match_results = compare_skills(
            resume_skills,
            job_skills
        )

        return {
            "match_percentage": match_results["match_percentage"],
            "matched_count": match_results["matched_count"],
            "required_count": match_results["required_count"],
            "resume_skills": resume_skills,
            "job_skills": job_skills,
            "common_skills": match_results["common_skills"],
            "missing_skills": match_results["missing_skills"],
            "additional_skills": match_results["additional_skills"],
            "recommendations": match_results["recommendations"],
            "resume_text": resume_text
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Analysis failed: {str(e)}"
        )

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)