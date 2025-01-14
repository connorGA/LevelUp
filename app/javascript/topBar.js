document.addEventListener("DOMContentLoaded", () => {
  const expBarProgress = document.querySelector(".exp-bar-progress");
  const expBarText = document.querySelector(".exp-bar-text");

  // Fetch user data from the endpoint
  fetch("/user_data")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }
      return response.json();
    })
    .then((data) => {
      const { exp, exp_required, level } = data;

      // Calculate percentage of progress
      const progressPercent = (exp / exp_required) * 100;

      // Update EXP bar width
      if (expBarProgress) {
        expBarProgress.style.width = `${progressPercent}%`;
      }

      // Update EXP text with level
      if (expBarText) {
        expBarText.textContent = `Lv. ${level} ${exp} / ${exp_required} EXP`;
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
});
