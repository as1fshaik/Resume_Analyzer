import Logo from "../common/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-brand-border py-10">

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

        <div>

          <Logo />

          <p className="mt-3 text-sm text-brand-text-muted max-w-md">
            AI-powered Resume Analyzer that helps job seekers improve
            ATS compatibility and discover skill gaps.
          </p>

        </div>

        <div className="text-sm text-brand-text-muted">
          © 2026 Resume Analyzer. Built with React, Node.js & FastAPI.
        </div>

      </div>

    </footer>
  );
}