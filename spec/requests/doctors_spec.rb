require 'spec_helper'

describe "Doctors" do
  I18n.available_locales.each do |locale|
    I18n.locale = locale

    describe "creation" do
      before(:each) do
       @user = Factory(:user)
       integration_sign_in(@user)
       visit new_doctor_path
      end
      
      describe "success" do
        it "should make a new doctor" do
          lambda do
            fill_in "Name",  :with => "New Doctor"
            fill_in "AV",    :with => "New AV"
            fill_in "Level", :with => 70
            click_button
            response.should have_selector('p', :content => I18n.t(:flash_doctor_creation_success))
            response.should render_template('users/show')
          end.should change(Doctor, :count).by(1)
        end
      end

      describe "failure" do
        it "should not make a new doctor" do
          lambda do
            fill_in "Name", :with => ""
            click_button
            response.should render_template('users/show')
            response.should have_selector('span', :content => I18n.t('errors.messages.empty'))
          end.should_not change(Doctor, :count)
        end
      end
    end
  end
end