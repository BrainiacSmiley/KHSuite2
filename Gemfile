source 'http://rubygems.org'

gem 'rails', '3.1.3'
gem 'jquery-rails'
gem 'will_paginate', '~> 3.0.2'
gem 'sass-rails',   '~> 3.1.5'

group :development, :test do
  gem 'sqlite3'
end

group :production do
  gem 'pg'
end

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'coffee-rails', '~> 3.1.1'
  gem 'uglifier', '>= 1.0.3'
  gem 'bootstrap-sass', '~> 1.4.2'
end

# To use ActiveModel has_secure_password
# gem 'bcrypt-ruby', '~> 3.0.0'

# Use unicorn as the web server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'ruby-debug19', :require => 'ruby-debug'

group :test do
  # Pretty printed test output
  gem 'turn', '~> 0.8.3', :require => false
  gem 'rspec-rails', '~> 2.7.0'
  gem 'webrat', '~> 0.7.3'
  gem 'spork', '~> 0.8.5'
  gem 'factory_girl_rails', '~> 1.4.0'
end

group :development do
  gem 'rspec-rails', '~> 2.7.0'
end