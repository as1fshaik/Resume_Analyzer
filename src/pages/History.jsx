import { Link } from 'react-router-dom';
import { History, Upload, FileText, Trash2 } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useAnalysis } from '../context/AnalysisContext';

export default function HistoryPage() {
  const { history, viewAnalysis } = useAnalysis();

  const handleView = (entry) => {
    viewAnalysis(entry);
  };

  if (history.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary mx-auto mb-6">
          <History className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-brand-text mb-2">No History Yet</h2>
        <p className="text-sm text-brand-text-muted mb-8">
          Your past analyses will appear here after you run your first resume match.
        </p>
        <Link to="/upload">
          <Button variant="primary" size="lg" icon={Upload}>
            Start First Analysis
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h2 className="text-lg font-bold text-brand-text">Analysis History</h2>
        <p className="text-xs text-brand-text-dim mt-1">
          {history.length} past {history.length === 1 ? 'analysis' : 'analyses'} stored locally
        </p>
      </div>

      <div className="space-y-4">
        {history.map((entry) => (
          <Card key={entry.id}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-text">{entry.fileName}</p>
                  <p className="text-xs text-brand-text-dim mt-0.5">
                    {new Date(entry.timestamp).toLocaleString()}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-success/10 text-brand-success border border-brand-success/20">
                      {entry.common_skills?.length ?? 0} matched
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-error/10 text-brand-error border border-brand-error/20">
                      {entry.missing_skills?.length ?? 0} missing
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:shrink-0">
                <div className="text-right">
                  <p
                    className={`text-2xl font-black ${
                      entry.match_percentage >= 70
                        ? 'text-brand-success'
                        : entry.match_percentage >= 50
                          ? 'text-brand-warning'
                          : 'text-brand-error'
                    }`}
                  >
                    {entry.match_percentage}%
                  </p>
                  <p className="text-[10px] text-brand-text-dim font-semibold uppercase">Match</p>
                </div>
                <Link to="/results" onClick={() => handleView(entry)}>
                  <Button variant="secondary" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <p className="text-center text-xs text-brand-text-dim flex items-center justify-center gap-1.5">
        <Trash2 className="h-3.5 w-3.5" />
        History is stored in your browser (localStorage). Clearing browser data will remove it.
      </p>
    </div>
  );
}
