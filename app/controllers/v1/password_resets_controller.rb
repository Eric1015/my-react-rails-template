class V1::PasswordResetsController < V1::BaseController
    before_action :check_expiration, only: [:edit]
    before_action :get_user, only: [:edit]
    before_action :valid_user, only: [:edit]

    def create
        @user = User.find_by(email: params[:password_reset][:email].downcase)
        if @user
            @user.create_reset_digest
            params = {
                reset_token: @user.reset_token,
                email: @user.email 
            }
            @url = "#{ENV['HOST_NAME']}/password-reset?#{params.to_query}"
            UserMailer.password_reset(@user, @url).deliver_now
            render json: @user, status: :created
        else
            @error = {erros: "User not found"}
            render json: @error, status: :not_found
        end
    end

    def edit
        if @user.update_attributes(user_params)
            render json: @user, status: :accepted
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    private

    def user_params
        params.require(:user).permit(:password, :password_confirmation)
    end

    def get_user
        @user = User.find_by(email: params[:email])
      end
    
    def valid_user
        unless (@user && @user.activated? &&
                @user.authenticated?(:reset, params[:id]))
            @error = {errors: "Unauthorized"}
            render json: @error, status: :unprocessable_entity
        end
    end

    def check_expiration
        if @user.password_reset_expired?
            @error = {erros: "Password reset token has expired"}
            render json: @error, status: :unprocessable_entity
        end
    end
end
