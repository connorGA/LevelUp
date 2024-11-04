class Task < ApplicationRecord
  belongs_to :user

  # Frequency options
  enum frequency: { daily: 0, weekly: 1, monthly: 2, yearly: 3 }

  # Duration in minutes (integer), exp_reward (integer for custom EXP)
  # Fields: name (string), description (text), frequency (integer), duration (integer), completed (boolean), exp_reward (integer)

  validates :name, presence: true
  validates :frequency, presence: true

  # Calculate EXP based on duration or custom exp_reward
  def calculate_exp
    base_exp = case frequency
               when "daily" then duration * 2 # daily tasks yield more frequent but smaller EXP
               when "weekly" then duration * 10
               when "monthly" then duration * 30
               when "yearly" then duration * 50
               end
    base_exp || exp_reward # Use base_exp if no custom reward
  end

  # Method to mark task as completed and grant EXP
  def complete_task!
    return if completed?

    update(completed: true)
    user.increment_exp(calculate_exp) # Update user's EXP and level
  end
end
