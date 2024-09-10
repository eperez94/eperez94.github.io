// Get the nav panel and toggle button
const navPanel = document.getElementById('navPanel');
const navToggle = document.getElementById('navToggle');
const overlay = document.getElementById('overlay');

// Add event listener to toggle the nav panel
navToggle.addEventListener('click', () => {
  navPanel.classList.toggle('active'); // Toggle the 'active' class to show/hide the panel
  overlay.classList.toggle('active');  // Toggle overlay
});

// Hide nav panel when the overlay is clicked
overlay.addEventListener('click', () => {
  navPanel.classList.remove('active');
  overlay.classList.remove('active');
});
