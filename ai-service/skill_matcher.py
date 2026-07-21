import re
from skills_database import TECHNICAL_SKILLS

def extract_skills(text: str) -> list:
    """
    Extracts technical skills from the provided text using case-insensitive matching.
    Avoids false positives by enforcing strict word boundary rules and negative lookaheads.
    """
    if not text:
        return []
        
    found_skills = set()
    text_lower = text.lower()
    
    for skill in TECHNICAL_SKILLS:
        skill_lower = skill.lower()
        
        # Special case: Avoid matching 'C' inside 'C++' or 'C#'
        if skill_lower == 'c':
            # Matches 'c' on word boundaries but NOT if followed by + or #
            pattern = r'\bc(?![+#])\b'
        else:
            escaped_skill = re.escape(skill_lower)
            
            # Left boundary determination:
            # If the skill starts with an alphanumeric character, use standard \b boundary.
            # Otherwise, use a lookbehind asserting the previous char is a non-word or start of string.
            left_boundary = r'\b' if re.match(r'^\w', escaped_skill) else r'(?<=^|[^\w])'
            
            # Right boundary determination:
            # If the skill ends with an alphanumeric character, use standard \b boundary.
            # Otherwise, use a lookahead asserting the next char is a non-word or end of string.
            right_boundary = r'\b' if re.search(r'\w$', escaped_skill) else r'(?=$|[^\w])'
            
            pattern = f"{left_boundary}{escaped_skill}{right_boundary}"
            
        # Search the lowercased text for the built regex pattern
        if re.search(pattern, text_lower):
            found_skills.add(skill)
            
    # Return matched skills alphabetically (sorted case-insensitively)
    return sorted(list(found_skills), key=lambda s: s.lower())
