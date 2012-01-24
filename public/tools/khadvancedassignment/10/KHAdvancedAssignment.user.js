// ==UserScript==
// @name          KHAdvancedAssignment
// @version       1.0
// @include       http://*kapihospital.com/*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function readyJQuery() {
  jQuery.noConflict();
  jQuery(document).ready(function() {
    initAdvancedAssignment()
    
    //interval Functions
    window.setInterval("recogniseAdvancedAssignmentWindows()", 200)
  })
}
//Begin Injection
var variablen = new Array()
variablen[0] = "assignmentTarget"
variablen[1] = "minPrice = 0"
variablen[2] = "maxPrice = 0"
variablen[3] = "$allAddresses"
variablen[4] = "patStored"
variablen[5] = "alreadyEnteredPatName"
function addFunctions() {
  var functionsToAdd = new Array(initAdvancedAssignment, recogniseAdvancedAssignmentWindows, progressAssignmentWindow, progressExchangeWindow, progressReferralWindow, progressAddressbook, getPrices, formatPrices, isNameSelected, changeActiveAssignmentIcon, changeAssignmentTarget, addAssignmentIcon, storePats, setCookie, getCookie)
  var script = document.createElement("script");
  
  for (var x = 0; x < variablen.length; x++) {
    script.textContent += ("var " + variablen[x] + "\n")
  }
  
  script.textContent += "\n"
  
  for (var x = 0; x < functionsToAdd.length; x++) {
    script.textContent += (functionsToAdd[x].toString() + "\n\n");
  }
  document.body.appendChild(script);
}
//End Injection
//Begin AdvancedAssignment
function initAdvancedAssignment() {
  storedAssignmentTarget = getCookie("KHAssignmentTarget" + jQuery('#username').text())
  if (storedAssignmentTarget != null) {
    assignmentTarget = storedAssignmentTarget
  } else {
    assignmentTarget = "Bitte Arzt aus dem Addressbuch bestimmen!"
  }
}
function recogniseAdvancedAssignmentWindows() {
  if (jQuery('div#ref_divdetailsbig').is(':visible')) {
    if (jQuery('div#ref_divdetailsbig').css('background-image') == "url(http://pics.kapihospital.de/bg_referral_03.jpg)") {
      progressAssignmentWindow()
    }
    else if (jQuery('div#ref_divdetailsbig').css('background-image') == "url(http://pics.kapihospital.de/bg_exchange_03.jpg)") {
      progressExchangeWindow()
    }
    if (jQuery('div#addressbook').is(':visible')) {
      progressAddressbook()
    }
  } else if (jQuery('div#referrals').is(':visible')) {
    progressReferralWindow()
  }
}
function progressAssignmentWindow() {
  var idString = jQuery('div#ref_magichand')[0].getAttribute('onclick')
  var id = idString.substring(idString.indexOf("(")+1, idString.indexOf(")"))
  jQuery('div#ref_magichand')[0].setAttribute('onclick', 'storePats(' + id + ')')

  if (alreadyEnteredPatName != jQuery('div#ref_detname').text()) {
    alreadyEnteredPatName = jQuery('div#ref_detname').text()
    getPrices(jQuery('span[style="color:red;font-weight:bold;font-size:large;"]').text())
    jQuery('input#ref_recipient').val(assignmentTarget)
    jQuery('input#ref_demand').val(maxPrice)
  }
}
function progressExchangeWindow() {
  if (alreadyEnteredPatName != jQuery('div#ref_detname').text()) {
    alreadyEnteredPatName = jQuery('div#ref_detname').text()
    getPrices(jQuery('span[style="color:red;font-weight:bold;font-size:large;"]').text())
    jQuery('input#ref_demand').val(minPrice)
  }
}
function progressReferralWindow() {
  if (patStored) {
    patStored = false
    close_page()
  }
}
function progressAddressbook() {
  if ($allAddresses != jQuery('a[class=cursorclickable]', jQuery('div#addressbook'))) {
    $allAddresses = jQuery('a[class=cursorclickable]', jQuery('div#addressbook'))
    addAssignmentIcon()
  }
}
function getPrices(pricesToParse) {
  minPrice = formatPrices(pricesToParse.substr(0,pricesToParse.indexOf(' ')))
  maxPrice = formatPrices(pricesToParse.substr(pricesToParse.indexOf('-')+2, pricesToParse.length-3-(pricesToParse.indexOf('-')+2)))
}
function formatPrices(priceToFormat) {
  return priceToFormat.replace(".", "")
}
function isNameSelected(nameToCheck) {
  if (assignmentTarget == nameToCheck) {
    return -60
  } else {
    return -15
  }
}
function changeActiveAssignmentIcon() {
  $allAddresses.each(function() {
    var actualName = jQuery(this).text()
    jQuery('[id="' + actualName +'"]').css('background-position', isNameSelected(actualName) + "px 0px")
  })
}
function changeAssignmentTarget(newTarget) {
  assignmentTarget = newTarget
  var cookieName = "KHAssignmentTarget" + jQuery('#username').text()
  setCookie(cookieName, assignmentTarget, 100, "/", window.location.hostname)
  jQuery('input#ref_recipient').val(assignmentTarget)
  changeActiveAssignmentIcon()
}
function addAssignmentIcon() {
  jQuery(jQuery('#addressbook').children()[2]).css('width',"250px")
  jQuery(jQuery('#addressbook').children()[2]).css('left',"15px")
  $allAddresses.each(function() {
    var actualName = jQuery(this).text()
    if (!jQuery('[id="' + actualName +'"]').length) {
      jQuery('<div id=\"' + actualName + '\" style=\"float: left; margin-left: 10px; margin-right: 5px; width: 15px; background-repeat:none; background-image:url(http://pics.kapihospital.de/referral_icons_15.jpg); background-position: ' + isNameSelected(actualName) + 'px 0px;\" onclick=\"changeAssignmentTarget(\'' + actualName + '\')\">&nbsp;</div>').insertAfter(this)
    }
  })
}
function storePats(id) {
  patStored = true
  Referral.sendReferral(id)
}
//End AdvancedAssignment
//Begin General
function setCookie(name, value, expires, path, domain) {
  // set time, it's in milliseconds
  var today = new Date();
  today.setTime(today.getTime());
  if (expires) {
    expires = expires * 1000 * 60 * 60 * 24;
  }
  var expires_date = new Date(today.getTime() + (expires));
  
  document.cookie = name + "=" + escape(value) +
  ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
  ( ( path ) ? ";path=" + path : "" ) +
  ( ( domain ) ? ";domain=" + domain : "" );
}
function getCookie(check_name) {
  var a_all_cookies = document.cookie.split( ';' );
  var a_temp_cookie = '';
  var cookie_name = '';
  var cookie_value = '';
  var b_cookie_found = false; // set boolean t/f default f

  for (i = 0; i < a_all_cookies.length; i++) {
    // now we'll split apart each name=value pair
    a_temp_cookie = a_all_cookies[i].split( '=' );

    // and trim left/right whitespace while we're at it
    cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

    // if the extracted name matches passed check_name
    if (cookie_name == check_name) {
      b_cookie_found = true;
      // we need to handle case where cookie has no value but exists (no = sign, that is):
      if ( a_temp_cookie.length > 1 ) {
      	cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
      }
      // note that in cases where cookie is initialized but no value, null is returned
      return cookie_value;
      break;
    }
    a_temp_cookie = null;
    cookie_name = '';
  }
  if (!b_cookie_found) {
    return null;
  }
}
//End General
//Begin Script
addFunctions()
addJQuery(readyJQuery)
//End Script