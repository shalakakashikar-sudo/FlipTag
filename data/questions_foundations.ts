import { Question, Polarity } from '../types.ts';

// [ID, Sentence, CorrectTag, Distractor1, Distractor2, Auxiliary, Explanation, SentencePolarity]
type RawQ = [string, string, string, string, string, string, string, Polarity];

const rawData: RawQ[] = [
  // --- SECTION 1: IS (POSITIVE) ➔ ISN'T (NEGATIVE) ---
  ["FND_IS_POS_01", "It is Monday today", "isn't it?", "is it?", "wasn't it?", "is", "Rule: Positive 'is' ➔ Flip to Negative 'isn't'.", Polarity.POSITIVE],
  ["FND_IS_POS_02", "She is a doctor", "isn't she?", "is she?", "doesn't she?", "is", "Rule: Positive 'is' ➔ Flip to Negative 'isn't'.", Polarity.POSITIVE],
  ["FND_IS_POS_03", "He is very tall", "isn't he?", "is he?", "hasn't he?", "is", "Rule: Positive 'is' ➔ Flip to Negative 'isn't'.", Polarity.POSITIVE],
  ["FND_IS_POS_04", "The soup is hot", "isn't it?", "is it?", "aren't it?", "is", "Rule: Subject 'The soup' (singular thing) ➔ Pronoun 'it'.", Polarity.POSITIVE],
  ["FND_IS_POS_05", "John is running", "isn't he?", "isn't John?", "doesn't he?", "is", "Rule: Name 'John' (male) ➔ Pronoun 'he'. (Never use names in tags!)", Polarity.POSITIVE],
  ["FND_IS_POS_06", "Mary is here", "isn't she?", "isn't Mary?", "is she?", "is", "Rule: Name 'Mary' (female) ➔ Pronoun 'she'.", Polarity.POSITIVE],
  ["FND_IS_POS_07", "London is big", "isn't it?", "aren't they?", "is it?", "is", "Rule: City 'London' (place) ➔ Pronoun 'it'.", Polarity.POSITIVE],
  ["FND_IS_POS_08", "This is correct", "isn't it?", "isn't this?", "is it?", "is", "Rule: Demonstrative 'This' ➔ Pronoun 'it'.", Polarity.POSITIVE],
  ["FND_IS_POS_09", "That is yours", "isn't it?", "isn't that?", "does it?", "is", "Rule: Demonstrative 'That' ➔ Pronoun 'it'.", Polarity.POSITIVE],
  ["FND_IS_POS_10", "Everything is okay", "isn't it?", "aren't it?", "doesn't it?", "is", "Rule: Indefinite pronoun 'Everything' ➔ Pronoun 'it'.", Polarity.POSITIVE],

  // --- SECTION 2: ISN'T (NEGATIVE) ➔ IS (POSITIVE) ---
  ["FND_IS_NEG_01", "It isn't raining", "is it?", "isn't it?", "does it?", "is", "Rule: Negative 'isn't' ➔ Flip to Positive 'is'.", Polarity.NEGATIVE],
  ["FND_IS_NEG_02", "She isn't ready", "is she?", "isn't she?", "did she?", "is", "Rule: Negative 'isn't' ➔ Flip to Positive 'is'.", Polarity.NEGATIVE],
  ["FND_IS_NEG_03", "He isn't home", "is he?", "isn't he?", "has he?", "is", "Rule: Negative 'isn't' ➔ Flip to Positive 'is'.", Polarity.NEGATIVE],
  ["FND_IS_NEG_04", "The car isn't new", "is it?", "isn't it?", "does it?", "is", "Rule: Subject 'The car' ➔ Pronoun 'it'.", Polarity.NEGATIVE],
  ["FND_IS_NEG_05", "This isn't fair", "is it?", "isn't it?", "is this?", "is", "Rule: 'This' ➔ Pronoun 'it'. Tag 'is it?'.", Polarity.NEGATIVE],
  ["FND_IS_NEG_06", "That isn't right", "is it?", "isn't it?", "does it?", "is", "Rule: 'That' ➔ Pronoun 'it'. Tag 'is it?'.", Polarity.NEGATIVE],
  ["FND_IS_NEG_07", "Nothing is wrong", "is it?", "isn't it?", "doesn't it?", "is", "Rule: 'Nothing' makes the sentence Negative. Tag must be Positive.", Polarity.NEGATIVE],
  ["FND_IS_NEG_08", "He's not happy", "is he?", "isn't he?", "does he?", "is", "Rule: 'He's not' = 'He is not'. Tag 'is he?'.", Polarity.NEGATIVE],
  ["FND_IS_NEG_09", "It's not far", "is it?", "isn't it?", "has it?", "is", "Rule: 'It's not' = 'It is not'. Tag 'is it?'.", Polarity.NEGATIVE],
  ["FND_IS_NEG_10", "She is never late", "is she?", "isn't she?", "does she?", "is", "Rule: 'Never' makes the sentence Negative. Tag must be Positive.", Polarity.NEGATIVE],

  // --- SECTION 3: ARE (POSITIVE) ➔ AREN'T (NEGATIVE) ---
  ["FND_ARE_POS_01", "You are tired", "aren't you?", "are you?", "don't you?", "are", "Rule: Positive 'are' ➔ Flip to Negative 'aren't'.", Polarity.POSITIVE],
  ["FND_ARE_POS_02", "We are winners", "aren't we?", "are we?", "isn't we?", "are", "Rule: Positive 'are' ➔ Flip to Negative 'aren't'.", Polarity.POSITIVE],
  ["FND_ARE_POS_03", "They are nice", "aren't they?", "are they?", "don't they?", "are", "Rule: Positive 'are' ➔ Flip to Negative 'aren't'.", Polarity.POSITIVE],
  ["FND_ARE_POS_04", "These are yours", "aren't they?", "aren't these?", "don't they?", "are", "Rule: 'These' ➔ Pronoun 'they'.", Polarity.POSITIVE],
  ["FND_ARE_POS_05", "Those are birds", "aren't they?", "aren't those?", "do they?", "are", "Rule: 'Those' ➔ Pronoun 'they'.", Polarity.POSITIVE],
  ["FND_ARE_POS_06", "Dogs are loyal", "aren't they?", "are they?", "isn't it?", "are", "Rule: 'Dogs' (Plural) ➔ Pronoun 'they'.", Polarity.POSITIVE],
  ["FND_ARE_POS_07", "My friends are here", "aren't they?", "don't they?", "are they?", "are", "Rule: 'My friends' (Plural) ➔ Pronoun 'they'.", Polarity.POSITIVE],
  ["FND_ARE_POS_08", "You're joking", "aren't you?", "are you?", "do you?", "are", "Rule: Contraction 'You're' = 'You are'.", Polarity.POSITIVE],
  ["FND_ARE_POS_09", "We're going", "aren't we?", "are we?", "have we?", "are", "Rule: Contraction 'We're' = 'We are'.", Polarity.POSITIVE],
  ["FND_ARE_POS_10", "Everyone is here", "aren't they?", "isn't it?", "isn't everyone?", "are", "Rule: 'Everyone' is grammatically singular, but the TAG uses 'they' + 'are'.", Polarity.POSITIVE],

  // --- SECTION 4: AREN'T (NEGATIVE) ➔ ARE (POSITIVE) ---
  ["FND_ARE_NEG_01", "You aren't sick", "are you?", "aren't you?", "do you?", "are", "Rule: Negative 'aren't' ➔ Flip to Positive 'are'.", Polarity.NEGATIVE],
  ["FND_ARE_NEG_02", "We aren't alone", "are we?", "aren't we?", "have we?", "are", "Rule: Negative 'aren't' ➔ Flip to Positive 'are'.", Polarity.NEGATIVE],
  ["FND_ARE_NEG_03", "They aren't lost", "are they?", "aren't they?", "did they?", "are", "Rule: Negative 'aren't' ➔ Flip to Positive 'are'.", Polarity.NEGATIVE],
  ["FND_ARE_NEG_04", "These aren't mine", "are they?", "are these?", "do they?", "are", "Rule: 'These' ➔ Pronoun 'they'.", Polarity.NEGATIVE],
  ["FND_ARE_NEG_05", "Those aren't real", "are they?", "are those?", "is it?", "are", "Rule: 'Those' ➔ Pronoun 'they'.", Polarity.NEGATIVE],
  ["FND_ARE_NEG_06", "You're not listening", "are you?", "aren't you?", "do you?", "are", "Rule: 'You're not' = 'You are not'. Tag 'are you'.", Polarity.NEGATIVE],
  ["FND_ARE_NEG_07", "We're not done", "are we?", "aren't we?", "have we?", "are", "Rule: 'We're not' = 'We are not'. Tag 'are we'.", Polarity.NEGATIVE],
  ["FND_ARE_NEG_08", "They're not happy", "are they?", "aren't they?", "do they?", "are", "Rule: 'They're not' = 'They are not'. Tag 'are they'.", Polarity.NEGATIVE],
  ["FND_ARE_NEG_09", "Few people are here", "are they?", "aren't they?", "do they?", "are", "Rule: 'Few' means almost none (Negative). Tag must be Positive.", Polarity.NEGATIVE],
  ["FND_ARE_NEG_10", "Nobody is perfect", "are they?", "is he?", "isn't it?", "are", "Rule: 'Nobody' is negative. 'Nobody' takes 'they' in the tag. 'They' takes 'are'.", Polarity.NEGATIVE],

  // --- SECTION 5: WAS (POSITIVE) ➔ WASN'T (NEGATIVE) ---
  ["FND_WAS_POS_01", "It was fun", "wasn't it?", "was it?", "didn't it?", "was", "Rule: Positive 'was' ➔ Flip to Negative 'wasn't'.", Polarity.POSITIVE],
  ["FND_WAS_POS_02", "She was there", "wasn't she?", "was she?", "did she?", "was", "Rule: Positive 'was' ➔ Flip to Negative 'wasn't'.", Polarity.POSITIVE],
  ["FND_WAS_POS_03", "He was sleeping", "wasn't he?", "was he?", "didn't he?", "was", "Rule: Positive 'was' ➔ Flip to Negative 'wasn't'.", Polarity.POSITIVE],
  ["FND_WAS_POS_04", "The party was good", "wasn't it?", "was it?", "isn't it?", "was", "Rule: 'The party' (Singular Event) ➔ Pronoun 'it'.", Polarity.POSITIVE],
  ["FND_WAS_POS_05", "This was easy", "wasn't it?", "wasn't this?", "didn't it?", "was", "Rule: 'This' ➔ Pronoun 'it'.", Polarity.POSITIVE],
  ["FND_WAS_POS_06", "That was weird", "wasn't it?", "wasn't that?", "did it?", "was", "Rule: 'That' ➔ Pronoun 'it'.", Polarity.POSITIVE],
  ["FND_WAS_POS_07", "Everyone was happy", "weren't they?", "wasn't he?", "wasn't everyone?", "was", "Rule: 'Everyone' (Singular verb 'was') ➔ Tag 'they' (Plural verb 'weren't').", Polarity.POSITIVE],
  ["FND_WAS_POS_08", "Everything was quiet", "wasn't it?", "weren't they?", "didn't it?", "was", "Rule: 'Everything' ➔ Pronoun 'it'.", Polarity.POSITIVE],
  ["FND_WAS_POS_09", "John was late", "wasn't he?", "didn't he?", "isn't he?", "was", "Rule: 'John' ➔ Pronoun 'he'.", Polarity.POSITIVE],
  ["FND_WAS_POS_10", "It was raining", "wasn't it?", "was it?", "is it?", "was", "Rule: Past Continuous uses 'was'. Tag 'wasn't it?'.", Polarity.POSITIVE],

  // --- SECTION 6: WASN'T (NEGATIVE) ➔ WAS (POSITIVE) ---
  ["FND_WAS_NEG_01", "It wasn't me", "was it?", "wasn't it?", "did it?", "was", "Rule: Negative 'wasn't' ➔ Flip to Positive 'was'.", Polarity.NEGATIVE],
  ["FND_WAS_NEG_02", "She wasn't angry", "was she?", "wasn't she?", "did she?", "was", "Rule: Negative 'wasn't' ➔ Flip to Positive 'was'.", Polarity.NEGATIVE],
  ["FND_WAS_NEG_03", "He wasn't invited", "was he?", "wasn't he?", "had he?", "was", "Rule: Negative 'wasn't' ➔ Flip to Positive 'was'.", Polarity.NEGATIVE],
  ["FND_WAS_NEG_04", "This wasn't cheap", "was it?", "wasn't it?", "did it?", "was", "Rule: 'This' ➔ Pronoun 'it'.", Polarity.NEGATIVE],
  ["FND_WAS_NEG_05", "That wasn't fair", "was it?", "wasn't it?", "is it?", "was", "Rule: 'That' ➔ Pronoun 'it'.", Polarity.NEGATIVE],
  ["FND_WAS_NEG_06", "Nothing was broken", "was it?", "wasn't it?", "did it?", "was", "Rule: 'Nothing' makes the sentence Negative. Tag must be Positive.", Polarity.NEGATIVE],
  ["FND_WAS_NEG_07", "Nobody was home", "were they?", "was he?", "wasn't they?", "was", "Rule: 'Nobody' (Negative) ➔ Tag 'they' (Plural Positive) ➔ 'were they?'.", Polarity.NEGATIVE],
  ["FND_WAS_NEG_08", "She was never sad", "was she?", "wasn't she?", "did she?", "was", "Rule: 'Never' makes it Negative. Tag is Positive.", Polarity.NEGATIVE],
  ["FND_WAS_NEG_09", "Little was done", "was it?", "wasn't it?", "did it?", "was", "Rule: 'Little' (meaning 'not much') is Negative. Tag is Positive.", Polarity.NEGATIVE],
  ["FND_WAS_NEG_10", "The food wasn't bad", "was it?", "wasn't it?", "is it?", "was", "Rule: 'The food' (Singular) ➔ Pronoun 'it'.", Polarity.NEGATIVE],

  // --- SECTION 7: WERE (POSITIVE) ➔ WEREN'T (NEGATIVE) ---
  ["FND_WERE_POS_01", "You were lucky", "weren't you?", "were you?", "didn't you?", "were", "Rule: Positive 'were' ➔ Flip to Negative 'weren't'.", Polarity.POSITIVE],
  ["FND_WERE_POS_02", "We were fast", "weren't we?", "were we?", "hadn't we?", "were", "Rule: Positive 'were' ➔ Flip to Negative 'weren't'.", Polarity.POSITIVE],
  ["FND_WERE_POS_03", "They were rich", "weren't they?", "were they?", "don't they?", "were", "Rule: Positive 'were' ➔ Flip to Negative 'weren't'.", Polarity.POSITIVE],
  ["FND_WERE_POS_04", "Those were days", "weren't they?", "weren't those?", "didn't they?", "were", "Rule: 'Those' ➔ Pronoun 'they'.", Polarity.POSITIVE],
  ["FND_WERE_POS_05", "These were new", "weren't they?", "weren't these?", "aren't they?", "were", "Rule: 'These' ➔ Pronoun 'they'.", Polarity.POSITIVE],
  ["FND_WERE_POS_06", "Tom and Jerry were friends", "weren't they?", "wasn't he?", "didn't they?", "were", "Rule: Two people (Plural) ➔ Pronoun 'they'.", Polarity.POSITIVE],
  ["FND_WERE_POS_07", "The keys were lost", "weren't they?", "wasn't it?", "aren't they?", "were", "Rule: 'Keys' (Plural) ➔ Pronoun 'they'.", Polarity.POSITIVE],
  ["FND_WERE_POS_08", "You were watching", "weren't you?", "were you?", "did you?", "were", "Rule: Past Continuous uses 'weren't'.", Polarity.POSITIVE],
  ["FND_WERE_POS_09", "We were eating", "weren't we?", "were we?", "hadn't we?", "were", "Rule: Past Continuous uses 'weren't'.", Polarity.POSITIVE],
  ["FND_WERE_POS_10", "A few were left", "weren't they?", "were they?", "wasn't it?", "were", "Rule: 'A few' means 'some' (Positive). Tag is Negative.", Polarity.POSITIVE],

  // --- SECTION 8: WEREN'T (NEGATIVE) ➔ WERE (POSITIVE) ---
  ["FND_WERE_NEG_01", "You weren't ill", "were you?", "weren't you?", "did you?", "were", "Rule: Negative 'weren't' ➔ Flip to Positive 'were'.", Polarity.NEGATIVE],
  ["FND_WERE_NEG_02", "We weren't late", "were we?", "weren't we?", "had we?", "were", "Rule: Negative 'weren't' ➔ Flip to Positive 'were'.", Polarity.NEGATIVE],
  ["FND_WERE_NEG_03", "They weren't sure", "were they?", "weren't they?", "did they?", "were", "Rule: Negative 'weren't' ➔ Flip to Positive 'were'.", Polarity.NEGATIVE],
  ["FND_WERE_NEG_04", "Those weren't mine", "were they?", "were those?", "are they?", "were", "Rule: 'Those' ➔ Pronoun 'they'.", Polarity.NEGATIVE],
  ["FND_WERE_NEG_05", "These weren't easy", "were they?", "were these?", "are they?", "were", "Rule: 'These' ➔ Pronoun 'they'.", Polarity.NEGATIVE],
  ["FND_WERE_NEG_06", "Few were chosen", "were they?", "weren't they?", "was it?", "were", "Rule: 'Few' is Negative. Tag is Positive.", Polarity.NEGATIVE],
  ["FND_WERE_NEG_07", "None were ready", "were they?", "weren't they?", "was he?", "were", "Rule: 'None' is Negative. Tag is Positive.", Polarity.NEGATIVE],
  ["FND_WERE_NEG_08", "We were never told", "were we?", "weren't we?", "did we?", "were", "Rule: 'Never' makes it Negative. Tag is Positive.", Polarity.NEGATIVE],
  ["FND_WERE_NEG_09", "You weren't lying", "were you?", "weren't you?", "did you?", "were", "Rule: Negative 'weren't' ➔ Positive 'were'.", Polarity.NEGATIVE],
  ["FND_WERE_NEG_10", "They weren't working", "were they?", "weren't they?", "did they?", "were", "Rule: Negative 'weren't' ➔ Positive 'were'.", Polarity.NEGATIVE],

  // --- SECTION 9: THE "I AM" EXCEPTION ---
  ["FND_EXC_01", "I am a student", "aren't I?", "am I?", "amn't I?", "be", "Exception: 'I am' always flips to 'aren't I?'. 'Amn't' is not standard.", Polarity.POSITIVE],
  ["FND_EXC_02", "I am right", "aren't I?", "am I?", "don't I?", "be", "Exception: 'I am' always flips to 'aren't I?'.", Polarity.POSITIVE],
  ["FND_EXC_03", "I'm your friend", "aren't I?", "am I?", "isn't it?", "be", "Exception: 'I'm' = 'I am'. Flips to 'aren't I?'.", Polarity.POSITIVE],
  ["FND_EXC_04", "I am tall", "aren't I?", "am I?", "aren't me?", "be", "Exception: 'I am' always flips to 'aren't I?'.", Polarity.POSITIVE],
  ["FND_EXC_05", "I am allowed", "aren't I?", "am I?", "don't I?", "be", "Exception: 'I am' always flips to 'aren't I?'.", Polarity.POSITIVE],
  ["FND_EXC_06", "I'm on time", "aren't I?", "am I?", "isn't I?", "be", "Exception: 'I'm' always flips to 'aren't I?'.", Polarity.POSITIVE],
  ["FND_EXC_07", "I am inviting you", "aren't I?", "don't I?", "am I?", "be", "Exception: 'I am' always flips to 'aren't I?'.", Polarity.POSITIVE],
  // ... And contrast with Negative "I am" which is Regular:
  ["FND_EXC_08", "I am not late", "am I?", "aren't I?", "do I?", "be", "Regular: Negative 'I am not' stays regular 'am I?'.", Polarity.NEGATIVE],
  ["FND_EXC_09", "I'm not the boss", "am I?", "aren't I?", "is I?", "be", "Regular: Negative 'I'm not' stays regular 'am I?'.", Polarity.NEGATIVE],
  ["FND_EXC_10", "I'm not dreaming", "am I?", "aren't I?", "do I?", "be", "Regular: Negative 'I'm not' stays regular 'am I?'.", Polarity.NEGATIVE],

  // --- SECTION 10: "THERE" & "IT" ---
  ["FND_THR_01", "There is a car", "isn't there?", "is there?", "isn't it?", "be", "Rule: The subject 'There' remains 'there' in the tag.", Polarity.POSITIVE],
  ["FND_THR_02", "There are books", "aren't there?", "are there?", "aren't they?", "be", "Rule: The subject 'There' remains 'there' in the tag.", Polarity.POSITIVE],
  ["FND_THR_03", "There wasn't time", "was there?", "wasn't there?", "did there?", "be", "Rule: Negative 'wasn't' ➔ Positive 'was there?'.", Polarity.NEGATIVE],
  ["FND_THR_04", "There were people", "weren't there?", "were there?", "weren't they?", "be", "Rule: Positive 'were' ➔ Negative 'weren't there?'.", Polarity.POSITIVE],
  ["FND_THR_05", "There's no hope", "is there?", "isn't there?", "is it?", "be", "Rule: 'There's no' is negative. Tag is positive 'is there?'.", Polarity.NEGATIVE],
  ["FND_THR_06", "There isn't any milk", "is there?", "isn't there?", "does there?", "be", "Rule: Negative 'isn't' ➔ Positive 'is there?'.", Polarity.NEGATIVE],
  ["FND_THR_07", "There were mistakes", "weren't there?", "weren't they?", "didn't there?", "be", "Rule: 'There' + 'were' ➔ 'Weren't there?'.", Polarity.POSITIVE],
  ["FND_THR_08", "There wasn't a sound", "was there?", "wasn't there?", "did there?", "be", "Rule: Negative 'wasn't' ➔ Positive 'was there?'.", Polarity.NEGATIVE],
  ["FND_THR_09", "There are many ways", "aren't there?", "don't there?", "aren't they?", "be", "Rule: 'There' + 'are' ➔ 'Aren't there?'.", Polarity.POSITIVE],
  ["FND_THR_10", "There's a problem", "isn't there?", "is there?", "doesn't there?", "be", "Rule: 'There's' = 'There is'. Tag 'isn't there?'.", Polarity.POSITIVE]
];

const generateFoundationsQuestions = (data: RawQ[]): Question[] => {
  return data.map(item => {
    const [id, sentence, correct, dist1, dist2, aux, exp, sentencePol] = item;
    
    // Dynamic Polarity Detection
    // Checks the ANSWER for "n't" or "not" to decide tag polarity
    const isTagNegative = correct.includes("n't") || correct.includes(" not");
    const tagPol = isTagNegative ? Polarity.NEGATIVE : Polarity.POSITIVE;

    return {
      id,
      sentence,
      options: [
        { text: correct, polarity: tagPol },
        { text: dist1, polarity: tagPol === Polarity.POSITIVE ? Polarity.NEGATIVE : Polarity.POSITIVE },
        { text: dist2, polarity: Polarity.NEUTRAL }
      ].sort(() => Math.random() - 0.5),
      correctAnswer: correct,
      sentencePolarity: sentencePol,
      tagPolarity: tagPol,
      explanation: exp,
      auxiliary: aux
    };
  });
};

export const foundationsQuestions = generateFoundationsQuestions(rawData);