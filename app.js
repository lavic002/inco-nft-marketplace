document.addEventListener('DOMContentLoaded', function() {
    const strokebar = document.getElementById('strokebar');
    const navigation = document.getElementById('navigation');

    if (strokebar && navigation) {
        strokebar.addEventListener('click', function() {
            // This toggles the class 'active' on and off
            navigation.classList.toggle('active');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // 1. Select the elements using the IDs you provided
    const cancelButton = document.getElementById('cancel-popup');
    const overlay = document.getElementById('create-overlay');

    // 2. Add the click event listener
    if (cancelButton && overlay) {
        cancelButton.addEventListener('click', function() {
            // This hides the overlay
            overlay.style.display = 'none';
        });
    }
});
const createBtn = document.getElementById('create-item');
const overlay = document.getElementById('create-overlay');

if (createBtn && overlay) {
    createBtn.addEventListener('click', function(e) {
        // 1. Stop the <a> tag from reloading or jumping the page
        e.preventDefault(); 
        
        // 2. Show the overlay (matches the 'flex' from your CSS)
        overlay.style.display = 'flex'; 
    });
}
document.addEventListener('DOMContentLoaded', () => {
    // 1. SELECT ELEMENTS
    const createBtn = document.getElementById('create-item');
    const overlay = document.getElementById('create-overlay');
    const closeBtn = document.getElementById('cancel-popup');
    const uploadArea = document.getElementById('image-upload');
    const fileInput = document.getElementById('file-input');
    const previewImg = document.getElementById('image-preview');

    // 2. OPEN/CLOSE LOGIC
    createBtn.addEventListener('click', (e) => {
        e.preventDefault();
        overlay.style.display = 'flex'; // Show it
    });

    closeBtn.addEventListener('click', () => {
        overlay.style.display = 'none'; // Hide it
    });

    // Close if clicking outside the white box
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.style.display = 'none';
    });

    // 3. IMAGE PREVIEW LOGIC
    // When the dashed box is clicked -> click the hidden input
    uploadArea.addEventListener('click', () => fileInput.click());

    // When a file is actually selected...
    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            // FileReader allows the browser to read the file instantly
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImg.src = e.target.result; // Set src to the file data
                previewImg.style.display = 'block'; // Show image
                
             
            }
            reader.readAsDataURL(file);
        }
    });
});
