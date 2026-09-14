// JavaScript to handle Dark/Light mode toggling
const themeBtn = document.getElementById('theme-btn');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mainNav = document.getElementById('main-nav');
const emailCopyBtn = document.getElementById('email-copy-btn');
const copyToast = document.getElementById('copy-toast');
const emailToCopy = 'malavikapillaiofficial@gmail.com';
const dinelyCard = document.getElementById('dinely-card');
const dinelyModal = document.getElementById('dinely-modal');
const dinelyBackBtn = document.getElementById('dinely-back-btn');
const polaroidWrapper = document.querySelector('.polaroid-wrapper');
let copyToastTimer;
let polaroidFlipTimer;

// Mobile Menu Toggle
if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenuBtn.classList.toggle('active');
        mainNav.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
        });
    });

    // Close menu when clicking anywhere else
    document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
        }
    });
}

// Check for saved user preference
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.remove('dark-mode');
} else {
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
    if (event.key === 'Escape' && ndaModal && ndaModal.classList.contains('show')) {
        closeNdaModal();
    }
});

// NDA Modal Handlers
const ndaModal = document.getElementById('nda-modal');
const ndaCloseBtn = document.getElementById('nda-modal-close');
const ndaGotItBtn = document.getElementById('nda-modal-btn');
const ndaTriggers = document.querySelectorAll('.open-nda-modal');

const openNdaModal = () => {
    if (!ndaModal) return;
    ndaModal.classList.add('show');
    ndaModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
};

const closeNdaModal = () => {
    if (!ndaModal) return;
    ndaModal.classList.remove('show');
    ndaModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
};

ndaTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openNdaModal();
    });
});

if (ndaCloseBtn) ndaCloseBtn.addEventListener('click', closeNdaModal);
if (ndaGotItBtn) ndaGotItBtn.addEventListener('click', closeNdaModal);
if (ndaModal) {
    ndaModal.addEventListener('click', (e) => {
        if (e.target === ndaModal) {
            closeNdaModal();
        }
    });
}

// In Progress Modal Handlers
const progressModal = document.getElementById('progress-modal');
const progressCloseBtn = document.getElementById('progress-modal-close');
const progressGotItBtn = document.getElementById('progress-modal-btn');
const progressTriggers = document.querySelectorAll('.open-progress-modal');

const openProgressModal = () => {
    if (!progressModal) return;
    progressModal.classList.add('show');
    progressModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
};

const closeProgressModal = () => {
    if (!progressModal) return;
    progressModal.classList.remove('show');
    progressModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
};

progressTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        openProgressModal();
    });
});

if (progressCloseBtn) progressCloseBtn.addEventListener('click', closeProgressModal);
if (progressGotItBtn) progressGotItBtn.addEventListener('click', closeProgressModal);
if (progressModal) {
    progressModal.addEventListener('click', (e) => {
        if (e.target === progressModal) {
            closeProgressModal();
        }
    });
}

// Global Escape Key Listener for Modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeNdaModal();
        closeProgressModal();
    }
});

// Whole-card click handling for showcase cards
document.querySelectorAll('.showcase-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // If the user directly clicked a specific button or link, let native event handle it
        if (e.target.closest('.btn-card-action') || e.target.closest('.open-nda-modal') || e.target.closest('.open-progress-modal')) return;
        
        // Find the action button or link inside the card and trigger it
        const actionBtn = card.querySelector('.btn-card-action');
        if (actionBtn) {
            actionBtn.click();
        }
    });
});

/* === Custom Cursor Logic === */
let cursorEl = document.getElementById('custom-cursor');
if (!cursorEl) {
    cursorEl = document.createElement('div');
    cursorEl.id = 'custom-cursor';
    document.body.appendChild(cursorEl);
}

let mouseX = -100;
let mouseY = -100;
let cursorX = -100;
let cursorY = -100;
let isCursorActive = false;

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

