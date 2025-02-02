Rails.application.routes.draw do
  devise_for :users


  # Tasks
  resources :tasks, only: [:index, :show, :create, :update, :destroy] do
    member do
      post 'complete'
      post 'reset'
    end
  end

  # Plots
  get 'plots/show'
  resources :plots, only: [:show]

  # Avatar
  get 'avatar/show'
  resources :avatar, only: [:show]

  # Reward Data
  get '/user_data', to: 'users#user_data'

  # root
  root to: "home#index"
  

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  

  
end
