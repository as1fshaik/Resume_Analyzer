import { Sparkles } from 'lucide-react';

export default function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 border border-brand-primary/30 shadow-sm shadow-brand-primary/20">
        <Sparkles className="h-5 w-5 text-brand-primary" />
      </div>
      <div className="flex flex-col">
        <span className="text-base font-bold tracking-tight text-brand-text">
          Resume Analyzer
        </span>
        <span className="text-[10px] font-medium text-brand-primary tracking-widest uppercase">
          AI Powered
        </span>
      </div>
    </div>
  );
}
