/**
 * Tiny WebAudio sound design — no asset files needed.
 * Nothing plays until the first user gesture unlocks the context.
 */

type SfxName =
  | "click"
  | "paper"
  | "page"
  | "envelope"
  | "shutter"
  | "sparkle"
  | "gift"
  | "heart"
  | "thud";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let muted = false;

function ac(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function unlockAudio() {
  ac();
}

export function setMuted(v: boolean) {
  muted = v;
  if (master) master.gain.value = v ? 0 : 0.5;
}

export function isMuted() {
  return muted;
}

function noise(duration: number, gain: number, filterFreq: number, sweep = 0) {
  const c = ac();
  if (!c || !master || muted) return;
  const frames = Math.max(1, Math.floor(c.sampleRate * duration));
  const buf = c.createBuffer(1, frames, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < frames; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / frames);
  }
  const src = c.createBufferSource();
  src.buffer = buf;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.setValueAtTime(filterFreq, c.currentTime);
  if (sweep) bp.frequency.exponentialRampToValueAtTime(Math.max(80, filterFreq + sweep), c.currentTime + duration);
  const g = c.createGain();
  g.gain.setValueAtTime(gain, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
  src.connect(bp).connect(g).connect(master);
  src.start();
  src.stop(c.currentTime + duration + 0.02);
}

function tone(freq: number, duration: number, gain = 0.12, type: OscillatorType = "sine", delay = 0) {
  const c = ac();
  if (!c || !master || muted) return;
  const t = c.currentTime + delay;
  const osc = c.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(gain, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(g).connect(master);
  osc.start(t);
  osc.stop(t + duration + 0.05);
}

export function sfx(name: SfxName) {
  switch (name) {
    case "click":
      tone(660, 0.07, 0.05, "triangle");
      break;
    case "paper":
      noise(0.22, 0.12, 1800, 900);
      break;
    case "page":
      noise(0.38, 0.16, 1200, 1600);
      break;
    case "envelope":
      noise(0.3, 0.13, 900, 1400);
      tone(520, 0.18, 0.05, "sine", 0.15);
      break;
    case "shutter":
      noise(0.05, 0.3, 2600);
      noise(0.09, 0.2, 1200, -600);
      break;
    case "sparkle":
      [1320, 1760, 2200].forEach((f, i) => tone(f, 0.25, 0.05, "sine", i * 0.06));
      break;
    case "gift":
      noise(0.25, 0.14, 1500, 700);
      [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.3, 0.07, "triangle", 0.12 + i * 0.07));
      break;
    case "heart":
      tone(392, 0.22, 0.07, "sine");
      tone(523, 0.3, 0.06, "sine", 0.1);
      break;
    case "thud":
      tone(90, 0.25, 0.18, "sine");
      noise(0.15, 0.1, 300);
      break;
  }
}

/* ---------- fallback music: a soft looping arpeggio ---------- */

let musicTimer: ReturnType<typeof setInterval> | null = null;

const PROGRESSION = [
  [261.63, 329.63, 392.0, 493.88],
  [220.0, 329.63, 415.3, 523.25],
  [174.61, 261.63, 349.23, 440.0],
  [196.0, 293.66, 392.0, 493.88],
];

export function startFallbackMusic() {
  if (musicTimer) return;
  let step = 0;
  const play = () => {
    const chord = PROGRESSION[step % PROGRESSION.length] ?? PROGRESSION[0]!;
    chord.forEach((f, i) => tone(f, 1.6, 0.035, "sine", i * 0.18));
    tone((chord[0] ?? 261.63) / 2, 2.2, 0.03, "triangle");
    step++;
  };
  play();
  musicTimer = setInterval(play, 2600);
}

export function stopFallbackMusic() {
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
}
