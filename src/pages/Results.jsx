import { Link } from 'react-router-dom';
import { ArrowLeft, Upload, FileText } from 'lucide-react';
import Button from '../components/common/Button';
import AnalysisResults from '../components/resume/AnalysisResults';
import { useAnalysis } from '../context/AnalysisContext';

export default function Results() {
  const { currentAnalysis } = useAnalysis();

  if (!currentAnalysis) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary mx-auto mb-6">
          <FileText className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-brand-text mb-2">No Analysis Results Yet</h2>
        <p className="text-sm text-brand-text-muted mb-8">
          Upload your resume and paste a job description to see your compatibility score and
          recommendations.
        </p>
        <Link to="/upload">
          <Button variant="primary" size="lg" icon={Upload}>
            Upload & Analyze
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-brand-text">Analysis Results</h2>
          <p className="text-xs text-brand-text-dim mt-1">
            {currentAnalysis.fileName} ·{' '}
            {new Date(currentAnalysis.timestamp).toLocaleString()}
          </p>
        </div>
        <Link to="/upload">
          <Button variant="secondary" size="sm" icon={ArrowLeft}>
            New Analysis
          </Button>
        </Link>
      </div>

      <AnalysisResults analysisResult={currentAnalysis} />
    </div>
  );
}
