import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Logo from "./common/Logo";
import Button from "./common/Button";

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 w-full h-20 border-b border-brand-border bg-brand-bg-start/80 backdrop-blur-xl flex items-center justify-between px-6 md:px-8 shrink-0">
      <div className="flex items-center">
        {/* Mobile Hamburger Menu Button */}
        <button
          onClick={onMenuClick}
          className="p-2.5 mr-3 rounded-xl bg-white/5 border border-brand-border text-brand-text-muted hover:text-brand-text lg:hidden cursor-pointer transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Mobile Logo Only (Sidebar has Logo on Desktop) */}
        <div className="lg:hidden">
          <Logo />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {user && (
          <>
            <div className="flex items-center gap-3 mr-2">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="h-8 w-8 rounded-full border border-white/10"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary/20 text-xs font-bold text-brand-primary border border-brand-primary/30">
                  {user.displayName ? user.displayName.split(" ").map(n => n[0]).join("") : "U"}
                </div>
              )}
              <span className="hidden sm:inline text-xs font-bold text-brand-text">
                {user.displayName || "User"}
              </span>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={logout}
            >
              Logout
            </Button>
          </>
        )}
      </div>
    </header>
  );
}