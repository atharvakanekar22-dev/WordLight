import { useEffect, useRef } from 'react';
import { useGame, LEVEL_STATUS } from '../game/GameContext';
import GameHeader from './GameHeader';
import ProgressJourney from './ProgressJourney';
import ActiveLevel from './ActiveLevel';
import CompletedLevel from './CompletedLevel';
import LockedLevel from './LockedLevel';

export default function GameScreen() {
  const { levels, currentLevel } = useGame();
  const activeLevelRef = useRef(null);
  
  useEffect(() => {
    if (activeLevelRef.current) {
      setTimeout(() => {
        activeLevelRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }, [currentLevel]);
  
  return (
    <div className="game-container">
      <GameHeader currentLevel={currentLevel} />
      <ProgressJourney levels={levels} currentLevel={currentLevel} />
      <div className="levels-container">
        {levels.map((level, index) => {
          // The current level index should always render as ActiveLevel
          // even if its status has changed to COMPLETED/FAILED (so user sees the result overlay)
          const isCurrent = index === currentLevel;
          const isCompleted = level.status === LEVEL_STATUS.COMPLETED;
          const isFailed = level.status === LEVEL_STATUS.FAILED;
          const isLocked = level.status === LEVEL_STATUS.LOCKED;
          
          if (isCurrent) {
            return (
              <div ref={activeLevelRef} key={level.id}>
                <ActiveLevel level={level} />
              </div>
            );
          }
          if (isCompleted || isFailed) {
            return <CompletedLevel key={level.id} level={level} />;
          }
          if (isLocked) {
            return <LockedLevel key={level.id} level={level} />;
          }
          return null;
        })}
      </div>
    </div>
  );
}
