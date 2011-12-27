class CreateDoctors < ActiveRecord::Migration
  def change
    create_table :doctors do |t|
      t.integer :server, :default => 1
      t.string :name
      t.string :avatar, :default => "http://portraits.kapihospital.de/users/3/3220505bba8933555b772d759d9e83a5_m.png"
      t.integer :level, :default => 1
      t.string :av
      t.integer :user_id

      t.timestamps
    end
    add_index :doctors, [:user_id, :server], :unique => true
  end
end
