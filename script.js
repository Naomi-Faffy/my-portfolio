// Light/Dark mode toggle with localStorage persistence
const modeToggleBtn = document.getElementById('mode-toggle');

function setMode(dark) {
  if (dark) {
    document.body.classList.add('dark');
    modeToggleBtn.textContent = '☀️'; // Sun icon
    localStorage.setItem('darkMode', 'enabled');
  } else {
    document.body.classList.remove('dark');
    modeToggleBtn.textContent = '🌙'; // Moon icon
    localStorage.setItem('darkMode', 'disabled');
  }
}

// Initialize mode on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedMode = localStorage.getItem('darkMode');
  if (savedMode === 'enabled') {
    setMode(true);
  } else {
    setMode(false);
  }
});

modeToggleBtn.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  setMode(!isDark);
});

// Typewriter effect for intro text
const typewriterElement = document.querySelector('.typewriter');
const phrases = [
  'Front-End Developer 💻',
  'Graphic Designer 🎨',
  'Creative Thinker 💡',
  'Tech Enthusiast 🚀'
];
let phraseIndex = 0;
let letterIndex = 0;
let currentPhrase = '';
let isDeleting = false;
const typingSpeed = 120;

function type() {
  if (!isDeleting && letterIndex <= phrases[phraseIndex].length) {
    currentPhrase = phrases[phraseIndex].slice(0, letterIndex++);
    typewriterElement.textContent = currentPhrase;
  } else if (isDeleting && letterIndex >= 0) {
    currentPhrase = phrases[phraseIndex].slice(0, letterIndex--);
    typewriterElement.textContent = currentPhrase;
  }

  if (!isDeleting && letterIndex === phrases[phraseIndex].length + 1) {
    isDeleting = true;
    setTimeout(type, 1500);
    return;
  } else if (isDeleting && letterIndex === -1) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }
  setTimeout(type, isDeleting ? typingSpeed / 2 : typingSpeed);
}
type();

// Skills progress bar animation on scroll
const progressBars = document.querySelectorAll('.progress');

function animateSkills() {
  progressBars.forEach(bar => {
    const progressPercent = bar.getAttribute('data-progress');
    bar.style.width = progressPercent + '%';
  });
}

function checkScroll() {
  const skillsSection = document.getElementById('skills');
  const sectionPos = skillsSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight / 1.3;

  if (sectionPos < screenPos) {
    animateSkills();
    window.removeEventListener('scroll', checkScroll);
  }
}

window.addEventListener('scroll', checkScroll);

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projects.forEach(project => {
      if (filter === 'all' || project.getAttribute('data-category') === filter) {
        project.style.display = 'block';
      } else {
        project.style.display = 'none';
      }
    });
  });
});

(function() {
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!form) return; // safety check

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        formMessage.style.color = '#D46A9F';
        formMessage.textContent = 'Please fill out all fields.';
        return;
      }

      if (!validateEmail(email)) {
        formMessage.style.color = '#D46A9F';
        formMessage.textContent = 'Please enter a valid email address.';
        return;
      }

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        const data = await response.json();

        if (response.ok) {
          formMessage.style.color = '#7D3C98';
          formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
          form.reset();
        } else if (data?.errors) {
          formMessage.style.color = '#D46A9F';
          formMessage.textContent = data.errors.map(err => err.message).join(", ");
        } else {
          formMessage.style.color = '#D46A9F';
          formMessage.textContent = 'Oops! Something went wrong. Please try again.';
        }
      } catch (error) {
        formMessage.style.color = '#D46A9F';
        formMessage.textContent = 'Error sending message. Check your connection.';
      }
    });

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email.toLowerCase());
    }
  });
})();
