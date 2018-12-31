module SessionsHelper
    def log_in(user)
        session[:user_id] = user.id
    end

    def current_user
        if session[:user_id]
            @current_user ||= User.find_by(id: session[:user_id])
        end
    end

    def logged_in?
        !current_user.nil?
    end

    def log_out
        session.delete(:user_id)
        @current_user = nil
    end
end

module UserAuthenticationHelper
    def get_user(jwt)
        decoded_token = JWT.decode jwt, Rails.application.secrets.secret_key_base, true, { :algorithm => 'HS256' }
        user = User.find((decoded_token[0])['sub'])
        user
    end

    def current_user
        if request.headers.include?('Authorization')
            user = get_user(request.headers['Authorization'].split.last)
        end
        user
    end

    def verify_by_jwt
        if current_user.nil?
            head(:unauthorized)
        end
    end
end

class ApiController < ActionController::API
    include SessionsHelper
    include Knock::Authenticable
    include UserAuthenticationHelper
end