import React from 'react';
import { useGame } from '../game/GameContext';

export default function HintBox({ level }) {
  const { revealHint } = useGame();

  if (!level) return null;

  const { hint, hintRevealed } = level;

  if (!hintRevealed) {
    return (
      <div className="hint-box hint-box--muted">
        <p className="hint-box__text">Need a little help?</p>
        <button 
          className="hint-box__button" 
          onClick={revealHint}
          type="button"
        >
          Reveal Hint
        </button>
      </div>
    );
  }

  return (
    <div className="hint-box hint-box--revealed">
      <div className="hint-box__header">
        <span>💡 A LITTLE HELP</span>
        <span className="hint-box__note">Hint used · -10 points</span>
      </div>
      <p className="hint-box__content">{hint}</p>
    </div>
  );
}
