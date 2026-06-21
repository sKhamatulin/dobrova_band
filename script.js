// nav scroll state
const navInner = document.getElementById('navInner');
window.addEventListener('scroll', () => {
  navInner.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach((el) => io.observe(el));

// glass spotlight follow (desktop pointer only)
document.querySelectorAll('.glass').forEach((card) => {
  const spot = card.querySelector('.glass-spot');
  if (!spot) return;
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    spot.style.left = (e.clientX - r.left) + 'px';
    spot.style.top = (e.clientY - r.top) + 'px';
  });
});

// register service worker for PWA / offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch((err) => {
      console.warn('SW registration failed:', err);
    });
  });
}
