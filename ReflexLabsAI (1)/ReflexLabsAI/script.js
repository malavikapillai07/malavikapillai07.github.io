/**
 * ReflexLabs AI - Case Study Website
 * Custom JavaScript logic
 * 
 * Future interactions and dynamic components can be added here.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('ReflexLabs AI Case Study loaded.');
    
    // --- Scroll Progress Bar ---
    const progressEl = document.getElementById('scroll-progress');
    const percentEl = document.getElementById('scroll-percent');
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        
        if (progressEl) progressEl.style.height = `${scrollPercent}%`;
        if (percentEl) {
            percentEl.textContent = `${Math.round(scrollPercent)}%`;
            percentEl.style.top = `${scrollPercent}%`;
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mainNav.classList.toggle('active');
        });
    }
});
