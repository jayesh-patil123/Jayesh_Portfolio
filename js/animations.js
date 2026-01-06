// ===================================
// Advanced Animations & Effects
// ===================================

// ===================================
// Parallax Background Effect
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.section');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.backgroundPositionY = `${yPos}px`;
    });
});

// ===================================
// Typing Animation for Tagline
// ===================================
class TypeWriter {
    constructor(element, words, wait = 3000) {
        this.element = element;
        this.words = words;
        this.text = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.isDeleting = false;
        this.type();
    }
    
    type() {
        const current = this.wordIndex % this.words.length;
        const fullText = this.words[current];
        
        if (this.isDeleting) {
            this.text = fullText.substring(0, this.text.length - 1);
        } else {
            this.text = fullText.substring(0, this.text.length + 1);
        }
        
        this.element.innerHTML = `<span class="typing-text">${this.text}</span><span class="cursor">|</span>`;
        
        let typeSpeed = 100;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.text === fullText) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.text === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typing animation for tagline (optional)
const taglineElement = document.querySelector('.tagline');
if (taglineElement) {
    // Store original text
    const originalText = taglineElement.textContent;
    
    // Add cursor style
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .cursor {
            animation: blink 0.7s infinite;
            font-weight: 100;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;
    document.head.appendChild(cursorStyle);
}


// ===================================
// Floating Animation for Profile Image
// ===================================
const profileImage = document.querySelector('.profile-image-wrapper');

if (profileImage) {
    let floatDirection = 1;
    let floatPosition = 0;
    
    setInterval(() => {
        floatPosition += floatDirection * 0.5;
        
        if (floatPosition > 10 || floatPosition < -10) {
            floatDirection *= -1;
        }
        
        profileImage.style.transform = `translateY(${floatPosition}px)`;
    }, 50);
}

// ===================================
// Skill Card Hover Effect with Particles
// ===================================
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        createParticles(e.currentTarget);
    });
});

function createParticles(element) {
    const particleCount = 5;
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 3;
        const startX = rect.left + rect.width / 2;
        const startY = rect.top + rect.height / 2;
        const angle = (Math.PI * 2 * i) / particleCount;
        const velocity = 50 + Math.random() * 50;
        
        particle.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: var(--neon-blue);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${startX}px;
            top: ${startY}px;
            box-shadow: 0 0 10px var(--neon-blue);
        `;
        
        document.body.appendChild(particle);
        
        const endX = startX + Math.cos(angle) * velocity;
        const endY = startY + Math.sin(angle) * velocity;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            { 
                transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => particle.remove();
    }
}

// ===================================
// Scroll Progress Indicator
// ===================================
function createScrollIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'scroll-indicator';
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, var(--neon-blue), var(--neon-purple));
        z-index: 9999;
        transition: width 0.1s ease;
        box-shadow: 0 0 10px var(--neon-blue);
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        indicator.style.width = `${scrolled}%`;
    });
}

createScrollIndicator();

// ===================================
// Magnetic Button Effect
// ===================================
const buttons = document.querySelectorAll('.btn, .social-link');

buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// ===================================
// Glitch Effect for Section Titles
// ===================================
const sectionTitles = document.querySelectorAll('.section-title');

sectionTitles.forEach(title => {
    title.addEventListener('mouseenter', function() {
        const originalText = this.textContent;
        const glitchChars = '!<>-_\\/[]{}—=+*^?#________';
        let iteration = 0;
        
        const interval = setInterval(() => {
            this.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iteration) {
                        return originalText[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');
            
            if (iteration >= originalText.length) {
                clearInterval(interval);
            }
            
            iteration += 1 / 3;
        }, 30);
    });
});

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.skill-card, .project-card, .blog-card, .about-card').forEach(el => {
    animateOnScroll.observe(el);
});

// Add animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    .skill-card, .project-card, .blog-card, .about-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(animationStyles);

// ===================================
// Ripple Effect on Click
// ===================================
document.addEventListener('click', (e) => {
    // ❗ DO NOT interfere with anchor navigation
    if (e.target.closest('a')) return;

    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        position: fixed;
        border-radius: 50%;
        background: rgba(0, 212, 255, 0.6);
        pointer-events: none;
        z-index: 9999;
        width: 20px;
        height: 20px;
        left: ${e.clientX - 10}px;
        top: ${e.clientY - 10}px;
    `;

    document.body.appendChild(ripple);

    ripple.animate(
        [
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(20)', opacity: 0 }
        ],
        { duration: 600, easing: 'ease-out' }
    ).onfinish = () => ripple.remove();
});

// ===================================
// Mouse Trail Effect
// ===================================
const trail = [];
const trailLength = 20;

document.addEventListener('mousemove', (e) => {
    trail.push({ x: e.clientX, y: e.clientY });
    
    if (trail.length > trailLength) {
        trail.shift();
    }
    
    drawTrail();
});

function drawTrail() {
    const existingTrails = document.querySelectorAll('.mouse-trail');
    existingTrails.forEach(t => t.remove());
    
    trail.forEach((point, index) => {
        const dot = document.createElement('div');
        dot.className = 'mouse-trail';
        const size = (index / trailLength) * 8;
        const opacity = index / trailLength;
        
        dot.style.cssText = `
            position: fixed;
            width: ${size}px;
            height: ${size}px;
            background: var(--neon-blue);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            left: ${point.x}px;
            top: ${point.y}px;
            opacity: ${opacity * 0.5};
            box-shadow: 0 0 ${size * 2}px var(--neon-blue);
            transition: all 0.1s ease;
        `;
        
        document.body.appendChild(dot);
        
        setTimeout(() => dot.remove(), 50);
    });
}

// ===================================
// Card Tilt Effect
// ===================================
const cards = document.querySelectorAll('.project-card, .blog-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// ===================================
// Neon Glow Animation
// ===================================
function animateNeonGlow() {
    const neonElements = document.querySelectorAll('.profile-image, .btn-primary, .neon-circle');

    neonElements.forEach(element => {
        const intensity = Math.sin(Date.now() * 0.001) * 0.5 + 0.5; // 🔽 slowed
        if (element.classList.contains('profile-image')) {
            element.style.boxShadow = `0 0 ${30 + intensity * 20}px rgba(0, 212, 255, ${0.5 + intensity * 0.3})`;
        }
    });

    requestAnimationFrame(animateNeonGlow);
}


// ===================================
// Constellation Background Effect
// ===================================
function createConstellation() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        opacity: 0.3;
    `;
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function Particle() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = Math.random() * 0.5 - 0.25;
        this.vy = Math.random() * 0.5 - 0.25;
        this.radius = Math.random() * 2;
    }
    
    Particle.prototype.update = function() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    };
    
    function init() {
        particles = [];
        for (let i = 0; i < 60; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 212, 255, 0.8)';
            ctx.fill();
            
            particles.forEach(other => {
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    resize();
    init();
    animate();
    
    window.addEventListener('resize', () => {
        resize();
        init();
    });
}

console.log('Advanced animations loaded!');