class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.string :activation_digest
      t.boolean :activated, default: false
      t.datetime :activated_at
      t.timestamps
    end
  end
end
