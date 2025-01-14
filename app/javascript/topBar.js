document.addEventListener("DOMContentLoaded", () => {
    const expBarProgress = document.querySelector(".exp-bar-progress");
    const expBarText = document.querySelector(".exp-bar-text");
    const expBarLevel = document.querySelector(".exp-bar-level");
    const coinDisplay = document.querySelector(".coin-display"); // Selector for coins
    const diamondDisplay = document.querySelector(".diamond-display"); // Selector for diamonds
  
    // Fetch user data from the endpoint
    fetch("/user_data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        return response.json();
      })
      .then((data) => {
        const { exp, exp_required, level, coins, diamonds } = data;
  
        // Calculate percentage of progress
        const progressPercent = (exp / exp_required) * 100;
  
        // Update EXP bar
        if (expBarProgress) {
          expBarProgress.style.width = `${progressPercent}%`;
        }
  
        // Update EXP text
        if (expBarText) {
          expBarText.textContent = `${exp} / ${exp_required} EXP`;
        }
  
        // Update Level Indicator
        if (expBarLevel) {
          expBarLevel.textContent = `Lv ${level}`;
        }
  
        // Update Coin Display
        if (coinDisplay) {
          coinDisplay.textContent = `${coins} Coins`;
        }
  
        // Update Diamond Display
        if (diamondDisplay) {
          diamondDisplay.textContent = `${diamonds} Diamonds`;
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  });
  