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
  
  const today = new Date().toDateString();
  
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
  
  // Streak logic
  if (stats.lastPlayedDate) {
    const lastDate = new Date(stats.lastPlayedDate);
    const diffDays = Math.floor((new Date(today) - lastDate) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      stats.currentStreak++;
    } else if (diffDays > 1) {
      stats.currentStreak = 1;
    }
  } else {
    stats.currentStreak = 1;
  }
  
  stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
  stats.lastPlayedDate = today;
  
  saveStats(stats);
  return stats;
}
