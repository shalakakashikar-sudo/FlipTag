
import { Question, Polarity } from '../types.ts';

export const auxiliariesQuestions: Question[] = [
  {
    id: 'a1',
    sentence: 'They live in Mumbai',
    options: [
      { text: "do they?", polarity: Polarity.POSITIVE },
      { text: "don't they?", polarity: Polarity.NEGATIVE },
      { text: "didn't they?", polarity: Polarity.NEGATIVE }
    ],
    correctAnswer: "don't they?",
    sentencePolarity: Polarity.POSITIVE,
    tagPolarity: Polarity.NEGATIVE,
    explanation: 'Present simple "live" needs "don\'t".',
    auxiliary: 'do'
  },
  {
    id: 'a2',
    sentence: 'He passed the exam',
    options: [
      { text: "did he?", polarity: Polarity.POSITIVE },
      { text: "didn't he?", polarity: Polarity.NEGATIVE },
      { text: "doesn't he?", polarity: Polarity.NEGATIVE }
    ],
    correctAnswer: "didn't he?",
    sentencePolarity: Polarity.POSITIVE,
    tagPolarity: Polarity.NEGATIVE,
    explanation: 'Past simple "passed" needs "didn\'t".',
    auxiliary: 'did'
  }
];
