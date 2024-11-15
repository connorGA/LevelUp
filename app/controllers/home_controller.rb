class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    @user = current_user
    @tasks = user_signed_in? ? current_user.tasks : []
    @months = generate_calendar
  end

  private

  def generate_calendar
    start_of_year = Date.today.beginning_of_year
    end_of_year = Date.today.end_of_year
  
    (start_of_year..end_of_year).group_by(&:month).map do |month, dates|
      {
        name: Date::MONTHNAMES[month],
        days: dates.map do |date|
          {
            number: date.day,
            class: if date == Date.today
                     'current-day'
                   elsif date < Date.today
                     'past-day'
                   else
                     'future-day'
                   end
          }
        end
      }
    end
  end
  
end
