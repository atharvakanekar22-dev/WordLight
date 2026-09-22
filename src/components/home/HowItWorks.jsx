import React from 'react';

export default function HowItWorks({ onStartGame }) {
  const steps = [
    {
      step: '01',
      title: 'GUESS',
      tag: 'Letter Feedback',
      body: 'Submit a 5-letter word to test the hidden target. Letters illuminate green when exact, bright yellow when misplaced, and neutral gray when absent.'
    },
    {
      step: '02',
      title: 'THINK',
      tag: 'Strategic Deduction',
      body: 'Work within your 60-second timer and 6 allocated attempts. If a word eludes you, an optional thoughtful hint gently illuminates the meaning.'
    },
    {
      step: '03',
      title: 'REVEAL',
      tag: 'The Final Gift',
      body: 'All four levels progress in one smooth flow. Complete the journey to unlock an inspiring gift and your session breakdown.'
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works" aria-labelledby="how-it-works-title">
      <div className="how-it-works__header">
        <h2 id="how-it-works-title" className="how-it-works__title">
          How the journey works.
        </h2>
        <p className="how-it-works__subtitle">
          Four sequential words. 60 seconds each. One continuous mindful flow.
        </p>
      </div>

      <div className="how-it-works__grid">
        {steps.map((item, index) => (
          <article key={index} className="how-step">
            <div className="how-step__top">
              <span className="how-step__num" aria-hidden="true">{item.step}</span>
              <span className="how-step__tag">{item.tag}</span>
            </div>
            <h3 className="how-step__title">{item.title}</h3>
            <p className="how-step__body">{item.body}</p>
          </article>
        ))}
      </div>

      <div className="how-it-works__cta-wrap">
        <button 
          type="button" 
          className="btn btn--secondary how-it-works__cta"
          onClick={onStartGame}
        >
          START YOUR FIRST WORD →
        </button>
      </div>
    </section>
  );
}
