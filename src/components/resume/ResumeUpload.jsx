import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, FileText, CheckCircle, AlertOctagon, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';
import { useAnalysis } from '../../context/AnalysisContext';
import { API_URL } from '../../constants';

export default function ResumeUpload() {
  const { saveAnalysis } = useAnalysis();
  const navigate = useNavigate();
  
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  
  // Custom multi-stage loading states
  const [loadingStage, setLoadingStage] = useState('');
  
  // Job Matching specific states
  const [jobDescription, setJobDescription] = useState('');
  
  const fileInputRef = useRef(null);
  const loadingTimerRef = useRef(null);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) clearInterval(loadingTimerRef.current);
    };
  }, []);

  // Manage loading stage phases while uploading
  const startLoadingStages = () => {
    setLoadingStage('Extracting skills...');
    const startTime = Date.now();

    loadingTimerRef.current = setInterval(() => {
      const elapsedSeconds = (Date.now() - startTime) / 1000;
      
      if (elapsedSeconds >= 4) {
        setLoadingStage('Generating recommendations...');
      } else if (elapsedSeconds >= 2) {
        setLoadingStage('Comparing job requirements...');
      } else {
        setLoadingStage('Extracting skills...');
      }
    }, 100);
  };

  const stopLoadingStages = () => {
    if (loadingTimerRef.current) {
      clearInterval(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }
    setLoadingStage('');
  };

  // Validate file type and size (Max 5 MB)
  const validateFile = (selectedFile) => {
    setError(null);
    setSuccess('');
    
    if (!selectedFile) return false;

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    const isValidType = allowedTypes.includes(selectedFile.type) || ['pdf', 'docx'].includes(fileExtension);
    
    if (!isValidType) {
      setError({
        title: 'Invalid File Type',
        message: 'Please upload a PDF or DOCX file.',
      });
      setFile(null);
      return false;
    }

    const maxSizeBytes = 5 * 1024 * 1024; // 5 MB
    if (selectedFile.size > maxSizeBytes) {
      setError({
        title: 'File Too Large',
        message: 'Maximum size allowed is 5 MB.',
      });
      setFile(null);
      return false;
    }

    setFile(selectedFile);
    return true;
  };

  // Drag & Drop handlers
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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  // Change input handler
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateFile(e.target.files[0]);
    }
  };

  // Trigger file browser input click
  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  // Parse Resume Only (Old implementation preserved but integrated with saveAnalysis)
  const handleUpload = async () => {
    if (!file) {
      setError({
        title: 'No File Selected',
        message: 'Please select a file to upload.',
      });
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess('');
    startLoadingStages();

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch(`${API_URL}/api/resume/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || `Upload failed with status ${response.status}`);
      }

      if (data && data.text) {
        setSuccess('Resume parsed successfully!');
      } else {
        throw new Error('Failed to extract text from the resume.');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError({
        title: 'Analysis Failed',
        message: 'Unable to analyze this resume. Please check your file format and try again.',
      });
    } finally {
      setUploading(false);
      stopLoadingStages();
    }
  };

  // Analyze Resume and Job Description Match
  const handleAnalyze = async () => {
    if (!file) {
      setError({
        title: 'No File Selected',
        message: 'Please upload a resume file first.',
      });
      return;
    }
    if (!jobDescription || !jobDescription.trim()) {
      setError({
        title: 'Empty Job Description',
        message: 'Please paste a job description to perform comparison.',
      });
      return;
    }

    console.log("[1] Analyze button clicked");
    setUploading(true);
    setError(null);
    setSuccess('');
    startLoadingStages();

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('job_description', jobDescription);

    try {
      console.log("[2] Sending /api/resume/analyze");
      const response = await fetch(`${API_URL}/api/resume/analyze`, {
        method: 'POST',
        body: formData,
      });

      console.log("[3] API response status:", response.status);
      const data = await response.json();
      console.log("[4] API response JSON:", data);

      if (!response.ok) {
        throw new Error(data.error || data.message || `Analysis failed with status ${response.status}`);
      }

      setSuccess('Match analysis completed successfully!');
      
      // Save result globally to context history and localStorage
      console.log("[5] saveAnalysis called with data:", data);
      await saveAnalysis(data, { fileName: file.name });
      
      // Redirect directly to results tab
      console.log("[6] navigating to /results");
      navigate('/results');
    } catch (err) {
      console.error('Analysis error:', err);
      setError({
        title: 'Analysis Failed',
        message: 'Unable to analyze this resume. Please check your file format and try again.',
      });
    } finally {
      setUploading(false);
      stopLoadingStages();
    }
  };

  // Handle error reset and retry action
  const handleRetry = () => {
    setError(null);
    setSuccess('');
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Auto click browse file browser to focus user
    setTimeout(() => {
      onButtonClick();
    }, 100);
  };

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      
      {/* Upload Column Split */}
      {!uploading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
          {/* Left Card: Resume Upload */}
          <Card title="Resume Document" subtitle="Upload your resume in PDF or DOCX format (Max 5 MB)">
            <div className="flex flex-col items-center justify-center h-full">
              {/* Drag & Drop zone */}
              <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                className={`relative w-full border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-200 min-h-[180px] 
                  ${dragActive 
                    ? 'border-brand-primary bg-brand-primary/5 scale-[0.99]' 
                    : 'border-brand-border bg-brand-bg-start/50 hover:border-brand-border-hover'}`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx"
                  onChange={handleChange}
                  disabled={uploading}
                />

                <UploadCloud className={`h-10 w-10 mb-3 transition-colors duration-200 ${dragActive ? 'text-brand-primary' : 'text-brand-text-dim'}`} />
                
                <p className="text-xs text-brand-text font-semibold text-center mb-1">
                  Drag & Drop your file here
                </p>
                <p className="text-[10px] text-brand-text-dim text-center mb-3">
                  PDF or DOCX only
                </p>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={onButtonClick}
                  disabled={uploading}
                >
                  Browse File
                </Button>
              </div>

              {/* Selected File Details */}
              {file && (
                <div className="flex items-center gap-3 w-full bg-brand-card hover:bg-brand-card-hover border border-brand-border rounded-xl p-3.5 mt-4 transition-all">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary shrink-0">
                    <FileText className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-brand-text truncate">
                      {file.name}
                    </p>
                    <p className="text-[9px] text-brand-text-dim">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleUpload}
                    disabled={uploading}
                    className="text-xs hover:bg-brand-primary/10 hover:text-brand-primary"
                  >
                    Parse Text
                  </Button>
                </div>
              )}
            </div>
          </Card>

          {/* Right Card: Job Description */}
          <Card title="Job Description" subtitle="Paste the target job description to match skills">
            <div className="flex flex-col h-full gap-4">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here..."
                disabled={uploading}
                className="w-full min-h-[180px] bg-brand-bg-start text-brand-text text-xs rounded-xl border border-brand-border p-4 outline-none placeholder:text-brand-text-dim focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 resize-y font-sans transition-all"
              />
            </div>
          </Card>
        </div>
      )}

      {/* Structured Loading View */}
      {uploading && (
        <Card className="max-w-md mx-auto py-10 text-center animate-fadeIn">
          <div className="flex flex-col items-center justify-center gap-5">
            <div className="relative flex items-center justify-center h-16 w-16">
              <div className="absolute inset-0 rounded-full border-4 border-brand-primary/10" />
              <Loader2 className="h-10 w-10 text-brand-primary animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-text mb-1">
                Analyzing your resume...
              </h3>
              <p className="text-xs text-brand-primary font-bold tracking-wide uppercase mt-1 animate-pulse">
                {loadingStage}
              </p>
            </div>
            <div className="w-full max-w-[200px] h-1.5 bg-brand-bg-start border border-brand-border rounded-full overflow-hidden mt-2">
              <div className="h-full bg-brand-primary rounded-full animate-loadingBar" style={{ width: '60%' }} />
            </div>
          </div>
        </Card>
      )}

      {/* Professional Error Recovery Card */}
      {error && !uploading && (
        <Card className="max-w-md mx-auto py-8 text-center border-brand-error/25 bg-brand-error/5 animate-fadeIn">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-error/15 text-brand-error">
              <AlertOctagon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-text">
                {error.title}
              </h3>
              <p className="text-xs text-brand-text-muted mt-2 max-w-xs mx-auto leading-relaxed">
                {error.message}
              </p>
            </div>
            <Button
              variant="secondary"
              size="md"
              icon={RefreshCw}
              onClick={handleRetry}
              className="mt-2 hover:bg-brand-error/10 hover:text-brand-error hover:border-brand-error/20"
            >
              Retry Upload
            </Button>
          </div>
        </Card>
      )}

      {/* Trigger analyze match buttons (only if inputs present and not active) */}
      {!uploading && !error && file && jobDescription.trim() && (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <Button
            variant="primary"
            size="lg"
            onClick={handleAnalyze}
            disabled={uploading}
            icon={Sparkles}
            className="w-full max-w-md"
          >
            Analyze Resume Match
          </Button>
        </div>
      )}

      {/* Success Banner (if any) */}
      {success && !uploading && !error && (
        <div className="flex items-start gap-3 w-full bg-brand-success/10 border border-brand-success/20 rounded-xl p-3.5 text-brand-success max-w-4xl mx-auto">
          <CheckCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
          <p className="text-xs font-semibold">{success}</p>
        </div>
      )}
    </div>
  );
}
