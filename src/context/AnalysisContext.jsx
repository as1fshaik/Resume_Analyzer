import { createContext, useContext, useState, useCallback } from 'react';

const STORAGE_KEY = 'resume_analyzer_history';

const AnalysisContext = createContext(null);

function loadHistory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // ignore storage errors in demo mode
  }
}

export function AnalysisProvider({ children }) {
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [history, setHistory] = useState(loadHistory);

  const saveAnalysis = useCallback((result, meta = {}) => {
    const entry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      fileName: meta.fileName || 'Resume',
      jobTitle: meta.jobTitle || 'Job Application',
      ...result,
    };

    setCurrentAnalysis(entry);

    setHistory((prev) => {
      const updated = [entry, ...prev].slice(0, 20);
      saveHistory(updated);
      return updated;
    });

    return entry;
  }, []);

  const viewAnalysis = useCallback((entry) => {
    setCurrentAnalysis(entry);
  }, []);

  const clearCurrentAnalysis = useCallback(() => {
    setCurrentAnalysis(null);
  }, []);

  return (
    <AnalysisContext.Provider
      value={{
        currentAnalysis,
        history,
        saveAnalysis,
        viewAnalysis,
        clearCurrentAnalysis,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within AnalysisProvider');
  }
  return context;
}
