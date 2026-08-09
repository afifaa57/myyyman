import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Flower, FloatingHearts, InkButton } from "@/components/scrapbook/Bits";
import { sfx } from "@/lib/sfx";

/** "You got mail" — an illustrated envelope that physically opens. */
export default function MailEnvelope({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState(false);

  function handle() {
    if (open) return;
    sfx("envelope");
    setOpen(true);
    setTimeout(onDone, 2600);
  }

  return (
    <div
      className="scene-stage paper-grain relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: "var(--gradient-cream)" }}
    >
      <FloatingHearts count={5} />
      <motion.div
        animate={{ filter: open ? "blur(3px)" : "blur(0px)", opacity: open ? 0.5 : 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0"
        aria-hidden
      >
        <Flower className="absolute top-12 left-5 opacity-50" size={60} />
        <Flower className="absolute right-6 bottom-16 opacity-40" size={80} />
      </motion.div>

      <h2 className="relative mb-2 font-script text-5xl text-burgundy">You got mail!</h2>
      <p className="relative mb-10 font-serif-display text-[11px] tracking-[0.4em] text-ink-soft uppercase">
        a letter, sealed just for you
      </p>

      <motion.button
        onClick={handle}
        aria-label="Open the envelope"
        className="preserve-3d relative w-[280px] max-w-[80vw]"
        animate={open ? {} : { rotate: [0, -1.5, 1.5, 0] }}
        transition={{ duration: 3.6, repeat: open ? 0 : Infinity, repeatDelay: 1.2 }}
        whileTap={{ scale: 0.96 }}
      >
        {/* letter sliding out */}
        <motion.div
          className="absolute inset-x-4 bottom-6 origin-bottom"
          initial={{ y: 0, opacity: 0 }}
          animate={open ? { y: -150, opacity: 1, scale: 1.05 } : { y: 0, opacity: 0 }}
          transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="paper-sheet paper-grain h-40 rounded-[2px] p-4 text-left">
            <p className="font-hand text-lg text-ink-soft">Dear you,</p>
            <div className="mt-3 space-y-2">
              {[92, 80, 88, 60].map((w, idx) => (
                <span key={idx} className="block h-[3px] rounded bg-ink/15" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* envelope body */}
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[3px] border border-rose/30 bg-[oklch(0.955_0.024_30)] shadow-[var(--shadow-paper)]">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, transparent 46%, oklch(0.874 0.049 18 / 0.5) 50%, transparent 54%), linear-gradient(-135deg, transparent 46%, oklch(0.874 0.049 18 / 0.5) 50%, transparent 54%)",
            }}
          />
          <Flower className="absolute bottom-1 left-2 opacity-70" size={44} />
          <Flower className="absolute right-2 bottom-2 opacity-50" size={34} />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-hand text-xl text-burgundy/70">
            for you ♡
          </span>
        </div>

        {/* flap */}
        <motion.div
          className="absolute inset-x-0 top-0 h-1/2 origin-top preserve-3d"
          style={{ transformStyle: "preserve-3d" }}
          animate={open ? { rotateX: -172 } : { rotateX: 0 }}
          transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          <div
            className="h-full w-full backface-hidden"
            style={{
              background: "linear-gradient(180deg, oklch(0.93 0.035 25), oklch(0.9 0.045 22))",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              border: "1px solid oklch(0.72 0.105 14 / 0.3)",
            }}
          />
        </motion.div>

        {/* wax heart seal */}
        <motion.span
          animate={open ? { scale: 0, opacity: 0 } : { scale: [1, 1.07, 1] }}
          transition={open ? { duration: 0.4 } : { duration: 2.6, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 z-10 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-lg text-paper shadow-[0_4px_10px_-3px_rgba(0,0,0,0.4)]"
          style={{ background: "var(--gradient-rose)" }}
        >
          ♥
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {!open && (
          <motion.div exit={{ opacity: 0, y: 10 }} className="relative mt-12">
            <InkButton onClick={handle} variant="outline">
              Open me ❤️
            </InkButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
