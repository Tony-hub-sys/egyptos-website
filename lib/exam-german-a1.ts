// ── Goethe-Zertifikat A1 (Start Deutsch 1) practice exam ───────
// Four modules: Hören, Lesen, Schreiben, Sprechen.
// Hören + Lesen are auto-graded (30 items). Schreiben & Sprechen
// are practice with model answers (self / teacher assessed).

export interface MCItem {
  id: string;
  script?: string; // spoken audio (TTS) for Hören
  prompt: string;
  options: string[];
  answer: number; // index of correct option
}

export interface TFItem {
  id: string;
  script?: string; // spoken audio for Hören
  statement: string;
  answer: boolean; // true = richtig, false = falsch
}

export interface ABItem {
  id: string;
  situation: string;
  a: string;
  b: string;
  answer: "a" | "b";
}

export interface SignItem {
  id: string;
  sign: string;
  statement: string;
  answer: boolean;
}

export const hoeren = {
  teil1: [
    {
      id: "h1",
      script: "Frau: Entschuldigung, wie viel kostet der Kaffee? Mann: Der Kaffee kostet zwei Euro fünfzig.",
      prompt: "Wie viel kostet der Kaffee?",
      options: ["2,50 €", "3,50 €", "2,00 €"],
      answer: 0,
    },
    {
      id: "h2",
      script: "Mann: Wie spät ist es bitte? Frau: Es ist Viertel nach acht.",
      prompt: "Wie spät ist es?",
      options: ["8:15 Uhr", "8:45 Uhr", "7:45 Uhr"],
      answer: 0,
    },
    {
      id: "h3",
      script: "Frau: Entschuldigung, was möchten Sie trinken? Mann: Einen Orangensaft, bitte.",
      prompt: "Was trinkt der Mann?",
      options: ["Wasser", "Orangensaft", "Cola"],
      answer: 1,
    },
    {
      id: "h4",
      script: "Mann: Wann kommt der Zug nach Hamburg? Frau: Der Zug kommt um vierzehn Uhr.",
      prompt: "Wann kommt der Zug?",
      options: ["14:00 Uhr", "4:00 Uhr", "13:00 Uhr"],
      answer: 0,
    },
    {
      id: "h5",
      script: "Kind: Mama, wie ist das Wetter heute? Mutter: Es regnet und ist kalt. Nimm die Jacke mit.",
      prompt: "Wie ist das Wetter heute?",
      options: ["sonnig und warm", "kalt und Regen", "warm und windig"],
      answer: 1,
    },
    {
      id: "h6",
      script: "Frau: Wo wohnst du jetzt? Mann: Ich wohne in der Bahnhofstraße, Nummer zwölf.",
      prompt: "Wo wohnt der Mann?",
      options: ["Bahnhofstraße 12", "Bahnhofstraße 20", "Berliner Straße 12"],
      answer: 0,
    },
  ] as MCItem[],
  teil2: [
    {
      id: "h7",
      script: "Achtung am Gleis drei: Der Zug nach München fährt heute nicht von Gleis drei, sondern von Gleis fünf.",
      statement: "Der Zug nach München fährt von Gleis 3.",
      answer: false,
    },
    {
      id: "h8",
      script: "Liebe Kundinnen und Kunden, unser Supermarkt schließt heute um zwanzig Uhr. Vielen Dank für Ihren Einkauf.",
      statement: "Der Supermarkt schließt heute um 20 Uhr.",
      answer: true,
    },
    {
      id: "h9",
      script: "Guten Morgen. Der Deutschkurs beginnt heute nicht um neun Uhr, sondern erst um zehn Uhr.",
      statement: "Der Deutschkurs beginnt heute um 9 Uhr.",
      answer: false,
    },
    {
      id: "h10",
      script: "Frau Müller, bitte kommen Sie zur Information. Frau Müller, bitte zur Information.",
      statement: "Frau Müller soll zur Information kommen.",
      answer: true,
    },
  ] as TFItem[],
  teil3: [
    {
      id: "h11",
      script: "Hallo, hier ist Anna. Wir treffen uns morgen um achtzehn Uhr vor dem Kino. Bis dann!",
      prompt: "Wann treffen sie sich?",
      options: ["17:00 Uhr", "18:00 Uhr", "19:00 Uhr"],
      answer: 1,
    },
    {
      id: "h12",
      script: "Guten Tag, hier ist die Praxis Dr. Schmidt. Ihr Termin ist am Montag um neun Uhr.",
      prompt: "Wann ist der Termin?",
      options: ["Montag, 9 Uhr", "Montag, 10 Uhr", "Dienstag, 9 Uhr"],
      answer: 0,
    },
    {
      id: "h13",
      script: "Hallo Tom, kannst du bitte Brot und Milch kaufen? Danke dir. Tschüss.",
      prompt: "Was soll Tom kaufen?",
      options: ["Brot und Butter", "Brot und Milch", "Milch und Käse"],
      answer: 1,
    },
    {
      id: "h14",
      script: "Guten Tag, hier ist das Hotel Sonne. Ihr Zimmer hat die Nummer vierundzwanzig.",
      prompt: "Welche Zimmernummer hat der Gast?",
      options: ["Nummer 24", "Nummer 42", "Nummer 14"],
      answer: 0,
    },
    {
      id: "h15",
      script: "Hallo, ich bin heute leider krank und komme nicht zur Arbeit. Bis morgen.",
      prompt: "Warum kommt die Person nicht zur Arbeit?",
      options: ["Sie hat Urlaub.", "Sie ist krank.", "Sie hat keine Zeit."],
      answer: 1,
    },
  ] as MCItem[],
};

