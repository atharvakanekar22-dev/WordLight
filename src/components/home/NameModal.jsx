import React, { useState, useEffect, useRef } from 'react';
import { useGame } from '../../game/GameContext';

export default function NameModal({ isOpen, onClose }) {
  const { playerName, saveName } = useGame();
  const [inputVal, setInputVal] = useState(playerName || '');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const [prevOpen, setPrevOpen] = useState(isOpen);
  if (isOpen !== prevOpen) {
    setPrevOpen(isOpen);
    if (isOpen) {
      setInputVal(playerName || '');
      setError('');
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const trimmed = inputVal.trim();
    if (!trimmed) {
      setError('Please enter your name.');
      if (inputRef.current) inputRef.current.focus();
      return;
    }
    if (trimmed.length > 20) {
      setError('Name must be 20 characters or fewer.');
      return;
    }
    saveName(trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && playerName) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="name-modal-overlay animate-fade-in" 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="name-modal-title"
      onKeyDown={handleKeyDown}
      onClick={playerName ? onClose : undefined}
    >
      <div 
        className="name-modal-card animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {playerName && (
          <button 
            type="button" 
            className="name-modal__close-btn"
            onClick={onClose}
            aria-label="Close name modal"
          >
            ✕
          </button>
        )}

        <div className="name-modal__brand">
          <span className="name-modal__spark" aria-hidden="true">✦</span>
          <span className="name-modal__brand-text">WORDLIGHT</span>
        </div>

        <div className="name-modal__header">
          <p className="name-modal__pretitle">Before we begin...</p>
          <h2 id="name-modal-title" className="name-modal__title">What should we call you?</h2>
        </div>

        <form onSubmit={handleSubmit} className="name-modal__form" noValidate>
          <div className="name-modal__field">
            <label htmlFor="player-name-input" className="sr-only">
              Your name
            </label>
            <input
              ref={inputRef}
              id="player-name-input"
              type="text"
              className={`name-modal__input ${error ? 'name-modal__input--error' : ''}`}
              placeholder="Your name"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                if (error) setError('');
              }}
              maxLength={20}
              autoComplete="nickname"
              spellCheck="false"
            />
            {error && (
              <p className="name-modal__error-msg" role="alert">
                {error}
              </p>
            )}
          </div>

          <button 
            type="submit" 
            className="name-modal__submit-btn"
            aria-label="Continue with name"
          >
            <span>LET'S PLAY</span>
            <span className="name-modal__submit-arrow" aria-hidden="true">→</span>
          </button>
        </form>
      </div>
    </div>
  );
}
