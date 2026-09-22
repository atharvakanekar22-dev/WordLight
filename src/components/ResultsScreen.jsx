import { useGame } from '../game/GameContext';
import { TOTAL_LEVELS } from '../data/words';
import { useState } from 'react';

export default function ResultsScreen() {
  const { levels, totalScore, startTime, endTime, resetGame, playerName } = useGame();
  const [shareStatus, setShareStatus] = useState('');
  
  // Calculate stats from levels array
  const wordsSolved = levels.filter(l => l.solved).length;
  const totalAttempts = levels.reduce((sum, l) => sum + (l.attempts || 0), 0);
  const hintsUsed = levels.filter(l => l.hintUsed).length;
  const totalTimeSeconds = endTime && startTime ? Math.floor((endTime - startTime) / 1000) : 0;
  const totalMinutes = Math.floor(totalTimeSeconds / 60);
  const totalSeconds = totalTimeSeconds % 60;
  const totalTimeStr = `${totalMinutes}:${String(totalSeconds).padStart(2, '0')}`;
  
  const handleShare = async () => {
    const blocks = Array(TOTAL_LEVELS).fill('░');
    levels.forEach((l, i) => {
      if (l.solved) blocks[i] = '█';
    });
    const blockStr = blocks.join('');
    
    const textToShare = `WORDLIGHT ✦
${playerName ? `${playerName}'s Journey` : "Today's Journey"}
${blockStr} ${wordsSolved}/${TOTAL_LEVELS}
Words: ${wordsSolved}/${TOTAL_LEVELS} · Hints: ${hintsUsed}
Time: ${totalTimeStr}
"Four words. One brighter mind."`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'WordLight',
          text: textToShare,
        });
        setShareStatus('Shared!');
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyToClipboard(textToShare);
        }
      }
    } else {
      copyToClipboard(textToShare);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShareStatus('Copied to clipboard!');
      setTimeout(() => setShareStatus(''), 3000);
    });
  };

  return (
    <div className="results-screen fade-in">
      <div className="results-container">
        <h1 className="results-header">JOURNEY COMPLETE</h1>
        {playerName && (
          <p className="results-player-greeting">
            Well played, <strong>{playerName}</strong>.
          </p>
        )}
        
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Levels Completed</span>
            <span className="stat-value">{wordsSolved} / {TOTAL_LEVELS}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Words Solved</span>
            <span className="stat-value">{wordsSolved} / {TOTAL_LEVELS}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Attempts</span>
            <span className="stat-value">{totalAttempts}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Hints Used</span>
            <span className="stat-value">{hintsUsed}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Time</span>
            <span className="stat-value">{totalTimeStr}</span>
          </div>
          <div className="stat-card stat-card--highlight">
            <span className="stat-label">Journey Score</span>
            <span className="stat-value">{totalScore || 0}</span>
          </div>
        </div>
        
        <div className="results-actions">
          <button className="btn btn--primary" onClick={resetGame}>PLAY AGAIN</button>
          <button className="btn btn--secondary" onClick={handleShare}>SHARE RESULT</button>
          {shareStatus && <p className="share-status">{shareStatus}</p>}
        </div>
      </div>
    </div>
  );
}
