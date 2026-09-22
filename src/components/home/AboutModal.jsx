import React, { useEffect } from 'react';

export default function AboutModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="about-modal-overlay animate-fade-in" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <div 
        className="about-modal-content animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          type="button" 
          className="about-modal__close-btn"
          onClick={onClose}
          aria-label="Close about dialog"
        >
          ✕
        </button>

        <div className="about-modal__header">
          <span className="about-modal__spark" aria-hidden="true">✦</span>
          <h2 id="about-modal-title" className="about-modal__title">About WordLight</h2>
        </div>

        <div className="about-modal__body">
          <p className="about-modal__lead">
            Wordlight was conceived as an intentional antidote to cognitive overload.
          </p>
          <p>
            Unlike frantic puzzle games designed for dopamine loops and aggressive ad placements, Wordlight is a sanctuary of focus. Four progressive words, sixty seconds each, culminating in an uplifting reflection to carry with you into the day.
          </p>
          <p>
            No accounts required. Zero tracking. Completely client-side, quiet, and handcrafted for students, thinkers, writers, and anyone seeking a moment of intellectual clarity.
          </p>
        </div>

        <div className="about-modal__footer">
          <button 
            type="button" 
            className="btn btn--primary"
            onClick={onClose}
          >
            RETURN TO JOURNEY
          </button>
        </div>
      </div>
    </div>
  );
}
