class V1::UserTokenController < V1::BaseController
    def create
        @user = User.find_by(email: params[:auth][:email].downcase)
        if @user && @user.authenticate(params[:auth][:password])
            if @user.activated?
                auth_token = Knock::AuthToken.new payload: { sub: @user.id }
                render json: auth_token, status: :created
            else
                @error = {account: " has not been activated"}
                render json: @error, status: :unprocessable_entity
            end
        else
            @error = {errors: "Invalid Email/Password Combination"}
            render json: @error, status: :unprocessable_entity
        end
    end
end