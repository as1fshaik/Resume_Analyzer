import {
  Upload,
  FileText,
  BrainCircuit,
  Target,
  ArrowRight,
} from "lucide-react";

const STEPS = [
  {
    icon: Upload,
    title: "Upload Resume",
    description: "Upload your resume in PDF or DOCX format.",
  },
  {
    icon: FileText,
    title: "Paste Job Description",
    description: "Add the job description you want to match.",
  },
  {
    icon: BrainCircuit,
    title: "AI Analysis",
    description: "Our AI compares skills and ATS compatibility.",
  },
  {
    icon: Target,
    title: "Get Results",
    description: "Receive match score, missing skills and recommendations.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-28"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">

          <h2 className="text-4xl font-bold text-brand-text">
            How It Works
          </h2>

          <p className="mt-4 text-brand-text-muted max-w-2xl mx-auto">
            Analyze your resume in just four simple steps.
          </p>

        </div>

        <div className="grid lg:grid-cols-4 gap-8">

          {STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative"
              >
                <div className="rounded-3xl border border-brand-border bg-brand-card p-8 text-center hover:border-brand-primary transition-all duration-300 hover:-translate-y-2">

                  <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-6">

                    <Icon
                      className="text-brand-primary"
                      size={30}
                    />

                  </div>

                  <h3 className="text-xl font-semibold text-brand-text mb-3">
                    {step.title}
                  </h3>

                  <p className="text-brand-text-muted leading-7 text-sm">
                    {step.description}
                  </p>

                </div>

                {index !== STEPS.length - 1 && (
                  <ArrowRight
                    className="hidden lg:block absolute -right-6 top-1/2 -translate-y-1/2 text-brand-primary"
                    size={28}
                  />
                )}

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}