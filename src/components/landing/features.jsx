import {
  ScanSearch,
  Target,
  BrainCircuit,
  FileSearch,
} from "lucide-react";

const FEATURES = [
  {
    icon: ScanSearch,
    title: "Resume Parsing",
    description:
      "Extracts content from PDF and DOCX resumes for intelligent processing.",
  },
  {
    icon: Target,
    title: "ATS Compatibility",
    description:
      "Measures how well your resume matches a job description.",
  },
  {
    icon: FileSearch,
    title: "Skill Gap Analysis",
    description:
      "Highlights missing skills required for your target role.",
  },
  {
    icon: BrainCircuit,
    title: "AI Recommendations",
    description:
      "Receive personalized suggestions to strengthen your resume.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="py-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold text-brand-text">
            Everything You Need
          </h2>

          <p className="mt-4 text-brand-text-muted max-w-2xl mx-auto">
            Powerful AI tools designed to maximize your chances
            of getting shortlisted.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {FEATURES.map(({ icon: Icon, title, description }) => (

            <div
              key={title}
              className="rounded-3xl border border-brand-border bg-brand-card p-8 hover:-translate-y-2 hover:border-brand-primary transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-6">

                <Icon
                  className="text-brand-primary"
                  size={28}
                />

              </div>

              <h3 className="text-xl font-semibold text-brand-text mb-4">
                {title}
              </h3>

              <p className="text-brand-text-muted leading-7">
                {description}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}