require 'spec_helper'

describe SessionsController do
  render_views
  
  describe "DELETE 'destroy'" do
    it "should sign a user out" do
      test_sign_in(Factory(:user))
      delete :destroy
      controller.should_not be_signed_in
      response.should redirect_to(root_path)
    end
  end
  
  describe "POST 'create'" do
    describe "with valid email and password" do
      before(:each) do
        @user = Factory(:user)
        @attr = { :email => @user.email, :password => @user.password }
        post :create, :session => @attr
      end
      
      it "should sign the user in" do
        controller.current_user.should == @user
        controller.should be_signed_in
      end
      
      it "should redirect to the user show page" do
        response.should redirect_to(user_path(@user))
      end
    end
    
    describe "invalid signin" do
      before(:each) do
        @attr = { :email => "email@example.com", :password => "invalid" }
        post :create, :session => @attr
      end
      
      it "should re-render the new page" do
        response.should render_template('new')
      end
      
      it "shoudl have the right title" do
        response.should have_selector('title', :content => I18n.t(:title_signin))
      end
      
      it "should have a flash.now message" do
        flash.now[:error] == I18n.t(:flash_session_create_failure)
      end
    end
  end

  describe "GET 'new'" do
    I18n.available_locales.each do |locale|
      I18n.locale = locale

      before(:each) do
        get :new
      end
      
      it "should be successful" do
        response.should be_success
      end
      
      it "should have the right title" do
        response.should have_selector('title', :content => I18n.t(:title_signin))
      end
    end
  end
end
