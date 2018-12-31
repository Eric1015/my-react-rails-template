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
        get '/api/v1/users/current', headers: {Authorization: "Bearer #{jwt}"}
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)['email']).to eq(@user.email)
    end

    it "should allow user to delete a user when providing proper jwt" do
        post '/api/v1/user_token', params: {auth: {email: @user.email, password: @user.password}}
        jwt = JSON.parse(response.body)['jwt']
        expect(response).to have_http_status(:created)

        original_size = User.all.length
        delete "/api/v1/users/#{@user.id}", headers: {Authorization: "Bearer #{jwt}"}
        expect(response).to have_http_status(:ok)
        expect(User.all.length).to eq(original_size - 1)
        
        # get back the original user
        create(:user, :activated)
    end

    it "should not allow a user to delete another user" do
        another_user = create(:user, :another, :activated)
        post '/api/v1/user_token', params: {auth: {email: another_user.email, password: another_user.password}}
        another_jwt = JSON.parse(response.body)['jwt']
        expect(response).to have_http_status(:created)

        original_size = User.all.length
        delete "/api/v1/users/#{@user.id}", headers: {Authorization: "Bearer #{another_jwt}"}
        expect(response).to have_http_status(:unauthorized)
        expect(User.all.length).to eq(original_size)
    end
  end
end
