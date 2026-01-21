
import { Question, Polarity } from '../types.ts';

export const modalsQuestions: Question[] = [
  {
    id: 'm1',
    sentence: 'You should apologize',
    options: [
      { text: "should you?", polarity: Polarity.POSITIVE },
      { text: "shouldn't you?", polarity: Polarity.NEGATIVE },
      { text: "won't you?", polarity: Polarity.NEGATIVE }
    ],
    correctAnswer: "shouldn't you?",
    sentencePolarity: Polarity.POSITIVE,
    tagPolarity: Polarity.NEGATIVE,
    explanation: 'Should flips to shouldn\'t.',
    auxiliary: 'should'
  }
];
