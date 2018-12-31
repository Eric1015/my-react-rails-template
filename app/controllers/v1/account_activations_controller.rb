class V1::AccountActivationsController < V1::BaseController
    def edit
        user = User.find_by(email: params[:email])
        if user && !user.activated? && user.authenticated?(:activation, params[:id])
            user.activate
            render json: user, status: :ok
        else
            render json: user, status: :unprocessable_entity
        end
    end
end
