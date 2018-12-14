require 'rails_helper'

RSpec.describe V1::SessionsController, type: :controller do
    fixtures :all

    describe "POST create" do
        # it "should not sign in an unconfirmed user" do
        #     user = User.create!(email: "example@example.com", password: "foobar")
        #     post :create, params: {session: {email: user.email, password: "foobar"}}
        #     expect(user_signed_in?).to be false
        # end
    end
end
