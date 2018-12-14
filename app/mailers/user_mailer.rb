class UserMailer < ApplicationMailer
    default from: "noreply@example.com"

    def account_activation(user, url)
      @user = user
      @url = url
      mail to: user.email, subject: "Account Activation"
    end
end
