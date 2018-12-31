require 'rails_helper'

RSpec.describe "UserActivations", type: :request do
    describe "the work flow of activating a user" do
        before :all do
            @user = build(:user)
        end

        it "should activate an existing user when activation token and email are properly provided" do
            post '/api/v1/users', params: {user: {email: @user.email, password: @user.password, password_confirmation: @user.password_confirmation}}
            expect(response).to have_http_status(:created)
            user = User.find_by(email: @user.email)
            last_email = ActionMailer::Base.deliveries.last
            email_text = last_email.body.to_s
            activation_token = email_text.split("activation_token=")[1].split("&amp")[0]

            get edit_v1_account_activation_path("#{activation_token}"), params: {email: @user.email}
            expect(response).to have_http_status(:ok)
            expect(User.find_by(email: @user.email).activated).to be true
        end
    end
end
