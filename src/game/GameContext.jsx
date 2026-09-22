import { createContext, useContext, useReducer, useCallback, useEffect, useRef, useState } from 'react';
import { LEVELS, TOTAL_LEVELS, MAX_GUESSES, TIMER_SECONDS, GIFT_MESSAGES } from '../data/words';
import { evaluateGuess, validateGuess, calculateLevelScore, calculateTotalScore } from './gameLogic';
import { saveGameState, loadGameState, clearGameState, updateStats, loadPlayerName, savePlayerName } from './storage';

const GameContext = createContext(null);

const GAME_PHASES = {
  LANDING: 'landing',
  PLAYING: 'playing',
  GIFT: 'gift',
  RESULTS: 'results',
};

const LEVEL_STATUS = {
  LOCKED: 'locked',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

function createInitialState() {
  return {
    phase: GAME_PHASES.LANDING,
    currentLevel: 0,
    levels: LEVELS.map((level, index) => ({
      ...level,
      status: index === 0 ? LEVEL_STATUS.LOCKED : LEVEL_STATUS.LOCKED,
      guesses: [],
      evaluatedGuesses: [],
      currentGuess: '',
      timeRemaining: TIMER_SECONDS,
      hintUsed: false,
      hintRevealed: false,
      solved: false,
      score: 0,
      solveTime: null,
      attempts: 0,
    })),
    totalScore: 0,
    startTime: null,
    endTime: null,
    errorMessage: '',
    giftMessage: null,
    showResumePrompt: false,
  };
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'START_GAME': {
      const newState = {
        ...state,
        phase: GAME_PHASES.PLAYING,
        currentLevel: 0,
        startTime: Date.now(),
        levels: state.levels.map((level, index) => ({
          ...level,
          status: index === 0 ? LEVEL_STATUS.ACTIVE : LEVEL_STATUS.LOCKED,
          timeRemaining: TIMER_SECONDS,
        })),
      };
      return newState;
    }

    case 'RESTORE_STATE': {
      return {
        ...action.payload,
        showResumePrompt: false,
      };
    }

    case 'SHOW_RESUME_PROMPT': {
      return {
        ...state,
        showResumePrompt: true,
      };
    }

    case 'UPDATE_CURRENT_GUESS': {
      const levels = [...state.levels];
      levels[state.currentLevel] = {
        ...levels[state.currentLevel],
        currentGuess: action.payload.toUpperCase(),
      };
      return { ...state, levels, errorMessage: '' };
    }

    case 'SUBMIT_GUESS': {
      const level = state.levels[state.currentLevel];
      const guess = level.currentGuess.toUpperCase();
      const target = level.word.toUpperCase();
      
      const validation = validateGuess(guess, level.guesses);
      if (!validation.valid) {
        return { ...state, errorMessage: validation.message };
      }

      const evaluation = evaluateGuess(guess, target);
      const solved = guess === target;
      const attempts = level.attempts + 1;
      const allUsed = attempts >= MAX_GUESSES;

      const levels = [...state.levels];
      levels[state.currentLevel] = {
        ...levels[state.currentLevel],
        guesses: [...level.guesses, guess],
        evaluatedGuesses: [...level.evaluatedGuesses, evaluation],
        currentGuess: '',
        solved,
        attempts,
        score: solved ? calculateLevelScore(true, attempts, level.timeRemaining, level.hintUsed) : 0,
        solveTime: solved ? TIMER_SECONDS - level.timeRemaining : null,
        status: solved ? LEVEL_STATUS.COMPLETED : allUsed ? LEVEL_STATUS.FAILED : LEVEL_STATUS.ACTIVE,
      };

      return {
        ...state,
        levels,
        errorMessage: '',
      };
    }

    case 'TICK_TIMER': {
      const levels = [...state.levels];
      const currentLevel = levels[state.currentLevel];
      if (currentLevel.status !== LEVEL_STATUS.ACTIVE) return state;
      
      const timeRemaining = Math.max(0, currentLevel.timeRemaining - 1);
      levels[state.currentLevel] = {
        ...currentLevel,
        timeRemaining,
        status: timeRemaining === 0 ? LEVEL_STATUS.FAILED : currentLevel.status,
      };
      return { ...state, levels };
    }

    case 'REVEAL_HINT': {
      const levels = [...state.levels];
      levels[state.currentLevel] = {
        ...levels[state.currentLevel],
        hintUsed: true,
        hintRevealed: true,
      };
      return { ...state, levels };
    }

    case 'NEXT_LEVEL': {
      const nextLevel = state.currentLevel + 1;
      
      if (nextLevel >= TOTAL_LEVELS) {
        const totalScore = calculateTotalScore(state.levels);
        const giftMessage = GIFT_MESSAGES[Math.floor(Math.random() * GIFT_MESSAGES.length)];
        return {
          ...state,
          phase: GAME_PHASES.GIFT,
          currentLevel: state.currentLevel,
          totalScore,
          endTime: Date.now(),
          giftMessage,
        };
      }

      const levels = [...state.levels];
      levels[nextLevel] = {
        ...levels[nextLevel],
        status: LEVEL_STATUS.ACTIVE,
        timeRemaining: TIMER_SECONDS,
      };

      return {
        ...state,
        currentLevel: nextLevel,
        levels,
      };
    }

    case 'SHOW_RESULTS': {
      return {
        ...state,
        phase: GAME_PHASES.RESULTS,
      };
    }

    case 'RESET_GAME': {
      clearGameState();
      return createInitialState();
    }

    case 'SET_ERROR': {
      return { ...state, errorMessage: action.payload };
    }

    case 'CLEAR_ERROR': {
      return { ...state, errorMessage: '' };
    }

    default:
      return state;
  }
}

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, null, createInitialState);
  const [playerName, setPlayerNameState] = useState(() => loadPlayerName());
  const [isNameModalOpen, setIsNameModalOpen] = useState(() => !loadPlayerName());
  const timerRef = useRef(null);
  const autoSaveRef = useRef(null);

  const saveName = useCallback((name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    savePlayerName(trimmed);
    setPlayerNameState(trimmed);
    setIsNameModalOpen(false);
  }, []);

  const openNameModal = useCallback(() => {
    setIsNameModalOpen(true);
  }, []);

  const closeNameModal = useCallback(() => {
    if (playerName) {
      setIsNameModalOpen(false);
    }
  }, [playerName]);

  const currentLevelStatus = state.levels[state.currentLevel]?.status;

  // Timer logic
  useEffect(() => {
    if (state.phase !== GAME_PHASES.PLAYING || currentLevelStatus !== LEVEL_STATUS.ACTIVE) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      dispatch({ type: 'TICK_TIMER' });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [state.phase, currentLevelStatus]);

  // Auto-save
  useEffect(() => {
    if (state.phase === GAME_PHASES.PLAYING) {
      clearTimeout(autoSaveRef.current);
      autoSaveRef.current = setTimeout(() => {
        saveGameState(state);
      }, 500);
    }
    return () => clearTimeout(autoSaveRef.current);
  }, [state]);

  // Check for saved game on mount
  useEffect(() => {
    const saved = loadGameState();
    if (saved && saved.phase === GAME_PHASES.PLAYING) {
      dispatch({ type: 'SHOW_RESUME_PROMPT' });
    }
  }, []);

  // Auto-clear error messages
  useEffect(() => {
    if (state.errorMessage) {
      const timer = setTimeout(() => {
        dispatch({ type: 'CLEAR_ERROR' });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.errorMessage]);

  const startGame = useCallback(() => {
    if (!playerName) {
      setIsNameModalOpen(true);
      return;
    }
    dispatch({ type: 'START_GAME' });
  }, [playerName]);

  const resumeGame = useCallback(() => {
    const saved = loadGameState();
    if (saved) {
      dispatch({ type: 'RESTORE_STATE', payload: saved });
    } else {
      if (!playerName) {
        setIsNameModalOpen(true);
        return;
      }
      dispatch({ type: 'START_GAME' });
    }
  }, [playerName]);

  const updateGuess = useCallback((value) => {
    dispatch({ type: 'UPDATE_CURRENT_GUESS', payload: value });
  }, []);

  const submitGuess = useCallback(() => {
    dispatch({ type: 'SUBMIT_GUESS' });
  }, []);

  const revealHint = useCallback(() => {
    dispatch({ type: 'REVEAL_HINT' });
  }, []);

  const nextLevel = useCallback(() => {
    dispatch({ type: 'NEXT_LEVEL' });
  }, []);

  const showResults = useCallback(() => {
    // Update stats before showing results
    const wordsSolved = state.levels.filter(l => l.solved).length;
    const totalTime = state.endTime ? Math.floor((state.endTime - state.startTime) / 1000) : 0;
    updateStats({
      allCompleted: wordsSolved === TOTAL_LEVELS,
      wordsSolved,
      totalScore: state.totalScore,
      totalTime,
    });
    dispatch({ type: 'SHOW_RESULTS' });
  }, [state]);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' });
  }, []);

  const value = {
    ...state,
    playerName,
    isNameModalOpen,
    saveName,
    openNameModal,
    closeNameModal,
    startGame,
    resumeGame,
    updateGuess,
    submitGuess,
    revealHint,
    nextLevel,
    showResults,
    resetGame,
    GAME_PHASES,
    LEVEL_STATUS,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

export { GAME_PHASES, LEVEL_STATUS };
