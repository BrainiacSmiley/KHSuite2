# == Schema Information
#
# Table name: doctors
#
#  id         :integer         not null, primary key
#  server     :integer         default 1
#  name       :string(20)
#  avatar     :string(255)     default("http://portraits.kapihospital.de/users/3/3220505bba8933555b772d759d9e83a5_m.png")
#  level      :integer         default 1
#  av         :string(255)
#  user_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

class Doctor < ActiveRecord::Base
  attr_accessible :server, :name, :avatar, :level, :av
  
  belongs_to :user
  
  avatar_regex = /http:\/\/portraits\.kapihospital\.de\/users\//i
  
  validates :name,    :presence => true, :length => { :maximum => 20 }
  validates :server,  :presence => true,
                      :uniqueness => { :scope => :user_id }
  validates :avatar,  :format   => { :with => avatar_regex }
  validates :user_id, :presence => true
  validates :level,   :presence  => true,
                      :inclusion => { :in => 1..70 }
  
  default_scope :order => 'doctors.server ASC'
end
