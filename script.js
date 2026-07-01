/* ===== BITE BARON — MAIN SCRIPT ===== */

// ----- LOADER -----
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
  }, 1600);
});

// ----- NAVBAR SCROLL -----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }
  // back to top
  const btt = document.getElementById('backToTop');
  if (btt) btt.classList.toggle('visible', window.scrollY > 400);
});

// ----- HAMBURGER MENU -----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ----- BACK TO TOP -----
const btt = document.getElementById('backToTop');
if (btt) {
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ----- REVEAL ON SCROLL -----
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = entry.target.parentElement.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      let delay = 0;
      siblings.forEach((el, idx) => {
        if (el === entry.target) delay = idx * 80;
      });
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ----- ANIMATED COUNTERS -----
const counters = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = Math.floor(current).toLocaleString();
        if (current >= target) {
          el.textContent = target.toLocaleString() + (target === 99 ? '' : '+');
          clearInterval(timer);
        }
      }, 16);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.3 });
counters.forEach(c => counterObserver.observe(c));

// ----- FAQ ACCORDION -----
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ----- MENU CATEGORY FILTER (menu.html) -----
const catBtns = document.querySelectorAll('.cat-btn');
if (catBtns.length > 0) {
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-cat');
      document.querySelectorAll('.menu-section').forEach(sec => {
        if (cat === 'all' || sec.getAttribute('data-cat') === cat) {
          sec.style.display = 'block';
        } else {
          sec.style.display = 'none';
        }
      });
    });
  });
}

// ----- CONTACT FORM SUBMIT -----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('fname')?.value;
    const email = document.getElementById('femail')?.value;
    const message = document.getElementById('fmessage')?.value;
    const subject = `Bite Baron Order/Inquiry from ${name}`;
    const body = `Hi Bite Baron,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href = `mailto:contactglanders@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

// ----- PARALLAX HERO -----
const heroBg = document.querySelector('.hero-img');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    heroBg.style.transform = `scale(1.05) translateY(${offset * 0.2}px)`;
  });
}
