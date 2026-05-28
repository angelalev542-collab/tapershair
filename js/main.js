const BOOK_URL = 'https://www.makeonlinebooking.com/location/27350/taper-s-hairdressers-bardwell-park';

function getHeader(activePage) {
  const pages = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About us' },
    { href: 'services.html', label: 'Services' },
    { href: 'contact.html', label: 'Contact us' },
  ];
  const navLinks = pages.map(p =>
    `<a href="${p.href}" class="${activePage === p.label ? 'active' : ''}">${p.label}</a>`
  ).join('');
  return `
  <div class="top-bar">
    <div class="top-bar-inner">
      <span>📍 32 Slade Rd, Bardwell Park NSW 2207 &nbsp;|&nbsp; <a href="tel:0295992999">(02) 9599 2999</a> &nbsp;|&nbsp; Tue, Wed, Fri 9:00am–5:30pm; Thu 9:00am–9:00pm; Sat 8:00am–4:00pm</span>
      <div class="socials">
        <a href="https://www.facebook.com/p/Tapers-Hairdressers-100066510674275/" target="_blank">Facebook</a>
        <a href="https://www.instagram.com/tapershair/" target="_blank">Instagram</a>
        <a href="https://x.com/tapershair" target="_blank">X</a>
      </div>
    </div>
  </div>
  <header>
    <div class="header-inner">
      <a href="index.html" class="logo">Taper<span>'s</span></a>
      <nav id="main-nav">
        ${navLinks}
        <a href="${BOOK_URL}" target="_blank" class="btn-book">Book Now</a>
      </nav>
      <button class="hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;
}

function getFooter() {
  return `
  <footer>
    <div class="footer-grid">
      <div>
        <div class="footer-logo">Taper<span>'s</span> Hairdressers</div>
        <p class="footer-desc">Award winning salon and colour experts, serving Bardwell Park and surrounds since 1989. Where creativity meets craftsmanship in every snip.</p>
        <div class="footer-socials">
          <a href="https://www.facebook.com/p/Tapers-Hairdressers-100066510674275/" target="_blank" class="footer-social">f</a>
          <a href="https://www.instagram.com/tapershair/" target="_blank" class="footer-social">in</a>
          <a href="https://x.com/tapershair" target="_blank" class="footer-social">𝕏</a>
        </div>
      </div>
      <div class="footer-col">
        <h5>Navigation</h5>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About us</a></li>
          <li><a href="services.html">Services</a></li>
          <li><a href="contact.html">Contact us</a></li>
          <li><a href="${BOOK_URL}" target="_blank" class="booking-link">Book appointment</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Phone number</h5>
        <p><a href="tel:0295992999" style="color:var(--gold);text-decoration:none;">(02) 9599 2999</a></p>
        <br>
        <h5>Hours</h5>
        <p>Tue, Wed, Fri: 9:00am – 5:30pm<br>Thu: 9:00am – 9:00pm<br>Sat: 8:00am – 4:00pm</p>
      </div>
      <div class="footer-col">
        <h5>Address</h5>
        <p>32 Slade Rd<br>Bardwell Park NSW 2207<br>Australia</p>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© All rights reserved. Taper's Hairdressers.</span>
      <span>Bardwell Park, Sydney NSW</span>
    </div>
  </footer>`;
}

function initHamburger() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (btn && nav) {
    btn.addEventListener('click', () => nav.classList.toggle('open'));
  }
}

function initBookingLinks() {
  document.querySelectorAll('.booking-link').forEach(link => {
    if (link.dataset.bookingBound === 'true') return;

    link.href = BOOK_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(BOOK_URL, '_blank', 'noopener,noreferrer');
    });
    link.dataset.bookingBound = 'true';
  });
}

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.delay-1, .delay-2, .delay-3, .delay-4').forEach(el => observer.observe(el));
}
