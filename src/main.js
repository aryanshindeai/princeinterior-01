/* ═══════════════════════════════════════════════════════════
   main.js — Entry Point
   ═══════════════════════════════════════════════════════════ */

// ── Styles ──
import './styles/main.css';

// ── GSAP ──
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ── Section modules ──
import { init as initHero }          from './sections/hero.js';
import { init as initTrustBar }      from './sections/trust-bar.js';
import { init as initBeforeAfter }   from './sections/before-after.js';
import { init as initServices }      from './sections/services.js';
import { init as initInteriorTour }  from './sections/interior-tour.js';
import { init as initPortfolio }     from './sections/portfolio.js';
import { init as initProcess }       from './sections/process.js';
import { init as initTestimonials }  from './sections/testimonials.js';
import { init as initMarquee }       from './sections/marquee.js';
import { init as initInstagram }     from './sections/instagram.js';
import { init as initCta }           from './sections/cta.js';
import { init as initFooter }        from './sections/footer.js';


// ═══════════════════════════════════════════════════════════
//  Navigation — scroll-based background swap
// ═══════════════════════════════════════════════════════════

const nav       = document.getElementById('nav');
const hamburger = document.getElementById('nav-hamburger');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 80);
}, { passive: true });

hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinks?.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});


// ═══════════════════════════════════════════════════════════
//  Loading overlay
// ═══════════════════════════════════════════════════════════

const overlay  = document.getElementById('loading-overlay');
const barFill  = document.getElementById('loader-bar-fill');

/** Update the thin gold progress bar (0 → 1). */
function setLoaderProgress(ratio) {
  if (barFill) barFill.style.width = `${Math.min(ratio * 100, 100)}%`;
}

/** Hide overlay with a smooth fade-out. */
function hideLoader() {
  if (overlay) {
    overlay.classList.add('hidden');
    overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
  }
}

// Listen for hero preload progress (dispatched from hero.js via canvasScrub)
document.addEventListener('heroLoadProgress', (e) => {
  setLoaderProgress(e.detail.progress);
});


// ═══════════════════════════════════════════════════════════
//  Initialise all sections
// ═══════════════════════════════════════════════════════════

async function boot() {
  // Hero returns a promise (frame preload). Show loader until ready.
  const heroReady = initHero();

  // Kick off every other section in parallel — they don't depend on hero frames.
  initTrustBar();
  initBeforeAfter();
  initServices();
  initInteriorTour();
  initPortfolio();
  initProcess();
  initTestimonials();
  initMarquee();
  initInstagram();
  initCta();
  initFooter();

  // Once hero's first frame is drawable, hide the loader.
  await heroReady;
  hideLoader();

  // Refresh ScrollTrigger now that all DOM is injected
  ScrollTrigger.refresh();
}

boot();
