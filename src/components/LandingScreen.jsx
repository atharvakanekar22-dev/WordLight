import React, { useState } from 'react';
import { useGame } from '../game/GameContext';
import Navbar from './home/Navbar';
import HeroArtwork from './home/HeroArtwork';
import HeroContent from './home/HeroContent';
import RitualStrip from './home/RitualStrip';
import HowItWorks from './home/HowItWorks';
import AboutModal from './home/AboutModal';
import NameModal from './home/NameModal';
import Footer from './home/Footer';

export default function LandingScreen() {
  const { startGame, playerName, isNameModalOpen, closeNameModal, openNameModal } = useGame();
  const [isExiting, setIsExiting] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleStartGame = () => {
    if (!playerName) {
      openNameModal();
      return;
    }
    if (isExiting) return;
    setIsExiting(true);
    // Smooth transition into game
    setTimeout(() => {
      startGame();
    }, 280);
  };

  return (
    <div className={`home-page-wrapper ${isExiting ? 'home-page-wrapper--exiting' : ''}`}>
      <main className="home-container" role="main">
        {/* Floating Rounded Dark Pill Navbar */}
        <Navbar 
          onStartGame={handleStartGame} 
          onOpenAbout={() => setIsAboutOpen(true)} 
        />

        {/* Hero Visual Centerpiece */}
        <HeroArtwork />

        {/* Editorial Two-Column Hero Content */}
        <HeroContent onStartGame={handleStartGame} />

        {/* Mental Ritual / Product Specification Strip */}
        <RitualStrip />

        {/* How It Works (Typographic 3 Steps) */}
        <HowItWorks onStartGame={handleStartGame} />

        {/* Minimal Editorial Footer */}
        <Footer onStartGame={handleStartGame} />
      </main>

      {/* About WordLight Modal */}
      <AboutModal 
        isOpen={isAboutOpen} 
        onClose={() => setIsAboutOpen(false)} 
      />

      {/* Player Name Onboarding / Edit Modal */}
      <NameModal 
        isOpen={isNameModalOpen} 
        onClose={closeNameModal} 
      />
    </div>
  );
}
