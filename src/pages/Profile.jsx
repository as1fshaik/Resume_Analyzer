import { User, Mail, Calendar, Shield, Sparkles } from 'lucide-react';
import Card from '../components/common/Card';
import { useAnalysis } from '../context/AnalysisContext';

export default function Profile() {
  const { history } = useAnalysis();

  const profile = {
    name: 'Asif Ali',
    email: 'asif@example.com',
    plan: 'Free Plan',
    memberSince: 'July 2026',
    totalAnalyses: history.length,
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <div>
        <h2 className="text-lg font-bold text-brand-text">User Profile</h2>
        <p className="text-xs text-brand-text-dim mt-1">Manage your account information</p>
      </div>

      {/* Profile header */}
      <Card>
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-primary/20 border-2 border-brand-primary/30 text-2xl font-black text-brand-primary">
              AA
            </div>
            <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-brand-success border-2 border-brand-card" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-brand-text">{profile.name}</h3>
            <p className="text-sm text-brand-text-muted">{profile.email}</p>
            <span className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-brand-primary bg-brand-primary/10 border border-brand-primary/20 px-3 py-1 rounded-full">
              <Sparkles className="h-3.5 w-3.5" />
              {profile.plan}
            </span>
          </div>
        </div>
      </Card>

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10">
              <User className="h-5 w-5 text-brand-primary" />
            </div>
            <div>
              <p className="text-xs text-brand-text-dim font-semibold uppercase">Full Name</p>
              <p className="text-sm font-semibold text-brand-text">{profile.name}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10">
              <Mail className="h-5 w-5 text-brand-primary" />
            </div>
            <div>
              <p className="text-xs text-brand-text-dim font-semibold uppercase">Email</p>
              <p className="text-sm font-semibold text-brand-text">{profile.email}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10">
              <Calendar className="h-5 w-5 text-brand-primary" />
            </div>
            <div>
              <p className="text-xs text-brand-text-dim font-semibold uppercase">Member Since</p>
              <p className="text-sm font-semibold text-brand-text">{profile.memberSince}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10">
              <Shield className="h-5 w-5 text-brand-primary" />
            </div>
            <div>
              <p className="text-xs text-brand-text-dim font-semibold uppercase">Total Analyses</p>
              <p className="text-sm font-semibold text-brand-text">{profile.totalAnalyses}</p>
            </div>
          </div>
        </Card>
      </div>

      <Card title="About This Project" subtitle="Resume Job Analyzer — Academic Submission">
        <p className="text-sm text-brand-text-muted leading-relaxed">
          This application analyzes resume-job compatibility using a three-tier architecture:
          React frontend, Node.js API gateway, and FastAPI AI service for resume parsing and
          skill matching. All analyses are processed locally during demo sessions.
        </p>
      </Card>
    </div>
  );
}
