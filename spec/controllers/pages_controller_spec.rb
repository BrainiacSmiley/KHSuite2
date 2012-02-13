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

      describe "sidebar" do
        before(:each) do
          @user = Factory(:user)
          test_sign_in(@user)
          Factory(:doctor, :user => @user)
          @doctors = @user.doctors.all
          get 'home'
        end
  
        it "should have the users name in it" do
          response.should contain("Name: #{@user.name}")
        end
        
        it "should have a link to the user profile" do
          response.should have_selector('a',
                                        :href => user_path(@user),
                                        :content => @user.name
                                       )
        end
        
        it "should have the number of doctors" do
          response.should contain("#{I18n.t(:doctors)}: #{@user.doctors.count}")
        end
        
        it "should have a new doctor link" do
          response.should have_selector('a',
                                        :href => new_doctor_path,
                                        :content => I18n.t(:link_doctor_new)
                                       )
        end
        
        it "should have the doctors badge for every doctor" do
          @doctors.each do |doctor|
            response.should have_selector('a',
                                          :href => '#',
                                          :content => "Statistik"
                                         )
            response.should have_selector('a',
                                          :href => edit_doctor_path(doctor),
                                          :content => "Edit"
                                         )
            response.should have_selector('a',
                                          :href => doctor_path(doctor),
                                          :content => "Delete"
                                         )
            response.should have_selector('strong', :content => "S#{doctor.server}")
            response.should have_selector('strong', :content => doctor.name)
            response.should have_selector('img', :src => doctor.avatar)
            response.should contain("#{I18n.t(:av)}: #{doctor.av}")
            response.should contain("#{I18n.t(:level)}: #{doctor.level}")
            response.should contain("#{I18n.t(:money)}: #{doctor.level} hT")
            response.should contain("#{I18n.t(:points)}: #{doctor.level}")
          end
        end
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

      describe "sidebar" do
        before(:each) do
          @user = Factory(:user)
          test_sign_in(@user)
          Factory(:doctor, :user => @user)
          @doctors = @user.doctors.all
          get 'contact'
        end
  
        it "should have the users name in it" do
          response.should contain("Name: #{@user.name}")
        end
        
        it "should have a link to the user profile" do
          response.should have_selector('a',
                                        :href => user_path(@user),
                                        :content => @user.name
                                       )
        end
        
        it "should have the number of doctors" do
          response.should contain("#{I18n.t(:doctors)}: #{@user.doctors.count}")
        end
        
        it "should have a new doctor link" do
          response.should have_selector('a',
                                        :href => new_doctor_path,
                                        :content => I18n.t(:link_doctor_new)
                                       )
        end
        
        it "should have the doctors badge for every doctor" do
          @doctors.each do |doctor|
            response.should have_selector('a',
                                          :href => '#',
                                          :content => "Statistik"
                                         )
            response.should have_selector('a',
                                          :href => edit_doctor_path(doctor),
                                          :content => "Edit"
                                         )
            response.should have_selector('a',
                                          :href => doctor_path(doctor),
                                          :content => "Delete"
                                         )
            response.should have_selector('strong', :content => "S#{doctor.server}")
            response.should have_selector('strong', :content => doctor.name)
            response.should have_selector('img', :src => doctor.avatar)
            response.should contain("#{I18n.t(:av)}: #{doctor.av}")
            response.should contain("#{I18n.t(:level)}: #{doctor.level}")
            response.should contain("#{I18n.t(:money)}: #{doctor.level} hT")
            response.should contain("#{I18n.t(:points)}: #{doctor.level}")
          end
        end
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

      describe "sidebar" do
        before(:each) do
          @user = Factory(:user)
          test_sign_in(@user)
          Factory(:doctor, :user => @user)
          @doctors = @user.doctors.all
          get 'about'
        end
  
        it "should have the users name in it" do
          response.should contain("Name: #{@user.name}")
        end
        
        it "should have a link to the user profile" do
          response.should have_selector('a',
                                        :href => user_path(@user),
                                        :content => @user.name
                                       )
        end
        
        it "should have the number of doctors" do
          response.should contain("#{I18n.t(:doctors)}: #{@user.doctors.count}")
        end
        
        it "should have a new doctor link" do
          response.should have_selector('a',
                                        :href => new_doctor_path,
                                        :content => I18n.t(:link_doctor_new)
                                       )
        end
        
        it "should have the doctors badge for every doctor" do
          @doctors.each do |doctor|
            response.should have_selector('a',
                                          :href => '#',
                                          :content => "Statistik"
                                         )
            response.should have_selector('a',
                                          :href => edit_doctor_path(doctor),
                                          :content => "Edit"
                                         )
            response.should have_selector('a',
                                          :href => doctor_path(doctor),
                                          :content => "Delete"
                                         )
            response.should have_selector('strong', :content => "S#{doctor.server}")
            response.should have_selector('strong', :content => doctor.name)
            response.should have_selector('img', :src => doctor.avatar)
            response.should contain("#{I18n.t(:av)}: #{doctor.av}")
            response.should contain("#{I18n.t(:level)}: #{doctor.level}")
            response.should contain("#{I18n.t(:money)}: #{doctor.level} hT")
            response.should contain("#{I18n.t(:points)}: #{doctor.level}")
          end
        end
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

      describe "sidebar" do
        before(:each) do
          @user = Factory(:user)
          test_sign_in(@user)
          Factory(:doctor, :user => @user)
          @doctors = @user.doctors.all
          get 'help'
        end
  
        it "should have the users name in it" do
          response.should contain("Name: #{@user.name}")
        end
        
        it "should have a link to the user profile" do
          response.should have_selector('a',
                                        :href => user_path(@user),
                                        :content => @user.name
                                       )
        end
        
        it "should have the number of doctors" do
          response.should contain("#{I18n.t(:doctors)}: #{@user.doctors.count}")
        end
        
        it "should have a new doctor link" do
          response.should have_selector('a',
                                        :href => new_doctor_path,
                                        :content => I18n.t(:link_doctor_new)
                                       )
        end
        
        it "should have the doctors badge for every doctor" do
          @doctors.each do |doctor|
            response.should have_selector('a',
                                          :href => '#',
                                          :content => "Statistik"
                                         )
            response.should have_selector('a',
                                          :href => edit_doctor_path(doctor),
                                          :content => "Edit"
                                         )
            response.should have_selector('a',
                                          :href => doctor_path(doctor),
                                          :content => "Delete"
                                         )
            response.should have_selector('strong', :content => "S#{doctor.server}")
            response.should have_selector('strong', :content => doctor.name)
            response.should have_selector('img', :src => doctor.avatar)
            response.should contain("#{I18n.t(:av)}: #{doctor.av}")
            response.should contain("#{I18n.t(:level)}: #{doctor.level}")
            response.should contain("#{I18n.t(:money)}: #{doctor.level} hT")
            response.should contain("#{I18n.t(:points)}: #{doctor.level}")
          end
        end
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

      describe "sidebar" do
        before(:each) do
          @user = Factory(:user)
          test_sign_in(@user)
          Factory(:doctor, :user => @user)
          @doctors = @user.doctors.all
          get 'tools'
        end
  
        it "should have the users name in it" do
          response.should contain("Name: #{@user.name}")
        end
        
        it "should have a link to the user profile" do
          response.should have_selector('a',
                                        :href => user_path(@user),
                                        :content => @user.name
                                       )
        end
        
        it "should have the number of doctors" do
          response.should contain("#{I18n.t(:doctors)}: #{@user.doctors.count}")
        end
        
        it "should have a new doctor link" do
          response.should have_selector('a',
                                        :href => new_doctor_path,
                                        :content => I18n.t(:link_doctor_new)
                                       )
        end
        
        it "should have the doctors badge for every doctor" do
          @doctors.each do |doctor|
            response.should have_selector('a',
                                          :href => '#',
                                          :content => "Statistik"
                                         )
            response.should have_selector('a',
                                          :href => edit_doctor_path(doctor),
                                          :content => "Edit"
                                         )
            response.should have_selector('a',
                                          :href => doctor_path(doctor),
                                          :content => "Delete"
                                         )
            response.should have_selector('strong', :content => "S#{doctor.server}")
            response.should have_selector('strong', :content => doctor.name)
            response.should have_selector('img', :src => doctor.avatar)
            response.should contain("#{I18n.t(:av)}: #{doctor.av}")
            response.should contain("#{I18n.t(:level)}: #{doctor.level}")
            response.should contain("#{I18n.t(:money)}: #{doctor.level} hT")
            response.should contain("#{I18n.t(:points)}: #{doctor.level}")
          end
        end
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
      
      it "should contain the applet tag" do
        response.should have_selector('applet')
      end
      
      it "should contain the params tag with the locale as value" do
        response.should have_selector('param', :value => I18n.locale.to_s)
      end

      it "should not containt missing translation" do
        response.should_not contain('translation missing:')
      end

      it "should not containt <span class='translation_missing'>" do
        response.should_not have_selector('span.translation_missing')
      end
    end

    describe "GET 'khadvancedassignment'" do
      before(:each) do
        get 'khadvancedassignment'
      end
  
      it "returns http success" do
        response.should be_success
      end
      
      it "should have the right title" do
        title = @page_title + I18n.t(:title_khadvancedassignment)
        response.should have_selector('title', :content => title)
      end
      
      it "should not containt missing translation" do
        response.should_not contain('translation missing:')
      end

      it "should not containt <span class='translation_missing'>" do
        response.should_not have_selector('span.translation_missing')
      end
  
      describe "sidebar" do
        before(:each) do
          @user = Factory(:user)
          test_sign_in(@user)
          Factory(:doctor, :user => @user)
          @doctors = @user.doctors.all
          get 'tools'
        end
  
        it "should have the users name in it" do
          response.should contain("Name: #{@user.name}")
        end
        
        it "should have a link to the user profile" do
          response.should have_selector('a',
                                        :href => user_path(@user),
                                        :content => @user.name
                                       )
        end
        
        it "should have the number of doctors" do
          response.should contain("#{I18n.t(:doctors)}: #{@user.doctors.count}")
        end
        
        it "should have a new doctor link" do
          response.should have_selector('a',
                                        :href => new_doctor_path,
                                        :content => I18n.t(:link_doctor_new)
                                       )
        end
        
        it "should have the doctors badge for every doctor" do
          @doctors.each do |doctor|
            response.should have_selector('a',
                                          :href => '#',
                                          :content => "Statistik"
                                         )
            response.should have_selector('a',
                                          :href => edit_doctor_path(doctor),
                                          :content => "Edit"
                                         )
            response.should have_selector('a',
                                          :href => doctor_path(doctor),
                                          :content => "Delete"
                                         )
            response.should have_selector('strong', :content => "S#{doctor.server}")
            response.should have_selector('strong', :content => doctor.name)
            response.should have_selector('img', :src => doctor.avatar)
            response.should contain("#{I18n.t(:av)}: #{doctor.av}")
            response.should contain("#{I18n.t(:level)}: #{doctor.level}")
            response.should contain("#{I18n.t(:money)}: #{doctor.level} hT")
            response.should contain("#{I18n.t(:points)}: #{doctor.level}")
          end
        end
      end
    end

    describe "GET 'khadvancedmedrack'" do
      before(:each) do
        get 'khadvancedmedrack'
      end
  
      it "returns http success" do
        response.should be_success
      end
      
      it "should have the right title" do
        title = @page_title + I18n.t(:title_khadvancedmedrack)
        response.should have_selector('title', :content => title)
      end
      
      it "should not containt missing translation" do
        response.should_not contain('translation missing:')
      end

      it "should not containt <span class='translation_missing'>" do
        response.should_not have_selector('span.translation_missing')
      end
  
      describe "sidebar" do
        before(:each) do
          @user = Factory(:user)
          test_sign_in(@user)
          Factory(:doctor, :user => @user)
          @doctors = @user.doctors.all
          get 'tools'
        end
  
        it "should have the users name in it" do
          response.should contain("Name: #{@user.name}")
        end
        
        it "should have a link to the user profile" do
          response.should have_selector('a',
                                        :href => user_path(@user),
                                        :content => @user.name
                                       )
        end
        
        it "should have the number of doctors" do
          response.should contain("#{I18n.t(:doctors)}: #{@user.doctors.count}")
        end
        
        it "should have a new doctor link" do
          response.should have_selector('a',
                                        :href => new_doctor_path,
                                        :content => I18n.t(:link_doctor_new)
                                       )
        end
        
        it "should have the doctors badge for every doctor" do
          @doctors.each do |doctor|
            response.should have_selector('a',
                                          :href => '#',
                                          :content => "Statistik"
                                         )
            response.should have_selector('a',
                                          :href => edit_doctor_path(doctor),
                                          :content => "Edit"
                                         )
            response.should have_selector('a',
                                          :href => doctor_path(doctor),
                                          :content => "Delete"
                                         )
            response.should have_selector('strong', :content => "S#{doctor.server}")
            response.should have_selector('strong', :content => doctor.name)
            response.should have_selector('img', :src => doctor.avatar)
            response.should contain("#{I18n.t(:av)}: #{doctor.av}")
            response.should contain("#{I18n.t(:level)}: #{doctor.level}")
            response.should contain("#{I18n.t(:money)}: #{doctor.level} hT")
            response.should contain("#{I18n.t(:points)}: #{doctor.level}")
          end
        end
      end
    end

    describe "GET 'khadvancedpatientview'" do
      before(:each) do
        get 'khadvancedpatientview'
      end
  
      it "returns http success" do
        response.should be_success
      end
      
      it "should have the right title" do
        title = @page_title + I18n.t(:title_khadvancedpatientview)
        response.should have_selector('title', :content => title)
      end
      
      it "should not containt missing translation" do
        response.should_not contain('translation missing:')
      end

      it "should not containt <span class='translation_missing'>" do
        response.should_not have_selector('span.translation_missing')
      end
  
      describe "sidebar" do
        before(:each) do
          @user = Factory(:user)
          test_sign_in(@user)
          Factory(:doctor, :user => @user)
          @doctors = @user.doctors.all
          get 'tools'
        end
  
        it "should have the users name in it" do
          response.should contain("Name: #{@user.name}")
        end
        
        it "should have a link to the user profile" do
          response.should have_selector('a',
                                        :href => user_path(@user),
                                        :content => @user.name
                                       )
        end
        
        it "should have the number of doctors" do
          response.should contain("#{I18n.t(:doctors)}: #{@user.doctors.count}")
        end
        
        it "should have a new doctor link" do
          response.should have_selector('a',
                                        :href => new_doctor_path,
                                        :content => I18n.t(:link_doctor_new)
                                       )
        end
        
        it "should have the doctors badge for every doctor" do
          @doctors.each do |doctor|
            response.should have_selector('a',
                                          :href => '#',
                                          :content => "Statistik"
                                         )
            response.should have_selector('a',
                                          :href => edit_doctor_path(doctor),
                                          :content => "Edit"
                                         )
            response.should have_selector('a',
                                          :href => doctor_path(doctor),
                                          :content => "Delete"
                                         )
            response.should have_selector('strong', :content => "S#{doctor.server}")
            response.should have_selector('strong', :content => doctor.name)
            response.should have_selector('img', :src => doctor.avatar)
            response.should contain("#{I18n.t(:av)}: #{doctor.av}")
            response.should contain("#{I18n.t(:level)}: #{doctor.level}")
            response.should contain("#{I18n.t(:money)}: #{doctor.level} hT")
            response.should contain("#{I18n.t(:points)}: #{doctor.level}")
          end
        end
      end
    end

    describe "GET 'khadvancement'" do
      before(:each) do
        get 'khadvancement'
      end
  
      it "returns http success" do
        response.should be_success
      end
      
      it "should have the right title" do
        title = @page_title + I18n.t(:title_khadvancement)
        response.should have_selector('title', :content => title)
      end
      
      it "should not containt missing translation" do
        response.should_not contain('translation missing:')
      end

      it "should not containt <span class='translation_missing'>" do
        response.should_not have_selector('span.translation_missing')
      end

      describe "sidebar" do
        before(:each) do
          @user = Factory(:user)
          test_sign_in(@user)
          Factory(:doctor, :user => @user)
          @doctors = @user.doctors.all
          get 'tools'
        end
  
        it "should have the users name in it" do
          response.should contain("Name: #{@user.name}")
        end
        
        it "should have a link to the user profile" do
          response.should have_selector('a',
                                        :href => user_path(@user),
                                        :content => @user.name
                                       )
        end
        
        it "should have the number of doctors" do
          response.should contain("#{I18n.t(:doctors)}: #{@user.doctors.count}")
        end
        
        it "should have a new doctor link" do
          response.should have_selector('a',
                                        :href => new_doctor_path,
                                        :content => I18n.t(:link_doctor_new)
                                       )
        end
        
        it "should have the doctors badge for every doctor" do
          @doctors.each do |doctor|
            response.should have_selector('a',
                                          :href => '#',
                                          :content => "Statistik"
                                         )
            response.should have_selector('a',
                                          :href => edit_doctor_path(doctor),
                                          :content => "Edit"
                                         )
            response.should have_selector('a',
                                          :href => doctor_path(doctor),
                                          :content => "Delete"
                                         )
            response.should have_selector('strong', :content => "S#{doctor.server}")
            response.should have_selector('strong', :content => doctor.name)
            response.should have_selector('img', :src => doctor.avatar)
            response.should contain("#{I18n.t(:av)}: #{doctor.av}")
            response.should contain("#{I18n.t(:level)}: #{doctor.level}")
            response.should contain("#{I18n.t(:money)}: #{doctor.level} hT")
            response.should contain("#{I18n.t(:points)}: #{doctor.level}")
          end
        end
      end
    end

    describe "GET 'khopticalimprovements'" do
      before(:each) do
        get 'khopticalimprovements'
      end
  
      it "returns http success" do
        response.should be_success
      end
      
      it "should have the right title" do
        title = @page_title + I18n.t(:title_khopticalimprovements)
        response.should have_selector('title', :content => title)
      end
      
      it "should not containt missing translation" do
        response.should_not contain('translation missing:')
      end

      it "should not containt <span class='translation_missing'>" do
        response.should_not have_selector('span.translation_missing')
      end

      describe "sidebar" do
        before(:each) do
          @user = Factory(:user)
          test_sign_in(@user)
          Factory(:doctor, :user => @user)
          @doctors = @user.doctors.all
          get 'tools'
        end
  
        it "should have the users name in it" do
          response.should contain("Name: #{@user.name}")
        end
        
        it "should have a link to the user profile" do
          response.should have_selector('a',
                                        :href => user_path(@user),
                                        :content => @user.name
                                       )
        end
        
        it "should have the number of doctors" do
          response.should contain("#{I18n.t(:doctors)}: #{@user.doctors.count}")
        end
        
        it "should have a new doctor link" do
          response.should have_selector('a',
                                        :href => new_doctor_path,
                                        :content => I18n.t(:link_doctor_new)
                                       )
        end
        
        it "should have the doctors badge for every doctor" do
          @doctors.each do |doctor|
            response.should have_selector('a',
                                          :href => '#',
                                          :content => "Statistik"
                                         )
            response.should have_selector('a',
                                          :href => edit_doctor_path(doctor),
                                          :content => "Edit"
                                         )
            response.should have_selector('a',
                                          :href => doctor_path(doctor),
                                          :content => "Delete"
                                         )
            response.should have_selector('strong', :content => "S#{doctor.server}")
            response.should have_selector('strong', :content => doctor.name)
            response.should have_selector('img', :src => doctor.avatar)
            response.should contain("#{I18n.t(:av)}: #{doctor.av}")
            response.should contain("#{I18n.t(:level)}: #{doctor.level}")
            response.should contain("#{I18n.t(:money)}: #{doctor.level} hT")
            response.should contain("#{I18n.t(:points)}: #{doctor.level}")
          end
        end
      end
    end

    describe "GET 'khpatientcounter'" do
      before(:each) do
        get 'khpatientcounter'
      end
  
      it "returns http success" do
        response.should be_success
      end
      
      it "should have the right title" do
        title = @page_title + I18n.t(:title_khpatientcounter)
        response.should have_selector('title', :content => title)
      end
      
      it "should not containt missing translation" do
        response.should_not contain('translation missing:')
      end

      it "should not containt <span class='translation_missing'>" do
        response.should_not have_selector('span.translation_missing')
      end

      describe "sidebar" do
        before(:each) do
          @user = Factory(:user)
          test_sign_in(@user)
          Factory(:doctor, :user => @user)
          @doctors = @user.doctors.all
          get 'tools'
        end
  
        it "should have the users name in it" do
          response.should contain("Name: #{@user.name}")
        end
        
        it "should have a link to the user profile" do
          response.should have_selector('a',
                                        :href => user_path(@user),
                                        :content => @user.name
                                       )
        end
        
        it "should have the number of doctors" do
          response.should contain("#{I18n.t(:doctors)}: #{@user.doctors.count}")
        end
        
        it "should have a new doctor link" do
          response.should have_selector('a',
                                        :href => new_doctor_path,
                                        :content => I18n.t(:link_doctor_new)
                                       )
        end
        
        it "should have the doctors badge for every doctor" do
          @doctors.each do |doctor|
            response.should have_selector('a',
                                          :href => '#',
                                          :content => "Statistik"
                                         )
            response.should have_selector('a',
                                          :href => edit_doctor_path(doctor),
                                          :content => "Edit"
                                         )
            response.should have_selector('a',
                                          :href => doctor_path(doctor),
                                          :content => "Delete"
                                         )
            response.should have_selector('strong', :content => "S#{doctor.server}")
            response.should have_selector('strong', :content => doctor.name)
            response.should have_selector('img', :src => doctor.avatar)
            response.should contain("#{I18n.t(:av)}: #{doctor.av}")
            response.should contain("#{I18n.t(:level)}: #{doctor.level}")
            response.should contain("#{I18n.t(:money)}: #{doctor.level} hT")
            response.should contain("#{I18n.t(:points)}: #{doctor.level}")
          end
        end
      end
    end

    describe "GET 'khshortcuts'" do
      before(:each) do
        get 'khshortcuts'
      end
  
      it "returns http success" do
        response.should be_success
      end
      
      it "should have the right title" do
        title = @page_title + I18n.t(:title_khshortcuts)
        response.should have_selector('title', :content => title)
      end
      
      it "should not containt missing translation" do
        response.should_not contain('translation missing:')
      end

      it "should not containt <span class='translation_missing'>" do
        response.should_not have_selector('span.translation_missing')
      end

      describe "sidebar" do
        before(:each) do
          @user = Factory(:user)
          test_sign_in(@user)
          Factory(:doctor, :user => @user)
          @doctors = @user.doctors.all
          get 'tools'
        end
  
        it "should have the users name in it" do
          response.should contain("Name: #{@user.name}")
        end
        
        it "should have a link to the user profile" do
          response.should have_selector('a',
                                        :href => user_path(@user),
                                        :content => @user.name
                                       )
        end
        
        it "should have the number of doctors" do
          response.should contain("#{I18n.t(:doctors)}: #{@user.doctors.count}")
        end
        
        it "should have a new doctor link" do
          response.should have_selector('a',
                                        :href => new_doctor_path,
                                        :content => I18n.t(:link_doctor_new)
                                       )
        end
        
        it "should have the doctors badge for every doctor" do
          @doctors.each do |doctor|
            response.should have_selector('a',
                                          :href => '#',
                                          :content => "Statistik"
                                         )
            response.should have_selector('a',
                                          :href => edit_doctor_path(doctor),
                                          :content => "Edit"
                                         )
            response.should have_selector('a',
                                          :href => doctor_path(doctor),
                                          :content => "Delete"
                                         )
            response.should have_selector('strong', :content => "S#{doctor.server}")
            response.should have_selector('strong', :content => doctor.name)
            response.should have_selector('img', :src => doctor.avatar)
            response.should contain("#{I18n.t(:av)}: #{doctor.av}")
            response.should contain("#{I18n.t(:level)}: #{doctor.level}")
            response.should contain("#{I18n.t(:money)}: #{doctor.level} hT")
            response.should contain("#{I18n.t(:points)}: #{doctor.level}")
          end
        end
      end
    end

    describe "GET 'khtimer'" do
      before(:each) do
        get 'khtimer'
      end
  
      it "returns http success" do
        response.should be_success
      end
      
      it "should have the right title" do
        title = @page_title + I18n.t(:title_khtimer)
        response.should have_selector('title', :content => title)
      end
      
      it "should not containt missing translation" do
        response.should_not contain('translation missing:')
      end

      it "should not containt <span class='translation_missing'>" do
        response.should_not have_selector('span.translation_missing')
      end

      describe "sidebar" do
        before(:each) do
          @user = Factory(:user)
          test_sign_in(@user)
          Factory(:doctor, :user => @user)
          @doctors = @user.doctors.all
          get 'tools'
        end
  
        it "should have the users name in it" do
          response.should contain("Name: #{@user.name}")
        end
        
        it "should have a link to the user profile" do
          response.should have_selector('a',
                                        :href => user_path(@user),
                                        :content => @user.name
                                       )
        end
        
        it "should have the number of doctors" do
          response.should contain("#{I18n.t(:doctors)}: #{@user.doctors.count}")
        end
        
        it "should have a new doctor link" do
          response.should have_selector('a',
                                        :href => new_doctor_path,
                                        :content => I18n.t(:link_doctor_new)
                                       )
        end
        
        it "should have the doctors badge for every doctor" do
          @doctors.each do |doctor|
            response.should have_selector('a',
                                          :href => '#',
                                          :content => "Statistik"
                                         )
            response.should have_selector('a',
                                          :href => edit_doctor_path(doctor),
                                          :content => "Edit"
                                         )
            response.should have_selector('a',
                                          :href => doctor_path(doctor),
                                          :content => "Delete"
                                         )
            response.should have_selector('strong', :content => "S#{doctor.server}")
            response.should have_selector('strong', :content => doctor.name)
            response.should have_selector('img', :src => doctor.avatar)
            response.should contain("#{I18n.t(:av)}: #{doctor.av}")
            response.should contain("#{I18n.t(:level)}: #{doctor.level}")
            response.should contain("#{I18n.t(:money)}: #{doctor.level} hT")
            response.should contain("#{I18n.t(:points)}: #{doctor.level}")
          end
        end
      end
    end
  end
end
