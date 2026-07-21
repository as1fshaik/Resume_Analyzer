import ResumeUpload from '../components/resume/ResumeUpload';
import {
  FileText,
  Brain,
  Target,
} from 'lucide-react';
import Card from '../components/common/Card';

const BENEFITS = [
  {
    icon: FileText,
    title: "Resume Parsing",
    description: "Extract important information from PDF and DOCX resumes."
  },
  {
    icon: Brain,
    title: "AI Skill Analysis",
    description: "Identify technical skills and compare them with job requirements."
  },
  {
    icon: Target,
    title: "Match Insights",
    description: "Get compatibility scores and improvement recommendations."
  }
];

export default function Upload() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">

      {/* Header */}
      <div className="text-center">

        <h1 className="text-3xl font-black text-brand-text">
          Analyze Your Resume
        </h1>

        <p className="text-sm text-brand-text-muted mt-3 max-w-xl mx-auto">
          Upload your resume and compare it against a job description
          to discover your strengths and missing skills.
        </p>

      </div>


      {/* Upload Component */}
      <ResumeUpload />


      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">

        {BENEFITS.map(({icon: Icon, title, description}) => (

          <Card key={title}>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary mb-4">
              <Icon className="h-5 w-5"/>
            </div>


            <h3 className="font-bold text-brand-text mb-2">
              {title}
            </h3>


            <p className="text-xs text-brand-text-muted leading-relaxed">
              {description}
            </p>

          </Card>

        ))}

      </div>


    </div>
  );
}