import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Button from "../common/Button";

export default function CTA() {
  return (
    <section className="py-28">

      <div className="max-w-6xl mx-auto px-6">

        <div className="rounded-[40px] border border-brand-border bg-gradient-to-br from-brand-primary/10 via-brand-card to-brand-card p-14 text-center">

          <h2 className="text-4xl font-bold text-brand-text mb-6">
            Ready to Improve Your Resume?
          </h2>

          <p className="max-w-2xl mx-auto text-brand-text-muted mb-10 leading-8">
            Upload your resume, compare it with any job description,
            and receive AI-powered recommendations in seconds.
          </p>

          <Link to="/upload">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
            >
              Start Free Analysis
            </Button>
          </Link>

        </div>

      </div>

    </section>
  );
}