// Navigation remains usable when JavaScript is unavailable.
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
const navLinks = [...document.querySelectorAll('nav a')];
const navSections = navLinks.map(link => document.querySelector(link.hash)).filter(Boolean);
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting);
    if (!visible.length) return;
    const current = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0].target.id;
    for (const link of navLinks) {
      if (link.hash === '#' + current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }, { rootMargin: '-15% 0px -50% 0px', threshold: 0 });
  navSections.forEach(section => observer.observe(section));
}
