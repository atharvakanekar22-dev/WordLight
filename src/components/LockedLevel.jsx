export default function LockedLevel({ level }) {
  return (
    <div className="level-card level-card--locked" aria-hidden="true">
      <div className="level-card__locked-content">
        <span className="level-card__locked-icon" aria-label="Locked">🔒</span>
        <span className="level-card__locked-label">LEVEL {String(level.id).padStart(2, '0')}</span>
      </div>
    </div>
  );
}
