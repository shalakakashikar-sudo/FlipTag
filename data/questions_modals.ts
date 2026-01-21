import { Question, Polarity } from '../types.ts';

// 1. CONDENSED DATA TYPE
// [ID, Sentence, CorrectTag, BadTag1, BadTag2, Aux, Explanation, SentencePolarity]
type RawModalQ = [string, string, string, string, string, string, string, Polarity];

// 2. THE QUESTION BANK (Condensed)
const rawModalsData: RawModalQ[] = [
  // --- TOPIC: CAN (ABILITY) [ID: MOD_CAN_xx] ---
  ["MOD_CAN_01", "You can swim", "can't you?", "don't you?", "can you?", "can", "Positive 'can' flips to 'can't'.", Polarity.POSITIVE],
  ["MOD_CAN_02", "She can dance", "can't she?", "doesn't she?", "is she?", "can", "Positive 'can' flips to 'can't'.", Polarity.POSITIVE],
  ["MOD_CAN_03", "They can hear us", "can't they?", "don't they?", "are they?", "can", "Positive 'can' flips to 'can't'.", Polarity.POSITIVE],
  ["MOD_CAN_04", "It can wait", "can't it?", "doesn't it?", "will it?", "can", "Positive 'can' flips to 'can't'.", Polarity.POSITIVE],
  ["MOD_CAN_05", "We can fix it", "can't we?", "don't we?", "have we?", "can", "Positive 'can' flips to 'can't'.", Polarity.POSITIVE],
  ["MOD_CAN_06", "You can't go", "can you?", "can't you?", "do you?", "can", "Negative 'can't' flips to 'can'.", Polarity.NEGATIVE],
  ["MOD_CAN_07", "He cannot see", "can he?", "can't he?", "does he?", "can", "Negative 'cannot' flips to 'can'.", Polarity.NEGATIVE],
  ["MOD_CAN_08", "She can't drive", "can she?", "can't she?", "does she?", "can", "Negative 'can't' flips to 'can'.", Polarity.NEGATIVE],
  ["MOD_CAN_09", "It can't be true", "can it?", "is it?", "can't it?", "can", "Negative 'can't' flips to 'can'.", Polarity.NEGATIVE],
  ["MOD_CAN_10", "They can't stop", "can they?", "do they?", "are they?", "can", "Negative 'can't' flips to 'can'.", Polarity.NEGATIVE],

  // --- TOPIC: COULD (PAST ABILITY/POSSIBILITY) [ID: MOD_CLD_xx] ---
  ["MOD_CLD_01", "You could help", "couldn't you?", "didn't you?", "can you?", "could", "Positive 'could' flips to 'couldn't'.", Polarity.POSITIVE],
  ["MOD_CLD_02", "She could run fast", "couldn't she?", "can't she?", "didn't she?", "could", "Positive 'could' flips to 'couldn't'.", Polarity.POSITIVE],
  ["MOD_CLD_03", "It could rain", "couldn't it?", "can't it?", "mightn't it?", "could", "Positive 'could' flips to 'couldn't'.", Polarity.POSITIVE],
  ["MOD_CLD_04", "We could try", "couldn't we?", "shouldn't we?", "did we?", "could", "Positive 'could' flips to 'couldn't'.", Polarity.POSITIVE],
  ["MOD_CLD_05", "He could be right", "couldn't he?", "wasn't he?", "is he?", "could", "Positive 'could' flips to 'couldn't'.", Polarity.POSITIVE],
  ["MOD_CLD_06", "You couldn't know", "could you?", "did you?", "couldn't you?", "could", "Negative 'couldn't' flips to 'could'.", Polarity.NEGATIVE],
  ["MOD_CLD_07", "She couldn't come", "could she?", "did she?", "was she?", "could", "Negative 'couldn't' flips to 'could'.", Polarity.NEGATIVE],
  ["MOD_CLD_08", "They couldn't see", "could they?", "did they?", "can they?", "could", "Negative 'couldn't' flips to 'could'.", Polarity.NEGATIVE],
  ["MOD_CLD_09", "It couldn't hurt", "could it?", "did it?", "would it?", "could", "Negative 'couldn't' flips to 'could'.", Polarity.NEGATIVE],
  ["MOD_CLD_10", "We couldn't finish", "could we?", "did we?", "can we?", "could", "Negative 'couldn't' flips to 'could'.", Polarity.NEGATIVE],

  // --- TOPIC: WILL (FUTURE) [ID: MOD_WIL_xx] ---
  ["MOD_WIL_01", "You will win", "won't you?", "willn't you?", "don't you?", "will", "Positive 'will' becomes 'won't'.", Polarity.POSITIVE],
  ["MOD_WIL_02", "She will learn", "won't she?", "will she?", "doesn't she?", "will", "Positive 'will' becomes 'won't'.", Polarity.POSITIVE],
  ["MOD_WIL_03", "They'll be late", "won't they?", "will they?", "aren't they?", "will", "Contraction 'They'll' = 'They will'.", Polarity.POSITIVE],
  ["MOD_WIL_04", "I'll help you", "won't I?", "will I?", "don't I?", "will", "Contraction 'I'll' = 'I will'.", Polarity.POSITIVE],
  ["MOD_WIL_05", "It'll rain soon", "won't it?", "isn't it?", "doesn't it?", "will", "Contraction 'It'll' = 'It will'.", Polarity.POSITIVE],
  ["MOD_WIL_06", "You won't cry", "will you?", "won't you?", "do you?", "will", "Negative 'won't' flips to 'will'.", Polarity.NEGATIVE],
  ["MOD_WIL_07", "He won't stop", "will he?", "won't he?", "does he?", "will", "Negative 'won't' flips to 'will'.", Polarity.NEGATIVE],
  ["MOD_WIL_08", "It won't work", "will it?", "is it?", "does it?", "will", "Negative 'won't' flips to 'will'.", Polarity.NEGATIVE],
  ["MOD_WIL_09", "They won't go", "will they?", "do they?", "are they?", "will", "Negative 'won't' flips to 'will'.", Polarity.NEGATIVE],
  ["MOD_WIL_10", "She won't mind", "will she?", "does she?", "won't she?", "will", "Negative 'won't' flips to 'will'.", Polarity.NEGATIVE],

  // --- TOPIC: WOULD (CONDITIONAL) [ID: MOD_WLD_xx] ---
  ["MOD_WLD_01", "You would go", "wouldn't you?", "will you?", "did you?", "would", "Positive 'would' flips to 'wouldn't'.", Polarity.POSITIVE],
  ["MOD_WLD_02", "She'd like it", "wouldn't she?", "hadn't she?", "didn't she?", "would", "Contraction 'She'd' + V1 (like) = 'She would'.", Polarity.POSITIVE],
  ["MOD_WLD_03", "He'd know", "wouldn't he?", "hadn't he?", "did he?", "would", "Contraction 'He'd' + V1 (know) = 'He would'.", Polarity.POSITIVE],
  ["MOD_WLD_04", "They'd come", "wouldn't they?", "won't they?", "hadn't they?", "would", "Contraction 'They'd' + V1 (come) = 'They would'.", Polarity.POSITIVE],
  ["MOD_WLD_05", "It would break", "wouldn't it?", "won't it?", "didn't it?", "would", "Positive 'would' flips to 'wouldn't'.", Polarity.POSITIVE],
  ["MOD_WLD_06", "You wouldn't lie", "would you?", "wouldn't you?", "did you?", "would", "Negative 'wouldn't' flips to 'would'.", Polarity.NEGATIVE],
  ["MOD_WLD_07", "She wouldn't dare", "would she?", "will she?", "did she?", "would", "Negative 'wouldn't' flips to 'would'.", Polarity.NEGATIVE],
  ["MOD_WLD_08", "He wouldn't mind", "would he?", "will he?", "does he?", "would", "Negative 'wouldn't' flips to 'would'.", Polarity.NEGATIVE],
  ["MOD_WLD_09", "They wouldn't say", "would they?", "did they?", "do they?", "would", "Negative 'wouldn't' flips to 'would'.", Polarity.NEGATIVE],
  ["MOD_WLD_10", "It wouldn't hurt", "would it?", "did it?", "will it?", "would", "Negative 'wouldn't' flips to 'would'.", Polarity.NEGATIVE],

  // --- TOPIC: SHOULD (ADVICE) [ID: MOD_SHD_xx] ---
  ["MOD_SHD_01", "You should study", "shouldn't you?", "don't you?", "wouldn't you?", "should", "Positive 'should' flips to 'shouldn't'.", Polarity.POSITIVE],
  ["MOD_SHD_02", "We should go", "shouldn't we?", "shall we?", "do we?", "should", "Positive 'should' flips to 'shouldn't'.", Polarity.POSITIVE],
  ["MOD_SHD_03", "He should ask", "shouldn't he?", "doesn't he?", "wouldn't he?", "should", "Positive 'should' flips to 'shouldn't'.", Polarity.POSITIVE],
  ["MOD_SHD_04", "They should know", "shouldn't they?", "don't they?", "won't they?", "should", "Positive 'should' flips to 'shouldn't'.", Polarity.POSITIVE],
  ["MOD_SHD_05", "It should work", "shouldn't it?", "doesn't it?", "won't it?", "should", "Positive 'should' flips to 'shouldn't'.", Polarity.POSITIVE],
  ["MOD_SHD_06", "You shouldn't smoke", "should you?", "shouldn't you?", "do you?", "should", "Negative 'shouldn't' flips to 'should'.", Polarity.NEGATIVE],
  ["MOD_SHD_07", "We shouldn't wait", "should we?", "shall we?", "do we?", "should", "Negative 'shouldn't' flips to 'should'.", Polarity.NEGATIVE],
  ["MOD_SHD_08", "She shouldn't drive", "should she?", "does she?", "would she?", "should", "Negative 'shouldn't' flips to 'should'.", Polarity.NEGATIVE],
  ["MOD_SHD_09", "He shouldn't eat", "should he?", "does he?", "did he?", "should", "Negative 'shouldn't' flips to 'should'.", Polarity.NEGATIVE],
  ["MOD_SHD_10", "They shouldn't fight", "should they?", "do they?", "would they?", "should", "Negative 'shouldn't' flips to 'should'.", Polarity.NEGATIVE],

  // --- TOPIC: MUST (OBLIGATION/DEDUCTION) [ID: MOD_MST_xx] ---
  ["MOD_MST_01", "You must go", "mustn't you?", "don't you?", "shouldn't you?", "must", "Positive 'must' flips to 'mustn't'.", Polarity.POSITIVE],
  ["MOD_MST_02", "She must be tired", "mustn't she?", "isn't she?", "doesn't she?", "must", "Positive 'must' flips to 'mustn't'.", Polarity.POSITIVE],
  ["MOD_MST_03", "They must practice", "mustn't they?", "don't they?", "shouldn't they?", "must", "Positive 'must' flips to 'mustn't'.", Polarity.POSITIVE],
  ["MOD_MST_04", "He must know", "mustn't he?", "doesn't he?", "hasn't he?", "must", "Positive 'must' flips to 'mustn't'.", Polarity.POSITIVE],
  ["MOD_MST_05", "It must be true", "mustn't it?", "isn't it?", "can't it?", "must", "Positive 'must' flips to 'mustn't'.", Polarity.POSITIVE],
  ["MOD_MST_06", "You mustn't touch", "must you?", "do you?", "should you?", "must", "Negative 'mustn't' flips to 'must'.", Polarity.NEGATIVE],
  ["MOD_MST_07", "We mustn't tell", "must we?", "do we?", "shall we?", "must", "Negative 'mustn't' flips to 'must'.", Polarity.NEGATIVE],
  ["MOD_MST_08", "They mustn't see", "must they?", "do they?", "will they?", "must", "Negative 'mustn't' flips to 'must'.", Polarity.NEGATIVE],
  ["MOD_MST_09", "He mustn't forget", "must he?", "does he?", "will he?", "must", "Negative 'mustn't' flips to 'must'.", Polarity.NEGATIVE],
  ["MOD_MST_10", "She mustn't run", "must she?", "does she?", "should she?", "must", "Negative 'mustn't' flips to 'must'.", Polarity.NEGATIVE],

  // --- TOPIC: TRICKY SEMI-MODALS (HAVE TO, USED TO, NEED) [ID: MOD_TRK_xx] ---
  ["MOD_TRK_01", "You have to go", "don't you?", "haven't you?", "mustn't you?", "do", "'Have to' acts as a main verb -> use 'do'.", Polarity.POSITIVE],
  ["MOD_TRK_02", "She has to study", "doesn't she?", "hasn't she?", "mustn't she?", "do", "'Has to' acts as a main verb -> use 'does'.", Polarity.POSITIVE],
  ["MOD_TRK_03", "They had to leave", "didn't they?", "hadn't they?", "wouldn't they?", "did", "'Had to' is past tense -> use 'did'.", Polarity.POSITIVE],
  ["MOD_TRK_04", "You don't have to", "do you?", "have you?", "must you?", "do", "Negative 'don't have to' -> use 'do'.", Polarity.NEGATIVE],
  ["MOD_TRK_05", "He used to smoke", "didn't he?", "usedn't he?", "doesn't he?", "did", "'Used to' is past tense -> use 'did'.", Polarity.POSITIVE],
  ["MOD_TRK_06", "She used to sing", "didn't she?", "usedn't she?", "wouldn't she?", "did", "'Used to' is past tense -> use 'did'.", Polarity.POSITIVE],
  ["MOD_TRK_07", "You need to rest", "don't you?", "needn't you?", "aren't you?", "do", "'Need to' is a main verb -> use 'do'.", Polarity.POSITIVE],
  ["MOD_TRK_08", "He needs a pen", "doesn't he?", "needn't he?", "hasn't he?", "do", "'Needs' is a main verb -> use 'does'.", Polarity.POSITIVE],
  ["MOD_TRK_09", "She needn't worry", "need she?", "does she?", "will she?", "need", "'Needn't' makes 'need' a modal -> repeat 'need'.", Polarity.NEGATIVE],
  ["MOD_TRK_10", "We ought to go", "oughtn't we?", "shouldn't we?", "don't we?", "ought", "'Ought to' is a semi-modal -> 'oughtn't' (or shouldn't).", Polarity.POSITIVE],
  
  // --- TOPIC: IMPERATIVES & SUGGESTIONS [ID: MOD_IMP_xx] ---
  ["MOD_IMP_01", "Open the window", "will you?", "do you?", "can you?", "will", "Command/Request -> 'will you?'.", Polarity.POSITIVE],
  ["MOD_IMP_02", "Don't be late", "will you?", "do you?", "are you?", "will", "Negative Command -> 'will you?'.", Polarity.NEGATIVE],
  ["MOD_IMP_03", "Let's go home", "shall we?", "will we?", "do we?", "shall", "Suggestion 'Let's' -> 'shall we?'.", Polarity.POSITIVE],
  ["MOD_IMP_04", "Let's not argue", "shall we?", "will we?", "do we?", "shall", "Suggestion 'Let's not' -> 'shall we?'.", Polarity.POSITIVE],
  ["MOD_IMP_05", "Pass me the salt", "will you?", "won't you?", "do you?", "will", "Polite Request -> 'will you?'.", Polarity.POSITIVE],
  ["MOD_IMP_06", "Shut up", "can't you?", "will you?", "do you?", "can", "Impolite Command -> 'can't you?' (shows annoyance).", Polarity.POSITIVE],
  ["MOD_IMP_07", "Have a seat", "won't you?", "will you?", "do you?", "will", "Invitation -> 'won't you?' (polite).", Polarity.POSITIVE],
  ["MOD_IMP_08", "Help me out", "will you?", "do you?", "don't you?", "will", "Request -> 'will you?'.", Polarity.POSITIVE],
  ["MOD_IMP_09", "Don't forget", "will you?", "do you?", "won't you?", "will", "Negative Command -> 'will you?'.", Polarity.NEGATIVE],
  ["MOD_IMP_10", "Let us go", "will you?", "shall we?", "do you?", "will", "Permission 'Let us' (not Let's) -> 'will you?'.", Polarity.POSITIVE]
];

// 3. HYDRATION FUNCTION
const generateModalsQuestions = (): Question[] => {
  return rawModalsData.map(data => {
    const [id, sentence, correct, dist1, dist2, aux, exp, polarity] = data;
    
    // Auto-calculate polarities for distractors logic
    const correctTagPolarity = polarity === Polarity.POSITIVE 
      ? Polarity.NEGATIVE 
      : Polarity.POSITIVE;

    const dist1Polarity = correctTagPolarity === Polarity.POSITIVE 
      ? Polarity.NEGATIVE 
      : Polarity.POSITIVE;

    return {
      id,
      sentence,
      options: [
        { text: correct, polarity: correctTagPolarity },
        { text: dist1, polarity: dist1Polarity },
        { text: dist2, polarity: dist1Polarity }
      ].sort(() => Math.random() - 0.5),
      correctAnswer: correct,
      sentencePolarity: polarity,
      tagPolarity: correctTagPolarity,
      explanation: exp,
      auxiliary: aux
    };
  });
};

// 4. EXPORT THE GENERATED BANK
export const modalsQuestions = generateModalsQuestions();