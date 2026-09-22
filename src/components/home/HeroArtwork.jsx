import React from 'react';

export default function HeroArtwork() {
  return (
    <section className="hero-artwork" aria-label="Contemplative knowledge garden visual">
      <div className="hero-artwork__container">
        <img 
          src="/hero-garden.jpg" 
          alt="Serene surreal garden with classical stone columns, morning sunlight, wildflowers, and subtle glowing typographic letters floating in the air"
          className="hero-artwork__img"
          loading="eager"
        />
        <div className="hero-artwork__overlay" aria-hidden="true"></div>
      </div>
    </section>
  );
}
