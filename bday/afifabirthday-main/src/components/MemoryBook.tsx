import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import config from "@/config/birthdayConfig";
import { FloatingHearts, InkButton, Tape } from "@/components/scrapbook/Bits";
import { sfx } from "@/lib/sfx";

const LAYOUT = [
  { rotate: -6, className: "col-span-1 mt-0" },
  { rotate: 5, className: "col-span-1 mt-8" },
  { rotate: 3, className: "col-span-1 -mt-4" },
  { rotate: -4, className: "col-span-1 mt-4" },
];

export default function MemoryBook({ onDone }: { onDone: () => void }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="paper-grain relative min-h-[100dvh] overflow-hidden px-5 py-12"
      style={{ background: "var(--gradient-cream)" }}
    >
      <h2 className="mx-auto max-w-xs text-center font-script text-4xl leading-tight text-burgundy">
        A few memories I want to keep forever...
      </h2>

      <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-x-3 gap-y-6">
        {config.photos.map((p, i) => {
          const l = LAYOUT[i % LAYOUT.length]!;
          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 24, rotate: l.rotate * 1.6 }}
              whileInView={{ opacity: 1, y: 0, rotate: l.rotate }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              whileTap={{ scale: 0.95 }}
              animate={{ y: [0, -3, 0] }}
              onClick={() => {
                sfx("paper");
                setActive(i);
              }}
              className={`relative bg-paper p-2 pb-8 shadow-[var(--shadow-paper)] ${l.className}`}
            >
              <Tape
                className="-top-3 left-1/2 -translate-x-1/2"
                rotate={i % 2 ? 6 : -7}
                width={54}
              />
              <img
                src={p.src}
                alt={p.caption}
                loading="lazy"
                width={768}
                height={960}
                className="aspect-[4/5] w-full object-cover sepia-[0.14] saturate-[0.95]"
              />
              <span className="absolute inset-x-2 bottom-1.5 truncate font-hand text-[15px] text-ink-soft">
                {p.caption}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-12 flex justify-center">
        <InkButton onClick={onDone}>Next page</InkButton>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-40 flex items-center justify-center bg-night/70 px-8 backdrop-blur-md"
          >
            <FloatingHearts count={9} burst />
            <motion.div
              initial={{ scale: 0.7, y: 40, rotate: -6, opacity: 0 }}
              animate={{ scale: 1, y: 0, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              className="relative w-full max-w-xs bg-paper p-3 pb-12 shadow-[0_40px_80px_-30px_black]"
            >
              <img
                src={config.photos[active]?.src}
                alt={config.photos[active]?.caption ?? ""}
                width={768}
                height={960}
                className="aspect-[4/5] w-full object-cover"
              />
              <p className="absolute inset-x-3 bottom-3 text-center font-hand text-xl text-ink">
                {config.photos[active]?.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
