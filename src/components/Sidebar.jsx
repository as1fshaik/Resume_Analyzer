import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import Logo from './common/Logo';
import { NAVIGATION_ITEMS } from '../constants/navigation';

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-brand-sidebar border-r border-brand-border px-5 py-6 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header with Logo and Mobile Close Button */}
        <div className="flex items-center justify-between mb-8">
          <Logo />
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-brand-border text-brand-text-muted hover:text-brand-text lg:hidden cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1">
          {NAVIGATION_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3 text-sm font-semibold rounded-xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary shadow-sm shadow-brand-primary/5'
                      : 'border-transparent text-brand-text-muted hover:text-brand-text hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`h-4.5 w-4.5 transition-colors ${isActive ? 'text-brand-primary' : 'text-brand-text-dim group-hover:text-brand-text'}`} />
                    <span>{item.title}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Card / Placeholder (Inspired by 'Upgrade to Pro' block in mockup) */}
        <div className="mt-auto bg-brand-card border border-brand-border rounded-2xl p-4 text-center">
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary mb-3">
            <span className="text-xs font-bold">PRO</span>
          </div>
          <h4 className="text-xs font-bold text-brand-text mb-1">Upgrade to Pro</h4>
          <p className="text-[10px] text-brand-text-dim mb-3">Unlock ATS analysis and detailed scoring insights.</p>
          <button className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white text-[11px] font-bold py-2 px-3 rounded-xl transition-all cursor-pointer">
            Upgrade Now
          </button>
        </div>
      </aside>
    </>
  );
}
