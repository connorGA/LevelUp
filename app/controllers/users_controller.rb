class UsersController < ApplicationController
    before_action :authenticate_user! 
  
    def user_data
      user = current_user # Fetch the logged-in user
      render json: {
        exp: user.exp,
        exp_required: user.exp_required,
        level: user.level,
        coins: user.coins,
        diamonds: user.diamonds
      }
    end
  end
  