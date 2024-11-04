class User < ApplicationRecord
  # Include default devise modules for authentication
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_many :tasks
  
  validates :username, presence: true, uniqueness: true

  # Calculate the required experience for the next level
  def exp_required
    (level ** 2) * 100 # Example formula: EXP scales quadratically
  end

  # Calculate the percentage of EXP towards the next level
  def exp_percentage
    return 0 if exp_required.zero?
    (exp.to_f / exp_required * 100).round(2)
  end

  # Add EXP and handle leveling up
  def add_exp(amount)
    self.exp += amount
    while exp >= exp_required
      level_up
    end
    save
  end

  private

  # Level up and reset EXP
  def level_up
    self.level += 1
    self.exp -= exp_required
  end
end
