require 'rails_helper'
require './spec/support/session_helpers'

RSpec.configure do |c|
  c.include SessionHelpers
end

RSpec.describe V1::SessionsController, type: :controller do
    before :all do
        @user = User.create(email: "example@example.com", password: "foobar", password_confirmation: "foobar")
    end

    after :all do
        User.delete_all
    end

    describe "POST create" do
        it "should not sign in an unactivated user" do
            post :create, params: {session: {email: @user.email, password: @user.password}}
            expect(response).to have_http_status(:unprocessable_entity)
            expect(is_logged_in?).to be false
        end

        it "should sign in an activated user" do
            @user.activate()
            post :create, params: {session: {email: @user.email, password: @user.password}}
            expect(response).to have_http_status(:created)
            expect(is_logged_in?).to be true
        end
    end
end
