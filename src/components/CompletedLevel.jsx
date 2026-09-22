import { LEVEL_STATUS } from '../game/GameContext';

export default function CompletedLevel({ level }) {
  const isCompleted = level.status === LEVEL_STATUS.COMPLETED;
  const levelNumber = String(level.id).padStart(2, '0');

  return (
    <div className={`level-card level-card--completed ${isCompleted ? 'level-card--success' : 'level-card--failed'}`}>
      <div className="level-card__header">
        <span className="level-card__title">LEVEL {levelNumber}</span>
        <span className={`level-card__status ${isCompleted ? 'status-success' : 'status-failed'}`}>
          {isCompleted ? '✓ COMPLETED' : '✕ MISSED'}
        </span>
      </div>
      <div className="level-card__body">
        <div className="level-card__word">
          {level.word.split('').map((char, index) => (
            <span key={index} className="word-char word-char--revealed">
              {char}
            </span>
          ))}
        </div>
        <div className="level-card__stats">
          {isCompleted ? (
            <>
              <span className="stat-item">Time: {level.solveTime}s</span>
              <span className="stat-item">Attempts: {level.attempts}</span>
            </>
          ) : (
            <span className="stat-item stat-item--missed">Missed Word</span>
          )}
        </div>
      </div>
    </div>
  );
}
