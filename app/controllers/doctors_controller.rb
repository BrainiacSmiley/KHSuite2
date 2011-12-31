class DoctorsController < ApplicationController
  before_filter :authenticate
  before_filter :authorized_user, :only => [:destroy, :edit, :update]
  before_filter :admin_user_only, :only => [:index]
  
  def index
    @title = t(:title_doctor_all)
    @doctors = Doctor.paginate(:page => params[:page])
  end
  
  def update
    find_needed_values
    
    if @user.doctors.find_by_id(params[:id]).update_attributes(params[:doctor])
      flash[:success] = t(:flash_doctor_edit_success)
      redirect_to user_path(@user)
    else
      @title = t(:title_doctor_edit)
      render 'edit'
    end
  end
  
  def edit
    find_needed_values
    @title = "#{@user.name} - #{@doctor.name} - #{t(:title_doctor_edit)}"
    render 'edit'
  end
  
  def new
    find_needed_values
    @title = "#{@user.name} - #{t(:title_doctor_new)}"
    @doctor = Doctor.new
    render 'new'
  end
  
  def create
    find_needed_values

    @doctor = current_user.doctors.build(params[:doctor])
    @title = t(:title_doctor_new)
    if @doctor.save
      flash[:success] = t(:flash_doctor_creation_success)
      redirect_to user_path(@user)
    else
      render 'edit'
    end
  end

  def destroy
    doc_from_current_user = current_user.doctors.find_by_id(@doctor.id)
    @doctor.destroy
    flash[:success] = t(:flash_doctor_delete_success)
    if doc_from_current_user.nil?
      redirect_to doctors_path
    else
      redirect_to user_path(current_user)
    end
  end
  
  private
    def admin_user_only
      if signed_in?
        if !current_user.admin?
          flash[:error] = I18n.t(:missing_rights)
          redirect_to root_path
        end
      else
        flash[:error] = I18n.t(:access_denied)
        redirect_to root_path
      end
    end
    
    def authorized_user
      if !current_user.admin?
        @doctor = current_user.doctors.find_by_id(params[:id])
        if @doctor.nil?
          flash[:error] = I18n.t(:access_denied)
          redirect_to root_path
        end
      else
       @doctor = Doctor.find_by_id(params[:id])
        if @doctor.nil?
          flash[:error] = I18n.t(:doctor_not_found)
          redirect_to root_path
        end
      end
    end
end