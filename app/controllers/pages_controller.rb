class PagesController < ApplicationController
  def home
    @title = t(:title_home)
    find_needed_values
  end

  def contact
    @title = t(:title_contact)
    find_needed_values
  end

  def about
    @title = t(:title_about)
    find_needed_values
  end
  
  def help
    @title = t(:title_help)
    find_needed_values
  end

  def tools
    @title = t(:title_tools_overview)
    find_needed_values
  end

  def khplanner
    @title = t(:title_khplanner)
  end

  def khadvancedassignment
    @title = t(:title_khadvancedassignment)
    find_needed_values
  end

  def khadvancedmedrack
    @title = t(:title_khadvancedmedrack)
    find_needed_values
  end

  def khadvancedpatientview
    @title = t(:title_khadvancedpatientview)
    find_needed_values
  end

  def khadvancement
    @title = t(:title_khadvancement)
    find_needed_values
  end

  def khopticalimprovements
    @title = t(:title_khopticalimprovements)
    find_needed_values
  end

  def khpatientcounter
    @title = t(:title_khpatientcounter)
    find_needed_values
  end

  def khshortcuts
    @title = t(:title_khshortcuts)
    find_needed_values
  end
end
