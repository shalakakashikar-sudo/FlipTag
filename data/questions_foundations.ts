import { Question, Polarity } from '../types.ts';

// 1. CONDENSED DATA TYPE
// [ID, Sentence, CorrectTag, BadTag1, BadTag2, Aux, Explanation, SentencePolarity]
type RawFoundationsQ = [string, string, string, string, string, string, string, Polarity];

// 2. THE QUESTION BANK (Condensed)
const rawFoundationsData: RawFoundationsQ[] = [
  // --- TOPIC: IS (POSITIVE) -> ISN'T (NEGATIVE) [ID: FND_IS_POS_xx] ---
  ["FND_IS_POS_01", "It is Monday today", "isn't it?", "is it?", "wasn't it?", "is", "Positive 'is' flips to negative 'isn't'.", Polarity.POSITIVE],
  ["FND_IS_POS_02", "She is a doctor", "isn't she?", "is she?", "doesn't she?", "is", "Positive 'is' flips to negative 'isn't'.", Polarity.POSITIVE],
  ["FND_IS_POS_03", "He is very tall", "isn't he?", "is he?", "hasn't he?", "is", "Positive 'is' flips to negative 'isn't'.", Polarity.POSITIVE],
  ["FND_IS_POS_04", "The soup is hot", "isn't it?", "is it?", "aren't it?", "is", "Subject 'The soup' becomes 'it'.", Polarity.POSITIVE],
  ["FND_IS_POS_05", "John is running", "isn't he?", "isn't John?", "doesn't he?", "is", "Name 'John' becomes pronoun 'he'.", Polarity.POSITIVE],
  ["FND_IS_POS_06", "Mary is here", "isn't she?", "isn't Mary?", "is she?", "is", "Name 'Mary' becomes pronoun 'she'.", Polarity.POSITIVE],
  ["FND_IS_POS_07", "London is big", "isn't it?", "aren't they?", "is it?", "is", "City 'London' becomes 'it'.", Polarity.POSITIVE],
  ["FND_IS_POS_08", "This is correct", "isn't it?", "isn't this?", "is it?", "is", "Demonstrative 'This' becomes 'it'.", Polarity.POSITIVE],
  ["FND_IS_POS_09", "That is yours", "isn't it?", "isn't that?", "does it?", "is", "Demonstrative 'That' becomes 'it'.", Polarity.POSITIVE],
  ["FND_IS_POS_10", "Everything is okay", "isn't it?", "aren't it?", "doesn't it?", "is", "Pronoun 'Everything' becomes 'it'.", Polarity.POSITIVE],

  // --- TOPIC: ISN'T (NEGATIVE) -> IS (POSITIVE) [ID: FND_IS_NEG_xx] ---
  ["FND_IS_NEG_01", "It isn't raining", "is it?", "isn't it?", "does it?", "is", "Negative 'isn't' flips to positive 'is'.", Polarity.NEGATIVE],
  ["FND_IS_NEG_02", "She isn't ready", "is she?", "isn't she?", "did she?", "is", "Negative 'isn't' flips to positive 'is'.", Polarity.NEGATIVE],
  ["FND_IS_NEG_03", "He isn't home", "is he?", "isn't he?", "has he?", "is", "Negative 'isn't' flips to positive 'is'.", Polarity.NEGATIVE],
  ["FND_IS_NEG_04", "The car isn't new", "is it?", "isn't it?", "does it?", "is", "Subject 'The car' becomes 'it'.", Polarity.NEGATIVE],
  ["FND_IS_NEG_05", "This isn't fair", "is it?", "isn't it?", "is this?", "is", "Subject 'This' becomes 'it'.", Polarity.NEGATIVE],
  ["FND_IS_NEG_06", "That isn't right", "is it?", "isn't it?", "does it?", "is", "Subject 'That' becomes 'it'.", Polarity.NEGATIVE],
  ["FND_IS_NEG_07", "Nothing is wrong", "is it?", "isn't it?", "doesn't it?", "is", "'Nothing' makes sentence negative. Tag is positive.", Polarity.NEGATIVE],
  ["FND_IS_NEG_08", "He's not happy", "is he?", "isn't he?", "does he?", "is", "'He's not' = 'He is not'. Tag is 'is he'.", Polarity.NEGATIVE],
  ["FND_IS_NEG_09", "It's not far", "is it?", "isn't it?", "has it?", "is", "'It's not' = 'It is not'. Tag is 'is it'.", Polarity.NEGATIVE],
  ["FND_IS_NEG_10", "She is never late", "is she?", "isn't she?", "does she?", "is", "'Never' makes it negative. Tag is positive.", Polarity.NEGATIVE],

  // --- TOPIC: ARE (POSITIVE) -> AREN'T (NEGATIVE) [ID: FND_ARE_POS_xx] ---
  ["FND_ARE_POS_01", "You are tired", "aren't you?", "are you?", "don't you?", "are", "Positive 'are' flips to negative 'aren't'.", Polarity.POSITIVE],
  ["FND_ARE_POS_02", "We are winners", "aren't we?", "are we?", "isn't we?", "are", "Positive 'are' flips to negative 'aren't'.", Polarity.POSITIVE],
  ["FND_ARE_POS_03", "They are nice", "aren't they?", "are they?", "don't they?", "are", "Positive 'are' flips to negative 'aren't'.", Polarity.POSITIVE],
  ["FND_ARE_POS_04", "These are yours", "aren't they?", "aren't these?", "don't they?", "are", "Subject 'These' becomes 'they'.", Polarity.POSITIVE],
  ["FND_ARE_POS_05", "Those are birds", "aren't they?", "aren't those?", "do they?", "are", "Subject 'Those' becomes 'they'.", Polarity.POSITIVE],
  ["FND_ARE_POS_06", "Dogs are loyal", "aren't they?", "are they?", "isn't it?", "are", "Plural 'Dogs' becomes 'they'.", Polarity.POSITIVE],
  ["FND_ARE_POS_07", "My friends are here", "aren't they?", "don't they?", "are they?", "are", "Plural 'Friends' becomes 'they'.", Polarity.POSITIVE],
  ["FND_ARE_POS_08", "You're joking", "aren't you?", "are you?", "do you?", "are", "Contraction 'You're' = 'You are'.", Polarity.POSITIVE],
  ["FND_ARE_POS_09", "We're going", "aren't we?", "are we?", "have we?", "are", "Contraction 'We're' = 'We are'.", Polarity.POSITIVE],
  ["FND_ARE_POS_10", "Everyone is here", "aren't they?", "isn't it?", "isn't everyone?", "are", "Special Rule: 'Everyone' takes 'they' + 'are'.", Polarity.POSITIVE],

  // --- TOPIC: AREN'T (NEGATIVE) -> ARE (POSITIVE) [ID: FND_ARE_NEG_xx] ---
  ["FND_ARE_NEG_01", "You aren't sick", "are you?", "aren't you?", "do you?", "are", "Negative 'aren't' flips to positive 'are'.", Polarity.NEGATIVE],
  ["FND_ARE_NEG_02", "We aren't alone", "are we?", "aren't we?", "have we?", "are", "Negative 'aren't' flips to positive 'are'.", Polarity.NEGATIVE],
  ["FND_ARE_NEG_03", "They aren't lost", "are they?", "aren't they?", "did they?", "are", "Negative 'aren't' flips to positive 'are'.", Polarity.NEGATIVE],
  ["FND_ARE_NEG_04", "These aren't mine", "are they?", "are these?", "do they?", "are", "Subject 'These' becomes 'they'.", Polarity.NEGATIVE],
  ["FND_ARE_NEG_05", "Those aren't real", "are they?", "are those?", "is it?", "are", "Subject 'Those' becomes 'they'.", Polarity.NEGATIVE],
  ["FND_ARE_NEG_06", "You're not listening", "are you?", "aren't you?", "do you?", "are", "'You're not' = 'You are not'. Tag is 'are you'.", Polarity.NEGATIVE],
  ["FND_ARE_NEG_07", "We're not done", "are we?", "aren't we?", "have we?", "are", "'We're not' = 'We are not'. Tag is 'are we'.", Polarity.NEGATIVE],
  ["FND_ARE_NEG_08", "They're not happy", "are they?", "aren't they?", "do they?", "are", "'They're not' = 'They are not'. Tag is 'are they'.", Polarity.NEGATIVE],
  ["FND_ARE_NEG_09", "Few people are here", "are they?", "aren't they?", "do they?", "are", "'Few' is negative. Tag is positive.", Polarity.NEGATIVE],
  ["FND_ARE_NEG_10", "Nobody is perfect", "are they?", "is he?", "isn't it?", "are", "'Nobody' is negative. Becomes 'they' + 'are'.", Polarity.NEGATIVE],

  // --- TOPIC: WAS (POSITIVE) -> WASN'T (NEGATIVE) [ID: FND_WAS_POS_xx] ---
  ["FND_WAS_POS_01", "It was fun", "wasn't it?", "was it?", "didn't it?", "was", "Positive 'was' flips to 'wasn't'.", Polarity.POSITIVE],
  ["FND_WAS_POS_02", "She was there", "wasn't she?", "was she?", "did she?", "was", "Positive 'was' flips to 'wasn't'.", Polarity.POSITIVE],
  ["FND_WAS_POS_03", "He was sleeping", "wasn't he?", "was he?", "didn't he?", "was", "Positive 'was' flips to 'wasn't'.", Polarity.POSITIVE],
  ["FND_WAS_POS_04", "The party was good", "wasn't it?", "was it?", "isn't it?", "was", "'The party' becomes 'it'.", Polarity.POSITIVE],
  ["FND_WAS_POS_05", "This was easy", "wasn't it?", "wasn't this?", "didn't it?", "was", "'This' becomes 'it'.", Polarity.POSITIVE],
  ["FND_WAS_POS_06", "That was weird", "wasn't it?", "wasn't that?", "did it?", "was", "'That' becomes 'it'.", Polarity.POSITIVE],
  ["FND_WAS_POS_07", "Everyone was happy", "weren't they?", "wasn't he?", "wasn't everyone?", "was", "'Everyone' becomes 'they'. 'They' needs 'were'.", Polarity.POSITIVE],
  ["FND_WAS_POS_08", "Everything was quiet", "wasn't it?", "weren't they?", "didn't it?", "was", "'Everything' becomes 'it'.", Polarity.POSITIVE],
  ["FND_WAS_POS_09", "John was late", "wasn't he?", "didn't he?", "isn't he?", "was", "Name 'John' becomes 'he'.", Polarity.POSITIVE],
  ["FND_WAS_POS_10", "It was raining", "wasn't it?", "was it?", "is it?", "was", "Past continuous uses 'was'.", Polarity.POSITIVE],

  // --- TOPIC: WASN'T (NEGATIVE) -> WAS (POSITIVE) [ID: FND_WAS_NEG_xx] ---
  ["FND_WAS_NEG_01", "It wasn't me", "was it?", "wasn't it?", "did it?", "was", "Negative 'wasn't' flips to 'was'.", Polarity.NEGATIVE],
  ["FND_WAS_NEG_02", "She wasn't angry", "was she?", "wasn't she?", "did she?", "was", "Negative 'wasn't' flips to 'was'.", Polarity.NEGATIVE],
  ["FND_WAS_NEG_03", "He wasn't invited", "was he?", "wasn't he?", "had he?", "was", "Negative 'wasn't' flips to 'was'.", Polarity.NEGATIVE],
  ["FND_WAS_NEG_04", "This wasn't cheap", "was it?", "wasn't it?", "did it?", "was", "'This' becomes 'it'.", Polarity.NEGATIVE],
  ["FND_WAS_NEG_05", "That wasn't fair", "was it?", "wasn't it?", "is it?", "was", "'That' becomes 'it'.", Polarity.NEGATIVE],
  ["FND_WAS_NEG_06", "Nothing was broken", "was it?", "wasn't it?", "did it?", "was", "'Nothing' is negative. Tag is positive.", Polarity.NEGATIVE],
  ["FND_WAS_NEG_07", "Nobody was home", "were they?", "was he?", "wasn't they?", "was", "'Nobody' is negative. Becomes 'they' + 'were'.", Polarity.NEGATIVE],
  ["FND_WAS_NEG_08", "She was never sad", "was she?", "wasn't she?", "did she?", "was", "'Never' is negative. Tag is positive.", Polarity.NEGATIVE],
  ["FND_WAS_NEG_09", "Little was done", "was it?", "wasn't it?", "did it?", "was", "'Little' is negative. Tag is positive.", Polarity.NEGATIVE],
  ["FND_WAS_NEG_10", "The food wasn't bad", "was it?", "wasn't it?", "is it?", "was", "'The food' becomes 'it'.", Polarity.NEGATIVE],

  // --- TOPIC: WERE (POSITIVE) -> WEREN'T (NEGATIVE) [ID: FND_WERE_POS_xx] ---
  ["FND_WERE_POS_01", "You were lucky", "weren't you?", "were you?", "didn't you?", "were", "Positive 'were' flips to 'weren't'.", Polarity.POSITIVE],
  ["FND_WERE_POS_02", "We were fast", "weren't we?", "were we?", "hadn't we?", "were", "Positive 'were' flips to 'weren't'.", Polarity.POSITIVE],
  ["FND_WERE_POS_03", "They were rich", "weren't they?", "were they?", "don't they?", "were", "Positive 'were' flips to 'weren't'.", Polarity.POSITIVE],
  ["FND_WERE_POS_04", "Those were days", "weren't they?", "weren't those?", "didn't they?", "were", "'Those' becomes 'they'.", Polarity.POSITIVE],
  ["FND_WERE_POS_05", "These were new", "weren't they?", "weren't these?", "aren't they?", "were", "'These' becomes 'they'.", Polarity.POSITIVE],
  ["FND_WERE_POS_06", "Tom and Jerry were friends", "weren't they?", "wasn't he?", "didn't they?", "were", "Plural names become 'they'.", Polarity.POSITIVE],
  ["FND_WERE_POS_07", "The keys were lost", "weren't they?", "wasn't it?", "aren't they?", "were", "Plural subject becomes 'they'.", Polarity.POSITIVE],
  ["FND_WERE_POS_08", "You were watching", "weren't you?", "were you?", "did you?", "were", "Past continuous uses 'weren't'.", Polarity.POSITIVE],
  ["FND_WERE_POS_09", "We were eating", "weren't we?", "were we?", "hadn't we?", "were", "Past continuous uses 'weren't'.", Polarity.POSITIVE],
  ["FND_WERE_POS_10", "A few were left", "weren't they?", "were they?", "wasn't it?", "were", "'A few' is positive. Tag is negative.", Polarity.POSITIVE],

  // --- TOPIC: WEREN'T (NEGATIVE) -> WERE (POSITIVE) [ID: FND_WERE_NEG_xx] ---
  ["FND_WERE_NEG_01", "You weren't ill", "were you?", "weren't you?", "did you?", "were", "Negative 'weren't' flips to 'were'.", Polarity.NEGATIVE],
  ["FND_WERE_NEG_02", "We weren't late", "were we?", "weren't we?", "had we?", "were", "Negative 'weren't' flips to 'were'.", Polarity.NEGATIVE],
  ["FND_WERE_NEG_03", "They weren't sure", "were they?", "weren't they?", "did they?", "were", "Negative 'weren't' flips to 'were'.", Polarity.NEGATIVE],
  ["FND_WERE_NEG_04", "Those weren't mine", "were they?", "were those?", "are they?", "were", "'Those' becomes 'they'.", Polarity.NEGATIVE],
  ["FND_WERE_NEG_05", "These weren't easy", "were they?", "were these?", "are they?", "were", "'These' becomes 'they'.", Polarity.NEGATIVE],
  ["FND_WERE_NEG_06", "Few were chosen", "were they?", "weren't they?", "was it?", "were", "'Few' is negative. Tag is positive.", Polarity.NEGATIVE],
  ["FND_WERE_NEG_07", "None were ready", "were they?", "weren't they?", "was he?", "were", "'None' is negative. Tag is positive.", Polarity.NEGATIVE],
  ["FND_WERE_NEG_08", "We were never told", "were we?", "weren't we?", "did we?", "were", "'Never' is negative. Tag is positive.", Polarity.NEGATIVE],
  ["FND_WERE_NEG_09", "You weren't lying", "were you?", "weren't you?", "did you?", "were", "Negative past continuous.", Polarity.NEGATIVE],
  ["FND_WERE_NEG_10", "They weren't working", "were they?", "weren't they?", "did they?", "were", "Negative past continuous.", Polarity.NEGATIVE],

  // --- TOPIC: SPECIAL / EXCEPTIONS [ID: FND_EXC_xx] ---
  ["FND_EXC_01", "I am a student", "aren't I?", "am I?", "amn't I?", "be", "Exception: 'I am' -> 'aren't I'.", Polarity.POSITIVE],
  ["FND_EXC_02", "I am right", "aren't I?", "am I?", "don't I?", "be", "Exception: 'I am' -> 'aren't I'.", Polarity.POSITIVE],
  ["FND_EXC_03", "I'm your friend", "aren't I?", "am I?", "isn't it?", "be", "Exception: 'I'm' -> 'aren't I'.", Polarity.POSITIVE],
  ["FND_EXC_04", "I am tall", "aren't I?", "am I?", "aren't me?", "be", "Exception: 'I am' -> 'aren't I'.", Polarity.POSITIVE],
  ["FND_EXC_05", "I am allowed", "aren't I?", "am I?", "don't I?", "be", "Exception: 'I am' -> 'aren't I'.", Polarity.POSITIVE],
  ["FND_EXC_06", "There is a car", "isn't there?", "is there?", "isn't it?", "be", "Subject 'There' remains 'there'.", Polarity.POSITIVE],
  ["FND_EXC_07", "There are books", "aren't there?", "are there?", "aren't they?", "be", "Subject 'There' remains 'there'.", Polarity.POSITIVE],
  ["FND_EXC_08", "There wasn't time", "was there?", "wasn't there?", "did there?", "be", "Negative 'There wasn't'.", Polarity.NEGATIVE],
  ["FND_EXC_09", "There were people", "weren't there?", "were there?", "weren't they?", "be", "Positive 'There were'.", Polarity.POSITIVE],
  ["FND_EXC_10", "There's no hope", "is there?", "isn't there?", "is it?", "be", "'No hope' is negative. Tag is positive.", Polarity.NEGATIVE]
];

// 3. HYDRATION FUNCTION
const generateFoundationsQuestions = (): Question[] => {
  return rawFoundationsData.map(data => {
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
// Fix for error: Module '"./questions_foundations.ts"' has no exported member 'foundationsQuestions'.
export const foundationsQuestions = generateFoundationsQuestions();
