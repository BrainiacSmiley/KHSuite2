require 'spec_helper'

describe "Users" do
  I18n.available_locales.each do |locale|
    I18n.locale = locale
    
    describe "sign in/out" do
      describe "failure" do
        it "should not sign a user in" do
          integration_sign_in(User.new())
          response.should have_selector("div.alert-message.error", :content => I18n.t(:flash_session_create_failure))
        end
      end
      
      describe "success" do
        it "should sign a user in and out" do
          integration_sign_in(Factory(:user))
          controller.should be_signed_in
          click_link I18n.t(:link_signout)
          controller.should_not be_signed_in
        end 
      end
    end

    describe "signup" do
      describe "success" do
        it "should make a new user" do
          lambda do
            visit signup_path
            fill_in "Name",                         :with => "Example User"
            fill_in "Email",                        :with => "user@example.com"
            fill_in I18n.t(:password),              :with => "foobar"
            fill_in I18n.t(:password_confirmation), :with => "foobar"
            click_button I18n.t(:button_user_new)
            response.should have_selector("div.alert-message.success", :content => I18n.t(:flash_user_create_success))
            response.should render_template('users/show')
          end.should change(User, :count).by(1)
        end
      end

      describe "failure" do
        it "should not make a new user" do
          lambda do
            visit signup_path
            fill_in "Name",                         :with => ""
            fill_in "Email",                        :with => ""
            fill_in I18n.t(:password),              :with => ""
            fill_in I18n.t(:password_confirmation), :with => ""
            click_button I18n.t(:button_user_new)
            response.should render_template('users/new')
            response.should have_selector('span', :content => I18n.t('errors.messages.empty'))
          end.should_not change(User, :count)
        end
      end
    end
  end
end
