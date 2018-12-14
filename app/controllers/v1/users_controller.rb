class V1::UsersController < V1::BaseController
    skip_before_action :verify_authenticity_token

    def index
        @users = User.all
        render json: @users
    end

    def show 
        @user = User.find(params[:id])
        render json: @user
    end

    def create
        @user = User.new(user_params)
        if @user.save
            render json: @user, status: :created
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    def update
    end

    def destroy
    end

    private

    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
