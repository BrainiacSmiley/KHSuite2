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

    it "should have a KHAdvancedAssignment page at '/khadvancedassignment'" do
      get '/khadvancedassignment'
      response.should have_selector('title', :content => I18n.t(:title_khadvancedassignment))
    end

    it "should have a KHAdvancedMedRack page at '/khadvancedmedrack'" do
      get '/khadvancedmedrack'
      response.should have_selector('title', :content => I18n.t(:title_khadvancedmedrack))
    end

    it "should have a KHAdvancedMemberlist page at '/khadvancedmemberlist'" do
      get '/khadvancedmemberlist'
      response.should have_selector('title', :content => I18n.t(:title_khadvancedmemberlist))
    end

    it "should have a KHAdvancedPatientView page at '/khadvancedpatientview'" do
      get '/khadvancedpatientview'
      response.should have_selector('title', :content => I18n.t(:title_khadvancedpatientview))
    end

    it "should have a KHAdvancemedReferral page at '/khadvancedreferral'" do
      get '/khadvancedreferral'
      response.should have_selector('title', :content => I18n.t(:title_khadvancedreferral))
    end

    it "should have a KHMedHelper page at '/khmedhelper'" do
      get '/khmedhelper'
      response.should have_selector('title', :content => I18n.t(:title_khmedhelper))
    end

    it "should have a KHOpticalImprovements page at '/khopticalimprovements'" do
      get '/khopticalimprovements'
      response.should have_selector('title', :content => I18n.t(:title_khopticalimprovements))
    end

    it "should have a KHPatientCounter page at '/khpatientcounter'" do
      get '/khpatientcounter'
      response.should have_selector('title', :content => I18n.t(:title_khpatientcounter))
    end

    it "should have a KHShortcuts page at '/khshortcuts'" do
      get '/khshortcuts'
      response.should have_selector('title', :content => I18n.t(:title_khshortcuts))
    end

    it "should have a KHShortcuts page at '/khtimer'" do
      get '/khtimer'
      response.should have_selector('title', :content => I18n.t(:title_khtimer))
    end

    it "should have a signup page at '/signup'" do
      get '/signup'
      response.should have_selector('title', :content => I18n.t(:title_user_new))
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
      click_link I18n.t(:link_khadvancedmedrack)
      response.should have_selector('title', :content => I18n.t(:title_khadvancedmedrack))
      click_link I18n.t(:link_khadvancedmemberlist)
      response.should have_selector('title', :content => I18n.t(:title_khadvancedmemberlist))
      click_link I18n.t(:link_khadvancedpatientview)
      response.should have_selector('title', :content => I18n.t(:title_khadvancedpatientview))
      click_link I18n.t(:link_khadvancedreferral)
      response.should have_selector('title', :content => I18n.t(:title_khadvancedreferral))
      click_link I18n.t(:link_khimprovedgraphics)
      response.should have_selector('title', :content => I18n.t(:title_khimprovedgraphics))
      click_link I18n.t(:link_khmedhelper)
      response.should have_selector('title', :content => I18n.t(:title_khmedhelper))
      click_link I18n.t(:link_khopticalimprovements)
      response.should have_selector('title', :content => I18n.t(:title_khopticalimprovements))
      click_link I18n.t(:link_khpatientcounter)
      response.should have_selector('title', :content => I18n.t(:title_khpatientcounter))
      click_link I18n.t(:link_khshortcuts)
      response.should have_selector('title', :content => I18n.t(:title_khshortcuts))
      click_link I18n.t(:link_khtimer)
      response.should have_selector('title', :content => I18n.t(:title_khtimer))
      click_link I18n.t(:link_signup)
      response.should have_selector('title', :content => I18n.t(:title_user_new))
    end

    describe "when not signed in" do
      it "should have a signin posiibility" do
        visit root_path
        response.should have_selector("input[name='session[email]'][type='text']")
        response.should have_selector("input[name='session[password]'][type='password']")
      end
    end

    describe "when signed in" do
      describe "no admin user" do
        before(:each) do
          @user = Factory(:user)
          integration_sign_in(@user)
          visit root_path
        end
  
        it "should have a signout link" do
          response.should have_selector('a', :href => "/#{I18n.locale}#{signout_path}", :content => I18n.t(:link_signout))
        end
  
        it "should have a profile link" do
          response.should have_selector('a', :href => user_path(I18n.locale, @user), :content => I18n.t(:link_profile))
        end
        
        it "should have a profile edit link" do
          response.should have_selector('a', :href => edit_user_path(I18n.locale, @user), :content => I18n.t(:link_settings))
        end

        it "should not have a Users link" do
          response.should_not have_selector('a', :href => "/#{I18n.locale}#{users_path}", :content => I18n.t(:link_userlist))
        end

        it "should not have a Doctors link" do
          response.should_not have_selector('a', :href => "/#{I18n.locale}#{doctors_path}", :content => I18n.t(:link_doctorlist))
        end
      end
      
      describe "admin user" do
        before(:each) do
          admin = Factory(:user, :email => "admin@example.com", :admin => true)
          integration_sign_in(admin)
          visit root_path
        end
        
        it "should have a Users link" do
          response.should have_selector('a', :href => "/#{I18n.locale}#{users_path}", :content => I18n.t(:link_userlist))
        end

        it "should have a Doctors link" do
          response.should have_selector('a', :href => "/#{I18n.locale}#{doctors_path}", :content => I18n.t(:link_doctorlist))
        end
      end
    end
  end
end
