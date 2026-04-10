const progressEl = document.getElementById('scroll-progress');
const percentEl = document.getElementById('scroll-percent');

const updateScrollProgress = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  const scrollableHeight = docHeight - window.innerHeight;

  let scrollPercent = 0;
  if (scrollableHeight > 0) {
    scrollPercent = (scrollTop / scrollableHeight) * 100;
  }

  scrollPercent = Math.min(100, Math.max(0, scrollPercent));

  if (progressEl && percentEl) {
    progressEl.style.height = `${scrollPercent}%`;
    percentEl.style.top = `${scrollPercent}%`;
    percentEl.textContent = `${Math.round(scrollPercent)}%`;
  }
};

window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress();

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.06 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    // Stagger siblings
    const parent = el.parentElement;
    const siblings = [...parent.querySelectorAll(':scope > .reveal')];
    const idx = siblings.indexOf(el);
    if (idx > 0) el.style.transitionDelay = `${idx * 55}ms`;
    io.observe(el);
  });

  // Theme Toggle Logic
  const themeBtn = document.getElementById('theme-btn');
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
  }
