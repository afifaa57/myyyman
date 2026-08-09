/**
 * ─────────────────────────────────────────────
 *  EDIT EVERYTHING HERE.
 *  Names, age, password, photos, music, letters.
 * ─────────────────────────────────────────────
 */
import hero from "@/assets/hero.jpg";
import photo1 from "@/assets/photo1.jpg";
import photo2 from "@/assets/photo2.jpg";
import photo3 from "@/assets/photo3.jpg";
import photo4 from "@/assets/photo4.jpg";

export const birthdayConfig = {
  name: "konain",
  nickname: "My Love",
  age: 23,
  senderName: "Afifa",
  birthday: "August 10",

  /** Not real security — just a playful gate. Never stored or sent anywhere. */
  password: "iloveyou",
  passwordHint: "It's what I say every single night before you fall asleep 🙈",

  /** Optional: drop an mp3 in /public/music/song.mp3 and set the path.
   *  If left null, a soft handmade melody plays instead. */
  music: null as string | null,
  songName: "Our Song",

  heroPhoto: hero,

  photos: [
    { src: photo1, caption: "This smile ❤️" },
    { src: photo2, caption: "Our table. Our coffee." },
    { src: photo3, caption: "One of my favourite memories." },
    { src: photo4, caption: "Okay... this picture is unfair 😭" },
  ],

  /** Shown when the camera gift is opened */
  cameraPhoto: photo4,
  cameraCaption: "Captured one of my favourite moments ❤️",

  /** Shown inside the gift box */
  giftBoxMessage: "One more reason to smile today ❤️",
  giftBoxNote: "A whole day, just us. You pick everything. I pay for everything.",

  /** Hidden secret (the DO NOT PRESS reward) */
  secretPhoto: photo1,
  secretMessage: "You weren't supposed to find this yet... but of course you did.",

  loveLetter: `To my favourite person,

I keep trying to find a clever way to say this, and I keep failing, so here it is plainly: loving you is the easiest thing I do.

You make ordinary days feel like something worth remembering. The bad jokes. The long walks. The way you laugh a half second before the funny part.

I hope today feels exactly like you make me feel — warm, chosen, and a little bit magic.`,

  messageSection: `Some people arrive in your life like weather. You arrived like a home.

Thank you for every small, unglamorous, beautiful ordinary day. I'd pick them all again.`,

  finalLetterLines: [
    "I could have just said Happy Birthday...",
    "But you deserve more than two words.",
    "So I made this little world for you.",
    "Every photo...",
    "Every little detail...",
    "Every silly surprise...",
    "was made just for you.",
  ],

  finalMessage: `And when all of this is closed and the screen goes dark —
I'll still be right here, choosing you.

Happy birthday, my love. Here's to every year after this one.`,

  /** Funny security questions */
  challenges: [
    {
      question: "Who is the most annoying person?",
      options: ["Me ❤️", "Obviously me", "Your sibling", "Google"],
      correct: 0,
      success: "Correct. Sadly, correct.",
    },
    {
      question: "What's your most dangerous weapon?",
      options: ["Anger 😭", "Smile ❤️", "Attitude", "All of the above"],
      correct: 3,
      success: "Terrifying. Accurate.",
    },
  ],
};

export type BirthdayConfig = typeof birthdayConfig;
export default birthdayConfig;
