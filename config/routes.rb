Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  scope :api do
    api_version(:module => "V1", :path => {:value => "v1"}) do
    resources :account_activations
      resources :users, except: [:edit, :new]
      resources :sessions, only: [:create, :destroy]
      resources :account_activations, only: [:edit]
    end
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
