import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const { loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      console.error('Sign-in error:', err);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg-start flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Logo className="justify-center mb-6" />
          <h1 className="text-2xl font-bold text-brand-text mb-2">Welcome to Hirable</h1>
          <p className="text-sm text-brand-text-muted">Sign in to access your free resume analyses</p>
        </div>

        <Card>
          <div className="space-y-6">
            {error && (
              <div className="bg-brand-error/15 border border-brand-error/30 text-brand-error text-xs rounded-xl p-3.5 font-semibold">
                {error}
              </div>
            )}

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3.5 bg-white text-black hover:bg-slate-100 font-bold py-3.5 px-4 rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:pointer-events-none text-sm"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-slate-700" />
              ) : (
                <FcGoogle className="h-5 w-5" />
              )}
              {loading ? 'Connecting...' : 'Sign In with Google'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-brand-border text-center">
            <p className="text-xs text-brand-text-dim mb-3">
              Google Account required for authentication
            </p>
            <Link to="/upload">
              <Button variant="ghost" size="sm" icon={Sparkles}>
                Skip to Upload
              </Button>
            </Link>
          </div>
        </Card>

        <p className="text-center text-xs text-brand-text-dim">
          <Link to="/" className="hover:text-brand-primary transition-colors">
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
