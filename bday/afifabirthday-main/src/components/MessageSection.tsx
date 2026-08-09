import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import config from "@/config/birthdayConfig";
import { InkButton, Tape } from "@/components/scrapbook/Bits";
import { sfx, startFallbackMusic, stopFallbackMusic, unlockAudio } from "@/lib/sfx";

export default function MessageSection({ onDone }: { onDone: () => void }) {
  return (
    <div
      className="paper-grain relative min-h-[100dvh] overflow-hidden px-5 py-12"
      style={{ background: "var(--gradient-cream)" }}
    >
      <div className="mx-auto grid max-w-3xl gap-10 md:grid-cols-2 md:items-center">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-script text-5xl leading-tight text-burgundy"
          >
            Message For You
          </motion.h2>
          <div className="mt-4 space-y-4">
            {config.messageSection
              .trim()
              .split(/\n\s*\n/)
              .map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.7 }}
                  className="font-hand text-[21px] leading-relaxed text-ink"
                >
                  {p}
                </motion.p>
              ))}
          </div>
          <div className="mt-8">
            <VinylPlayer />
          </div>
        </div>

        <div className="relative mx-auto h-[330px] w-full max-w-[300px]">
          <motion.div
            initial={{ opacity: 0, rotate: -12, y: 30 }}
            whileInView={{ opacity: 1, rotate: -7, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-0 left-0 w-44 bg-paper p-2 pb-8 shadow-[var(--shadow-paper)]"
          >
            <Tape className="-top-3 left-1/2 -translate-x-1/2" rotate={-6} width={54} />
            <img
              src={config.photos[0]?.src}
              alt="memory"
              loading="lazy"
              width={768}
              height={960}
              className="aspect-[4/5] w-full object-cover sepia-[0.14]"
            />
            <span className="absolute inset-x-2 bottom-1.5 font-hand text-sm text-ink-soft">us ♡</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, rotate: 12, y: 40 }}
            whileInView={{ opacity: 1, rotate: 6, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="absolute right-0 bottom-0 w-44 bg-paper p-2 pb-8 shadow-[var(--shadow-lift)]"
          >
            <Tape className="-top-3 right-4" rotate={8} width={50} />
            <img
              src={config.photos[2]?.src}
              alt="memory"
              loading="lazy"
              width={768}
              height={960}
              className="aspect-[4/5] w-full object-cover sepia-[0.14]"
            />
            <span className="absolute inset-x-2 bottom-1.5 font-hand text-sm text-ink-soft">
              always this
            </span>
          </motion.div>
        </div>
      </div>

      <div className="mt-14 flex justify-center">
        <InkButton onClick={onDone}>Next</InkButton>
      </div>
    </div>
  );
}

/* ── 16. Vinyl record ── */
export function VinylPlayer() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMutedState] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => () => stopFallbackMusic(), []);

  function toggle() {
    unlockAudio();
    const next = !playing;
    setPlaying(next);
    if (config.music) {
      const a = audioRef.current;
      if (!a) return;
      if (next) void a.play().catch(() => undefined);
      else a.pause();
    } else {
      if (next) startFallbackMusic();
      else stopFallbackMusic();
    }
  }

  function toggleMute() {
    const next = !muted;
    setMutedState(next);
    if (audioRef.current) audioRef.current.muted = next;
    if (!config.music && next) stopFallbackMusic();
    else if (!config.music && !next && playing) startFallbackMusic();
    sfx("click");
  }

  return (
    <div className="flex items-center gap-4">
      {config.music && <audio ref={audioRef} src={config.music} loop preload="none" />}
      <motion.button
        onClick={toggle}
        aria-label={playing ? "Pause the record" : "Play the record"}
        whileTap={{ scale: 0.93 }}
        animate={{ rotate: playing ? 360 : 0 }}
        transition={
          playing
            ? { duration: 4, repeat: Infinity, ease: "linear" }
            : { duration: 0.6 }
        }
        className="relative size-24 shrink-0 rounded-full shadow-[var(--shadow-lift)]"
        style={{
          background:
            "repeating-radial-gradient(circle, oklch(0.2 0.01 40) 0 2px, oklch(0.26 0.012 40) 2px 4px)",
        }}
      >
        <span className="absolute inset-[34%] rounded-full bg-rose" />
        <span className="absolute inset-[47%] rounded-full bg-paper" />
      </motion.button>

      <div>
        <p className="font-hand text-lg text-ink">♫ {config.songName}</p>
        <div className="mt-1.5 flex gap-2">
          <button
            onClick={toggle}
            className="flex size-9 items-center justify-center rounded-full border border-ink/20 text-ink"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
          <button
            onClick={toggleMute}
            className="flex size-9 items-center justify-center rounded-full border border-ink/20 text-ink"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
