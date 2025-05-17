
// Light/Dark mode toggle
const modeToggleBtn = document.getElementById('mode-toggle');
modeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    modeToggleBtn.textContent = '☀️';
  } else {
    modeToggleBtn.textContent = '🌙';
  }
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

// Contact form validation and simple submission simulation
const form = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formMessage.textContent = 'Please fill out all fields.';
    formMessage.style.color = '#D46A9F';
    return;
  }

  if (!validateEmail(email)) {
    formMessage.textContent = 'Please enter a valid email address.';
    formMessage.style.color = '#D46A9F';
    return;
  }

  formMessage.style.color = '#7D3C98';
  formMessage.textContent = 'Thank you for your message! I will get back to you soon.';

  form.reset();
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}
