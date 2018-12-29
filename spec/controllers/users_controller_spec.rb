require 'rails_helper'

RSpec.describe V1::UsersController, type: :controller do
    before :all do
        @user = build(:user)
    end

    after :all do
        User.delete_all
    end

    describe "POST create" do
        it "should create a user with valid params" do
            post :create, params: {user: {email: @user.email, password: @user.password, password_confirmation: @user.password_confirmation}}
            expect(response).to have_http_status(:created)
        end
    end

    describe "current action" do
        it "should respond with unauthorized when no JWT is provided" do
            get :current, params: {}
            expect(response).to have_http_status(:unauthorized)
        end
    end
end
