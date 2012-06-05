KHSuite2::Application.routes.draw do
  scope "(:locale)", :locale => /de|en/ do
    resources :users
    resources :sessions, :only => [:new, :create, :destroy]
    resources :doctors, :only => [:new, :index, :edit, :update, :create, :destroy]

    match '/:locale',               :to => 'pages#home'
    root                            :to => 'pages#home'
    match '/contact_email',         :to => 'pages#sendmail'
    match '/contact',               :to => 'pages#contact'
    match '/about',                 :to => 'pages#about'
    match '/help',                  :to => 'pages#help'
    match '/tools',                 :to => 'pages#tools'
    match '/khplanner',             :to => 'pages#khplanner'
    match '/khadvancedassignment',  :to => 'pages#khadvancedassignment'
    match '/khadvancedmedrack',     :to => 'pages#khadvancedmedrack'
    match '/khadvancedmemberlist',  :to => 'pages#khadvancedmemberlist'
    match '/khadvancedpatientview', :to => 'pages#khadvancedpatientview'
    match '/khadvancedreferral',    :to => 'pages#khadvancedreferral'
    match '/khmedhelper',           :to => 'pages#khmedhelper'
    match '/khopticalimprovements', :to => 'pages#khopticalimprovements'
    match '/khpatientcounter',      :to => 'pages#khpatientcounter'
    match '/khshortcuts',           :to => 'pages#khshortcuts'
    match '/khtimer',               :to => 'pages#khtimer'
    match '/signup',                :to => 'users#new'
    match '/signin',                :to => 'sessions#new'
    match '/signout',               :to => 'sessions#destroy'
  end

  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => 'welcome#index'

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
