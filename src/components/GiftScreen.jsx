import { useState, useEffect, useMemo } from 'react';
import { useGame } from '../game/GameContext';

export default function GiftScreen() {
  const { giftMessage, showResults, playerName } = useGame();
  const [phase, setPhase] = useState('intro'); // 'intro', 'reveal', 'opened'
  const [showTitle, setShowTitle] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showClosing, setShowClosing] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Staggered reveal sequence
    const t1 = setTimeout(() => setShowTitle(true), 500);
    const t2 = setTimeout(() => setShowCard(true), 1500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleOpen = () => {
    setPhase('opened');
    setTimeout(() => setShowMessage(true), 600);
    setTimeout(() => setShowClosing(true), 2000);
    setTimeout(() => setShowButton(true), 3000);
  };

  const sparklesData = useMemo(() => {
    return Array.from({ length: 10 }).map((_, i) => ({
      id: i + 1,
      left: `${(i * 10 + 5) % 100}%`,
      top: `${(i * 13 + 7) % 100}%`,
      delay: `${(i * 0.25) % 2}s`
    }));
  }, []);

  return (
    <div className="gift-screen">
      <div className="gift-screen__content">
        <h1 className={`gift-screen__title ${showTitle ? 'fade-in' : 'hidden'}`}>
          {playerName ? `YOU MADE IT, ${playerName.toUpperCase()}.` : 'YOU MADE IT.'}
        </h1>
        
        <div className={`gift-card ${showCard ? 'fade-in-up' : 'hidden'} ${phase === 'opened' ? 'gift-card--opened' : ''}`}>
          {phase !== 'opened' ? (
            <div className="gift-card__closed">
              <span className="gift-icon">🎁</span>
              <button 
                className="btn btn--primary btn--glow" 
                onClick={handleOpen}
                aria-label="Open your gift"
              >
                Open your gift
              </button>
            </div>
          ) : (
            <div className="gift-card__open">
              {showMessage && (
                <div className="gift-message fade-in">
                  <h2 className="gift-message__title">{giftMessage.title}</h2>
                  <p className="gift-message__body">{giftMessage.body}</p>
                </div>
              )}
              {showClosing && (
                <p className="gift-message__closing fade-in">
                  {giftMessage.closing || '✨ Keep going.'}
                </p>
              )}
              {showButton && (
                <button 
                  className="btn btn--secondary fade-in" 
                  onClick={showResults}
                  aria-label="View Results"
                >
                  VIEW RESULTS
                </button>
              )}
              
              {/* Sparkles */}
              <div className="sparkles">
                {sparklesData.map((s) => (
                  <div 
                    key={s.id} 
                    className={`sparkle sparkle-${s.id}`} 
                    style={{
                      left: s.left,
                      top: s.top,
                      animationDelay: s.delay
                    }}
                  >
                    ✨
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