export const lesen = {
  teil1: {
    context:
      "Liebe Sara,\n\nich komme am Samstag nach Berlin. Mein Zug kommt um 15 Uhr am Hauptbahnhof an. Kannst du mich abholen? Am Abend möchte ich gern ins Restaurant gehen. Ich bleibe bis Montag.\n\nViele Grüße\nLena",
    items: [
      { id: "l1", statement: "Lena kommt am Samstag nach Berlin.", answer: true },
      { id: "l2", statement: "Der Zug kommt um 5 Uhr an.", answer: false },
      { id: "l3", statement: "Lena möchte am Abend ins Kino gehen.", answer: false },
      { id: "l4", statement: "Lena bleibt bis Montag in Berlin.", answer: true },
      { id: "l5", statement: "Sara soll Lena vom Bahnhof abholen.", answer: true },
    ] as TFItem[],
  },
  teil2: [
    {
      id: "l6",
      situation: "Sie möchten Deutsch lernen. Welche Anzeige passt?",
      a: "Sprachschule Berlin – Deutschkurse für Anfänger, jeden Montag.",
      b: "Fahrschule Meyer – Führerschein in nur 4 Wochen.",
      answer: "a",
    },
    {
      id: "l7",
      situation: "Sie brauchen am Wochenende einen Arzt.",
      a: "Praxis Dr. Klein – Sprechzeiten Mo–Fr, 8–16 Uhr.",
      b: "Ärztlicher Notdienst – auch Samstag und Sonntag geöffnet.",
      answer: "b",
    },
    {
      id: "l8",
      situation: "Sie möchten günstig zu Mittag essen.",
      a: "Restaurant Luxus – Menü ab 50 €.",
      b: "Mensa der Universität – Mittagessen ab 4 €.",
      answer: "b",
    },
    {
      id: "l9",
      situation: "Sie suchen eine Wohnung in München.",
      a: "Schöne 2-Zimmer-Wohnung in München-Zentrum zu vermieten.",
      b: "Gebrauchtes Auto in München zu verkaufen.",
      answer: "a",
    },
    {
      id: "l10",
      situation: "Sie möchten am Sonntag frisches Brot kaufen.",
      a: "Bäckerei Sonne – täglich geöffnet, auch am Sonntag, 6–18 Uhr.",
      b: "Bäckerei Mühle – geöffnet Montag bis Samstag.",
      answer: "a",
    },
  ] as ABItem[],
  teil3: [
    { id: "l11", sign: "Kasse geschlossen", statement: "Hier kann man jetzt bezahlen.", answer: false },
    { id: "l12", sign: "Ausgang", statement: "Hier geht man hinaus.", answer: true },
    { id: "l13", sign: "Parken verboten", statement: "Hier darf man das Auto parken.", answer: false },
    { id: "l14", sign: "Bitte nicht rauchen", statement: "Rauchen ist hier nicht erlaubt.", answer: true },
    { id: "l15", sign: "Öffnungszeiten: Mo–Fr, 9–17 Uhr", statement: "Am Samstag ist das Geschäft geöffnet.", answer: false },
  ] as SignItem[],
};

