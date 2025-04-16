// funnyinteraction.js

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button, a.btn-download");
    const profileImg = document.querySelector(".profile-img");
  
    // Wiggle buttons on hover
    buttons.forEach(btn => {
      btn.addEventListener("mouseenter", () => {
        btn.style.transform = "rotate(-2deg) scale(1.05)";
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "rotate(0) scale(1)";
      });
    });
  
    // Make profile image wink on hover
    if (profileImg) {
      profileImg.addEventListener("mouseenter", () => {
        profileImg.style.filter = "hue-rotate(45deg) brightness(1.2)";
      });
      profileImg.addEventListener("mouseleave", () => {
        profileImg.style.filter = "none";
      });
    }
  });
  