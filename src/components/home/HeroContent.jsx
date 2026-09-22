import React from 'react';

export default function HeroContent({ onStartGame }) {
  return (
    <section className="hero-content" aria-labelledby="hero-headline">
      <div className="hero-content__left">
        <h1 id="hero-headline" className="hero-content__headline">
          Six words.<br />
          A moment to think.
        </h1>
        
        <div className="hero-content__cta-block">
          <button 
            type="button"
            className="hero-cta-button"
            onClick={onStartGame}
            aria-label="Begin Journey — Start WordLight"
          >
            <span>BEGIN JOURNEY</span>
            <span className="hero-cta-button__arrow" aria-hidden="true">→</span>
          </button>
          
          <div className="hero-content__meta">
            <p className="hero-content__specs-caption">
              4 levels · 6 attempts · 60 seconds
            </p>
            <p className="hero-content__reward-note">
              Complete the journey to unlock your gift.
            </p>
          </div>
        </div>
      </div>

      <div className="hero-content__right">
        <div className="hero-content__prose">
          <p className="hero-content__lead">
            Wordlight is a quiet four-stage word journey designed to give your mind a focused, rewarding pause.
          </p>
          <p className="hero-content__secondary">
            Deduce five-letter words with clear letter feedback, maintain your rhythm under a gentle countdown, and reveal a thoughtful reflection at the end.
          </p>
        </div>

        <div className="hero-content__badges" aria-label="Key Game Attributes">
          <div className="hero-badge">
            <span className="hero-badge__dot" aria-hidden="true"></span>
            <span>Progressive Deduction</span>
          </div>
          <div className="hero-badge">
            <span className="hero-badge__dot" aria-hidden="true"></span>
            <span>Gentle 60s Focus</span>
          </div>
          <div className="hero-badge">
            <span className="hero-badge__dot" aria-hidden="true"></span>
            <span>Inspiring Final Gift</span>
          </div>
        </div>
      </div>
    </section>
  );
}
