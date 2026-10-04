/* ═══════════════════════════════════════════════════════════
   canvasScrub.js
   Generic, isolated canvas scroll-scrub engine.
   Each section creates its own instance with its own:
   - frame URL generator / source configuration
   - frame cache array & loading queue
   - canvas element & 2D rendering context
   - current frame index & render state
   - ScrollTrigger instance & scroll progress handler
   - cleanup method
   ═══════════════════════════════════════════════════════════ */

import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Creates and initialises an independent canvas scroll-scrub controller.
 *
 * @param {Object}   opts
 * @param {string}   opts.canvasId       - Dedicated <canvas> element ID
 * @param {number}   opts.totalFrames    - Total frames count (e.g. 300)
 * @param {Function} opts.getFrameUrl    - (frameIndex: number) => string — Section-specific URL resolver
 * @param {string}   [opts.pinDistance]  - ScrollTrigger pin end distance (default: '+=1800px')
 * @param {number}   [opts.textRevealAt] - Scroll progress (0–1) at which to emit 'revealText'
 * @param {boolean}  [opts.lazy]         - If true, defers preloading until section approaches viewport
 * @param {Function} [opts.onFirstFrame] - Callback when initial frame is loaded and drawn
 * @param {Function} [opts.onProgress]   - Callback with preload ratio (0–1)
 *
 * @returns {Object} scrub controller with destroy() method
 */
export function initCanvasScrub({
  canvasId,
  totalFrames,
  getFrameUrl,
  pinDistance = '+=1620px',
  textRevealAt = 0.85,
  lazy = false,
  onFirstFrame,
  onProgress,
}) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) {
    console.warn(`[canvasScrub] canvas#${canvasId} not found`);
    return null;
  }

  const section = canvas.closest('section') || canvas.parentElement;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // ── Instance-specific state (never shared between sections) ──
  let currentDrawnImage = null;
  let isTextRevealed = false;
  let scrollTriggerInstance = null;
  let isDestroyed = false;
  let isQueueStarted = false;
  let renderRafId = null;

  // Dedicated frame cache array for this section only
  const frames = new Array(totalFrames);
  let loadedCount = 0;
  let firstFrameReady = false;
  let currentTargetIndex = 0;

  // ── Responsive canvas sizing & object-fit-cover math ──
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (currentDrawnImage) {
      renderFrame(currentDrawnImage);
    }
  }

  resize();
  window.addEventListener('resize', resize);

  /**
   * Draws an image with object-fit-cover mathematics inside requestAnimationFrame.
   */
  function renderFrame(img) {
    if (!img || !img.naturalWidth || !img.naturalHeight || isDestroyed) return;
    currentDrawnImage = img;

    if (renderRafId) {
      cancelAnimationFrame(renderRafId);
    }

    renderRafId = requestAnimationFrame(() => {
      if (isDestroyed || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const x = (canvas.width - img.naturalWidth * scale) / 2;
      const y = (canvas.height - img.naturalHeight * scale) / 2;

      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    });
  }

  // ── Frame Loading Queue ──
  const CONCURRENCY = 6;
  let activeWorkers = 0;
  let nextQueueIndex = 1;

  function loadSingleFrame(idx) {
    if (frames[idx]) return frames[idx];

    const img = new Image();
    img.src = getFrameUrl(idx);
    img.onload = () => {
      loadedCount++;
      if (onProgress) onProgress(loadedCount / totalFrames);
      if (idx === currentTargetIndex) {
        renderFrame(img);
      }
      runPreloadQueue();
    };
    img.onerror = () => {
      // Mark as accounted for on error so preload doesn't stall
      loadedCount++;
      runPreloadQueue();
    };
    frames[idx] = img;
    return img;
  }

  function runPreloadQueue() {
    if (isDestroyed || !isQueueStarted) return;
    while (activeWorkers < CONCURRENCY && nextQueueIndex < totalFrames) {
      const idx = nextQueueIndex++;
      activeWorkers++;
      const img = loadSingleFrame(idx);
      const originalOnload = img.onload;
      const originalOnerror = img.onerror;

      img.onload = () => {
        activeWorkers--;
        if (originalOnload) originalOnload();
      };
      img.onerror = () => {
        activeWorkers--;
        if (originalOnerror) originalOnerror();
      };
    }
  }

  function startPreloading() {
    if (isQueueStarted || isDestroyed) return;
    isQueueStarted = true;
    runPreloadQueue();
  }

  function triggerFirstFrame(firstImg) {
    if (firstFrameReady || isDestroyed) return;
    firstFrameReady = true;

    renderFrame(firstImg);

    if (typeof onFirstFrame === 'function') {
      onFirstFrame();
    }
    section.dispatchEvent(new CustomEvent('firstFrameLoaded'));

    setupScrollTrigger();

    if (!lazy) {
      startPreloading();
    }
  }

  // Priority load frame 0
  const firstImg = new Image();
  firstImg.src = getFrameUrl(0);
  frames[0] = firstImg;

  firstImg.onload = () => {
    loadedCount++;
    if (onProgress) onProgress(loadedCount / totalFrames);
    triggerFirstFrame(firstImg);
  };
  firstImg.onerror = () => {
    setTimeout(() => {
      if (isDestroyed) return;
      const retryImg = new Image();
      retryImg.src = getFrameUrl(0);
      retryImg.onload = () => {
        frames[0] = retryImg;
        triggerFirstFrame(retryImg);
      };
      retryImg.onerror = () => {
        triggerFirstFrame(firstImg);
      };
    }, 300);
  };

  // If lazy, observe when section approaches the viewport to start downloading remaining frames
  if (lazy) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startPreloading();
            observer.disconnect();
          }
        });
      },
      { rootMargin: '400px 0px' }
    );
    observer.observe(section);
  }

  // ── GSAP ScrollTrigger Setup ──
  function setupScrollTrigger() {
    if (scrollTriggerInstance || isDestroyed) return;

    scrollTriggerInstance = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: pinDistance,
      pin: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate(self) {
        // Clamp frameIndex between 0 and totalFrames - 1
        const rawIndex = Math.floor(self.progress * (totalFrames - 1));
        const frameIndex = Math.min(Math.max(rawIndex, 0), totalFrames - 1);
        currentTargetIndex = frameIndex;

        // Ensure target frame is actively requested
        const candidate = frames[frameIndex] || loadSingleFrame(frameIndex);
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          renderFrame(candidate);
        } else if (currentDrawnImage) {
          renderFrame(currentDrawnImage);
        }

        // Emit revealText event when scroll progress reaches textRevealAt
        if (self.progress >= textRevealAt) {
          if (!isTextRevealed) {
            isTextRevealed = true;
            section.dispatchEvent(new CustomEvent('revealText'));
          }
        } else {
          if (isTextRevealed) {
            isTextRevealed = false;
            section.dispatchEvent(new CustomEvent('hideText'));
          }
        }

        if (self.progress > 0.01) {
          section.dispatchEvent(new CustomEvent('scrollStarted'));
        }
      },
    });
  }

  return {
    destroy() {
      isDestroyed = true;
      window.removeEventListener('resize', resize);
      if (renderRafId) {
        cancelAnimationFrame(renderRafId);
      }
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill(true);
        scrollTriggerInstance = null;
      }
      // Release image references
      for (let i = 0; i < frames.length; i++) {
        frames[i] = null;
      }
      currentDrawnImage = null;
    },
  };
}
