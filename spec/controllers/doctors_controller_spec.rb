require 'spec_helper'

describe DoctorsController do
  render_views

  I18n.available_locales.each do |locale|
    I18n.locale = locale

    describe "GET 'index'" do
      describe "for non-signed-in users" do
        it "should deny access" do
          get :index
          response.should redirect_to(signin_path)
          flash[:notice].should == I18n.t(:access_denied)
        end
      end
      
      describe "for signed-in users" do
        it "should protect the page" do
          test_sign_in(Factory(:user))
          get :index
          response.should redirect_to(root_path)
          flash[:error].should == I18n.t(:missing_rights)          
        end
      end

      describe "for admin users" do
        before(:each) do
          @admin = Factory(:user, :email => "admin@example.com", :admin => true)
          test_sign_in(@admin)
          @users = [@admin]
          30.times do
            @users << Factory(:user, :email => Factory.next(:email))
          end
          @doctor = Factory(:doctor, :user => @admin)
          @doctors = [@doctor]
          @users.each do |user|
            5.times do |n|
              server = n + 2
              @doctors << Factory(:doctor, :user => user, :server => server)
            end
          end
          @doctors.sort_by!{ |s| s.server }
          get :index
        end

        it "should be succesful" do
          response.should be_success
        end
        
        it "should have the right title" do
          response.should have_selector('title', :content => I18n.t(:title_doctor_all))
        end

        it "should not containt missing translation" do
          response.should_not contain('translation missing:')
        end
  
        it "should not containt <span class='translation_missing'>" do
          response.should_not have_selector('span.translation_missing')
        end

        it "should have an element for each doctor" do
          @doctors[0..5].each do |doctor|
            response.should have_selector('td', :content => doctor.name)
          end
        end

        it "should paginate doctors" do
          response.should have_selector('div.pagination')
          response.should have_selector('span.disabled', :content => I18n.t('paginate_test_prev'))
          response.should have_selector('a', :href => "/#{I18n.locale}/doctors?page=2", :content => "2")
          response.should have_selector('a', :href => "/#{I18n.locale}/doctors?page=2", :content => I18n.t('paginate_test_next'))
        end

        it "should have delete links for each user" do
          @doctors[0..2].each do |doctor|
            response.should have_selector('a', :href => doctor_path(doctor), :content => "delete")
          end
        end
      end
    end
    
    describe "PUT 'update'" do
      describe "for an unauthorized user" do
        before(:each) do
          @user = Factory(:user)
          @doctor = Factory(:doctor, :user => @user)
          wrong_user = Factory(:user, :email => Factory.next(:email))
          test_sign_in(wrong_user)
        end
        
        it "should deny access" do
          put :update, :id => @doctor, :doctor => @doctor
          flash[:error].should == I18n.t(:access_denied)
          response.should redirect_to(root_path)
        end
      end

      describe "for an authorized user" do
        before(:each) do
          @user = Factory(:user)
          @doctor = Factory(:doctor, :user => @user)
          test_sign_in(@user)
        end
        
        describe "success" do
          before(:each) do
            @attr = { :server => 2, :name => "New name", :level => 2, :av => "New AV" }
            put :update, :id => @doctor, :doctor => @attr
          end
          
          it "should change the doctors's attributes" do
            @doctor.reload
            @doctor.server.should == @attr[:server]
            @doctor.name.should == @attr[:name]
            @doctor.level.should == @attr[:level]
            @doctor.av.should == @attr[:av]
          end
          
          it "should redirect to the user show page" do
            response.should redirect_to(user_path)
          end
          
          it "should have a flash message" do
            flash[:success].should == I18n.t(:flash_doctor_edit_success)
          end
        end
        
        describe "failure" do
          before(:each) do
            @attr = { :name => "" }
            put :update, :id => @doctor, :doctor => @attr
          end
          
          it "should render the right page 'edit'" do
            response.should render_template('edit')
          end

          it "should have the right title" do
            response.should have_selector('title', :content => I18n.t(:title_doctor_edit))
          end
        end
      end
    end
    
    describe "GET 'edit'" do
      describe "for an unauthorized user" do
        before(:each) do
          @user = Factory(:user)
          wrong_user = Factory(:user, :email => Factory.next(:email))
          test_sign_in(wrong_user)
          @doctor = Factory(:doctor, :user => @user)
        end
        
        it "should deny access" do
          get :edit, :id => @doctor
          flash[:error].should == I18n.t(:access_denied)
          response.should redirect_to(root_path)
        end
      end
      
      describe "for an authorized user" do
        before(:each) do
          @user = Factory(:user)
          test_sign_in(@user)
          @doctor = Factory(:doctor, :user => @user)
        end
        
        it "should be successful" do
          get :edit, :id => @doctor
          response.should be_success
        end

        it "should have the right title" do
          get :edit, :id => @doctor
          response.should have_selector('title', :content => I18n.t(:title_doctor_edit))
        end

        it "should not containt missing translation" do
          response.should_not contain('translation missing:')
        end
  
        it "should not containt <span class='translation_missing'>" do
          response.should_not have_selector('span.translation_missing')
        end
        
        it "should have a name field" do
          get :edit, :id => @doctor
          response.should have_selector("input[name='doctor[name]'][type='text']")
        end
  
        it "should have an avatar field" do
          get :edit, :id => @doctor
          response.should have_selector("input[name='doctor[avatar]'][type='text']")
        end
  
        it "should have an av field" do
          get :edit, :id => @doctor
          response.should have_selector("input[name='doctor[av]'][type='text']")
        end
  
        it "should have an level field" do
          get :edit, :id => @doctor
          response.should have_selector("input[name='doctor[level]'][type='number']")
        end

        it "should deny edit doctors from other users" do
          wrong_doctor = Factory(:doctor, :user => Factory(:user, :email => Factory.next(:email)))
          get :edit, :id => wrong_doctor
          flash[:error].should == I18n.t(:access_denied)
          response.should redirect_to(root_path)
        end
        
        describe "sidebar" do
          before(:each) do
            @doctors = @user.doctors.all
            get :edit, :id => @doctor
          end
          
          it "should have the users name in it" do
            response.should contain("Name: #{@user.name}")
          end
          
          it "should have a link to the user profile" do
            response.should have_selector('a',
                                          :href => user_path(@user),
                                          :content => user_path(@user)
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

      describe "for an authorized admin user" do
        before(:each) do
          admin = Factory(:user, :admin => true)
          other_user = Factory(:user, :email => Factory.next(:email))
          test_sign_in(admin)
          @doctor = Factory(:doctor, :user => other_user)
        end
        
        it "should allow edit of other doctors" do
          get :edit, :id => @doctor
          response.should be_success
        end
      end
    end
    
    describe "DELETE 'destroy'" do
      describe "for an unauthorized user" do
        before(:each) do
          @user = Factory(:user)
          wrong_user = Factory(:user, :email => Factory.next(:email))
          test_sign_in(wrong_user)
          @doctor = Factory(:doctor, :user => @user)
        end
        
        it "should deny access" do
          delete :destroy, :id => @doctor
          flash[:error].should == I18n.t(:access_denied)
          response.should redirect_to(root_path)
        end
      end
      
      describe "for an authorized user" do
        before(:each) do
          @user = Factory(:user)
          test_sign_in(@user)
          @doctor = Factory(:doctor, :user => @user)
        end
        
        it "should destroy the doctor" do
          lambda do
            delete :destroy, :id => @doctor
          end.should change(Doctor, :count).by(-1)
        end
        
        it "should display flash[:success] message" do
          delete :destroy, :id => @doctor
          flash[:success].should == I18n.t(:flash_doctor_delete_success)
        end
      end

      describe "for an admin user authorized user" do
        before(:each) do
          admin = Factory(:user, :admin => true)
          other_user = Factory(:user, :email => Factory.next(:email))
          test_sign_in(admin)
          @doctor = Factory(:doctor, :user => other_user)
        end
        
        it "should destroy the doctor from other user" do
          lambda do
            delete :destroy, :id => @doctor
          end.should change(Doctor, :count).by(-1)
        end
        
        it "should display flash[:success] message" do
          delete :destroy, :id => @doctor
          flash[:success].should == I18n.t(:flash_doctor_delete_success)
        end
      end
    end
    
    describe "POST 'creature'" do
      before(:each) do
        @user = test_sign_in(Factory(:user))
      end
      
      describe "failure" do
        before(:each) do
          @attr = { :name => "" }
        end
        
        it "should not create a doctor" do
          lambda do
            post :create, :doctor => @attr
          end.should_not change(Doctor, :count)
        end
        
        it "should render the 'edit' page" do
          post :create, :doctor => @attr
          response.should render_template('edit')
        end
      end
      
      describe "success" do
        before(:each) do
          @attr = {
            :sever => 1,
            :name  => "TestDoctor"
          }
        end
        
        it "should create a doctor" do
          lambda do
            post :create, :doctor => @attr
          end.should change(Doctor, :count).by(1)
        end
        
        it "should redirect to 'user_path(@user)' page" do
          post :create, :doctor => @attr
          response.should redirect_to(user_path(@user))
        end
        
        it "should habe a flash message" do
          post :create, :doctor => @attr
          flash[:success].should == I18n.t(:flash_doctor_creation_success)
        end
      end
    end

    describe "GET 'new'" do
      before(:each) do
        @user = Factory(:user)
        test_sign_in(@user)
        Factory(:doctor, :user => @user)
        @doctors = @user.doctors.all
        get :new
      end
    
      it "should be successful" do
        response.should be_success
      end
      
      it "should have the right title" do
        response.should have_selector('title', :content => I18n.t(:title_doctor_new))
      end

      it "should not containt missing translation" do
        response.should_not contain('translation missing:')
      end

      it "should not containt <span class='translation_missing'>" do
        response.should_not have_selector('span.translation_missing')
      end
      
      it "should have a name field" do
        response.should have_selector("input[name='doctor[name]'][type='text']")
      end

      it "should have an avatar field" do
        response.should have_selector("input[name='doctor[avatar]'][type='text']")
      end

      it "should have an av field" do
        response.should have_selector("input[name='doctor[av]'][type='text']")
      end

      it "should have an level field" do
        response.should have_selector("input[name='doctor[level]'][type='number']")
      end

      describe "sidebar" do
        it "should have the users name in it" do
          response.should contain("Name: #{@user.name}")
        end
        
        it "should have a link to the user profile" do
          response.should have_selector('a',
                                        :href => user_path(@user),
                                        :content => user_path(@user)
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

    describe "access control" do
      it "should deny access to 'new'" do
        get :new
        response.should redirect_to(signin_path)
      end
  
      it "should deny access to 'create'" do
        post :create
        response.should redirect_to(signin_path)
      end
  
      it "should deny access to 'destroy'" do
        delete :destroy, :id => 1
        response.should redirect_to(signin_path)
      end
    end
  end
end