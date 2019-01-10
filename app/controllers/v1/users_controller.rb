class V1::UsersController < V1::BaseController
    before_action only: [:update, :destroy] do 
        verify_by_jwt()
        check_user_id(params[:id])
    end

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
            params = {
                activation_token: @user.activation_token,
                email: @user.email 
            }
            @url = "#{ENV['HOST_NAME']}/activate?#{params.to_query}"
            UserMailer.account_activation(@user, @url).deliver_now
            render json: @user, status: :created
        else
            render json: @user.errors, status: :unprocessable_entity
        end
    end

    def update
    end

    def destroy
        user = User.find(params[:id])
        if user
            user.destroy
            head(:ok)
        else
            head(:not_found)
        end
    end

    def current
        if request.headers.include?('Authorization')
            current_user = get_user(request.headers['Authorization'].split.last)
        end
        if current_user
            render json: current_user, status: :ok
        else
            head(:unauthorized)
        end
    end

    private

    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
