document.addEventListener('DOMContentLoaded', () => {
    const pieceLabel = document.getElementById('current-piece');
    const pieces = [
        { name: 'Red', color: '#e63946', delay: 0 },
        { name: 'Black', color: '#444444', delay: 3000 },
        { name: 'Gold', color: '#d4af37', delay: 6000 }
    ];

    let currentIndex = 0;

    /**
     * Updates the text label at the bottom to match the currently moving piece.
     * The timing matches the 9s CSS animation cycle (3s per piece).
     */
    function updateLabel() {
        const current = pieces[currentIndex];
        pieceLabel.textContent = current.name;
        pieceLabel.style.color = current.color;

        currentIndex = (currentIndex + 1) % pieces.length;
        
        // Schedule the next update in 3 seconds
        setTimeout(updateLabel, 3000);
    }

    // Initialize the label cycle
    updateLabel();
});
