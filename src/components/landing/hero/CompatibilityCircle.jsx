import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CompatibilityCircle({ target = 84 }) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    let current = 0;

    const timer = setInterval(() => {
      current++;
      setScore(current);

      if (current >= target) {
        clearInterval(timer);
      }
    }, 18);

    return () => clearInterval(timer);
  }, [target]);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className="relative flex items-center justify-center w-72 h-72"
    >
      {/* Ambient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.18, 0.32, 0.18],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-60 h-60 rounded-full bg-brand-primary blur-3xl"
      />

      {/* Glass Circle */}
      <div className="absolute inset-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl" />

      {/* Scanner */}
      <div className="absolute inset-5 overflow-hidden rounded-full">
        <motion.div
          animate={{
            y: ["-100%", "250%"],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-full h-16 bg-gradient-to-b from-transparent via-brand-primary/20 to-transparent"
        />
      </div>

      {/* Progress Ring */}
      <svg
        className="absolute inset-0 -rotate-90"
        width="288"
        height="288"
      >
        <circle
          cx="144"
          cy="144"
          r={radius}
          stroke="rgba(255,255,255,.08)"
          strokeWidth="10"
          fill="none"
        />

        <circle
          cx="144"
          cy="144"
          r={radius}
          stroke="currentColor"
          className="text-brand-primary"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          style={{
            transition: "stroke-dashoffset .25s linear",
            filter: "drop-shadow(0 0 10px rgba(99,102,241,.45))",
          }}
        />
      </svg>

      {/* Center Content */}
      <div className="relative flex flex-col items-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-brand-text-muted">
          AI SCORE
        </p>

        <motion.h2
          key={score}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.15 }}
          className="mt-2 text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-primary"
        >
          {score}%
        </motion.h2>

        <p className="mt-2 text-xs uppercase tracking-[0.25em] text-brand-text-muted">
          Resume Match
        </p>
      </div>
    </motion.div>
  );
}