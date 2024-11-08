class HomeController < ApplicationController
  def index
    @user = current_user
    @tasks = current_user.tasks if user_signed_in?
  end
end
