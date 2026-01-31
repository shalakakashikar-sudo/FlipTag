
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
      text: "Negative tags MUST be short! Use 'isn't it?' instead of 'is not it?'. The only exception is the formal 'am I not?'."
    },
    {
      title: "The 'I Am' Exception",
      text: "This is a classic trap! 'I am a student' flips to 'aren't I?'. However, the negative 'I am not late' stays regular: 'am I?'."
    },
    {
      title: "Pronoun Swapping",
      text: "Never use names in tags. 'Mary' becomes 'she', 'John' becomes 'he', and 'The car' becomes 'it'. Even 'The police' becomes 'they'."
    },
    {
      title: "People vs. Things (Indefinite Pronouns)",
      text: "Words ending in -one or -body (Everyone, Somebody, No one) use 'they' in the tag. Words ending in -thing (Everything, Nothing) use 'it' in the tag."
    },
    {
      title: "Opinion Clauses (I think...)",
      text: "If you start with 'I think' or 'I believe', you tag the OTHER clause. 'I think she is late, isn't she?' (Not 'don't I?')."
    },
    {
      title: "This, That, These, Those",
      text: "'This' and 'That' become 'it' in the tag. 'These' and 'Those' become 'they' in the tag."
    },
    {
      title: "The 'There' Rule",
      text: "If a sentence starts with 'There' (There is a book), the tag keeps 'there' as the subject (isn't there?)."
    },
    {
      title: "Collective Nouns",
      text: "Words like 'Staff', 'Team', or 'Police' are usually treated as plural in tags. Use 'they'. (e.g., 'The team are ready, aren't they?')"
    }
  ],

  commonMistakes: [
    {
      bad: "She is happy, is she?",
      good: "She is happy, isn't she?",
      reason: "The Echo Error: You repeated the positive. You must flip (+) to (-)."
    },
    {
      bad: "Everything is ready, aren't they?",
      good: "Everything is ready, isn't it?",
      reason: "Thing Mistake: 'Everything' refers to a situation/thing, so use 'it', not 'they'."
    },
    {
      bad: "I think he's right, don't I?",
      good: "I think he's right, isn't he?",
      reason: "Opinion Error: We are confirming the fact (he is right), not the act of thinking."
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
      sentence: "The police have arrived",
      tag: "haven't they?",
      isCorrect: true,
      explanation: "'The police' is treated as a plural group (They).",
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
