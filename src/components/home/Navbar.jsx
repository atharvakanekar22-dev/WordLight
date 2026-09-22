import React, { useState } from 'react';
import { useGame } from '../../game/GameContext';

export default function Navbar({ onStartGame, onOpenAbout }) {
  const { playerName, openNameModal } = useGame();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="navbar-wrapper" role="banner">
      <nav className="floating-navbar" aria-label="Main Navigation">
        {/* Brand */}
        <div className="navbar__brand">
          <span className="navbar__spark" aria-hidden="true">✦</span>
          <span className="navbar__logo-text">wordlight</span>
        </div>

        {/* Center Links (Desktop) */}
        <div className="navbar__links" role="navigation">
          <button 
            type="button"
            className="navbar__link" 
            onClick={() => scrollToSection('how-it-works')}
          >
            How It Works
          </button>
          <button 
            type="button"
            className="navbar__link" 
            onClick={() => scrollToSection('ritual-strip')}
          >
            Ritual
          </button>
          <button 
            type="button" 
            className="navbar__link"
            onClick={onOpenAbout}
          >
            About
          </button>
        </div>

        {/* Right Actions */}
        <div className="navbar__actions">
          {playerName && (
            <button 
              type="button"
              className="navbar__player-badge"
              onClick={openNameModal}
              title="Click to edit name"
              aria-label={`Player: ${playerName}. Click to change name.`}
            >
              <span className="navbar__player-initial">{playerName.charAt(0).toUpperCase()}</span>
              <span className="navbar__player-name">{playerName}</span>
            </button>
          )}

          <button 
            type="button"
            className="navbar__cta-btn" 
            onClick={onStartGame}
            aria-label="Play WordLight Now"
          >
            <span>PLAY NOW</span>
            <span className="navbar__cta-arrow" aria-hidden="true">→</span>
          </button>
          
          {/* Mobile menu toggle */}
          <button 
            type="button"
            className="navbar__mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
          >
            <span className="navbar__toggle-icon" aria-hidden="true">
              {mobileMenuOpen ? '✕' : '☰'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="navbar__mobile-menu animate-fade-in" role="dialog" aria-modal="true">
          {playerName && (
            <div className="navbar__mobile-player">
              <span className="navbar__player-initial">{playerName.charAt(0).toUpperCase()}</span>
              <span className="navbar__mobile-player-name">{playerName}</span>
              <button 
                type="button" 
                className="navbar__mobile-edit-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  openNameModal();
                }}
              >
                Change
              </button>
            </div>
          )}
          <button 
            type="button"
            className="navbar__mobile-link" 
            onClick={() => scrollToSection('how-it-works')}
          >
            How It Works
          </button>
          <button 
            type="button"
            className="navbar__mobile-link" 
            onClick={() => scrollToSection('ritual-strip')}
          >
            Ritual
          </button>
          <button 
            type="button" 
            className="navbar__mobile-link"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAbout();
            }}
          >
            About
          </button>
          <button 
            type="button"
            className="btn btn--primary navbar__mobile-cta" 
            onClick={() => {
              setMobileMenuOpen(false);
              onStartGame();
            }}
          >
            BEGIN JOURNEY
          </button>
        </div>
      )}
    </header>
  );
}
