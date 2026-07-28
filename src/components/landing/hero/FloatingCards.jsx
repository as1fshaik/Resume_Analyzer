import { motion } from "framer-motion";

const floatingAnimation = {
  y: [0, -10, 0],
  rotate: [-1, 1, -1],
};

const floatingTransition = (delay) => ({
  duration: 5,
  repeat: Infinity,
  ease: "easeInOut",
  delay,
});

export default function FloatingCards() {
  return (
    <>
      {/* ATS Match */}
      <motion.div
        animate={floatingAnimation}
        transition={floatingTransition(0)}
        className="
          absolute
          top-2
          left-[54%]
          -translate-x-1/2
          z-30
          rounded-2xl
          border border-brand-border
          bg-brand-card/90
          backdrop-blur-xl
          px-5
          py-3
          shadow-2xl
        "
      >
        <p className="text-xs text-brand-text-muted">
          ATS Match
        </p>

        <h4 className="text-lg font-bold text-brand-primary">
          84%
        </h4>
      </motion.div>

      {/* Skills Matched */}
      <motion.div
        animate={floatingAnimation}
        transition={floatingTransition(0.8)}
        className="
          absolute
          top-40
          right-2
          z-30
          rounded-2xl
          border border-brand-border
          bg-brand-card/90
          backdrop-blur-xl
          px-5
          py-3
          shadow-2xl
        "
      >
        <p className="text-xs text-brand-text-muted">
          Skills Matched
        </p>

        <h4 className="text-lg font-bold text-green-500">
          12
        </h4>
      </motion.div>

      {/* Missing */}
      <motion.div
        animate={floatingAnimation}
        transition={floatingTransition(1.6)}
        className="
          absolute
          bottom-40
          right-10
          z-30
          rounded-2xl
          border border-brand-border
          bg-brand-card/90
          backdrop-blur-xl
          px-5
          py-3
          shadow-2xl
        "
      >
        <p className="text-xs text-brand-text-muted">
          Missing
        </p>

        <h4 className="text-lg font-bold text-red-500">
          5
        </h4>
      </motion.div>
    </>
  );
}