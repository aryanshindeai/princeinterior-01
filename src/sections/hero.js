/* ═══════════════════════════════════════════════════════════
   hero.js — Hero Section (Full-Viewport Canvas Scrub Animation)
   Completely independent Hero frame sequence & canvas state.
   Never shares or reuses frames/URLs with Kitchen section.
   ═══════════════════════════════════════════════════════════ */

import { initCanvasScrub } from '../utils/canvasScrub.js';

/**
 * Dedicated HERO configuration
 * Frame source:
 * https://res.cloudinary.com/f9ounojg/image/upload/v1791137824/frame_000001.jpg
 * https://res.cloudinary.com/f9ounojg/image/upload/v1791138212/frame_000300.jpg
 */
export const HERO_CONFIG = {
  frameSource: 'https://res.cloudinary.com/f9ounojg/image/upload/v1791137824/frame_000001.jpg https://res.cloudinary.com/f9ounojg/image/upload/v1791138212/frame_000300.jpg',
  canvasId: 'hero-canvas',
  totalFrames: 300,
  pinDistance: '+=1800px', // 300 frames × 6px = 1800px
  textRevealAt: 0.85,
  getFrameUrl(frameIndex) {
    const frameNumber = frameIndex + 1; // 1-based index (1 to 300)
    const padded = String(frameNumber).padStart(6, '0');
    // Frame 300 has version v1791138212; frames 1-299 have v1791137824
    if (frameNumber === 300) {
      return `https://res.cloudinary.com/f9ounojg/image/upload/v1791138212/frame_${padded}.jpg`;
    }
    return `https://res.cloudinary.com/f9ounojg/image/upload/v1791137824/frame_${padded}.jpg`;
  },
};

export function init() {
  const section = document.getElementById('hero');
  if (!section) return Promise.resolve();

  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const initialFrameUrl = HERO_CONFIG.getFrameUrl(0);

  // ── Inject Hero-exclusive markup ──
  section.innerHTML = `
    <!-- Mobile Fallback Video (<768px only) -->
    <video
      class="hero__video"
      id="hero-video"
      src="/video1.mp4"
      poster="${initialFrameUrl}"
      autoplay
      muted
      loop
      playsinline
      webkit-playsinline
      preload="auto"
      aria-hidden="true"
    ></video>

    <!-- Immediate Starting Frame Poster -->
    <img
      class="hero__poster"
      id="hero-poster"
      src="${initialFrameUrl}"
      alt="Hero Starting Frame"
      loading="eager"
    />

    <!-- Dedicated Full-Bleed Desktop Scrub Canvas -->
    <canvas id="${HERO_CONFIG.canvasId}" class="hero__canvas"></canvas>

    <!-- Minimal Warm Gold Loading Indicator (bottom-center) -->
    <div class="hero__loader" id="hero-loader" aria-label="Loading hero animation">
      <div class="hero__loader-bar">
        <div class="hero__loader-fill" id="hero-loader-fill"></div>
      </div>
    </div>

    <!-- Fixed / Pinned Overlay Text -->
    <div class="hero__content" id="hero-content">
      <span class="hero__label">INTERIOR DESIGNER</span>
      <h1 class="hero__title">SPACES THAT TELL YOUR STORY</h1>
      <p class="hero__subtext">Crafting interiors that feel like home</p>
      <a href="#portfolio" class="hero__cta" id="hero-cta-btn">
        View Our Work <span class="hero__cta-arrow">→</span>
      </a>

      <!-- Subtle Scroll Indicator below text -->
      <div class="hero__scroll-indicator" id="hero-scroll-indicator">
        <span class="hero__scroll-label">Scroll to explore</span>
        <svg class="hero__scroll-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M12 4v14M5 11l7 7 7-7" />
        </svg>
      </div>
    </div>
  `;

  const heroContent = document.getElementById('hero-content');
  const heroLoader = document.getElementById('hero-loader');
  const loaderFill = document.getElementById('hero-loader-fill');
  const scrollIndicator = document.getElementById('hero-scroll-indicator');
  const ctaBtn = document.getElementById('hero-cta-btn');

  // Smooth scroll for CTA button to #portfolio
  ctaBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const portfolio = document.getElementById('portfolio');
    if (portfolio) {
      portfolio.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Hide scroll indicator as soon as user begins scrolling
  function handleScrollDisappearance() {
    if (scrollIndicator) {
      scrollIndicator.classList.add('hidden');
    }
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 15) {
      handleScrollDisappearance();
    }
  }, { passive: true });

  section.addEventListener('scrollStarted', handleScrollDisappearance);

  // ── Handle Mobile Behavior (<768px) ──
  if (isMobile) {
    heroLoader?.classList.add('hidden');
    heroContent?.classList.add('revealed', 'static');
    return Promise.resolve();
  }

  // ── Handle Desktop Canvas Scrub (≥768px) ──
  section.addEventListener('revealText', () => {
    heroContent?.classList.add('revealed');
  });

  section.addEventListener('hideText', () => {
    heroContent?.classList.remove('revealed');
  });

  return new Promise((resolve) => {
    initCanvasScrub({
      canvasId: HERO_CONFIG.canvasId,
      totalFrames: HERO_CONFIG.totalFrames,
      getFrameUrl: HERO_CONFIG.getFrameUrl,
      pinDistance: HERO_CONFIG.pinDistance,
      textRevealAt: HERO_CONFIG.textRevealAt,
      lazy: false, // Hero is above the fold, load immediately
      onFirstFrame() {
        if (heroLoader) {
          heroLoader.classList.add('hidden');
          setTimeout(() => heroLoader.remove(), 600);
        }
        const heroPoster = document.getElementById('hero-poster');
        if (heroPoster) {
          heroPoster.classList.add('hidden');
          setTimeout(() => heroPoster.remove(), 600);
        }
        resolve();
      },
      onProgress(ratio) {
        if (loaderFill) {
          loaderFill.style.width = `${Math.round(ratio * 100)}%`;
        }
      },
    });
  });
}
