/* ═══════════════════════════════════════════════════════════
   portfolio.js — Selected Works Horizontal Scroll Gallery
   Placed directly below Section 03 (Interior Tour)
   ═══════════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    title: 'CONTEMPORARY RESIDENCE',
    category: 'RESIDENTIAL',
    image: '/portfolio/project-1.jpg',
  },
  {
    title: 'LUXURY LIVING & DINING',
    category: 'RESIDENTIAL',
    image: '/portfolio/luxury-living-dining.jpg',
  },
  {
    title: 'MASTER BEDROOM SUITE',
    category: 'RESIDENTIAL',
    image: '/portfolio/master-bedroom.jpg',
  },
  {
    title: 'MODERN KITCHEN DESIGN',
    category: 'RESIDENTIAL',
    image: '/portfolio/modern-kitchen.jpg',
  },
  {
    title: 'BESPOKE LIVING ROOM',
    category: 'RESIDENTIAL',
    image: '/portfolio/project-5.jpg',
  },
  {
    title: 'CONTEMPORARY OFFICE',
    category: 'COMMERCIAL',
    image: '/portfolio/project-6.jpg',
  },
];

export function init() {
  const section = document.getElementById('portfolio');
  if (!section) return;

  const cardsMarkup = PROJECTS.map((p) => `
    <article class="portfolio__card">
      <div class="portfolio__image-wrap">
        <img
          src="${p.image}"
          alt="${p.title}"
          class="portfolio__img"
          loading="lazy"
        />
        <div class="portfolio__hover-overlay">
          <span class="portfolio__hover-text">View Project →</span>
        </div>
      </div>
      <div class="portfolio__info">
        <span class="portfolio__category">${p.category}</span>
        <h3 class="portfolio__name">${p.title}</h3>
      </div>
    </article>
  `).join('');

  section.innerHTML = `
    <div class="portfolio__container">
      <header class="portfolio__header">
        <span class="portfolio__label">OUR WORK</span>
        <h2 class="portfolio__title">SELECTED PROJECTS</h2>
        <p class="portfolio__subtext">
          A collection of spaces we've had the privilege to design
        </p>
      </header>

      <div class="portfolio__gallery" id="portfolio-gallery" aria-label="Selected Projects Gallery">
        ${cardsMarkup}
      </div>
    </div>
  `;

  // ── Drag-to-Scroll Functionality ──
  const gallery = document.getElementById('portfolio-gallery');
  if (!gallery) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let hasDragged = false;

  gallery.addEventListener('mousedown', (e) => {
    isDown = true;
    hasDragged = false;
    gallery.classList.add('is-dragging');
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    gallery.classList.remove('is-dragging');
  });

  gallery.addEventListener('mouseleave', () => {
    if (!isDown) return;
    isDown = false;
    gallery.classList.remove('is-dragging');
  });

  gallery.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 1.35;
    if (Math.abs(walk) > 4) {
      hasDragged = true;
    }
    gallery.scrollLeft = scrollLeft - walk;
  });

  // Suppress click on drag
  gallery.querySelectorAll('.portfolio__card').forEach((card) => {
    card.addEventListener('click', (e) => {
      if (hasDragged) {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  });
}
