import { motion } from "motion/react";

export function AnimatedBackground() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(50%_40%_at_50%_20%,black,transparent)]">
        <Grid />
      </div>
      <LanguageMarquee />
      <motion.div
        className="pointer-events-none absolute -top-20 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-sky-500/40 via-teal-400/30 to-amber-500/40 blur-3xl"
        animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function LanguageMarquee() {
  const rows = [
    "नेपाली • हिन्दी • বাংলা • தமிழ் • తెలుగు • भाषानुवाद",
    "සිංහල • 中文 • 日本語 • 한국어 • العربية • Français • Deutsch",
    "English • Español • Português • Русский • Italiano • Türkçe • ไทย",
  ];
  return (
    <div className="absolute inset-0 opacity-20 select-none">
      {rows.map((text, i) => (
        <motion.div
          key={i}
          className="absolute left-[-20%] right-[-20%] top-[30%] md:top-[35%] text-2xl md:text-4xl font-semibold whitespace-nowrap"
          style={{ top: `calc(${15 + i * 12}% )` }}
          animate={{ x: ["-10%", "10%", "-10%" ] }}
          transition={{ duration: 30 + i * 4, repeat: Infinity, ease: "linear" }}
        >
          <span className="mx-4 font-['Noto Sans Devanagari'],sans-serif">{text}</span>
        </motion.div>
      ))}
    </div>
  );
}

function Grid() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
        </pattern>
        <radialGradient id="fade" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
      <rect width="100%" height="100%" fill="url(#fade)" />
    </svg>
  );
}