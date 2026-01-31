import { Question, Polarity } from '../types.ts';

// [id, sentence, correctTag, dist1, dist2, auxiliary, explanation, sentencePolarity]
type RawAdvancedQ = [string, string, string, string, string, string, string, Polarity];

const rawAdvancedData: RawAdvancedQ[] = [
  // --- SAME-WAY TAGS (SARCASM / SUSPICION / SURPRISE) ---
  ["ADV_SAM_01", "So you're the new boss, ... (Sarcastic)", "are you?", "aren't you?", "isn't it?", "be", "Sarcasm Rule: When mocking or showing suspicion, we do NOT flip polarity. Positive statement → Positive tag.", Polarity.POSITIVE],
  ["ADV_SAM_02", "You think you're clever, ... (Challenging)", "do you?", "don't you?", "isn't it?", "do", "Challenge Rule: Repeating the auxiliary ('do you?') challenges the statement rather than asking for agreement.", Polarity.POSITIVE],
  ["ADV_SAM_03", "Oh, you've met him before, ... (Surprise)", "have you?", "haven't you?", "did you?", "have", "Surprise Rule: A Positive-Positive tag expresses genuine surprise at new information.", Polarity.POSITIVE],
  ["ADV_SAM_04", "So she thinks she can win, ... (Mocking)", "does she?", "doesn't she?", "is she?", "do", "Mockery Rule: We repeat the auxiliary 'does' without negation to mock her belief.", Polarity.POSITIVE],
  ["ADV_SAM_05", "You call this a clean room, ... (Aggressive)", "do you?", "don't you?", "is it?", "do", "Aggression Rule: Confrontational questions often mirror the polarity ('You call this... do you?').", Polarity.POSITIVE],
  ["ADV_SAM_06", "So you like that sort of thing, ... (Suspicion)", "do you?", "don't you?", "are you?", "do", "Suspicion Rule: The speaker is verifying a suspicious fact, so the tag remains positive.", Polarity.POSITIVE],
  ["ADV_SAM_07", "Oh, he's arrived already, ... (Surprise)", "is he?", "isn't he?", "has he?", "be", "Surprise Rule: 'He is' (He's) is mirrored as 'is he?' to show shock at the timing.", Polarity.POSITIVE],
  ["ADV_SAM_08", "You're the one who broke it, ... (Accusation)", "are you?", "aren't you?", "did you?", "be", "Accusation Rule: When accusing someone directly, we often use a same-way tag for emphasis.", Polarity.POSITIVE],
  ["ADV_SAM_09", "So they want a raise, ... (Disbelief)", "do they?", "don't they?", "will they?", "do", "Disbelief Rule: The speaker repeats the implied 'do' to show they cannot believe the statement.", Polarity.POSITIVE],
  ["ADV_SAM_10", "You've lost the keys again, ... (Annoyance)", "have you?", "haven't you?", "did you?", "have", "Annoyance Rule: Similar to surprise, annoyance often uses a non-reversed tag.", Polarity.POSITIVE],

  // --- IMPERATIVES (COMMANDS / REQUESTS / INVITATIONS) ---
  ["ADV_IMP_01", "Shut up, ... (Angry)", "can't you?", "will you?", "won't you?", "can", "Angry Command: 'Will you?' is standard, but 'Can't you?' implies impatience ('Are you incapable of silence?').", Polarity.POSITIVE],
  ["ADV_IMP_02", "Have another drink, ... (Invitation)", "won't you?", "will you?", "don't you?", "will", "Polite Invitation: 'Won't you?' makes an offer sound welcoming and polite, rather than demanding.", Polarity.POSITIVE],
  ["ADV_IMP_03", "Do sit down, ... (Polite)", "won't you?", "will you?", "can you?", "will", "Persuasion: The use of 'Do' signals a polite urge. 'Won't you?' is the correct matching tag.", Polarity.POSITIVE],
  ["ADV_IMP_04", "Don't be late, ...", "will you?", "won't you?", "do you?", "will", "Negative Imperative: Commands starting with 'Don't' ALWAYS take 'will you?' to ask for future compliance.", Polarity.NEGATIVE],
  ["ADV_IMP_05", "Let's go to the cinema, ...", "shall we?", "will we?", "shan't we?", "shall", "Suggestion Rule: 'Let's' (Let us) always uses 'shall we?' because it is a joint proposal.", Polarity.POSITIVE],
  ["ADV_IMP_06", "Let me help you, ...", "shall I?", "will I?", "may I?", "shall", "Offer Rule: When offering help ('Let me'), we use 'shall I?' (or 'may I?').", Polarity.POSITIVE],
  ["ADV_IMP_07", "Let him do it, ...", "will you?", "shall he?", "won't you?", "will", "Instruction Rule: 'Let him' is a command to YOU (the listener). The tag is 'will you?'.", Polarity.POSITIVE],
  ["ADV_IMP_08", "Pass the salt, ... (Standard)", "will you?", "don't you?", "aren't you?", "will", "Standard Command: The neutral tag for any positive command is 'will you?'.", Polarity.POSITIVE],
  ["ADV_IMP_09", "Keep quiet, ... (Impatient)", "can't you?", "will you?", "don't you?", "can", "Impatient Command: Using 'can't you?' challenges the listener's ability to obey.", Polarity.POSITIVE],
  ["ADV_IMP_10", "Don't forget to call, ...", "will you?", "do you?", "won't you?", "will", "Negative Imperative: 'Don't' commands look to the future, so we use 'will you?'.", Polarity.NEGATIVE],
  ["ADV_IMP_11", "Open the door, ... (Request)", "could you?", "will you?", "can't you?", "could", "Soft Request: 'Could you?' or 'would you?' makes a command sound softer and less direct.", Polarity.POSITIVE],
  ["ADV_IMP_12", "Be careful, ...", "will you?", "aren't you?", "don't you?", "will", "Future State: Even though it uses 'Be', it's a command for the future. Use 'will you?'.", Polarity.POSITIVE],
  ["ADV_IMP_13", "Let's not argue, ...", "shall we?", "will we?", "shan't we?", "shall", "Negative Suggestion: Even with 'not', 'Let's' always triggers 'shall we?'.", Polarity.NEGATIVE],
  ["ADV_IMP_14", "Someone help me, ...", "will you?", "can they?", "won't they?", "will", "Group Address: When shouting to a group ('Someone'), we are asking YOU (anyone) to act. Use 'will you?'.", Polarity.POSITIVE],
  ["ADV_IMP_15", "Don't you dare do that, ...", "will you?", "do you?", "won't you?", "will", "Warning: Strong negative warnings follow the Negative Imperative rule ('will you?').", Polarity.NEGATIVE],

  // --- EXCLAMATIONS ---
  ["ADV_EXC_01", "What a lovely day, ...", "isn't it?", "wasn't it?", "is it?", "be", "Exclamation Rule: The sentence implies 'It IS a lovely day'. We tag the implied subject/verb.", Polarity.POSITIVE],
  ["ADV_EXC_02", "How well she sings, ...", "doesn't she?", "sings she?", "isn't it?", "do", "Action Exclamation: The main verb is 'sings' (Simple Present). We summon the ghost 'Doesn't'.", Polarity.POSITIVE],
  ["ADV_EXC_03", "What a mess, ...", "isn't it?", "is it?", "doesn't it?", "be", "Implied Subject: 'What a mess (it is)'. Tag 'it is'.", Polarity.POSITIVE],
  ["ADV_EXC_04", "How strange, ...", "isn't it?", "is it?", "wasn't it?", "be", "Implied Subject: 'How strange (it is)'. Tag 'it is'.", Polarity.POSITIVE],
  ["ADV_EXC_05", "What a fool I was, ...", "wasn't I?", "didn't I?", "weren't I?", "be", "Past Exclamation: The visible verb is 'was'. We simply flip it to 'wasn't I?'.", Polarity.POSITIVE],
  ["ADV_EXC_06", "How beautiful they are, ...", "aren't they?", "isn't it?", "don't they?", "be", "Plural Exclamation: The subject is 'they'. Tag 'aren't they?'.", Polarity.POSITIVE],
  ["ADV_EXC_07", "What an idea, ...", "isn't it?", "is it?", "wasn't it?", "be", "Noun Exclamation: 'Idea' is singular/neutral. Tag 'isn't it?'.", Polarity.POSITIVE],
  ["ADV_EXC_08", "How time flies, ...", "doesn't it?", "isn't it?", "won't it?", "do", "Action Exclamation: 'Time' (it) 'flies' (verb+s). We summon 'Doesn't'.", Polarity.POSITIVE],
  ["ADV_EXC_09", "What nonsense, ...", "isn't it?", "is it?", "aren't they?", "be", "Uncountable Noun: 'Nonsense' is singular. Tag 'isn't it?'.", Polarity.POSITIVE],
  ["ADV_EXC_10", "How disgusting, ...", "isn't it?", "is it?", "doesn't it?", "be", "Adjective Exclamation: Implies '(It is) disgusting'. Tag 'isn't it?'.", Polarity.POSITIVE],

  // --- OPINION & COMPLEX SENTENCES ---
  ["ADV_CPX_01", "I think he is lying, ...", "isn't he?", "don't I?", "doesn't he?", "be", "Opinion Rule: Ignore opinion markers like 'I think'. Tag the real content ('he is lying').", Polarity.POSITIVE],
  ["ADV_CPX_02", "I suppose you're hungry, ...", "aren't you?", "don't I?", "do I?", "be", "Opinion Rule: 'I suppose' is just a frame. The fact is 'you are hungry'. Tag 'aren't you?'.", Polarity.POSITIVE],
  ["ADV_CPX_03", "You know that she is right, ...", "don't you?", "isn't she?", "doesn't she?", "do", "Main Clause Rule: Here, 'You know' IS the main point (checking agreement). Tag 'don't you?'.", Polarity.POSITIVE],
  ["ADV_CPX_04", "I don't believe she has finished, ...", "has she?", "do I?", "hasn't she?", "have", "Transferred Negation: 'I don't believe' makes the whole sentence negative. The tag must be POSITIVE.", Polarity.NEGATIVE],
  ["ADV_CPX_05", "It appears that they left, ...", "doesn't it?", "didn't they?", "don't they?", "do", "Subject Rule: 'It' is the subject of the main verb 'appears'. Tag 'doesn't it?'.", Polarity.POSITIVE],
  ["ADV_CPX_06", "I imagine he will come, ...", "won't he?", "don't I?", "will he?", "will", "Opinion Rule: 'I imagine' is a guess. Tag the event 'he will come' -> 'won't he?'.", Polarity.POSITIVE],
  ["ADV_CPX_07", "She said she was tired, ...", "didn't she?", "wasn't she?", "did she?", "do", "Reporting Rule: We are checking what she SAID, not if she was tired. Tag 'said' (did).", Polarity.POSITIVE],
  ["ADV_CPX_08", "I don't suppose you have a pen, ...", "have you?", "do I?", "haven't you?", "have", "Polite Request: 'I don't suppose' is negative, so the tag is positive ('have you?').", Polarity.NEGATIVE],
  ["ADV_CPX_09", "It is true that he failed, ...", "isn't it?", "didn't he?", "is it?", "be", "Main Clause Rule: The subject is 'It' (is true). We tag 'isn't it?'.", Polarity.POSITIVE],
  ["ADV_CPX_10", "You don't think I'm crazy, ...", "do you?", "aren't I?", "am I?", "do", "Checking Thoughts: The speaker asks about the listener's opinion ('You don't think'). Tag 'do you?'.", Polarity.NEGATIVE],

  // --- INVERTED SENTENCES & NEGATIVE ADVERBS ---
  ["ADV_INV_01", "Never have I seen such a thing, ...", "have I?", "haven't I?", "did I?", "have", "Negative Adverb: 'Never' makes the sentence negative. The tag must be POSITIVE ('have I?').", Polarity.NEGATIVE],
  ["ADV_INV_02", "Little does he know, ...", "does he?", "doesn't he?", "is he?", "do", "Negative Adverb: 'Little' means 'almost nothing' (Negative). Tag is Positive ('does he?').", Polarity.NEGATIVE],
  ["ADV_INV_03", "Seldom do we eat out, ...", "do we?", "don't we?", "aren't we?", "do", "Negative Adverb: 'Seldom' means rarely (Negative). Tag is Positive ('do we?').", Polarity.NEGATIVE],
  ["ADV_INV_04", "Rarely has she been late, ...", "has she?", "hasn't she?", "is she?", "have", "Inversion Rule: The auxiliary 'has' is already visible. 'Rarely' makes it negative. Tag 'has she?'.", Polarity.NEGATIVE],
  ["ADV_INV_05", "No sooner did he arrive, ...", "did he?", "didn't he?", "had he?", "do", "Negative Adverb: 'No sooner' is a negative phrase. Tag is Positive ('did he?').", Polarity.NEGATIVE],
  ["ADV_INV_06", "Hardly ever does it snow here, ...", "does it?", "doesn't it?", "is it?", "do", "Negative Adverb: 'Hardly ever' makes the sentence negative. Tag is Positive ('does it?').", Polarity.NEGATIVE],
  ["ADV_INV_07", "Scarcely had they left, ...", "had they?", "hadn't they?", "did they?", "have", "Negative Adverb: 'Scarcely' is negative. Keep the auxiliary 'had' and make it positive.", Polarity.NEGATIVE],
  ["ADV_INV_08", "Nowhere will you find better food, ...", "will you?", "won't you?", "can you?", "will", "Negative Subject: 'Nowhere' makes the sentence negative. Tag is Positive ('will you?').", Polarity.NEGATIVE],
  ["ADV_INV_09", "Under no circumstances must you go, ...", "must you?", "mustn't you?", "will you?", "must", "Negative Phrase: 'Under no circumstances' is negative. Tag is Positive ('must you?').", Polarity.NEGATIVE],
  ["ADV_INV_10", "Barely was there enough time, ...", "was there?", "wasn't there?", "is there?", "be", "Negative Adverb: 'Barely' counts as negative. Tag is Positive ('was there?').", Polarity.NEGATIVE],

  // --- TRICKY MODALS ---
  ["ADV_MOD_01", "I may join you, ...", "mightn't I?", "mayn't I?", "can't I?", "may", "Substitution Rule: 'Mayn't' is rare/archaic. We substitute it with 'mightn't' (formal) or 'won't'.", Polarity.POSITIVE],
  ["ADV_MOD_02", "He dare not go, ...", "dare he?", "dares he?", "does he?", "dare", "Modal Dare: Here 'dare' is a modal (no 's', followed by base verb). It repeats in the tag.", Polarity.NEGATIVE],
  ["ADV_MOD_03", "You used to smoke, ...", "didn't you?", "usedn't you?", "don't you?", "do", "Used To Rule: 'Used to' indicates past habit. We treat it as a past tense verb -> 'didn't'.", Polarity.POSITIVE],
  ["ADV_MOD_04", "We ought to leave, ...", "shouldn't we?", "oughtn't we?", "don't we?", "should", "Substitution Rule: 'Oughtn't' is clumsy. 'Shouldn't' is the standard modern tag for 'ought'.", Polarity.POSITIVE],
  ["ADV_MOD_05", "She needn't come, ...", "need she?", "needs she?", "does she?", "need", "Modal Need: 'Needn't' shows 'need' is acting as a modal. Repeat 'Need' in the tag.", Polarity.NEGATIVE],
  ["ADV_MOD_06", "You need to work, ...", "don't you?", "needn't you?", "need you?", "do", "Verb Need: 'Need TO' shows 'need' is a main verb. Summon 'Do' (don't you?).", Polarity.POSITIVE],
  ["ADV_MOD_07", "He daren't say it, ...", "dare he?", "dares he?", "doesn't he?", "dare", "Negative Modal: 'Daren't' is the negative modal. Tag is positive 'dare he?'.", Polarity.NEGATIVE],
  ["ADV_MOD_08", "You'd better go, ...", "hadn't you?", "wouldn't you?", "didn't you?", "have", "Contraction Trap: In 'You'd better', the 'd stands for 'HAD'. Tag 'hadn't you?'.", Polarity.POSITIVE],
  ["ADV_MOD_09", "You'd rather stay, ...", "wouldn't you?", "hadn't you?", "didn't you?", "would", "Contraction Trap: In 'You'd rather', the 'd stands for 'WOULD'. Tag 'wouldn't you?'.", Polarity.POSITIVE],
  ["ADV_MOD_10", "One must not forget, ...", "must one?", "mustn't one?", "must it?", "must", "Formal Subject: The subject 'One' is retained in the tag in formal English.", Polarity.NEGATIVE],
  ["ADV_MOD_11", "He might have missed the bus, ...", "mightn't he?", "hasn't he?", "didn't he?", "might", "Modal Perfect: Tag the first auxiliary ('might'), not the perfect auxiliary ('have').", Polarity.POSITIVE],
  ["ADV_MOD_12", "You must have been tired, ...", "weren't you?", "mustn't you?", "haven't you?", "be", "Deduction Rule: 'Must have been' is a guess about the past (You were tired). Tag the reality -> 'weren't you?'.", Polarity.POSITIVE],
  ["ADV_MOD_13", "It must be true, ...", "isn't it?", "mustn't it?", "doesn't it?", "be", "Deduction Rule: 'Must be' is a guess about the present (It is true). Tag the reality -> 'isn't it?'.", Polarity.POSITIVE],
  ["ADV_MOD_14", "They had to leave, ...", "didn't they?", "hadn't they?", "shouldn't they?", "do", "Past Obligation: 'Had to' is the past of 'Must'. Since it's a past verb, summon 'Did'.", Polarity.POSITIVE],
  ["ADV_MOD_15", "I shall proceed, ...", "shan't I?", "shalln't I?", "will I?", "shall", "Formal Future: The negative of 'Shall' is 'Shan't'.", Polarity.POSITIVE],

  // --- PRONOUN & NOUN NUANCES ---
  ["ADV_PRO_01", "Nobody came, ...", "did they?", "didn't they?", "did he?", "do", "Indefinite Pronoun: 'Nobody' takes a singular verb, but the tag ALWAYS uses 'they'.", Polarity.NEGATIVE],
  ["ADV_PRO_02", "Everything is fine, ...", "isn't it?", "aren't they?", "is it?", "be", "Thing vs Body: Words ending in -thing use 'it'. Words ending in -body/-one use 'they'.", Polarity.POSITIVE],
  ["ADV_PRO_03", "None of them arrived, ...", "did they?", "didn't they?", "did none?", "do", "Negative Subject: 'None' makes the sentence negative. The tag is Positive ('did they?').", Polarity.NEGATIVE],
  ["ADV_PRO_04", "Neither of us knew, ...", "did we?", "didn't we?", "did us?", "do", "Negative Subject: 'Neither' is negative. 'Of us' means the subject is 'we'. Tag 'did we?'.", Polarity.NEGATIVE],
  ["ADV_PRO_05", "This is yours, ...", "isn't it?", "isn't this?", "aren't they?", "be", "Demonstrative Rule: 'This' and 'That' become 'it' in the tag.", Polarity.POSITIVE],
  ["ADV_PRO_06", "Those are nice, ...", "aren't they?", "isn't it?", "aren't those?", "be", "Demonstrative Rule: 'These' and 'Those' become 'they' in the tag.", Polarity.POSITIVE],
  ["ADV_PRO_07", "One can't be too careful, ...", "can one?", "can't one?", "can you?", "can", "Formal Subject: 'One' acts as the subject and repeats in the tag.", Polarity.NEGATIVE],
  ["ADV_PRO_08", "Nothing matters, ...", "does it?", "doesn't it?", "do they?", "do", "Negative Subject: 'Nothing' is negative and singular. Tag 'does it?'.", Polarity.NEGATIVE],
  ["ADV_PRO_09", "Something is wrong, ...", "isn't it?", "is it?", "aren't they?", "be", "Indefinite Pronoun: 'Something' is singular and non-human. Use 'it'.", Polarity.POSITIVE],
  ["ADV_PRO_10", "Everybody knows, ...", "don't they?", "doesn't he?", "doesn't they?", "do", "Plural Logic: 'Everybody' is grammatically singular (knows), but the tag uses 'they', so we must switch to 'don't'.", Polarity.POSITIVE],

  // --- "THERE" & "HAVE" NUANCES ---
  ["ADV_MSC_01", "There used to be a park, ...", "didn't there?", "usedn't there?", "wasn't there?", "do", "Existential Rule: 'There' acts as the subject. 'Used to' triggers 'did'. Tag 'didn't there?'.", Polarity.POSITIVE],
  ["ADV_MSC_02", "There is no point, ...", "is there?", "isn't there?", "is it?", "be", "Negative Rule: 'No point' makes the sentence negative. Tag is Positive ('is there?').", Polarity.NEGATIVE],
  ["ADV_MSC_03", "There's plenty of time, ...", "isn't there?", "is there?", "hasn't there?", "be", "Contraction Check: 'There's' = 'There is'. Tag 'isn't there?'.", Polarity.POSITIVE],
  ["ADV_MSC_04", "There's been a mistake, ...", "hasn't there?", "isn't there?", "didn't there?", "have", "Contraction Check: 'There's been' = 'There HAS been'. Tag 'hasn't there?'.", Polarity.POSITIVE],
  ["ADV_MSC_05", "You have a car, ... (US)", "don't you?", "haven't you?", "do you?", "do", "Action 'Have': In US/Modern English, 'have' is a main verb. Summon 'Do' (don't you?).", Polarity.POSITIVE],
  ["ADV_MSC_06", "You have got a car, ... (UK)", "haven't you?", "don't you?", "didn't you?", "have", "'Have Got' Rule: 'Have' acts as the auxiliary here. Tag 'haven't you?'.", Polarity.POSITIVE],
  ["ADV_MSC_07", "You have lunch at 1, ...", "don't you?", "haven't you?", "aren't you?", "do", "Action 'Have': Here 'have' means 'eat'. It is a main verb. Summon 'Do'.", Polarity.POSITIVE],
  ["ADV_MSC_08", "There appear to be problems, ...", "don't there?", "doesn't there?", "aren't there?", "do", "Complex There: 'There' is the subject. 'Appear' is the verb (plural). Tag 'Don't there?'.", Polarity.POSITIVE],
  ["ADV_MSC_09", "There seems to be a mistake, ...", "doesn't there?", "don't there?", "isn't there?", "do", "Complex There: 'There' is the subject. 'Seems' is the verb (singular). Tag 'Doesn't there?'.", Polarity.POSITIVE],
  ["ADV_MSC_10", "There will be rain, ...", "won't there?", "will there?", "isn't there?", "will", "Modal There: 'There' works with modals too. 'Will' becomes 'Won't there?'.", Polarity.POSITIVE],

  // --- FINAL MIXED BAG (The Hardest) ---
  ["ADV_HRD_01", "Not a single word was spoken, ...", "was it?", "wasn't it?", "did it?", "be", "Negative Subject: 'Not a single...' makes the sentence negative. Tag is Positive ('was it?').", Polarity.NEGATIVE],
  ["ADV_HRD_02", "I'm right, ...", "aren't I?", "amn't I?", "am I not?", "be", "The 'I Am' Exception: 'Am I not' is too formal. English uses 'aren't I?' for positive 'I am' sentences.", Polarity.POSITIVE],
  ["ADV_HRD_03", "I'm not late, ...", "am I?", "aren't I?", "do I?", "be", "Regular Negative: 'I am not' follows standard rules. Remove 'not' -> 'am I?'.", Polarity.NEGATIVE],
  ["ADV_HRD_04", "The police are here, ...", "aren't they?", "isn't it?", "isn't he?", "be", "Collective Noun: 'Police' is always plural. Tag 'aren't they?'.", Polarity.POSITIVE],
  ["ADV_HRD_05", "The news is bad, ...", "isn't it?", "aren't they?", "doesn't it?", "be", "Uncountable Noun: 'News' ends in 's' but is singular. Tag 'isn't it?'.", Polarity.POSITIVE],
  ["ADV_HRD_06", "Measles is contagious, ...", "isn't it?", "aren't they?", "is it?", "be", "Disease Rule: Diseases ending in 's' (Measles, Mumps) are singular. Tag 'isn't it?'.", Polarity.POSITIVE],
  ["ADV_HRD_07", "Politics is complicated, ...", "isn't it?", "aren't they?", "don't they?", "be", "Abstract Noun: Fields of study ending in '-ics' are usually singular. Tag 'isn't it?'.", Polarity.POSITIVE],
  ["ADV_HRD_08", "Neither John nor Mary went, ...", "did they?", "didn't they?", "did she?", "do", "Compound Negative: 'Neither...nor' is negative. Two people = 'they'. Tag 'did they?'.", Polarity.NEGATIVE],
  ["ADV_HRD_09", "You and I are friends, ...", "aren't we?", "aren't you?", "don't we?", "be", "Subject Math: You + I = We. Tag 'aren't we?'.", Polarity.POSITIVE],
  ["ADV_HRD_10", "Wait a minute, ...", "can you?", "will you?", "don't you?", "can", "Ability Request: Using 'Can you?' with a command implies 'Are you able/willing to wait?'.", Polarity.POSITIVE],
  ["ADV_HRD_11", "Let's take a break, ...", "shall we?", "will we?", "shan't we?", "shall", "Suggestion Rule: 'Let's' always triggers 'shall we?'.", Polarity.POSITIVE],
  ["ADV_HRD_12", "Don't let him see, ...", "will you?", "shall we?", "do you?", "will", "Negative Imperative: 'Don't' always triggers 'will you?'.", Polarity.NEGATIVE],
  ["ADV_HRD_13", "Minds were blown, ...", "weren't they?", "wasn't it?", "didn't they?", "be", "Plural Subject: 'Minds' is plural -> 'they'. Tag 'weren't they?'.", Polarity.POSITIVE],
  ["ADV_HRD_14", "Wish me luck, ...", "will you?", "may you?", "don't you?", "will", "Imperative: Standard positive command. 'Will you?' is the safest tag.", Polarity.POSITIVE],
  ["ADV_HRD_15", "Everybody looked happy, ...", "didn't they?", "didn't he?", "don't they?", "do", "Pronoun Shift: 'Everybody' takes singular verbs (looked), but 'they' in the tag. Past tense -> 'Didn't they?'.", Polarity.POSITIVE]
];

export const advancedQuestions: Question[] = rawAdvancedData.map(data => {
  const [id, sentence, correct, dist1, dist2, aux, exp, sentencePol] = data;
  
  // Determine if the *tag* should be positive or negative based on the correct answer string.
  const isTagNegative = correct.includes("n't") || correct.includes(" not");
  const tagPol = isTagNegative ? Polarity.NEGATIVE : Polarity.POSITIVE;

  return {
    id,
    sentence,
    options: [
      { text: correct, polarity: tagPol },
      // Smart Distractor Logic:
      // If the answer is Positive (e.g., "did they?"), distractor is Negative ("didn't they?").
      // If the answer is Negative (e.g., "isn't it?"), distractor is Positive ("is it?").
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