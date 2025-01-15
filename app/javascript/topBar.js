document.addEventListener("DOMContentLoaded", () => {
  const expBarProgress = document.querySelector(".exp-bar-progress");
  const expBarText = document.querySelector(".exp-bar-text");

  // Function to update the EXP bar dynamically
  function updateExpBar() {
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
  }

  // Handle task completion
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("complete-task")) {
      const button = event.target;
      const taskId = button.closest(".task").dataset.taskId;

      // Prevent multiple requests by disabling the button
      if (button.disabled) return; // Prevent duplicate clicks
      button.disabled = true;

      fetch(`/tasks/${taskId}/complete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document.querySelector("meta[name='csrf-token']").content,
        },
      })
        .then((response) => {
          button.disabled = false; // Re-enable button after response
          if (!response.ok) {
            throw new Error("Failed to complete task.");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Task completed successfully:", data);
          if (data.success) {
            updateExpBar(); // Update the EXP bar dynamically
            button.textContent = "Completed"; // Update button text
            button.disabled = true; // Disable the button permanently
            button.closest(".task").classList.add("completed"); // Mark task as completed visually
          } else {
            console.error("Task completion failed:", data.errors);
            alert(data.errors.join("\n"));
          }
        })
        .catch((error) => {
          button.disabled = false; // Re-enable button on error
          console.error("Error completing task:", error);
        });
    }
  });
});
