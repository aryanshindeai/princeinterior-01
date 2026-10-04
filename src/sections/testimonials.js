/* ═══════════════════════════════════════════════════════════
   testimonials.js — Client Testimonials Section
   Placed directly below Process section
   ═══════════════════════════════════════════════════════════ */

const TESTIMONIALS = [
  {
    initials: 'AK',
    name: 'Aanya K.',
    city: 'Chandrapur',
    stars: '★★★★★',
    quote:
      'They transformed our residence with meticulous attention to detail. Every nuance, from the ambient lighting to the custom woodwork, feels utterly bespoke and deeply calming.',
    project: 'Residential Project',
  },
  {
    initials: 'RM',
    name: 'Rohan M.',
    city: 'Maharashtra',
    stars: '★★★★★',
    quote:
      'The architectural clarity and restraint they brought to our space was exceptional. It strikes the elusive balance between refined aesthetics and everyday functionality.',
    project: 'Residential Living',
  },
  {
    initials: 'PS',
    name: 'Priya S.',
    city: 'Chandrapur',
    stars: '★★★★★',
    quote:
      'From concept drawings to final handover, the execution was seamless. They created a serene sanctuary that our whole family cherishes every single day.',
    project: 'Home Interior',
  },
  {
    initials: 'VS',
    name: 'Vikram S.',
    city: 'Chandrapur',
    stars: '★★★★★',
    quote:
      'Our workspace design has elevated client impressions and team productivity immeasurably. Quality craftsmanship and thoughtful spatial planning throughout.',
    project: 'Commercial Space',
  },
  {
    initials: 'TD',
    name: 'Tarun D.',
    city: 'Maharashtra',
    stars: '★★★★★',
    quote:
      'A true masterclass in contemporary interior design. Every single material and fixture was chosen with intention, delivering an environment of rare distinction.',
    project: 'Bespoke Interior',
  },
];

export function init() {
  const section = document.getElementById('testimonials');
  if (!section) return;

  const cardsMarkup = TESTIMONIALS.map(
    (t) => `
    <article class="testimonial-card">
      <div class="testimonial-card__header">
        <div class="testimonial-card__avatar">${t.initials}</div>
        <div class="testimonial-card__meta">
          <span class="testimonial-card__name">${t.name}</span>
          <span class="testimonial-card__city">${t.city}</span>
        </div>
      </div>
      <div class="testimonial-card__stars" aria-label="5 stars rating">${t.stars}</div>
      <blockquote class="testimonial-card__quote">"${t.quote}"</blockquote>
      <div class="testimonial-card__tag">${t.project}</div>
    </article>
  `
  ).join('');

  section.innerHTML = `
    <div class="testimonials__container">
      <header class="testimonials__header">
        <span class="testimonials__label">CLIENT SATISFACTION · 5.0 GOOGLE RATING</span>
        <h2 class="testimonials__heading">WHAT OUR CLIENTS SAY</h2>
      </header>

      <div class="testimonials__carousel-wrap">
        <div class="testimonials__track" id="testimonials-track" aria-label="Client Testimonials Carousel">
          ${cardsMarkup}
        </div>
      </div>

      <p class="testimonials__disclaimer">
        All reviews are unpaid and shared with permission
      </p>
    </div>
  `;

  // ── Drag-to-Scroll Functionality ──
  const track = document.getElementById('testimonials-track');
  if (!track) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let hasDragged = false;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    hasDragged = false;
    track.classList.add('is-dragging');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove('is-dragging');
  });

  track.addEventListener('mouseleave', () => {
    if (!isDown) return;
    isDown = false;
    track.classList.remove('is-dragging');
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.35;
    if (Math.abs(walk) > 4) {
      hasDragged = true;
    }
    track.scrollLeft = scrollLeft - walk;
  });
}
