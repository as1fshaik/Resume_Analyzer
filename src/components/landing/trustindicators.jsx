import {
  FileText,
  ShieldCheck,
  Zap,
  Brain,
} from "lucide-react";

const ITEMS = [
  {
    icon: FileText,
    title: "PDF & DOCX",
    subtitle: "Supported Formats",
  },
  {
    icon: Zap,
    title: "Fast Analysis",
    subtitle: "Instant AI Processing",
  },
  {
    icon: Brain,
    title: "AI Insights",
    subtitle: "Skill Gap Detection",
  },
  {
    icon: ShieldCheck,
    title: "Secure Upload",
    subtitle: "Private Resume Analysis",
  },
];

export default function TrustIndicators() {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-6">

        <div
          id="trust"
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {ITEMS.map(({ icon: Icon, title, subtitle }) => (
            <div
              key={title}
              className="rounded-2xl border border-brand-border bg-brand-card p-6 hover:border-brand-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-4">
                <Icon
                  className="text-brand-primary"
                  size={22}
                />
              </div>

              <h3 className="font-semibold text-brand-text">
                {title}
              </h3>

              <p className="text-sm text-brand-text-muted mt-1">
                {subtitle}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}