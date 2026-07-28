import { motion } from "framer-motion";

import ResumeCard from "./ResumeCard";
import CompatibilityCircle from "./CompatibilityCircle";
import FloatingCards from "./FloatingCards";
import ConnectorLines from "./ConnectorLines";

export default function HeroAnimation() {
  return (
    <motion.div
      className="relative flex items-center justify-center w-full h-[580px] overflow-visible"
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.22, 0.4, 0.22],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[420px] h-[420px] rounded-full bg-brand-primary/20 blur-3xl"
      />

      {/* Connector Lines */}
      <ConnectorLines />

      {/* Resume Card */}
      <motion.div
        className="absolute left-[-20px] top-12 z-10"
        animate={{
          y: [0, -6, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <ResumeCard />
      </motion.div>

      {/* AI Score */}
      <motion.div
        className="relative z-20"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      >
        <CompatibilityCircle target={84} />
      </motion.div>

      {/* Floating Cards */}
      <FloatingCards />
    </motion.div>
  );
}