// tonggletheme.js

// Toggle Hamburger Menu
function toggleMenu() {
  const menu = document.getElementById('navMenu');
  console.log('Menu toggled:', menu); // Check if menu is selected
  menu.classList.toggle('active');

  const nav = document.querySelector('.nav');
  nav.classList.toggle('active');
}
  
  // Typing Animation for Roles
  document.addEventListener("DOMContentLoaded", () => {
    const typingElement = document.querySelector(".typing-animation");
  
    if (!typingElement) return;
  
    const roles = [
      "Data Analyst",
      "Data Scientist",
      "AI/ML Engineer",
      "Data Engineer",
      "Python Developer",
      "SQL Developer",
      "PowerBI Developer",
      "Tableau Developer",
      "DevOps Engineer",
      "Machine Learning Engineer"
    ];
  
    let currentRoleIndex = 0;
  
    const typeRole = () => {
      const role = roles[currentRoleIndex];
      typingElement.textContent = "";
      let i = 0;
  
      const typingInterval = setInterval(() => {
        typingElement.textContent += role[i];
        i++;
  
        if (i === role.length) {
          clearInterval(typingInterval);
          setTimeout(() => {
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            typeRole();
          }, 1500); // Pause before switching role
        }
      }, 100); // Typing speed
    };
  
    typeRole(); // Initialize animation
  });
  
