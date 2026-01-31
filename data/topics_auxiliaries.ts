import { Polarity } from '../types.ts';

export const auxiliariesTopic = {
  id: 'auxiliaries',
  title: 'Ghost Auxiliaries',
  subtitle: 'Summoning Do, Does, and Did',
  concept: "In the Simple Present and Simple Past tenses, positive sentences hide their helper verbs. They are invisible (ghosts)! You must look at the main verb to decide which ghost to summon.",
  
  infographicData: {
    title: "The Summoning Ritual",
    steps: [
      { 
        trigger: "Base Verb (e.g., go, eat)", 
        summon: "DO", 
        color: "#3b82f6" 
      },
      { 
        trigger: "Verb + 's' (e.g., goes, eats)", 
        summon: "DOES", 
        color: "#8b5cf6" 
      },
      { 
        trigger: "Past Verb (e.g., went, ate)", 
        summon: "DID", 
        color: "#ec4899" 
      }
    ],
    ruleSummary: "No helper visible? Check the tense and the 'S'!"
  },

  proTips: [
    {
      title: "The 'S' Rule",
      text: "If the main verb has an 's' (plays), the tag uses 'does'. If no 's' (play), use 'do'. If it's past (played), use 'did'."
    },
    {
      title: "Cracking the 'd Code (Part 1)",
      text: "If you see 'd followed by a Past Participle/V3 (e.g., She'd eaten), it means HAD. The tag must be 'hadn't she?'."
    },
    {
      title: "Stealth Negatives (Adverbs)",
      text: "Never, Seldom, Hardly, Rarely, Scarcely, and Barely make a sentence NEGATIVE. The tag must be POSITIVE. (e.g., He never goes, does he?)"
    },
    {
      title: "The Quantifier Trap (Few/Little)",
      text: "'Few' and 'Little' mean 'almost none' (Negative sentence -> Positive tag). 'A few' and 'A little' mean 'some' (Positive sentence -> Negative tag)."
    },
    {
      title: "Dare & Need (The Rebels)",
      text: "If used as verbs (He dares to go), use 'doesn't he?'. If used as modals (He dare not go), use 'dare he?'. Same for 'need' vs 'needn't'."
    },
    {
      title: "Ownership 'Have' vs Helper 'Have'",
      text: "In ownership (I have a dog), use 'don't I?'. If 'have' is an auxiliary (I have eaten), use 'haven't I?'."
    },
    {
      title: "The 'Neither' Clause",
      text: "If a sentence starts with 'Neither of us...', the sentence is negative. The tag uses 'we' and is positive. (e.g., 'Neither of us went, did we?')"
    }
  ],

  commonMistakes: [
    {
      bad: "He speaks English, isn't he?",
      good: "He speaks English, doesn't he?",
      reason: "Verb Repetition: There is no 'is' in the sentence! Summon 'does' for action verbs."
    },
    {
      bad: "Few people know, don't they?",
      good: "Few people know, do they?",
      reason: "Quantifier Logic: 'Few' is already negative. You need a positive tag."
    },
    {
      bad: "He needn't wait, doesn't he?",
      good: "He needn't wait, need he?",
      reason: "Modal Error: 'Needn't' is a modal auxiliary, so it repeats in the tag."
    }
  ],

  examples: [
    {
      sentence: "You like chocolate",
      tag: "don't you?",
      isCorrect: true,
      explanation: "Verb 'like' is base form ➔ Summon 'Do'. Flip to Negative.",
      polarity: Polarity.POSITIVE,
      verbType: "Base (V1)"
    },
    {
      sentence: "He hardly ever studies",
      tag: "does he?",
      isCorrect: true,
      explanation: "'Hardly' makes the sentence negative. Tag must be positive.",
      polarity: Polarity.NEGATIVE
    },
    {
      sentence: "Neither of them came",
      tag: "did they?",
      isCorrect: true,
      explanation: "'Neither' is negative. Subject is 'they'. Tag is positive.",
      polarity: Polarity.NEGATIVE
    }
  ]
};