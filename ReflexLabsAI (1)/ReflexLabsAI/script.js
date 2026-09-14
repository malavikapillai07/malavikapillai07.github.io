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

    /* === Custom Cursor Logic === */
    let cursorEl = document.getElementById('custom-cursor');
    if (!cursorEl) {
        cursorEl = document.createElement('div');
        cursorEl.id = 'custom-cursor';
        document.body.appendChild(cursorEl);
    }
    let mouseX = -100, mouseY = -100, cursorX = -100, cursorY = -100, isCursorActive = false;
    window.addEventListener('pointermove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!isCursorActive) {
            isCursorActive = true;
            cursorX = mouseX;
            cursorY = mouseY;
            cursorEl.classList.add('visible');
        }
    });
    const renderCursor = () => {
        if (isCursorActive) {
            cursorX += (mouseX - cursorX) * 0.35;
            cursorY += (mouseY - cursorY) * 0.35;
            cursorEl.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        }
        requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);
    document.querySelectorAll('a, button, .block, .tag').forEach(el => {
        el.addEventListener('mouseenter', () => cursorEl.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursorEl.classList.remove('cursor-hover'));
    });
});
