import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Heart, Mail } from "lucide-react";
import config from "@/config/birthdayConfig";
import { FloatingHearts, InkButton, TypeLine, Sparkles } from "@/components/scrapbook/Bits";
import { sfx, unlockAudio } from "@/lib/sfx";

const INTRO = ["pssst...", "I made something for you.", "But first..."];

const WRONG = [
  "Hmm... nope 😭",
  "Think harder...",
  "Are you seriously forgetting this? 💀",
  "Okay fine... here's a hint 👀",
];

export default function SecretLogin({ onUnlock }: { onUnlock: (name: string) => void }) {
  const [step, setStep] = useState(0); // 0..2 intro lines, 3 envelope opens, 4 form
  const [name, setName] = useState("");
  const [pw, setPw] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [shake, setShake] = useState(0);
  const [msg, setMsg] = useState<string | null>(null);
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (step >= 4) return;
    const delays = [1500, 2200, 1600, 1500];
    const t = setTimeout(() => {
      if (step === 2) sfx("envelope");
      setStep((s) => s + 1);
    }, delays[step] ?? 1400);
    return () => clearTimeout(t);
  }, [step]);

  function submit() {
    unlockAudio();
    if (pw.trim().toLowerCase() === config.password.toLowerCase()) {
      sfx("heart");
      setGranted(true);
      setTimeout(() => onUnlock(name.trim() || config.name), 3400);
      return;
    }
    const n = attempts + 1;
    setAttempts(n);
    setShake((s) => s + 1);
    sfx("thud");
    setMsg(WRONG[Math.min(n, WRONG.length) - 1] ?? WRONG[3]!);
  }

  return (
    <div className="film-grain relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden bg-night px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 40%, oklch(0.72 0.105 14 / 0.22), transparent 70%)",
        }}
      />

      <AnimatePresence mode="wait">
        {/* ── cinematic intro ── */}
        {step < 4 && !granted && (
          <motion.div
            key="intro"
            exit={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
            transition={{ duration: 0.9 }}
            className="relative flex flex-col items-center gap-10"
          >
            <motion.div
              animate={
                step >= 3
                  ? { scale: [1, 1.15, 24], opacity: [1, 1, 0], rotateX: [0, -25, -60] }
                  : { y: [0, -6, 0] }
              }
              transition={step >= 3 ? { duration: 1.4, ease: "easeIn" } : { duration: 4, repeat: Infinity }}
              className="relative"
            >
              <div
                aria-hidden
                className="absolute -inset-10 rounded-full blur-2xl"
                style={{ background: "radial-gradient(circle, oklch(0.874 0.049 18 / 0.35), transparent 70%)" }}
              />
              <Mail className="relative size-16 text-blush" strokeWidth={1} />
            </motion.div>

            <p className="min-h-8 font-serif-display text-2xl tracking-wide text-blush/90">
              {step < 3 && <TypeLine key={step} text={INTRO[step] ?? ""} speed={70} />}
            </p>
          </motion.div>
        )}

        {/* ── login card ── */}
        {step >= 4 && !granted && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 40, rotateX: 18 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-sm"
          >
            <motion.div
              key={shake}
              animate={shake ? { x: [0, -12, 11, -8, 6, 0] } : {}}
              transition={{ duration: 0.45 }}
              className="paper-grain relative rounded-[4px] border border-blush/25 bg-paper/95 p-7 shadow-[0_30px_70px_-30px_black]"
            >
              <h1 className="text-center font-serif-display text-2xl leading-tight font-medium tracking-wide text-ink">
                WAIT... WHO ARE YOU? 👀
              </h1>
              <p className="mt-2 text-center font-hand text-lg text-ink-soft">
                This little website is private.
              </p>

              <div className="mt-6 space-y-4">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  autoComplete="off"
                  className="w-full border-b border-ink/25 bg-transparent px-1 py-2.5 font-hand text-xl text-ink outline-none placeholder:text-ink-soft/60 focus:border-rose"
                />
                <input
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submit()}
                  type="password"
                  placeholder="Enter the secret password..."
                  autoComplete="off"
                  className="w-full border-b border-ink/25 bg-transparent px-1 py-2.5 font-hand text-xl text-ink outline-none placeholder:text-ink-soft/60 focus:border-rose"
                />
              </div>

              <AnimatePresence>
                {msg && (
                  <motion.p
                    key={msg + attempts}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 text-center font-hand text-lg text-burgundy"
                  >
                    {msg}
                  </motion.p>
                )}
              </AnimatePresence>

              {attempts >= 4 && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2 text-center font-hand text-base text-rose"
                >
                  hint: {config.passwordHint}
                </motion.p>
              )}

              <motion.div
                animate={attempts ? { rotate: [0, -2.5, 2.5, 0] } : {}}
                transition={{ duration: 0.5, repeat: attempts ? Infinity : 0, repeatDelay: 2.2 }}
                className="mt-7 flex justify-center"
              >
                <InkButton onClick={submit}>Enter my surprise ❤️</InkButton>
              </motion.div>

              <p className="mt-4 text-center text-[10px] tracking-widest text-ink-soft/60 uppercase">
                not real security · just us
              </p>

              {attempts > 0 && <FloatingHearts count={5} burst />}
            </motion.div>
          </motion.div>
        )}

        {/* ── access granted ── */}
        {granted && (
          <motion.div
            key="granted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative flex flex-col items-center gap-6 text-center"
          >
            <Sparkles count={18} />
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: [0, 1.25, 1], rotate: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <div
                aria-hidden
                className="absolute -inset-12 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, oklch(0.72 0.105 14 / 0.45), transparent 70%)" }}
              />
              <Heart className="relative size-24 fill-rose text-rose" strokeWidth={0.8} />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ delay: 1.6, duration: 0.9 }}
              className="font-serif-display text-xl text-blush uppercase"
            >
              Access granted ✓
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.4 }}
              className="font-hand text-xl text-paper/80"
            >
              Okay... you're officially allowed in ❤️
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
