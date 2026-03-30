/* ═══════════════════════════════════════
   WEBERR STUDIO — main.js  v3
   ═══════════════════════════════════════ */

/* ══ 1. INTRO LOADER — typewriter "Weberr_" ══ */
(function runIntro() {
  const loader   = document.getElementById('introLoader');
  const typed    = document.getElementById('introTyped');
  const cur      = document.getElementById('introCur');
  const progress = document.getElementById('introProgress');

  if (!loader) return;

  // Prevent page scroll during intro
  document.body.style.overflow = 'hidden';

  const letters  = 'eberr';       // W is already rendered
  const charDelay = 70;            // ms per letter (fast)
  const holdTime  = 350;           // pause after full word
  const fadeTime  = 550;           // CSS transition duration

  let i = 0;

  function typeNext() {
    if (i < letters.length) {
      typed.textContent += letters[i];
      i++;
      // Update progress bar proportionally
      progress.style.width = ((i / letters.length) * 80) + '%';
      setTimeout(typeNext, charDelay);
    } else {
      // Full word typed — fill bar, hold, then dismiss
      progress.style.width = '100%';
      setTimeout(dismiss, holdTime);
    }
  }

  function dismiss() {
    cur.style.display = 'none';
    loader.classList.add('hidden');
    document.body.style.overflow = '';

    // Trigger hero reveal animations
    document.querySelectorAll('.hero .reveal').forEach((el, idx) => {
      setTimeout(() => el.classList.add('visible'), idx * 130);
    });
  }

  // Small delay before starting so the W pops in first
  setTimeout(typeNext, 320);
})();


/* ══ 2. CUSTOM CURSOR ══ */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0, curX = 0, curY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

(function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top  = curY + 'px';
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .service-card, .project-card, .app-card, .review-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});


/* ══ 3. NAV SCROLL SHRINK ══ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});


/* ══ 4. BURGER MENU ══ */
const burger     = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const mobLinks   = document.querySelectorAll('.mob-link');

burger.addEventListener('click', () => {
  const open  = mobileMenu.classList.toggle('open');
  const spans = burger.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    document.body.style.overflow = 'hidden';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    document.body.style.overflow = '';
  }
});

mobLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    document.body.style.overflow = '';
  });
});


/* ══ 5. SCROLL REVEAL ══ */
const revealEls = document.querySelectorAll('.fade-up, .reveal');
const observer  = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));


/* ══ 6. STAR RATING RENDERER ══ */
/**
 * Render filled stars on a .stars-row element.
 * rating: 0–5 (supports decimals e.g. 4.5)
 */
function renderStars(rowEl, rating) {
  const stars = rowEl.querySelectorAll('.star');
  stars.forEach((star, idx) => {
    const threshold = idx + 1;
    if (rating >= threshold) {
      star.classList.add('lit');
    } else {
      star.classList.remove('lit');
    }
  });
}

// On page load, render stars for all .stars-row that have [data-rating]
document.querySelectorAll('.stars-row[data-rating]').forEach(row => {
  const rating = parseFloat(row.dataset.rating) || 0;
  renderStars(row, rating);
});

// ── Reviews data (add real reviews here when you have them) ──
// Example structure; set these when you get actual reviews:
// const reviews = [
//   { name: 'Client A', rating: 5, text: 'Super travail !', date: '15/03/2026' },
//   { name: 'Client B', rating: 4, text: 'Très pro.', date: '20/03/2026' },
// ];
// If you add reviews, call injectReviews(reviews) below.

function injectReviews(reviews) {
  const grid     = document.querySelector('.reviews-grid');
  const scoreNum = document.querySelector('.score-number');
  const scoreRow = document.querySelector('.reviews-score .stars-row');
  const scoreLbl = document.querySelector('.score-label');
  if (!grid || !reviews.length) return;

  // Compute average
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  // Update global score
  scoreNum.textContent = avg.toFixed(1);
  scoreRow.dataset.rating = avg;
  renderStars(scoreRow, avg);
  scoreLbl.textContent = reviews.length + ' avis client' + (reviews.length > 1 ? 's' : '');

  // Remove placeholder cards
  grid.innerHTML = '';

  reviews.forEach((rev, idx) => {
    const initials = rev.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);
    const card = document.createElement('div');
    card.className = 'review-card fade-up';
    card.style.setProperty('--delay', (idx * 0.1) + 's');
    card.innerHTML = `
      <div class="review-top">
        <div class="review-avatar">${initials}</div>
        <div>
          <div class="review-name">${rev.name}</div>
          <div class="stars-row mini" data-rating="${rev.rating}">
            <span class="star">★</span><span class="star">★</span>
            <span class="star">★</span><span class="star">★</span><span class="star">★</span>
          </div>
        </div>
      </div>
      <p class="review-text">${rev.text}</p>
      <span class="review-date mono">${rev.date}</span>
    `;
    grid.appendChild(card);
    // Observe for scroll reveal + render stars
    observer.observe(card);
    renderStars(card.querySelector('.stars-row'), rev.rating);
  });
}

// Uncomment and fill when you have real reviews:
// injectReviews([
//   { name: 'Jean Dupont', rating: 5, text: 'Excellent travail, livré en avance !', date: '01/04/2026' },
// ]);


/* ══ 7. CONTACT FORM ══ */
const form        = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn  = form.querySelector('button[type="submit"]');
    const span = btn.querySelector('span');
    btn.disabled = true;
    span.textContent = 'Envoi en cours...';
    await new Promise(r => setTimeout(r, 1200));
    form.style.display = 'none';
    formSuccess.classList.add('visible');
  });
}