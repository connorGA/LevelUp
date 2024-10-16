

# Pin the application entry point
pin "application"

# Pin Turbo Rails (correct the filename)
pin "@hotwired/turbo-rails", to: "turbo.min.js"  # Use correct Turbo file

# Pin your custom JavaScript files
pin "plot", to: "plot.js"

# Pin all controllers from the controllers folder
pin_all_from "app/javascript/controllers", under: "controllers"
