import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import config from "@/config/birthdayConfig";
import { FloatingHearts, Paper, Tape } from "@/components/scrapbook/Bits";
import { sfx } from "@/lib/sfx";

export default function SecurityChallenge({
  name,
  onDone,
}: {
  name: string;
  onDone: () => void;
}) {
  const [i, setI] = useState(0);
  const [wrong, setWrong] = useState(false);
  const [win, setWin] = useState(false);
  const q = config.challenges[i]!;

  function pick(idx: number) {
    if (idx === q.correct) {
      sfx("sparkle");
      setWrong(false);
      setWin(true);
      setTimeout(() => {
        setWin(false);
        if (i + 1 >= config.challenges.length) onDone();
        else setI(i + 1);
      }, 1600);
    } else {
      sfx("thud");
      setWrong(true);
    }
  }

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-paper px-5 py-12">
      <FloatingHearts count={4} />
      <p className="mb-6 text-center font-hand text-2xl text-burgundy">
        Prove you're actually {name} 😭
      </p>

      <div className="relative w-full max-w-sm">
        <Tape className="-top-3 left-1/2 -translate-x-1/2" rotate={-4} />
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: -30, rotate: 3 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Paper className="px-6 py-8" rotate={-1}>
              <p className="text-center text-[11px] tracking-[0.3em] text-ink-soft uppercase">
                question {i + 1} / {config.challenges.length}
              </p>
              <h2 className="mt-3 text-center font-serif-display text-2xl leading-snug text-ink">
                {q.question}
              </h2>

              <div className="mt-6 space-y-3">
                {q.options.map((opt, idx) => (
                  <motion.button
                    key={opt}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => pick(idx)}
                    className="block w-full rounded-[2px] border border-ink/15 bg-paper/70 px-4 py-3 text-left font-hand text-xl text-ink transition-colors hover:border-rose hover:bg-blush/20"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence>
                {wrong && (
                  <motion.p
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: [0, -8, 8, 0] }}
                    exit={{ opacity: 0 }}
                    className="mt-5 text-center font-hand text-lg text-burgundy"
                  >
                    Wrong answer 😂 Try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </Paper>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {win && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.4 }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div className="rounded-full bg-paper/85 px-6 py-4 text-center shadow-[var(--shadow-lift)] backdrop-blur-sm">
                <span className="font-script text-3xl text-burgundy">{q.success}</span>
              </div>
              <FloatingHearts count={10} burst />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
