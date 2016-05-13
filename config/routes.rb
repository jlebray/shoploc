Rails.application.routes.draw do
  get 'shoploc/index'

  root 'shoploc#index'

  post '/shoploc/index/' => 'shoploc#index', as: :shoploc_list, url: '/'
  get '/map' => 'shops#map', as: :shops_map

  resources :shops

end
