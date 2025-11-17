/* Simulation encryption utilities */

function encryptData(data) {
    return btoa(data + "|encrypted");
}

function decryptData(data) {
    try {
        return atob(data).replace("|encrypted", "");
    } catch {
        return "Unauthorized";
    }
}

function generateZKProof(data) {
    return "zk-proof-" + btoa(data).slice(0, 12);
}

function verifyProof(proof) {
    return proof.startsWith("zk-proof-");
}

/* Reveal fields */
function revealData(btn) {
    const parent = btn.parentElement;
    const maskedFields = parent.querySelectorAll(".masked");

    maskedFields.forEach(field => {
        field.textContent = decryptData(encryptData("Authorized Viewer Only"));
    });

    btn.textContent = "Revealed (Simulated)";
    btn.disabled = true;
}

/* Handle encrypted bids */
function submitEncryptedBid(inputId) {
    const input = document.getElementById(inputId);
    const encrypted = encryptData(input.value);

    alert("Encrypted Bid Submitted:\n" + encrypted);

    input.value = "•••••• ETH"; // keep masked
}

/* Confidential auction ZK proof */
function generateConfidentialAuctionProof() {
    const proof = generateZKProof("highest-bid");
    const valid = verifyProof(proof);

    document.getElementById("auctionProofStatus").textContent =
        valid ? " ZK Proof Verified ✔" : " Proof Failed ✖";
}
