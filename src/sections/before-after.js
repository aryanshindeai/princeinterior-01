/* ═══════════════════════════════════════════════════════════
   before-after.js — Drag Reveal Slider
   ═══════════════════════════════════════════════════════════ */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function init() {
  const section = document.getElementById('before-after');
  if (!section) return;

  section.innerHTML = `
    <div class="section-padding">
      <div class="container">
        <div class="section-header reveal">
          <p class="section__label">Transformations</p>
          <h2 class="section__title">Before &amp; After</h2>
          <p class="section__subtitle" style="margin:0 auto">
            Drag the slider to reveal the transformation.
          </p>
        </div>

        <div class="ba__wrapper reveal">
          <div class="ba__container" id="ba-container">
            <!-- Before image (underneath on left) -->
            <img class="ba__image ba__image--before"
                 src="/images/before-after/before.jpg"
                 alt="Before - Interior space prior to renovation" />

            <!-- After image (clipped to reveal on right) -->
            <img class="ba__image ba__image--after" id="ba-after"
                 src="/images/before-after/after.png"
                 alt="After - Completed luxury living room interior" />

            <!-- Slider line + handle -->
            <div class="ba__slider" id="ba-slider">
              <div class="ba__handle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="15 18 9 12 15 6"/>
                  <polyline points="9 18 15 12 9 6" transform="translate(6,0)"/>
                </svg>
              </div>
            </div>

            <span class="ba__label ba__label--before">Before</span>
            <span class="ba__label ba__label--after">After</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // ── Drag logic ──
  const container = document.getElementById('ba-container');
  const slider    = document.getElementById('ba-slider');
  const afterImg  = document.getElementById('ba-after');
  let isDragging  = false;

  function setPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let pct    = ((clientX - rect.left) / rect.width) * 100;
    pct        = Math.max(0, Math.min(100, pct));
    slider.style.left       = `${pct}%`;
    afterImg.style.clipPath = `inset(0 0 0 ${pct}%)`;
  }

  container.addEventListener('mousedown',  () => { isDragging = true; });
  container.addEventListener('touchstart', () => { isDragging = true; }, { passive: true });

  window.addEventListener('mouseup',  () => { isDragging = false; });
  window.addEventListener('touchend', () => { isDragging = false; });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) setPosition(e.clientX);
  });
  window.addEventListener('touchmove', (e) => {
    if (isDragging) setPosition(e.touches[0].clientX);
  }, { passive: true });

  // ── Reveal on scroll ──
  section.querySelectorAll('.reveal').forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => el.classList.add('visible'),
    });
  });
}
