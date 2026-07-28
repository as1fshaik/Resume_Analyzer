import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Main Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,.12) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Blue Glow */}
      <motion.div
        animate={{
          x: [0, 80, -40, 0],
          y: [0, -60, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 left-10 w-[500px] h-[500px]
                   rounded-full bg-cyan-500/20 blur-[120px]"
      />

      {/* Purple Glow */}
      <motion.div
        animate={{
          x: [0, -70, 60, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 w-[450px] h-[450px]
                   rounded-full bg-violet-500/20 blur-[120px]"
      />

      {/* Small Floating Glow */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="absolute top-1/2 left-1/2
                   w-64 h-64
                   rounded-full
                   bg-sky-400/10
                   blur-3xl"
      />
    </div>
  );
}