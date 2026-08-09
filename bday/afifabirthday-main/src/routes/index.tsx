import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronLeft, Music, Music2 } from "lucide-react";
import config from "@/config/birthdayConfig";
import { ScenePage } from "@/components/scrapbook/Bits";
import SecretLogin from "@/components/SecretLogin";
import SecurityChallenge from "@/components/SecurityChallenge";
import CinematicLoading from "@/components/CinematicLoading";
import BirthdayCard from "@/components/BirthdayCard";
import MailEnvelope from "@/components/MailEnvelope";
import LoveLetter from "@/components/LoveLetter";
import MemoryBook from "@/components/MemoryBook";
import GiftSection from "@/components/GiftSection";
import MessageSection from "@/components/MessageSection";
import SecretGame from "@/components/SecretGame";
import FinalLetter from "@/components/FinalLetter";
import FinalReveal from "@/components/FinalReveal";
import { setMuted, sfx, unlockAudio } from "@/lib/sfx";

const title = `A little something for ${config.name} — Happy Birthday`;
const description = `A handmade interactive birthday scrapbook: secret letters, memories, gifts and one very hidden surprise for ${config.name}.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Experience,
});

const SCENES = [
  "login",
  "challenge",
  "loading",
  "card",
  "mail",
  "letter",
  "memories",
  "gifts",
  "message",
  "game",
  "finalLetter",
  "reveal",
] as const;

/** Scenes counted in the visible progress indicator (after the gate). */
const FIRST_TRACKED = 3;
const TRACKED = SCENES.length - FIRST_TRACKED;

function Experience() {
  const [scene, setScene] = useState(0);
  const [dir, setDir] = useState(1);
  const [name, setName] = useState(config.name);
  const [muted, setMutedUI] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("bday:name");
      if (saved) setName(saved);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("bday:scene", String(scene));
    } catch {
      /* ignore */
    }
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }, [scene]);

  function go(next: number) {
    setDir(next > scene ? 1 : -1);
    sfx("page");
    setScene(Math.max(0, Math.min(SCENES.length - 1, next)));
  }

  const key = SCENES[scene];
  const tracked = scene >= FIRST_TRACKED;
  const step = scene - FIRST_TRACKED + 1;

  return (
    <main className="relative min-h-[100dvh] w-full overflow-x-hidden bg-paper">
      <AnimatePresence mode="wait" initial={false}>
        <ScenePage key={key} dir={dir}>
          {key === "login" && (
            <SecretLogin
              onUnlock={(n) => {
                setName(n);
                try {
                  localStorage.setItem("bday:name", n);
                } catch {
                  /* ignore */
                }
                unlockAudio();
                go(1);
              }}
            />
          )}
          {key === "challenge" && <SecurityChallenge name={name} onDone={() => go(2)} />}
          {key === "loading" && <CinematicLoading onDone={() => go(3)} />}
          {key === "card" && <BirthdayCard name={name} onDone={() => go(4)} />}
          {key === "mail" && <MailEnvelope onDone={() => go(5)} />}
          {key === "letter" && <LoveLetter name={name} onDone={() => go(6)} />}
          {key === "memories" && <MemoryBook onDone={() => go(7)} />}
          {key === "gifts" && <GiftSection onDone={() => go(8)} />}
          {key === "message" && <MessageSection onDone={() => go(9)} />}
          {key === "game" && <SecretGame onDone={() => go(10)} />}
          {key === "finalLetter" && <FinalLetter name={name} onDone={() => go(11)} />}
          {key === "reveal" && <FinalReveal name={name} />}
        </ScenePage>
      </AnimatePresence>

      {/* subtle progress + back, no navbar */}
      {tracked && (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-center justify-between px-4 pt-4">
          <button
            onClick={() => go(scene - 1)}
            className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-paper/70 text-ink-soft backdrop-blur-sm"
            aria-label="Go back a page"
          >
            <ChevronLeft className="size-5" />
          </button>
          <span className="font-serif-display text-[11px] tracking-[0.35em] text-ink-soft/80">
            {String(step).padStart(2, "0")} / {String(TRACKED).padStart(2, "0")}
          </span>
          <button
            onClick={() => {
              const next = !muted;
              setMutedUI(next);
              setMuted(next);
              if (!next) sfx("sparkle");
            }}
            className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-paper/70 text-ink-soft backdrop-blur-sm"
            aria-label={muted ? "Unmute sounds" : "Mute sounds"}
          >
            {muted ? <Music2 className="size-4" /> : <Music className="size-4" />}
          </button>
        </div>
      )}

      {tracked && (
        <div className="pointer-events-none fixed inset-x-0 bottom-3 z-30 flex justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-1 rounded-full bg-paper/60 px-3 py-1 text-[11px] tracking-[0.3em] text-rose backdrop-blur-sm"
          >
            {Array.from({ length: TRACKED }, (_, i) => (
              <span key={i}>{i < step ? "♥" : "♡"}</span>
            ))}
          </motion.div>
        </div>
      )}
    </main>
  );
}

