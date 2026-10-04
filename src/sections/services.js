/* ═══════════════════════════════════════════════════════════
   services.js — 4-Card Grid
   ═══════════════════════════════════════════════════════════ */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const SERVICES = [
  {
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="6" y="14" width="36" height="24" rx="2"/><path d="M6 22h36"/><circle cx="24" cy="30" r="3"/></svg>`,
    title: 'Residential Design',
    text: 'Holistic home interiors that balance beauty, comfort, and function for everyday living.',
  },
  {
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="8" y="8" width="32" height="32" rx="2"/><path d="M8 18h32M18 18v22"/></svg>`,
    title: 'Commercial Spaces',
    text: 'Hospitality, retail, and workspace environments designed to inspire and perform.',
  },
  {
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 38V20l12-10 12 10v18H12z"/><rect x="19" y="26" width="10" height="12"/></svg>`,
    title: 'Renovation',
    text: 'Thoughtful transformations that honour a home\'s character while modernising every detail.',
  },
  {
    icon: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="24" cy="24" r="16"/><path d="M24 14v10l7 7"/></svg>`,
    title: 'Styling & Staging',
    text: 'Curated styling and staging that present properties at their aspirational best.',
  },
];

export function init() {
  const section = document.getElementById('services');
  if (!section) return;

  const cards = SERVICES.map((s) => `
    <div class="service-card reveal">
      <div class="service-card__icon">${s.icon}</div>
      <h4 class="service-card__title">${s.title}</h4>
      <p class="service-card__text">${s.text}</p>
    </div>
  `).join('');

  section.innerHTML = `
    <div class="section-padding">
      <div class="container">
        <div class="section-header reveal">
          <p class="section__label">What We Do</p>
          <h2 class="section__title">Our Services</h2>
        </div>
        <div class="services__grid">${cards}</div>
      </div>
    </div>
  `;

  // ── Staggered reveal ──
  section.querySelectorAll('.reveal').forEach((el, i) => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power2.out',
        });
      },
    });
    // Set initial state
    gsap.set(el, { opacity: 0, y: 40 });
  });
}
