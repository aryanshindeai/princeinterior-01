/* ═══════════════════════════════════════════════════════════
   process.js — The Process Section (4 Steps)
   Placed directly below Portfolio section
   ═══════════════════════════════════════════════════════════ */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const STEPS = [
  {
    num: '01',
    title: 'Discovery & Brief',
    description:
      'Understanding your vision, lifestyle needs, and functional goals for the space.',
  },
  {
    num: '02',
    title: 'Concept Design',
    description:
      'Developing mood boards, spatial plans, and bespoke architectural design concepts.',
  },
  {
    num: '03',
    title: 'Material Sourcing',
    description:
      'Curating handpicked finishes, textiles, lighting fixtures, and custom elements.',
  },
  {
    num: '04',
    title: 'Final Delivery',
    description:
      'Precision on-site execution, meticulous styling, and seamless project unveiling.',
  },
];

export function init() {
  const section = document.getElementById('process');
  if (!section) return;

  const stepsMarkup = STEPS.map(
    (step) => `
    <div class="process__step">
      <div class="process__circle">
        <span class="process__num">${step.num}</span>
      </div>
      <h3 class="process__title">${step.title}</h3>
      <p class="process__desc">${step.description}</p>
    </div>
  `
  ).join('');

  section.innerHTML = `
    <div class="process__container">
      <header class="process__header">
        <span class="process__label">HOW WE WORK</span>
        <h2 class="process__heading">THE PROCESS</h2>
      </header>

      <div class="process__track">
        ${stepsMarkup}
      </div>
    </div>
  `;

  // ── GSAP Staggered ScrollTrigger Animation ──
  const steps = section.querySelectorAll('.process__step');
  if (steps.length > 0) {
    gsap.fromTo(
      steps,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      }
    );
  }
}
