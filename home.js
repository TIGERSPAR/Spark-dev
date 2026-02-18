/* HOME PAGE JS */
document.addEventListener('DOMContentLoaded', () => {
  // Animate stat numbers on scroll
  const stats = document.querySelectorAll('.stat-num');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.5 });
  stats.forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(10px)';
    s.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    obs.observe(s);
  });
});
