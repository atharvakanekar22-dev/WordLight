import React from 'react';

export default function Timer({ timeRemaining, isActive }) {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const display = `${minutes}:${String(seconds).padStart(2, '0')}`;
  
  let urgencyClass = '';
  if (timeRemaining <= 10) urgencyClass = 'timer--critical';
  else if (timeRemaining <= 20) urgencyClass = 'timer--warning';
  
  return (
    <div className={`timer ${urgencyClass} ${!isActive ? 'timer--paused' : ''}`} role="timer" aria-live="polite" aria-label={`${timeRemaining} seconds remaining`}>
      <span className="timer__icon" aria-hidden="true">⏱</span>
      <span className="timer__display">{display}</span>
    </div>
  );
}
