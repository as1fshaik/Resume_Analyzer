import { forwardRef } from "react";
import { FileText, CheckCircle2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const skills = [
  "Java",
  "React",
  "Spring Boot",
  "MySQL",
  "Git",
];

const ResumeCard = forwardRef((props, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50, rotate: -8 }}
      animate={{
        opacity: 1,
        x: 0,
        rotate: -6,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className="w-72 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.45)]"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/20">
            <FileText
              className="text-brand-primary"
              size={20}
            />
          </div>

          <div>
            <h3 className="font-semibold text-white">
              Resume.pdf
            </h3>

            <p className="text-xs text-gray-400">
              ATS Optimized
            </p>
          </div>
        </div>

        <Sparkles
          size={18}
          className="text-brand-primary"
        />
      </div>

      {/* Skills */}
      <div className="space-y-3 p-5">
        {skills.map((skill, index) => (
          <motion.div
            key={skill}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.4 + index * 0.12,
            }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2
                size={17}
                className="text-green-400"
              />

              <span className="text-sm text-gray-200">
                {skill}
              </span>
            </div>

            <span className="text-xs text-green-400">
              ✓
            </span>
          </motion.div>
        ))}
      </div>

      {/* Scanner */}
      <div className="relative h-2 overflow-hidden bg-white/10">
        <motion.div
          animate={{
            x: ["-120%", "250%"],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-y-0 w-24 bg-cyan-400 blur-sm"
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4">
        <span className="text-xs font-medium text-brand-primary">
          AI is scanning your resume...
        </span>

        <motion.div
          animate={{
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
          }}
          className="flex gap-1"
        >
          <div className="h-2 w-2 rounded-full bg-brand-primary" />
          <div className="h-2 w-2 rounded-full bg-brand-primary" />
          <div className="h-2 w-2 rounded-full bg-brand-primary" />
        </motion.div>
      </div>
    </motion.div>
  );
});

ResumeCard.displayName = "ResumeCard";

export default ResumeCard;