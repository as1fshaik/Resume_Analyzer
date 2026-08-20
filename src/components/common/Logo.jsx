import { Link } from "react-router-dom";
import logo from "../../assets/Hirable_logo.png";

export default function Logo({ className = "" }) {
  return (
    <Link to="/" className={`flex items-center gap-2 sm:gap-3 hover:opacity-90 transition-opacity ${className}`}>
      {/* Logo */}
      <img
        src={logo}
        alt="Hirable Logo"
        className="h-10 w-10 sm:h-14 sm:w-14 object-contain"
      />

      {/* Brand */}
      <div className="flex flex-col leading-none">
        <span className="text-lg sm:text-xl font-extrabold tracking-tight text-brand-text">
          Hirable
        </span>

        <span className="mt-1 text-[10px] uppercase tracking-[0.3em] text-brand-primary hidden sm:block">
          Stand Out. Get Hired.
        </span>
      </div>
    </Link>
  );
}