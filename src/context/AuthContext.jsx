import { createContext, useContext, useState, useEffect } from "react";
import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, googleProvider, db } from "../services/firebase";
import { AlertTriangle } from "lucide-react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  // Monitor auth state changes on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    }, (error) => {
      console.error("Auth state change error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const loggedUser = result.user;

      // Upsert the user profile in Firestore
      const userRef = doc(db, "users", loggedUser.uid);
      await setDoc(userRef, {
        uid: loggedUser.uid,
        email: loggedUser.email,
        displayName: loggedUser.displayName,
        photoURL: loggedUser.photoURL,
        createdAt: loggedUser.metadata.creationTime || new Date().toISOString(),
        lastLoginAt: serverTimestamp(),
      }, { merge: true });

      return loggedUser;
    } catch (error) {
      console.error("Google sign-in error:", error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign-out error:", error);
      throw error;
    }
  };

  const logout = () => {
    setShowConfirm(true);
  };

  const value = {
    user,
    loading,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}

      {/* Global Warning Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div 
            className="w-full max-w-md bg-[#0c0f18] border border-white/5 rounded-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Subtle color glow accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent pointer-events-none" />

            <div className="flex flex-col items-center text-center gap-4 relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ef4444]/15 text-[#ef4444] animate-pulse">
                <AlertTriangle className="h-6 w-6" />
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-slate-50 mb-1.5 font-sans">
                  Confirm Sign Out
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-xs font-sans">
                  Are you sure you want to sign out of Hirable? You will need to log back in to access your synced analysis history.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full mt-2 font-sans">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 bg-white/5 border border-white/5 text-slate-200 hover:bg-white/10 font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    setShowConfirm(false);
                    await handleLogout();
                  }}
                  className="flex-1 bg-[#ef4444] hover:bg-[#ef4444]/80 text-white font-bold py-2.5 px-4 rounded-xl transition-all cursor-pointer text-xs shadow-md shadow-red-500/10"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
