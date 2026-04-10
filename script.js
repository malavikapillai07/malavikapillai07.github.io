// JavaScript to handle Dark/Light mode toggling
const themeBtn = document.getElementById('theme-btn');
const emailCopyBtn = document.getElementById('email-copy-btn');
const copyToast = document.getElementById('copy-toast');
const emailToCopy = 'malavikapillaiofficial@gmail.com';
const dinelyCard = document.getElementById('dinely-card');
const dinelyModal = document.getElementById('dinely-modal');
const dinelyBackBtn = document.getElementById('dinely-back-btn');
let copyToastTimer;

// Check for saved user preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

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

const showCopyToast = () => {
    if (!copyToast) return;
    copyToast.classList.add('show');
    clearTimeout(copyToastTimer);
    copyToastTimer = setTimeout(() => {
        copyToast.classList.remove('show');
    }, 1500);
};

const copyEmailToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(emailToCopy);
        showCopyToast();
    } catch (err) {
        const tempInput = document.createElement('input');
        tempInput.value = emailToCopy;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showCopyToast();
    }
};

if (emailCopyBtn) {
    emailCopyBtn.addEventListener('click', copyEmailToClipboard);
}

const openDinelyModal = () => {
    if (!dinelyModal) return;
    dinelyModal.classList.add('show');
    dinelyModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
};

const closeDinelyModal = () => {
    if (!dinelyModal) return;
    dinelyModal.classList.remove('show');
    dinelyModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
};

if (dinelyCard) {
    dinelyCard.addEventListener('click', (event) => {
        event.preventDefault();
        openDinelyModal();
    });
}

if (dinelyBackBtn) {
    dinelyBackBtn.addEventListener('click', closeDinelyModal);
}

if (dinelyModal) {
    dinelyModal.addEventListener('click', (event) => {
        if (event.target === dinelyModal) {
            closeDinelyModal();
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dinelyModal && dinelyModal.classList.contains('show')) {
        closeDinelyModal();
    }
});

/* === Flipbook Scroll Animation === */
const flipbookScrollArea = document.getElementById('flipbook-scroll-area');
const bookCover = document.getElementById('book-cover');
const bookShift = document.getElementById('book-shift');

if (flipbookScrollArea && bookCover && bookShift) {
    const handleScroll = () => {
        const rect = flipbookScrollArea.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        
        // Sticky offset (4.5rem). We convert to pixels for more accurate math
        const stickyOffset = 4.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
        
        // The animation should happen during the "sticky" window.
        // It starts when rect.top hits stickyOffset, and ends when it hit -(rect.height - viewHeight)
        const totalScrollable = (rect.height - viewHeight);
        const currentScroll = stickyOffset - rect.top;
        
        let progress = currentScroll / totalScrollable;
        progress = Math.max(0, Math.min(1, progress));
        
        // Smoothly rotate the cover
        bookCover.style.transform = `rotateY(${progress * -180}deg)`;
        
        // Shift the book horizontally to keep it centered
        const pageWidth = window.innerWidth <= 768 ? 130 : 160; 
        const shiftX = -pageWidth * (1 - progress);
        bookShift.style.transform = `translateX(${shiftX}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}
