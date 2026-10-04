/* ═══════════════════════════════════════════════════════════
   marquee.js — Scrolling Luxury Quote Marquee Strip
   ═══════════════════════════════════════════════════════════ */

const PHRASES = [
  'Great Design Changes How You Feel',
  'Every Room Has A Story',
  'Design With Intention',
  'Details Define Excellence',
  'Space Is Emotion',
];

export function init() {
  const section = document.getElementById('marquee');
  if (!section) return;

  const phraseSet = PHRASES.map(
    (phrase) => `
      <span class="marquee__phrase">${phrase}</span>
      <span class="marquee__diamond" aria-hidden="true">◆</span>
    `
  ).join('');

  section.innerHTML = `
    <div class="marquee__container" aria-label="Philosophy Quote Strip">
      <div class="marquee__track">
        <div class="marquee__group">
          ${phraseSet}
        </div>
        <div class="marquee__group" aria-hidden="true">
          ${phraseSet}
        </div>
      </div>
    </div>
  `;
}
