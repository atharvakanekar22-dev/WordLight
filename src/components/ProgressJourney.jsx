import React from 'react';
import { LEVEL_STATUS } from '../game/GameContext';

export default function ProgressJourney({ levels, currentLevel }) {
  if (!levels || levels.length === 0) return null;

  return (
    <div className="progress-journey">
      <div className="progress-journey__track">
        {levels.map((level, index) => {
          let nodeClass = 'progress-journey__node';
          if (level.status === LEVEL_STATUS.COMPLETED) {
            nodeClass += ' progress-journey__node--completed';
          } else if (level.status === LEVEL_STATUS.FAILED) {
            nodeClass += ' progress-journey__node--failed';
          } else if (index === currentLevel) {
            nodeClass += ' progress-journey__node--active';
          } else {
            nodeClass += ' progress-journey__node--locked';
          }

          let lineClass = 'progress-journey__line';
          if (index < currentLevel || (index === currentLevel && level.status === LEVEL_STATUS.COMPLETED)) {
             lineClass += ' progress-journey__line--completed';
          }
          
          return (
            <React.Fragment key={index}>
              <div className={nodeClass} aria-label={`Level ${index + 1}`}>
                {level.status === LEVEL_STATUS.COMPLETED && <span className="node-icon">✓</span>}
                {level.status === LEVEL_STATUS.FAILED && <span className="node-icon">✕</span>}
              </div>
              {index < levels.length - 1 && (
                <div className={lineClass}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="progress-journey__label">
        {Math.min(currentLevel + 1, levels.length)} / {levels.length}
      </div>
    </div>
  );
}
