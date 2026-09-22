import React from 'react';
import { useGame, LEVEL_STATUS } from '../game/GameContext';
import { TOTAL_LEVELS } from '../data/words';
import Timer from './Timer';

export default function GameHeader({ currentLevel }) {
  const { playerName, levels } = useGame();
  const activeLevelData = levels && levels[currentLevel] ? levels[currentLevel] : null;

  return (
    <header className="game-header" role="banner">
      <div className="game-header__brand">
        <span className="game-header__spark" aria-hidden="true">✦</span>
        <span className="game-header__logo">WORDLIGHT</span>
      </div>

      <div className="game-header__center">
        <span className="game-header__journey-label">TODAY'S JOURNEY</span>
        <span className="game-header__level">Level {currentLevel + 1} / {TOTAL_LEVELS}</span>
      </div>

      <div className="player-status" aria-label={`Player: ${playerName || 'Player'}, Time remaining`}>
        <div className="player-status__identity">
          <span className="player-status__avatar" aria-hidden="true">
            {playerName ? playerName.charAt(0).toUpperCase() : '✦'}
          </span>
          <span className="player-status__name">{playerName || 'Player'}</span>
        </div>
        <div className="player-status__divider" aria-hidden="true">•</div>
        {activeLevelData && (
          <Timer 
            timeRemaining={activeLevelData.timeRemaining} 
            isActive={activeLevelData.status === LEVEL_STATUS.ACTIVE} 
          />
        )}
      </div>
    </header>
  );
}
