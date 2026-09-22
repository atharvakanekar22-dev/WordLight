import React from 'react';

export default function Footer({ onStartGame }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="home-footer" role="contentinfo">
      <div className="home-footer__content">
        <div className="home-footer__brand">
          <span className="home-footer__logo">
            <span className="home-footer__spark" aria-hidden="true">✦</span> wordlight
          </span>
          <span className="home-footer__tagline">Four words. 60 seconds each. A brighter mind.</span>
        </div>

        <div className="home-footer__actions">
          <button 
            type="button" 
            className="home-footer__action-link"
            onClick={scrollToTop}
          >
            Back to Top ↑
          </button>
          <button 
            type="button" 
            className="btn btn--primary home-footer__play-btn"
            onClick={onStartGame}
          >
            PLAY NOW
          </button>
        </div>
      </div>

      <div className="home-footer__bottom">
        <p className="home-footer__copy">
          © {new Date().getFullYear()} WordLight. A mindful cognitive word ritual.
        </p>
        <span className="home-footer__built-with">
          No sign-up · Zero tracking · Pure focus
        </span>
      </div>
    </footer>
  );
}
