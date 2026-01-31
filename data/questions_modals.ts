import { Question, Polarity } from '../types.ts';

// [ID, Sentence, CorrectTag, Distractor1, Distractor2, Auxiliary, Explanation, SentencePolarity]
type RawModalQ = [string, string, string, string, string, string, string, Polarity];

const rawModalsData: RawModalQ[] = [
  // --- SECTION 1: CAN (ABILITY / PERMISSION) ---
  ["MOD_CAN_01", "You can swim", "can't you?", "don't you?", "can you?", "can", "Rule: Positive 'can' ➔ Flip to negative 'can't'.", Polarity.POSITIVE],
  ["MOD_CAN_02", "She can dance", "can't she?", "doesn't she?", "is she?", "can", "Rule: Positive 'can' ➔ Flip to negative 'can't'.", Polarity.POSITIVE],
  ["MOD_CAN_03", "They can hear us", "can't they?", "don't they?", "are they?", "can", "Rule: Positive 'can' ➔ Flip to negative 'can't'.", Polarity.POSITIVE],
  ["MOD_CAN_04", "It can wait", "can't it?", "doesn't it?", "will it?", "can", "Rule: Positive 'can' ➔ Flip to negative 'can't'.", Polarity.POSITIVE],
  ["MOD_CAN_05", "We can fix it", "can't we?", "don't we?", "have we?", "can", "Rule: Positive 'can' ➔ Flip to negative 'can't'.", Polarity.POSITIVE],
  ["MOD_CAN_06", "You can't go", "can you?", "can't you?", "do you?", "can", "Rule: Negative 'can't' ➔ Flip to positive 'can'.", Polarity.NEGATIVE],
  ["MOD_CAN_07", "He cannot see", "can he?", "can't he?", "does he?", "can", "Rule: Negative 'cannot' ➔ Flip to positive 'can'.", Polarity.NEGATIVE],
  ["MOD_CAN_08", "She can't drive", "can she?", "can't she?", "does she?", "can", "Rule: Negative 'can't' ➔ Flip to positive 'can'.", Polarity.NEGATIVE],
  ["MOD_CAN_09", "It can't be true", "can it?", "is it?", "can't it?", "can", "Rule: Negative 'can't' ➔ Flip to positive 'can'.", Polarity.NEGATIVE],
  ["MOD_CAN_10", "They can't stop", "can they?", "do they?", "are they?", "can", "Rule: Negative 'can't' ➔ Flip to positive 'can'.", Polarity.NEGATIVE],
  ["MOD_CAN_11", "One can see the sea", "can't one?", "can't you?", "can one?", "can", "Rule: Subject 'One' repeats in the tag.", Polarity.POSITIVE],
  ["MOD_CAN_12", "Nobody can help", "can they?", "can't they?", "can he?", "can", "Rule: 'Nobody' is negative + plural tag 'they'. Tag is 'can they?'.", Polarity.NEGATIVE],
  ["MOD_CAN_13", "Nothing can save us", "can it?", "can't it?", "can they?", "can", "Rule: 'Nothing' is negative + singular 'it'. Tag is 'can it?'.", Polarity.NEGATIVE],
  ["MOD_CAN_14", "Anyone can join", "can't they?", "can they?", "can't he?", "can", "Rule: 'Anyone' is positive + plural tag 'they'. Tag is 'can't they?'.", Polarity.POSITIVE],

  // --- SECTION 2: COULD (PAST ABILITY / POSSIBILITY) ---
  ["MOD_CLD_01", "You could help", "couldn't you?", "didn't you?", "can you?", "could", "Rule: Positive 'could' ➔ Flip to negative 'couldn't'.", Polarity.POSITIVE],
  ["MOD_CLD_02", "She could run fast", "couldn't she?", "can't she?", "didn't she?", "could", "Rule: Positive 'could' ➔ Flip to negative 'couldn't'.", Polarity.POSITIVE],
  ["MOD_CLD_03", "It could rain", "couldn't it?", "can't it?", "mightn't it?", "could", "Rule: Positive 'could' ➔ Flip to negative 'couldn't'.", Polarity.POSITIVE],
  ["MOD_CLD_04", "We could try", "couldn't we?", "shouldn't we?", "did we?", "could", "Rule: Positive 'could' ➔ Flip to negative 'couldn't'.", Polarity.POSITIVE],
  ["MOD_CLD_05", "He could be right", "couldn't he?", "wasn't he?", "is he?", "could", "Rule: Positive 'could' ➔ Flip to negative 'couldn't'.", Polarity.POSITIVE],
  ["MOD_CLD_06", "You couldn't know", "could you?", "did you?", "couldn't you?", "could", "Rule: Negative 'couldn't' ➔ Flip to positive 'could'.", Polarity.NEGATIVE],
  ["MOD_CLD_07", "She couldn't come", "could she?", "did she?", "was she?", "could", "Rule: Negative 'couldn't' ➔ Flip to positive 'could'.", Polarity.NEGATIVE],
  ["MOD_CLD_08", "They couldn't see", "could they?", "did they?", "can they?", "could", "Rule: Negative 'couldn't' ➔ Flip to positive 'could'.", Polarity.NEGATIVE],
  ["MOD_CLD_09", "It couldn't hurt", "could it?", "did it?", "would it?", "could", "Rule: Negative 'couldn't' ➔ Flip to positive 'could'.", Polarity.NEGATIVE],
  ["MOD_CLD_10", "We couldn't finish", "could we?", "did we?", "can we?", "could", "Rule: Negative 'couldn't' ➔ Flip to positive 'could'.", Polarity.NEGATIVE],

  // --- SECTION 3: WILL (FUTURE) ---
  ["MOD_WIL_01", "You will win", "won't you?", "willn't you?", "don't you?", "will", "Rule: Positive 'will' ➔ Flip to unique negative 'won't'.", Polarity.POSITIVE],
  ["MOD_WIL_02", "She will learn", "won't she?", "will she?", "doesn't she?", "will", "Rule: Positive 'will' ➔ Flip to negative 'won't'.", Polarity.POSITIVE],
  ["MOD_WIL_03", "They'll be late", "won't they?", "will they?", "aren't they?", "will", "Rule: Contraction 'They'll' = 'They will'. Tag 'won't they?'.", Polarity.POSITIVE],
  ["MOD_WIL_04", "I'll help you", "won't I?", "will I?", "don't I?", "will", "Rule: Contraction 'I'll' = 'I will'. Tag 'won't I?'.", Polarity.POSITIVE],
  ["MOD_WIL_05", "It'll rain soon", "won't it?", "isn't it?", "doesn't it?", "will", "Rule: Contraction 'It'll' = 'It will'. Tag 'won't it?'.", Polarity.POSITIVE],
  ["MOD_WIL_06", "You won't cry", "will you?", "won't you?", "do you?", "will", "Rule: Negative 'won't' ➔ Flip to positive 'will'.", Polarity.NEGATIVE],
  ["MOD_WIL_07", "He won't stop", "will he?", "won't he?", "does he?", "will", "Rule: Negative 'won't' ➔ Flip to positive 'will'.", Polarity.NEGATIVE],
  ["MOD_WIL_08", "It won't work", "will it?", "is it?", "does it?", "will", "Rule: Negative 'won't' ➔ Flip to positive 'will'.", Polarity.NEGATIVE],
  ["MOD_WIL_09", "They won't go", "will they?", "do they?", "are they?", "will", "Rule: Negative 'won't' ➔ Flip to positive 'will'.", Polarity.NEGATIVE],
  ["MOD_WIL_10", "She won't mind", "will she?", "does she?", "won't she?", "will", "Rule: Negative 'won't' ➔ Flip to positive 'will'.", Polarity.NEGATIVE],

  // --- SECTION 4: WOULD (CONDITIONAL) ---
  ["MOD_WLD_01", "You would go", "wouldn't you?", "will you?", "did you?", "would", "Rule: Positive 'would' ➔ Flip to negative 'wouldn't'.", Polarity.POSITIVE],
  ["MOD_WLD_02", "She'd like it", "wouldn't she?", "hadn't she?", "didn't she?", "would", "Rule: 'She'd like' = 'She would like'. Tag 'wouldn't she?'.", Polarity.POSITIVE],
  ["MOD_WLD_03", "He'd know", "wouldn't he?", "hadn't he?", "did he?", "would", "Rule: 'He'd know' = 'He would know'. Tag 'wouldn't he?'.", Polarity.POSITIVE],
  ["MOD_WLD_04", "They'd come", "wouldn't they?", "won't they?", "hadn't they?", "would", "Rule: 'They'd come' = 'They would come'. Tag 'wouldn't they?'.", Polarity.POSITIVE],
  ["MOD_WLD_05", "It would break", "wouldn't it?", "won't it?", "didn't it?", "would", "Rule: Positive 'would' ➔ Flip to negative 'wouldn't'.", Polarity.POSITIVE],
  ["MOD_WLD_06", "You wouldn't lie", "would you?", "wouldn't you?", "did you?", "would", "Rule: Negative 'wouldn't' ➔ Flip to positive 'would'.", Polarity.NEGATIVE],
  ["MOD_WLD_07", "She wouldn't dare", "would she?", "will she?", "did she?", "would", "Rule: Negative 'wouldn't' ➔ Flip to positive 'would'.", Polarity.NEGATIVE],
  ["MOD_WLD_08", "He wouldn't mind", "would he?", "will he?", "does he?", "would", "Rule: Negative 'wouldn't' ➔ Flip to positive 'would'.", Polarity.NEGATIVE],
  ["MOD_WLD_09", "They wouldn't say", "would they?", "did they?", "do they?", "would", "Rule: Negative 'wouldn't' ➔ Flip to positive 'would'.", Polarity.NEGATIVE],
  ["MOD_WLD_10", "It wouldn't hurt", "would it?", "did it?", "will it?", "would", "Rule: Negative 'wouldn't' ➔ Flip to positive 'would'.", Polarity.NEGATIVE],

  // --- SECTION 5: SHOULD (ADVICE) ---
  ["MOD_SHD_01", "You should study", "shouldn't you?", "don't you?", "wouldn't you?", "should", "Rule: Positive 'should' ➔ Flip to negative 'shouldn't'.", Polarity.POSITIVE],
  ["MOD_SHD_02", "We should go", "shouldn't we?", "shall we?", "do we?", "should", "Rule: Positive 'should' ➔ Flip to negative 'shouldn't'.", Polarity.POSITIVE],
  ["MOD_SHD_03", "He should ask", "shouldn't he?", "doesn't he?", "wouldn't he?", "should", "Rule: Positive 'should' ➔ Flip to negative 'shouldn't'.", Polarity.POSITIVE],
  ["MOD_SHD_04", "They should know", "shouldn't they?", "don't they?", "won't they?", "should", "Rule: Positive 'should' ➔ Flip to negative 'shouldn't'.", Polarity.POSITIVE],
  ["MOD_SHD_05", "It should work", "shouldn't it?", "doesn't it?", "won't it?", "should", "Rule: Positive 'should' ➔ Flip to negative 'shouldn't'.", Polarity.POSITIVE],
  ["MOD_SHD_06", "You shouldn't smoke", "should you?", "shouldn't you?", "do you?", "should", "Rule: Negative 'shouldn't' ➔ Flip to positive 'should'.", Polarity.NEGATIVE],
  ["MOD_SHD_07", "We shouldn't wait", "should we?", "shall we?", "do we?", "should", "Rule: Negative 'shouldn't' ➔ Flip to positive 'should'.", Polarity.NEGATIVE],
  ["MOD_SHD_08", "She shouldn't drive", "should she?", "does she?", "would she?", "should", "Rule: Negative 'shouldn't' ➔ Flip to positive 'should'.", Polarity.NEGATIVE],
  ["MOD_SHD_09", "He shouldn't eat", "should he?", "does he?", "did he?", "should", "Rule: Negative 'shouldn't' ➔ Flip to positive 'should'.", Polarity.NEGATIVE],
  ["MOD_SHD_10", "They shouldn't fight", "should they?", "do they?", "would they?", "should", "Rule: Negative 'shouldn't' ➔ Flip to positive 'should'.", Polarity.NEGATIVE],

  // --- SECTION 6: MUST (OBLIGATION / DEDUCTION) ---
  ["MOD_MST_01", "You must go", "mustn't you?", "don't you?", "shouldn't you?", "must", "Rule: Obligation 'must' ➔ Flip to negative 'mustn't'.", Polarity.POSITIVE],
  ["MOD_MST_02", "She must be tired", "isn't she?", "mustn't she?", "doesn't she?", "be", "Rule: Deduction (Fact Guess). 'She must be' = 'I bet she IS'. Tag the 'is'.", Polarity.POSITIVE],
  ["MOD_MST_03", "It must be true", "isn't it?", "mustn't it?", "can't it?", "be", "Rule: Deduction. 'It must be' = 'It IS'. Tag 'isn't it?'.", Polarity.POSITIVE],
  ["MOD_MST_04", "He must know", "doesn't he?", "mustn't he?", "hasn't he?", "do", "Rule: Deduction. 'He must know' = 'He surely knows'. Tag 'doesn't he?'.", Polarity.POSITIVE],
  ["MOD_MST_05", "You mustn't touch", "must you?", "do you?", "should you?", "must", "Rule: Prohibition (Obligation). 'Mustn't' ➔ Flip to 'must'.", Polarity.NEGATIVE],
  ["MOD_MST_06", "We mustn't tell", "must we?", "do we?", "shall we?", "must", "Rule: Prohibition. 'Mustn't' ➔ Flip to 'must'.", Polarity.NEGATIVE],
  ["MOD_MST_07", "They mustn't see", "must they?", "do they?", "will they?", "must", "Rule: Prohibition. 'Mustn't' ➔ Flip to 'must'.", Polarity.NEGATIVE],
  ["MOD_MST_08", "He mustn't forget", "must he?", "does he?", "will he?", "must", "Rule: Prohibition. 'Mustn't' ➔ Flip to 'must'.", Polarity.NEGATIVE],
  ["MOD_MST_09", "One must obey", "mustn't one?", "mustn't you?", "doesn't one?", "must", "Rule: Subject 'One' repeats. 'Must' flips to 'mustn't'.", Polarity.POSITIVE],
  ["MOD_MST_10", "They must have left", "haven't they?", "mustn't they?", "didn't they?", "have", "Rule: Deduction about Past. 'Must have' -> Tag the 'Have'.", Polarity.POSITIVE],

  // --- SECTION 7: MAY / MIGHT (POSSIBILITY) ---
  ["MOD_MAY_01", "I may come", "mightn't I?", "mayn't I?", "can't I?", "may", "Rule: 'Mayn't' is archaic. Use 'mightn't' (formal) or 'won't' (informal).", Polarity.POSITIVE],
  ["MOD_MAY_02", "It may rain", "mightn't it?", "mayn't it?", "won't it?", "may", "Rule: Tagging 'may' uses 'mightn't' in formal grammar.", Polarity.POSITIVE],
  ["MOD_MAY_03", "He might be late", "mightn't he?", "mayn't he?", "is he?", "might", "Rule: 'Might' flips to 'mightn't'.", Polarity.POSITIVE],
  ["MOD_MAY_04", "They might join us", "mightn't they?", "didn't they?", "won't they?", "might", "Rule: 'Might' flips to 'mightn't'.", Polarity.POSITIVE],
  ["MOD_MAY_05", "You might want this", "mightn't you?", "don't you?", "wouldn't you?", "might", "Rule: 'Might' flips to 'mightn't'.", Polarity.POSITIVE],
  ["MOD_MAY_06", "She might have gone", "mightn't she?", "hasn't she?", "didn't she?", "might", "Rule: 'Might' is the first auxiliary. Tag 'mightn't she?'.", Polarity.POSITIVE],

  // --- SECTION 8: OUGHT TO (ADVICE / DUTY) ---
  ["MOD_OUGHT_01", "You ought to go", "shouldn't you?", "oughtn't you?", "don't you?", "should", "Rule: 'Oughtn't' is rare. 'Shouldn't' is the accepted substitute.", Polarity.POSITIVE],
  ["MOD_OUGHT_02", "We ought to help", "shouldn't we?", "ought we?", "do we?", "should", "Rule: 'Shouldn't' is the common tag for 'ought to'.", Polarity.POSITIVE],
  ["MOD_OUGHT_03", "He ought not to say", "ought he?", "should he?", "did he?", "ought", "Rule: Negative 'ought not' ➔ Flip to 'ought he?' (or should he?).", Polarity.NEGATIVE],
  ["MOD_OUGHT_04", "They ought to pay", "shouldn't they?", "didn't they?", "wouldn't they?", "should", "Rule: 'Ought to' ➔ 'Shouldn't'.", Polarity.POSITIVE],
  ["MOD_OUGHT_05", "It ought to be easy", "shouldn't it?", "isn't it?", "won't it?", "should", "Rule: 'Ought to' ➔ 'Shouldn't'.", Polarity.POSITIVE],

  // --- SECTION 9: SHALL (FUTURE / SUGGESTION) ---
  ["MOD_SHALL_01", "I shall try", "shan't I?", "shalln't I?", "will I?", "shall", "Rule: Negative of 'Shall' is 'Shan't'.", Polarity.POSITIVE],
  ["MOD_SHALL_02", "We shall overcome", "shan't we?", "shalln't we?", "won't we?", "shall", "Rule: Negative of 'Shall' is 'Shan't'.", Polarity.POSITIVE],
  ["MOD_SHALL_03", "I shall not fail", "shall I?", "will I?", "do I?", "shall", "Rule: Negative 'Shall not' ➔ Flip to 'Shall I?'.", Polarity.NEGATIVE],
  ["MOD_SHALL_04", "We shan't be late", "shall we?", "will we?", "are we?", "shall", "Rule: Negative 'Shan't' ➔ Flip to 'Shall we?'.", Polarity.NEGATIVE],
  ["MOD_SHALL_05", "Let's dance", "shall we?", "will we?", "do we?", "shall", "Rule: 'Let's' is a proposal involving 'Shall'. Tag is 'Shall we?'.", Polarity.POSITIVE],

  // --- SECTION 10: NEED & DARE (SEMI-MODALS) ---
  ["MOD_SEMI_01", "You need to rest", "don't you?", "needn't you?", "aren't you?", "do", "Rule: 'Need to' is a main verb (transitive). Summon 'Don't'.", Polarity.POSITIVE],
  ["MOD_SEMI_02", "He needs a pen", "doesn't he?", "needn't he?", "hasn't he?", "do", "Rule: 'Needs' (verb+s). Summon 'Doesn't'.", Polarity.POSITIVE],
  ["MOD_SEMI_03", "She needn't worry", "need she?", "does she?", "will she?", "need", "Rule: 'Needn't' is a modal. Flip to 'Need'.", Polarity.NEGATIVE],
  ["MOD_SEMI_04", "He dare not speak", "dare he?", "dares he?", "does he?", "dare", "Rule: 'Dare' can be a modal. Negative 'dare not' ➔ Positive 'dare'.", Polarity.NEGATIVE],
  ["MOD_SEMI_05", "She doesn't dare", "does she?", "dare she?", "is she?", "do", "Rule: 'Does...dare' is a main verb structure. Tag 'does'.", Polarity.NEGATIVE],
  ["MOD_SEMI_06", "You needn't have paid", "need you?", "did you?", "have you?", "need", "Rule: 'Needn't' is the auxiliary. Tag 'Need you?'.", Polarity.NEGATIVE],
  ["MOD_SEMI_07", "I dare say", "don't I?", "daren't I?", "do I?", "do", "Rule: 'I dare say' acts like a main verb phrase. Tag 'don't I?'.", Polarity.POSITIVE],

  // --- SECTION 11: TRICKY SEMI-MODALS (HAVE TO / USED TO) ---
  ["MOD_TRK_01", "You have to go", "don't you?", "haven't you?", "mustn't you?", "do", "Rule: 'Have to' is not a modal. It's a main verb. Summon 'Don't'.", Polarity.POSITIVE],
  ["MOD_TRK_02", "She has to study", "doesn't she?", "hasn't she?", "mustn't she?", "do", "Rule: 'Has to' ➔ Summon 'Doesn't'.", Polarity.POSITIVE],
  ["MOD_TRK_03", "They had to leave", "didn't they?", "hadn't they?", "wouldn't they?", "did", "Rule: 'Had to' is Past Tense. Summon 'Didn't'.", Polarity.POSITIVE],
  ["MOD_TRK_04", "You don't have to", "do you?", "have you?", "must you?", "do", "Rule: Negative 'don't have to' ➔ Tag 'do you?'.", Polarity.NEGATIVE],
  ["MOD_TRK_05", "He used to smoke", "didn't he?", "usedn't he?", "doesn't he?", "did", "Rule: 'Used to' acts as a past tense verb. Summon 'didn't'.", Polarity.POSITIVE],
  ["MOD_TRK_06", "She used to sing", "didn't she?", "usedn't she?", "wouldn't she?", "did", "Rule: 'Used to' acts as a past tense verb. Summon 'didn't'.", Polarity.POSITIVE],
  ["MOD_TRK_07", "He'd better stop", "hadn't he?", "wouldn't he?", "didn't he?", "have", "Rule: 'd better' = 'Had better'. Tag 'hadn't he?'.", Polarity.POSITIVE],
  ["MOD_TRK_08", "You'd rather stay", "wouldn't you?", "hadn't you?", "didn't you?", "would", "Rule: 'd rather' = 'Would rather'. Tag 'wouldn't you?'.", Polarity.POSITIVE],

  // --- SECTION 12: IMPERATIVES (COMMANDS & REQUESTS) ---
  ["MOD_IMP_01", "Open the window", "will you?", "do you?", "can you?", "will", "Rule: Positive Command ➔ Standard tag 'will you?'.", Polarity.POSITIVE],
  ["MOD_IMP_02", "Don't be late", "will you?", "do you?", "are you?", "will", "Rule: Negative Command ➔ Always 'will you?'.", Polarity.NEGATIVE],
  ["MOD_IMP_03", "Pass me the salt", "will you?", "won't you?", "do you?", "will", "Rule: Request ➔ 'will you?' (standard).", Polarity.POSITIVE],
  ["MOD_IMP_04", "Shut up", "can't you?", "will you?", "do you?", "can", "Rule: Impatient Command ➔ 'can't you?' ('Are you unable to?').", Polarity.POSITIVE],
  ["MOD_IMP_05", "Have a seat", "won't you?", "will you?", "do you?", "will", "Rule: Invitation ➔ 'won't you?' (Polite/Welcoming).", Polarity.POSITIVE],
  ["MOD_IMP_06", "Help me out", "will you?", "do you?", "don't you?", "will", "Rule: Request ➔ 'will you?'.", Polarity.POSITIVE],
  ["MOD_IMP_07", "Don't forget", "will you?", "do you?", "won't you?", "will", "Rule: Negative Command ➔ 'will you?'.", Polarity.NEGATIVE],
  ["MOD_IMP_08", "Be quiet", "will you?", "aren't you?", "don't you?", "will", "Rule: Command starting with 'Be' ➔ 'will you?'.", Polarity.POSITIVE],
  ["MOD_IMP_09", "Please listen", "will you?", "do you?", "can't you?", "will", "Rule: Polite Request ➔ 'will you?'.", Polarity.POSITIVE],
  ["MOD_IMP_10", "Do come in", "won't you?", "will you?", "do you?", "will", "Rule: Persuasive Invitation ('Do...') ➔ 'won't you?'.", Polarity.POSITIVE],
  ["MOD_IMP_11", "Don't drop it", "will you?", "do you?", "won't you?", "will", "Rule: Negative Command ➔ 'will you?'.", Polarity.NEGATIVE],
  ["MOD_IMP_12", "Stand up", "will you?", "do you?", "aren't you?", "will", "Rule: Command ➔ 'will you?'.", Polarity.POSITIVE],
  ["MOD_IMP_13", "Stop talking", "will you?", "can't you?", "don't you?", "will", "Rule: Command ➔ 'will you?' (or 'can't you?' if angry).", Polarity.POSITIVE],
  ["MOD_IMP_14", "Wait a moment", "can you?", "will you?", "do you?", "can", "Rule: Asking for ability/patience ➔ 'can you?'.", Polarity.POSITIVE],
  ["MOD_IMP_15", "Let him go", "will you?", "shall he?", "won't you?", "will", "Rule: 'Let him' is a command to YOU. Tag 'will you?'.", Polarity.POSITIVE],

  // --- SECTION 13: SUGGESTIONS (LET'S) ---
  ["MOD_SUG_01", "Let's go home", "shall we?", "will we?", "do we?", "shall", "Rule: Suggestion 'Let's' (Let us) ➔ Always 'shall we?'.", Polarity.POSITIVE],
  ["MOD_SUG_02", "Let's not argue", "shall we?", "will we?", "do we?", "shall", "Rule: Negative Suggestion 'Let's not' ➔ Still 'shall we?'.", Polarity.POSITIVE], 
  ["MOD_SUG_03", "Let's eat out", "shall we?", "won't we?", "can we?", "shall", "Rule: 'Let's' ➔ 'shall we?'.", Polarity.POSITIVE],
  ["MOD_SUG_04", "Let's begin", "shall we?", "will we?", "are we?", "shall", "Rule: 'Let's' ➔ 'shall we?'.", Polarity.POSITIVE],
  ["MOD_SUG_05", "Let's take a break", "shall we?", "can we?", "do we?", "shall", "Rule: 'Let's' ➔ 'shall we?'.", Polarity.POSITIVE]
];

const generateModalsQuestions = (data: RawModalQ[]): Question[] => {
  return data.map(item => {
    const [id, sentence, correct, dist1, dist2, aux, exp, sentencePol] = item;
    
    // Dynamic Polarity Detection
    // Checks if the correct answer contains "n't" or "not" or "shan't"
    const isTagNegative = correct.includes("n't") || correct.includes(" not") || correct.includes("shan't");
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

export const modalsQuestions = generateModalsQuestions(rawModalsData);