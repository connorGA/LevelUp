class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = current_user
    @tasks = current_user.tasks || []
    # @plots = current_user.plots if user_signed_in? || []
  end
end
