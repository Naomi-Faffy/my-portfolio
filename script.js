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
    // Profile card clicks (legacy)
    const profileCards = document.querySelectorAll('.profile-card');
    profileCards.forEach(card => {
        card.addEventListener('click', function() {
            const profileType = this.getAttribute('data-profile');
            selectProfile(profileType);
        });
    });
    
    // Neon button clicks
    const neonButtons = document.querySelectorAll('.neon-button');
    neonButtons.forEach(button => {
        button.addEventListener('click', function() {
            const profileType = this.getAttribute('data-profile');
            selectProfile(profileType);
        });
    });
    
    // Add neon sign effects
    setupNeonSignEffects();
    
    // Add sign power-up animation
    startNeonSignAnimation();
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

// Neon Sign Effects
function setupNeonSignEffects() {
    const neonWords = document.querySelectorAll('.neon-word');
    const neonSubTexts = document.querySelectorAll('.neon-sub-text');
    
    // Add click effects to main name words
    neonWords.forEach((word, index) => {
        // Random delay for buzz effect
        word.style.animationDelay = `${Math.random() * 3}s`;
        
        // Add click effect for sign power toggle
        word.addEventListener('click', function() {
            this.style.animation = 'none';
            this.style.textShadow = '0 0 0 transparent';
            this.style.opacity = '0.3';
            
            setTimeout(() => {
                this.style.animation = 'neonBuzz 3s infinite alternate';
                this.style.textShadow = `
                    0 0 5px #e50914,
                    0 0 10px #e50914,
                    0 0 20px #e50914,
                    0 0 30px #e50914,
                    0 0 40px #e50914`;
                this.style.opacity = '1';
            }, 300);
        });
    });
    
    // Add hover effects to subtitle
    neonSubTexts.forEach(subText => {
        subText.addEventListener('mouseenter', function() {
            this.style.textShadow = `
                0 0 8px #00ffff,
                0 0 15px #00ffff,
                0 0 20px #00ffff,
                0 0 25px #00ffff`;
        });
        
        subText.addEventListener('mouseleave', function() {
            this.style.textShadow = `
                0 0 5px #00ff41,
                0 0 10px #00ff41,
                0 0 15px #00ff41`;
        });
    });
}

// Neon Sign Power-Up Animation
function startNeonSignAnimation() {
    const signBoard = document.querySelector('.neon-sign-board');
    const neonWords = document.querySelectorAll('.neon-word');
    const neonSubTexts = document.querySelectorAll('.neon-sub-text');
    const brackets = document.querySelectorAll('.sign-bracket');
    
    if (!signBoard) return;
    
    // Initial state - sign is off
    signBoard.style.opacity = '0';
    signBoard.style.transform = 'rotateX(5deg) scale(0.8)';
    
    neonWords.forEach(word => {
        word.style.textShadow = '0 0 0 transparent';
        word.style.opacity = '0.2';
    });
    
    neonSubTexts.forEach(subText => {
        subText.style.textShadow = '0 0 0 transparent';
        subText.style.opacity = '0.1';
    });
    
    // Power up sequence
    setTimeout(() => {
        // Sign board appears
        signBoard.style.transition = 'all 0.8s ease';
        signBoard.style.opacity = '1';
        signBoard.style.transform = 'rotateX(5deg) scale(1)';
        
        // First flicker - main name
        setTimeout(() => {
            neonWords[0].style.transition = 'all 0.3s ease';
            neonWords[0].style.opacity = '1';
            neonWords[0].style.textShadow = `
                0 0 5px #e50914,
                0 0 10px #e50914,
                0 0 20px #e50914,
                0 0 30px #e50914,
                0 0 40px #e50914`;
        }, 500);
        
        // Second name lights up
        setTimeout(() => {
            neonWords[1].style.transition = 'all 0.3s ease';
            neonWords[1].style.opacity = '1';
            neonWords[1].style.textShadow = `
                0 0 5px #e50914,
                0 0 10px #e50914,
                0 0 20px #e50914,
                0 0 30px #e50914,
                0 0 40px #e50914`;
        }, 1000);
        
        // Subtitle powers up
        setTimeout(() => {
            neonSubTexts.forEach((subText, index) => {
                setTimeout(() => {
                    subText.style.transition = 'all 0.4s ease';
                    subText.style.opacity = '1';
                    subText.style.textShadow = `
                        0 0 5px #00ff41,
                        0 0 10px #00ff41,
                        0 0 15px #00ff41`;
                }, index * 200);
            });
        }, 1500);
        
    }, 100);
}

