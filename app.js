const hamburgerBtn = document.getElementById('strokebar');
const navMenu = document.getElementById('navigation');

// 1. Toggle Menu when Hamburger is clicked
hamburgerBtn.addEventListener('click', (e) => {
    // This prevents the click from bubbling up to the document immediately
    e.stopPropagation(); 
    navMenu.classList.toggle('active');
});

// 2. Close Menu when clicking outside
document.addEventListener('click', (e) => {
    // Check if the menu is currently showing
    if (navMenu.classList.contains('active')) {
        
        // Check if the clicked element is NOT the menu and NOT inside the menu
        if (!navMenu.contains(e.target) && e.target !== hamburgerBtn) {
            navMenu.classList.remove('active');
        }
    }
});

// Optional: Prevent menu closing if clicking INSIDE the menu itself
navMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});
