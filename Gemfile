source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.4.4'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.2.1'
# Use Puma as the app server
gem 'puma', '~> 3.11'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', '>= 1.1.0', require: false

# ActiveAdmin
gem 'devise'
gem 'activeadmin'

# API version manager
gem 'versionist'

# ImageUploader
gem 'paperclip'
gem 'aws-sdk', '~> 3'

# Use ActiveModel has_secure_password
gem 'bcrypt', '~> 3.1.7'

# Define what will be included in JSON
gem 'active_model_serializers'

# Enable CORS from frontend
gem 'rack-cors'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3'
  gem 'rspec-rails', '~> 3.8'

  # Testing tools
  gem 'rails-controller-testing'
  gem 'factory_bot_rails', '~> 4.0'
end

group :production do
  gem 'pg'
end

group :development do
end


# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
