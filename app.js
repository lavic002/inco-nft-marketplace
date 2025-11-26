// 1. FIREBASE CONFIGURATION (Your Keys)
const firebaseConfig = {
  apiKey: "AIzaSyAYWmjZ-6QxAw_Mvr3vGbGLkW8xAK3mv-I",
  authDomain: "confidential-marketplace.firebaseapp.com",
  projectId: "confidential-marketplace",
  storageBucket: "confidential-marketplace.firebasestorage.app",
  messagingSenderId: "833743965062",
  appId: "1:833743965062:web:cec5ddc33727166d68ba07",
  measurementId: "G-VC6TF7LT2K"
};

// 2. INITIALIZE FIREBASE
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

console.log("Firebase Initialized");

// 3. MAIN APP LOGIC
document.addEventListener('DOMContentLoaded', function() {

    // --- SECTION A: NAVIGATION (Your Existing Feature) ---
    const strokebar = document.getElementById('strokebar');
    const navigation = document.getElementById('navigation');

    if (strokebar && navigation) {
        strokebar.addEventListener('click', function() {
            navigation.classList.toggle('active');
        });
    }

    // --- SECTION B: POPUP & IMAGE PREVIEW ---
    const createBtn = document.getElementById('create-item');
    const overlay = document.getElementById('create-overlay');
    const cancelBtn = document.getElementById('cancel-popup');
    
    // Using 'image-upload' based on your snippet
    const uploadArea = document.getElementById('image-upload'); 
    const fileInput = document.getElementById('file-input');
    const previewImg = document.getElementById('image-preview');

    // 1. Open Popup
    if (createBtn && overlay) {
        createBtn.addEventListener('click', function(e) {
            e.preventDefault();
            overlay.style.display = 'flex';
        });
    }

    // 2. Close Popup (X Button)
    if (cancelBtn && overlay) {
        cancelBtn.addEventListener('click', function() {
            overlay.style.display = 'none';
        });
    }

    // 3. Close Popup (Click Outside)
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.style.display = 'none';
            }
        });
    }

    // 4. Image Preview Logic
    if (uploadArea && fileInput) {
        // Clicking the div triggers the hidden input
        uploadArea.addEventListener('click', () => fileInput.click());

        // When file is selected, show preview
        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    if (previewImg) {
                        previewImg.src = e.target.result;
                        previewImg.style.display = 'block';
                        
                        // Optional: Hide the text inside the upload box if you want
                        // uploadArea.querySelector('p').style.display = 'none'; 
                    }
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // --- SECTION C: FIREBASE UPLOAD LOGIC ---
    const form = document.getElementById('nft-creation-form');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // 1. Check Login (Optional for testing, strictly recommended for production)
            const user = auth.currentUser;
            if (!user) {
                 alert("Note: You are not logged in. If your Firebase rules require login, this will fail.");
                 // return; // Uncomment this to stop the function if not logged in
            }

            // 2. Button Feedback
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "Uploading...";
            submitBtn.disabled = true;

            try {
                // 3. Validation
                const file = fileInput.files[0];
                if (!file) throw new Error("Please select an image first.");

                const nameVal = document.getElementById('nft-name').value;
                const priceVal = document.getElementById('nft-price').value;
                const descVal = document.getElementById('nft-description').value;

                // 4. Upload Image to Storage
                const fileName = `nfts/${Date.now()}-${file.name}`;
                const storageRef = storage.ref(fileName);
                
                // Upload task
                const snapshot = await storageRef.put(file);
                
                // Get URL
                const downloadURL = await snapshot.ref.getDownloadURL();
                console.log("Image uploaded:", downloadURL);

                // 5. Save Data to Firestore
                await db.collection("nfts").add({
                    name: nameVal,
                    price: priceVal,
                    description: descVal,
                    image: downloadURL,
                    ownerId: user ? user.uid : "anonymous",
                    createdAt: new Date() // Server timestamp
                });

                // 6. Success
                alert("Success! Item Created.");
                overlay.style.display = 'none';
                form.reset();
                if(previewImg) previewImg.style.display = 'none';

            } catch (error) {
                console.error("Error:", error);
                alert("Error: " + error.message);
            } finally {
                // Reset button
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
