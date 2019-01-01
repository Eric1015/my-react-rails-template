require 'rails_helper'

RSpec.describe "UserPasswordResets", type: :request do
    before :all do
        @user = create(:user, :activated)
    end

    after :all do
        User.delete_all
    end

    describe "work flow of user resetting the password" do
        it "should update the password after varifying through the email" do
            post '/api/v1/password_resets', params: {password_reset: {email: @user.email}}
            expect(response).to have_http_status(:created)
            original_digest = User.find_by(email: @user.email).password_digest
            last_email = ActionMailer::Base.deliveries.last
            email_text = last_email.body.to_s
            puts last_email.body.to_s
            reset_token = email_text.split("reset_token=")[1].split('"')[0]

            get edit_v1_password_reset_path("#{reset_token}"), params: {email: @user.email, user: {password: "foobal", password_confirmation: "foobal"}}
            expect(response).to have_http_status(:accepted)
            new_digest = User.find_by(email: @user.email).password_digest
            expect(new_digest).not_to eq(original_digest)
        end
    end
end
