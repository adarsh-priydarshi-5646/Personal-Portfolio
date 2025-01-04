// JavaScript to toggle the navbar visibility
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
  navbar.classList.toggle('open');
});


const offlineContainer = document.querySelector('.offline-container');

function checkConnection() {
  if (!navigator.onLine) {
    offlineContainer.style.display = 'flex';
  } else {
    offlineContainer.style.display = 'none';
  }
}

window.addEventListener('offline', checkConnection);
window.addEventListener('online', checkConnection);

checkConnection();
