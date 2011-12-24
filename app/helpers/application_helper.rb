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
end
