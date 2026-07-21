def compare_skills(resume_skills: list, job_skills: list) -> dict:
    """
    Compare resume skills with job description skills.

    Args:
        resume_skills (list): Skills extracted from the resume.
        job_skills (list): Skills extracted from the job description.

    Returns:
        dict containing:
            - match_percentage
            - matched_count
            - required_count
            - common_skills
            - missing_skills
            - additional_skills
            - recommendations
    """

    # Convert lists to sets for efficient comparison
    resume_set = set(resume_skills)
    job_set = set(job_skills)

    # Find common, missing, and additional skills
    common = resume_set & job_set
    missing = job_set - resume_set
    additional = resume_set - job_set

    matched_count = len(common)
    required_count = len(job_set)

    # Calculate match percentage
    if required_count > 0:
        match_percentage = round((matched_count / required_count) * 100)
    else:
        match_percentage = 0

    # Generate simple recommendations
    recommendations = [
        f"Consider learning {skill}"
        for skill in sorted(missing, key=str.lower)
    ]

    return {
        "match_percentage": match_percentage,
        "matched_count": matched_count,
        "required_count": required_count,
        "common_skills": sorted(common, key=str.lower),
        "missing_skills": sorted(missing, key=str.lower),
        "additional_skills": sorted(additional, key=str.lower),
        "recommendations": recommendations,
    }