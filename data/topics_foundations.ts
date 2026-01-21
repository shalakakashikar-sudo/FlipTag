
import { Polarity } from '../types.ts';

export const foundationsTopic = {
  id: 'foundations',
  title: 'The Polarity Flip',
  subtitle: 'Balancing the Scales',
  concept: 'English sentences act like a seesaw. To keep the conversation balanced, a heavy "Positive" sentence needs a light "Negative" tag, and vice versa. We call this the Polarity Flip.',
  
  infographicData: {
    title: "The Logic of Opposites",
    steps: [
      { 
        trigger: "Positive Sentence (+)", 
        action: "Negative Tag (-)", 
        color: "#4ade80", 
        icon: "➕"
      },
      { 
        trigger: "Negative Sentence (-)", 
        action: "Positive Tag (+)", 
        color: "#fb923c", 
        icon: "➖"
      }
    ],
    ruleSummary: "If one side is YES, the other side must be NO."
  },

  proTips: [
    {
      title: "The Contraction Mandate",
      text: "Negative tags MUST be short! We never say 'is not it?'. We always shrink it to 'isn't it?'. The only exception is 'am I not?' (formal)."
    },
    {
      title: "The 'No Names' Policy",
      text: "Tags are lazy. They never use names like 'Mary' or 'The Dog'. They only use pronouns: he, she, it, or they."
    },
    {
      title: "The Comma Separator",
      text: "A tag is an afterthought. Always separate the main sentence and the tag with a comma."
    }
  ],

  commonMistakes: [
    {
      bad: "She is happy, is she?",
      good: "She is happy, isn't she?",
      reason: "The Echo Error: You repeated the positive. You must flip (+) to (-)."
    },
    {
      bad: "John is tall, isn't John?",
      good: "John is tall, isn't he?",
      reason: "Name Repetition: Never repeat the name in the tag. Swap 'John' for 'he'."
    }
  ],

  examples: [
    {
      sentence: "She is your sister",
      tag: "isn't she?",
      isCorrect: true,
      explanation: "Sentence is (+). Tag flips to (-).",
      polarity: Polarity.POSITIVE
    },
    {
      sentence: "You aren't late",
      tag: "are you?",
      isCorrect: true,
      explanation: "Sentence contains 'n't' (-). Tag removes it (+).",
      polarity: Polarity.NEGATIVE
    },
    {
      sentence: "The cat is sleeping",
      tag: "isn't it?",
      isCorrect: true,
      explanation: "'The cat' becomes 'it'. 'Is' becomes 'isn't'.",
      polarity: Polarity.POSITIVE
    }
  ],

  deepDive: {
    origin: {
      title: "Why do we do this?",
      description: "We use tags to invite people into the conversation. It changes a statement (fact) into a collaboration (checking for agreement).",
      visual: "Statement = 🧱 Wall. Tag = 🚪 Door."
    }
  }
};
