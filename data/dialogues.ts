export const flipDialogues = {
  // --- GENERAL STATES ---
  idle: [
    "Hey! I’m Flip. I love it when grammar changes colour!",
    "Watch closely… when grammar flips, I flip!",
    "Positive, negative… it’s all about the switch.",
    "Question tags are easy—if you remember to flip!",
    "Same sentence, opposite tag. Ready?",
    "I'm a grammar chameleon. I change my colors based on the sentence!",
    "Did you know? Question tags are like verbal mirrors!",
    "I'm practicing my logic lunges. Want to join?",
    "Keep an eye on my scales—they tell the story of the sentence.",
    "English logic is just a series of beautiful flips.",
    "Sometimes I turn purple just for the fun of it!",
    "Is grammar your favorite subject? It is, isn't it?",
    "You're getting better at this. You are, aren't you?",
    // New Additions:
    "I've got one eye on the subject and the other on the verb!",
    "Waiting for your input... my tail is getting twitchy!",
    "Tags are just tiny questions attached to big sentences.",
    "I'm blending in... until the logic stands out!",
    "Ready to catch some tags? They're tastier than flies.",
    "Don't leave me hanging! I need a tag to hold onto.",
    "My colors are warming up. How about your brain?"
  ],
  
  poked: [
    "Whoa! You made me flip!",
    "Hey! That tickles my scales!",
    "A somersault? Don't mind if I do!",
    "Flip-tastic! You've got fast fingers.",
    "I'm feeling dizzy... but in a good way!",
    "Ready for another lesson? Just click me again!",
    "I could do this all day! Boing!",
    "Check out this 360-degree grammar move!",
    "My tail almost got tangled there!",
    "You're quite the persistent flipper, aren't you?",
    // New Additions:
    "Whoop! I almost turned plaid there!",
    "Poke me again and I might vanish! Just kidding.",
    "I'm awake! I'm awake! What's the question?",
    "Do I look like a touchscreen to you? Okay, maybe I do.",
    "Hey, watch the eyes! They move independently you know.",
    "Boop! That's the sound of logic loading."
  ],

  // --- SUCCESS STATES ---
  correct_flip: [
    "Perfect flip!",
    "Opposites attract!",
    "Yes! You switched the polarity.",
    "Green to red—exactly right!",
    "That’s how question tags work!",
    "Nice thinking! You didn’t match—you flipped.",
    "Your logic is as sharp as my tongue!",
    "Spot on! The polarity shifted perfectly.",
    "Boom! Another one in the bag.",
    "You've mastered the art of the flip!",
    // New Additions:
    "Balance restored! Perfectly flipped.",
    "You caught that one mid-air!",
    "My colors love you right now.",
    "That was smooth—like a lizard on a leaf.",
    "Correct! You identified the auxiliary and flipped it.",
    "High five! (If I had hands...)",
    "Logic checks out. Colour checks out. You win!",
    "You're seeing the matrix now. Or at least the grammar."
  ],

  // --- ERROR STATES ---
  wrong_no_flip: [
    "Uh-oh… same colour means same polarity.",
    "Nothing flipped!",
    "Both sides matched—but they shouldn’t.",
    "Try again. Question tags love opposites.",
    "I couldn’t change colour… the logic didn’t flip.",
    "Remember: if it's (+) on the left, it's (-) on the right!",
    "Don't let them match! They're like magnets—they should repel.",
    "Mirror, mirror on the wall... you missed the flip after all!",
    // New Additions:
    "Too much positivity! We need a negative to balance it.",
    "Double negative? Nope. Double positive? Also nope.",
    "You forgot the 'not'! It's the knot that ties the tag.",
    "I stayed the same color... that's a bad sign!",
    "Danger! Polarity overload. Switch the switch!",
    "If the sentence says 'yes', the tag must ask 'no'."
  ],

  wrong_auxiliary: [
    "Good flip… but the helper verb slipped!",
    "Polarity is right, but listen to the verb.",
    "Check the auxiliary—is, are, do, does matter.",
    "Almost there! Structure needs fixing.",
    "The tag should use the same 'helper' as the sentence!",
    "Switching 'is' for 'does'? Not quite!",
    "The polarity is right, but the verb is feeling lonely.",
    // New Additions:
    "You brought 'do' to an 'is' party!",
    "Right switch, wrong verb. Check who is leading the sentence.",
    "You can't swap 'have' for 'did'—they don't get along.",
    "So close! But the verb didn't stick the landing.",
    "Look at the first verb in the sentence. Copy it!",
    "If the sentence uses 'will', the tag can't use 'do'."
  ],

  // --- EDUCATIONAL CONTENT ---
  hint: [
    "Step one: Is the sentence positive or negative?",
    "Step two: Do the opposite in the tag.",
    "Step three: Match the auxiliary.",
    "Same tense. Same subject. Opposite polarity.",
    "If the sentence says ‘not’, the tag must not.",
    "Listen to the first verb—it usually holds the key.",
    "Don't overthink it—just flip the switch!",
    // New Additions:
    "Look at the first word. Now look at the end. Do they match?",
    "Find the verb first. Hug it. Then flip it.",
    "If the sentence is a 'plus', the tag is a 'minus'.",
    "Check the pronoun! 'Sarah' becomes 'she'.",
    "Is there a hidden negative like 'never' or 'rarely'?"
  ],

  learning_tip: [
    "See? Positive sentence… negative tag.",
    "Notice how the verb stays the same.",
    "The tag borrows the helping verb.",
    "This is why question tags feel tricky—but they aren’t!",
    "Flip the meaning, not the sentence.",
    "Think of it as a question that expects a 'Yes' or 'No'.",
    "Short tags are always better than long ones!",
    // New Additions:
    "Don't forget contractions! 'Is not it' sounds robotic. Use 'isn't it'.",
    "If you are really asking, your voice goes UP at the end.",
    "If you already know the answer, your voice goes DOWN.",
    "Be careful! 'Everyone' is singular, but the tag uses 'they'.",
    "'Let's' always takes 'shall we'. It's a polite suggestion!"
  ],

  // --- SPECIAL GRAMMAR TRAPS ---
  // Trigger these for specific tricky questions (Optional but recommended)
  exception_i_am: [
    "Aha! The classic trap. 'I am' becomes 'aren't I'!",
    "I know it looks weird, but 'amn't I' isn't a word!",
    "English is funny sometimes. 'Aren't I' is the rule here."
  ],
  exception_hidden_negative: [
    "Careful! 'Never' makes the sentence negative already.",
    "Words like 'rarely' count as a negative switch!",
    "It looks positive, but 'seldom' makes it negative. So the tag is positive!"
  ],

  // --- GAME PROGRESSION ---
  end_unit: [
    "Nice work! You flipped every time.",
    "This rule won’t confuse you again.",
    "Your grammar reflexes are improving!",
    "Ready to flip the next one?",
    "You're a natural-born flipper!",
    "Unit complete! My scales are glowing!",
    // New Additions:
    "I'm glowing neon right now! You did it!",
    "Next level unlocked! Let's see if you can handle the speed.",
    "You've earned a gold star... or a gold fly. Whichever you prefer."
  ],

  final_quiz: {
    start: "Alright… the Ultimate Flip! No hints now—just logic.",
    success: "Flawless flipping! Grammar logic: unlocked!",
    retry: "Not bad—but some colours didn’t change. Review and try again.",
    master: "You're not a student anymore, you're a Tag Master."
  }
};