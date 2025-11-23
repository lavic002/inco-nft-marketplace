const strokebar = document.getElementById('strokebar');
const nav = document.getElementById('navigation');
const navLinks = document.querySelectorAll('.navigation a'); // Select all links inside sidebar

// 1. Toggle functionality (Open/Close on Hamburger click)
strokebar.addEventListener('click', (e) => {
  e.stopPropagation();
  nav.classList.toggle('active');
});

// 2. Close when clicking ANYWHERE outside
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
    nav.classList.remove('active');
  }
});

// 3. NEW: Close the menu specifically when a Link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
     nav.classList.remove('active');
  });
});
