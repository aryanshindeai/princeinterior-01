/* ═══════════════════════════════════════════════════════════
   interior-tour.js — Section 03: Kitchen & Dining Orbit Reveal
   Completely independent Kitchen frame sequence & canvas state.
   Never shares or reuses frames/URLs with Hero section.
   ═══════════════════════════════════════════════════════════ */

import { initCanvasScrub } from '../utils/canvasScrub.js';

/**
 * Dedicated KITCHEN configuration
 * Frame source:
 * https://res.cloudinary.com/npbirexb/image/upload/v1791136777/frame_000001.jpg
 * https://res.cloudinary.com/npbirexb/image/upload/v1791137468/frame_000299.jpg
 */
export const KITCHEN_CONFIG = {
  frameSource: 'https://res.cloudinary.com/npbirexb/image/upload/v1791136777/frame_000001.jpg https://res.cloudinary.com/npbirexb/image/upload/v1791137468/frame_000299.jpg',
  canvasId: 'tour-canvas',
  totalFrames: 299,
  pinDistance: '+=1794px', // 299 frames × 6px = 1794px
  textRevealAt: 0.90,
  getFrameUrl(frameIndex) {
    const frameNumber = frameIndex + 1; // 1-based index (1 to 299)
    const padded = String(frameNumber).padStart(6, '0');
    // Frame 299 has version v1791137468; frames 1-298 have v1791136777
    if (frameNumber === 299) {
      return `https://res.cloudinary.com/npbirexb/image/upload/v1791137468/frame_${padded}.jpg`;
    }
    return `https://res.cloudinary.com/npbirexb/image/upload/v1791136777/frame_${padded}.jpg`;
  },
};

export function init() {
  const section = document.getElementById('interior-tour');
  if (!section) return Promise.resolve();

  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const initialFrameUrl = KITCHEN_CONFIG.getFrameUrl(0);

  // ── Inject Kitchen Section Exclusive Markup ──
  section.innerHTML = `
    <!-- Mobile Fallback Video (<768px only) -->
    <video
      class="tour__video"
      id="tour-video"
      src="/video2.mp4"
      poster="${initialFrameUrl}"
      autoplay
      muted
      loop
      playsinline
      webkit-playsinline
      preload="auto"
      aria-hidden="true"
    ></video>

    <!-- Dedicated Full-Bleed Desktop Scrub Canvas -->
    <canvas id="${KITCHEN_CONFIG.canvasId}" class="tour__canvas"></canvas>

    <!-- Canvas Dark Gradient Overlay for Left-Side Text Readability -->
    <div class="tour__gradient-overlay" aria-hidden="true"></div>

    <!-- Left-Side Fixed Text Overlay — Always Visible During Pin -->
    <div class="tour__content" id="tour-content">
      <span class="tour__label">INTERIOR SPACES</span>
      <h2 class="tour__title">WHERE FUNCTION MEETS BEAUTY</h2>
      <p class="tour__body">
        Every material, every detail chosen with intention. Spaces that inspire as much as they serve.
      </p>
      <a href="#portfolio" class="tour__cta" id="tour-cta">
        Explore Full Portfolio →
      </a>
    </div>
  `;

  const tourCta = document.getElementById('tour-cta');

  // Smooth scroll to #portfolio on CTA click
  tourCta?.addEventListener('click', (e) => {
    e.preventDefault();
    const portfolio = document.getElementById('portfolio');
    if (portfolio) {
      portfolio.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // ── Mobile Behavior (<768px) ──
  if (isMobile) {
    tourCta?.classList.add('revealed');
    return Promise.resolve();
  }

  // ── Desktop Canvas Scrub (≥768px) ──
  section.addEventListener('revealText', () => {
    tourCta?.classList.add('revealed');
  });

  section.addEventListener('hideText', () => {
    tourCta?.classList.remove('revealed');
  });

  // Init canvas scrub for Kitchen Section with independent KITCHEN_CONFIG
  return initCanvasScrub({
    canvasId: KITCHEN_CONFIG.canvasId,
    totalFrames: KITCHEN_CONFIG.totalFrames,
    getFrameUrl: KITCHEN_CONFIG.getFrameUrl,
    pinDistance: KITCHEN_CONFIG.pinDistance,
    textRevealAt: KITCHEN_CONFIG.textRevealAt,
    lazy: true, // Lazy load kitchen frames until approaching viewport
  });
}
