require 'spec_helper'

describe PagesController do
  render_views

  I18n.available_locales.each do |locale|
    I18n.locale = locale

    before(:each) do
      @page_title = "KHSuite | "
    end
  
    describe "GET 'home'" do
      before(:each) do
        get 'home'
      end
  
      it "returns http success" do
        response.should be_success
      end
      
      it "should have the right title" do
        title = @page_title + I18n.t(:title_home)
        response.should have_selector('title', :content => title)
      end
      
      it "should not containt missing translation" do
        response.should_not contain('translation missing:')
      end

      it "should not containt <span class='translation_missing'>" do
        response.should_not have_selector('span.translation_missing')
      end
    end

    describe "GET 'contact'" do
      before(:each) do
        get 'contact'
      end
  
      it "returns http success" do
        response.should be_success
      end
      
      it "should have the right title" do
        title = @page_title + I18n.t(:title_contact)
        response.should have_selector('title', :content => title)
      end

      it "should not containt missing translation" do
        response.should_not contain('translation missing:')
      end

      it "should not containt <span class='translation_missing'>" do
        response.should_not have_selector('span.translation_missing')
      end
    end
  
    describe "GET 'about'" do
      before(:each) do
        get 'about'
      end
  
      it "returns http success" do
        response.should be_success
      end
      
      it "should have the right title" do
        title = @page_title + I18n.t(:title_about)
        response.should have_selector('title', :content => title)
      end

      it "should not containt missing translation" do
        response.should_not contain('translation missing:')
      end

      it "should not containt <span class='translation_missing'>" do
        response.should_not have_selector('span.translation_missing')
      end
    end
  
    describe "GET 'help'" do
      before(:each) do
        get 'help'
      end
      
      it "returns http success" do
        response.should be_success
      end
      
      it "should have the right title" do
        title = @page_title + I18n.t(:title_help)
        response.should have_selector('title', :content => title)
      end

      it "should not containt missing translation" do
        response.should_not contain('translation missing:')
      end

      it "should not containt <span class='translation_missing'>" do
        response.should_not have_selector('span.translation_missing')
      end
    end
  
    describe "GET 'tools'" do
      before(:each) do
        get 'tools'
      end
  
      it "returns http success" do
        response.should be_success
      end
      
      it "should have the right title" do
        title = @page_title + I18n.t(:title_tools_overview)
        response.should have_selector('title', :content => title)
      end

      it "should not containt missing translation" do
        response.should_not contain('translation missing:')
      end

      it "should not containt <span class='translation_missing'>" do
        response.should_not have_selector('span.translation_missing')
      end
    end
  
    describe "GET 'khplanner'" do
      before(:each) do
        get 'khplanner'
      end
  
      it "returns http success" do
        response.should be_success
      end
      
      it "should have the right title" do
        title = @page_title + I18n.t(:title_khplanner)
        response.should have_selector('title', :content => title)
      end

      it "should not containt missing translation" do
        response.should_not contain('translation missing:')
      end

      it "should not containt <span class='translation_missing'>" do
        response.should_not have_selector('span.translation_missing')
      end
    end
  end
end
