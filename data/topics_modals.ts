import { Polarity } from '../types.ts';

export const modalsTopic = {
  id: 'modals',
  title: 'Modal Mastery',
  subtitle: 'The Boomerang Verbs',
  concept: 'Modals (Can, Will, Should, Must) are "Boomerang Verbs". Unlike normal verbs where you have to summon "Do", modals always come back in the tag! You throw "Can" in the sentence, and "Can\'t" bounces back in the tag.',
  
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
        trigger: "SHOULD", 
        action: "SHOULDN'T", 
        color: "#8b5cf6", 
        icon: "⚖️"
      }
    ],
    ruleSummary: "Don't change the verb! Just flip the polarity."
  },

  proTips: [
    {
      title: "Suggestions with Let's",
      text: "When you start with 'Let's' (Let us), the tag is always 'shall we?'. It's an invitation to join the action!"
    },
    {
      title: "Commands & Requests",
      text: "When telling someone to do something (Close the door), use 'will you?' in the tag. It's like asking for cooperation."
    },
    {
      title: "Used To -> Did",
      text: "The semi-modal 'Used to' acts like the past tense. Use 'didn't' in the tag. (e.g., You used to smoke, didn't you?)"
    },
    {
      title: "The Spelling Trap",
      text: "English is weird! The negative of 'Will' is 'Won't' (not 'willn't'). The negative of 'Shall' is 'Shan't'."
    }
  ],

  commonMistakes: [
    {
      bad: "We will go, willn't we?",
      good: "We will go, won't we?",
      reason: "Spelling Error: 'Won't' is the unique contraction for Will + Not."
    },
    {
      bad: "They must study, don't they?",
      good: "They must study, mustn't they?",
      reason: "Modal Loyalty: 'Must' is a modal. It repeats itself. Do not switch to 'Do'."
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
      sentence: "They won't be late",
      tag: "will they?",
      isCorrect: true,
      explanation: "Negative 'Won't' flips back to positive 'Will'.",
      polarity: Polarity.NEGATIVE
    }
  ]
};