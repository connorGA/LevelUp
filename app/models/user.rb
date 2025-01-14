class User < ApplicationRecord
  # Include default devise modules for authentication
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :tasks, dependent: :destroy

  validates :username, presence: true, uniqueness: true

  # Calculate the required experience for the next level
  def exp_required
    (level ** 2) * 100 # Example formula: EXP scales quadratically
  end

  # Calculate the percentage of EXP towards the next level
  def exp_percentage
    return 0 if exp_required.zero?
    ((exp.to_f / exp_required) * 100).round(2)
  end

  # Add EXP and handle leveling up
  def add_exp(amount)
    self.exp += amount

    while self.exp >= exp_required
      Rails.logger.debug "Leveling up! Current EXP: #{self.exp}, Required EXP: #{exp_required}"
      self.exp -= exp_required
      self.level += 1
    end

    save!
  end


   # Level up and reset EXP
  def level_up
    self.level += 1
    self.exp -= exp_required
  end

  # Add coins to the user
  def add_coins(amount)
    self.coins += amount
    save
  end

  # Spend coins if the user has enough
  def spend_coins(amount)
    return false if amount > coins

    self.coins -= amount
    save
    true
  end

  # Add diamonds to the user
  def add_diamonds(amount)
    self.diamonds += amount
    save
  end

  # Spend diamonds if the user has enough
  def spend_diamonds(amount)
    return false if amount > diamonds

    self.diamonds -= amount
    save
    true
  end

  private

 
end
