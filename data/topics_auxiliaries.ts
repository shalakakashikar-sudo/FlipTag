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
      text: "Look at the main verb. If it ends with an 's' (plays, runs, is), you need the helper with an 's' (does)!"
    },
    {
      title: "The Time Travel Rule",
      text: "If the action happened yesterday (Past Tense - ed or irregular), always summon DID. It doesn't matter who the person is."
    },
    {
      title: "The Stealth Negatives",
      text: "Words like 'Never', 'Rarely', 'Hardly', and 'Seldom' make the sentence negative ALREADY. This means the tag must be positive! (e.g., He rarely smiles, does he?)"
    },
    {
      title: "The Visible Ghost",
      text: "In negative sentences (You don't like apples), the ghost is already visible ('don't'). Just remove the 'n't' for the tag ('do you?')!"
    }
  ],

  commonMistakes: [
    {
      bad: "They live here, live they?",
      good: "They live here, don't they?",
      reason: "Main Verb Error: You cannot repeat the action verb. You must use a helper (Do)."
    },
    {
      bad: "I have a car, haven't I?",
      good: "I have a car, don't I?",
      reason: "Possession Trap: In ownership, 'have' is a main verb. We summon 'Don't' to help it."
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
      sentence: "He plays guitar",
      tag: "doesn't he?",
      isCorrect: true,
      explanation: "Verb 'plays' has an 's' ➔ Summon 'Does'. Flip to Negative.",
      polarity: Polarity.POSITIVE,
      verbType: "Verb+s (V1+s)"
    },
    {
      sentence: "They went to the park",
      tag: "didn't they?",
      isCorrect: true,
      explanation: "Verb 'went' is past tense ➔ Summon 'Did'. Flip to Negative.",
      polarity: Polarity.POSITIVE,
      verbType: "Past (V2)"
    }
  ]
};