// Enhanced Navigation with Neon Effects
function showPageWithNeonTransition(pageId) {
    // Add screen flash effect
    const flashOverlay = document.createElement('div');
    flashOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(229,9,20,0.3) 0%, transparent 70%);
        z-index: 9998;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.2s ease;
    `;
    
    document.body.appendChild(flashOverlay);
    
    // Flash effect
    setTimeout(() => {
        flashOverlay.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        flashOverlay.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(flashOverlay);
        }, 200);
    }, 100);
    
    // Navigate to page
    setTimeout(() => {
        showPage(pageId);
    }, 150);
}

// Add Matrix-style digital rain effect (optional enhancement)
function createDigitalRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 0;
        pointer-events: none;
        opacity: 0.1;
    `;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '01TAFARA CHITIYO CYBERSECURITY NETWORK10110010';
    const charArray = chars.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#e50914';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const browseContainer = document.querySelector('.neon-landing-container');
    if (browseContainer) {
        browseContainer.appendChild(canvas);
        setInterval(draw, 33);
    }
}

// Add glitch effect to buttons on hover
function addButtonGlitchEffects() {
    const neonButtons = document.querySelectorAll('.neon-button');
    
    neonButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const buttonText = this.querySelector('.button-title');
            const originalText = buttonText.textContent;
            
            // Glitch effect
            let glitchCount = 0;
            const glitchInterval = setInterval(() => {
                const glitchChars = '!@#$%^&*()_+-={}[]|:";\'<>?,./~`';
                let glitchedText = '';
                
                for (let i = 0; i < originalText.length; i++) {
                    if (Math.random() > 0.8) {
                        glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    } else {
                        glitchedText += originalText[i];
                    }
                }
                
                buttonText.textContent = glitchedText;
                glitchCount++;
                
                if (glitchCount > 3) {
                    clearInterval(glitchInterval);
                    buttonText.textContent = originalText;
                }
            }, 50);
        });
    });
}

// Enhanced mobile touch effects
function addMobileTouchEffects() {
    if ('ontouchstart' in window) {
        const neonButtons = document.querySelectorAll('.neon-button');
        
        neonButtons.forEach(button => {
            button.addEventListener('touchstart', function(e) {
                const touch = e.touches[0];
                const ripple = document.createElement('div');
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(229,9,20,0.4) 0%, transparent 70%);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = (touch.clientX - rect.left - size / 2) + 'px';
                ripple.style.top = (touch.clientY - rect.top - size / 2) + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
        });
        
        // Add ripple animation to CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize all neon effects
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        createDigitalRain();
        addButtonGlitchEffects();
        addMobileTouchEffects();
    }, 2500); // After loading screen with name animation
});

// Console easter egg with neon ASCII art
console.log(`
%c
████████  █████  ███████  █████  ██████   █████  
   ██    ██   ██ ██      ██   ██ ██   ██ ██   ██ 
   ██    ███████ █████   ███████ ██████  ███████ 
   ██    ██   ██ ██      ██   ██ ██   ██ ██   ██ 
   ██    ██   ██ ██      ██   ██ ██   ██ ██   ██ 

 ██████ ██   ██ ██ ████████ ██ ██    ██  ██████  
██      ██   ██ ██    ██    ██  ██  ██  ██    ██ 
██      ███████ ██    ██    ██   ████   ██    ██ 
██      ██   ██ ██    ██    ██    ██    ██    ██ 
 ██████ ██   ██ ██    ██    ██    ██     ██████  

%c🚀 Welcome to Tafara Chitiyo's Neon Portfolio!
📧 Contact: faffynaomi@gmail.com
💼 LinkedIn: linkedin.com/in/tafara-chitiyo
🎯 Specializing in Network & Cybersecurity

This portfolio features:
✨ Your name in neon lights on loading screen
🧱 Realistic neon sign on brick wall
🎨 Cyberpunk-inspired design  
⚡ Interactive click effects on your name
📱 Touch-optimized interface
🔥 Modern web technologies

Thanks for exploring the code! 🔍`, 
'color: #e50914; font-family: monospace; font-size: 8px;',
'color: #00ff41; font-family: monospace; font-size: 12px;'
);