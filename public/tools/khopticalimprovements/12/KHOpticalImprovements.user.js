// ==UserScript==
// @name          KHOpticalImprovements
// @version       1.2
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
  if (jQuery('div#videotv').length) {
    jQuery('div#videotv').css('z-index', '-1')
  }
  if (jQuery('div#schatzsuche').length) {
    jQuery('div#schatzsuche').css('z-index', '-1')
  }
  //Interval Function
  checkVideoTVFunction = window.setInterval("checkVideoTV()", 200)
  checkSusiFunction = window.setInterval("checkSusi()", 200)
}
//Begin Injection
var variablen = new Array()
variablen.push("checkVideoTVFunction")
variablen.push("checkSusiFunction")
variablen.push("alertTime = 3")

function addFunctions() {
  var functionsToAdd = new Array(daysBetweenDates, isSusiOK, checkVideoTV, checkSusi)
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
//Begin OpticalFixes
function checkVideoTV() {
  if (jQuery('div#videotv').css('background-image') == "url(http://pics.kapihospital.de/videotv_anim.gif)" && !jQuery('div#videoreminder').length) {
    jQuery('<div id="videoreminder" class="cleaner cursorclickable" style="position: absolute; background-image: url(http://pics.kapihospital.de/roomlock.png); width: 50px; height: 50px; left: 398px; top: -8px; z-index: 1" onclick="Videoplayer.open();" title="Einmal am Tag Werbung schauen und eine gratis Wunderpille abstauben!">&nbsp;</div>').insertAfter('div#videotv')
  }
  if (jQuery('div#videotv').css('background-image') == "url(http://pics.kapihospital.de/videotv_still.gif)") {
    if (jQuery('div#videoreminder').length) {
      jQuery('div#videoreminder').remove()
    }
    window.clearInterval(checkVideoTVFunction)
  }
}
function daysBetweenDates(date1, date2) {
    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime()
    var date2_ms = date2.getTime()

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms)
    
    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY)
}
function isSusiOK() {
  if (!jQuery('img#susi').length) {
    return 0
  } else {
    var dateArray = jQuery('img#susi').attr('title').split(" ")[2].split(".")
    var susiDate = new Date(dateArray[2]*1, (dateArray[1]*1)-1, (dateArray[0]*1)+1)
    var today = new Date()
    var restTime = daysBetweenDates(susiDate, today)
    if ( restTime <= alertTime) {
      return restTime
    }
  }

  return -1
}
function checkSusi() {
  var susiRestTime = isSusiOK()
  if (susiRestTime != -1 && !jQuery('img#susireminder').length) {
    var susiReminderToolTip = ""
    if (susiRestTime === 0) {
      susiReminderToolTip = "Achtung Du hast keine Susi. Nur mit allen Minibehandlungen zahlt der Patient den Max-Preis!"
    } else {
      if (susiRestTime > 1) {
        susiReminderToolTip = "Achtung die Susi läuft in " + susiRestTime + " Tagen aus!"
      } else {
        susiReminderToolTip = "Achtung die Susi läuft in " + susiRestTime + " Tag aus!"
      }
    }
    jQuery('<img id="susireminder" class="cursorclickable" width="30" style="position: absolute; top: 90px; left: -8px;" src="http://pics.kapihospital.de/roomlock.png" title="' + susiReminderToolTip + '">').insertAfter('img#premium')
  }
  if (susiRestTime == -1) {
    if (jQuery('img#susireminder').length) {
      jQuery('img#susireminder').remove()
    }
    window.clearInterval(checkSusiFunction)
  }
}
//EndOpticalFixes
//Begin Script
addFunctions()
addJQuery(readyJQuery)
//End Script