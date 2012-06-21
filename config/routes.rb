Tapli::Application.routes.draw do
  resources :bars, only: [:index, :new, :create, :show, :edit, :update, :destroy]
end
