import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { InkButton, Flower } from "@/components/scrapbook/Bits";
import { sfx } from "@/lib/sfx";

const LINES = [
  "Preparing your surprise...",
  "Finding memories...",
  "Wrapping your gifts...",
  "Almost ready...",
];

export default function CinematicLoading({ onDone }: { onDone: () => void }) {
  const [i, setI] = useState(0);
  const ready = i >= LINES.length;

  useEffect(() => {
    if (ready) return;
    const t = setTimeout(() => {
      sfx("paper");
      setI((v) => v + 1);
    }, 1350);
    return () => clearTimeout(t);
  }, [i, ready]);

  return (
    <div className="paper-grain relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "var(--gradient-cream)" }}>
      <Flower className="absolute top-10 left-6 opacity-60" size={54} />
      <Flower className="absolute right-7 bottom-14 opacity-50" size={68} />

      <div className="relative h-24 w-full max-w-xs">
        <AnimatePresence mode="wait">
          {!ready ? (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.55 }}
              className="absolute inset-0 flex items-center justify-center text-center font-serif-display text-xl tracking-wide text-ink-soft"
            >
              {LINES[i]}
            </motion.p>
          ) : (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <InkButton onClick={onDone}>Open it ❤️</InkButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 h-px w-40 overflow-hidden bg-ink/10">
        <motion.div
          className="h-full bg-rose"
          initial={{ width: "0%" }}
          animate={{ width: `${Math.min(100, (i / LINES.length) * 100)}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </div>
  );
}
