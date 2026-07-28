import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import Logo from "../common/Logo";
import Button from "../common/Button";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      console.log({
        currentScrollY,
        lastScrollY,
        hidden,
      });
      
      if (currentScrollY <= 20) {
        setHidden(false);
      } else if (currentScrollY > lastScrollY) {
        setHidden(true);
      } else if (currentScrollY < lastScrollY) {
        setHidden(false);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("Navbar hidden:", hidden);
  }, [hidden]);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-brand-bg-start/30 border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <Logo />

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium text-brand-text-muted hover:text-brand-primary transition-colors"
          >
            Features
          </a>

          <a
            href="#how-it-works"
            className="text-sm font-medium text-brand-text-muted hover:text-brand-primary transition-colors"
          >
            How It Works
          </a>

          <a
            href="#about"
            className="text-sm font-medium text-brand-text-muted hover:text-brand-primary transition-colors"
          >
            About
          </a>
        </nav>

        {/* Right Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
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

              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>

              <Button
                variant="secondary"
                size="sm"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>

              <Link to="/upload">
                <Button
                  variant="primary"
                  size="sm"
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Start Free Analysis
                </Button>
              </Link>
            </>
          )}
        </div>

      </div>
    </motion.header>
  );
}