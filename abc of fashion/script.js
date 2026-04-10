// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    const progressEl = document.getElementById('scroll-progress');
    const percentEl = document.getElementById('scroll-percent');

    // Function to calculate and update scroll state
    const updateScrollProgress = () => {
        // How far we have scrolled from the top
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // Total scrollable height = total document height minus the height of the viewport
        const docHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
        const scrollableHeight = docHeight - window.innerHeight;
        
        // Calculate percentage (0 to 100)
        let scrollPercent = 0;
        if (scrollableHeight > 0) {
            scrollPercent = (scrollTop / scrollableHeight) * 100;
        }

        // Keep it safely clamped between 0 and 100
        scrollPercent = Math.min(100, Math.max(0, scrollPercent));
        
        // Apply updates to the UI
        if (progressEl && percentEl) {
            progressEl.style.height = `${scrollPercent}%`;
            percentEl.style.top = `${scrollPercent}%`;
            percentEl.textContent = `${Math.round(scrollPercent)}%`;
        }
    };

    // Listen to changes when the user scrolls or resizes the browser
    window.addEventListener('scroll', updateScrollProgress);
    window.addEventListener('resize', updateScrollProgress);

    // Initial call to set the position when the page first loads
    updateScrollProgress();

    // Check for saved user preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenuBtn.classList.toggle('active');
            mainNav.classList.toggle('active');
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

    // JavaScript to handle Dark/Light mode toggling
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Save theme selection to localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
}
