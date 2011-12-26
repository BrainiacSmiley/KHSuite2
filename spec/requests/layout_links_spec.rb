require 'spec_helper'

describe "LayoutLinks" do
  I18n.available_locales.each do |locale|
    I18n.locale = locale

    it "should have a Home page at '/'" do
      get '/'
      response.should have_selector('title', :content => I18n.t(:title_home))
    end
    
    it "should have a Contact page at '/contact'" do
      get '/contact'
      response.should have_selector('title', :content => I18n.t(:title_contact))
    end
    
    it "should have a About page at '/about'" do
      get '/about'
      response.should have_selector('title', :content => I18n.t(:title_about))
    end
    
    it "should have a Help page at '/help'" do
      get '/help'
      response.should have_selector('title', :content => I18n.t(:title_help))
    end
    
    it "should have a Tools page at '/tools'" do
      get '/tools'
      response.should have_selector('title', :content => I18n.t(:title_tools_overview))
    end
    
    it "should have a KHPlanner page at '/khplanner'" do
      get '/khplanner'
      response.should have_selector('title', :content => I18n.t(:title_khplanner))
    end

    it "should have the right links on the layout" do
      visit root_path
      click_link I18n.t(:link_about)
      response.should have_selector('title', :content => I18n.t(:title_about))
      click_link I18n.t(:link_help)
      response.should have_selector('title', :content => I18n.t(:title_help))
      click_link I18n.t(:link_contact)
      response.should have_selector('title', :content => I18n.t(:title_contact))
      click_link I18n.t(:link_home)
      response.should have_selector('title', :content => I18n.t(:title_home))
      click_link I18n.t(:link_tools_overview)
      response.should have_selector('title', :content => I18n.t(:title_tools_overview))
      click_link I18n.t(:link_khplanner)
      response.should have_selector('title', :content => I18n.t(:title_khplanner))
    end
  end
end
