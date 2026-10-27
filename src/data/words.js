const WORD_BANK = [
  { word: 'GLOBE', category: 'Exploration', hint: 'A round model of the earth that helps you understand the world.' },
  { word: 'ORBIT', category: 'Science', hint: 'The curved path of an object moving around a planet or star.' },
  { word: 'LOGIC', category: 'Strategy', hint: 'Clear, structured thinking used to solve a problem.' },
  { word: 'CHORD', category: 'Music', hint: 'Several musical notes played together in harmony.' },
  { word: 'TEMPO', category: 'Music', hint: 'The speed at which a piece of music is performed.' },
  { word: 'FLORA', category: 'Nature', hint: 'The plants and plant life found in a particular place.' },
  { word: 'CEDAR', category: 'Nature', hint: 'An evergreen tree known for its fragrant wood.' },
  { word: 'TERRA', category: 'Geography', hint: 'A poetic name for the earth or land.' },
  { word: 'NOVEL', category: 'Literature', hint: 'A long fictional story told in written form.' },
  { word: 'VERSE', category: 'Literature', hint: 'A line or group of lines in a poem or song.' },
  { word: 'PIXEL', category: 'Technology', hint: 'The smallest addressable point in a digital image.' },
  { word: 'ROBOT', category: 'Technology', hint: 'A machine designed to carry out tasks automatically.' },
  { word: 'VIVID', category: 'Visual Arts', hint: 'Strikingly bright, clear, or full of life.' },
  { word: 'PAINT', category: 'Visual Arts', hint: 'To create an image by applying color to a surface.' },
  { word: 'UNITY', category: 'Design', hint: 'A sense of harmony created when parts work together.' },
  { word: 'MODEL', category: 'Design', hint: 'A simplified representation used to understand or create something.' },
  { word: 'PRISM', category: 'Physics', hint: 'A transparent object that separates light into colors.' },
  { word: 'QUARK', category: 'Physics', hint: 'A fundamental particle found inside protons and neutrons.' },
  { word: 'NERVE', category: 'Biology', hint: 'A fiber that carries signals between the body and the brain.' },
  { word: 'BRAIN', category: 'Biology', hint: 'The organ that processes information, memory, and thought.' },
];

export const WORD_LENGTH = 5;
export const MAX_GUESSES = 6;
export const TIMER_SECONDS = 60;
export const TOTAL_LEVELS = 4;

const LEVEL_PALETTES = [
  { name: 'mist', background: '#eef5f4', accent: '#2f7775' },
  { name: 'sand', background: '#f8f1e7', accent: '#9a6b35' },
  { name: 'lavender', background: '#f1eff8', accent: '#6e5a9a' },
  { name: 'sky', background: '#edf4fa', accent: '#3e6f98' },
];

const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);

export function createLevelSet() {
  const selected = shuffle(WORD_BANK).slice(0, TOTAL_LEVELS);
  return selected.map((entry, index) => ({
    ...entry,
    id: index + 1,
    difficulty: index + 1,
    microReward: index === TOTAL_LEVELS - 1 ? 'Journey complete.' : ['Good start.', 'You are warming up.', 'Sharp thinking.'][index],
    palette: LEVEL_PALETTES[index],
  }));
}

export const LEVELS = createLevelSet();

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
