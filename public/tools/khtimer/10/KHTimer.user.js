// ==UserScript==
// @name          KHTimer
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
    initKHTimer()
    
    //Interval Function
    window.setInterval("recogniseTimerWindows()", 1000)
    window.setInterval("progressTimer()", 1000)
  })
}
//Begin Injection
var variablen = new Array()
variablen.push("garageEndTime")
variablen.push("garageLength")
variablen.push("garageCounter")
variablen.push("garageCounterDate")

function addFunctions() {
  var functionsToAdd = new Array(initKHTimer, recogniseTimerWindows, progressGarageTimerWindow, progressGarageFinished, getTimeString, getTodaysDate, progressTimer, setKHTimerCookies, setCookie, getCookie)
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
//Begin KHTimer
function initKHTimer() {
  storedGarageEndTime = getCookie("KHGarageEndTime" + jQuery('#username').text())
  if (storedGarageEndTime != null) {
    garageEndTime = storedGarageEndTime
  } else {
    garageEndTime = -1
  }
  storedGarageLength = getCookie("KHGarageLength" + jQuery('#username').text())
  if (storedGarageLength != null) {
    garageLength = storedGarageLength
  } else {
    garageLength = 0
  }
  
  storedGarageCounter = getCookie("KHGarageCounter" + jQuery('#username').text())
  if (storedGarageCounter != null) {
    garageCounter = storedGarageCounter*1
  } else {
    garageCounter = 0
  }
  storedGarageCounterDate = getCookie("KHGarageCounterDate" + jQuery('#username').text())
  if (storedGarageCounterDate != null) {
    garageCounterDate = storedGarageCounterDate
  } else {
    garageCounterDate = getTodaysDate()
  }
  if (garageCounterDate != getTodaysDate()) {
    garageCounterDate = getTodaysDate()
    garageCounter = 0
  }
}
function recogniseTimerWindows() {
  if (jQuery('div#msgwindow').is(':visible')) {
    if (jQuery('div#ga_time').is(':visible')) {
      progressGarageTimerWindow()
    } else if(jQuery('div#ga_finished').is(':visible')) {
      progressGarageFinished()
    }
  }
}
function progressGarageTimerWindow() {
  var now = Math.floor((new Date()).getTime()/1000)
  if (garageEndTime != now + Garage.ends) {
    garageEndTime = now + Garage.ends
    garageLength = Garage.duration
    setKHTimerCookies()
  }
}
function getTimeString(time) {
  hour = Math.floor(time / 3600)
  rest = time%3600
  min = Math.floor(rest/ 60)
  sek = rest%60
  if (hour < 10) {
    hourString = "0" + hour
  } else {
    hourString = "" + hour
  }
  if (min < 10) {
    minString = "0" + min
  } else {
    minString = "" + min
  }
  if (sek < 10) {
    sekString = "0" + sek
  } else {
    sekString = "" + sek
  }
  return hourString + ":" + minString + ":" + sekString
}
function getTodaysDate() {
  var today = new Date()
  return today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear()
}
function progressGarageFinished() {
  garageEndTime = -1
  garageLength = 0
  garageCounter++
  setKHTimerCookies()
}
function setKHTimerCookies() {
  var cookieName = "KHGarageEndTime" + jQuery('#username').text()
  setCookie(cookieName, garageEndTime, 100, "/", window.location.hostname)
  var cookieName = "KHGarageLength" + jQuery('#username').text()
  setCookie(cookieName, garageLength, 100, "/", window.location.hostname)
  var cookieName = "KHGarageCounter" + jQuery('#username').text()
  setCookie(cookieName, garageCounter, 100, "/", window.location.hostname)
  var cookieName = "KHGarageCounterDate" + jQuery('#username').text()
  setCookie(cookieName, garageCounterDate, 100, "/", window.location.hostname)
}
function progressTimer() {
  var now = Math.floor((new Date()).getTime()/1000)

  //GarageTimer
  if (!jQuery('div#gradient_border_garage').length && garageEndTime != -1) {
    jQuery('<div id="gradient_border_garage" class="gradient_border" style="top:633px;left:538px;"><div id="gradient_garage" class="gradient_small" style="width:0px;"><span id="timer_garage" style="position:absolute;font-size:9px;left:-1px;top:-13px;background-color:white;width:80px;">&nbsp;</span></div></div>').appendTo('div#hospital_content')
  } else {
    if (garageEndTime == -1 && jQuery('div#gradient_border_garage').length > 0) {
      jQuery('div#gradient_border_garage').remove()
    }
  }
  //Gradient and TimerValue for GarageTimer
  if (now >= garageEndTime) {
    jQuery('div#gradient_garage').css('width','40px')
    jQuery('span#timer_garage').text("Fertig!")
  } else {
    var gradientPercent = Math.floor((garageLength-(garageEndTime-now)) / garageLength * 40)
    jQuery('div#gradient_garage').css('width', gradientPercent)
    actualQuest = garageCounter + 1
    jQuery('span#timer_garage').text(actualQuest + "/8 | " + getTimeString(garageEndTime-now))
  }
}
//End KHTimer
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
/*
// How to get the gradients
jQuery('div[class^=gradient_border]').length

//Timer Code
<span style="position:absolute;font-size:9px;left:-1px;top:-13px;background-color:white;width:50px;">00:00:00</span>

for (var i = 0; i < Global.refRooms.values().length; i++) {
  if (Global.refRooms.values()[i].willend > 0 && Global.refRooms.values()[i].willend < 24*60*60) {
    console.log(Global.refRooms.values()[i].name + ": " + Global.refRooms.values()[i].willend + " Position: " + Global.refRooms.values()[i].topleft)
  }
}*/