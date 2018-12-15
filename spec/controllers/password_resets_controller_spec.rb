require 'rails_helper'
require './spec/support/api_helpers'

RSpec.configure do |c|
    c.include ApiHelpers
  end

RSpec.describe V1::PasswordResetsController, type: :controller do
    before :all do
        @user = User.create(email: "example@example.com", password: "foobar", password_confirmation: "foobar")
        @user.activate
        @password_digest = @user.password_digest
    end

    after :all do
        User.delete_all
    end

    describe "POST create" do
        it "should create a password reset when inputing valid user" do
            post :create, params: {password_reset: {email: @user.email}}
            expect(response).to have_http_status(:created)
        end

        it "should not create a password reset when inputing invalid user" do
            post :create, params: {password_reset: {email: "example"}}
            expect(response).to have_http_status(:not_found)
        end
    end
end
