// Simple typewriter effect

const typewriterElement = document.querySelector('.typewriter');
const text = 'Creating with Passion & Style';
let idx = 0;

function type() {
  if (idx < text.length) {
    typewriterElement.textContent += text.charAt(idx);
    idx++;
    setTimeout(type, 100);
  }
}

window.onload = () => {
  type();
};

// Optional: Add a simple alert on button click

document.getElementById('contactBtn').addEventListener('click', () => {
  alert('Thanks for your interest! You can reach me at email@example.com');
});
