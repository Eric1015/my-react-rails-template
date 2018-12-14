require 'rails_helper'

RSpec.describe User, type: :model do
    before :all do
        @user = User.new(email: "example@example.com", password: "foobar", password_confirmation: "foobar")
    end

    after :all do
        User.delete_all
    end

    context "Valid user" do
        it "should accept user with valid email and password" do
            user = User.new(email: @user.email, password: @user.password, password_confirmation: @user.password_confirmation)
            expect(user).to be_valid
        end

        it "should be not activated user when created" do
            user = User.new(email: @user.email, password: @user.password, password_confirmation: @user.password_confirmation)
            expect(user.activated).to be false
        end
    end

    context "Invalid user" do
        it "should reject user with invalid email format" do
            user = User.new(email: "exampleexample.com", password: "foobar", password_confirmation: "foobar")
            expect(user).not_to be_valid
        end

        it "should reject user without password" do
            user = User.new(email: "example@example.com")
            expect(user).not_to be_valid
        end

        it "should reject user without password confirmation" do
            user = User.new(email: "example@example.com", password: "foobar")
            expect(user).not_to be_valid
        end

        it "should reject user with too short password" do
            user = User.new(email: "example@example.com", password: "fooba", password_confirmation: "fooba")
            expect(user).not_to be_valid
        end

        it "should reject user with unmatched password and password confirmation" do
            user = User.new(email: "example@example.com", password: "foobar", password_confirmation: "foobarl")
            expect(user).not_to be_valid
        end

        it "should reject user with already exists email" do
            User.create(email: @user.email, password: @user.password, password_confirmation: @user.password_confirmation)
            user = User.new(email: @user.email, password: @user.password, password_confirmation: @user.password_confirmation)
            expect(user).not_to be_valid
        end
    end
end
