import { motion } from "framer-motion";

export default function ConnectorLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      viewBox="0 0 1000 560"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Premium Gradient */}
        <linearGradient
          id="connectorGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop
            offset="0%"
            stopColor="#6366F1"
            stopOpacity="0"
          />

          <stop
            offset="50%"
            stopColor="#6366F1"
            stopOpacity="1"
          />

          <stop
            offset="100%"
            stopColor="#6366F1"
            stopOpacity="0"
          />
        </linearGradient>

        {/* Glow */}
        <filter id="glow">
          <feGaussianBlur
            stdDeviation="3"
            result="coloredBlur"
          />

          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Resume → Circle */}
      <motion.path
        d="M270 180 C360 180 420 235 500 280"
        fill="none"
        stroke="url(#connectorGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="10 10"
        filter="url(#glow)"
        initial={{
          pathLength: 0,
        }}
        animate={{
          pathLength: 1,
          strokeDashoffset: [40, 0],
        }}
        transition={{
          pathLength: {
            duration: 1.3,
            ease: "easeOut",
          },
          strokeDashoffset: {
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      />

      {/* Circle → Top Card */}
      <motion.path
        d="M500 280 C620 260 700 180 760 140"
        fill="none"
        stroke="url(#connectorGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="10 10"
        filter="url(#glow)"
        initial={{
          pathLength: 0,
        }}
        animate={{
          pathLength: 1,
          strokeDashoffset: [40, 0],
        }}
        transition={{
          pathLength: {
            duration: 1.3,
            delay: 0.3,
            ease: "easeOut",
          },
          strokeDashoffset: {
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      />

      {/* Circle → Bottom Card */}
      <motion.path
        d="M500 280 C620 320 690 390 760 420"
        fill="none"
        stroke="url(#connectorGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="10 10"
        filter="url(#glow)"
        initial={{
          pathLength: 0,
        }}
        animate={{
          pathLength: 1,
          strokeDashoffset: [40, 0],
        }}
        transition={{
          pathLength: {
            duration: 1.3,
            delay: 0.5,
            ease: "easeOut",
          },
          strokeDashoffset: {
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      />

      {/* Moving Energy Particle 1 */}
      <motion.circle
        r="4"
        fill="#6366F1"
        filter="url(#glow)"
      >
        <animateMotion
          dur="3s"
          repeatCount="indefinite"
          path="M270 180 C360 180 420 235 500 280"
        />
      </motion.circle>

      {/* Moving Energy Particle 2 */}
      <motion.circle
        r="4"
        fill="#6366F1"
        filter="url(#glow)"
      >
        <animateMotion
          dur="3.5s"
          repeatCount="indefinite"
          path="M500 280 C620 260 700 180 760 140"
        />
      </motion.circle>

      {/* Moving Energy Particle 3 */}
      <motion.circle
        r="4"
        fill="#6366F1"
        filter="url(#glow)"
      >
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path="M500 280 C620 320 690 390 760 420"
        />
      </motion.circle>
    </svg>
  );
}