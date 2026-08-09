import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import config from "@/config/birthdayConfig";
import { Confetti, FloatingHearts, Flower, Sparkles } from "@/components/scrapbook/Bits";
import { sfx } from "@/lib/sfx";

/** 21 + 22: cinematic reveal, then the final secret envelope. */
export default function FinalReveal({ name }: { name: string }) {
  const [phase, setPhase] = useState(0); // 0 black, 1 heart, 2 photo+text, 3 envelope offer
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1100),
      setTimeout(() => {
        setPhase(2);
        sfx("sparkle");
      }, 2600),
      setTimeout(() => setPhase(3), 7000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="film-grain relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-night px-6">
      {/* background photo */}
      <motion.img
        src={config.heroPhoto}
        alt=""
        aria-hidden
        width={1024}
        height={1280}
        className="absolute inset-0 size-full object-cover"
        initial={{ opacity: 0, scale: 1.18 }}
        animate={phase >= 2 ? { opacity: 0.5, scale: 1 } : { opacity: 0 }}
        transition={{ duration: 4, ease: "easeOut" }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, oklch(0.16 0.018 30 / 0.55), oklch(0.16 0.018 30 / 0.8))" }}
      />

      <Confetti active={phase >= 2} />

      <AnimatePresence>
        {phase >= 1 && phase < 2 && (
          <motion.div
            key="heart"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 6], opacity: [0, 1, 0] }}
            transition={{ duration: 1.6, ease: "easeIn" }}
            className="relative"
          >
            <Heart className="size-16 fill-rose text-rose" strokeWidth={0.6} />
          </motion.div>
        )}
      </AnimatePresence>

      {phase >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6 }}
          className="relative text-center"
        >
          <Sparkles count={16} />
          <FloatingHearts count={7} />
          <motion.p
            initial={{ letterSpacing: "0.7em", opacity: 0 }}
            animate={{ letterSpacing: "0.28em", opacity: 1 }}
            transition={{ duration: 2 }}
            className="font-serif-display text-2xl text-paper uppercase sm:text-3xl"
          >
            Happy Birthday ❤️
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.4 }}
            className="mt-1 font-script text-6xl text-blush"
          >
            {name}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1.4 }}
            className="mt-3 font-hand text-xl text-paper/80"
          >
            You are worth celebrating.
          </motion.p>
          <Flower className="mx-auto mt-6 opacity-70" size={54} />
        </motion.div>
      )}

      {/* final secret envelope */}
      <AnimatePresence>
        {phase >= 3 && !envelopeOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="relative mt-12 flex flex-col items-center"
          >
            <p className="mb-4 font-hand text-xl text-paper/85">There's one more thing...</p>
            <motion.button
              onClick={() => {
                sfx("envelope");
                setEnvelopeOpen(true);
              }}
              whileTap={{ scale: 0.94 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="relative h-20 w-32 rounded-[3px] border border-blush/40 bg-[oklch(0.94_0.03_28)] shadow-[0_20px_40px_-18px_black]"
              aria-label="Open the final envelope"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1/2"
                style={{
                  background: "oklch(0.9 0.045 22)",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                }}
              />
              <span className="absolute top-1/2 left-1/2 z-10 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-sm text-paper"
                style={{ background: "var(--gradient-rose)" }}>
                ♥
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {envelopeOpen && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.85, rotateX: 25 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-10 w-full max-w-sm"
          >
            <div className="paper-sheet paper-grain rounded-[2px] px-6 py-8 text-center">
              {config.finalMessage
                .trim()
                .split("\n")
                .map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 + i * 0.4, duration: 0.9 }}
                    className="font-hand text-[21px] leading-relaxed text-ink"
                  >
                    {line || "\u00A0"}
                  </motion.p>
                ))}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4, duration: 1 }}
                className="mt-4 font-script text-3xl text-burgundy"
              >
                — {config.senderName}
              </motion.p>
            </div>
            <FloatingHearts count={9} burst />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
