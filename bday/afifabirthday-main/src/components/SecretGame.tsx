import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import config from "@/config/birthdayConfig";
import { FloatingHearts, InkButton, Paper, Sparkles, Tape } from "@/components/scrapbook/Bits";
import { sfx } from "@/lib/sfx";

const PRESS_LINES = [
  "I LITERALLY TOLD YOU 😭",
  "You really have zero self-control.",
  "Fine...",
];

export default function SecretGame({ onDone }: { onDone: () => void }) {
  const [answer, setAnswer] = useState<string | null>(null);
  const [runaway, setRunaway] = useState({ x: 0, y: 0, moved: 0 });
  const [presses, setPresses] = useState(0);
  const [dark, setDark] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [revealSecret, setRevealSecret] = useState(false);

  function press() {
    const n = presses + 1;
    setPresses(n);
    sfx("thud");
    if (n >= 3) {
      setDark(true);
      setTimeout(() => {
        setUnlocked(true);
        sfx("sparkle");
      }, 1400);
      setTimeout(() => setRevealSecret(true), 3200);
    }
  }

  return (
    <div
      className="paper-grain relative min-h-[100dvh] overflow-hidden px-5 py-14"
      style={{ background: "var(--gradient-cream)" }}
    >
      {/* ── 17. funny question ── */}
      <div className="mx-auto max-w-sm">
        <h2 className="text-center font-script text-4xl text-burgundy">Okay... serious question.</h2>
        <p className="mt-2 text-center font-serif-display text-lg text-ink-soft">
          How much do you love this website?
        </p>

        <div className="relative mt-8 flex flex-col items-center gap-3">
          <InkButton onClick={() => { setAnswer("a lot"); sfx("heart"); }}>A LOT ❤️</InkButton>
          <InkButton variant="outline" onClick={() => { setAnswer("a little"); sfx("click"); }}>
            A LITTLE
          </InkButton>
          <motion.button
            animate={{ x: runaway.x, y: runaway.y }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            onPointerEnter={() => bolt()}
            onClick={() => bolt()}
            className="min-h-11 rounded-full border border-ink/20 px-6 py-2.5 font-serif-display text-base tracking-[0.14em] text-ink-soft uppercase"
          >
            I WANT TO LEAVE 😭
          </motion.button>
        </div>

        <AnimatePresence>
          {answer && (
            <motion.p
              key={answer}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 text-center font-hand text-xl text-burgundy"
            >
              {answer === "a lot"
                ? "Correct answer. Obviously. ❤️"
                : answer === "a little"
                  ? "A little?? I stayed up making this 😭"
                  : ""}
            </motion.p>
          )}
          {runaway.moved > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-center font-hand text-xl text-rose"
            >
              {runaway.moved < 3 ? "Nice try 😂" : "You're staying."}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── 18. don't press ── */}
      <div className="mx-auto mt-16 max-w-sm">
        <div className="relative">
          <Tape className="-top-3 left-6" rotate={-8} />
          <Paper rotate={1.2} className="px-6 py-8 text-center">
            <p className="font-serif-display text-sm tracking-[0.4em] text-ink-soft uppercase">
              Don't touch this.
            </p>
            <motion.div
              animate={presses ? { x: [0, -10, 10, -6, 0] } : {}}
              key={presses}
              className="mt-6 flex justify-center"
            >
              <button
                onClick={press}
                className="min-h-12 rounded-full px-7 py-3 font-serif-display tracking-[0.2em] text-paper uppercase shadow-[0_10px_24px_-10px_var(--burgundy)]"
                style={{ background: "var(--gradient-rose)" }}
              >
                Do not press
              </button>
            </motion.div>
            <AnimatePresence mode="wait">
              {presses > 0 && (
                <motion.p
                  key={presses}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-5 font-hand text-xl text-burgundy"
                >
                  {PRESS_LINES[Math.min(presses, PRESS_LINES.length) - 1]}
                </motion.p>
              )}
            </AnimatePresence>
          </Paper>
        </div>
      </div>

      <div className="mt-14 flex justify-center">
        <InkButton onClick={onDone} variant="outline">
          Continue
        </InkButton>
      </div>

      {/* ── 19. hidden memory ── */}
      <AnimatePresence>
        {dark && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-night px-8 text-center"
          >
            {unlocked && <Sparkles count={18} />}
            {!unlocked ? (
              <motion.span
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="font-serif-display text-sm tracking-[0.5em] text-paper/50 uppercase"
              >
                ...
              </motion.span>
            ) : (
              <>
                <motion.p
                  initial={{ opacity: 0, letterSpacing: "0.7em" }}
                  animate={{ opacity: 1, letterSpacing: "0.35em" }}
                  transition={{ duration: 1 }}
                  className="font-serif-display text-lg text-blush uppercase"
                >
                  Secret unlocked 🔓
                </motion.p>
                <AnimatePresence>
                  {revealSecret && (
                    <motion.div
                      initial={{ opacity: 0, y: 30, rotate: -5, scale: 0.85 }}
                      animate={{ opacity: 1, y: 0, rotate: -2, scale: 1 }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-8 w-full max-w-[250px] bg-paper p-3 pb-10 shadow-[0_40px_80px_-30px_black]"
                    >
                      <img
                        src={config.secretPhoto}
                        alt="a hidden memory"
                        width={768}
                        height={960}
                        className="aspect-[4/5] w-full object-cover sepia-[0.15]"
                      />
                      <p className="mt-2 font-hand text-lg text-ink">{config.secretMessage}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <FloatingHearts count={8} burst />
                {revealSecret && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    onClick={() => {
                      setDark(false);
                      setUnlocked(false);
                      setRevealSecret(false);
                      setPresses(0);
                    }}
                    className="mt-8 font-serif-display text-[11px] tracking-[0.35em] text-paper/70 uppercase"
                  >
                    close
                  </motion.button>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  function bolt() {
    sfx("click");
    setRunaway((r) => ({
      x: (Math.random() - 0.5) * 200,
      y: (Math.random() - 0.5) * 120,
      moved: r.moved + 1,
    }));
  }
}
