class PlotsController < ApplicationController
  def show
    # Ensure the correct layout is used
    render layout: "application"
  end
end
