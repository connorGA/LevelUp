class User < ApplicationRecord
  # Include default devise modules
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  validates :username, presence: true, uniqueness: true

  # Calculate the required experience for the next level
  def exp_required
    level * 100  # Example: each level requires 100 EXP * the level number
  end

  # Calculate the percentage of EXP towards the next level
  def exp_percentage
    return 0 if exp_required == 0  # Prevent division by zero
    (exp.to_f / exp_required * 100).round(2)
  end
end
