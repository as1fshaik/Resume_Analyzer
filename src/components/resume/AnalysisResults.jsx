import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Target,
} from 'lucide-react';
import Card from '../common/Card';

function getMatchLabel(percentage) {
  if (percentage >= 80) return { label: 'Excellent Match', color: 'text-brand-success' };
  if (percentage >= 60) return { label: 'Good Match', color: 'text-brand-primary' };
  if (percentage >= 40) return { label: 'Moderate Match', color: 'text-brand-warning' };
  return { label: 'Needs Improvement', color: 'text-brand-error' };
}

function getRecommendations(analysisResult) {
  const recommendations = [];
  const { match_percentage, missing_skills, common_skills, additional_skills } = analysisResult;

  if (match_percentage >= 80) {
    recommendations.push({
      type: 'success',
      text: 'Your resume aligns well with this role. Highlight your matched skills prominently in your summary section.',
    });
  } else if (match_percentage >= 60) {
    recommendations.push({
      type: 'info',
      text: 'You have a solid foundation. Focus on tailoring your resume language to mirror the job description keywords.',
    });
  } else if (match_percentage >= 40) {
    recommendations.push({
      type: 'warning',
      text: 'Consider updating your resume to include more of the required technical skills before applying.',
    });
  } else {
    recommendations.push({
      type: 'error',
      text: 'This role may require significant skill gaps to address. Review missing skills and consider upskilling or a closer-fit role.',
    });
  }

  if (missing_skills?.length > 0) {
    const topMissing = missing_skills.slice(0, 3).join(', ');
    recommendations.push({
      type: 'warning',
      text: `Add or emphasize these missing skills: ${topMissing}. Include relevant projects or certifications if applicable.`,
    });
  }

  if (common_skills?.length > 0) {
    recommendations.push({
      type: 'success',
      text: `Lead with your strengths: ${common_skills.slice(0, 4).join(', ')} — place these near the top of your skills section.`,
    });
  }

  if (additional_skills?.length > 0) {
    recommendations.push({
      type: 'info',
      text: `You have bonus skills (${additional_skills.slice(0, 3).join(', ')}) not listed in the job — mention them if they add value to the role.`,
    });
  }

  return recommendations;
}

function RecommendationIcon({ type }) {
  if (type === 'success') return <CheckCircle className="h-4 w-4 text-brand-success shrink-0 mt-0.5" />;
  if (type === 'warning') return <AlertTriangle className="h-4 w-4 text-brand-warning shrink-0 mt-0.5" />;
  if (type === 'error') return <AlertCircle className="h-4 w-4 text-brand-error shrink-0 mt-0.5" />;
  return <Lightbulb className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />;
}

