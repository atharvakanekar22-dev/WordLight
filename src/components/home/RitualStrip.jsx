import React from 'react';

export default function RitualStrip() {
  const specs = [
    {
      num: '01',
      title: '4 LEVELS',
      desc: 'Progressive vocabulary calibrated for curiosity without frustration'
    },
    {
      num: '02',
      title: '6 ATTEMPTS',
      desc: 'Intuitive color-coded letter clues to guide your deductions'
    },
    {
      num: '03',
      title: '60 SECONDS',
      desc: 'A calm countdown per word to foster gentle focus'
    },
    {
      num: '04',
      title: '1 FINAL GIFT',
      desc: 'A sincere, uplifting reflection upon completing all four stages'
    }
  ];

  return (
    <section id="ritual-strip" className="ritual-strip" aria-labelledby="ritual-heading">
      <div className="ritual-strip__header">
        <h2 id="ritual-heading" className="ritual-strip__title">
          A QUICK MENTAL RITUAL
        </h2>
        <span className="ritual-strip__subtitle">
          Engineered for cognitive presence
        </span>
      </div>

      <div className="ritual-strip__grid">
        {specs.map((item, index) => (
          <div key={index} className="ritual-strip__item">
            <span className="ritual-strip__num" aria-hidden="true">{item.num}</span>
            <h3 className="ritual-strip__label">{item.title}</h3>
            <p className="ritual-strip__desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
