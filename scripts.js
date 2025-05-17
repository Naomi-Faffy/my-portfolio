// Typewriter effect
const typewriterText = "Creating with Passion & Style";
const typewriterElement = document.querySelector(".typewriter");
let index = 0;

function typeWriter() {
  if (index < typewriterText.length) {
    typewriterElement.textContent += typewriterText.charAt(index);
    index++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter();

// Hamburger menu toggle for small screens
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Portfolio filter buttons
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove("active"));
    // Add active to clicked
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    projects.forEach(project => {
      if (filter === "all" || project.dataset.category === filter) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  });
});

// Modal functionality
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalClose = document.querySelector(".modal-close");

projects.forEach(project => {
  project.addEventListener("click", () => {
    openModal(project);
  });
  project.addEventListener("keypress", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(project);
    }
  });
});

function openModal(project) {
  modalTitle.textContent = project.querySelector("h3").textContent;
  modalDescription.textContent = project.querySelector("p").textContent;
  modal.classList.remove("hidden");
  modal.focus();
}

modalClose.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});

// Contact form validation and submission
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm()) {
    alert("Thank you for reaching out! I'll get back to you soon.");
    contactForm.reset();
  }
});

function validateForm() {
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();

  if (!name) {
    alert("Please enter your name.");
    contactForm.name.focus();
    return false;
  }
  if (!email || !validateEmail(email)) {
    alert("Please enter a valid email.");
    contactForm.email.focus();
    return false;
  }
  if (!message) {
    alert("Please enter your message.");
    contactForm.message.focus();
    return false;
  }
  return true;
}

function validateEmail(email) {
  // Simple email regex
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.toLowerCase());
}

// Scroll to contact section on button click
document.getElementById("contactBtn").addEventListener("click", () => {
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
});
