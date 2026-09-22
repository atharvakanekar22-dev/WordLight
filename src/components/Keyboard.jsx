import React from 'react';

const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'],
];

export default function Keyboard({ onKeyPress, letterStates }) {
  const handleClick = (key) => {
    onKeyPress(key);
  };

  return (
    <div className="keyboard" role="group" aria-label="Keyboard">
      {ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard__row">
          {row.map((key) => {
            const isWide = key === 'ENTER' || key === 'BACK';
            // Assuming letterStates is keyed by lowercase letters or exact matches
            const status = letterStates && (letterStates[key.toLowerCase()] || letterStates[key]);
            const statusClass = status ? `keyboard__key--${status}` : '';
            const wideClass = isWide ? 'keyboard__key--wide' : '';
            
            const displayKey = key === 'BACK' ? '⌫' : key;
            const ariaLabel = key === 'BACK' ? 'Backspace' : key === 'ENTER' ? 'Enter' : key;

            return (
              <button
                key={key}
                type="button"
                className={`keyboard__key ${statusClass} ${wideClass}`}
                onClick={() => handleClick(key)}
                aria-label={ariaLabel}
              >
                {displayKey}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
