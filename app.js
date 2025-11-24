document.addEventListener('DOMContentLoaded', () => {
    
    const hamburgerBtn = document.getElementById('strokebar');
    const navMenu = document.getElementById('navigation');

    // Safety check: make sure elements actually exist
    if (hamburgerBtn && navMenu) {
        
        hamburgerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            console.log("Button clicked!"); // Check your phone console for this
        });

        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                    navMenu.classList.remove('active');
                }
            }
        });
    } else {
        console.error("Error: stroke button or menu not found in HTML");
    }
});
