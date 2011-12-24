class PagesController < ApplicationController
  def home
    @title = t(:title_home)
  end
end
