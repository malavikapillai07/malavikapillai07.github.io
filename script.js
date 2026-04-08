// JavaScript to handle Dark/Light mode toggling
const themeBtn = document.getElementById('theme-btn');

// Check for saved user preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Save theme selection to localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});
