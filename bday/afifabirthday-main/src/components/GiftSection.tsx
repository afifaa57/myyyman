import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import config from "@/config/birthdayConfig";
import cameraImg from "@/assets/gift-camera.png";
import cakeImg from "@/assets/gift-cake.png";
import boxImg from "@/assets/gift-box.png";
import { Confetti, FloatingHearts, InkButton, Sparkles, Tape } from "@/components/scrapbook/Bits";
import { sfx } from "@/lib/sfx";

type Gift = "camera" | "cake" | "box" | null;

export default function GiftSection({ onDone }: { onDone: () => void }) {
  const [open, setOpen] = useState<Gift>(null);
  const [opened, setOpened] = useState<Record<string, boolean>>({});

  const items = [
    { id: "camera" as const, img: cameraImg, label: "say cheese" },
    { id: "cake" as const, img: cakeImg, label: "make a wish" },
    { id: "box" as const, img: boxImg, label: "don't shake it" },
  ];

  return (
    <div
      className="paper-grain relative min-h-[100dvh] overflow-hidden px-5 py-12"
      style={{ background: "var(--gradient-cream)" }}
    >
      <h2 className="text-center font-script text-5xl text-burgundy">Gifts Just For You!</h2>
      <p className="mt-1 text-center font-serif-display text-[11px] tracking-[0.4em] text-ink-soft uppercase">
        tap each one
      </p>

      <div className="mx-auto mt-10 flex max-w-md flex-col gap-9">
        {items.map((it, i) => (
          <motion.button
            key={it.id}
            initial={{ opacity: 0, y: 30, rotate: i % 2 ? 4 : -4 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 2.5 : -2.5 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => {
              sfx("click");
              setOpen(it.id);
              setOpened((o) => ({ ...o, [it.id]: true }));
            }}
            className="relative mx-auto w-[70%] max-w-[240px] bg-paper/70 p-4 pb-9 shadow-[var(--shadow-paper)]"
          >
            <Tape className="-top-3 left-4" rotate={-9} width={58} />
            <Tape className="-bottom-2 right-5" rotate={6} width={50} />
            <motion.img
              src={it.img}
              alt={it.id}
              loading="lazy"
              width={768}
              height={768}
              className="w-full drop-shadow-[0_12px_18px_rgba(80,50,40,0.22)]"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
            />
            <span className="absolute inset-x-0 bottom-2 font-hand text-xl text-ink-soft">
              {it.label} {opened[it.id] ? "✓" : ""}
            </span>
          </motion.button>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <InkButton onClick={onDone} variant={Object.keys(opened).length >= 3 ? "solid" : "outline"}>
          Keep going
        </InkButton>
      </div>

      <AnimatePresence>
        {open === "camera" && <CameraGift onClose={() => setOpen(null)} />}
        {open === "cake" && <BirthdayCake onClose={() => setOpen(null)} />}
        {open === "box" && <GiftBox onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  );
}

/* ── shared modal shell ── */
function Shell({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-night/75 px-6 backdrop-blur-md"
    >
      {children}
      <button
        onClick={onClose}
        className="mt-8 font-serif-display text-[11px] tracking-[0.35em] text-paper/70 uppercase"
      >
        close
      </button>
    </motion.div>
  );
}

/* ── 12. Camera ── */
function CameraGift({ onClose }: { onClose: () => void }) {
  const [shot, setShot] = useState(false);
  const [flash, setFlash] = useState(false);

  function snap() {
    setFlash(true);
    sfx("shutter");
    setTimeout(() => setFlash(false), 260);
    setTimeout(() => setShot(true), 220);
  }

  return (
    <Shell onClose={onClose}>
      <AnimatePresence mode="wait">
        {!shot ? (
          <motion.button
            key="cam"
            initial={{ scale: 0.6, opacity: 0, z: -200 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.3, opacity: 0 }}
            onClick={snap}
            className="relative"
          >
            <img src={cameraImg} alt="camera" width={768} height={768} className="w-56" />
            <motion.span
              className="absolute top-[46%] left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-paper/60"
              animate={{ scale: [1, 0.85, 1], opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            <span className="mt-3 block font-hand text-xl text-paper">tap to shoot</span>
          </motion.button>
        ) : (
          <motion.div
            key="photo"
            initial={{ scale: 0.5, y: 60, rotate: -8, opacity: 0 }}
            animate={{ scale: 1, y: 0, rotate: -2, opacity: 1 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="w-full max-w-[260px] bg-paper p-3 pb-12 shadow-[0_40px_70px_-30px_black]"
          >
            <img
              src={config.cameraPhoto}
              alt={config.cameraCaption}
              width={768}
              height={960}
              className="aspect-[4/5] w-full object-cover sepia-[0.12]"
            />
            <p className="absolute-none mt-2 text-center font-hand text-lg text-ink">
              {config.cameraCaption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {flash && <div className="pointer-events-none fixed inset-0 z-50 bg-white" />}
    </Shell>
  );
}

/* ── 13. Cake ── */
function BirthdayCake({ onClose }: { onClose: () => void }) {
  const [blown, setBlown] = useState<boolean[]>([false, false, false]);
  const done = blown.every(Boolean);

  function blow(i: number) {
    if (blown[i]) return;
    sfx("paper");
    setBlown((b) => {
      const n = [...b];
      n[i] = true;
      if (n.every(Boolean)) setTimeout(() => sfx("sparkle"), 200);
      return n;
    });
  }

  return (
    <Shell onClose={onClose}>
      <Confetti active={done} />
      <div className="relative">
        <div className="absolute -top-10 left-1/2 flex -translate-x-1/2 gap-6">
          {blown.map((b, i) => (
            <button key={i} onClick={() => blow(i)} className="relative flex w-4 justify-center p-2">
              <span className="block h-9 w-1.5 rounded-sm bg-blush" />
              <AnimatePresence>
                {!b ? (
                  <motion.span
                    className="absolute -top-3 size-3 rounded-full bg-gold blur-[1px]"
                    animate={{ scaleY: [1, 1.35, 1], opacity: [0.85, 1, 0.85] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    exit={{ opacity: 0 }}
                  />
                ) : (
                  <motion.span
                    className="absolute -top-4 text-paper/50"
                    initial={{ opacity: 0.8, y: 0 }}
                    animate={{ opacity: 0, y: -28 }}
                    transition={{ duration: 1.6 }}
                  >
                    ~
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
        <motion.img
          src={cakeImg}
          alt="birthday cake"
          width={768}
          height={768}
          className="w-60"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        />
      </div>
      <motion.p
        key={done ? "done" : "wish"}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 text-center font-script text-4xl text-blush"
      >
        {done ? "Wish granted ✨" : "Make a wish..."}
      </motion.p>
      {!done && (
        <p className="mt-1 font-hand text-lg text-paper/70">tap each candle</p>
      )}
      {done && <FloatingHearts count={10} burst />}
      {done && <Sparkles count={16} />}
    </Shell>
  );
}

/* ── 14. Gift box ── */
function GiftBox({ onClose }: { onClose: () => void }) {
  const [open, setOpen] = useState(false);

  return (
    <Shell onClose={onClose}>
      <motion.button
        onClick={() => {
          if (open) return;
          sfx("gift");
          setOpen(true);
        }}
        animate={open ? {} : { rotate: [0, -3, 3, -2, 0] }}
        transition={{ duration: 1.1, repeat: open ? 0 : Infinity, repeatDelay: 1.4 }}
        className="relative"
      >
        <motion.img
          src={boxImg}
          alt="gift box"
          width={768}
          height={768}
          className="w-56"
          animate={open ? { y: 24, scale: 0.92 } : {}}
          transition={{ duration: 0.7 }}
        />
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.5 }}
              animate={{ y: -90, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 160, damping: 14 }}
              className="absolute inset-x-0 top-0 flex flex-col items-center"
            >
              <span className="text-5xl">💌</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 w-full max-w-xs"
          >
            <div className="paper-sheet paper-grain rounded-[2px] p-5 text-center">
              <p className="font-script text-3xl text-burgundy">{config.giftBoxMessage}</p>
              <p className="mt-2 font-hand text-lg text-ink-soft">{config.giftBoxNote}</p>
            </div>
            <FloatingHearts count={8} burst />
          </motion.div>
        )}
      </AnimatePresence>
      {!open && <p className="mt-6 font-hand text-xl text-paper/80">tap to unwrap</p>}
    </Shell>
  );
}
