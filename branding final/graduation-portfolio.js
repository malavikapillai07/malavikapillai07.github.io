document.addEventListener('DOMContentLoaded', () => {
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
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.remove('dark-mode');
  } else {
    document.body.classList.add('dark-mode');
  }

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mainNav = document.getElementById('main-nav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      mobileMenuBtn.classList.toggle('active');
      mainNav.classList.toggle('active');
      console.log('Mobile menu toggled'); // Debugging
    });

    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mainNav.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenuBtn.classList.remove('active');
        mainNav.classList.remove('active');
      }
    });
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
      console.log('Theme toggled'); // Debugging
    });
  }

  // Handle Back Button Visibility on Scroll
  const backBtn = document.querySelector('.floating-back-btn');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backBtn.classList.add('visible');
      } else {
        backBtn.classList.remove('visible');
      }
    });
  }
});
