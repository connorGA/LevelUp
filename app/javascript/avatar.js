document.addEventListener("DOMContentLoaded", () => {
    const avatarSection = document.getElementById("avatar-page-content");
  
    if (avatarSection) {
      console.log("Avatar page loaded");
  
      const toggleButton = document.getElementById("avatar-customization-toggle");
      const options = document.getElementById("avatar-customization-options");
  
      toggleButton.addEventListener("click", () => {
        options.style.display =
          options.style.display === "none" ? "block" : "none";
      });
  
      // Example for avatar rendering (Using Three.js)
      const canvas = document.getElementById("avatar-canvas");
      if (canvas) {
        // Initialize Three.js and draw avatar here
        console.log("Canvas found, initializing avatar rendering...");
      }
    }
  });
  