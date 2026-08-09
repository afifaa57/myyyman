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

  loveLetter: `Hellooo betuuuu!!!
Puchre the na ki ky accha lga ky bura lga kesa tha ye saal betuuu issi saal bht chize dekhi hu mene bht phases se guzri hu sbse phle anas ka ki uska rishta fix hua thn ayaan se seperation 🤧 bht kuch hua h lkin ye sbke bich ek acchi chiz bhi hui thi aap ka hmare clg m aana thn vac Krna thn mera msg Krna bht accha tha ye sb😭😭😭 or ek chiz batao ayaan ko apki wjh se hi I leave 🙂 thike wo bht toxic bhi hore the bht over possesive bhi hore the isiliye bhi bt major reason whi tha baki u also know ayaan m koi kami nhi h wo sb chize krte the wht I want always he do bt still I choose u tbh anas ke baadse aisa hua h ki thike mn bhr gya to find other guy 🤧 m pta nhi aisi kyu hogyi huu apkr bhi isme kbhi kbhi hota h ki ab koi or chahiye phir akal thikane aajati to thik hojata bt ab nhi hota h aisa kuvh betu ki chodna h apko ya kuch bs aise chahiye ki ab bs aap or explore nhi Krna honestly dekho strt se batati hu hm baat strt kiye 11 feb se mene msg ki thi thn uske baad hmari baat hone lgi thn mera bday tha u wanted me to come clg so u can wish me bt usdin ayaan aaye the bday pr to wo possible nhi tha isiliye phir nhi aai thi thn hmara jaipur janeka fix hua bhyiiiii honestly jb aapne announce kiye the ki jaipur raid h jana h kon kon ayega mere to khylo m bhi nhi tha ki m jaungi😂😂 kyuki muje lga tha papa mana krege isiliye mene puchi bhi nhi thi call krke thn apka msg aaya utne ki chlre ky m boli thi nhi mana krege to ap puchne ke baad m puchi thi mamma ki raid pr jaare to jau ky or jaafera reshma bhi aare the to I was like thike chlte h to mamma bole the papa ko puch to m papa ko boli thi reshma jafeera bhi h or bhi bacche h clg ke to papa foren man gye the bs bole the apse bat krwa dena krke to mee apko phle satai thi ki mana kiye😂😂 phir badme boli ki aari m bhi bt papa se baat krlo ek br to bole ha ha chlega na phir baat hui thi thn sb set tha aap pta h phle nhi are the lkin jb m boli m bhi aari to khud bhi ready hogye the😭😭😂😂 thn apn jaipur tripp 😭😭 waha jo bhi hua wo first tym tha hr chiz akele jana Krna SBB thn coffee pr gye the 😭😭🤌🤌🤌 tysmmm 😭 thn uske baad hmari bonding or acchi hogyi thi pr still we were frnds only mene accept nhi ki thi kyuki mere past trauma ki wjh se thn jese wese u convince me thn aap vadora gye the tb mene haa boli thi or guilt tha muje ayaan ka unko msg wagera ki thi thn whi chlta tha I want ayaan pr apko bhi chodna nhi ye. Wo bhyii ik kese I face all those thngs apko bhi hurt krdeti khudko bhi or ayaan ko bhi sbko sryyy betuuu hr chiz ke liy bt ky kru tb hota tha aise kyuki ayaan ko bs ek glti pr leave him lkin ab aise kn hota h ab msg m kru ya wo kre kn hota h it's jst normal or hm baat bhi krte h abhi to normal talks hoti h nd mene apne photos wagera bhi batai thi Imagica ke to usse unko lgta h ki we r dating kyuki unhone puche the reshma hamza date krre ky uske baad hi apna. Puche the m boli thi unko ki apko ky lgta h to bolte ha krre ho m boli thi acha h phir whi lgne do thn he said bolo to krre ki nhi m tb bs itna boli thi ki aap ke tym pr mamma mana kiye the to abhi bhi mamma ka whi h till graduation kn chahiye unko badme dekhe ge to bole acha unki bhi ek frnd h udr hi pune m sania to ab uske hi naam se satati hu unko baki or kn baat hoti h betuu to apko fikr krne ki zarurat nhi h kyuki I love you thee mostt I don't want to leave u ever or aap bhi mt chodo muje kbhi plzzzzz or sbse acchi post search vapi🙂😂😂😂bhyiiii unexpected thngs happen their😭😭😭 honestly the very first tym in my lyf I trust someone nd those thngs happen😭😭😭 bt bht gunah h wo betuuu muje realise hora h hm thike cntrl nhi krte h bt still nafs usi ko bolti h na ki nfs pr cntrl hona chahiye to sawab bhi milta h badme we hve our tym na honi hi h tb chizee will not do anything betuuu allahh ke liy whi to na mumkin kaam ko mumkin banayega na ik aap bht chnge hue nmz wagera bhi pdte ho muje maaf krdo bht hurt ki hu mene apko always I'm really sorry betuuuu ap aisa nhi h ki kisiko deserve nhi krte ya kuch aisa kn h aap bht acche ho I love you betuuu I love you the most 😭😭🫀💗💗💗💗💗`,

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
