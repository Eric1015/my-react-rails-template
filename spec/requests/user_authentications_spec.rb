require 'rails_helper'

RSpec.describe "UserAuthentications", type: :request do
  describe "Authenticated access" do
    before :all do
        @user = create(:user, :activated)
    end

    after :all do
        User.delete_all
    end

    it "should respond with ok status when user is valid and jwt is provided" do
        post '/api/v1/user_token', params: {auth: {email: @user.email, password: @user.password}}
        jwt = JSON.parse(response.body)['jwt']
        expect(response).to have_http_status(:created)
        # The following part fails because of something
        get '/api/v1/users/current', headers: {Authorization: "#{jwt}"}
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['email']).to eq(@user.email)
    end
  end
end
