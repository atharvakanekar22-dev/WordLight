const STORAGE_KEY = 'wordlight_game';
const STATS_KEY = 'wordlight_stats';
const PLAYER_NAME_KEY = 'wordlight_player_name';

export function savePlayerName(name) {
  try {
    if (name && name.trim()) {
      localStorage.setItem(PLAYER_NAME_KEY, name.trim());
    }
  } catch (e) {
    console.warn('Failed to save player name:', e);
  }
}

export function loadPlayerName() {
  try {
    return localStorage.getItem(PLAYER_NAME_KEY) || '';
  } catch (e) {
    console.warn('Failed to load player name:', e);
    return '';
  }
}

export function saveGameState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...state,
      savedAt: Date.now()
    }));
  } catch (e) {
    console.warn('Failed to save game state:', e);
  }
}

export function loadGameState() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    const state = JSON.parse(data);
    // Check if saved game is from today
    const savedDate = new Date(state.savedAt);
    const today = new Date();
    if (savedDate.toDateString() !== today.toDateString()) {
      clearGameState();
      return null;
    }
    return state;
  } catch (e) {
    console.warn('Failed to load game state:', e);
    return null;
  }
}

export function clearGameState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear game state:', e);
  }
}

export function saveStats(stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch (e) {
    console.warn('Failed to save stats:', e);
  }
}

export function loadStats() {
  try {
    const data = localStorage.getItem(STATS_KEY);
    return data ? JSON.parse(data) : getDefaultStats();
  } catch {
    return getDefaultStats();
  }
}

function getDefaultStats() {
  return {
    gamesPlayed: 0,
    gamesCompleted: 0,
    totalWordsSolved: 0,
    bestScore: 0,
    bestTime: null,
    currentStreak: 0,
    maxStreak: 0,
    lastPlayedDate: null
  };
}

export function updateStats(gameResult) {
  const stats = loadStats();
  stats.gamesPlayed++;
  
  const today = new Date();
  const dateKey = (date) => [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-');
  const todayKey = dateKey(today);
  
  if (gameResult.allCompleted) {
    stats.gamesCompleted++;
  }
  
  stats.totalWordsSolved += gameResult.wordsSolved;
  
  if (gameResult.totalScore > stats.bestScore) {
    stats.bestScore = gameResult.totalScore;
  }
  
  if (gameResult.totalTime && (!stats.bestTime || gameResult.totalTime < stats.bestTime)) {
    stats.bestTime = gameResult.totalTime;
  }
  
  const storedDate = stats.lastPlayedDate;
  const parsedLastDate = storedDate ? new Date(storedDate) : null;
  const lastPlayedKey = typeof storedDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(storedDate)
    ? storedDate
    : parsedLastDate && !Number.isNaN(parsedLastDate.getTime())
      ? dateKey(parsedLastDate)
      : null;

  if (!lastPlayedKey) {
    stats.currentStreak = 1;
  } else if (lastPlayedKey !== todayKey) {
    const [year, month, day] = todayKey.split('-').map(Number);
    const [lastYear, lastMonth, lastDay] = lastPlayedKey.split('-').map(Number);
    const todayOrdinal = Date.UTC(year, month - 1, day);
    const lastOrdinal = Date.UTC(lastYear, lastMonth - 1, lastDay);
    const dayDifference = (todayOrdinal - lastOrdinal) / (24 * 60 * 60 * 1000);
    stats.currentStreak = dayDifference === 1 ? stats.currentStreak + 1 : 1;
  }
  
  stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
  stats.lastPlayedDate = todayKey;
  
  saveStats(stats);
  return stats;
}
