import { WORD_LENGTH, MAX_GUESSES } from '../data/words';
import { VALID_WORDS } from '../data/validWords';

// Evaluate a guess against the target word
// Returns array of { letter, status } where status is 'correct', 'present', or 'absent'
export function evaluateGuess(guess, target) {
  const result = Array(WORD_LENGTH).fill(null).map((_, i) => ({
    letter: guess[i],
    status: 'absent'
  }));
  
  const targetLetters = target.split('');
  const remaining = [...targetLetters];
  
  // First pass: mark correct positions
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guess[i] === target[i]) {
      result[i].status = 'correct';
      remaining[i] = null;
    }
  }
  
  // Second pass: mark present letters
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i].status === 'correct') continue;
    const idx = remaining.indexOf(guess[i]);
    if (idx !== -1) {
      result[i].status = 'present';
      remaining[idx] = null;
    }
  }
  
  return result;
}

// Validate a guess
export function validateGuess(guess, previousGuesses) {
  if (!guess || guess.length !== WORD_LENGTH) {
    return { valid: false, message: `Enter a ${WORD_LENGTH}-letter word.` };
  }
  if (!VALID_WORDS.has(guess.toLowerCase())) {
    return { valid: false, message: "That's not in the word list." };
  }
  if (previousGuesses.includes(guess)) {
    return { valid: false, message: "You've already tried that." };
  }
  return { valid: true, message: '' };
}

// Calculate score for a level
export function calculateLevelScore(solved, attempts, timeRemaining, hintUsed) {
  if (!solved) return 0;
  const baseScore = 100;
  const attemptBonus = (MAX_GUESSES - attempts) * 15;
  const timeBonus = Math.floor(timeRemaining * 1.5);
  const hintPenalty = hintUsed ? 10 : 0;
  return Math.max(0, baseScore + attemptBonus + timeBonus - hintPenalty);
}

// Calculate total journey score
export function calculateTotalScore(levelResults) {
  return levelResults.reduce((sum, r) => sum + (r.score || 0), 0);
}

// Get keyboard letter states from all guesses
export function getKeyboardState(guesses) {
  const state = {};
  for (const guess of guesses) {
    for (const { letter, status } of guess) {
      const current = state[letter];
      if (current === 'correct') continue;
      if (status === 'correct' || (status === 'present' && current !== 'correct')) {
        state[letter] = status;
      } else if (!current) {
        state[letter] = status;
      }
    }
  }
  return state;
}
