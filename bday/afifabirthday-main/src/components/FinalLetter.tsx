import { motion } from "motion/react";
import { useEffect, useState } from "react";
import config from "@/config/birthdayConfig";
import { Divider, InkButton } from "@/components/scrapbook/Bits";
import { sfx } from "@/lib/sfx";

export default function FinalLetter({ name, onDone }: { name: string; onDone: () => void }) {
  const lines = config.finalLetterLines;
  const [shown, setShown] = useState(0);
  const complete = shown >= lines.length;

  useEffect(() => {
    if (complete) return;
    const t = setTimeout(() => {
      sfx("paper");
      setShown((s) => s + 1);
    }, 1500);
    return () => clearTimeout(t);
  }, [shown, complete]);

  return (
    <div className="film-grain relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-paper px-5 py-14">
      <motion.div
        initial={{ opacity: 0, scale: 0.86, y: 40, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md"
      >
        <motion.div
          animate={{ scale: [1, 1.03] }}
          transition={{ duration: 22, ease: "linear" }}
          className="paper-sheet paper-grain rounded-[2px] px-7 py-12"
        >
          <p className="text-center font-script text-4xl text-burgundy">One Last Thing...</p>
          <Divider />
          <div className="min-h-[280px] space-y-4">
            {lines.slice(0, shown).map((l, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1 }}
                className="text-center font-hand text-[22px] leading-relaxed text-ink"
              >
                {l}
              </motion.p>
            ))}
          </div>
          {complete && (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4 }}
              className="mt-6 text-center font-script text-4xl text-burgundy"
            >
              Happy Birthday, {name}. ❤️
            </motion.p>
          )}
        </motion.div>

        {complete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-10 flex justify-center"
          >
            <InkButton onClick={onDone}>Keep going ❤️</InkButton>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
