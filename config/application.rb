require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module LevelUp
  class Application < Rails::Application
    # Initialize configuration defaults for the originally generated Rails version.
    config.load_defaults 7.1

    # Ensure the assets pipeline is enabled.
    config.assets.enabled = true

    # Add the 'app/javascript' folder to the asset pipeline paths.
    config.assets.paths << Rails.root.join("app", "javascript")

    # Optional: Add 'node_modules' to the asset paths for npm-based assets.
    config.assets.paths << Rails.root.join("node_modules")

    # Ensure the assets from the app/assets folder are precompiled.
    config.assets.precompile += %w(application.js application.css)

    # Autoload library paths and ignore non-Ruby files.
    config.autoload_lib(ignore: %w(assets tasks))

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # Example of setting timezone:
    # config.time_zone = "Central Time (US & Canada)"
    # Example of adding additional load paths:
    # config.eager_load_paths << Rails.root.join("extras")
  end
end
