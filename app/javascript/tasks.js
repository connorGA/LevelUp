document.addEventListener("DOMContentLoaded", () => {
  const csrfToken = document.querySelector("meta[name='csrf-token']").content;

  // Calendar Highlight
  const currentDate = new Date();
  document.querySelectorAll(".calendar-day").forEach((day) => {
    const dayNumber = parseInt(day.textContent, 10);
    const monthElement = day.closest(".calendar-month");
    const currentMonth = currentDate
      .toLocaleString("default", { month: "long" })
      .toLowerCase();

    if (
      monthElement.classList.contains(currentMonth) &&
      dayNumber === currentDate.getDate()
    ) {
      day.classList.add("current-day");
    }
  });

  // Show/hide duration input
  const durationTypeInput = document.getElementById("task_duration_type");
  if (durationTypeInput) {
    durationTypeInput.addEventListener("change", () => {
      const durationInput = document.getElementById("duration_input");
      durationInput.style.display =
        durationTypeInput.value === "timed" ? "block" : "none";
    });
  }

  const taskList = document.getElementById("task-list");

  // CREATE Task
  const newTaskForm = document.getElementById("new-task-form");
  if (newTaskForm) {
    newTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(newTaskForm);
      const taskData = {};

      // Clean up form keys (e.g., task[name] -> name)
      formData.forEach((value, key) => {
        const cleanKey = key.replace(/^task\[/, "").replace(/\]$/, "");
        taskData[cleanKey] = value;
      });

      fetch("/tasks", {
        method: "POST",
        headers: {
          "X-CSRF-Token": csrfToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: taskData }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.task) {
            taskList.insertAdjacentHTML("beforeend", renderTaskCard(data.task));
            newTaskForm.reset();
          } else {
            alert(data.errors.join("\n"));
          }
        })
        .catch((error) => console.error("Error creating task:", error));
    });
  }

  // Task Actions: Complete, Reset, Edit, Delete
  if (taskList) {
    taskList.addEventListener("click", (e) => {
      const taskCard = e.target.closest(".task");
      if (!taskCard) return;

      const taskId = taskCard.dataset.taskId;

      // COMPLETE Task
  if (e.target.classList.contains("complete-task")) {
    fetch(`/tasks/${taskId}/complete`, {
      method: "POST",
      headers: { "X-CSRF-Token": csrfToken },
    })
      .then((res) => res.json())
      .then(() => {
        // Add the "completed" class to the task card
        taskCard.classList.add("completed");

        // Update the button
        const completeButton = taskCard.querySelector(".complete-task");
        if (completeButton) {
          completeButton.textContent = "Completed";
          completeButton.classList.add("completed-task");
          completeButton.disabled = true;
        }

        // Optionally, you can disable other buttons if needed
      })
      .catch((error) => console.error("Error completing task:", error));
  }

  // RESET Task
  if (e.target.classList.contains("reset-task")) {
    fetch(`/tasks/${taskId}/reset`, {
      method: "POST",
      headers: { "X-CSRF-Token": csrfToken },
    })
      .then((res) => res.json())
      .then(() => {
        // Remove the "completed" class from the task card
        taskCard.classList.remove("completed");

        // Update the button
        const resetButton = taskCard.querySelector(".reset-task");
        if (resetButton) {
          resetButton.textContent = "Complete Task";
          resetButton.classList.remove("completed-task");
          resetButton.disabled = false;
        }
      })
      .catch((error) => console.error("Error resetting task:", error));
  }


      // EDIT Task
      if (e.target.classList.contains("edit-task")) {
        const taskDisplay = taskCard.querySelector(".task-display");
        const editForm = taskCard.querySelector(".edit-task-form");

        if (taskDisplay && editForm) {
          taskDisplay.style.display = "none";
          editForm.style.display = "block";

          // Ensure button formatting is correct
          const formButtons = editForm.querySelectorAll("button");
          formButtons.forEach((btn) => {
            btn.style.display = "inline-block";
            btn.style.padding = "0.5em 1em";
            btn.style.margin = "8px auto";
            btn.style.borderRadius = "8px";
            btn.style.width = "fit-content";
          });
        }
      }

      // CANCEL Edit
      if (e.target.classList.contains("cancel-edit")) {
        const taskDisplay = taskCard.querySelector(".task-display");
        const editForm = taskCard.querySelector(".edit-task-form");

        if (taskDisplay && editForm) {
          editForm.style.display = "none";
          taskDisplay.style.display = "block";

          // Restore button formatting
          const actionButtons = taskDisplay.querySelectorAll(
            ".action-button, .edit-task, .delete-task"
          );
          actionButtons.forEach((btn) => {
            btn.style.display = "block";
            btn.style.width = "100%";
          });

          const editButton = taskDisplay.querySelector(".edit-task");
          if (editButton) {
            editButton.style.margin = "24px 0px 8px 0px";
          }
        }
      }

      // DELETE Task
      if (e.target.classList.contains("delete-task")) {
        if (confirm("Are you sure you want to delete this task?")) {
          fetch(`/tasks/${taskId}`, {
            method: "DELETE",
            headers: { "X-CSRF-Token": csrfToken },
          })
            .then(() => taskCard.remove())
            .catch((error) => console.error("Error deleting task:", error));
        }
      }
    });

    // Handle EDIT form submission
    taskList.addEventListener("submit", (e) => {
      if (e.target.classList.contains("edit-task-form")) {
        e.preventDefault();

        const taskCard = e.target.closest(".task");
        const taskId = taskCard.dataset.taskId;
        const formData = new FormData(e.target);

        fetch(`/tasks/${taskId}`, {
          method: "PUT",
          headers: { "X-CSRF-Token": csrfToken },
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.task) {
              // Update task display
              taskCard.querySelector(".task-title").textContent = data.task.name;
              taskCard.querySelector(".task-description").textContent =
                data.task.description;
              taskCard.querySelector(
                ".task-duration"
              ).textContent = `Duration: ${
                data.task.duration_type === "timed"
                  ? `${data.task.duration} minutes`
                  : "Complete/Incomplete"
              }`;
              taskCard.querySelector(".task-display").style.display = "block";
              taskCard.querySelector(".edit-task-form").style.display = "none";

              // Restore button formatting
              const actionButtons = taskCard.querySelectorAll(
                ".action-button, .edit-task, .delete-task"
              );
              actionButtons.forEach((btn) => {
                btn.style.display = "block";
                btn.style.width = "100%";
              });

              const editButton = taskCard.querySelector(".edit-task");
              if (editButton) {
                editButton.style.margin = "24px 0px 8px 0px";
              }

              // Ensure edit form buttons retain proper styling
              const formButtons = taskCard.querySelectorAll(".edit-task-form button");
              formButtons.forEach((btn) => {
                btn.style.display = "inline-block";
                btn.style.padding = "0.5em 1em";
                btn.style.margin = "8px auto";
                btn.style.borderRadius = "8px";
                btn.style.width = "fit-content";
              });
            } else {
              alert("Failed to update task.");
            }
          })
          .catch((error) => console.error("Error updating task:", error));
      }
    });
  }

  // Sparkles for yearly tasks
  document.querySelectorAll(".task.yearly").forEach((card) => {
    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement("div");
      sparkle.classList.add("sparkle");
      card.appendChild(sparkle);
      sparkle.style.left = `${Math.random() * 120 - 10}%`;
      sparkle.style.top = `${Math.random() * 120 - 10}%`;
      sparkle.style.animationDelay = `${Math.random() * 2}s`;
      sparkle.style.animationDuration = `${2 + Math.random() * 1.5}s`;
    }
  });

  // Helper: Render Task Card
  function renderTaskCard(task) {
    return `
      <div class="task ${task.frequency.toLowerCase()}" data-task-id="${task.id}">
        <div class="task-display">
          <div class="task-header">
            <h3 class="task-title">${task.name}</h3>
            <span class="task-frequency">${
              task.frequency.charAt(0).toUpperCase() + task.frequency.slice(1)
            }</span>
          </div>
          <div class="card-box">
            <p class="task-description">${task.description}</p>
            <p class="task-duration">
              Duration: ${
                task.duration_type === "timed"
                  ? `${task.duration} minutes`
                  : "Complete/Incomplete"
              }
            </p>
            <p class="task-status">Status: ${
              task.completed ? "Completed" : "Pending"
            }</p>
            <p class="task-exp">EXP Reward: ${task.exp_reward || 0}</p>
          </div>
          <button class="edit-task">Edit</button>
          ${
            task.completed
              ? `<button class="reset-task action-button">Reset Task</button>`
              : `<button class="complete-task action-button">Complete Task</button>`
          }
        </div>
        <form class="edit-task-form" style="display:none;">
          <div class="form-section">
            <label for="task-name-${task.id}">Task Name</label>
            <input type="text" name="task[name]" id="task-name-${task.id}" value="${task.name}" required />
          </div>
          <div class="form-section">
            <label for="task-description-${task.id}">Description</label>
            <textarea name="task[description]" id="task-description-${task.id}" required>${task.description}</textarea>
          </div>
          <div class="form-buttons" style="text-align: center;">
            <button type="submit" class="save-edit">Save</button>
            <button type="button" class="delete-task">Delete</button>
            <button type="button" class="cancel-edit">Cancel</button>
          </div>
        </form>
      </div>
    `;
  }
});
