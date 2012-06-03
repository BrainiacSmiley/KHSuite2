// ==UserScript==
// @name          KHPatientCounter
// @version       2.0
// @include       http://*.de.kapihospital.com/main.php*
// @exclude       http://forum.de.kapihospital.com/*
// ==/UserScript==

function injectScriptStart(callback) {
  //--- Has jQuery already been added?
  var jqNode  = document.querySelector("#KHAddedJQuery");
  if (jqNode) {
    FireCallback(callback);
  } else {
    setTimeout(function() {
      injectScriptStart(callback);
    }, 400);
  }

  function FireCallback(callback) {
    var script = document.createElement("script");
    script.id = 'KHPatientCounterStart';
    script.type = 'text/javascript';
    script.textContent += "(" + callback.toString() + ")();\n";
    document.body.appendChild (script);
  }
}
function injectStartReady() {
  initPatientCounterFunction = window.setInterval("initPatientCounter();", 100);
}
//Begin Injection
function injectScript() {
  var variablesToAdd = new Array();
  variablesToAdd.push("debugMode = false");
  variablesToAdd.push("KHConfigValues");
  variablesToAdd.push("numberOfNormalPatients = 0");
  variablesToAdd.push("olgaValuesSet");
  variablesToAdd.push("userName");
  variablesToAdd.push("initPatientCounterFunction");

  var functionsToAdd = new Array();
  functionsToAdd.push(addPatientCounterOptions);
  functionsToAdd.push(checkPatientCounterWindows);
  functionsToAdd.push(generateConfigBase);
  functionsToAdd.push(generatePatientCounterConfigOptions);
  functionsToAdd.push(getPatientsPerLevel);
  functionsToAdd.push(initPatientCounter);
  functionsToAdd.push(progressOlgaWindow);
  functionsToAdd.push(saveWWConfig);
  functionsToAdd.push(setAPOverlay);
  functionsToAdd.push(storeKHConfigValues);

  var script = document.createElement("script");
  script.id = 'KHPatientCounter';
  script.type = 'text/javascript';
  
  for (var x = 0; x < variablesToAdd.length; x++) {
    script.textContent += ("var " + variablesToAdd[x] + ";\n");
  }
  
  script.textContent += "\n"
  
  for (var x = 0; x < functionsToAdd.length; x++) {
    if (typeof functionsToAdd[x] != 'undefined') {
      script.textContent += (functionsToAdd[x].toString() + "\n\n");
    }
  }
  document.body.appendChild(script);
}
//End Injection
//Begin OpticalFixes
function initPatientCounter() {
  if (typeof jQuery != 'undefined') {
    //check if Dev Mode
    if (window.location.search == "?dev") {
      debugMode = true
    } else {
      debugMode = false
    }

    userName = jQuery('#username').text();
  
    //restore KHConfigValues
    if (localStorage.getItem('KHConfigValues' + userName) != null) {
      KHConfigValues = JSON.parse(localStorage.getItem('KHConfigValues' + userName));
    } else {
      KHConfigValues = new Object();
    }
    //Check for Script Values
    if (typeof KHConfigValues.wwLevel == 'undefined') {
      KHConfigValues.wwLevel = 0;
    }
    storeKHConfigValues();

    setAPOverlay();
    
    //interval Functions
    window.setInterval("checkPatientCounterWindows()", 200);
    window.clearInterval(initPatientCounterFunction);
    if (debugMode) {
      console.log("KHPatientCounter loaded");
    }
  } else {
    if (debugMode) {
      console.log("KHPatientCounter not loaded");
    }
  }
}
function setAPOverlay() {
  //calculation
  levelString = jQuery('#level').text();
  level = levelString.substr(levelString.indexOf('(')+2, (levelString.lastIndexOf(' ')-(levelString.indexOf('(')+2)))*1;
  numberOfLevelPatients = getPatientsPerLevel(level);
  ap = jQuery('#upgrades').text()*1;
  numberOfAPPatients = Math.floor(ap/12);
  numberOfNormalPatients = numberOfLevelPatients + numberOfAPPatients;
  if (KHConfigValues.wwLevel >= 2) {
    numberOfNormalPatients += 2;
  }
  apForNextPatient = 12 - (ap%12);
  //formating
  punkteText = "";
  if (apForNextPatient === 1) {
    punkteText = " Punkt.";
  } else {
    punkteText = " Punkten.";
  }
  //adding the text
  jQuery('#upgrades').attr('title', "Du bekommst täglich " + numberOfNormalPatients + " normale Patienten. Den nächsten Patient gibts in: " + apForNextPatient + punkteText);
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
function saveWWConfig() {
  KHConfigValues.wwLevel = jQuery('#wwLevel').val()
  setAPOverlay();
  storeKHConfigValues();
}
function checkPatientCounterWindows() {
  if (jQuery('div#b').length && !jQuery('div#KHWWConfig').length) {
    addPatientCounterOptions();
    olgaValuesSet = false;
  } else if (jQuery('div#nurse_messages').is(':visible')) {
    progressOlgaWindow();
  } else {
    olgaValuesSet = false;
  }
}
function progressOlgaWindow() {
  if (!olgaValuesSet) {
    wholeText = jQuery('pre', jQuery('#nurse_messages')).text();
    patientListToday = wholeText.substr(wholeText.indexOf(jQuery(jQuery('b', jQuery('#nurse_messages'))[0]).text()) + jQuery(jQuery('b', jQuery('#nurse_messages'))[0]).text().length, wholeText.indexOf(jQuery(jQuery('b', jQuery('#nurse_messages'))[1]).text()) - wholeText.indexOf(jQuery(jQuery('b', jQuery('#nurse_messages'))[0]).text()) - jQuery(jQuery('b', jQuery('#nurse_messages'))[0]).text().length);
    patientListTodayArray = patientListToday.split(" ");
    countedNormalPatients = 0;
    countedQuestPatients = 0;
    countedShowPatients = 0;
    countedAlienPatients = 0;
    countedExchangePatients = 0;
    countedReferralPatients = 0;
    countedLevelupPatients = 0;
    
    for (var i = 0; i < patientListTodayArray.length; i++) {
      if (patientListTodayArray[i] === "NORMAL") {
        countedNormalPatients++;
      } else if (patientListTodayArray[i] === "QUEST") {
        countedQuestPatients++;
      } else if (patientListTodayArray[i] === "BÜHNE") {
        countedShowPatients++;
      } else if (patientListTodayArray[i] === "ALIENS" || patientListTodayArray[i] === "ALIEN") {
        countedAlienPatients++;
      } else if (patientListTodayArray[i] === "KAUF") {
        countedExchangePatients++;
      } else if (patientListTodayArray[i] === "ÜBERWEISUNG") {
        countedReferralPatients++;
      } else if (patientListTodayArray[i] === "AUFSTIEG") {
        countedLevelupPatients++;
      }
    }
    actualOlgaDate = jQuery(jQuery('b', jQuery('#nurse_messages'))[0]).text();
    countedPatientsString = "";
    if (countedNormalPatients > 0) {
      countedPatientsString += " | " + countedNormalPatients + "/" + numberOfNormalPatients + " N";
    }
    if (countedQuestPatients > 0) {
      countedPatientsString += " | " + countedQuestPatients + " Q";
    }
    if (countedShowPatients > 0) {
      countedPatientsString += " | " + countedShowPatients + " B";
    }
    if (countedAlienPatients > 0) {
      countedPatientsString += " | " + countedAlienPatients + " A";
    }
    if (countedExchangePatients > 0) {
      countedPatientsString += " | " + countedExchangePatients + " K";
    }
    if (countedReferralPatients > 0) {
      countedPatientsString += " | " + countedReferralPatients + " Ü";
    }
    if (countedLevelupPatients > 0) {
      countedPatientsString += " | " + countedLevelupPatients + " L";
    }
    jQuery(jQuery('b', jQuery('#nurse_messages'))[0]).text(actualOlgaDate + countedPatientsString);
    jQuery(jQuery('b', jQuery('#nurse_messages'))[0]).attr('title', "N = Normal Patienten | Q = Quest Patienten | B = Bühnen Patienten | A = Alien Patienten | K = Börsen Patienten | Ü = Überwiesene Patienten | L = Levelaufstieg Patienten");
    olgaValuesSet = true;
  }
}
function addPatientCounterOptions() {
  //check if ConfigBase present
  if (!jQuery('ul#KHOptions').length) {
    jQuery(generateConfigBase()).insertAfter('div#b');
  }
  //add AdvancedAssignment Options to ConfigBase
  jQuery(generatePatientCounterConfigOptions()).appendTo('div#KHOptionsContent');
  jQuery('<li><a href="#KHWWConfig" data-toggle="tab">Allgemein</a></li>').insertAfter(jQuery('ul#KHOptions').children()[0]);

  //hide Menu if not used
  if (!jQuery('#toolsMenu').children().length) {
    jQuery('#toolsMenu').parent().hide();
  }

  //set AdvancedAssignment Options
  jQuery('#wwLevel').val(KHConfigValues.wwLevel);
}
function generateConfigBase() {
  htmlCode = "";
  htmlCode += "<ul id=\"KHOptions\" class=\"nav nav-tabs\" style=\"margin-top: 60px;\">";
  htmlCode += "<li><a href=\"#\" data-toggle=\"tab\">KHTools Config</a></li>";
  htmlCode += "  <li class=\"dropdown\">";
  htmlCode += "    <a href=\"#\" class=\"dropdown-toggle active\" data-toggle=\"dropdown\">Tool <b class=\"caret\"></b></a>";
  htmlCode += "    <ul id=\"toolsMenu\" class=\"dropdown-menu\">";
  htmlCode += "    </ul>";
  htmlCode += "  </li>";
  htmlCode += "</ul>";
  htmlCode += "<div id=\"KHOptionsContent\" class=\"tab-content\">";
  htmlCode += "</div>";
  return htmlCode;
}
function generatePatientCounterConfigOptions() {
  htmlCode = "";
  htmlCode += "<div class=\"tab-pane\" id=\"KHWWConfig\" style=\"margin-left:10px;margin-top:-18px;\">";
  htmlCode += "  Abgeschlossene Weltwunderstufe der ÄV: <input id=\"wwLevel\" type=\"number\" onchange=\"saveWWConfig()\" min=\"0\" max=\"10\" style=\"width:40px;\" value=\"10\">";
  htmlCode += "</div>";
  return htmlCode;
}
function storeKHConfigValues() {
  //remove old version from localStorage
  localStorage.removeItem('KHConfigValues' + userName);
  //write actual version to localStorage
  localStorage.setItem('KHConfigValues' + userName, JSON.stringify(KHConfigValues));
}
//EndOpticalFixes
//Begin Script
injectScript();
injectScriptStart(injectStartReady);
//End Script