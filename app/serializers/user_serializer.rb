class UserSerializer < ActiveModel::Serializer
    attributes :id, :email, :activated, :activated_at, :created_at, :updated_at, :reset_sent_at
end
