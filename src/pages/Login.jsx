import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';

export default function Login() {
  const navigate = useNavigate();

  const handleDemoLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-brand-bg-start flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Logo className="justify-center mb-6" />
          <h1 className="text-2xl font-bold text-brand-text mb-2">Welcome Back</h1>
          <p className="text-sm text-brand-text-muted">Sign in to access your resume analyses</p>
        </div>

        <Card>
          <form onSubmit={handleDemoLogin} className="space-y-4">
            <Input label="Email" type="email" placeholder="you@example.com" defaultValue="asif@example.com" />
            <Input label="Password" type="password" placeholder="••••••••" defaultValue="demo1234" />

            <Button type="submit" variant="primary" size="lg" className="w-full" icon={ArrowRight} iconPosition="right">
              Sign In (Demo)
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-brand-border text-center">
            <p className="text-xs text-brand-text-dim mb-3">
              Demo mode — no authentication required
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
