import React from 'react';

export default function HeroArtwork() {
  return (
    <section className="hero-artwork" aria-label="Abstract cognitive network visual">
      <div className="hero-artwork__container">
        <img 
          src="/hero-mind.svg"
          alt="Abstract network of connected nodes representing focus and mental agility"
          className="hero-artwork__img"
          loading="eager"
        />
        <div className="hero-artwork__overlay" aria-hidden="true"></div>
      </div>
    </section>
  );
}
