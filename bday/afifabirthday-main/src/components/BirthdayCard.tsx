import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import config from "@/config/birthdayConfig";
import { Flower, InkButton, Sparkles, Tape } from "@/components/scrapbook/Bits";
import { sfx } from "@/lib/sfx";

/** Large vintage birthday card that physically opens in 3D. */
export default function BirthdayCard({ name, onDone }: { name: string; onDone: () => void }) {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    if (open) return;
    setOpen(true);
    sfx("page");
    setTimeout(() => sfx("sparkle"), 900);
    setTimeout(onDone, 3000);
  }

  const ordinal = `${config.age}${["th", "st", "nd", "rd"][(config.age % 10 > 3 || (config.age % 100) - (config.age % 10) === 10) ? 0 : config.age % 10]}`;

  return (
    <div
      className="scene-stage paper-grain relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-5 py-10"
      style={{ background: "var(--gradient-cream)" }}
    >
      <Flower className="absolute -top-2 -left-3 opacity-50" size={90} />
      <Flower className="absolute -right-4 bottom-2 rotate-180 opacity-40" size={110} />

      <motion.div
        className="preserve-3d relative w-full max-w-[340px]"
        animate={
          open
            ? { scale: [1, 1.04, 1.5], y: [0, -14, -30], filter: ["blur(0px)", "blur(0px)", "blur(3px)"] }
            : {}
        }
        transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* inside page */}
        <div className="paper-sheet paper-grain relative aspect-[3/4.2] w-full overflow-hidden rounded-[3px] px-6 py-10">
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="font-script text-4xl text-rose">a little world</p>
            <p className="mt-3 font-hand text-xl text-ink-soft">made entirely of you</p>
            <Flower size={64} className="mt-6 opacity-70" />
          </div>
          <AnimatePresence>{open && <Sparkles count={20} />}</AnimatePresence>
        </div>

        {/* front cover */}
        <motion.div
          className="preserve-3d backface-hidden absolute inset-0 cursor-pointer"
          style={{ transformOrigin: "left center" }}
          animate={
            open
              ? { rotateY: -158, boxShadow: "40px 30px 60px -20px rgba(60,35,25,0.55)" }
              : { rotateY: 0 }
          }
          transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
          onClick={handleOpen}
        >
          <div className="paper-sheet paper-grain relative flex h-full w-full flex-col overflow-hidden rounded-[3px] p-4">
            <Tape className="-top-2 left-6" rotate={-8} width={64} />
            <Tape className="-top-2 right-6" rotate={7} width={64} />

            <div className="relative overflow-hidden rounded-[2px] border border-ink/10">
              <motion.img
                src={config.heroPhoto}
                alt={`${name} — hero photograph`}
                width={1024}
                height={1280}
                className="aspect-[4/5] w-full object-cover sepia-[0.12] saturate-[0.95]"
                animate={{ scale: [1, 1.09], x: [0, -6], y: [0, -4] }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{ background: "linear-gradient(180deg, transparent 55%, oklch(0.963 0.019 85 / 0.55))" }}
              />
            </div>

            <div className="mt-3 flex flex-1 flex-col items-center justify-center text-center">
              <p className="font-serif-display text-[13px] tracking-[0.42em] text-ink-soft uppercase">
                Happy Birthday,
              </p>
              <p className="-mt-1 font-script text-5xl leading-tight text-burgundy">{name}</p>
              <p className="mt-1 font-serif-display text-sm tracking-[0.35em] text-rose uppercase">
                {ordinal}
              </p>
            </div>

            <p className="pb-1 text-center font-hand text-lg text-ink-soft">tap to open ❤️</p>
          </div>
        </motion.div>
      </motion.div>

      {!open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8"
        >
          <InkButton onClick={handleOpen}>Open</InkButton>
        </motion.div>
      )}
    </div>
  );
}
