import { useEffect, useState, useCallback } from 'react';
import { useGame, LEVEL_STATUS } from '../game/GameContext';
import { WORD_LENGTH, MAX_GUESSES } from '../data/words';
import Timer from './Timer';
import GuessGrid from './GuessGrid';
import Keyboard from './Keyboard';
import HintBox from './HintBox';
import { getKeyboardState } from '../game/gameLogic';

export default function ActiveLevel({ level }) {
  const { updateGuess, submitGuess, nextLevel, errorMessage } = useGame();
  const [showResult, setShowResult] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  
  // Track if level just completed
  useEffect(() => {
    if (level.status === LEVEL_STATUS.COMPLETED || level.status === LEVEL_STATUS.FAILED) {
      setIsRevealing(true);
      // Wait for letter animation to complete
      const timer = setTimeout(() => {
        setIsRevealing(false);
        setShowResult(true);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [level.status]);
  
  // Physical keyboard handler
  useEffect(() => {
    if (showResult || isRevealing) return;
    if (level.status !== LEVEL_STATUS.ACTIVE) return;
    
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      
      if (e.key === 'Enter') {
        e.preventDefault();
        submitGuess();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        updateGuess(level.currentGuess.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key) && level.currentGuess.length < WORD_LENGTH) {
        e.preventDefault();
        updateGuess(level.currentGuess + e.key.toUpperCase());
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [level.currentGuess, level.status, showResult, isRevealing, submitGuess, updateGuess]);
  
  const handleKeyPress = useCallback((key) => {
    if (showResult || isRevealing) return;
    if (level.status !== LEVEL_STATUS.ACTIVE) return;
    
    if (key === 'ENTER') {
      submitGuess();
    } else if (key === 'BACK') {
      updateGuess(level.currentGuess.slice(0, -1));
    } else if (level.currentGuess.length < WORD_LENGTH) {
      updateGuess(level.currentGuess + key);
    }
  }, [level.currentGuess, level.status, showResult, isRevealing, submitGuess, updateGuess]);
  
  const keyboardState = getKeyboardState(level.evaluatedGuesses);
  const isSolved = level.status === LEVEL_STATUS.COMPLETED;
  
  return (
    <div className="level-card level-card--active animate-fade-in-up">
      <div className="level-card__header">
        <div className="level-card__number">
          <span className="level-card__label">LEVEL</span>
          <span className="level-card__num">{String(level.id).padStart(2, '0')}</span>
        </div>
        <Timer timeRemaining={level.timeRemaining} isActive={level.status === LEVEL_STATUS.ACTIVE} />
      </div>
      
      <div className="level-card__info">
        <span className="level-card__attempts">
          {level.attempts} / {MAX_GUESSES} attempts
        </span>
      </div>
      
      <GuessGrid
        guesses={level.evaluatedGuesses}
        currentGuess={level.currentGuess}
        maxGuesses={MAX_GUESSES}
        wordLength={WORD_LENGTH}
        isRevealing={isRevealing && level.evaluatedGuesses.length > 0}
        revealIndex={level.evaluatedGuesses.length - 1}
      />
      
      {errorMessage && <div className="error-toast animate-fade-in" role="alert">{errorMessage}</div>}
      
      {!showResult && (
        <>
          <Keyboard onKeyPress={handleKeyPress} letterStates={keyboardState} />
          <HintBox level={level} />
        </>
      )}
      
      {showResult && (
        <div className="level-result animate-fade-in-up">
          {isSolved ? (
            <>
              <div className="level-result__icon level-result__icon--success">✓</div>
              <h3 className="level-result__title">WORD FOUND</h3>
              <p className="level-result__micro-reward">{level.microReward}</p>
              <div className="level-result__stats">
                <div className="level-result__stat">
                  <span className="level-result__stat-label">Solved in</span>
                  <span className="level-result__stat-value">{level.solveTime}s</span>
                </div>
                <div className="level-result__stat">
                  <span className="level-result__stat-label">Attempts</span>
                  <span className="level-result__stat-value">{level.attempts} / {MAX_GUESSES}</span>
                </div>
                {level.hintUsed && (
                  <div className="level-result__stat">
                    <span className="level-result__stat-label">Hint</span>
                    <span className="level-result__stat-value">Used</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="level-result__icon level-result__icon--failed">✕</div>
              <h3 className="level-result__title">
                {level.timeRemaining === 0 ? "TIME'S UP" : "NO MORE ATTEMPTS"}
              </h3>
              <p className="level-result__word">
                The word was: <strong>{level.word.toUpperCase()}</strong>
              </p>
            </>
          )}
          <button className="btn-primary" onClick={nextLevel} aria-label="Continue to next level">
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
