Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  scope :api do
    api_version(:module => "V1", :path => {:value => "v1"}) do
      resources :users, except: [:edit, :new]
      get '/confirmation', to: "users#confirm"
      resources :sessions, only: [:create, :destroy]
    end
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
