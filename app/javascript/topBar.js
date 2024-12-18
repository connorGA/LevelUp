document.addEventListener("DOMContentLoaded", () => {
    const expBarProgress = document.querySelector(".exp-bar-progress");
    const expBarText = document.querySelector(".exp-bar-text");
    const expBarLevel = document.querySelector(".exp-bar-level");

    // Example user data (replace with real data from your backend)
    const userExp = 350; // Current EXP
    const expForNextLevel = 500; // Required EXP for the next level
    const userLevel = 5; // Current level

    // Calculate percentage of progress
    const progressPercent = (userExp / expForNextLevel) * 100;

    // Update EXP bar
    expBarProgress.style.width = `${progressPercent}%`;

    // Update EXP text
    expBarText.textContent = `${userExp} / ${expForNextLevel} EXP`;

    // Update Level Indicator
    expBarLevel.textContent = `Lv ${userLevel}`;
});
