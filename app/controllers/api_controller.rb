class ApiController < ActionController::API
    include Knock::Authenticable
    include UserAuthenticationHelper
end