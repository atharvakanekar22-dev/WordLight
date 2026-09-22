import React from 'react';
import { useGame } from '../game/GameContext';

export default function ResumePrompt() {
  const { resumeGame, startGame } = useGame();

  return (
    <div className="resume-prompt">
      <div className="resume-prompt__content">
        <h2 className="resume-prompt__title">Resume your journey?</h2>
        <div className="resume-prompt__actions">
          <button className="btn btn--primary" onClick={resumeGame}>
            RESUME
          </button>
          <button className="btn btn--secondary" onClick={startGame}>
            START OVER
          </button>
        </div>
      </div>
    </div>
  );
}
