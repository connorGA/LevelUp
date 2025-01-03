class Task < ApplicationRecord
  belongs_to :user
  validates :name, presence: true

  # Enum for task frequency types
  enum frequency: { daily: 0, weekly: 1, monthly: 2, yearly: 3 }

  # Method to calculate EXP based on task duration and frequency
  def calculate_exp
    base_exp = case frequency
               when "daily" then 10
               when "weekly" then 50
               when "monthly" then 200
               when "yearly" then 1000
               end
    base_exp + ((duration || 0) * 2) # Default to 0 if duration is nil
  end

  # Mark task as completed and award EXP to user
  def complete_task
    return if completed

    # Mark as completed and save completion time
    update(completed: true, completed_at: Time.current)
    exp_reward = calculate_exp
    user.add_exp(exp_reward)
    exp_reward
  end

  # Reset task completion based on frequency
  def reset_task
    # Reset `completed` to false at the start of each new frequency cycle
    if frequency_reset_needed?
      update(completed: false)
    end
  end

  # Check if a task needs to be reset based on frequency
  def frequency_reset_needed?
    return false unless completed_at # Ensure completed_at is set
  
    last_completed = completed_at
    case frequency
    when "daily"
      last_completed < Time.current.beginning_of_day
    when "weekly"
      last_completed < Time.current.beginning_of_week
    when "monthly"
      last_completed < Time.current.beginning_of_month
    when "yearly"
      last_completed < Time.current.beginning_of_year
    else
      false
    end
  end
  
end
