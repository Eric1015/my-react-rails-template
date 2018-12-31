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