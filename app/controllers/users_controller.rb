class UsersController < ApplicationController
  def destroy
    user_to_destroy = User.find(params[:id])
    user_to_destroy.destroy
    flash[:success] = t(:flash_user_deleted_success)
    @title = t(:title_user_all)
    @users = User.paginate(:page => params[:page])
    render 'index'
  end
  
  def index
    @title = t(:title_user_all)
    @users = User.paginate(:page => params[:page])
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(params[:user])
      flash[:success] = t(:flash_user_edit_success)
      redirect_to @user
    else
      @title = t(:title_user_edit)
      render 'edit'
    end
  end
  
  def edit
    @user = User.find(params[:id])
    @title = t(:title_user_edit)
  end
  
  def show
    @user = User.find(params[:id])
    @title = @user.name
  end
  
  def new
    @user = User.new
    @title = t(:title_user_new)
  end
  
  def create
    @user = User.new(params[:user])
    if @user.save
      flash[:success] = t(:flash_user_create_success)
      redirect_to @user
    else
      @title = t(:title_user_new)
      @user.password = ""
      @user.password_confirmation = ""
      render 'new'
    end
  end
end
