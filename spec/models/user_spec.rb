require 'rails_helper'

RSpec.describe User, type: :model do
    after :all do
        User.delete_all
    end

    context "Valid user" do
        it "should accept user with valid email and password" do
            user = build(:user)
            expect(user).to be_valid
        end

        it "should be not activated user when created" do
            user = build(:user)
            expect(user.activated).to be false
        end
    end

    context "Invalid user" do
        it "should reject user with invalid email format" do
            user = build(:user, :email_invalid)
            expect(user).not_to be_valid
        end

        it "should reject user without password" do
            user = build(:user, :without_password)
            expect(user).not_to be_valid
        end

        it "should reject user without password confirmation" do
            user = build(:user, :without_password_confirmation)
            expect(user).not_to be_valid
        end

        it "should reject user with too short password" do
            user = build(:user, :short_password)
            expect(user).not_to be_valid
        end

        it "should reject user with unmatched password and password confirmation" do
            user = build(:user, :unmatched_password)
            expect(user).not_to be_valid
        end

        it "should reject user with already exists email" do
            create(:user)
            user = build(:user)
            expect(user).not_to be_valid
        end
    end
end
