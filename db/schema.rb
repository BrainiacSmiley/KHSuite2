# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20111227134917) do

  create_table "doctors", :force => true do |t|
    t.integer  "server",     :default => 1
    t.string   "name"
    t.string   "avatar",     :default => "http://portraits.kapihospital.de/users/3/3220505bba8933555b772d759d9e83a5_m.png"
    t.integer  "level",      :default => 1
    t.string   "av"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "doctors", ["user_id", "server"], :name => "index_doctors_on_user_id_and_server", :unique => true

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "encrypted_password"
    t.string   "salt"
    t.string   "remember_token"
    t.boolean  "admin",              :default => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true

end
