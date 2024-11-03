import initializePlot from './plot.js';

document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".bottom-nav button");
    const carouselContainer = document.querySelector(".carousel-container");
    const pages = Array.from(document.querySelectorAll(".carousel-page"));

    let currentIndex = 0;
    let plotInitialized = false; // Flag to track plot initialization

    function updateCarousel(index) {
        carouselContainer.style.transform = `translateX(-${index * 100}vw)`;
        buttons.forEach((button, i) => button.classList.toggle("active", i === index));

        if (index === 2 && !plotInitialized) {
            initializePlot(); // Initialize plot only once
            plotInitialized = true; // Set flag to true after initialization
        } else if (index !== 2 && plotInitialized) {
            // Clear the plot from `plot-container` if navigating away from plot-page
            const plotContainer = document.getElementById("plot-container");
            if (plotContainer) {
                plotContainer.innerHTML = ''; // Remove plot elements
            }
            plotInitialized = false; // Reset the flag
        }
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
