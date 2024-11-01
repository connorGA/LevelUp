document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".bottom-nav button");
    const carouselContainer = document.querySelector(".carousel-container");
    const pages = Array.from(document.querySelectorAll(".carousel-page"));
    
    let currentIndex = 0;
  
    function updateCarousel(index) {
      carouselContainer.style.transform = `translateX(-${index * 100}vw)`;
      buttons.forEach((button, i) => button.classList.toggle("active", i === index));
    }
  
    // Button navigation
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        currentIndex = index;
        updateCarousel(index);
      });
    });
  
    // Swipe navigation
    let startX = 0;
    carouselContainer.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });
  
    carouselContainer.addEventListener("touchend", (e) => {
      const deltaX = e.changedTouches[0].clientX - startX;
      if (deltaX > 50 && currentIndex > 0) {
        currentIndex -= 1;
      } else if (deltaX < -50 && currentIndex < pages.length - 1) {
        currentIndex += 1;
      }
      updateCarousel(currentIndex);
    });
  });
