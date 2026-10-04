/* ═══════════════════════════════════════════════════════════
   trust-bar.js — Awards / Press Recognition Strip
   ═══════════════════════════════════════════════════════════ */

const PUBLICATIONS = [
  'ELLE DECOR',
  'ARCHITECTURAL DIGEST',
  'ID AWARDS 2024',
  'DESIGN WEEK',
  'DESIGNLINES',
  'BETTER HOMES',
  'FHM DESIGN',
  'DEZEEN',
  'WALLPAPER*',
];

export function init() {
  const section = document.getElementById('trust-bar');
  if (!section) return;

  const renderBadges = () =>
    PUBLICATIONS.map(
      (name) => `<span class="trust-bar__badge">${name}</span>`
    ).join('');

  section.innerHTML = `
    <div class="trust-bar__container">
      <p class="trust-bar__label">AS RECOGNISED BY</p>
      <div class="trust-bar__marquee" aria-label="Awards and press recognition">
        <div class="trust-bar__track">
          <div class="trust-bar__group">
            ${renderBadges()}
          </div>
          <div class="trust-bar__group" aria-hidden="true">
            ${renderBadges()}
          </div>
          <div class="trust-bar__group" aria-hidden="true">
            ${renderBadges()}
          </div>
          <div class="trust-bar__group" aria-hidden="true">
            ${renderBadges()}
          </div>
        </div>
      </div>
    </div>
  `;
}
