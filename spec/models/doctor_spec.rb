# == Schema Information
#
# Table name: docs
#
#  id         :integer         not null, primary key
#  server     :integer
#  name       :string(255)
#  avatar     :string(255)
#  level      :integer
#  av         :integer
#  user_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

require 'spec_helper'

describe Doctor do
  before(:each) do
    @user = Factory(:user)
    @attr = {
      :server => 1,
      :name => "Prof.Dr.Brainiac",
      :avatar => "http://portraits.kapihospital.de/users/0/0762717d61c4a643fd6c311c718cd5fc_m.png",
      :level => 1,
      :av => "Grey's Anatomie"
    }
  end
  
  describe "validations" do
    it "should require a user_id" do
      Doctor.new(@attr).should_not be_valid
    end
    
    it "should require nonblank name" do
      @user.doctors.build(@attr.merge(:name => " ")).should_not be_valid
    end
    
    it "should reject to long name" do
      @user.doctors.build(@attr.merge(:name => "a" * 21)).should_not be_valid
    end

    it "should reject level below 1" do
      @user.doctors.build(@attr.merge(:level => 0)).should_not be_valid
    end

    it "should reject level below 70" do
      @user.doctors.build(@attr.merge(:level => 71)).should_not be_valid
    end
    
    it "should require a server set" do
      @user.doctors.build(@attr.merge(:server => "")).should_not be_valid
    end
    
    it "should reject avatars not from Upjers 'http://portraits.kapihospital.de/users/'" do
      @user.doctors.build(@attr.merge(:avatar => 'http://www.avatarpics.de/myavatar.jpg')).should_not be_valid
    end
    
    it "should onyl alow on doctor per server per user" do
      @user.doctors.build(@attr)
      lambda do
        @user.doctors.build(@attr)
      end.should_not change(Doctor, :count)
    end
  end
  
  it "should create a new instance given valid attributes" do
    @user.doctors.create!(@attr)
  end
  
  describe "user associations" do
    before(:each) do
      @doctor = @user.doctors.create(@attr)
    end
    
    it "should have a user attribute" do
      @doctor.should respond_to(:user)
    end
    
    it "should have the right associated user" do
      @doctor.user_id.should == @user.id
      @doctor.user.should == @user
    end
  end
end
