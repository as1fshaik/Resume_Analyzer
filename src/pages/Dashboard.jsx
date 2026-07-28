import { Link, useNavigate } from 'react-router-dom';
import {
  Upload,
  Target,
  TrendingUp,
  History,
  ArrowRight,
  FileText,
  Sparkles,
  Brain,
  Plus,
} from 'lucide-react';

import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAnalysis } from '../context/AnalysisContext';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { viewAnalysis, history } = useAnalysis();
  const navigate = useNavigate();

  const hasHistory = history && history.length > 0;

  // Dynamic statistics calculations
  const totalAnalyses = hasHistory ? history.length : 0;
  
  const avgMatch = hasHistory
    ? Math.round(
        history.reduce(
          (sum, item) => sum + (item.match_percentage || 0),
          0
        ) / history.length
      )
    : 0;

  const bestMatch = hasHistory
    ? Math.max(...history.map((item) => item.match_percentage || 0))
    : 0;

  const latestScore = hasHistory
    ? history[0].match_percentage
    : null;

  // Recent items - Limit to first 5
  const recentItems = hasHistory ? history.slice(0, 5) : [];

  // Gather unique detected skills dynamically from history
  const detectedSkills = hasHistory
    ? Array.from(
        new Set(
          history.reduce((acc, item) => {
            if (item.common_skills && Array.isArray(item.common_skills)) {
              return [...acc, ...item.common_skills];
            }
            return acc;
          }, [])
        )
      ).sort()
    : [];

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
      value: totalAnalyses > 0 ? `${avgMatch}%` : '0%',
      icon: Target,
      color: 'text-brand-success',
      bg: 'bg-brand-success/10',
    },
    {
      title: 'Best Match',
      value: totalAnalyses > 0 ? `${bestMatch}%` : '0%',
      icon: TrendingUp,
      color: 'text-brand-warning',
      bg: 'bg-brand-warning/10',
    },
    {
      title: 'Latest Score',
      value: latestScore !== null ? `${latestScore}%` : '—',
      icon: Sparkles,
      color: 'text-brand-primary',
      bg: 'bg-brand-primary/10',
    },
  ];

  const handleViewAnalysis = (item) => {
    viewAnalysis(item);
    navigate('/results');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const formatTimestamp = (timestamp) => {
    try {
      if (!timestamp) return 'Unknown Date';
      const date = typeof timestamp.toDate === 'function' ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleString();
    } catch {
      return 'Unknown Date';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-border bg-brand-card p-6 sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
                className="h-16 w-16 rounded-2xl border border-white/10 object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/20 border border-brand-primary/30 text-xl font-bold text-brand-primary">
                {getInitials(user?.displayName)}
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-brand-text mb-1">
                Welcome back, {user?.displayName || 'User'}!
              </h2>
              <p className="text-xs text-brand-text-muted max-w-lg">
                Analyze your resume against job descriptions and discover skill gaps with AI-powered insights.
              </p>
            </div>
          </div>

          <Link to="/upload" className="shrink-0">
            <Button variant="primary" size="lg" icon={Upload}>
              New Analysis
            </Button>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map(({ title, value, icon: Icon, color, bg }) => (
          <Card key={title}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] text-brand-text-dim uppercase font-bold tracking-wider">
                  {title}
                </p>
                <p className="text-2xl font-black text-brand-text mt-1.5">
                  {value}
                </p>
              </div>
              <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${bg}`}>
                <Icon className={`h-4.5 w-4.5 ${color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Recent Analyses */}
        <div className="lg:col-span-2 space-y-6">
          <Card
            title="Recent Analyses"
            subtitle="Your latest resume evaluations"
          >
            {hasHistory ? (
              <div className="space-y-3">
                {recentItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-brand-bg-start/40 border border-brand-border rounded-xl p-4 transition-all duration-200 hover:border-brand-border-hover gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0">
                        <FileText className="h-4.5 w-4.5 text-brand-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-brand-text truncate max-w-xs">
                          {item.fileName}
                        </p>
                        <p className="text-[10px] text-brand-text-dim mt-0.5">
                          {formatTimestamp(item.timestamp)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-4 shrink-0">
                      <span className={`text-base font-black ${
                        item.match_percentage >= 80
                          ? 'text-brand-success'
                          : item.match_percentage >= 60
                          ? 'text-brand-primary'
                          : 'text-brand-error'
                      }`}>
                        {item.match_percentage}%
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewAnalysis(item)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}

                <Link to="/history" className="block mt-4">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={History}
                    className="w-full"
                  >
                    View Complete History
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="text-center py-10 flex flex-col items-center justify-center">
                <FileText className="h-10 w-10 text-brand-text-dim mb-3" />
                <h4 className="text-sm font-bold text-brand-text mb-1">
                  No resume analyses yet
                </h4>
                <p className="text-xs text-brand-text-dim mb-5 max-w-sm">
                  Upload your first resume and get AI-powered insights.
                </p>
                <Link to="/upload">
                  <Button variant="primary" size="sm" icon={Plus}>
                    Start Analysis
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </div>

        {/* Right Side: Quick Actions */}
        <div className="space-y-6">
          <Card title="Quick Actions">
            <div className="space-y-3">
              {[
                {
                  name: 'Analyze a new resume',
                  link: '/upload',
                  icon: Upload,
                },
                {
                  name: 'View Results',
                  link: '/results',
                  icon: Target,
                },
                {
                  name: 'Profile Settings',
                  link: '/profile',
                  icon: Sparkles,
                },
              ].map(({ name, link, icon: Icon }) => (
                <Link to={link} key={name} className="block">
                  <div className="flex justify-between items-center bg-brand-bg-start/40 border border-brand-border rounded-xl p-4 hover:border-brand-primary/30 transition-all duration-200 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <Icon className="h-4.5 w-4.5 text-brand-primary" />
                      <span className="text-xs font-bold text-brand-text">
                        {name}
                      </span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-brand-text-dim" />
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Top Skills Detected Section */}
      <Card title="Top Skills Detected" subtitle="Keywords matched across all resume evaluations">
        {detectedSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {detectedSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-xl bg-brand-primary/10 text-brand-primary text-xs font-semibold flex items-center gap-2 border border-brand-primary/20 hover:bg-brand-primary/15 transition-all duration-200"
              >
                <Brain className="h-3.5 w-3.5" />
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-xs text-brand-text-dim italic">
            No skills detected yet. Run an analysis to populate skills list.
          </p>
        )}
      </Card>
    </div>
  );
}