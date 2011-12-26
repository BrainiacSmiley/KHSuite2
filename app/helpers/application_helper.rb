module ApplicationHelper
  def title
    base_title = "KHSuite"
    if @title.nil?
      base_title
    else
      "#{base_title} | #{@title}"
    end
  end

  def topbar_active_list(page_title, actual_title)
    if (page_title == actual_title)
      raw('<li class="active">')
    else
      raw('<li>')
    end
  end

  def language_link(language_string, localization_string)
    link_to image_tag("flags/"+localization_string+".png", :alt => language_string, :class => "flags") + language_name(language_string), get_actual_path(localization_string)
  end

  def bootstrap_formular_field(formular, field, type, *args)
    fieldname = ""
    helptext = ""

    if args.size > 0
      unless (args.select {|a| a[:fieldname]}.empty?)
        fieldname = args.select {|a| a[:fieldname]}.first.fetch(:fieldname)
      end
      unless (args.select {|a| a[:helptext]}.empty?)
        helptext  = args.select {|a| a[:helptext]}.first.fetch(:helptext)
      end
    end
    
    if fieldname.nil?
      label_tag = formular_label(formular, field)
    else
      label_tag = formular_label(formular, field, :fieldname => fieldname)
    end
    
    if helptext.nil?
      help_tag = ""
    else
      help_tag = "<span class=\"help-inline\">#{helptext}</span>"
    end
    raw("#{bootstrap_error_field(formular, field, type)}#{label_tag}<div class=\"input\">#{formular_input_field(formular, field, type)}#{help_tag}</div></div>")
  end

  private
    def language_name(language)
      case language
        when "DE" then " Deutsch"
        when "EN" then " Englisch"
      end
    end

    def get_actual_path(localization_string)
      if (request.env['REQUEST_URI'].nil?)
        request.env['REQUEST_URI'] = "http://localhost:3000/"
      end
      if (request.env['REQUEST_URI'].index(/\/(en|de)/n).nil?)
        request.env['REQUEST_URI'] + localization_string
      else
        if (request.env['REQUEST_URI'].index(/\/(en|de)\//n).nil?)
          request.env['REQUEST_URI'].gsub(/\/(en|de)/n, "/" + localization_string)
        else
          request.env['REQUEST_URI'].gsub(/\/(en|de)\//n, "/" + localization_string + "/")
        end
      end
    end

    def bootstrap_error_field(formular, field, type)
      if formular_input_field(formular, field, type).index('<span')
        raw("<div class=\"clearfix error\">")
      else
        raw("<div class=\"clearfix\">")
      end
    end
    
    def formular_label(formular, field, *args)
      if (args.size == 0)
        formular.label field
      else
        fieldname = args.select {|a| a[:fieldname]}.first.fetch(:fieldname)
        unless fieldname.nil?
          formular.label field, fieldname
        end
      end
    end
        
    def formular_input_field(formular, field, type)
      case type
        when :text_field     then formular.text_field field
        when :password_field then formular.password_field field
        when :number_field   then formular.number_field field
        when :select         then formular.select field, option_tags = %w[ 1 2 3 4 5 6 7 8 9 ]
      end
    end
end
