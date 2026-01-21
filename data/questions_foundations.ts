
import { Question, Polarity } from '../types.ts';

export const foundationsQuestions: Question[] = [
  {
    id: 'f1',
    sentence: 'It is Monday today',
    options: [
      { text: "is it?", polarity: Polarity.POSITIVE },
      { text: "isn't it?", polarity: Polarity.NEGATIVE },
      { text: "it is?", polarity: Polarity.POSITIVE }
    ],
    correctAnswer: "isn't it?",
    sentencePolarity: Polarity.POSITIVE,
    tagPolarity: Polarity.NEGATIVE,
    explanation: 'Positive sentence + Negative tag = Perfect Flip!',
    auxiliary: 'is'
  },
  {
    id: 'f2',
    sentence: 'You aren\'t tired',
    options: [
      { text: "aren't you?", polarity: Polarity.NEGATIVE },
      { text: "are you?", polarity: Polarity.POSITIVE },
      { text: "you are?", polarity: Polarity.NEGATIVE }
    ],
    correctAnswer: "are you?",
    sentencePolarity: Polarity.NEGATIVE,
    tagPolarity: Polarity.POSITIVE,
    explanation: 'Negative sentence + Positive tag = Perfect Flip!',
    auxiliary: 'are'
  }
];
