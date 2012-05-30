class PagesController < ApplicationController
  def home
    @title = t(:title_home)
    find_needed_values
  end

  def contact
    @title = t(:title_contact)
    find_needed_values
    @sender = ''
    @subject = ''
    @message = ''
  end

  def sendmail
    @title = t(:title_contact)
    find_needed_values
    @sender = params[:sender]
    @subject = params[:subject]
    @message = params[:message]
    if validate_mail(@sender, @subject, @message)
      ContactMailer.contact(@sender, @subject, @message).deliver      
      flash[:success] = t(:contact_message_success)
      redirect_to contact_path
    else
      flash.now[:error] = @error     
      render 'contact'
    end
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

  def khadvancedreferral
    @title = t(:title_khadvancedreferral)
    find_needed_values
  end

  def khmedhelper
    @title = t(:title_khmedhelper)
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

  def khtimer
    @title = t(:title_khtimer)
    find_needed_values
  end

  private
    def validate_mail(sender, subject, message)
      @email_regex = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
      if sender.blank? || subject.blank? || message.blank?
        @error = t(:contact_error_field_blank)
        return false
      elsif subject.length >= 50
        @error = t(:contact_error_subjectlength)
        return false
      elsif sender[@email_regex].nil?
        @error = t(:contact_error_email)
        return false
      else
        return true
      end
    end
end
