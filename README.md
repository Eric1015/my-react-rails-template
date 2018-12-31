# My React Rails Template

This repository provides a basic user sign in template consists of React as the front-end and Rails as the back-end

## Dependencies
* Ruby '2.4.4'
* Rails '5.0' or greater
* Rspec '3.8'
* React Router
* React Cookie
* Semantic UI React
* Axios

## Functionalities
* ActiveAdmin                               [Document Link](https://github.com/activeadmin/activeadmin)
* API Versionist                            [Document Link](https://github.com/bploetz/versionist)
* Email Activation
* Password Reset
* Image upload with Active Storage (using amazon S3 by default)

## Set Up
Set up the AWS for image uploading of Active Storage
```
S3_BUCKET_NAME=your_bucket_name
```
```
AWS_ACCESS_KEY_ID=your_access_key_id
```
```
AWS_SECRET_ACCESS_KEY=your_secret_access_key
```
```
AWS_REGION=your_aws_region
```
Because of SendGrid addon for email, host name is required
```
HOST_NAME=your_host_name
```
Tell Heroku to use nodeJS and Rails as buildpacks
```
heroku buildpacks:add heroku/nodejs --index 1
heroku buildpacks:add heroku/ruby --index 2
```
* Set up environment variables for development environment
Create a file <code>environment_variables.yml</code> in <code>config/</code>, which has the following content:
```yml
development:
  HOST_NAME: https://example.heroku.com/
test:
  HOST_NAME: https://example.heroku.com/
production:
  HOST_NAME: https://example.heroku.com/
```
This file is in <code>gitignore</code>, so your secret information will be protected

## Important Commands
* Start the back-end Rails server
```
rails s -p 3001 (since we are running the front-end part on port 3000)
```
* Start the front-end React server
```
cd frontend (if you are at the root directory .../react-rails-template)
npm start
```
* Generate ActiveAdmin model accessors
```
rails generate active_admin:resource <Model_Name>
```
* Generate new version of api
```
rails generate versionist:new_api_version <version> <module namespace> [options]
```
* Generate new controller under a version of api
```
rails generate versionist:new_controller <Controller_Name> <version>
```
* Generate new image reference for a model
```
rails generate paperclip <Model_Name> <field_name> (ex. rails g paperclip HomeImage image)
```