export const schreiben = {
  teil1: {
    intro:
      "Ihre Freundin Fatima möchte einen Deutschkurs machen. Sie hilft ihr. Lesen Sie die Informationen und füllen Sie das Formular aus.",
    infoText:
      "Fatima Ali kommt aus Ägypten. Sie ist 25 Jahre alt und wohnt in der Nilstraße 10 in Kairo. Sie spricht Arabisch und Englisch. Sie möchte den Kurs am Abend machen.",
    fields: [
      { label: "Familienname", model: "Ali" },
      { label: "Vorname", model: "Fatima" },
      { label: "Land", model: "Ägypten" },
      { label: "Alter", model: "25" },
      { label: "Sprachen", model: "Arabisch und Englisch" },
    ],
  },
  teil2: {
    prompt:
      "Sie sind krank und können heute nicht zum Deutschkurs kommen. Schreiben Sie eine kurze E-Mail an Ihre Lehrerin, Frau Wagner (circa 30 Wörter). Schreiben Sie zu allen drei Punkten:",
    points: [
      "Entschuldigen Sie sich.",
      "Warum können Sie nicht kommen?",
      "Wann kommen Sie wieder?",
    ],
    model:
      "Liebe Frau Wagner,\n\nes tut mir leid, aber ich kann heute nicht zum Deutschkurs kommen. Ich bin krank und habe Fieber. Nächste Woche komme ich wieder zum Unterricht.\n\nViele Grüße\n[Ihr Name]",
  },
};

export const sprechen = {
  teil1: {
    instruction: "Teil 1 – Sich vorstellen. Sprechen Sie über sich mit diesen Stichwörtern:",
    keywords: ["Name?", "Alter?", "Land?", "Wohnort?", "Sprachen?", "Beruf?", "Hobby?"],
    extra: ["Buchstabieren Sie Ihren Namen.", "Sagen Sie Ihre Telefonnummer."],
    example:
      "Ich heiße Omar Hassan. Ich bin 28 Jahre alt und komme aus Ägypten. Ich wohne in Marsa Matruh. Ich spreche Arabisch, Englisch und ein bisschen Deutsch. Ich bin Lehrer. Mein Hobby ist Fußball.",
  },
  teil2: {
    instruction:
      "Teil 2 – Um Informationen bitten. Bilden Sie zu jedem Thema und Wort eine Frage.",
    cards: [
      { thema: "Einkaufen", wort: "Was?", model: "Was kaufst du im Supermarkt?" },
      { thema: "Freizeit", wort: "Wann?", model: "Wann spielst du Fußball?" },
      { thema: "Reisen", wort: "Wohin?", model: "Wohin fährst du im Urlaub?" },
      { thema: "Essen", wort: "Wo?", model: "Wo isst du zu Mittag?" },
    ],
  },
  teil3: {
    instruction:
      "Teil 3 – Bitten formulieren und darauf reagieren. Formulieren Sie zu jedem Wort eine höfliche Bitte.",
    cards: [
      { wort: "Fenster", model: "Können Sie bitte das Fenster öffnen?" },
      { wort: "Licht", model: "Kannst du bitte das Licht anmachen?" },
      { wort: "Wasser", model: "Können Sie mir bitte ein Glas Wasser bringen?" },
      { wort: "Stift", model: "Kannst du mir bitte einen Stift geben?" },
    ],
  },
};

// Flatten the auto-graded items for scoring (Hören + Lesen = 30).
export const OBJECTIVE_TOTAL = 30;
