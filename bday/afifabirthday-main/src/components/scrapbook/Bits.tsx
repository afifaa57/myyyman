import { motion, AnimatePresence, type Transition } from "motion/react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { sfx } from "@/lib/sfx";
import { cn } from "@/lib/utils";

export const EASE_PAPER: Transition = { duration: 0.9, ease: [0.16, 1, 0.3, 1] };

/* ── Tape ─────────────────────────────────────────────── */
export function Tape({
  className,
  rotate = -6,
  width = 74,
}: {
  className?: string;
  rotate?: number;
  width?: number;
}) {
  return (
    <motion.span
      aria-hidden
      whileTap={{ rotate: rotate + 3, scale: 1.04 }}
      style={{ rotate, width }}
      className={cn(
        "pointer-events-none absolute h-6 bg-blush/55 shadow-[0_1px_3px_rgba(0,0,0,0.12)]",
        "before:absolute before:inset-0 before:bg-[repeating-linear-gradient(90deg,transparent_0_3px,rgba(255,255,255,0.35)_3px_6px)]",
        className,
      )}
    />
  );
}

/* ── Paper sheet ──────────────────────────────────────── */
export function Paper({
  children,
  className,
  rotate = 0,
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
}) {
  return (
    <div
      style={{ rotate: `${rotate}deg` }}
      className={cn("paper-sheet paper-grain rounded-[3px] p-5", className)}
    >
      {children}
    </div>
  );
}

/* ── Buttons ──────────────────────────────────────────── */
export function InkButton({
  children,
  onClick,
  variant = "solid",
  className,
  type = "button",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "solid" | "ghost" | "outline";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileTap={{ scale: 0.94 }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      onClick={() => {
        sfx("click");
        onClick?.();
      }}
      className={cn(
        "relative min-h-11 select-none rounded-full px-6 py-2.5 text-base tracking-[0.14em] uppercase",
        "font-serif-display disabled:opacity-50",
        variant === "solid" &&
          "bg-burgundy text-paper shadow-[0_8px_20px_-8px_var(--burgundy)]",
        variant === "outline" && "border border-burgundy/40 text-burgundy",
        variant === "ghost" && "text-ink-soft",
        className,
      )}
    >
      {children}
    </motion.button>
  );
}

/* ── Floating hearts ──────────────────────────────────── */
export function FloatingHearts({ count = 8, burst = false }: { count?: number; burst?: boolean }) {
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: burst ? Math.random() * 0.3 : Math.random() * 6,
        dur: 4 + Math.random() * 4,
        size: 8 + Math.random() * 14,
      })),
    [count, burst],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {seeds.map((s) => (
        <span
          key={s.id}
          className="absolute bottom-0 text-rose/70"
          style={{
            left: `${s.x}%`,
            fontSize: s.size,
            animation: `drift-up ${s.dur}s ease-out ${s.delay}s infinite`,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

export function Sparkles({ count = 14 }: { count?: number }) {
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        d: Math.random() * 3,
      })),
    [count],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {seeds.map((s) => (
        <motion.span
          key={s.id}
          className="absolute text-gold"
          style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: 10 }}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, delay: s.d, repeat: Infinity, repeatDelay: 1.5 }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
}

/* ── Confetti ─────────────────────────────────────────── */
export function Confetti({ active }: { active: boolean }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        rot: Math.random() * 360,
        delay: Math.random() * 0.4,
        dur: 1.8 + Math.random() * 1.6,
        color: ["var(--rose)", "var(--blush)", "var(--gold)", "var(--burgundy)"][i % 4],
        w: 5 + Math.random() * 5,
        h: 9 + Math.random() * 8,
      })),
    [],
  );
  return (
    <AnimatePresence>
      {active && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          {pieces.map((p) => (
            <motion.span
              key={p.id}
              className="absolute top-[-8%]"
              style={{ left: `${p.x}%`, width: p.w, height: p.h, background: p.color, borderRadius: 1 }}
              initial={{ y: 0, opacity: 1, rotate: p.rot }}
              animate={{ y: "115vh", rotate: p.rot + 540, opacity: [1, 1, 0] }}
              transition={{ duration: p.dur, delay: p.delay, ease: "easeIn" }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

/* ── Typewriter ───────────────────────────────────────── */
export function useTypewriter(text: string, speed = 55, start = true) {
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!start) return;
    setOut("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, start]);
  return out;
}

export function TypeLine({
  text,
  speed = 55,
  className,
}: {
  text: string;
  speed?: number;
  className?: string;
}) {
  const out = useTypewriter(text, speed);
  return (
    <span className={className}>
      {out}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity }}
        className="ml-0.5 inline-block"
      >
        |
      </motion.span>
    </span>
  );
}

/* ── Decorative flourishes ────────────────────────────── */
export function Flower({ className, size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={cn("animate-sway origin-bottom", className)}
    >
      <g fill="none" stroke="var(--rose)" strokeWidth="2" opacity="0.75">
        <path d="M50 95 C48 70 46 55 50 40" />
        <path d="M50 66 C38 62 32 52 34 44 C44 44 50 54 50 66Z" fill="var(--blush)" fillOpacity=".5" />
        <path d="M50 58 C62 54 68 44 66 36 C56 36 50 46 50 58Z" fill="var(--blush)" fillOpacity=".5" />
      </g>
      <g fill="var(--blush)" stroke="var(--rose)" strokeWidth="1.6">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cx="50" cy="22" rx="9" ry="14" transform={`rotate(${a} 50 34)`} />
        ))}
      </g>
      <circle cx="50" cy="34" r="6" fill="var(--gold)" />
    </svg>
  );
}

export function Divider() {
  return (
    <div aria-hidden className="my-4 flex items-center justify-center gap-2 text-rose/70">
      <span className="h-px w-10 bg-rose/40" />
      <span className="text-xs">❦</span>
      <span className="h-px w-10 bg-rose/40" />
    </div>
  );
}

/* ── Page shell with 3D page-turn transition ──────────── */
export function ScenePage({
  children,
  className,
  dir = 1,
}: {
  children: ReactNode;
  className?: string;
  dir?: number;
}) {
  return (
    <motion.div
      className={cn("scene-stage relative min-h-[100dvh] w-full", className)}
      initial={{ rotateY: 32 * dir, x: 90 * dir, opacity: 0, filter: "blur(6px)" }}
      animate={{ rotateY: 0, x: 0, opacity: 1, filter: "blur(0px)" }}
      exit={{ rotateY: -26 * dir, x: -70 * dir, opacity: 0, filter: "blur(5px)" }}
      transition={EASE_PAPER}
      style={{ transformOrigin: dir > 0 ? "left center" : "right center" }}
    >
      {children}
    </motion.div>
  );
}
