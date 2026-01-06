// ===================================
// Mobile Menu Toggle
// ===================================
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===================================
// Smooth Scrolling for Navigation Links
// ===================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Projects Slider Functionality
// ===================================
class Slider {
    constructor(trackId, dotsId, prevId, nextId) {
        this.track = document.getElementById(trackId);
        this.dotsContainer = document.getElementById(dotsId);
        this.prevBtn = document.getElementById(prevId);
        this.nextBtn = document.getElementById(nextId);
        this.cards = this.track.children;
        this.currentIndex = 0;
        this.cardWidth = 0;
        this.gap = 30;
        this.visibleCards = 1;
        
        this.init();
    }
    
    init() {
        this.calculateDimensions();
        this.createDots();
        this.updateSlider();
        this.attachEventListeners();
        
        // Recalculate on window resize
        window.addEventListener('resize', () => {
            this.calculateDimensions();
            this.updateSlider();
        });
    }
    
    calculateDimensions() {
        if (this.cards.length > 0) {
            this.cardWidth = this.cards[0].offsetWidth;
            
            // Calculate visible cards based on window width
            const windowWidth = window.innerWidth;
            if (windowWidth >= 1024) {
                this.visibleCards = 3;
            } else if (windowWidth >= 768) {
                this.visibleCards = 2;
            } else {
                this.visibleCards = 1;
            }
        }
    }
    
    createDots() {
        this.dotsContainer.innerHTML = '';
        const totalDots = Math.max(0, this.cards.length - this.visibleCards + 1);
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }
    
    updateSlider() {
        const maxIndex = Math.max(0, this.cards.length - this.visibleCards);
        this.currentIndex = Math.min(this.currentIndex, maxIndex);
        
        const offset = -(this.currentIndex * (this.cardWidth + this.gap));
        this.track.style.transform = `translateX(${offset}px)`;
        
        // Update dots
        const dots = this.dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update button states
        this.prevBtn.style.opacity = this.currentIndex === 0 ? '0.5' : '1';
        this.prevBtn.style.pointerEvents = this.currentIndex === 0 ? 'none' : 'auto';
        this.nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.5' : '1';
        this.nextBtn.style.pointerEvents = this.currentIndex >= maxIndex ? 'none' : 'auto';
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
    }
    
    nextSlide() {
        const maxIndex = Math.max(0, this.cards.length - this.visibleCards);
        if (this.currentIndex < maxIndex) {
            this.currentIndex++;
            this.updateSlider();
        }
    }
    
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateSlider();
        }
    }
    
    attachEventListeners() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Touch/Swipe support
        let startX = 0;
        let endX = 0;
        
        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', () => {
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
        
        // Mouse drag support
        let isDragging = false;
        let startDragX = 0;
        let currentDragX = 0;
        
        this.track.addEventListener('mousedown', (e) => {
            isDragging = true;
            startDragX = e.clientX;
            this.track.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            currentDragX = e.clientX;
        });
        
        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            this.track.style.cursor = 'grab';
            
            const diff = startDragX - currentDragX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
}

// Initialize sliders
const projectsSlider = new Slider('projectsTrack', 'projectsDots', 'projectsPrev', 'projectsNext');
const blogsSlider = new Slider('blogsTrack', 'blogsDots', 'blogsPrev', 'blogsNext');

// ===================================
// Contact Form Handling
// ===================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const number = document.getElementById('number').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!fullName || !number || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Phone validation (basic)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(number)) {
        showNotification('Please enter a valid phone number', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Message sent successfully!', 'success');
    
    // Reset form
    contactForm.reset();
    
    // In a real application, you would send this data to a server
    console.log({
        fullName,
        number,
        email,
        subject,
        message
    });
});

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00d4ff, #b537f2)' : 'linear-gradient(135deg, #e74c3c, #c0392b)'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===================================
// Active Section Highlighting
// ===================================
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            
            // Update active nav link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ===================================
// Download Resume Functionality
// ===================================
const downloadBtn = document.querySelector('.btn-primary');

downloadBtn.addEventListener('click', (e) => {
    // Check if resume file exists
    const resumePath = downloadBtn.getAttribute('href');
    
    // You can add custom download logic here
    console.log('Downloading resume...');
    
    // Show notification
    showNotification('Resume download started!', 'success');
});

// ===================================
// Scroll to Top on Page Load
// ===================================
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// ===================================
// Loading Animation
// ===================================
window.addEventListener('load', () => {
    // Add fade-in animation to elements
    const animatedElements = document.querySelectorAll('.profile-container, .about-card, .skill-card, .project-card, .blog-card');
    
    const loadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                loadObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        loadObserver.observe(el);
    });
    
    // Add fade-in animation keyframes
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(animationStyle);
});

// ===================================
// Cursor Trail Effect (Optional)
// ===================================
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// ===================================
// Performance Optimization
// ===================================
// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized resize handler
const handleResize = debounce(() => {
    projectsSlider.calculateDimensions();
    projectsSlider.updateSlider();
    blogsSlider.calculateDimensions();
    blogsSlider.updateSlider();
}, 250);

window.addEventListener('resize', handleResize);

// ===================================
// Prevent Default Form Submission
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
        }
    });
});

console.log('Portfolio loaded successfully!');

// ===================================
// Typing Animation for Roles (FINAL, SAFE)
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const roleEl = document.getElementById('typing-role');
    if (!roleEl) return;

    const roles = [
        "AI/ML Engineer",
        "Data Scientist",
        "Data Analyst",
        "Machine Learning Engineer",
        "Software Developer",
        "Full Stack Developer",
        "Data Engineer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const TYPE_SPEED = 120;
    const DELETE_SPEED = 70;
    const HOLD_DELAY = 1500;

    function typeLoop() {
        const current = roles[roleIndex];

        if (!deleting) {
            roleEl.textContent = current.slice(0, ++charIndex);
            if (charIndex === current.length) {
                setTimeout(() => deleting = true, HOLD_DELAY);
            }
        } else {
            roleEl.textContent = current.slice(0, --charIndex);
            if (charIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
            }
        }

        setTimeout(typeLoop, deleting ? DELETE_SPEED : TYPE_SPEED);
    }

    typeLoop();
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});
