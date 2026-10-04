/* ═══════════════════════════════════════════════════════════
   cta.js — Book a Consultation CTA Section
   Placed directly above the Footer
   ═══════════════════════════════════════════════════════════ */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function init() {
  const section = document.getElementById('cta');
  if (!section) return;

  section.innerHTML = `
    <div class="cta__content">
      <span class="cta__label">GET STARTED</span>
      <h2 class="cta__heading">READY TO TRANSFORM YOUR SPACE?</h2>
      <p class="cta__subtext">
        Connect with PRINCE interiors &amp; exteriors for personalized space planning and interior design in Chandrapur.
      </p>
      <div class="cta__actions">
        <a href="tel:08624912744" class="cta__btn cta__btn--primary">
          Call 086249 12744
        </a>
        <a href="#portfolio" class="cta__btn cta__btn--secondary" id="cta-portfolio-btn">
          View Our Portfolio →
        </a>
      </div>
    </div>
  `;

  // Smooth scroll for secondary button to #portfolio
  const portfolioBtn = document.getElementById('cta-portfolio-btn');
  portfolioBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const portfolio = document.getElementById('portfolio');
    if (portfolio) {
      portfolio.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // ── GSAP ScrollTrigger Entrance Animation ──
  const content = section.querySelector('.cta__content');
  if (content) {
    gsap.fromTo(
      content,
      { opacity: 0, scale: 0.96 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          once: true,
        },
      }
    );
  }
}
