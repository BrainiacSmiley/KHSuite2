class SessionsController < ApplicationController
  def new
    @title = I18n.t(:title_signin)
  end

  def create
    user = User.authenticate(params[:session][:email], params[:session][:password])
    if user.nil?
      flash.now[:error] = t(:flash_session_create_failure)
      @title = t(:title_signin)
      render 'new'
    else
      sign_in user
      redirect_back_or user
    end
  end
  
  def destroy
    sign_out
    redirect_to root_path
  end
end
