// scrollanimation.js

document.addEventListener("DOMContentLoaded", () => {
    const animatedElements = document.querySelectorAll(".fade-in, .slide-in");
  
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px" // Starts animation just before element enters view
    };
  
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target); // Trigger once
        }
      });
    }, observerOptions);
  
    animatedElements.forEach(el => observer.observe(el));
  });
  