// Smooth fluid trailing loop
const renderCursor = () => {
    if (isCursorActive) {
        cursorX += (mouseX - cursorX) * 0.35;
        cursorY += (mouseY - cursorY) * 0.35;
        cursorEl.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(renderCursor);
};
requestAnimationFrame(renderCursor);

// Hover over polaroid -> yellow pill with "hi"
if (polaroidWrapper) {
    polaroidWrapper.addEventListener('mouseenter', () => {
        cursorEl.classList.remove('cursor-hover', 'cursor-emerging');
        cursorEl.classList.add('cursor-polaroid');
        cursorEl.textContent = 'hi';
    });
    polaroidWrapper.addEventListener('mouseleave', () => {
        cursorEl.classList.remove('cursor-polaroid');
        cursorEl.textContent = '';
    });
}

// Hover over "product designer" -> yellow pill with typography "emerging..."
const emergingTarget = document.querySelector('.hover-target-emerging');
if (emergingTarget) {
    emergingTarget.addEventListener('mouseenter', () => {
        cursorEl.classList.remove('cursor-hover', 'cursor-polaroid');
        cursorEl.classList.add('cursor-emerging');
        cursorEl.textContent = 'emerging...';
    });
    emergingTarget.addEventListener('mouseleave', () => {
        cursorEl.classList.remove('cursor-emerging');
        cursorEl.textContent = '';
    });
}

// Hover over interactive links and buttons
const setupCursorInteractions = () => {
    const targets = document.querySelectorAll('a, button, .project-card, .showcase-card, .btn, .theme-toggle');
    targets.forEach(el => {
        if (el.closest('.polaroid-wrapper') || el.classList.contains('hover-target-emerging')) return;
        el.addEventListener('mouseenter', () => {
            if (!cursorEl.classList.contains('cursor-polaroid') && !cursorEl.classList.contains('cursor-emerging')) {
                cursorEl.classList.add('cursor-hover');
            }
        });
        el.addEventListener('mouseleave', () => {
            cursorEl.classList.remove('cursor-hover');
        });
    });
};
setupCursorInteractions();

/* === Mobile Polaroid Auto-Flip === */
const isTouchMobile = () => (
    window.matchMedia('(max-width: 900px)').matches &&
    (window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches)
);

const stopPolaroidAutoFlip = () => {
    if (polaroidFlipTimer) {
        clearInterval(polaroidFlipTimer);
        polaroidFlipTimer = null;
    }

    if (polaroidWrapper) {
        polaroidWrapper.classList.remove('is-flipped');
    }
};

const startPolaroidAutoFlip = () => {
    if (!polaroidWrapper) return;

    stopPolaroidAutoFlip();
    polaroidFlipTimer = setInterval(() => {
        polaroidWrapper.classList.toggle('is-flipped');
    }, 4000);
};

if (polaroidWrapper) {
    const syncPolaroidMode = () => {
        if (isTouchMobile()) {
            startPolaroidAutoFlip();
        } else {
            stopPolaroidAutoFlip();
        }
    };

    syncPolaroidMode();
    window.addEventListener('resize', syncPolaroidMode);
    window.addEventListener('orientationchange', syncPolaroidMode);
}

/* === Floating Cassette Spotify Player Toggle === */
const cassetteToggleBtn = document.getElementById('cassette-toggle');
const spotifyCard = document.getElementById('spotify-card');
const spotifyCloseBtn = document.getElementById('spotify-close');
const cassetteTooltip = document.getElementById('cassette-tooltip');

if (cassetteToggleBtn && spotifyCard) {
    cassetteToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = spotifyCard.classList.toggle('is-open');
        spotifyCard.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
        cassetteToggleBtn.classList.toggle('is-playing', isOpen);
        if (cassetteTooltip) {
            cassetteTooltip.textContent = isOpen ? 'Click to close player 🎵' : 'Click to play song 🎵';
        }
    });

    if (spotifyCloseBtn) {
        spotifyCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            spotifyCard.classList.remove('is-open');
            spotifyCard.setAttribute('aria-hidden', 'true');
            cassetteToggleBtn.classList.remove('is-playing');
            if (cassetteTooltip) {
                cassetteTooltip.textContent = 'Click to play song 🎵';
            }
        });
    }

    document.addEventListener('click', (e) => {
        if (spotifyCard.classList.contains('is-open') && !spotifyCard.contains(e.target) && !cassetteToggleBtn.contains(e.target)) {
            spotifyCard.classList.remove('is-open');
            spotifyCard.setAttribute('aria-hidden', 'true');
            cassetteToggleBtn.classList.remove('is-playing');
            if (cassetteTooltip) {
                cassetteTooltip.textContent = 'Click to play song 🎵';
            }
        }
    });
}
