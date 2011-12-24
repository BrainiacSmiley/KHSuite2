class PagesController < ApplicationController
  def home
    @title = t(:title_home)
  end

  def contact
    @title = t(:title_contact)
  end

  def about
    @title = t(:title_about)
  end
  
  def help
    @title = t(:title_help)
  end

  def tools
    @title = t(:title_tools_overview)
  end

  def khplanner
    @title = t(:title_khplanner)
  end
end
