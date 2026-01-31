import { Polarity } from '../types.ts';

export const modalsTopic = {
  id: 'modals',
  title: 'Modal Mastery',
  subtitle: 'The Boomerang Verbs',
  concept: 'Modals (Can, Will, Should, Must) are "Boomerang Verbs". Unlike normal verbs, you don\'t summon "Do". You throw "Can" in the sentence, and "Can\'t" bounces back in the tag!',
  
  infographicData: {
    title: "The Mirror Effect",
    steps: [
      { 
        trigger: "CAN", 
        action: "CAN'T", 
        color: "#0ea5e9", 
        icon: "⚡"
      },
      { 
        trigger: "WILL", 
        action: "WON'T", 
        color: "#f43f5e", 
        icon: "🔮"
      },
      { 
        trigger: "MUST", 
        action: "MUSTN'T / ISN'T", 
        color: "#10b981", 
        icon: "🛑"
      }
    ],
    ruleSummary: "Don't change the verb! Just flip the polarity."
  },

  proTips: [
    {
      title: "Cracking the 'd Code (Part 2)",
      text: "If you see 'd followed by a Base Verb/V1 (e.g., She'd eat), it means WOULD. The tag must be 'wouldn't she?'."
    },
    {
      title: "The 'd Special: Better vs Rather",
      text: "'You'd better' ALWAYS uses 'hadn't you?'. 'You'd rather' ALWAYS uses 'wouldn't you?'. Look at the word immediately after the 'd!"
    },
    {
      title: "The 'Let's' vs 'Let me' Rule",
      text: "'Let's' (Let us) = Suggestion -> 'shall we?'. 'Let me/him/them' = Permission -> 'will you?'."
    },
    {
      title: "The Imperative Scale",
      text: "Positive Commands (Stop it) can use 'will you/won't you/can you/could you'. Negative Commands (Don't stop) ALWAYS use 'will you?'."
    },
    {
      title: "The Two Masks of 'Must'",
      text: "1. Obligation: 'You must go' -> 'mustn't you?'. 2. Deduction (Fact): 'He must be tired' -> 'isn't he?' (Tag the 'be', not the 'must')."
    },
    {
      title: "Ought To",
      text: "'Ought to' is formal. The tag is 'oughtn't you?' (very formal) or 'shouldn't you?' (common usage)."
    },
    {
      title: "Used To",
      text: "'Used to' describes a past habit. It behaves like a past tense verb. Tag: 'didn't you?'."
    },
    {
      title: "Needn't vs Don't Need",
      text: "'You needn't worry' (Modal) -> 'need you?'. 'You don't need to worry' (Verb) -> 'do you?'."
    }
  ],

  commonMistakes: [
    {
      bad: "We will go, willn't we?",
      good: "We will go, won't we?",
      reason: "Spelling: The negative of 'Will' is 'Won't'. The negative of 'Shall' is 'Shan't'."
    },
    {
      bad: "You'd better run, wouldn't you?",
      good: "You'd better run, hadn't you?",
      reason: "Contraction Trap: In 'had better', the 'd stands for 'had', not 'would'."
    },
    {
      bad: "Let's dance, will we?",
      good: "Let's dance, shall we?",
      reason: "Suggestion Rule: 'Let's' always takes 'shall we'."
    }
  ],

  examples: [
    {
      sentence: "You can swim",
      tag: "can't you?",
      isCorrect: true,
      explanation: "Modal 'Can' bounces back as 'Can't'.",
      polarity: Polarity.POSITIVE
    },
    {
      sentence: "Open the window",
      tag: "will you?",
      isCorrect: true,
      explanation: "Imperative (Command). 'Will you' makes it polite.",
      polarity: Polarity.POSITIVE
    },
    {
      sentence: "He'd rather stay",
      tag: "wouldn't he?",
      isCorrect: true,
      explanation: "'d rather = would rather. Tag is 'wouldn't'.",
      polarity: Polarity.POSITIVE
    }
  ]
};