// ── Placement test question bank ───────────────────────────────
// Mock data: multiple-choice questions per language, tagged with a
// CEFR difficulty level (A1 easiest → C1 hardest). `answer` is the
// index of the correct option.

export type CEFR = "A1" | "A2" | "B1" | "B2" | "C1";

export interface Question {
  id: string;
  level: CEFR;
  prompt: string;
  options: string[];
  answer: number;
}

export interface LanguageTest {
  code: string; // en, de, fr, it, zh
  name: string; // English display name
  nativeName: string; // name in that language
  flag: string; // emoji flag / script hint
  questions: Question[];
}

export const placementTests: Record<string, LanguageTest> = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    questions: [
      { id: "en1", level: "A1", prompt: "She ___ a teacher.", options: ["is", "am", "are", "be"], answer: 0 },
      { id: "en2", level: "A1", prompt: "I have two ___.", options: ["dog", "dogs", "doges", "dog's"], answer: 1 },
      { id: "en3", level: "A2", prompt: "Yesterday we ___ to the cinema.", options: ["go", "goes", "went", "gone"], answer: 2 },
      { id: "en4", level: "A2", prompt: "He is ___ than his brother.", options: ["tall", "taller", "tallest", "more tall"], answer: 1 },
      { id: "en5", level: "B1", prompt: "I have lived here ___ 2010.", options: ["since", "for", "from", "at"], answer: 0 },
      { id: "en6", level: "B1", prompt: "If it rains, we ___ stay home.", options: ["will", "would", "have", "are"], answer: 0 },
      { id: "en7", level: "B2", prompt: "By the time we arrived, the film ___.", options: ["started", "has started", "had started", "starts"], answer: 2 },
      { id: "en8", level: "C1", prompt: "___ had I sat down than the phone rang.", options: ["No sooner", "Quickly", "Just", "Already"], answer: 0 },
    ],
  },
  de: {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    questions: [
      { id: "de1", level: "A1", prompt: "Ich ___ Student.", options: ["bin", "bist", "ist", "sind"], answer: 0 },
      { id: "de2", level: "A1", prompt: "Das ist ___ Buch.", options: ["ein", "eine", "einen", "einem"], answer: 0 },
      { id: "de3", level: "A2", prompt: "Gestern ___ ich ins Kino gegangen.", options: ["habe", "bin", "war", "hatte"], answer: 1 },
      { id: "de4", level: "A2", prompt: "Er ist größer ___ ich.", options: ["als", "wie", "wenn", "dann"], answer: 0 },
      { id: "de5", level: "B1", prompt: "Ich interessiere mich ___ Musik.", options: ["für", "auf", "an", "über"], answer: 0 },
      { id: "de6", level: "B1", prompt: "Wenn ich Zeit ___, würde ich reisen.", options: ["habe", "hätte", "hatte", "haben"], answer: 1 },
      { id: "de7", level: "B2", prompt: "Das ist der Mann, ___ Auto gestohlen wurde.", options: ["dessen", "deren", "den", "dem"], answer: 0 },
      { id: "de8", level: "C1", prompt: "___ des schlechten Wetters gingen wir spazieren.", options: ["Trotz", "Wegen", "Während", "Aufgrund"], answer: 0 },
    ],
  },
  fr: {
    code: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    questions: [
      { id: "fr1", level: "A1", prompt: "Je ___ étudiant.", options: ["suis", "es", "est", "sont"], answer: 0 },
      { id: "fr2", level: "A1", prompt: "Elle a ___ chat.", options: ["un", "une", "des", "le"], answer: 0 },
      { id: "fr3", level: "A2", prompt: "Hier, nous ___ allés au cinéma.", options: ["avons", "sommes", "étions", "avez"], answer: 1 },
      { id: "fr4", level: "A2", prompt: "Il est plus grand ___ moi.", options: ["que", "de", "comme", "si"], answer: 0 },
      { id: "fr5", level: "B1", prompt: "Je m'intéresse ___ musique.", options: ["à la", "au", "de la", "en"], answer: 0 },
      { id: "fr6", level: "B1", prompt: "Si j'avais le temps, je ___ voyager.", options: ["voyagerais", "voyage", "voyagerai", "voyageais"], answer: 0 },
      { id: "fr7", level: "B2", prompt: "Il faut que tu ___ à l'heure.", options: ["sois", "es", "était", "être"], answer: 0 },
      { id: "fr8", level: "C1", prompt: "___ le mauvais temps, nous sommes sortis.", options: ["Malgré", "À cause de", "Pendant", "Depuis"], answer: 0 },
    ],
  },
  it: {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    questions: [
      { id: "it1", level: "A1", prompt: "Io ___ studente.", options: ["sono", "sei", "è", "siamo"], answer: 0 },
      { id: "it2", level: "A1", prompt: "Lei ha ___ gatto.", options: ["un", "una", "uno", "i"], answer: 0 },
      { id: "it3", level: "A2", prompt: "Ieri siamo ___ al cinema.", options: ["andato", "andati", "andate", "andando"], answer: 1 },
      { id: "it4", level: "A2", prompt: "Lui è più alto ___ me.", options: ["di", "che", "come", "su"], answer: 0 },
      { id: "it5", level: "B1", prompt: "Mi interesso ___ musica.", options: ["di", "a", "per", "con"], answer: 0 },
      { id: "it6", level: "B1", prompt: "Se avessi tempo, ___ viaggiare.", options: ["viaggerei", "viaggio", "viaggerò", "viaggiavo"], answer: 0 },
      { id: "it7", level: "B2", prompt: "Voglio che tu ___ felice.", options: ["sia", "sei", "è", "essere"], answer: 0 },
      { id: "it8", level: "C1", prompt: "___ il maltempo, siamo usciti.", options: ["Nonostante", "A causa di", "Durante", "Da"], answer: 0 },
    ],
  },
  zh: {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
    questions: [
      { id: "zh1", level: "A1", prompt: "Which word means “hello”?", options: ["你好", "谢谢", "再见", "对不起"], answer: 0 },
      { id: "zh2", level: "A1", prompt: "Which word means “thank you”?", options: ["谢谢", "你好", "请", "是"], answer: 0 },
      { id: "zh3", level: "A2", prompt: "Choose the correct measure word: 一 ___ 书 (one book)", options: ["本", "个", "只", "张"], answer: 0 },
      { id: "zh4", level: "A2", prompt: "“I am going to school.” 我 ___ 学校。", options: ["去", "来", "在", "是"], answer: 0 },
      { id: "zh5", level: "B1", prompt: "“I have studied Chinese for three years.” 我 ___ 中文三年了。", options: ["学了", "学", "学过", "在学"], answer: 0 },
      { id: "zh6", level: "B1", prompt: "“He is taller than me.” 他比我 ___ 。", options: ["高", "更高", "最高", "高了"], answer: 0 },
      { id: "zh7", level: "B2", prompt: "“Although it's expensive, I'll still buy it.” ___ 很贵，我也买。", options: ["虽然", "因为", "所以", "如果"], answer: 0 },
      { id: "zh8", level: "C1", prompt: "Which idiom means “perfect / flawless”?", options: ["十全十美", "马马虎虎", "乱七八糟", "一模一样"], answer: 0 },
    ],
  },
};

export const testLanguageCodes = Object.keys(placementTests);

// ── CEFR estimation ────────────────────────────────────────────
// Maps the correct-answer ratio to a CEFR band. Works for any
// number of questions.
export function estimateLevel(correct: number, total: number): CEFR {
  const r = total > 0 ? correct / total : 0;
  if (r < 0.25) return "A1";
  if (r < 0.45) return "A2";
  if (r < 0.65) return "B1";
  if (r < 0.85) return "B2";
  return "C1";
}
