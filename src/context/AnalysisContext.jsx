import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../services/firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

const STORAGE_KEY = 'resume_analyzer_history_fallback';
const AnalysisContext = createContext(null);

// Optional LocalStorage fallbacks for development caching
function loadLocalFallback() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveLocalFallback(history) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Ignore storage errors in demo/dev mode
  }
}

export function AnalysisProvider({ children }) {
  const { user } = useAuth();
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch analysis history from Firestore
  const fetchAnalyses = useCallback(async () => {
    if (!user) {
      setHistory([]);
      return;
    }
    setLoading(true);
    try {
      const q = query(
        collection(db, 'users', user.uid, 'analyses'),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          ...data,
          // Convert Firestore Timestamp to ISO string for compatibility with existing components
          timestamp: data.timestamp || (data.createdAt ? data.createdAt.toMillis() : Date.now()),
        };
      });
      setHistory(items);
      saveLocalFallback(items); // Keep dev cache updated
    } catch (err) {
      console.warn('Firestore fetch failed, falling back to local storage cache:', err);
      // Fallback to local storage in case of permissions or offline development
      const fallbackItems = loadLocalFallback();
      setHistory(fallbackItems);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Listen to user auth switches and load/clear state accordingly
  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      fetchAnalyses();
    } else {
      setHistory([]);
      setCurrentAnalysis(null);
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user, fetchAnalyses]);

  // Save analysis to Firestore (omitting resume_text for privacy)
  const saveAnalysis = useCallback(
    async (result, meta = {}) => {
      if (!user) return null;

      // Extract result properties, omitting the raw resume_text parameter
      const entry = {
        fileName: meta.fileName || 'Resume',
        jobTitle: meta.jobTitle || 'Job Application',
        match_percentage: result.match_percentage || 0,
        common_skills: result.common_skills || [],
        missing_skills: result.missing_skills || [],
        additional_skills: result.additional_skills || [],
        resume_skills: result.resume_skills || [],
        job_skills: result.job_skills || [],
        recommendations: result.recommendations || [],
        createdAt: new Date().toISOString(),
        timestamp: Date.now(),
      };

      // Create local entry immediately to update React state instantly without blocking
      const localId = `local_${Date.now()}`;
      const tempEntry = {
        id: localId,
        ...entry,
      };

      setCurrentAnalysis(tempEntry);
      setHistory((prev) => [tempEntry, ...prev]);

      // Fire off Firestore write in the background
      addDoc(collection(db, 'users', user.uid, 'analyses'), {
        ...entry,
        createdAt: serverTimestamp(),
      })
        .then((docRef) => {
          // Swap temp ID with actual Firestore ID
          const finalEntry = {
            ...tempEntry,
            id: docRef.id,
          };
          setCurrentAnalysis(finalEntry);
          setHistory((prev) => {
            const updated = prev.map((item) => (item.id === localId ? finalEntry : item));
            saveLocalFallback(updated);
            return updated;
          });
        })
        .catch((err) => {
          console.error('Firestore save failed:', err);
          // Update cache with the local history
          setHistory((prev) => {
            saveLocalFallback(prev);
            return prev;
          });
        });

      return tempEntry;
    },
    [user]
  );

  // Delete analysis from Firestore
  const deleteAnalysis = useCallback(
    async (id) => {
      if (!user) return;
      try {
        // If it is a local storage dev entry, delete locally only
        if (id.toString().startsWith('local_')) {
          setHistory((prev) => {
            const updated = prev.filter((item) => item.id !== id);
            saveLocalFallback(updated);
            return updated;
          });
          if (currentAnalysis?.id === id) {
            setCurrentAnalysis(null);
          }
          return;
        }

        await deleteDoc(doc(db, 'users', user.uid, 'analyses', id));
        setHistory((prev) => prev.filter((item) => item.id !== id));
        if (currentAnalysis?.id === id) {
          setCurrentAnalysis(null);
        }
      } catch (err) {
        console.error('Firestore deletion failed:', err);
      }
    },
    [user, currentAnalysis]
  );

  // Update analysis inside Firestore (For extensibility)
  const updateAnalysis = useCallback(
    async (id, updates) => {
      if (!user) return;
      try {
        if (id.toString().startsWith('local_')) {
          setHistory((prev) => {
            const updated = prev.map((item) =>
              item.id === id ? { ...item, ...updates } : item
            );
            saveLocalFallback(updated);
            return updated;
          });
          return;
        }

        await updateDoc(doc(db, 'users', user.uid, 'analyses', id), updates);
        setHistory((prev) =>
          prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
        );
        if (currentAnalysis?.id === id) {
          setCurrentAnalysis((prev) => ({ ...prev, ...updates }));
        }
      } catch (err) {
        console.error('Firestore update failed:', err);
      }
    },
    [user, currentAnalysis]
  );

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
        loading,
        saveAnalysis,
        viewAnalysis,
        deleteAnalysis,
        updateAnalysis,
        clearCurrentAnalysis,
        fetchAnalyses,
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