export default function AnalysisResults({ analysisResult, showTextPreview = true }) {
  if (!analysisResult) return null;

  const matchInfo = getMatchLabel(analysisResult.match_percentage);
  const recommendations = getRecommendations(analysisResult);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Score Hero */}
      <Card className="overflow-hidden">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 via-transparent to-brand-primary/5 pointer-events-none" />
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 py-4">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-brand-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-brand-text-dim">
                  Compatibility Score
                </span>
              </div>
              <span className="text-6xl font-black text-brand-primary tracking-tight">
                {analysisResult.match_percentage}%
              </span>
              <span className={`text-sm font-bold mt-1 ${matchInfo.color}`}>
                {matchInfo.label}
              </span>
            </div>

            <div className="flex-1 w-full max-w-lg space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-brand-bg-start/80 border border-brand-border rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-brand-success">
                    {analysisResult.common_skills?.length ?? 0}
                  </p>
                  <p className="text-[10px] text-brand-text-dim font-semibold uppercase">Matched</p>
                </div>
                <div className="bg-brand-bg-start/80 border border-brand-border rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-brand-error">
                    {analysisResult.missing_skills?.length ?? 0}
                  </p>
                  <p className="text-[10px] text-brand-text-dim font-semibold uppercase">Missing</p>
                </div>
                <div className="bg-brand-bg-start/80 border border-brand-border rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-brand-primary">
                    {analysisResult.additional_skills?.length ?? 0}
                  </p>
                  <p className="text-[10px] text-brand-text-dim font-semibold uppercase">Extra</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-brand-text-muted mb-2">
                  <span className="flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5" /> Match Rate
                  </span>
                  <span>{analysisResult.match_percentage}%</span>
                </div>
                <div className="w-full h-3 bg-brand-bg-start border border-brand-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-primary to-brand-primary-hover rounded-full transition-all duration-1000"
                    style={{ width: `${analysisResult.match_percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Recommendations */}
      <Card title="Recommendations" subtitle="Actionable tips to improve your application">
        <ul className="space-y-3">
          {recommendations.map((rec, index) => (
            <li
              key={index}
              className="flex items-start gap-3 bg-brand-bg-start/50 border border-brand-border rounded-xl p-4"
            >
              <RecommendationIcon type={rec.type} />
              <p className="text-xs text-brand-text-muted leading-relaxed">{rec.text}</p>
            </li>
          ))}
        </ul>
      </Card>

      {/* Skill breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Matched Skills" subtitle="Present in both resume and job">
          <div className="flex flex-wrap gap-1.5 max-h-60 overflow-y-auto">
            {analysisResult.common_skills?.length > 0 ? (
              analysisResult.common_skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-[10px] font-bold rounded-lg border bg-brand-success/10 text-brand-success border-brand-success/20 tracking-wide uppercase"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-brand-text-dim italic flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5" /> No matching skills found.
              </span>
            )}
          </div>
        </Card>

        <Card title="Missing Skills" subtitle="Required by job but not in resume">
          <div className="flex flex-wrap gap-1.5 max-h-60 overflow-y-auto">
            {analysisResult.missing_skills?.length > 0 ? (
              analysisResult.missing_skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-[10px] font-bold rounded-lg border bg-brand-error/10 text-brand-error border-brand-error/20 tracking-wide uppercase"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-brand-success font-semibold italic flex items-center gap-1.5">
                <CheckCircle className="h-3.5 w-3.5" /> All required skills matched!
              </span>
            )}
          </div>
        </Card>

        <Card title="Additional Skills" subtitle="In resume but not requested">
          <div className="flex flex-wrap gap-1.5 max-h-60 overflow-y-auto">
            {analysisResult.additional_skills?.length > 0 ? (
              analysisResult.additional_skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-[10px] font-bold rounded-lg border bg-brand-primary/10 text-brand-primary border-brand-primary/20 tracking-wide uppercase"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-brand-text-dim italic">No additional skills detected.</span>
            )}
          </div>
        </Card>
      </div>

      {/* Full skill lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Resume Skills Detected" subtitle="All skills found in your resume">
          <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
            {analysisResult.resume_skills?.length > 0 ? (
              analysisResult.resume_skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-[10px] font-semibold rounded-md border bg-white/5 text-brand-text-muted border-brand-border"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-brand-text-dim italic">No skills found in resume.</span>
            )}
          </div>
        </Card>

        <Card title="Job Skills Required" subtitle="All skills found in job description">
          <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
            {analysisResult.job_skills?.length > 0 ? (
              analysisResult.job_skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 text-[10px] font-semibold rounded-md border bg-white/5 text-brand-text-muted border-brand-border"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-xs text-brand-text-dim italic">No skills found in job description.</span>
            )}
          </div>
        </Card>
      </div>

      {/* Text preview */}
      {showTextPreview && analysisResult.resume_text && (
        <Card
          title="Extracted Resume Text Preview"
          subtitle="First 500 characters of parsed resume text"
          headerAction={
            <div className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-[10px] font-bold px-2 py-1 rounded-lg">
              {analysisResult.resume_text.length} chars
            </div>
          }
        >
          <div className="w-full bg-brand-bg-start border border-brand-border rounded-xl p-4 max-h-60 overflow-y-auto">
            <pre className="text-xs text-brand-text-muted whitespace-pre-wrap font-mono leading-relaxed">
              {analysisResult.resume_text.substring(0, 500)}
              {analysisResult.resume_text.length > 500 && '...'}
            </pre>
          </div>
        </Card>
      )}
    </div>
  );
}
