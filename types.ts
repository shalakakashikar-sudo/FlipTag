
export enum Polarity {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  NEUTRAL = 'neutral',
  GREY = 'grey'
}

export enum MascotState {
  IDLE = 'idle',
  HAPPY = 'happy',
  CONFUSED = 'confused',
  THINKING = 'thinking'
}

export interface QuestionOption {
  text: string;
  polarity: Polarity;
}

export interface Question {
  id: string;
  sentence: string;
  options: QuestionOption[];
  correctAnswer: string;
  sentencePolarity: Polarity;
  tagPolarity: Polarity;
  context?: string;
  explanation: string;
  auxiliary: string;
}

export interface ProTip {
  title?: string;
  text: string;
}

export interface InfographicStep {
  trigger: string;
  action?: string;
  summon?: string;
  color: string;
  icon?: string;
}

export interface LearnUnit {
  id: string;
  title: string;
  subtitle?: string;
  concept: string;
  infographicData: {
    title?: string;
    steps: InfographicStep[];
    ruleSummary: string;
  };
  proTips: ProTip[];
  commonMistakes: Array<{
    bad: string;
    good: string;
    reason: string;
  }>;
  examples: Array<{
    sentence: string;
    tag: string;
    isCorrect: boolean;
    explanation: string;
    polarity: Polarity;
    verbType?: string;
  }>;
  practiceQuestions: Question[];
  deepDive?: any;
}

export type View = 'home' | 'learn' | 'practice' | 'challenge' | 'unit-selection';
