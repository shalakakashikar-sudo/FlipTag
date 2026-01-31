import { LearnUnit } from '../types.ts';
import { foundationsTopic } from './topics_foundations.ts';
import { foundationsQuestions } from './questions_foundations.ts';
import { auxiliariesTopic } from './topics_auxiliaries.ts';
import { auxiliariesQuestions } from './questions_auxiliaries.ts';
import { modalsTopic } from './topics_modals.ts';
import { modalsQuestions } from './questions_modals.ts';
import { advancedTopic } from './topics_advanced.ts';
import { advancedQuestions } from './questions_advanced.ts';

export const LEARN_UNITS: LearnUnit[] = [
  {
    ...foundationsTopic,
    practiceQuestions: foundationsQuestions
  },
  {
    ...auxiliariesTopic,
    practiceQuestions: auxiliariesQuestions
  },
  {
    ...modalsTopic,
    practiceQuestions: modalsQuestions
  },
  {
    ...advancedTopic,
    practiceQuestions: advancedQuestions
  }
];