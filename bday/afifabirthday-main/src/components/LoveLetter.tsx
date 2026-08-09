import { motion } from "motion/react";
import config from "@/config/birthdayConfig";
import { Divider, Flower, InkButton, Paper, Tape } from "@/components/scrapbook/Bits";

export default function LoveLetter({ name, onDone }: { name: string; onDone: () => void }) {
  const paragraphs = config.loveLetter.trim().split(/\n\s*\n/);

  return (
    <div
      className="paper-grain relative min-h-[100dvh] overflow-hidden px-4 py-12"
      style={{ background: "var(--gradient-cream)" }}
    >
      <div className="relative mx-auto w-full max-w-md">
        {/* taped polaroid corner */}
        <motion.div
          initial={{ opacity: 0, y: -20, rotate: -14 }}
          animate={{ opacity: 1, y: 0, rotate: -9 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="absolute -top-2 -right-1 z-10 w-24 bg-paper p-1.5 pb-5 shadow-[var(--shadow-paper)]"
        >
          <Tape className="-top-2 left-1/2 -translate-x-1/2" rotate={5} width={48} />
          <img
            src={config.photos[1]?.src}
            alt="a small memory"
            loading="lazy"
            width={768}
            height={960}
            className="aspect-square w-full object-cover sepia-[0.15]"
          />
        </motion.div>

        <Paper className="px-6 py-9" rotate={-0.6}>
          <p className="text-center font-serif-display text-[11px] tracking-[0.4em] text-ink-soft uppercase">
            A Love Letter
          </p>
          <p className="mt-1 text-center font-script text-3xl text-burgundy">only for {name}</p>
          <Divider />

          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: 0.15 + i * 0.12 }}
                className="font-hand text-[21px] leading-relaxed text-ink"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-8 text-right"
          >
            <p className="font-hand text-lg text-ink-soft">Forever yours,</p>
            <p className="font-script text-4xl text-burgundy">{config.senderName} ❤️</p>
          </motion.div>

          <Flower className="mt-2 -ml-1 opacity-60" size={48} />
        </Paper>

        <div className="mt-10 flex justify-center">
          <InkButton onClick={onDone}>Turn the page</InkButton>
        </div>
      </div>
    </div>
  );
}
