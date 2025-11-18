// Basic login simulation
const emailBtn = document.getElementById('emailLoginBtn');
const walletBtn = document.getElementById('walletLoginBtn');
const dashboard = document.getElementById('dashboard');

emailBtn.addEventListener('click', () => {
  alert('Simulated Email Login');
  dashboard.classList.remove('hidden');
});

walletBtn.addEventListener('click', () => {
  alert('Simulated Wallet Connection');
  dashboard.classList.remove('hidden');
});

// Create collection button
const createCollectionBtn = document.getElementById('createCollectionBtn');
const collectionsList = document.getElementById('collectionsList');

createCollectionBtn.addEventListener('click', () => {
  const newCollection = document.createElement('div');
  newCollection.textContent = 'New Confidential Collection (Encrypted)';
  newCollection.className = 'collection-item';
  collectionsList.appendChild(newCollection);
});
