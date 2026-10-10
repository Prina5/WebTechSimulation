/* ==========================================================
   FATHOM - runs on every page
   Lesson hooks: DOM selection, events, classList, attributes
   ========================================================== */

// Highlight the current page in the navigation
const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach((link) => {
  if (link.getAttribute('href') === here) {
    link.setAttribute('aria-current', 'page');
  }
});

// Mobile menu button
const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-links');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

// Footer year
const yearSpan = document.querySelector('#year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();
