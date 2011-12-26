require 'spec_helper'

describe "FriendlyForwardings" do
  I18n.available_locales.each do |locale|
    I18n.locale = locale
    
    it "should forward to the requested page after signin" do
      user = Factory(:user)
      visit edit_user_path(I18n.locale, user)
      fill_in :email,            :with => user.email
      fill_in I18n.t(:password), :with => user.password
      click_button
      response.should render_template('users/edit')
    end
  end
end
