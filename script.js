// 1. Smooth Scroll Functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 2. Dark Mode Toggle
const toggleButton = document.querySelector("#dark-mode-toggle");
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// 3. Scroll Animations with AOS (Animate On Scroll)
AOS.init({
    duration: 1000,  // Animation duration (in ms)
    once: true,      // Trigger animation only once
});

// 4. Lazy Loading for Images
document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// 5. Form Validation (Example: Contact Form)
document.querySelector("#contact-form").addEventListener("submit", function(e) {
    const email = document.querySelector("#email").value;
    const message = document.querySelector("#message").value;

    if (!email || !message) {
        e.preventDefault();
        alert("Please fill in both fields.");
    }
});

// 6. Google Analytics Tracking Example
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
}

// Example usage
trackEvent('button', 'click', 'Contact Button');

// 7. Responsive Navbar Toggle
const menuToggleButton = document.querySelector("#menu-toggle");
const navbar = document.querySelector(".navbar");

menuToggleButton.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

// 8. Project Display (Dynamic Loading Example)
fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        const projectContainer = document.querySelector("#projects-container");
        data.projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.classList.add('project');
            projectElement.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            `;
            projectContainer.appendChild(projectElement);
        });
    })
    .catch(error => console.error('Error loading projects:', error));

// 9. Scroll to Top Button
const scrollToTopButton = document.querySelector("#scroll-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollToTopButton.classList.add("visible");
    } else {
        scrollToTopButton.classList.remove("visible");
    }
});

scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// 10. Custom Hover Animation for Project Links
document.querySelectorAll('.project a').forEach(link => {
    link.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
        this.style.transition = 'transform 0.2s ease-in-out';
    });
    link.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});

// 11. Hover Effects for Skill Bubbles
const skillBubbles = document.querySelectorAll('.skill-bubble');
skillBubbles.forEach(skill => {
    skill.addEventListener('mouseover', () => {
        skill.style.transform = 'scale(1.1)';
        skill.style.transition = 'transform 0.2s ease-in-out';
    });
    skill.addEventListener('mouseout', () => {
        skill.style.transform = 'scale(1)';
    });
});

// 12. Sticky Header Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// 13. Reveal Project Cards on Scroll
const projects = document.querySelectorAll('.project');
const revealOnScroll = () => {
    const triggerPoint = window.innerHeight / 5 * 4; // Trigger at 80% of the viewport height
    projects.forEach(project => {
        const projectTop = project.getBoundingClientRect().top;
        if (projectTop < triggerPoint) {
            project.classList.add('visible');
        }
    });
};
window.addEventListener('scroll', revealOnScroll);

// 14. Hide/Show Navbar on Scroll (Hide on scroll down, Show on scroll up)
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        nav.style.top = "-60px";  // Hide the navbar
    } else {
        nav.style.top = "0";  // Show the navbar
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
}, false);

// 15. Dynamic Header Background Color on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 200) {
        header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    } else {
        header.style.backgroundColor = 'transparent';
    }
});

// 16. Chatbot Functionality
function sendMessage() {
    var userInput = document.getElementById("userInput").value;
    var chatBox = document.getElementById("chatBox");

    if(userInput.trim() !== "") {
        chatBox.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
        chatBox.innerHTML += `<p class="bot-message">Thank you for your feedback!</p>`;
        document.getElementById("userInput").value = "";
    }
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}
