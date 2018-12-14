class User < ApplicationRecord
    attr_accessor :activation_token
    before_save {self.email = email.downcase}
    before_create :create_activation_digest
    
    has_secure_password

    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence: true, length: {maximum: 255}, 
            format: { with: VALID_EMAIL_REGEX }, uniqueness: true
            
    validates :password, presence: true, length: { minimum: 6 }
    validates_confirmation_of :password
    validates :password_confirmation, presence: true

    # Returns the hash digest of the given string.
    def self.digest(string)
        cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                    BCrypt::Engine.cost
        BCrypt::Password.create(string, cost: cost)
    end

    # Returns a random token.
    def self.new_token
        SecureRandom.urlsafe_base64
    end

    # Returns true if the given token matches the digest.
    def authenticated?(attribute, token)
        digest = self.send("#{attribute}_digest")
        return false if digest.nil?
        BCrypt::Password.new(digest).is_password?(token)
    end

    # Activates an account.
    def activate
        update_columns(activated: true, activated_at: Time.zone.now)
    end

    private
    # Creates and assigns the activation token and digest.
    def create_activation_digest
        self.activation_token  = User.new_token
        self.activation_digest = User.digest(activation_token)
    end
end
