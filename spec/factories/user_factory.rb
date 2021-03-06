FactoryBot.define do
    factory :user do
        email { "example@example.com" }
        password { "foobar" }
        password_confirmation { "foobar" }

        trait :another do
            email { "example1@example.com" }
        end

        trait :email_invalid do
            email { "example.com" }
        end

        trait :without_password do
            password { nil }
            password_confirmation { nil }
        end

        trait :without_password_confirmation do
            password_confirmation { nil }
        end

        trait :short_password do
            password { "fooba" }
            password_confirmation { "fooba" }
        end

        trait :unmatched_password do
            password { "foobar" }
            password_confirmation { "foobal" }
        end

        trait :activated do
            activated { true }
        end
    end
  end