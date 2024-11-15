module TasksHelper
    def generate_calendar
      current_date = Date.today
      start_of_year = current_date.beginning_of_year
      end_of_year = current_date.end_of_year
  
      calendar_html = ""
  
      (start_of_year..end_of_year).group_by(&:month).each do |month, days|
        month_name = Date::MONTHNAMES[month]
        calendar_html += "<div class='calendar-month #{month_name.downcase}'>"
        calendar_html += "<h5>#{month_name}</h5>"
        calendar_html += "<div class='small-calendar'>"
  
        days.each do |day|
          classes = ["calendar-day"]
          classes << "current-day" if day == current_date
          classes << "past-day" if day < current_date
          classes << "future-day" if day > current_date
  
          calendar_html += "<div class='#{classes.join(' ')}'>#{day.day}</div>"
        end
  
        calendar_html += "</div></div>"
      end
  
      calendar_html.html_safe
    end
  end
  