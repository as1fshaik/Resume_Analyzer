import { Link } from 'react-router-dom';
import {
  Upload,
  Target,
  TrendingUp,
  History,
  ArrowRight,
  FileText,
  Sparkles,
  Brain,
} from 'lucide-react';

import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAnalysis } from '../context/AnalysisContext';

const PLACEHOLDER_STATS = {
  totalAnalyses: 12,
  avgMatch: 68,
  bestMatch: 92,
};

const PLACEHOLDER_RECENT = [
  {
    id: 1,
    fileName: 'Software_Engineer_Resume.pdf',
    match_percentage: 85,
    timestamp: '2026-07-20T10:00:00.000Z',
  },
  {
    id: 2,
    fileName: 'FullStack_Dev_Resume.docx',
    match_percentage: 72,
    timestamp: '2026-07-19T10:00:00.000Z',
  },
  {
    id: 3,
    fileName: 'Data_Analyst_Resume.pdf',
    match_percentage: 58,
    timestamp: '2026-07-18T10:00:00.000Z',
  },
];

const PLACEHOLDER_SKILLS = [
  'React',
  'JavaScript',
  'Node.js',
  'Python',
  'FastAPI',
];

export default function Dashboard() {
  const { currentAnalysis, history } = useAnalysis();

  const hasHistory = history.length > 0;

  const totalAnalyses = hasHistory
    ? history.length
    : PLACEHOLDER_STATS.totalAnalyses;

  const avgMatch = hasHistory
    ? Math.round(
        history.reduce(
          (sum, item) => sum + (item.match_percentage || 0),
          0
        ) / history.length
      )
    : PLACEHOLDER_STATS.avgMatch;

  const bestMatch = hasHistory
    ? Math.max(...history.map((item) => item.match_percentage || 0))
    : PLACEHOLDER_STATS.bestMatch;

  const recentItems = hasHistory
    ? history.slice(0, 5)
    : PLACEHOLDER_RECENT;

  const currentScore = currentAnalysis?.match_percentage || 0;

  const summaryCards = [
    {
      title: 'Total Analyses',
      value: totalAnalyses,
      icon: FileText,
      color: 'text-brand-primary',
      bg: 'bg-brand-primary/10',
    },
    {
      title: 'Average Match',
      value: `${avgMatch}%`,
      icon: Target,
      color: 'text-brand-success',
      bg: 'bg-brand-success/10',
    },
    {
      title: 'Best Match',
      value: `${bestMatch}%`,
      icon: TrendingUp,
      color: 'text-brand-warning',
      bg: 'bg-brand-warning/10',
    },
    {
      title: 'Latest Score',
      value: currentScore ? `${currentScore}%` : '—',
      icon: Sparkles,
      color: 'text-brand-primary',
      bg: 'bg-brand-primary/10',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">

      {/* Welcome */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-brand-card p-6 sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 via-transparent to-transparent" />

        <div className="relative flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-brand-text mb-2">
              Welcome back, Asif!
            </h2>

            <p className="text-sm text-brand-text-muted max-w-lg">
              Analyze your resume against job descriptions and discover
              skill gaps with AI-powered insights.
            </p>
          </div>

          <Link to="/upload">
            <Button variant="primary" size="lg" icon={Upload}>
              New Analysis
            </Button>
          </Link>
        </div>
      </div>


      {/* Statistics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {summaryCards.map(({ title, value, icon: Icon, color, bg }) => (
          <Card key={title}>
            <div className="flex justify-between">

              <div>
                <p className="text-xs text-brand-text-dim uppercase font-semibold">
                  {title}
                </p>

                <p className="text-2xl font-black text-brand-text mt-1">
                  {value}
                </p>
              </div>

              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>

            </div>
          </Card>
        ))}

      </div>


      {/* Current Match */}
      <Card title="Current Resume Match">

        {currentScore ? (
          <>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-brand-text-muted">
                Compatibility Score
              </span>

              <span className="font-bold text-brand-success">
                {currentScore}%
              </span>
            </div>

            <div className="h-3 bg-brand-border rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-primary rounded-full"
                style={{ width: `${currentScore}%` }}
              />
            </div>
          </>
        ) : (
          <p className="text-sm text-brand-text-muted">
            Upload your first resume to generate AI insights.
          </p>
        )}

      </Card>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


        {/* Recent */}
        <Card
          title="Recent Analyses"
          subtitle="Your latest resume evaluations"
          className="lg:col-span-2"
        >

          <div className="space-y-3">

            {recentItems.map((item) => (

              <div
                key={item.id}
                className="flex justify-between items-center bg-brand-bg-start/50 border border-brand-border rounded-xl p-4"
              >

                <div className="flex gap-3">

                  <div className="h-9 w-9 rounded-lg bg-brand-primary/10 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-brand-primary"/>
                  </div>


                  <div>
                    <p className="text-sm font-semibold text-brand-text">
                      {item.fileName}
                    </p>

                    <p className="text-xs text-brand-text-dim">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </p>
                  </div>

                </div>


                <span className="font-bold text-brand-success">
                  {item.match_percentage}%
                </span>

              </div>

            ))}

          </div>


          <Link to="/history">
            <Button
              variant="ghost"
              size="sm"
              icon={History}
              className="w-full mt-4"
            >
              View History
            </Button>
          </Link>


        </Card>


        {/* Quick actions */}
        <Card title="Quick Actions">

          <div className="space-y-3">

            {[
              {
                name: 'Upload Resume',
                link: '/upload',
                icon: Upload,
              },
              {
                name: 'View Results',
                link: '/results',
                icon: Target,
              },
              {
                name: 'Profile',
                link: '/profile',
                icon: Sparkles,
              },
            ].map(({ name, link, icon: Icon }) => (

              <Link to={link} key={name}>

                <div className="flex justify-between items-center bg-brand-bg-start/50 border border-brand-border rounded-xl p-4 hover:border-brand-primary/30">

                  <div className="flex items-center gap-3">

                    <Icon className="h-5 w-5 text-brand-primary"/>

                    <span className="text-sm font-semibold text-brand-text">
                      {name}
                    </span>

                  </div>


                  <ArrowRight className="h-4 w-4 text-brand-text-dim"/>

                </div>

              </Link>

            ))}

          </div>

        </Card>


      </div>


      {/* Skills */}
      <Card title="Top Skills Detected">

        <div className="flex flex-wrap gap-3">

          {PLACEHOLDER_SKILLS.map(skill => (

            <span
              key={skill}
              className="px-4 py-2 rounded-xl bg-brand-primary/10 text-brand-primary text-sm font-semibold flex items-center gap-2"
            >
              <Brain className="h-4 w-4"/>
              {skill}
            </span>

          ))}

        </div>

      </Card>


    </div>
  );
}