const loader = document.getElementById('loader');
window.addEventListener('load', () => setTimeout(() => loader.classList.add('hide'), 1450));
document.getElementById('year').textContent = new Date().getFullYear();

const navButtons = document.querySelectorAll('[data-tab]');
const sections = document.querySelectorAll('[data-section]');
function activateTab(name) {
  navButtons.forEach(button => button.classList.toggle('active', button.dataset.tab === name));
  const target = document.querySelector(`[data-section="${name}"]`);
  if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
  document.getElementById('mobileNav').classList.remove('open');
  document.getElementById('menuToggle').setAttribute('aria-expanded','false');
}
navButtons.forEach(button => button.addEventListener('click', () => activateTab(button.dataset.tab)));

const menuToggle = document.getElementById('menuToggle');
menuToggle.addEventListener('click', () => {
  const nav = document.getElementById('mobileNav');
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const name = entry.target.dataset.section;
    navButtons.forEach(button => button.classList.toggle('active', button.dataset.tab === name));
  });
}, {threshold:0.38});
sections.forEach(section => observer.observe(section));
