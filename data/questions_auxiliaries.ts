import { Question, Polarity } from '../types.ts';

// [ID, Sentence, CorrectTag, Distractor1, Distractor2, Auxiliary, Explanation, SentencePolarity]
type RawQ = [string, string, string, string, string, string, string, Polarity];

const rawData: RawQ[] = [
  // --- SECTION 1: SIMPLE PRESENT (DO / DOES) ---
  ["AUX_DO_01", "You play the piano", "don't you?", "do you?", "aren't you?", "do", "Rule: Base verb 'play' ➔ Summon negative 'don't'.", Polarity.POSITIVE],
  ["AUX_DO_02", "She likes jazz", "doesn't she?", "don't she?", "isn't she?", "do", "Rule: Verb with 's' ('likes') ➔ Summon 'doesn't'.", Polarity.POSITIVE],
  ["AUX_DO_03", "They live in London", "don't they?", "didn't they?", "aren't they?", "do", "Rule: Base verb 'live' ➔ Summon 'don't'.", Polarity.POSITIVE],
  ["AUX_DO_04", "He works hard", "doesn't he?", "don't he?", "isn't he?", "do", "Rule: Verb with 's' ('works') ➔ Summon 'doesn't'.", Polarity.POSITIVE],
  ["AUX_DO_05", "It smells good", "doesn't it?", "don't it?", "isn't it?", "do", "Rule: Verb with 's' ('smells') ➔ Summon 'doesn't'.", Polarity.POSITIVE],
  ["AUX_DO_06", "We need water", "don't we?", "aren't we?", "haven't we?", "do", "Rule: Main verb 'need' ➔ Summon 'don't'.", Polarity.POSITIVE],
  ["AUX_DO_07", "You don't smoke", "do you?", "don't you?", "are you?", "do", "Rule: Negative 'don't' visible ➔ Remove 'n't' to get 'do you?'.", Polarity.NEGATIVE],
  ["AUX_DO_08", "She doesn't know", "does she?", "doesn't she?", "is she?", "do", "Rule: Negative 'doesn't' visible ➔ Remove 'n't' to get 'does she?'.", Polarity.NEGATIVE],
  ["AUX_DO_09", "They don't care", "do they?", "don't they?", "are they?", "do", "Rule: Negative 'don't' visible ➔ Remove 'n't' to get 'do they?'.", Polarity.NEGATIVE],
  ["AUX_DO_10", "John drives fast", "doesn't he?", "don't he?", "isn't he?", "do", "Rule: 'John' (He) + 'drives' (s) ➔ Summon 'doesn't'.", Polarity.POSITIVE],
  ["AUX_DO_11", "Birds fly south", "don't they?", "doesn't they?", "aren't they?", "do", "Rule: 'Birds' (They) + 'fly' (base) ➔ Summon 'don't'.", Polarity.POSITIVE],
  ["AUX_DO_12", "It doesn't work", "does it?", "doesn't it?", "is it?", "do", "Rule: Negative 'doesn't' visible ➔ Tag is positive 'does'.", Polarity.NEGATIVE],
  ["AUX_DO_13", "I look tired", "don't I?", "do I?", "am I?", "do", "Rule: Base verb 'look' ➔ Summon 'don't'.", Polarity.POSITIVE],
  ["AUX_DO_14", "The bus stops here", "doesn't it?", "don't it?", "isn't it?", "do", "Rule: 'The bus' (It) + 'stops' (s) ➔ Summon 'doesn't'.", Polarity.POSITIVE],
  ["AUX_DO_15", "You want to go", "don't you?", "do you?", "wantn't you?", "do", "Rule: Base verb 'want' ➔ Summon 'don't'.", Polarity.POSITIVE],
  ["AUX_DO_16", "Mary sings well", "doesn't she?", "don't she?", "is she?", "do", "Rule: 'Mary' (She) + 'sings' (s) ➔ Summon 'doesn't'.", Polarity.POSITIVE],
  ["AUX_DO_17", "Teachers work late", "don't they?", "doesn't they?", "aren't they?", "do", "Rule: 'Teachers' (They) + 'work' (base) ➔ Summon 'don't'.", Polarity.POSITIVE],
  ["AUX_DO_18", "He watches TV", "doesn't he?", "don't he?", "watchn't he?", "do", "Rule: 'Watches' has 'es' (s-form) ➔ Summon 'doesn't'.", Polarity.POSITIVE],
  ["AUX_DO_19", "You don't like it", "do you?", "don't you?", "are you?", "do", "Rule: Negative 'don't' ➔ Tag is positive 'do'.", Polarity.NEGATIVE],
  ["AUX_DO_20", "It doesn't matter", "does it?", "doesn't it?", "is it?", "do", "Rule: Negative 'doesn't' ➔ Tag is positive 'does'.", Polarity.NEGATIVE],

  // --- SECTION 2: SIMPLE PAST (DID) ---
  ["AUX_DID_01", "It rained yesterday", "didn't it?", "doesn't it?", "wasn't it?", "did", "Rule: Past tense verb 'rained' ➔ Summon 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_02", "You saw him", "didn't you?", "don't you?", "sawn't you?", "did", "Rule: Irregular past 'saw' ➔ Summon 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_03", "They went home", "didn't they?", "weren't they?", "don't they?", "did", "Rule: Irregular past 'went' ➔ Summon 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_04", "She called you", "didn't she?", "doesn't she?", "wasn't she?", "did", "Rule: Past tense 'called' ➔ Summon 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_05", "We finished it", "didn't we?", "don't we?", "haven't we?", "did", "Rule: Past tense 'finished' ➔ Summon 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_06", "You didn't go", "did you?", "didn't you?", "were you?", "did", "Rule: Negative 'didn't' visible ➔ Remove 'n't' to get 'did you?'.", Polarity.NEGATIVE],
  ["AUX_DID_07", "He didn't eat", "did he?", "didn't he?", "was he?", "did", "Rule: Negative 'didn't' visible ➔ Remove 'n't' to get 'did he?'.", Polarity.NEGATIVE],
  ["AUX_DID_08", "She arrived late", "didn't she?", "doesn't she?", "hadn't she?", "did", "Rule: Past tense 'arrived' ➔ Summon 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_09", "The car crashed", "didn't it?", "wasn't it?", "hadn't it?", "did", "Rule: Past tense 'crashed' ➔ Summon 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_10", "You used to swim", "didn't you?", "usedn't you?", "don't you?", "did", "Rule: 'Used to' acts as a past tense verb. Summon 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_11", "He taught English", "didn't he?", "wasn't he?", "doesn't he?", "did", "Rule: Irregular past 'taught' ➔ Summon 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_12", "I made a mistake", "didn't I?", "don't I?", "wasn't I?", "did", "Rule: Irregular past 'made' ➔ Summon 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_13", "They had a party", "didn't they?", "hadn't they?", "weren't they?", "did", "Rule: 'Had' is the main verb (meaning 'hosted'). Use 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_14", "She read the book", "didn't she?", "doesn't she?", "isn't she?", "did", "Rule: 'Read' (pronounced 'red') is past tense here. Summon 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_15", "He cut his finger", "didn't he?", "doesn't he?", "wasn't he?", "did", "Rule: 'Cut' (past) is the same as 'Cut' (present), but 'He' would take 'Cuts' in present. So it must be past.", Polarity.POSITIVE],
  ["AUX_DID_16", "We bought a house", "didn't we?", "don't we?", "haven't we?", "did", "Rule: Irregular past 'bought' ➔ Summon 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_17", "You didn't sleep", "did you?", "didn't you?", "do you?", "did", "Rule: Negative 'didn't' ➔ Tag is positive 'did'.", Polarity.NEGATIVE],
  ["AUX_DID_18", "It cost a lot", "didn't it?", "doesn't it?", "isn't it?", "did", "Rule: 'Cost' (past). If present, it would be 'Costs'. ➔ Summon 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_19", "They spoke loudly", "didn't they?", "don't they?", "weren't they?", "did", "Rule: Irregular past 'spoke' ➔ Summon 'didn't'.", Polarity.POSITIVE],
  ["AUX_DID_20", "She wrote a letter", "didn't she?", "doesn't she?", "wasn't she?", "did", "Rule: Irregular past 'wrote' ➔ Summon 'didn't'.", Polarity.POSITIVE],

  // --- SECTION 3: PERFECT TENSES (HAVE / HAS / HAD) ---
  ["AUX_PRF_01", "You have eaten", "haven't you?", "don't you?", "didn't you?", "have", "Rule: 'Have' is the helper verb here. Repeat it.", Polarity.POSITIVE],
  ["AUX_PRF_02", "She has gone", "hasn't she?", "doesn't she?", "isn't she?", "have", "Rule: 'Has' is the helper verb here. Repeat it.", Polarity.POSITIVE],
  ["AUX_PRF_03", "They haven't seen it", "have they?", "haven't they?", "do they?", "have", "Rule: Negative 'haven't' visible ➔ Tag is positive 'have they?'.", Polarity.NEGATIVE],
  ["AUX_PRF_04", "He hasn't arrived", "has he?", "hasn't he?", "does he?", "have", "Rule: Negative 'hasn't' visible ➔ Tag is positive 'has he?'.", Polarity.NEGATIVE],
  ["AUX_PRF_05", "It has stopped", "hasn't it?", "doesn't it?", "isn't it?", "have", "Rule: 'Has' is the helper verb. Repeat it.", Polarity.POSITIVE],
  ["AUX_PRF_06", "We had met before", "hadn't we?", "didn't we?", "haven't we?", "have", "Rule: Past Perfect 'had'. Repeat it.", Polarity.POSITIVE],
  ["AUX_PRF_07", "You hadn't left", "had you?", "hadn't you?", "did you?", "have", "Rule: Negative 'hadn't' ➔ Tag is positive 'had you?'.", Polarity.NEGATIVE],
  ["AUX_PRF_08", "She'd done it", "hadn't she?", "wouldn't she?", "didn't she?", "have", "Rule: 'She'd' + V3 (done) = 'She had'. Tag is 'hadn't she?'.", Polarity.POSITIVE],
  ["AUX_PRF_09", "He's visited Paris", "hasn't he?", "isn't he?", "doesn't he?", "have", "Rule: 'He's' + V3 (visited) = 'He has'. Tag is 'hasn't he?'.", Polarity.POSITIVE],
  ["AUX_PRF_10", "They'd gone out", "hadn't they?", "wouldn't they?", "didn't they?", "have", "Rule: 'They'd' + V3 (gone) = 'They had'. Tag is 'hadn't they?'.", Polarity.POSITIVE],
  ["AUX_PRF_11", "I have finished", "haven't I?", "don't I?", "didn't I?", "have", "Rule: Present Perfect 'Have'. Repeat it.", Polarity.POSITIVE],
  ["AUX_PRF_12", "You haven't tried", "have you?", "do you?", "did you?", "have", "Rule: Negative 'haven't' ➔ Tag is positive 'have'.", Polarity.NEGATIVE],
  ["AUX_PRF_13", "It hasn't rained", "has it?", "does it?", "is it?", "have", "Rule: Negative 'hasn't' ➔ Tag is positive 'has'.", Polarity.NEGATIVE],
  ["AUX_PRF_14", "We've seen this", "haven't we?", "don't we?", "didn't we?", "have", "Rule: 'We've' = 'We have'. Tag is 'haven't we?'.", Polarity.POSITIVE],
  ["AUX_PRF_15", "She's broken it", "hasn't she?", "isn't she?", "doesn't she?", "have", "Rule: 'She's' + V3 (broken) = 'She has'. Tag is 'hasn't she?'.", Polarity.POSITIVE],
  ["AUX_PRF_16", "The train has left", "hasn't it?", "doesn't it?", "isn't it?", "have", "Rule: 'Has' + V3 (left). Repeat 'has'.", Polarity.POSITIVE],
  ["AUX_PRF_17", "They had forgotten", "hadn't they?", "didn't they?", "haven't they?", "have", "Rule: Past Perfect 'Had'. Repeat 'had'.", Polarity.POSITIVE],
  ["AUX_PRF_18", "You hadn't eaten", "had you?", "did you?", "have you?", "have", "Rule: Negative 'hadn't'. Tag is positive 'had'.", Polarity.NEGATIVE],
  ["AUX_PRF_19", "Who has done this", "hasn't he?", "haven't they?", "didn't he?", "have", "Rule: Subject 'Who' usually takes a singular tag 'he' in grammar exercises (or 'they' in modern speech).", Polarity.POSITIVE],
  ["AUX_PRF_20", "Everyone has arrived", "haven't they?", "hasn't he?", "hasn't they?", "have", "Rule: 'Everyone' takes 'has' (singular verb), but 'they' (plural tag). 'They' needs 'have'.", Polarity.POSITIVE],

  // --- SECTION 4: THE "HAVE" TRAP (POSSESSION / OBLIGATION / ACTION) ---
  ["AUX_TRP_01", "You have a car", "don't you?", "haven't you?", "are you?", "do", "Rule: 'Have' (Possession) is a main verb. Summon 'Do'.", Polarity.POSITIVE],
  ["AUX_TRP_02", "She has a bike", "doesn't she?", "hasn't she?", "is she?", "do", "Rule: 'Has' (Possession) is a main verb. Summon 'Doesn't'.", Polarity.POSITIVE],
  ["AUX_TRP_03", "You have got a car", "haven't you?", "don't you?", "didn't you?", "have", "Rule: 'Have GOT' uses 'Have' as the helper. Repeat 'Have'.", Polarity.POSITIVE],
  ["AUX_TRP_04", "She has got a bike", "hasn't she?", "doesn't she?", "isn't she?", "have", "Rule: 'Has GOT' uses 'Has' as the helper. Repeat 'Has'.", Polarity.POSITIVE],
  ["AUX_TRP_05", "We have to go", "don't we?", "haven't we?", "mustn't we?", "do", "Rule: 'Have to' is a semi-modal for obligation. It uses 'Do/Don't'.", Polarity.POSITIVE],
  ["AUX_TRP_06", "He has to work", "doesn't he?", "hasn't he?", "mustn't he?", "do", "Rule: 'Has to' uses 'Does/Doesn't'.", Polarity.POSITIVE],
  ["AUX_TRP_07", "You had to wait", "didn't you?", "hadn't you?", "shouldn't you?", "did", "Rule: 'Had to' is the past of 'have to'. Summon 'didn't'.", Polarity.POSITIVE],
  ["AUX_TRP_08", "You don't have to go", "do you?", "have you?", "must you?", "do", "Rule: Negative 'don't have to'. Remove 'not' ➔ 'do you?'.", Polarity.NEGATIVE],
  ["AUX_TRP_09", "They have lunch at 1", "don't they?", "haven't they?", "aren't they?", "do", "Rule: 'Have' implies an action (eating). Always use 'don't'.", Polarity.POSITIVE],
  ["AUX_TRP_10", "She usually has a bath", "doesn't she?", "hasn't she?", "isn't she?", "do", "Rule: 'Has' implies an action (bathing). Always use 'doesn't'.", Polarity.POSITIVE],
  ["AUX_TRP_11", "He had a good time", "didn't he?", "hadn't he?", "wasn't he?", "did", "Rule: 'Had' (Experience/Action) ➔ Summon 'didn't'.", Polarity.POSITIVE],
  ["AUX_TRP_12", "We have a problem", "don't we?", "haven't we?", "aren't we?", "do", "Rule: Possession/State. Summon 'don't'.", Polarity.POSITIVE],
  ["AUX_TRP_13", "He doesn't have time", "does he?", "has he?", "is he?", "do", "Rule: Negative 'doesn't have'. Tag is 'does he?'.", Polarity.NEGATIVE],
  ["AUX_TRP_14", "They didn't have to pay", "did they?", "had they?", "do they?", "did", "Rule: Negative 'didn't have to'. Tag is 'did they?'.", Polarity.NEGATIVE],
  ["AUX_TRP_15", "I have a headache", "don't I?", "haven't I?", "am I?", "do", "Rule: State/Possession. Summon 'don't'.", Polarity.POSITIVE],
  ["AUX_TRP_16", "He has got to leave", "hasn't he?", "doesn't he?", "mustn't he?", "have", "Rule: 'Has GOT to' ➔ Helper is 'Has'. Tag 'hasn't he?'.", Polarity.POSITIVE],
  ["AUX_TRP_17", "You'd better go", "hadn't you?", "wouldn't you?", "didn't you?", "have", "Rule: 'd better' = 'had better'. Tag is 'hadn't you?'.", Polarity.POSITIVE],
  ["AUX_TRP_18", "He'd better stop", "hadn't he?", "wouldn't he?", "didn't he?", "have", "Rule: 'd better' = 'had better'. Tag is 'hadn't he?'.", Polarity.POSITIVE],
  ["AUX_TRP_19", "We've got enough", "haven't we?", "don't we?", "didn't we?", "have", "Rule: 'We've got' = 'We have got'. Helper is 'have'.", Polarity.POSITIVE],
  ["AUX_TRP_20", "She has no idea", "does she?", "has she?", "doesn't she?", "do", "Rule: 'Has' main verb. 'No idea' makes it negative. Tag is positive 'does she?'.", Polarity.NEGATIVE],

  // --- SECTION 5: ADVANCED AUXILIARIES (NEGATIVES / QUANTIFIERS / SUBJECTS) ---
  ["AUX_ADV_01", "Everyone knows him", "don't they?", "doesn't he?", "doesn't they?", "do", "Rule: 'Everyone' (singular verb) ➔ Tag 'they' (plural helper 'don't').", Polarity.POSITIVE],
  ["AUX_ADV_02", "Nobody listens", "do they?", "don't they?", "does he?", "do", "Rule: 'Nobody' is negative. 'Nobody' uses 'they'. Tag is Positive + They ➔ 'do they?'.", Polarity.NEGATIVE],
  ["AUX_ADV_03", "He never smiles", "does he?", "doesn't he?", "is he?", "do", "Rule: 'Never' makes the sentence negative. Positive tag ➔ 'does he?'.", Polarity.NEGATIVE],
  ["AUX_ADV_04", "She hardly speaks", "does she?", "doesn't she?", "is she?", "do", "Rule: 'Hardly' is a negative adverb. Positive tag ➔ 'does she?'.", Polarity.NEGATIVE],
  ["AUX_ADV_05", "You rarely visit", "do you?", "don't you?", "are you?", "do", "Rule: 'Rarely' is negative. Positive tag ➔ 'do you?'.", Polarity.NEGATIVE],
  ["AUX_ADV_06", "Few people understand", "do they?", "don't they?", "are they?", "do", "Rule: 'Few' means 'almost no one' (Negative). Positive tag ➔ 'do they?'.", Polarity.NEGATIVE],
  ["AUX_ADV_07", "A few people know", "don't they?", "do they?", "aren't they?", "do", "Rule: 'A few' means 'some' (Positive). Negative tag ➔ 'don't they?'.", Polarity.POSITIVE],
  ["AUX_ADV_08", "Little is known", "is it?", "isn't it?", "does it?", "be", "Rule: 'Little' (scarce) is negative. Positive tag ➔ 'is it?'.", Polarity.NEGATIVE],
  ["AUX_ADV_09", "A little is left", "isn't it?", "is it?", "doesn't it?", "be", "Rule: 'A little' (some) is positive. Negative tag ➔ 'isn't it?'.", Polarity.POSITIVE],
  ["AUX_ADV_10", "Nothing matters", "does it?", "doesn't it?", "is it?", "do", "Rule: 'Nothing' is negative. Verb 'matters' (s). Tag 'does it?'.", Polarity.NEGATIVE],
  ["AUX_ADV_11", "Neither of them came", "did they?", "didn't they?", "did neither?", "did", "Rule: 'Neither' is negative. 'Came' is past. Tag 'did they?'.", Polarity.NEGATIVE],
  ["AUX_ADV_12", "None of us went", "did we?", "didn't we?", "did they?", "did", "Rule: 'None' is negative. 'Of us' = 'We'. Tag 'did we?'.", Polarity.NEGATIVE],
  ["AUX_ADV_13", "Scarcely had he gone", "had he?", "hadn't he?", "did he?", "have", "Rule: 'Scarcely' is negative. 'Had' is the auxiliary. Tag 'had he?'.", Polarity.NEGATIVE],
  ["AUX_ADV_14", "No sooner did we arrive", "did we?", "didn't we?", "had we?", "do", "Rule: 'No sooner' is negative. 'Did' is the auxiliary. Tag 'did we?'.", Polarity.NEGATIVE],
  ["AUX_ADV_15", "Seldom do they eat out", "do they?", "don't they?", "are they?", "do", "Rule: 'Seldom' is negative. 'Do' is visible. Tag 'do they?'.", Polarity.NEGATIVE],
  ["AUX_ADV_16", "You seldom drink tea", "do you?", "don't you?", "are you?", "do", "Rule: 'Seldom' makes it negative. Positive tag ➔ 'do you?'.", Polarity.NEGATIVE],
  ["AUX_ADV_17", "He barely escaped", "did he?", "didn't he?", "had he?", "did", "Rule: 'Barely' is negative. 'Escaped' is past. Tag 'did he?'.", Polarity.NEGATIVE],
  ["AUX_ADV_18", "Someone called", "didn't they?", "didn't he?", "did they?", "did", "Rule: 'Someone' takes 'they' in tags. Past tense. Tag 'didn't they?'.", Polarity.POSITIVE],
  ["AUX_ADV_19", "Nobody has seen it", "have they?", "has they?", "hasn't they?", "have", "Rule: 'Nobody' (Negative) + 'Has' (Singular) ➔ Tag 'They' (Positive Plural) ➔ 'Have they?'.", Polarity.NEGATIVE],
  ["AUX_ADV_20", "Everyone does their best", "don't they?", "doesn't he?", "doesn't they?", "do", "Rule: 'Everyone' + 'Does'. Tag 'They' + 'Do'. Negative flip ➔ 'Don't they?'.", Polarity.POSITIVE]
];

const generateQuestionBank = (data: RawQ[]): Question[] => {
  return data.map(item => {
    const [id, sentence, correct, dist1, dist2, aux, exp, sentencePol] = item;
    
    // Dynamic Polarity Detection
    // If the correct answer contains "n't" or "not", the tag is Negative.
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

export const auxiliariesQuestions = generateQuestionBank(rawData);