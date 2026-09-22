// Curated word set with progressive difficulty
// Level 1: Easy, Level 2: Easy–Medium, Level 3: Medium, Level 4: Medium–Hard
export const LEVELS = [
  {
    id: 1,
    word: 'LIGHT',
    hint: 'It chases away the darkness and helps you see.',
    difficulty: 1,
    microReward: 'Good start.'
  },
  {
    id: 2,
    word: 'DREAM',
    hint: 'It visits you when your eyes are closed at night.',
    difficulty: 2,
    microReward: "You're warming up."
  },
  {
    id: 3,
    word: 'FOCUS',
    hint: 'The ability to concentrate on what matters most.',
    difficulty: 3,
    microReward: 'Sharp thinking.'
  },
  {
    id: 4,
    word: 'SHINE',
    hint: 'To glow brightly, like something precious.',
    difficulty: 4,
    microReward: 'Journey complete.'
  }
];

export const GIFT_MESSAGES = [
  {
    title: 'Today you chose to challenge your mind.',
    body: 'Keep that curiosity.\nKeep moving forward.\nThere are brighter things ahead of you.',
    closing: 'Have a wonderful day.\nYour future is still being written.'
  },
  {
    title: 'You gave your mind a challenge today.',
    body: 'Keep learning. Keep exploring. Keep moving.',
    closing: 'Your next chapter has room for something wonderful.'
  },
  {
    title: 'One small challenge completed.',
    body: 'One more reminder that progress starts with showing up.',
    closing: 'Keep going — brighter days are ahead.'
  }
];

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;
export const TIMER_SECONDS = 60;
export const TOTAL_LEVELS = 4;
