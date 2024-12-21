// Smooth Scroll for Navigation Links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add Scroll Animations
const animatedElements = document.querySelectorAll('.animated');

const handleScroll = () => {
    animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// Highlight Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

const highlightNav = () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', highlightNav);

// Interactive Animations for Projects
const projectLinks = document.querySelectorAll('.project a');

projectLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        link.style.transform = 'scale(1.1)';
        link.style.transition = 'transform 0.3s ease-in-out';
    });

    link.addEventListener('mouseout', () => {
        link.style.transform = 'scale(1)';
    });
});
