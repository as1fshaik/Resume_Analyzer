import { useLocation } from 'react-router-dom';
import { Menu, Bell, Search } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../constants/navigation';

export default function Navbar({ onMenuClick }) {
  const location = useLocation();
  
  // Find current item in NAVIGATION_ITEMS by matching pathname
  const currentItem = NAVIGATION_ITEMS.find((item) => item.path === location.pathname);
  const pageTitle = currentItem ? currentItem.title : 'Resume Analyzer';

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between bg-brand-navbar border-b border-brand-border px-6 backdrop-blur-md">
      {/* Left side: Menu toggle for mobile and page title */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-brand-border text-brand-text hover:bg-white/10 lg:hidden cursor-pointer"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div className="flex flex-col">
          <h2 className="text-lg font-bold text-brand-text tracking-tight">
            {pageTitle}
          </h2>
          <p className="hidden sm:block text-[11px] text-brand-text-dim font-medium">
            Welcome back, Asif!
          </p>
        </div>
      </div>

      {/* Right side: Search, Notifications, Avatar */}
      <div className="flex items-center gap-3">
        {/* Search Bar Placeholder (inspired by reference) */}
        <div className="relative hidden md:flex items-center w-60">
          <Search className="absolute left-3.5 h-4 w-4 text-brand-text-dim" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full bg-brand-bg-start text-brand-text text-xs rounded-xl border border-brand-border py-2 pl-10 pr-4 outline-none placeholder:text-brand-text-dim focus:border-brand-primary"
            readOnly
          />
        </div>

        {/* Notifications Icon Placeholder */}
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-brand-card border border-brand-border text-brand-text-muted hover:text-brand-text hover:border-brand-border-hover cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-brand-primary">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-primary opacity-75"></span>
          </span>
        </button>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2.5 pl-1.5 border-l border-brand-border">
          <div className="relative h-9 w-9 rounded-xl bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center text-sm font-bold text-brand-primary select-none cursor-pointer">
            AA
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-brand-success border-2 border-brand-bg-start"></span>
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-semibold text-brand-text">Asif Ali</span>
            <span className="text-[10px] text-brand-text-dim">Free Plan</span>
          </div>
        </div>
      </div>
    </header>
  );
}
