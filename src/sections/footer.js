/* ═══════════════════════════════════════════════════════════
   footer.js — Site Footer
   Placed at the very bottom of the page
   ═══════════════════════════════════════════════════════════ */

export function init() {
  const section = document.getElementById('footer');
  if (!section) return;

  const keywords = [
    'Interior Design',
    'Space Planning',
    'Interior Designer',
    'Commercial Design',
    'Home Styling',
    '3D Visualization',
    'Chandrapur',
    'Maharashtra',
  ];

  // Build the repeated keyword content for seamless CSS marquee
  const keywordString = keywords.map(item => `<span class="footer__keyword-item">${item}</span><span class="footer__keyword-dot">·</span>`).join(' ');
  const marqueeContent = `
    <div class="footer__marquee-group">
      ${keywordString}
    </div>
    <div class="footer__marquee-group" aria-hidden="true">
      ${keywordString}
    </div>
  `;

  section.innerHTML = `
    <div class="footer__wrapper">
      <!-- Top Section -->
      <div class="footer__top">
        <div class="footer__top-inner">
          
          <!-- Brand / Tagline Column -->
          <div class="footer__brand">
            <h3 class="footer__logo">PRINCE interiors &amp; exteriors</h3>
            <p class="footer__tagline">Interior designer in Chandrapur, Maharashtra</p>
            <p class="footer__address" style="margin-top: 12px; font-size: 13px; color: var(--muted); line-height: 1.5;">
              3rd Floor, Raghuwanshi Complex,<br>
              Near Azad Garden, Bazar Ward,<br>
              Chandrapur, Maharashtra 442402<br>
              <span style="display:inline-block; margin-top:4px; color:var(--gold);">Plus Code: X72W+7F Chandrapur</span>
            </p>
          </div>

          <!-- Three Link Columns -->
          <div class="footer__columns">
            <!-- Column 1: Studio -->
            <div class="footer__col">
              <h4 class="footer__col-heading">Studio</h4>
              <ul class="footer__col-links">
                <li><a href="#hero" class="footer__link">About</a></li>
                <li><a href="#portfolio" class="footer__link">Selected Work</a></li>
                <li><a href="#process" class="footer__link">Process</a></li>
                <li><a href="#testimonials" class="footer__link">Testimonials</a></li>
                <li><a href="#cta" class="footer__link">Consultation</a></li>
              </ul>
            </div>

            <!-- Column 2: Services -->
            <div class="footer__col">
              <h4 class="footer__col-heading">Services</h4>
              <ul class="footer__col-links">
                <li><a href="#services" class="footer__link">Residential Design</a></li>
                <li><a href="#services" class="footer__link">Commercial Spaces</a></li>
                <li><a href="#services" class="footer__link">Renovation</a></li>
                <li><a href="#services" class="footer__link">Styling &amp; Staging</a></li>
                <li><a href="#cta" class="footer__link">Consultation</a></li>
              </ul>
            </div>

            <!-- Column 3: Connect -->
            <div class="footer__col">
              <h4 class="footer__col-heading">Connect</h4>
              <ul class="footer__col-links">
                <li><a href="tel:08624912744" class="footer__link">Call: 086249 12744</a></li>
                <li><a href="https://maps.google.com/?q=PRINCE+interiors+%26+exteriors+Chandrapur" target="_blank" rel="noopener noreferrer" class="footer__link">Google Maps Location</a></li>
                <li><a href="#cta" class="footer__link">Book Consultation</a></li>
                <li><a href="#instagram" class="footer__link">Photos &amp; Gallery</a></li>
                <li><span class="footer__link" style="color:rgba(255,255,255,0.45); cursor:default;">Hours: Opens 10:30 am</span></li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <!-- Scrolling Keyword Strip -->
      <div class="footer__keywords">
        <div class="footer__keywords-track">
          ${marqueeContent}
        </div>
      </div>

      <!-- Bottom Copyright Bar -->
      <div class="footer__bottom">
        <div class="footer__bottom-inner">
          <div class="footer__copyright">
            &copy; 2025 PRINCE interiors &amp; exteriors. All rights reserved.
          </div>
          <div class="footer__legal">
            <a href="#privacy" class="footer__legal-link">Privacy Policy</a>
            <span class="footer__legal-sep">/</span>
            <a href="#terms" class="footer__legal-link">Terms</a>
            <span class="footer__legal-sep">/</span>
            <a href="#sitemap" class="footer__legal-link">Sitemap</a>
          </div>
        </div>
      </div>
    </div>
  `;
}
