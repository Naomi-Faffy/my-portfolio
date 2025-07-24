// Netflix-style Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the portfolio
    init();
});

function init() {
    // Hide loading screen after 2 seconds
    setTimeout(() => {
        const loadingScreen = document.getElementById('loading-screen');
        const mainContent = document.getElementById('main-content');
        
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
        }, 500);
    }, 2000);

    // Add event listeners
    setupEventListeners();
    
    // Setup navbar scroll effect
    setupNavbarScroll();
}

function setupEventListeners() {
    // Profile card clicks
    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach(card => {
        card.addEventListener('click', function() {
            const profileType = this.getAttribute('data-profile');
            selectProfile(profileType);
        });
    });
}

function selectProfile(profileType) {
    // Update profile avatar and type
    updateProfileView(profileType);
    
    // Navigate to profile page
    showPage('profile-page');
}

function updateProfileView(profileType) {
    const profileAvatarLarge = document.getElementById('profile-avatar-large');
    const profileTypeSpans = document.querySelectorAll('#profile-type, #profile-type-2');
    
    // Remove existing classes
    profileAvatarLarge.className = 'profile-avatar-large';
    
    // Update avatar and text based on profile type
    switch(profileType) {
        case 'recruiter':
            profileAvatarLarge.classList.add('blue-avatar');
            profileAvatarLarge.innerHTML = '<i class="fas fa-briefcase"></i>';
            break;
        case 'developer':
            profileAvatarLarge.classList.add('grey-avatar');
            profileAvatarLarge.innerHTML = '<i class="fas fa-code"></i>';
            break;
        case 'cybersecurity':
            profileAvatarLarge.classList.add('red-avatar');
            profileAvatarLarge.innerHTML = '<i class="fas fa-shield-alt"></i>';
            break;
        case 'student':
            profileAvatarLarge.classList.add('yellow-avatar');
            profileAvatarLarge.innerHTML = '<i class="fas fa-graduation-cap"></i>';
            break;
        default:
            profileAvatarLarge.classList.add('blue-avatar');
            profileAvatarLarge.innerHTML = '<i class="fas fa-briefcase"></i>';
            profileType = 'recruiter';
    }
    
    // Update profile type text
    profileTypeSpans.forEach(span => {
        span.textContent = profileType;
    });
    
    // Update small profile avatar in header
    const profileAvatarSmall = document.querySelector('.profile-avatar-small');
    if (profileAvatarSmall) {
        profileAvatarSmall.className = 'profile-avatar-small';
        profileAvatarSmall.classList.add(profileType === 'recruiter' ? 'blue-avatar' : 
                                        profileType === 'developer' ? 'grey-avatar' :
                                        profileType === 'cybersecurity' ? 'red-avatar' : 'yellow-avatar');
        profileAvatarSmall.innerHTML = profileAvatarLarge.innerHTML;
    }
}

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Update navigation active state
    updateNavigation(pageId);
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function updateNavigation(pageId) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Map page IDs to navigation items
    const pageNavMap = {
        'profile-page': 0,
        'experience-page': 1,
        'skills-page': 2,
        'projects-page': 3,
        'contact-page': 4
    };
    
    // Add active class to corresponding nav link
    const navIndex = pageNavMap[pageId];
    if (navIndex !== undefined && navLinks[navIndex]) {
        navLinks[navIndex].classList.add('active');
    }
}

function goToBrowse() {
    showPage('browse-page');
}

function setupNavbarScroll() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// Smooth scrolling for internal links
function smoothScroll(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add hover effects for interactive elements
function addHoverEffects() {
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-section');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Initialize hover effects
document.addEventListener('DOMContentLoaded', addHoverEffects);

// Handle window resize
window.addEventListener('resize', function() {
    // Adjust layout if needed
    adjustLayoutForMobile();
});

function adjustLayoutForMobile() {
    const isMobile = window.innerWidth <= 768;
    const profileInfo = document.querySelector('.profile-info');
    
    if (profileInfo) {
        if (isMobile) {
            profileInfo.style.flexDirection = 'column';
            profileInfo.style.textAlign = 'center';
        } else {
            profileInfo.style.flexDirection = 'row';
            profileInfo.style.textAlign = 'left';
        }
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key to go back to browse
    if (e.key === 'Escape') {
        goToBrowse();
    }
    
    // Arrow keys for navigation
    if (e.key === 'ArrowRight') {
        navigateNext();
    } else if (e.key === 'ArrowLeft') {
        navigatePrevious();
    }
});

function navigateNext() {
    const currentPage = document.querySelector('.page.active');
    const pages = ['browse-page', 'profile-page', 'experience-page', 'skills-page', 'projects-page', 'contact-page'];
    const currentIndex = pages.indexOf(currentPage.id);
    
    if (currentIndex < pages.length - 1) {
        showPage(pages[currentIndex + 1]);
    }
}

function navigatePrevious() {
    const currentPage = document.querySelector('.page.active');
    const pages = ['browse-page', 'profile-page', 'experience-page', 'skills-page', 'projects-page', 'contact-page'];
    const currentIndex = pages.indexOf(currentPage.id);
    
    if (currentIndex > 0) {
        showPage(pages[currentIndex - 1]);
    }
}

// Add loading states for external links
function handleExternalLinks() {
    const externalLinks = document.querySelectorAll('a[href^="http"], a[href^="mailto"], a[href^="tel"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add loading state
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            // Reset after 2 seconds
            setTimeout(() => {
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
            }, 2000);
        });
    });
}

// Initialize external link handlers
document.addEventListener('DOMContentLoaded', handleExternalLinks);

// Add intersection observer for animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.timeline-item, .skill-card, .project-card, .contact-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(setupScrollAnimations, 2500); // After loading screen
});

// Add touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next page
            navigateNext();
        } else {
            // Swipe right - previous page
            navigatePrevious();
        }
    }
}

// Add custom cursor effect (optional)
function addCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: #e50914;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
}

// Initialize custom cursor on desktop
if (window.innerWidth > 768) {
    document.addEventListener('DOMContentLoaded', addCustomCursor);
}

// Error handling for missing images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace with a placeholder or hide
            this.style.display = 'none';
        });
    });
});

// Performance optimization - lazy loading
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Console easter egg
console.log(`
🚀 Welcome to Tafara Chitiyo's Portfolio!
📧 Contact: faffynaomi@gmail.com
💼 LinkedIn: linkedin.com/in/tafara-chitiyo
🎯 Specializing in Network & Cybersecurity

This portfolio was built with:
- HTML5 & CSS3
- Vanilla JavaScript
- Netflix-inspired Design
- Responsive Layout
- Modern Web Standards

Thanks for checking out the code! 🔍
`);