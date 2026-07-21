import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import { useAnalysis } from '../../context/AnalysisContext';

export default function ResumeUpload() {
  const navigate = useNavigate();
  const { saveAnalysis } = useAnalysis();

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [extractedText, setExtractedText] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const fileInputRef = useRef(null);

  const validateFile = (selectedFile) => {
    setError('');
    setSuccess('');

    if (!selectedFile) return false;

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    const isValidType =
      allowedTypes.includes(selectedFile.type) || ['pdf', 'docx'].includes(fileExtension);

    if (!isValidType) {
      setError('Invalid file type. Please upload a PDF or DOCX file.');
      setFile(null);
      return false;
    }

    const maxSizeBytes = 5 * 1024 * 1024;
    if (selectedFile.size > maxSizeBytes) {
      setError('File is too large. Maximum size allowed is 5 MB.');
      setFile(null);
      return false;
    }

    setFile(selectedFile);
    return true;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files?.[0]) {
      validateFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('http://localhost:5000/api/resume/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || `Upload failed with status ${response.status}`);
      }

      if (data?.text) {
        setSuccess('Resume uploaded and parsed successfully!');
        setExtractedText(data.text);
      } else {
        setError('Failed to extract text from the resume.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError(
        err.message || 'An error occurred during resume upload. Make sure backend servers are running.'
      );
    } finally {
      setUploading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a resume file first.');
      return;
    }
    if (!jobDescription?.trim()) {
      setError('Please paste a job description to perform comparison.');
      return;
    }

    setUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('job_description', jobDescription);

    try {
      const response = await fetch('http://localhost:5000/api/resume/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || `Analysis failed with status ${response.status}`);
      }

      saveAnalysis(data, {
        fileName: file.name,
        jobTitle: jobDescription.split('\n')[0].slice(0, 60) || 'Job Application',
      });

      navigate('/results');
    } catch (err) {
      console.error('Analysis error:', err);
      setError(
        err.message ||
          'An error occurred during matching analysis. Make sure backend servers are running.'
      );
    } finally {
      setUploading(false);
    }
  };

  const canAnalyze = file && jobDescription.trim() && !uploading;

  return (
    <div className="space-y-8 w-full max-w-5xl mx-auto pb-12">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        {['Upload Resume', 'Add Job Description', 'Analyze'].map((step, i) => (
          <div key={step} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold border ${
                  (i === 0 && file) || (i === 1 && jobDescription.trim()) || (i === 2 && canAnalyze)
                    ? 'bg-brand-primary/20 border-brand-primary/40 text-brand-primary'
                    : 'bg-brand-card border-brand-border text-brand-text-dim'
                }`}
              >
                {i + 1}
              </span>
              <span className="hidden sm:inline text-xs font-semibold text-brand-text-muted">{step}</span>
            </div>
            {i < 2 && <div className="w-6 sm:w-12 h-px bg-brand-border" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resume Upload */}
        <Card title="Resume Document" subtitle="Upload your resume in PDF or DOCX format (Max 5 MB)">
          <div className="flex flex-col items-center justify-center h-full">
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`relative w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all duration-200 min-h-[220px] cursor-pointer
                ${
                  dragActive
                    ? 'border-brand-primary bg-brand-primary/5 scale-[0.99]'
                    : 'border-brand-border bg-brand-bg-start/50 hover:border-brand-primary/30 hover:bg-brand-primary/5'
                }`}
              onClick={onButtonClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.docx"
                onChange={handleChange}
                disabled={uploading}
              />

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl mb-4 transition-colors ${
                  dragActive ? 'bg-brand-primary/20' : 'bg-brand-primary/10'
                }`}
              >
                <UploadCloud
                  className={`h-7 w-7 transition-colors ${dragActive ? 'text-brand-primary' : 'text-brand-text-dim'}`}
                />
              </div>

              <p className="text-sm text-brand-text font-semibold text-center mb-1">
                Drag & drop your resume here
              </p>
              <p className="text-xs text-brand-text-dim text-center mb-4">PDF or DOCX · Max 5 MB</p>

              <Button
                variant="secondary"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onButtonClick();
                }}
                disabled={uploading}
              >
                Browse Files
              </Button>
            </div>

            {file && (
              <div className="flex items-center gap-3 w-full bg-brand-bg-start border border-brand-border rounded-xl p-4 mt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-brand-text truncate">{file.name}</p>
                  <p className="text-xs text-brand-text-dim">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB · Ready to analyze
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={handleUpload} disabled={uploading}>
                  {uploading ? 'Parsing...' : 'Parse Only'}
                </Button>
              </div>
            )}
          </div>
        </Card>

        {/* Job Description */}
        <Card title="Job Description" subtitle="Paste the target job description to match skills">
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the full job description here...

Example: We are looking for a Full Stack Developer with experience in React, Node.js, Python, and PostgreSQL..."
            disabled={uploading}
            className="w-full min-h-[220px] bg-brand-bg-start text-brand-text text-sm rounded-xl border border-brand-border p-4 outline-none placeholder:text-brand-text-dim focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 resize-y font-sans transition-all leading-relaxed"
          />
          <p className="text-[11px] text-brand-text-dim mt-3">
            {jobDescription.length > 0
              ? `${jobDescription.length} characters entered`
              : 'Include required skills and technologies for best results'}
          </p>
        </Card>
      </div>

      {/* Actions & Alerts */}
      <div className="flex flex-col items-center gap-4">
        <Button
          variant="primary"
          size="lg"
          onClick={handleAnalyze}
          disabled={!canAnalyze}
          icon={uploading ? Loader2 : Sparkles}
          className={`w-full max-w-lg ${uploading ? '[&_svg]:animate-spin' : ''}`}
        >
          {uploading ? 'Analyzing Compatibility...' : 'Analyze Resume Match'}
        </Button>

        {!file && !jobDescription.trim() && (
          <p className="text-xs text-brand-text-dim text-center">
            Upload a resume and paste a job description to begin analysis
          </p>
        )}

        {success && (
          <div className="flex items-start gap-3 w-full max-w-lg bg-brand-success/10 border border-brand-success/20 rounded-xl p-4 text-brand-success">
            <CheckCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-semibold">{success}</p>
          </div>
        )}

        {error && (
          <div className="flex items-start gap-3 w-full max-w-lg bg-brand-error/10 border border-brand-error/20 rounded-xl p-4 text-brand-error">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-semibold">{error}</p>
          </div>
        )}
      </div>

      {/* Parse preview (parse-only flow preserved) */}
      {extractedText && (
        <Card
          title="Extracted Resume Text Preview"
          subtitle="Scrollable view of the first 500 characters of parsed resume text"
          headerAction={
            <div className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-[10px] font-bold px-2 py-1 rounded-lg">
              {extractedText.length} chars
            </div>
          }
        >
          <div className="w-full bg-brand-bg-start border border-brand-border rounded-xl p-4 max-h-60 overflow-y-auto">
            <pre className="text-xs text-brand-text-muted whitespace-pre-wrap font-mono leading-relaxed">
              {extractedText.substring(0, 500)}
              {extractedText.length > 500 && '...'}
            </pre>
          </div>
          <div className="mt-4 flex justify-end">
            <Button
              variant="secondary"
              size="sm"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => {
                if (jobDescription.trim()) handleAnalyze();
              }}
              disabled={!jobDescription.trim() || uploading}
            >
              Continue to Full Analysis
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
