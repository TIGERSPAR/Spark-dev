/* ═══════════════════════════════════════════════
   SPARKLING DEV — Components (Navbar + Footer)
═══════════════════════════════════════════════ */

// Inject Navbar
const navHTML = `
<div class="cursor" id="cursor"></div>
<div class="cursor-ring" id="cursorRing"></div>

<nav id="navbar">
  <a href="../index.html" class="nav-logo">
    <div class="logo-mark"><span>S</span></div>
    <span class="logo-text">Sparkling<span>Dev</span></span>
  </a>
  <ul class="nav-links">
    <li><a href="../index.html">Home</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="services.html">Services</a></li>
    <li><a href="portfolio.html">Portfolio</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
  <a href="contact.html" class="nav-cta"><span>Hire Me</span></a>
  <div class="hamburger" id="hamburger">
    <span></span><span></span><span></span>
  </div>
</nav>

<div class="mobile-nav" id="mobileNav">
  <a href="../index.html">Home</a>
  <a href="about.html">About</a>
  <a href="services.html">Services</a>
  <a href="portfolio.html">Portfolio</a>
  <a href="contact.html">Contact</a>
</div>
`;

// Inject Footer
const footerHTML = `
<footer>
  <div class="footer-top">
    <div>
      <div class="footer-brand-name">Sparkling<span>Dev</span></div>
      <p class="footer-tagline">Crafting premium digital experiences that convert. Based in Buea, Cameroon — available worldwide, 24/7.</p>
      <div class="footer-contact-item">
        <svg viewBox="0 0 24 24" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/></svg>
        670 959 751
      </div>
      <div class="footer-contact-item">
        <svg viewBox="0 0 24 24" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        Buea, Cameroon
      </div>
    </div>
    <div>
      <div class="footer-col-title">Navigation</div>
      <ul class="footer-col-links">
        <li><a href="../index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="portfolio.html">Portfolio</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>
    <div>
      <div class="footer-col-title">Services</div>
      <ul class="footer-col-links">
        <li><a href="services.html">Website Building</a></li>
        <li><a href="services.html">E-Commerce</a></li>
        <li><a href="services.html">Flyer Design</a></li>
        <li><a href="services.html">Birthday Cards</a></li>
        <li><a href="services.html">Invitation Cards</a></li>
        <li><a href="services.html">Landing Pages</a></li>
      </ul>
    </div>
    <div>
      <div class="footer-col-title">Availability</div>
      <ul class="footer-col-links">
        <li><a href="contact.html">24 / 7 Open</a></li>
        <li><a href="contact.html">Fast Delivery</a></li>
        <li><a href="contact.html">Get a Quote</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span class="footer-copy">© 2025 SparklingDev · All rights reserved</span>
    <span class="footer-made">Made with <span>♦</span> in Buea, Cameroon</span>
  </div>
</footer>

<button id="backTop" style="
  position:fixed; bottom:30px; right:30px;
  width:44px; height:44px;
  background:linear-gradient(135deg,#8C6A1E,#D4AF6A);
  border:none; cursor:pointer; z-index:800;
  display:flex; align-items:center; justify-content:center;
  opacity:0; transition:opacity 0.3s; pointer-events:none;
">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#050508" stroke-width="2.5"><path d="M18 15l-6-6-6 6"/></svg>
</button>
`;

document.addEventListener('DOMContentLoaded', () => {
  // Insert navbar before body content
  const navContainer = document.getElementById('nav-inject');
  if (navContainer) navContainer.innerHTML = navHTML;

  const footerContainer = document.getElementById('footer-inject');
  if (footerContainer) footerContainer.innerHTML = footerHTML;
});
