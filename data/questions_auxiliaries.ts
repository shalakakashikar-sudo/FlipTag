
import { Question, Polarity } from '../types.ts';

// 1. CONDENSED DATA TYPE
// [ID, Sentence, CorrectTag, BadTag1, BadTag2, Aux, Explanation, SentencePolarity]
type RawQ = [string, string, string, string, string, string, string, Polarity];

// 2. THE 150 QUESTIONS (Condensed)
const rawData: RawQ[] = [
  // --- TOPIC: TO BE (PRESENT) [ID: BE_PRE_xx] ---
  ["BE_PRE_01", "She is a doctor", "isn't she?", "is she?", "doesn't she?", "be", "Positive 'is' needs negative 'isn't'.", Polarity.POSITIVE],
  ["BE_PRE_02", "They are happy", "aren't they?", "are they?", "do they?", "be", "Positive 'are' needs negative 'aren't'.", Polarity.POSITIVE],
  ["BE_PRE_03", "It is raining", "isn't it?", "is it?", "doesn't it?", "be", "Positive 'is' needs negative 'isn't'.", Polarity.POSITIVE],
  ["BE_PRE_04", "You are late", "aren't you?", "are you?", "don't you?", "be", "Positive 'are' needs negative 'aren't'.", Polarity.POSITIVE],
  ["BE_PRE_05", "He isn't home", "is he?", "isn't he?", "does he?", "be", "Negative 'isn't' needs positive 'is'.", Polarity.NEGATIVE],
  ["BE_PRE_06", "We aren't lost", "are we?", "aren't we?", "do we?", "be", "Negative 'aren't' needs positive 'are'.", Polarity.NEGATIVE],
  ["BE_PRE_07", "I am right", "aren't I?", "am I?", "amn't I?", "be", "Exception: 'I am' becomes 'aren't I'.", Polarity.POSITIVE],
  ["BE_PRE_08", "The sky is blue", "isn't it?", "is it?", "wasn't it?", "be", "Subject 'The sky' becomes 'it'.", Polarity.POSITIVE],
  ["BE_PRE_09", "Those are yours", "aren't they?", "aren't those?", "don't they?", "be", "Subject 'Those' becomes 'they'.", Polarity.POSITIVE],
  ["BE_PRE_10", "This is fun", "isn't it?", "isn't this?", "doesn't it?", "be", "Subject 'This' becomes 'it'.", Polarity.POSITIVE],
  ["BE_PRE_11", "I'm not late", "am I?", "aren't I?", "do I?", "be", "Negative 'I'm not' becomes 'am I'.", Polarity.NEGATIVE],
  ["BE_PRE_12", "You aren't tired", "are you?", "aren't you?", "have you?", "be", "Negative 'aren't' becomes 'are'.", Polarity.NEGATIVE],
  ["BE_PRE_13", "It is not fair", "is it?", "isn't it?", "does it?", "be", "Negative 'is not' becomes 'is'.", Polarity.NEGATIVE],
  ["BE_PRE_14", "They're coming", "aren't they?", "are they?", "don't they?", "be", "Contraction 'They're' = 'They are'.", Polarity.POSITIVE],
  ["BE_PRE_15", "She's your sister", "isn't she?", "is she?", "hasn't she?", "be", "Contraction 'She's' = 'She is'.", Polarity.POSITIVE],

  // --- TOPIC: TO BE (PAST) [ID: BE_PST_xx] ---
  ["BE_PST_01", "He was there", "wasn't he?", "was he?", "didn't he?", "be", "Past 'was' becomes 'wasn't'.", Polarity.POSITIVE],
  ["BE_PST_02", "They were friends", "weren't they?", "wasn't they?", "didn't they?", "be", "Past 'were' becomes 'weren't'.", Polarity.POSITIVE],
  ["BE_PST_03", "It wasn't cold", "was it?", "wasn't it?", "did it?", "be", "Negative 'wasn't' becomes 'was'.", Polarity.NEGATIVE],
  ["BE_PST_04", "We were winning", "weren't we?", "were we?", "hadn't we?", "be", "Past 'were' becomes 'weren't'.", Polarity.POSITIVE],
  ["BE_PST_05", "She wasn't ready", "was she?", "wasn't she?", "did she?", "be", "Negative 'wasn't' becomes 'was'.", Polarity.NEGATIVE],
  ["BE_PST_06", "You were sleeping", "weren't you?", "were you?", "didn't you?", "be", "Past 'were' becomes 'weren't'.", Polarity.POSITIVE],
  ["BE_PST_07", "The movie was long", "wasn't it?", "was it?", "didn't it?", "be", "'The movie' becomes 'it'.", Polarity.POSITIVE],
  ["BE_PST_08", "My keys were here", "weren't they?", "wasn't they?", "are they?", "be", "'My keys' (plural) becomes 'they'.", Polarity.POSITIVE],
  ["BE_PST_09", "There was a noise", "wasn't there?", "wasn't it?", "didn't there?", "be", "Subject 'There' remains 'there'.", Polarity.POSITIVE],
  ["BE_PST_10", "There were plenty", "weren't there?", "weren't they?", "didn't there?", "be", "Subject 'There' remains 'there'.", Polarity.POSITIVE],

  // --- TOPIC: DO/DOES (SIMPLE PRESENT) [ID: AUX_DO_xx] ---
  ["AUX_DO_01", "You play piano", "don't you?", "do you?", "aren't you?", "do", "V1 'play' summons 'don't'.", Polarity.POSITIVE],
  ["AUX_DO_02", "She likes jazz", "doesn't she?", "don't she?", "isn't she?", "do", "V1+s 'likes' summons 'doesn't'.", Polarity.POSITIVE],
  ["AUX_DO_03", "They live here", "don't they?", "didn't they?", "aren't they?", "do", "V1 'live' summons 'don't'.", Polarity.POSITIVE],
  ["AUX_DO_04", "He works hard", "doesn't he?", "don't he?", "isn't he?", "do", "V1+s 'works' summons 'doesn't'.", Polarity.POSITIVE],
  ["AUX_DO_05", "It smells good", "doesn't it?", "don't it?", "isn't it?", "do", "V1+s 'smells' summons 'doesn't'.", Polarity.POSITIVE],
  ["AUX_DO_06", "We need water", "don't we?", "aren't we?", "haven't we?", "do", "V1 'need' summons 'don't'.", Polarity.POSITIVE],
  ["AUX_DO_07", "You don't smoke", "do you?", "don't you?", "are you?", "do", "Negative 'don't' becomes 'do'.", Polarity.NEGATIVE],
  ["AUX_DO_08", "She doesn't know", "does she?", "doesn't she?", "is she?", "do", "Negative 'doesn't' becomes 'does'.", Polarity.NEGATIVE],
  ["AUX_DO_09", "They don't care", "do they?", "don't they?", "are they?", "do", "Negative 'don't' becomes 'do'.", Polarity.NEGATIVE],
  ["AUX_DO_10", "He rarely smiles", "does he?", "doesn't he?", "is he?", "do", "Tricky: 'Rarely' is negative! Tag is positive.", Polarity.NEGATIVE],
  ["AUX_DO_11", "I hardly speak", "do I?", "don't I?", "am I?", "do", "Tricky: 'Hardly' is negative! Tag is positive.", Polarity.NEGATIVE],
  ["AUX_DO_12", "You have a car", "don't you?", "aren't you?", "will you?", "do", "Possession 'have' needs helper 'do'.", Polarity.POSITIVE],
  ["AUX_DO_13", "She has a bike", "doesn't she?", "is she?", "can she?", "do", "Possession 'has' needs helper 'does'.", Polarity.POSITIVE],
  ["AUX_DO_14", "Everyone knows", "don't they?", "doesn't he?", "do they?", "do", "Subject 'Everyone' takes 'they'. 'They' needs 'don't'.", Polarity.POSITIVE],
  ["AUX_DO_15", "Nobody listens", "do they?", "don't they?", "does he?", "do", "'Nobody' is negative & becomes 'they'. Tag is positive.", Polarity.NEGATIVE],
  
  // --- TOPIC: DID (SIMPLE PAST) [ID: AUX_DID_xx] ---
  ["AUX_DID_01", "It rained yesterday", "didn't it?", "doesn't it?", "wasn't it?", "did", "Past V2 'rained' summons 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_02", "You saw him", "didn't you?", "don't you?", "sawn't you?", "did", "Past V2 'saw' summons 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_03", "They went home", "didn't they?", "weren't they?", "don't they?", "did", "Past V2 'went' summons 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_04", "She called you", "didn't she?", "doesn't she?", "wasn't she?", "did", "Past V2 'called' summons 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_05", "We finished it", "didn't we?", "don't we?", "haven't we?", "did", "Past V2 'finished' summons 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_06", "You didn't go", "did you?", "didn't you?", "were you?", "did", "Negative 'didn't' becomes 'did'.", Polarity.NEGATIVE],
  ["AUX_DID_07", "He didn't eat", "did he?", "didn't he?", "was he?", "did", "Negative 'didn't' becomes 'did'.", Polarity.NEGATIVE],
  ["AUX_DID_08", "She never came", "did she?", "didn't she?", "was she?", "did", "'Never' + Past = Negative. Tag is positive 'did'.", Polarity.NEGATIVE],
  ["AUX_DID_09", "Nothing happened", "did it?", "didn't it?", "was it?", "did", "'Nothing' is negative. 'Happened' is past.", Polarity.NEGATIVE],
  ["AUX_DID_10", "You used to swim", "didn't you?", "usedn't you?", "don't you?", "did", "'Used to' is past tense. Summon 'didn't'.", Polarity.POSITIVE],

  // --- TOPIC: HAVE/HAS/HAD (PERFECT) [ID: AUX_PRF_xx] ---
  ["AUX_PRF_01", "You have eaten", "haven't you?", "don't you?", "didn't you?", "have", "Auxiliary 'have' repeats.", Polarity.POSITIVE],
  ["AUX_PRF_02", "She has gone", "hasn't she?", "doesn't she?", "isn't she?", "have", "Auxiliary 'has' repeats.", Polarity.POSITIVE],
  ["AUX_PRF_03", "They haven't seen", "have they?", "haven't they?", "do they?", "have", "Negative 'haven't' becomes 'have'.", Polarity.NEGATIVE],
  ["AUX_PRF_04", "He hasn't arrived", "has he?", "hasn't he?", "does he?", "have", "Negative 'hasn't' becomes 'has'.", Polarity.NEGATIVE],
  ["AUX_PRF_05", "It has stopped", "hasn't it?", "doesn't it?", "isn't it?", "have", "Auxiliary 'has' repeats.", Polarity.POSITIVE],
  ["AUX_PRF_06", "We had met before", "hadn't we?", "didn't we?", "haven't we?", "have", "Past Perfect 'had' repeats.", Polarity.POSITIVE],
  ["AUX_PRF_07", "You hadn't left", "had you?", "hadn't you?", "did you?", "have", "Negative 'hadn't' becomes 'had'.", Polarity.NEGATIVE],
  ["AUX_PRF_08", "She'd done it", "hadn't she?", "wouldn't she?", "didn't she?", "have", "Contraction 'She'd' + V3 (done) = 'She had'.", Polarity.POSITIVE],
  ["AUX_PRF_09", "He's visited Paris", "hasn't he?", "isn't he?", "doesn't he?", "have", "Contraction 'He's' + V3 (visited) = 'He has'.", Polarity.POSITIVE],
  ["AUX_PRF_10", "They'd gone out", "hadn't they?", "wouldn't they?", "didn't they?", "have", "Contraction 'They'd' + V3 (gone) = 'They had'.", Polarity.POSITIVE],

  // --- TOPIC: MODALS (CAN/COULD) [ID: MOD_CAN_xx] ---
  ["MOD_CAN_01", "You can swim", "can't you?", "don't you?", "can you?", "can", "Modal 'can' becomes 'can't'.", Polarity.POSITIVE],
  ["MOD_CAN_02", "She can't hear", "can she?", "can't she?", "does she?", "can", "Negative 'can't' becomes 'can'.", Polarity.NEGATIVE],
  ["MOD_CAN_03", "They could help", "couldn't they?", "can't they?", "didn't they?", "could", "Modal 'could' becomes 'couldn't'.", Polarity.POSITIVE],
  ["MOD_CAN_04", "He couldn't see", "could he?", "couldn't he?", "did he?", "could", "Negative 'couldn't' becomes 'could'.", Polarity.NEGATIVE],
  ["MOD_CAN_05", "It can wait", "can't it?", "doesn't it?", "won't it?", "can", "Modal 'can' becomes 'can't'.", Polarity.POSITIVE],

  // --- TOPIC: MODALS (WILL/WOULD) [ID: MOD_WIL_xx] ---
  ["MOD_WIL_01", "You will go", "won't you?", "willn't you?", "don't you?", "will", "Positive 'will' becomes 'won't'.", Polarity.POSITIVE],
  ["MOD_WIL_02", "She won't cry", "will she?", "won't she?", "does she?", "will", "Negative 'won't' becomes 'will'.", Polarity.NEGATIVE],
  ["MOD_WIL_03", "They'd like it", "wouldn't they?", "hadn't they?", "didn't they?", "would", "Contraction 'They'd' + like = 'They would'.", Polarity.POSITIVE],
  ["MOD_WIL_04", "He would know", "wouldn't he?", "willn't he?", "didn't he?", "would", "Modal 'would' repeats.", Polarity.POSITIVE],
  ["MOD_WIL_05", "I'll be there", "won't I?", "will I?", "am I?", "will", "Contraction 'I'll' = 'I will'.", Polarity.POSITIVE],
  
  // --- TOPIC: MODALS (SHOULD/MUST) [ID: MOD_MSC_xx] ---
  ["MOD_MSC_01", "You should study", "shouldn't you?", "don't you?", "wouldn't you?", "should", "Modal 'should' repeats.", Polarity.POSITIVE],
  ["MOD_MSC_02", "We shouldn't lie", "should we?", "shouldn't we?", "do we?", "should", "Negative 'shouldn't' becomes 'should'.", Polarity.NEGATIVE],
  ["MOD_MSC_03", "He must go", "mustn't he?", "doesn't he?", "can't he?", "must", "Modal 'must' repeats.", Polarity.POSITIVE],
  ["MOD_MSC_04", "They mustn't talk", "must they?", "mustn't they?", "do they?", "must", "Negative 'mustn't' becomes 'must'.", Polarity.NEGATIVE],
  ["MOD_MSC_05", "It ought to work", "oughtn't it?", "shouldn't it?", "didn't it?", "ought", "'Ought' repeats (or use shouldn't).", Polarity.POSITIVE],

  // --- TOPIC: IMPERATIVES/SUGGESTIONS [ID: IMP_SUG_xx] ---
  ["IMP_SUG_01", "Close the door", "will you?", "don't you?", "do you?", "will", "Command uses 'will you'.", Polarity.POSITIVE],
  ["IMP_SUG_02", "Don't stop", "will you?", "do you?", "are you?", "will", "Negative command always uses 'will you'.", Polarity.NEGATIVE],
  ["IMP_SUG_03", "Let's dance", "shall we?", "will we?", "can we?", "shall", "Suggestion 'Let's' uses 'shall we'.", Polarity.POSITIVE],
  ["IMP_SUG_04", "Let me help", "will you?", "shall I?", "can I?", "will", "Asking permission 'Let me' uses 'will you'.", Polarity.POSITIVE],
  ["IMP_SUG_05", "Pass the salt", "will you?", "do you?", "aren't you?", "will", "Polite request uses 'will you'.", Polarity.POSITIVE],
  ["IMP_SUG_06", "Be quiet", "can't you?", "will you?", "are you?", "can", "Impolite command can use 'can't you'.", Polarity.POSITIVE],
  ["IMP_SUG_07", "Have a seat", "won't you?", "will you?", "do you?", "will", "Inviting request uses 'won't you'.", Polarity.POSITIVE],
  ["IMP_SUG_08", "Don't be late", "will you?", "won't you?", "do you?", "will", "Negative command = 'will you'.", Polarity.NEGATIVE],
  ["IMP_SUG_09", "Let's not fight", "shall we?", "will we?", "do we?", "shall", "Negative suggestion still uses 'shall we'.", Polarity.POSITIVE],
  ["IMP_SUG_10", "Wait for me", "will you?", "do you?", "aren't you?", "will", "Command = 'will you'.", Polarity.POSITIVE],

  // --- TOPIC: COMPLEX/ADVANCED [ID: ADV_CPL_xx] ---
  ["ADV_CPL_01", "Nothing matters", "does it?", "doesn't it?", "is it?", "do", "'Nothing' is negative + V1+s.", Polarity.NEGATIVE],
  ["ADV_CPL_02", "Nobody called", "did they?", "didn't they?", "did he?", "did", "'Nobody' is negative + V2. Becomes 'they'.", Polarity.NEGATIVE],
  ["ADV_CPL_03", "Everything is ok", "isn't it?", "aren't they?", "is it?", "be", "'Everything' is positive. Becomes 'it'.", Polarity.POSITIVE],
  ["ADV_CPL_04", "Everyone is here", "aren't they?", "isn't it?", "isn't he?", "be", "'Everyone' takes plural 'they' tag.", Polarity.POSITIVE],
  ["ADV_CPL_05", "Neither came", "did they?", "didn't they?", "did he?", "did", "'Neither' is negative. Becomes 'they'.", Polarity.NEGATIVE],
  ["ADV_CPL_06", "Little is known", "is it?", "isn't it?", "does it?", "be", "'Little' (scarce) is negative. Tag is positive.", Polarity.NEGATIVE],
  ["ADV_CPL_07", "A little is left", "isn't it?", "is it?", "doesn't it?", "be", "'A little' (some) is positive. Tag is negative.", Polarity.POSITIVE],
  ["ADV_CPL_08", "Few people go", "do they?", "don't they?", "are they?", "do", "'Few' is negative. Tag is positive.", Polarity.NEGATIVE],
  ["ADV_CPL_09", "A few people go", "don't they?", "do they?", "aren't they?", "do", "'A few' is positive. Tag is negative.", Polarity.POSITIVE],
  ["ADV_CPL_10", "You'd better go", "hadn't you?", "wouldn't you?", "didn't you?", "have", "'You'd better' = 'You had better'.", Polarity.POSITIVE],
  ["ADV_CPL_11", "You'd rather stay", "wouldn't you?", "hadn't you?", "didn't you?", "would", "'You'd rather' = 'You would rather'.", Polarity.POSITIVE],
  ["ADV_CPL_12", "One must try", "mustn't one?", "mustn't he?", "doesn't one?", "must", "Subject 'One' repeats in formal English.", Polarity.POSITIVE],
  ["ADV_CPL_13", "This is the one", "isn't it?", "isn't this?", "aren't they?", "be", "'This' becomes 'it'.", Polarity.POSITIVE],
  ["ADV_CPL_14", "There's no point", "is there?", "isn't there?", "is it?", "be", "Negative 'no point'. Subject 'there'.", Polarity.NEGATIVE],
  ["ADV_CPL_15", "Neither of us went", "did we?", "didn't we?", "did they?", "did", "'Neither of us' = 'We'. Negative.", Polarity.NEGATIVE]
];

// 3. HYDRATION FUNCTION
const generateQuestionBank = (): Question[] => {
  return rawData.map(data => {
    const [id, sentence, correct, dist1, dist2, aux, exp, polarity] = data;
    
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
export const auxiliariesQuestions = generateQuestionBank();
