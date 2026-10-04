/* ═══════════════════════════════════════════════════════════
   instagram.js — Instagram-Style Photo Grid Section
   Placed directly below Marquee section
   ═══════════════════════════════════════════════════════════ */

const TILES = [
  { name: 'Living Room Space', bg: "url('/client-photos/photo-1.jpg') center/cover no-repeat" },
  { name: 'Master Bedroom Suite', bg: "url('/portfolio/master-bedroom.jpg') center/cover no-repeat" },
  { name: 'Modern Kitchen Island', bg: "url('/portfolio/modern-kitchen.jpg') center/cover no-repeat" },
  { name: 'Bespoke Lounge', bg: "url('/portfolio/project-5.jpg') center/cover no-repeat" },
  { name: 'Executive Office', bg: "url('/portfolio/project-6.jpg') center/cover no-repeat" },
  { name: 'Luxury Living & Dining', bg: "url('/portfolio/luxury-living-dining.jpg') center/cover no-repeat" },
];

export function init() {
  const section = document.getElementById('instagram');
  if (!section) return;

  const tilesMarkup = TILES.map(
    (tile) => `
    <a href="#" class="instagram__tile" aria-label="View photo (${tile.name})">
      <div class="instagram__bg" style="background: ${tile.bg};"></div>
      <div class="instagram__overlay">
        <svg class="instagram__icon" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </div>
    </a>
  `
  ).join('');

  section.innerHTML = `
    <div class="instagram__container">
      <header class="instagram__header">
        <h2 class="instagram__title">FOLLOW OUR JOURNEY</h2>
        <a href="#instagram" class="instagram__handle">PRINCE interiors &amp; exteriors</a>
      </header>

      <div class="instagram__grid">
        ${tilesMarkup}
      </div>

      <div class="instagram__footer">
        <a href="#" class="instagram__cta">
          View All on Instagram <span class="instagram__cta-arrow">→</span>
        </a>
      </div>
    </div>
  `;
}
