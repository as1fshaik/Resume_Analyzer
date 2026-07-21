import { Link } from 'react-router-dom';
import {
  Sparkles,
  Upload,
  Target,
  Brain,
  FileSearch,
  ArrowRight,
  CheckCircle,
  Zap,
} from 'lucide-react';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';
import Card from '../components/common/Card';

const FEATURES = [
  {
    icon: Upload,
    title: 'Smart Resume Upload',
    description: 'Upload PDF or DOCX resumes with drag-and-drop. Instant parsing and text extraction.',
  },
  {
    icon: Brain,
    title: 'AI Skill Extraction',
    description: 'Automatically detects technical skills from your resume and job descriptions.',
  },
  {
    icon: Target,
    title: 'Match Scoring',
    description: 'Get a clear compatibility percentage comparing your skills to job requirements.',
  },
  {
    icon: FileSearch,
    title: 'Gap Analysis',
    description: 'Identify matched, missing, and additional skills with actionable recommendations.',
  },
];

const STEPS = [
  'Upload your resume (PDF or DOCX)',
  'Paste the target job description',
  'Get instant match score and recommendations',
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-brand-bg-start">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-bg-start/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link to="/upload">
              <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center relative">
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 border border-brand-primary/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles className="h-4 w-4 text-brand-primary" />
            <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">
              AI-Powered Resume Analysis
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-text tracking-tight mb-6 leading-tight">
            Match Your Resume to
            <span className="block text-brand-primary">Any Job Description</span>
          </h1>

          <p className="text-base sm:text-lg text-brand-text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
            Resume Job Analyzer uses intelligent skill extraction and matching to help you
            understand how well your resume fits a role — with clear scores, gap analysis,
            and personalized recommendations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/upload">
              <Button variant="primary" size="lg" icon={Zap}>
                Analyze My Resume
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="secondary" size="lg">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-text mb-3">How It Works</h2>
          <p className="text-sm text-brand-text-muted">Three simple steps to optimize your application</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {STEPS.map((step, i) => (
            <div
              key={step}
              className="flex flex-col items-center text-center bg-brand-card border border-brand-border rounded-2xl p-6"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary font-bold text-lg mb-4">
                {i + 1}
              </span>
              <p className="text-sm font-semibold text-brand-text">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-brand-border">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-text mb-3">Key Features</h2>
          <p className="text-sm text-brand-text-muted">
            Everything you need to evaluate resume-job compatibility
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="hover:border-brand-primary/20 transition-colors">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary mb-4">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-bold text-brand-text mb-2">{title}</h3>
              <p className="text-xs text-brand-text-muted leading-relaxed">{description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <Card className="bg-gradient-to-br from-brand-primary/5 to-transparent">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-xl font-bold text-brand-text mb-3">Built with Modern Tech</h2>
              <p className="text-sm text-brand-text-muted mb-4 max-w-lg">
                A full-stack application combining React, Node.js, and FastAPI for
                reliable resume parsing and intelligent skill matching.
              </p>
              <ul className="space-y-2">
                {['React + Vite + Tailwind CSS', 'Node.js + Express API Gateway', 'FastAPI Python AI Service'].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-xs text-brand-text-muted">
                      <CheckCircle className="h-4 w-4 text-brand-success shrink-0" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
            <Link to="/upload">
              <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                Start Free Analysis
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-brand-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-brand-text-dim">© 2026 Resume Job Analyzer · AI-Powered</p>
          <div className="flex items-center gap-4">
            <Link to="/upload" className="text-xs text-brand-text-muted hover:text-brand-primary transition-colors">
              Upload
            </Link>
            <Link to="/results" className="text-xs text-brand-text-muted hover:text-brand-primary transition-colors">
              Results
            </Link>
            <Link to="/history" className="text-xs text-brand-text-muted hover:text-brand-primary transition-colors">
              History
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
