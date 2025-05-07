// You can add interactivity here in the future if needed
console.log("Tafara's Portfolio loaded successfully!");

// Optional: Basic scroll behavior enhancement (smooth scrolling)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
