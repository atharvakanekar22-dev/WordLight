import React from 'react';

export default function GuessGrid({ guesses, currentGuess, maxGuesses, wordLength, isRevealing, revealIndex }) {
  const emptyRowsCount = Math.max(0, maxGuesses - guesses.length - (currentGuess !== undefined ? 1 : 0));
  
  return (
    <div className="guess-grid" role="grid" aria-label="Guesses">
      {guesses.map((guess, rowIndex) => (
        <div key={`guess-${rowIndex}`} className="guess-row" role="row">
          {guess.map((letterObj, colIndex) => {
            const isRevealingRow = isRevealing && rowIndex === revealIndex;
            const statusClass = `letter-cell--${letterObj.status}`;
            const revealingClass = isRevealingRow ? 'letter-cell--revealing' : '';
            const style = isRevealingRow ? { animationDelay: `${colIndex * 300}ms` } : {};
            
            return (
              <div 
                key={`cell-${rowIndex}-${colIndex}`} 
                className={`letter-cell ${statusClass} ${revealingClass}`} 
                style={style}
                role="gridcell" 
                aria-label={`${letterObj.letter}, ${letterObj.status}`}
              >
                {letterObj.letter}
              </div>
            );
          })}
        </div>
      ))}
      
      {guesses.length < maxGuesses && currentGuess !== undefined && (
        <div className="guess-row" role="row" aria-label="Current guess">
          {Array.from({ length: wordLength }).map((_, colIndex) => {
            const letter = currentGuess[colIndex] || '';
            const activeClass = letter ? 'letter-cell--active' : 'letter-cell--empty';
            return (
              <div 
                key={`current-${colIndex}`} 
                className={`letter-cell ${activeClass}`} 
                role="gridcell" 
                aria-label={letter ? `Letter ${letter}` : 'Empty'}
              >
                {letter}
              </div>
            );
          })}
        </div>
      )}
      
      {Array.from({ length: emptyRowsCount }).map((_, rowIndex) => (
        <div key={`empty-${rowIndex}`} className="guess-row" role="row">
          {Array.from({ length: wordLength }).map((_, colIndex) => (
            <div 
              key={`empty-cell-${rowIndex}-${colIndex}`} 
              className="letter-cell letter-cell--empty" 
              role="gridcell" 
              aria-label="Empty"
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}
