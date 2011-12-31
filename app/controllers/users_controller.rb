class UsersController < ApplicationController
  before_filter :authenticate, :only => [:index, :show, :edit, :update, :destroy]
  before_filter :admin_user,   :only => [:index, :destroy]
  before_filter :correct_user, :only => [:edit, :update]
  
  def destroy
    user_to_destroy = User.find(params[:id])
    if (current_user != user_to_destroy)
      user_to_destroy.destroy
      flash[:success] = t(:flash_user_deleted_success)
    else
      flash[:error] = t(:flash_user_delete_himself)
    end
    @title = t(:title_user_all)
    @users = User.paginate(:page => params[:page])
    render 'index'
  end
  
  def index
    @title = t(:title_user_all)
    @users = User.paginate(:page => params[:page])
  end

  def update
    if @user.update_attributes(params[:user])
      flash[:success] = t(:flash_user_edit_success)
      redirect_to @user
    else
      @title = t(:title_user_edit)
      render 'edit'
    end
  end
  
  def edit
    @title = t(:title_user_edit)
    @user_doctors = @user.doctors
  end
  
  def show
    @user = User.find(params[:id])
    @user_doctors = @user.doctors
    @title = @user.name
  end
  
  def new
    if (!signed_in?)
      @user = User.new
      @title = t(:title_user_new)
    else
      to_root
    end
  end
  
  def create
    if (!signed_in?)
      @user = User.new(params[:user])
      if @user.save
        sign_in @user
        flash[:success] = t(:flash_user_create_success)
        redirect_to @user
      else
        @title = t(:title_user_new)
        @user.password = ""
        @user.password_confirmation = ""
        render 'new'
      end
    else
      to_root
    end
  end
  
  private
    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_path) unless current_user?(@user)
    end
    
    def admin_user
      if !current_user.admin?
        flash[:error] = t(:missing_rights)
        redirect_to(root_path)
      end
    end
    
    def to_root
      @title = t(:title_home)
      redirect_to(root_path)
    end
end
