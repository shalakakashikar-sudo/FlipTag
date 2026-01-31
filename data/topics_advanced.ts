import { Polarity } from '../types.ts';

export const advancedTopic = {
  id: 'advanced',
  title: 'The Rule Breakers',
  subtitle: 'Sarcasm, Surprise, and Style',
  concept: 'Rules are made to be broken! Sometimes we DON\'T flip the polarity. Native speakers use these "Same-Way Tags" to show emotions like surprise, anger, interest, or sarcasm.',
  
  infographicData: {
    title: "The Emotional Override",
    steps: [
      { 
        trigger: "Positive Sentence (+)", 
        action: "Positive Tag (+)", 
        color: "#f59e0b", 
        icon: "😲"
      },
      { 
        trigger: "Negative Sentence (-)", 
        action: "Negative Tag (-)", 
        color: "#6366f1", 
        icon: "😒"
      },
      { 
        trigger: "Emotion", 
        action: "Sarcasm / Surprise", 
        color: "#ef4444", 
        icon: "🎭"
      }
    ],
    ruleSummary: "If you are mimicking, mocking, or reacting with surprise, don't flip the tag!"
  },

  proTips: [
    {
      title: "Same-Way Tags (The Copycat)",
      text: "If you repeat the polarity (You are late, are you?), it indicates interest, surprise, or sarcasm. It's like saying: 'Oh, so that's the situation, is it?'"
    },
    {
      title: "The Aggressive Imperative",
      text: "For commands, 'will you?' is standard. But if you are angry or impatient, use 'can't you?'. (e.g., 'Shut up, can't you?')"
    },
    {
      title: "Exclamations with 'What' & 'How'",
      text: "In exclamations like 'What a beautiful painting!', tag the hidden verb 'be'. -> 'isn't it?'. (e.g., 'How lovely she looks, doesn't she?')"
    },
    {
      title: "The 'May' & 'Dare' Modal Trap",
      text: "'May' is rare in tags. Use 'mightn't' or 'can't' instead. 'Dare' as a modal uses 'dare I?'. (e.g., 'How dare you, dare you?')"
    },
    {
      title: "Inverted Negatives",
      text: "Sentences starting with 'Never' or 'Rarely' often invert the verb. The tag remains positive. (e.g., 'Never have I been so insulted, have I?')"
    },
    {
      title: "Dialect Shortcut: 'Innit'",
      text: "In British slang, 'innit' replaces every tag. In US English, 'right?' is used. These are called 'Invariant Tags'—they never change form!"
    },
    {
      title: "Conditional Tagging",
      text: "When using 'If' clauses, we almost always tag the MAIN clause, not the 'if' part. (e.g., 'If it rains, we'll stay home, won't we?')"
    }
  ],

  commonMistakes: [
    {
      bad: "So you think you're smart, aren't you?",
      good: "So you think you're smart, do you?",
      reason: "Sarcastic Tone: When challenging someone's statement, we use a same-way tag."
    },
    {
      bad: "What a great day, wasn't it?",
      good: "What a great day, isn't it?",
      reason: "Tense Match: Exclamations about the present need a present tag."
    },
    {
      bad: "I may leave now, mayn't I?",
      good: "I may leave now, mightn't I?",
      reason: "Modal Sound: 'Mayn't' is extremely archaic. 'Mightn't' or 'Can't' sounds natural."
    }
  ],

  examples: [
    {
      sentence: "Oh, you think this is a joke",
      tag: "do you?",
      isCorrect: true,
      explanation: "Positive to Positive indicates a challenge or sarcasm.",
      polarity: Polarity.POSITIVE
    },
    {
      sentence: "How quickly they grow up",
      tag: "don't they?",
      isCorrect: true,
      explanation: "Exclamation requires tagging the main action verb 'grow up'.",
      polarity: Polarity.POSITIVE
    },
    {
      sentence: "I'd better not tell him",
      tag: "had I?",
      isCorrect: true,
      explanation: "'Had better' is the auxiliary here. Negative sentence needs positive tag.",
      polarity: Polarity.NEGATIVE
    }
  ]
};