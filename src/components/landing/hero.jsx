import { Link } from "react-router-dom";
import {
  ArrowRight,
  Play,
  ShieldCheck,
  FileText,
  Zap,
  Brain,
} from "lucide-react";

import Button from "../common/Button";
import HeroAnimation from "./hero/HeroAnimation";
import AnimatedBackground from "./hero/AnimatedBackground";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center pt-4 lg:pt-6 pb-4">
      {/* Premium Animated Background */}
      <AnimatedBackground />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-2 lg:py-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          {/* LEFT */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-card px-4 py-2 mb-5 mt-10 lg:mt-12">
              <Brain className="w-4 h-4 text-brand-primary" />
              <span className="text-sm text-brand-text-muted">
                AI Powered Resume Analyzer
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl lg:text-7xl font-black leading-tight text-brand-text">
              Analyze.
              <br />
              <span className="text-brand-primary">
                Optimize.
              </span>
              <br />
              Get Hired.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-xl text-lg leading-8 text-brand-text-muted">
              Upload your resume, compare it with any job description,
              identify missing skills, improve ATS compatibility,
              and receive AI-powered recommendations instantly.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
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

              <a href="#how-it-works">
                <Button
                  variant="secondary"
                  size="lg"
                  icon={Play}
                >
                  How It Works
                </Button>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-5 flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-brand-text-muted">
                <FileText size={18} />
                <span className="text-sm">
                  PDF & DOCX Support
                </span>
              </div>

              <div className="flex items-center gap-2 text-brand-text-muted">
                <Zap size={18} />
                <span className="text-sm">
                  Fast Analysis
                </span>
              </div>

              <div className="flex items-center gap-2 text-brand-text-muted">
                <ShieldCheck size={18} />
                <span className="text-sm">
                  Secure Upload
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center lg:justify-end pt-4 lg:pt-20 overflow-hidden w-full">
            <div className="flex items-center justify-center w-full max-w-[440px] mx-auto lg:mx-0 h-[460px] lg:h-[580px]">
              <div className="scale-[0.7] sm:scale-90 lg:scale-100 origin-center transition-transform shrink-0">
                <HeroAnimation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}