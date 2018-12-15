class V1::SessionsController < V1::BaseController
    skip_before_action :verify_authenticity_token

    def create
        @user = User.find_by(email: params[:session][:email].downcase)
        if @user && @user.authenticate(params[:session][:password])
            if @user.activated?
                log_in(@user)
                render json: @user, status: :created
            else
                @error = {account: " has not been activated"}
                render json: @error, status: :unprocessable_entity
            end
        else
            @error = {errors: "Invalid Email/Password Combination"}
            render json: @error, status: :unprocessable_entity
        end
    end

    def destroy
        log_out if logged_in?
        @response = {result: "Logout successfully!"}
        render json: @response, status: :ok
    end
end