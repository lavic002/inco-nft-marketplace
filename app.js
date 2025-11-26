// 3. MAIN APP LOGIC
document.addEventListener('DOMContentLoaded', function() {

    // --- SECTION A: NAVIGATION ---
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
    const uploadArea = document.getElementById('image-upload');
    const fileInput = document.getElementById('file-input');
    const previewImg = document.getElementById('image-preview');

    // Open Popup (No login check anymore)
    if (createBtn && overlay) {
        createBtn.addEventListener('click', (e) => {
            e.preventDefault();
            overlay.style.display = 'flex';
        });
    }

    // Close Popup
    if (cancelBtn && overlay) {
        cancelBtn.addEventListener('click', () => overlay.style.display = 'none');
    }

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.style.display = 'none';
        });
    }

    // Image Preview
    if (uploadArea && fileInput) {
        uploadArea.addEventListener('click', () => fileInput.click());
        
        fileInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    if (previewImg) {
                        previewImg.src = e.target.result;
                        previewImg.style.display = 'block';
                    }
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // --- SECTION C: FIREBASE UPLOAD LOGIC (PUBLIC) ---
    const form = document.getElementById('nft-creation-form');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Setup Button Feedback
            const submitBtn = document.getElementById('submit-btn') || form.querySelector('button');
            const originalText = submitBtn ? submitBtn.innerText : "Submit";
            
            if(submitBtn) {
                submitBtn.innerText = "Uploading...";
                submitBtn.disabled = true;
            }

            try {
                // 1. Get Inputs
                const file = fileInput.files[0];
                if (!file) throw new Error("Please select an image first.");

                const nameVal = document.getElementById('nft-name').value;
                const priceVal = document.getElementById('nft-price').value;
                const descVal = document.getElementById('nft-description').value;

                // 2. Upload Image
                // We use a random number for the file name since we don't have user IDs
                const uniqueId = Date.now() + Math.floor(Math.random() * 999);
                const fileName = `nfts/public-${uniqueId}-${file.name}`;
                
                const storageRef = storage.ref(fileName);
                const snapshot = await storageRef.put(file);
                const downloadURL = await snapshot.ref.getDownloadURL();

                // 3. Save Data
                await db.collection("nfts").add({
                    name: nameVal,
                    price: priceVal,
                    description: descVal,
                    image: downloadURL,
                    ownerId: "anonymous_user", // Generic ID since no login
                    createdAt: new Date()
                });

                // 4. Success
                alert("Success! Item Created.");
                overlay.style.display = 'none';
                form.reset();
                if(previewImg) previewImg.style.display = 'none';

            } catch (error) {
                console.error("Error:", error);
                alert("Error: " + error.message);
            } finally {
                if(submitBtn) {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                }
            }
        });
    }
});
