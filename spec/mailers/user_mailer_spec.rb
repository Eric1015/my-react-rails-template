require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
    describe "account activation" do
        before :all do
            @user = User.new(email: "example@example.com", password: "foobar")
        end

        let(:mail) {UserMailer.account_activation(@user, "")}

        it "renders the header" do
            expect(mail.subject).to eq("Account Activation")
            expect(mail.from).to eq(["noreply@example.com"])
        end
    end
end
