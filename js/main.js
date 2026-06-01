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
    </div>
  </div>
  <header>
    <div class="header-inner">
      <a href="index.html" class="logo">Taper<span>'s</span></a>
      <nav id="main-nav">
        ${navLinks}
        <div class="socials">
          <a href="https://www.facebook.com/tapershair" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.instagram.com/tapershairdressers" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
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
          <a href="https://www.facebook.com/tapershair" target="_blank" class="footer-social">f</a>
          <a href="https://www.instagram.com/tapershairdressers" target="_blank" class="footer-social">in</a>
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

const REVIEW_FUNCTION_URL = '/.netlify/functions/reviews';

function loadGoogleReviews() {
  const ratingText = document.getElementById('review-summary');
  const heroRating = document.getElementById('hero-rating');
  const heroReviewCount = document.getElementById('hero-review-count');
  const reviewStars = document.getElementById('review-stars');
  const reviewsGrid = document.getElementById('reviews-grid');

  if (!ratingText || !heroRating || !heroReviewCount || !reviewStars || !reviewsGrid) {
    return;
  }

  fetch(REVIEW_FUNCTION_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to load review data.');
      }
      return response.json();
    })
    .then((data) => {
      const rating = Number(data.rating) || 0;
      const totalRatings = Number(data.total_ratings) || 0;
      const reviews = Array.isArray(data.reviews) ? data.reviews : [];
      const ratingValue = Number.isInteger(rating) ? rating.toString() : rating.toFixed(1);

      heroRating.textContent = `${ratingValue}★`;
      heroReviewCount.textContent = `${totalRatings.toLocaleString()} reviews`;
      ratingText.textContent = `${ratingValue} out of 5 — Based on ${totalRatings.toLocaleString()} Google reviews`;

      reviewStars.innerHTML = Array.from({ length: 5 }, (_, i) => {
        return `<span class="star">${i < Math.round(rating) ? '★' : '☆'}</span>`;
      }).join('');

      reviewsGrid.innerHTML = '';
      if (reviews.length) {
        reviews.slice(0, 5).forEach((review) => {
          const card = document.createElement('div');
          card.className = 'review-card';

          const starLine = document.createElement('div');
          starLine.className = 'review-stars';
          starLine.innerHTML = Array.from({ length: 5 }, (_, i) => `<span class="star">${i < review.rating ? '★' : '☆'}</span>`).join('');

          const textPara = document.createElement('p');
          textPara.className = 'review-text';
          textPara.textContent = review.text;

          const authorDiv = document.createElement('div');
          authorDiv.className = 'review-author';
          authorDiv.textContent = review.author;

          card.appendChild(starLine);
          card.appendChild(textPara);
          card.appendChild(authorDiv);
          reviewsGrid.appendChild(card);
        });
      } else {
        const emptyCard = document.createElement('div');
        emptyCard.className = 'review-card';
        const emptyText = document.createElement('p');
        emptyText.className = 'review-text';
        emptyText.textContent = 'No reviews are currently available. Please check back soon.';
        emptyCard.appendChild(emptyText);
        reviewsGrid.appendChild(emptyCard);
      }
    })
    .catch((error) => {
      console.error(error);
      ratingText.textContent = 'Unable to load live Google reviews at this time.';
    });
}

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.delay-1, .delay-2, .delay-3, .delay-4').forEach(el => observer.observe(el));
}
