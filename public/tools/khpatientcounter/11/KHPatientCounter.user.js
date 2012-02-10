// ==UserScript==
// @name          KHPatientCounter
// @version       1.1
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
  initPatientCounter()
  setAPOverlay()
  //Interval Function
  window.setInterval("checkPatientCounterWindows()", 200)
}
//Begin Injection
var variablen = new Array()
variablen.push("normalPatients")
variablen.push("nextPatient")
variablen.push("olgaValuesSet")
variablen.push("countedNormalPatients")
variablen.push("countedQuestPatients")
variablen.push("countedShowPatients")
variablen.push("countedAlienPatients")
variablen.push("countedExchangePatients")
variablen.push("countedReferralPatients")
variablen.push("cuntedLevelupPatients")
variablen.push("wwLevel = 0")

function addFunctions() {
  var functionsToAdd = new Array(initPatientCounter, setAPOverlay, checkPatientCounterWindows, progressOlgaWindow, getPatientsPerLevel, saveWWConfig, setCookie, getCookie)
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
function setAPOverlay() {
  var punkteText
  if (nextPatient === 1) {
    punkteText = " Punkt."
  } else {
    punkteText = " Punkten."
  }
  jQuery('#upgrades').attr('title', "Du bekommst täglich " + normalPatients + " normale Patienten. Den nächsten Patient gibts in: " + nextPatient + punkteText)
}
function getPatientsPerLevel(level) {
  if (level <= 4) {
    return 6;
  } else if ( level < 12) {
    return 8 + level/2;
  } else {
    return 14;
  }
}
function initPatientCounter() {
  //restore WWCookie
  storedWWLevel = getCookie("KHWWLevel" + jQuery('#username').text())
  if (storedWWLevel != null) {
    wwLevel = storedWWLevel
  } else {
    wwLevel = 0
  }

  var levelString = jQuery('#level').text()
  var level = levelString.substr(levelString.indexOf('(')+2, (levelString.lastIndexOf(' ')-(levelString.indexOf('(')+2)))*1
  normalPatients = getPatientsPerLevel(level)
  var ap = jQuery('#upgrades').text()*1
  var bonusPatients = Math.floor(ap/12)
  normalPatients += bonusPatients
  if (wwLevel >= 2) {
    normalPatients += 2
  }
  nextPatient = 12 - (ap%12)
  
}
function saveWWConfig() {
  wwLevel = jQuery('#wwLevel').val()
  var cookieName = "KHWWLevel" + jQuery('#username').text()
  setCookie(cookieName, wwLevel, 100, "/", window.location.hostname)
  initPatientCounter()
}
function checkPatientCounterWindows() {
  if (jQuery('div#b').length && !jQuery('div#WWConfig').length) {
    progressWWAccountOptionsWindow()
    olgaValuesSet = false
  } else if (jQuery('div#nurse_messages').is(':visible')) {
    progressOlgaWindow()
  } else {
    olgaValuesSet = false
  }
}
function progressOlgaWindow() {
  if (!olgaValuesSet) {
    wholeText = jQuery('pre', jQuery('#nurse_messages')).text()
    patientListToday = wholeText.substr(wholeText.indexOf(jQuery(jQuery('b', jQuery('#nurse_messages'))[0]).text()) + jQuery(jQuery('b', jQuery('#nurse_messages'))[0]).text().length, wholeText.indexOf(jQuery(jQuery('b', jQuery('#nurse_messages'))[1]).text()) - wholeText.indexOf(jQuery(jQuery('b', jQuery('#nurse_messages'))[0]).text()) - jQuery(jQuery('b', jQuery('#nurse_messages'))[0]).text().length)
    patientListTodayArray = patientListToday.split(" ")
    countedNormalPatients = 0
    countedQuestPatients = 0
    countedShowPatients = 0
    countedAlienPatients = 0
    countedExchangePatients = 0
    countedReferralPatients = 0
    countedLevelupPatients = 0
    
    for (var i = 0; i < patientListTodayArray.length; i++) {
      if (patientListTodayArray[i] === "NORMAL") {
        countedNormalPatients++
      } else if (patientListTodayArray[i] === "QUEST") {
        countedQuestPatients++
      } else if (patientListTodayArray[i] === "BÜHNE") {
        countedShowPatients++
      } else if (patientListTodayArray[i] === "ALIENS" || patientListTodayArray[i] === "ALIEN") {
        countedAlienPatients++
      } else if (patientListTodayArray[i] === "KAUF") {
        countedExchangePatients++
      } else if (patientListTodayArray[i] === "ÜBERWEISUNG") {
        countedReferralPatients++
      } else if (patientListTodayArray[i] === "AUFSTIEG") {
        countedLevelupPatients++
      }
    }
    actualOlgaDate = jQuery(jQuery('b', jQuery('#nurse_messages'))[0]).text()
    var countedPatientsString = ""
    if (countedNormalPatients > 0) {
      countedPatientsString += " | " + countedNormalPatients + "/" + normalPatients + " N"
    }
    if (countedQuestPatients > 0) {
      countedPatientsString += " | " + countedQuestPatients + " Q"
    }
    if (countedShowPatients > 0) {
      countedPatientsString += " | " + countedShowPatients + " B"
    }
    if (countedAlienPatients > 0) {
      countedPatientsString += " | " + countedAlienPatients + " A"
    }
    if (countedExchangePatients > 0) {
      countedPatientsString += " | " + countedExchangePatients + " K"
    }
    if (countedReferralPatients > 0) {
      countedPatientsString += " | " + countedReferralPatients + " Ü"
    }
    if (countedLevelupPatients > 0) {
      countedPatientsString += " | " + countedLevelupPatients + " L"
    }
    jQuery(jQuery('b', jQuery('#nurse_messages'))[0]).text(actualOlgaDate + countedPatientsString)
    jQuery(jQuery('b', jQuery('#nurse_messages'))[0]).attr('title', "N = Normal Patienten | Q = Quest Patienten | B = Bühnen Patienten | A = Alien Patienten | K = Börsen Patienten | Ü = Überwiesene Patienten | L = Levelaufstieg Patienten")
    olgaValuesSet = true
  }
}
function progressWWAccountOptionsWindow() {
  if (!jQuery('div#KHAdvancedMedRackConfig').length) {
    jQuery('<div id="WWConfig" style="margin-top: 60px;">Abgeschlossene Weltwunderstufe der ÄV: <input id="wwLevel" type="number" size="4" onChange="saveWWConfig()" value="' + wwLevel + '" min="0" max="10"></div>').insertAfter('div#b')
  } else {
    jQuery('<div id="WWConfig">Abgeschlossene Weltwunderstufe der ÄV: <input id="wwLevel" type="number" size="4" onChange="saveWWConfig()" value="' + wwLevel + '" min="0" max="10"></div>').insertAfter('div#KHAdvancedMedRackConfig')
  }
}
//EndOpticalFixes
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