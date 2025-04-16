// main.js

// ========== HAMBURGER MENU TOGGLE ==========
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
  });
}

// ========== BACK TO TOP BUTTON ==========
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========== SCROLL REVEAL ANIMATION ==========
const faders = document.querySelectorAll('.fade-in, .slide-in');

if ('IntersectionObserver' in window) {
  const appearOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  };

  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    });
  }, appearOptions);

  faders.forEach((fader) => appearOnScroll.observe(fader));
} else {
  // Fallback if IntersectionObserver not supported
  faders.forEach((el) => el.classList.add('appear'));
}
