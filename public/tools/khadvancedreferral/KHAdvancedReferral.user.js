// ==UserScript==
// @name          KHAdvancedReferral
// @version       4.0.1
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
    script.id = 'KHAdvancedReferralStart';
    script.type = 'text/javascript';
    script.textContent += "(" + callback.toString() + ")();\n";
    document.body.appendChild (script);
  }
}
function injectStartReady() {
  initAdvancedReferralFunction = window.setInterval("initKHAdvancedReferral();", 100);
}
//Begin Injection
function injectScript() {
  var variablesToAdd = new Array();
  variablesToAdd.push("countedDiseases = new Array()");
  variablesToAdd.push("debugMode = false");
  variablesToAdd.push("diseasesMenuArray");
  variablesToAdd.push("diseasesNamesMenuArray");
  variablesToAdd.push("doctorsMenuArray");
  variablesToAdd.push("endTime = 0");
  variablesToAdd.push("headers = new Array(\"Patientenname\", \"Krankheiten\", \"Ärzte\", \"Punkte\", \"Kosten\", \"hT/Min\", \"Pkt/Min\")");
  variablesToAdd.push("KHConfigValues");
  variablesToAdd.push("levelBonus = 0.025");
  variablesToAdd.push("numberOfHiddenPats = 0");
  variablesToAdd.push("numberOfPats = 0");
  variablesToAdd.push("patientDiseasesStorage = new Object()");
  variablesToAdd.push("patientIDsInReferral = new Array()");
  variablesToAdd.push("pointsCalculation = true");
  variablesToAdd.push("roomsMenuArray");
  variablesToAdd.push("startTime = 0");
  variablesToAdd.push("tinyCountedDiseases = new Array()");
  variablesToAdd.push("tinyCountedRooms = new Array()");
  variablesToAdd.push("tinyMenuVisible = true");
  variablesToAdd.push("totalDiseasesCount = 0");
  variablesToAdd.push("totalDiseasesDuration = 0");
  variablesToAdd.push("totalPoints = 0");
  variablesToAdd.push("totalRecievePrice = 0");
  variablesToAdd.push("totalSendPrice = 0");
  variablesToAdd.push("userName");
  variablesToAdd.push("$referralMap");
  variablesToAdd.push("initAdvancedReferralFunction");
  variablesToAdd.push("patStored = false");

  var functionsToAdd = new Array();
  functionsToAdd.push(addAdvancedReferralOptions);
  functionsToAdd.push(addClassicOptions);
  functionsToAdd.push(addColumnHeaders);
  functionsToAdd.push(addPatientDiv);
  functionsToAdd.push(addTinyOptions);
  functionsToAdd.push(analysePatient);
  functionsToAdd.push(analysePatients);
  functionsToAdd.push(BonusForMultiDiseases);
  functionsToAdd.push(changePatientView);
  functionsToAdd.push(changeSorting);
  functionsToAdd.push(changeTinyFilter);
  functionsToAdd.push(checkAllPatients);
  functionsToAdd.push(checkIfPatNeedsToBeHidden);
  functionsToAdd.push(checkIfPatNeedsToBeHiddenByTinyGeneral);
  functionsToAdd.push(checkIfPatNeedsToBeHiddenByTinySpecial);
  functionsToAdd.push(countDiseases);
  functionsToAdd.push(findInArray);
  functionsToAdd.push(formatPrices);
  functionsToAdd.push(generateAdvancedReferralConfigOptions);
  functionsToAdd.push(generateConfigBase);
  functionsToAdd.push(generateWWLevelConfigOptions);
  functionsToAdd.push(getBasePointsForPatient);
  functionsToAdd.push(getColumn);
  functionsToAdd.push(getDiseaseBasePoints);
  functionsToAdd.push(getDiseaseID);
  functionsToAdd.push(getDiseaseNames);
  functionsToAdd.push(getDiseases);
  functionsToAdd.push(getDiseasesDuration);
  functionsToAdd.push(gethTPerTime);
  functionsToAdd.push(getLongTimeString);
  functionsToAdd.push(getMultiRooms);
  functionsToAdd.push(getName);
  functionsToAdd.push(getOptionsString);
  functionsToAdd.push(getPatientId);
  functionsToAdd.push(getPoints);
  functionsToAdd.push(getPointsForPatient);
  functionsToAdd.push(getPointsPerTime);
  functionsToAdd.push(getPointsPerTimeSorting);
  functionsToAdd.push(getPrice);
  functionsToAdd.push(getReciever);
  functionsToAdd.push(getRestTreatmentTimeMin);
  functionsToAdd.push(getRoomForDisease);
  functionsToAdd.push(getRooms);
  functionsToAdd.push(getRow);
  functionsToAdd.push(getSelectOptionsArray);
  functionsToAdd.push(getSortingFunction);
  functionsToAdd.push(getTinyFilterString);
  functionsToAdd.push(hidePats);
  functionsToAdd.push(hidePatsExcept);
  functionsToAdd.push(hidePatsGreater);
  functionsToAdd.push(hidePatsMulti);
  functionsToAdd.push(hidePatsNotForRoom);
  functionsToAdd.push(hidePatsNotMulti);
  functionsToAdd.push(hidePatsNotTo);
  functionsToAdd.push(hidePatsNotWithDiseases);
  functionsToAdd.push(initKHAdvancedReferral);
  functionsToAdd.push(isInArray);
  functionsToAdd.push(progressAdvancedReferralPatientViewWindow);
  functionsToAdd.push(progressAdvancedReferralReferralDetailWindow);
  functionsToAdd.push(progressKHAdvancedReferralWindow);
  functionsToAdd.push(progressRecievePatients);
  functionsToAdd.push(progressSendPatients);
  functionsToAdd.push(recogniseKHAdvancedReferralWindow);
  functionsToAdd.push(removeFilter);
  functionsToAdd.push(removeTinyFilter);
  functionsToAdd.push(restoreFilterSelection);
  functionsToAdd.push(saveKHAdvancedReferralConfig);
  functionsToAdd.push(savePatientDiseasesStorage);
  functionsToAdd.push(saveWWConfig);
  functionsToAdd.push(setSortingIcons);
  functionsToAdd.push(sortPatientList);
  functionsToAdd.push(sortPatients);
  functionsToAdd.push(sortConfigMenu);
  functionsToAdd.push(storeKHConfigValues);
  functionsToAdd.push(toggleTinyMenu);
  functionsToAdd.push(updateProgressTime);
  functionsToAdd.push(updateNumberOfDiseases);
  functionsToAdd.push(updateSelectedNumberOfPats);
  functionsToAdd.push(updateTotalPoints);
  functionsToAdd.push(updateTotalPrice);
  
  var script = document.createElement("script");
  script.id = 'KHAdvancedReferral';
  script.type = 'text/javascript';
  
  for (var x = 0; x < variablesToAdd.length; x++) {
    script.textContent += ("var " + variablesToAdd[x] + ";\n")
  }
  
  script.textContent += "\n"
  
  for (var x = 0; x < functionsToAdd.length; x++) {
    script.textContent += (functionsToAdd[x].toString() + "\n\n");
  }
  document.body.appendChild(script);
}
//End Injection
//Begin KHAdvacnedReferral
function initKHAdvancedReferral() {
  if (typeof jQuery != 'undefined') {
    //check if Dev Mode
    if (window.location.search == "?dev") {
      debugMode = true
    } else {
      debugMode = false
    }
    
    //restore patientDiseaseStorage
    if (localStorage.getItem('patientDiseasesStorage' + userName) != undefined) {
      patientDiseasesStorage = JSON.parse(localStorage.getItem('patientDiseasesStorage' + userName));
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
      KHConfigValues.wwLevel = 0
    }
    if (typeof KHConfigValues.selectedPatientsIndex == 'undefined') {
      KHConfigValues.selectedPatientsIndex = 0
    }
    if (typeof KHConfigValues.selectedNumberOfDiseases == 'undefined') {
      KHConfigValues.selectedNumberOfDiseases = "# Krankheiten"
    }
    if (typeof KHConfigValues.selectedDoctorsName == 'undefined') {
      KHConfigValues.selectedDoctorsName = "alle Ärzte"
    }
    if (typeof KHConfigValues.selectedRoomsName == 'undefined') {
      KHConfigValues.selectedRoomsName = "alle Räume"
    }
    if (typeof KHConfigValues.selectedDiseaseName == 'undefined') {
      KHConfigValues.selectedDiseaseName = "alle Krankheiten"
    }
    if (typeof KHConfigValues.columnsToSort == 'undefined') {
      KHConfigValues.columnsToSort = new Array(0, 0, 0, 0, 0, 0, 0);
    }
    if (typeof KHConfigValues.points == 'undefined') {
      KHConfigValues.points = true;
    }
    if (typeof KHConfigValues.tiny == 'undefined') {
      KHConfigValues.tiny = true;
    }
    storeKHConfigValues();
  
    //Interval Function
    window.setInterval("recogniseKHAdvancedReferralWindow()", 100);
    window.clearInterval(initAdvancedReferralFunction);
    if (debugMode) {
      console.log("KHAdvancedReferral loaded");
    }
  } else {
    if (debugMode) {
      console.log("KHAdvancedReferral not loaded");
    }
  }
}
function saveWWConfig() {
  KHConfigValues.wwLevel = jQuery('#wwLevel').val()
  storeKHConfigValues();
}
function recogniseKHAdvancedReferralWindow() {
  if (jQuery('div#referrals').is(':visible')) {
    if (jQuery('div#ref_divdetailsbig').is(':visible') &&
       (jQuery('div#ref_divdetailsbig').css('background-image') == "url(http://pics.kapihospital.de/bg_referral_02.jpg)" ||
        jQuery('div#ref_divdetailsbig').css('background-image') == "url(\"http://pics.kapihospital.de/bg_referral_02.jpg\")")) {
      progressAdvancedReferralReferralDetailWindow()
    } else {
      if(!patStored) {
        progressKHAdvancedReferralWindow()
      }
    }
  } else if (jQuery('div#msgwindow').is(':visible')) {
    if (jQuery('div#msgwindow').css('background-image') == "url(http://pics.kapihospital.de/medicalrecord_1.png)" ||
        jQuery('div#msgwindow').css('background-image') == "url(\"http://pics.kapihospital.de/medicalrecord_1.png\")") {
      progressAdvancedReferralPatientViewWindow()
    } else if (jQuery('div#b').length && !jQuery('div#KHAdvancedReferralOptions').length) {
      addAdvancedReferralOptions();
    }
  }
}
function progressAdvancedReferralPatientViewWindow() {
  patientID = jQuery(jQuery('div#med_price').children()[0]).text().split(" ")[1]*1
  patientDiseasesStorage["p"+patientID] = Global.refPatients.get("p" + patientID).diseases
}
function progressAdvancedReferralReferralDetailWindow() {
  patientID = jQuery('div#ref_detnoicon').attr('onclick').split("(")[1].split(",")[0]*1
  diseases = new Array(jQuery('div[class^=d_a_50]', jQuery('div#ref_detdis')).length)
  diseasesFromWindow = jQuery('div[class^=d_a_50]', jQuery('div#ref_detdis'))
  for (var i = 0; i < diseasesFromWindow.length; i++) {
    diseases[i] = jQuery(diseasesFromWindow[i]).attr('class').split(" ")[1].split("_")[1]*1
  }
  patientDiseasesStorage["p"+patientID] = diseases
  
  //only for debugModeing and bonus calculation
  if (debugMode) {
    basePointsFromUpjers = jQuery(jQuery('div#ref_detcost').children()[0]).text().split(" ")[2]*1
    basePointsCalculated = getBasePointsForPatient(patientID, true)
    differenze = basePointsFromUpjers - basePointsCalculated
    if (!jQuery('div#mypoints').length) {
      jQuery('<div id="mypoints">Berechnete Punkte: ' + basePointsCalculated + ' | Differenz: ' + differenze + '</div>').appendTo('div#ref_detcost')
    }
  //end debugModeging bonus calculation
  }
}
function savePatientDiseasesStorage() {
  //cleaning of patientDiseasesStorage
  for (var p in patientDiseasesStorage) {
    if (!isInArray(patientIDsInReferral, p)) {
      delete patientDiseasesStorage[p]
    }
  }
  //remove old version from localStorage
  localStorage.removeItem('patientDiseasesStorage' + userName);
  //write actual version to localStorage
  localStorage.setItem('patientDiseasesStorage' + userName, JSON.stringify(patientDiseasesStorage));
}
function addAdvancedReferralOptions() {
  //check if ConfigBase present
  if (!jQuery('ul#KHOptions').length) {
    jQuery(generateConfigBase()).insertAfter('div#b');
  }
  
  //check if wwConfig is present
  if (!jQuery('div#KHWWConfig').length) {
    jQuery(generateWWLevelConfigOptions()).appendTo('div#KHOptionsContent');
    jQuery('<li><a href="#KHWWConfig" data-toggle="tab">Allgemein</a></li>').insertAfter(jQuery('ul#KHOptions').children()[0]);
  }

  //add AdvancedReferral Options to ConfigBase
  jQuery(generateAdvancedReferralConfigOptions()).appendTo('div#KHOptionsContent');
  jQuery('<li><a href="#KHAdvancedReferralOptions" data-toggle="tab">KHAdvancedReferral</a></li>').appendTo('ul#toolsMenu');
  jQuery('#toolsMenu').parent().show();
  sortConfigMenu();

  //set AdvancedReferrl Options
  if (KHConfigValues.tiny) {
    jQuery('select#khadvancedreferralconfigfilter').val('Tiny')
  } else {
    jQuery('select#khadvancedreferralconfigfilter').val('Classic')
  }
  if (KHConfigValues.points) {
    jQuery('select#khadvancedreferralconfigcolumn').val('Punkte')
  } else {
    jQuery('select#khadvancedreferralconfigcolumn').val('hT')
  }
  jQuery('#wwLevel').val(KHConfigValues.wwLevel);

}
function generateWWLevelConfigOptions() {
  htmlCode = "";
  htmlCode += "<div class=\"tab-pane\" id=\"KHWWConfig\" style=\"margin-left:10px;margin-top:-18px;\">";
  htmlCode += "  Abgeschlossene Weltwunderstufe der ÄV: <input id=\"wwLevel\" type=\"number\" onchange=\"saveWWConfig()\" min=\"0\" max=\"10\" style=\"width:40px;\" value=\"10\">";
  htmlCode += "</div>";
  return htmlCode;
}
function generateAdvancedReferralConfigOptions() {
  htmlCode = "";
  htmlCode += "<div class=\"tab-pane\" id=\"KHAdvancedReferralOptions\" style=\"margin-left:10px;margin-top:-18px;\">";
  htmlCode += "  Filter Ansicht: <select id=\"khadvancedreferralconfigfilter\" onchange=\"saveKHAdvancedReferralConfig()\"><option>Classic</option><option>Tiny</option></select>&nbsp;Pro Zeit Spalte: <select id=\"khadvancedreferralconfigcolumn\" onchange=\"saveKHAdvancedReferralConfig()\"><option>hT</option><option>Punkte</option></select></p>";
  htmlCode += "</div>";
  return htmlCode;
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
function saveKHAdvancedReferralConfig() {
  if (jQuery('select#khadvancedreferralconfigfilter').val() == "Tiny") {
    KHConfigValues.tiny = true
  } else {
    KHConfigValues.tiny = false
  }

  if (jQuery('select#khadvancedreferralconfigcolumn').val() == "Punkte") {
    KHConfigValues.points = true
  } else {
    KHConfigValues.points = false
  }
  storeKHConfigValues();
}
function getLongTimeString(time, shortStrings) {
  years = Math.floor(time / 31622400)
  rest = time-(years*31622400)
  months = Math.floor(rest / 2635300)
  rest = rest-(months*2635300)
  days = Math.floor(rest / 86400)
  rest = rest-(days*86400)
  hour = Math.floor(rest / 3600)
  rest = rest-(hour*3600)
  min = Math.floor(rest/ 60)
  sek = rest-(min*60)
  timeString = ""
  if (years > 0) {
    timeString += years
    if (shortStrings) {
      timeString += " J "
    } else {
      timeString += years > 1 ? " Jahre " : " Jahr "
    }
  }
  if (months > 0) {
    timeString += months
    if (shortStrings) {
      timeString += " M "
    } else {
      timeString += months > 1 ? " Monate " : " Monat "
    }
  }
  if (days > 0) {
    timeString += days
    if (shortStrings) {
      timeString += " T "
    } else {
      timeString += days > 1 ? " Tage " : " Tag "
    }
  }
  if (hour > 0) {
    timeString += hour
    if (shortStrings) {
      timeString += " Std "
    } else {
      timeString += hour > 1 ? " Stunden " : " Stunde "
    }
  }
  if (min > 0) {
    timeString += min
    if (shortStrings) {
      timeString += " min "
    } else {
      timeString += min > 1 ? " Minuten " : " Minute "
    }
  }
  if (sek > 0) {
    timeString += sek
    if (shortStrings) {
      timeString += " sek"
    } else {
      timeString += sek > 1 ? " Sekunden " : " Sekunde "
    }
  }
  return timeString.trim()
}
function getRoomForDisease(diseaseIdString) {
  diseaseId = diseaseIdString.substr(diseaseIdString.indexOf("_")+1, diseaseIdString.lastIndexOf("_")-2)*1
  switch (diseaseId) {
    //Behandlungsraum
    case 3: case 4: case 5: case 6: case 10: case 11: case 12: case 909:
      return "Behandlungsraum"
    //Röntgenraum
    case 1: case 2: case 18: case 58: case 73:
      return "Röntgenraum"
    //Ultraschall
    case 26: case 30: case 44: case 52: case 75: case 94: case 99: case 113:
      return "Ultraschall"
    //Orthopädie
    case 48: case 49: case 55: case 60: case 66: case 80: case 103: case 110: case 904:
      return "Orthopädie"
    //Psychotherapie
    case 8: case 9: case 27: case 33: case 34: case 50: case 88: case 96: case 108: case 902:
      return "Psychotherapie"
    //EKG / EEG
    case 37: case 41: case 46: case 67: case 71: case 79: case 83: case 100: case 907:
      return "EKG / EEG"
    //Operationssaal
    case 19: case 39: case 40: case 53: case 65: case 77: case 101: case 107:
      return "Operationssaal"
    //Laboratorium
    case 21: case 22: case 38: case 43: case 61: case 74: case 86: case 98: case 105: case 905:
      return "Laboratorium"
    //Dunkelkammer
    case 20: case 32: case 36: case 45: case 56: case 76: case 78: case 84: case 90: case 111: case 900:
      return "Dunkelkammer"
    //Gummizelle
    case 24: case 31: case 35: case 57: case 64: case 82: case 93: case 95: case 901:
      return "Gummizelle"
    //Tomographie
    case 13: case 16: case 29: case 63: case 72: case 91: case 97: case 106:
      return "Tomographie"
    //Tropenmedizin
    case 7: case 14: case 15: case 17: case 47: case 51: case 87: case 104: case 114: case 908:
      return "Tropenmedizin"
    //Nuklearmedizin
    case 23: case 42: case 54: case 59: case 69: case 81: case 92: case 109: case 112: case 903:
      return "Nuklearmedizin"
    //Zahnmedizin
    case 28: case 62: case 68: case 70: case 85: case 89: case 102: case 906:
      return "Zahnmedizin"
  }
}
function getSelectOptionsArray(object) {
  var selectOptionArray = new Array()
  for (var i = 0; i < object.length; i++) {
    selectOptionArray.push(object.options[i].text)
  }
  return selectOptionArray
}
function findInArray(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i
    }
  }
  return -1
}
function removeFilter() {
  document.getElementById("toggle_patients").selectedIndex = 0
  KHConfigValues.selectedPatientsIndex = 0
  document.getElementById("toggle_diseases").selectedIndex = 0
  KHConfigValues.selectedNumberOfDiseases = "# Krankheiten"
  document.getElementById("toggle_recievers").selectedIndex = 0
  KHConfigValues.selectedDoctorsName = "alle Ärzte"
  document.getElementById('toggle_rooms').selectedIndex = 0
  KHConfigValues.selectedRoomsName = "alle Räume"
  document.getElementById('toggle_diseasesNames').selectedIndex = 0
  KHConfigValues.selectedDiseaseName = "alle Krankheiten"
  checkAllPatients()
}
function addColumnHeaders() {
  jQuery('<div id="referral_patients_headers">' +
         '<div class="ref_spatline ref_spatlineheader" style="width:149px;" onclick="changeSorting(0)">Patientenname</div>' +
         '<div class="ref_spatline ref_spatlineheader" style="width:96px;" onclick="changeSorting(1)">Krankheiten</div>' +
         '<div class="ref_spatline ref_spatlineheader" style="width:107px;display:none" onclick="changeSorting(2)">Absender</div>' +
         '<div class="ref_spatline ref_spatlineheader" style="width:62px;" title="Punkte mit Medis" onclick="changeSorting(3)">Punkte</div>' +
         '<div class="ref_spatline ref_spatlineheader" style="width:79px;" onclick="changeSorting(4)">Kosten</div>' +
         '<div class="ref_spatline ref_spatlineheader" style="width:69px;" title="Punkte pro Minute Behandlungszeit mit Medis" onclick="changeSorting(5)">hT/Min</div>' +
         '<div class="ref_spatline ref_spatlineheader" style="width:69px;" title="hT\'s pro Minute Behandlungszeit mit Medis" onclick="changeSorting(6)">Pkt/Min</div>' +
         '<div class="ref_spatline ref_spatlineheader" style="border-right:none;float:none;width: 45px;">Aktion</div>' +
         '</div>').insertBefore('div#referral_patients')

  //depending on Config hide ht/Min or p/min
  if (KHConfigValues.points) {
    jQuery(jQuery('div#referral_patients_headers').children()[5]).hide()
  } else {
    jQuery(jQuery('div#referral_patients_headers').children()[6]).hide()
  }
}
function addPatientDiv() {
  if (!jQuery('div#referral_patients').length) {
    jQuery('<div id="referral_patients_count" style="font-weight:bold;text-align: center; width: 535px; height: 20px; ">Ausgewählte Patienten: </div>').appendTo('div#referrals')
    jQuery('<div id="referral_patients" style="color:black;width:535px;min-height:50px;overflow-x:hidden;"></div>').appendTo('div#referrals')
  }
}
function progressRecievePatients() {
  if (jQuery('div#referral_reci_head').length > 0) {
    jQuery('div#referral_reci_head').css('font-weight', '')
    jQuery('div#referral_reci_head').text("Überwiesene Patienten")
    jQuery('div[class^="ref_spatline ref_spatlineheader"]', jQuery('div#referral_reci')).remove()
    addPatientDiv();
    jQuery('div#referral_reci').children().remove().appendTo('div#referral_patients')
    jQuery('div#referral_reci').remove()
  } else {
    jQuery('div#referral_reci').hide()
  }
}
function progressSendPatients() {
  if (jQuery('div#referral_send_head').length > 0) {
    jQuery('div#referral_send_head').css('font-weight', '')
    jQuery('div#referral_send_head').text("Ausgelagerte Patienten")
    jQuery('div[class^="ref_spatline ref_spatlineheader"]', jQuery('div#referral_send')).remove()
    addPatientDiv()
    jQuery('div#referral_send').children().remove().appendTo('div#referral_patients')
    jQuery('div#referral_send').remove()
  } else {
    jQuery('div#referral_send').hide()
  }
}
function progressKHAdvancedReferralWindow() {
  if (!jQuery('div#referral_patients').length) {
    startTime = new Date().getTime();
    numberOfReferralPats = jQuery('div[id^="rPat"][class^="cursorclickable"]', jQuery('div#referral_reci')).length + jQuery('div[id^="sPat"][class^="cursorclickable"]', jQuery('div#referral_send')).length;

    if (numberOfPats != numberOfReferralPats) {
      //get more Space
      jQuery('#referrals').css('left', '22')
      jQuery('#referrals').css('width', '575')
      //recieve
      progressRecievePatients()
    
      //always remove spaces between old PatientLists
      jQuery('br', jQuery('div#referrals')).remove()
    
      //send
      progressSendPatients()
    
      //add Column Headers
      if (!jQuery('div#referral_patients_headers').length) {
        addColumnHeaders()
      }
      
      //analyse Patients and Konstrukt Menu
      if (!jQuery('div#referral_patients_menu').length) {
        analysePatients()
        
        //addMenu
        if (KHConfigValues.tiny) {
          addTinyOptions()
        } else {
          addClassicOptions()
        }
        //restore Visibility
        if (!tinyMenuVisible) {
          jQuery('table#tiny_menu').toggle()
        }
    
        //addNumberOfSendPatients
        updateSelectedNumberOfPats()
    
        //addTotalPrice
        updateTotalPrice()
          
        //addTotalPoints
        updateTotalPoints()
    
        //addNumberOfDiseases
        updateNumberOfDiseases()
    
        //restoreOld Sorting Options
        setSortingIcons()
        sortPatients()
        
        //storeMap for next use
        $referralMap = jQuery('div#msgwindow').children();
      }
    } else {
      if (numberOfPats > 0) {
        jQuery('div#msgwindow').children().remove();
        jQuery($referralMap).appendTo('div#msgwindow');
      }
    }
    endTime = new Date().getTime()
    //debugMode progressTime
    if (debugMode) {
      updateProgressTime()
    }
  }
}
function addTinyOptions() {
  if (jQuery('div#referral_patients_menu').length === 0) {
    jQuery('<div id=\"referral_patients_menu\" style=\"margin-bottom:7px;\"><center><span style="font-size:9px;" onclick="toggleTinyMenu()">Ein-/Ausblenden</span>&nbsp;&nbsp;Allg. Filter: <select id=\"toggle_patients\" onChange=\"changePatientView(true)\" style=\"width:129px\"><option>alle Patienten</option><option>keine Simulanten</option><option>nur Simulanten</option><option>keine MultiPats</option><option>nur MultiPats</option></select><select id=\"toggle_diseases\" onChange=\"changePatientView(true)\" style=\"margin-left:3px;width:111px;\"><option># Krankheiten</option>' + getOptionsString(diseasesMenuArray) + '</select><select id=\"toggle_recievers\" onChange=\"changePatientView(true)\" style=\"margin-left:3px;width:107px;\"><option>alle Ärzte</option>' + getOptionsString(doctorsMenuArray) + '</select><select id=\"toggle_rooms\" onChange=\"changePatientView(true)\" style=\"display:none;\"><option>alle Räume</option>' + getOptionsString(roomsMenuArray) + '</select><div title=\"Alle Filter entfernen\" style=\"float:right; margin-right: 10px; margin-top:4px; width: 15px; background-repeat:none; background-image:url(http://pics.kapihospital.de/referral_icons_15.jpg); background-position: -75px 0px;\" onclick=\"removeFilter()\">&nbsp;</div></center><table id="tiny_menu" style=\"border-spacing: 0px 3px;width:530px;\"><tbody>' + getRow(2) + getRow(3) + getRow(9) + getRow(12) + getRow(13) + getRow(5) + getRow(1) + getRow(4) + getRow(8) + getRow(10) + getRow(7) + getRow(15) + getRow(16) + getRow(17) + '</tbody></table><center><div id=\"tiny_filter\">' + getTinyFilterString() + '</div></center><div title=\"Tiny Filter entfernen\" style=\"float:right;margin-left:10px;margin-right:10px;margin-top:-13px; width: 15px; background-repeat:none; background-image:url(http://pics.kapihospital.de/referral_icons_15.jpg); background-position: -75px 0px;\" onclick=\"removeTinyFilter()\">&nbsp;</div><select id=\"toggle_diseasesNames\" onChange=\"changePatientView(true)\" style=\"margin-left: 210px;display:none;\"><option>alle Krankheiten</option>' + getOptionsString(diseasesNamesMenuArray) + '</select></div>').insertBefore('div#referral_patients_count')
  }
  restoreFilterSelection()
}
function toggleTinyMenu() {
  if (tinyMenuVisible) {
    tinyMenuVisible = false
  } else {
    tinyMenuVisible = true
  }
  jQuery('table#tiny_menu').toggle()
}
function getTinyFilterString() {
  tinyFilterString = "Tiny Filter: "
  if (KHConfigValues.selectedRoomsName != "alle Räume") {
    tinyFilterString += "Raum = " + KHConfigValues.selectedRoomsName
  }
  if (KHConfigValues.selectedDiseaseName != "alle Krankheiten") {
    tinyFilterString += "Krankheit = " + KHConfigValues.selectedDiseaseName
  }
  if (KHConfigValues.tinyFilterString == "Tiny Filter: ") {
    tinyFilterString += "kein Filter"
  }
  return tinyFilterString
}
function removeTinyFilter() {
  tinyMenuVisible = true
  KHConfigValues.selectedRoomsName = "alle Räume"
  KHConfigValues.selectedDiseaseName = "alle Krankheiten"
  jQuery('div#tiny_filter').text(getTinyFilterString())
  checkAllPatients()
}
function getRow(id) {
  roomName = Global.availableRooms[id].name
  numberForRoom = tinyCountedRooms[id]
  switch(id) {
    case 2:
      color = "#E2BD9B"
      rooms = getColumn(4) + getColumn(3) + getColumn(6) + getColumn(5) + getColumn(12) + getColumn(11) + getColumn(10) + "<td colspan=\"6\"></td>"
      break
    case 3:
      color = "#A3A6DE"
      rooms = getColumn(1) + getColumn(2) + getColumn(18) + getColumn(58) + getColumn(73) + "<td colspan=\"10\"></td>"
      break
    case 9:
      color = "#B48DC4"
      rooms = getColumn(26) + getColumn(44) + getColumn(30) + getColumn(113) + getColumn(94) + getColumn(99) + getColumn(52) + getColumn(75) + "<td colspan=\"4\"></td>"
      break
    case 12:
      color = "#E0E19A"
      rooms = getColumn(48) + getColumn(66) + getColumn(49) + getColumn(80) + getColumn(103) + getColumn(110) + getColumn(55) + getColumn(60) + "<td colspan=\"4\"></td>"
      break
    case 13:
      color = "#74B077"
      rooms = getColumn(8) + getColumn(9) + getColumn(34) + getColumn(88) + getColumn(96) + getColumn(27) + getColumn(108) + getColumn(50) + getColumn(33) + "<td colspan=\"2\"></td>"
      break
    case 5:
      color = "#BCE3B3"
      rooms = getColumn(71) + getColumn(67) + getColumn(79) + getColumn(37) + getColumn(83) + getColumn(100) + getColumn(41) + getColumn(46) + "<td colspan=\"4\"></td>"
      break
    case 1:
      color = "#D9D9D9"
      rooms = getColumn(19) + getColumn(39) + getColumn(77) + getColumn(107) + getColumn(40) + getColumn(101) + getColumn(53) + getColumn(65) + "<td colspan=\"4\"></td>"
      break
    case 4:
      color = "white"
      rooms = getColumn(61) + getColumn(21) + getColumn(86) + getColumn(22) + getColumn(98) + getColumn(38) + getColumn(105) + getColumn(43) + getColumn(74) + "<td colspan=\"2\"></td>"
      break
    case 8:
      color = "#666468"
      rooms = getColumn(36) + getColumn(45) + getColumn(78) + getColumn(84) + getColumn(56) + getColumn(90) + getColumn(111) + getColumn(20) + getColumn(32) + getColumn(76)
      break
    case 10:
      color = "#556C7C"
      rooms = getColumn(35) + getColumn(31) + getColumn(82) + getColumn(93) + getColumn(95) + getColumn(57) + getColumn(24) + getColumn(64) + "<td colspan=\"4\"></td>"
      break
    case 7:
      color = "#DCC6A1"
      rooms = getColumn(29) + getColumn(16) + getColumn(91) + getColumn(13) + getColumn(97) + getColumn(106) + getColumn(63) + getColumn(72) + "<td colspan=\"4\"></td>"
      break
    case 15:
      color = "#707B58"
      rooms = getColumn(51) + getColumn(15) + getColumn(87) + getColumn(7) + getColumn(104) + getColumn(14) + getColumn(114) + getColumn(47) + getColumn(17) + "<td colspan=\"2\"></td>"
      break
    case 16:
      color = "#A296A3"
      rooms = getColumn(69) + getColumn(54) + getColumn(23) + getColumn(81) + getColumn(112) + getColumn(92) + getColumn(42) + getColumn(109) + getColumn(59) + "<td colspan=\"2\"></td>"
      break
    case 17:
      color = "#A5DBDF"
      rooms = getColumn(68) + getColumn(28) + getColumn(85) + getColumn(102) + getColumn(89) + getColumn(62) + getColumn(70) + "<td colspan=\"6\"></td>"
      break
  }
  if (numberForRoom > 0) {
    return "<tr style=\"background-color: " + color + ";height:17px;\"><td width=\"30px;\">" + numberForRoom + "</td><td width=\"110\"><a onclick=\"changeTinyFilter('alle Krankheiten','" + roomName + "')\" href=\"#\" style=\"text-decoration: none;\">" + roomName + "</a></td>" + rooms + "</tr>"
  } else {
    return ""
  }
}
function getColumn(id) {
  name = Global.availableDiseases[id].name
  amount = tinyCountedDiseases[id]
  if (amount > 0) {
    return "<td><div class=\"d_a_15 d_" + id + "_15\" title=\"" + name + "\" onclick=\"changeTinyFilter('" + name + "','alle Räume')\" style=\"cursor:pointer;\"></div></td><td style=\"width:25px;\">" + amount + "</td>"
  } else {
    return "<td colspan=\"2\" style=\"width:40px;\">&nbsp;</td>"
  }
}
function addClassicOptions() {
  if (jQuery('div#referral_patients_menu').length === 0) {
    jQuery('<div id=\"referral_patients_menu\" style=\"margin-bottom:7px;\"><select id=\"toggle_patients\" onChange=\"changePatientView(false)\" style=\"width:149px\"><option>alle Patienten</option><option>keine Simulanten</option><option>nur Simulanten</option><option>keine MultiPats</option><option>nur MultiPats</option></select><select id=\"toggle_diseases\" onChange=\"changePatientView(false)\" style=\"margin-left:3px;width:111px\"><option># Krankheiten</option>' + getOptionsString(diseasesMenuArray) + '</select><select id=\"toggle_recievers\" onChange=\"changePatientView(false)\" style=\"margin-left:3px;width:107px;\"><option>alle Ärzte</option>' + getOptionsString(doctorsMenuArray) + '</select><select id=\"toggle_rooms\" onChange=\"changePatientView(false)\"><option>alle Räume</option>' + getOptionsString(roomsMenuArray) + '</select><div title=\"Alle Filter entfernen\" style=\"float:right; margin-right: 10px; margin-top:14px; width: 15px; background-repeat:none; background-image:url(http://pics.kapihospital.de/referral_icons_15.jpg); background-position: -75px 0px;\" onclick=\"removeFilter()\">&nbsp;</div><select id=\"toggle_diseasesNames\" onChange=\"changePatientView(false)\" style=\"margin-left: 210px;\"><option>alle Krankheiten</option>' + getOptionsString(diseasesNamesMenuArray) + '</select></div>').insertAfter('div#referral_patients_count')
  }
  restoreFilterSelection()
}
function restoreFilterSelection() {
  //restoreOptionsSelection
  changePatientViewNecessary = false
  document.getElementById("toggle_patients").selectedIndex = KHConfigValues.selectedPatientsIndex
  index = findInArray(getSelectOptionsArray(document.getElementById("toggle_diseases")), KHConfigValues.selectedNumberOfDiseases)
  if (index != -1) {
    document.getElementById("toggle_diseases").selectedIndex = index
  } else {
    document.getElementById("toggle_diseases").selectedIndex = 0
    changePatientViewNecessary = true
  }
  index = findInArray(getSelectOptionsArray(document.getElementById("toggle_recievers")), KHConfigValues.selectedDoctorsName)
  if (index != -1) {
    document.getElementById("toggle_recievers").selectedIndex = index
  } else {
    document.getElementById("toggle_recievers").selectedIndex = 0
    changePatientViewNecessary = true
  }
  index = findInArray(getSelectOptionsArray(document.getElementById("toggle_rooms")), KHConfigValues.selectedRoomsName)
  if (index != -1) {
    document.getElementById("toggle_rooms").selectedIndex = index
  } else {
    document.getElementById("toggle_rooms").selectedIndex = 0
    changePatientViewNecessary = true
  }
  if (changePatientViewNecessary) {
    changePatientView()
  }
}
function updateProgressTime() {
  progressTime = endTime - startTime
  if (jQuery('div#analyse_time').length === 0) {
    jQuery('<div id=\"analyse_time\" style="position: absolute; top: 430px; left: 33px;">Time: ' + progressTime + 'ms</div>').insertAfter('div#referrals')
  } else {
    jQuery('div#analyse_time').text("Time: " + progressTime + "ms")
  }
}
function updateNumberOfDiseases() {
  if (totalDiseasesCount > 1) {
    diseaseCountString = "Krankheiten"
  } else {
    diseaseCountString = "Krankheit"
  }
  if (jQuery('div#total_diseasecount').length === 0) {
    jQuery('<div id=\"total_diseasecount\" style="position: absolute; top: 430px; left: 188px;">' + totalDiseasesCount + ' : ' + diseaseCountString + '<br />Behandlungszeiten<br />mit Medis: ' + getLongTimeString(totalDiseasesDuration/2, true) + '<br />ohne Medis: ' + getLongTimeString(totalDiseasesDuration, true) + '</div>').insertAfter('div#referrals')
  } else {
    jQuery('div#total_diseasecount').html(totalDiseasesCount + " : " + diseaseCountString + "<br />Behandlungszeiten<br />mit Medis: " + getLongTimeString(totalDiseasesDuration/2, true) + "<br />ohne Medis: " + getLongTimeString(totalDiseasesDuration, true))
  }
}
function updateSelectedNumberOfPats() {
  totalPats = numberOfPats-numberOfHiddenPats
  jQuery('div#referral_patients_count').text("Ausgewählte Patienten: " + totalPats)
  
}
function updateTotalPrice() {
  totalPrice = totalSendPrice-totalRecievePrice
  actualMoney = jQuery('span#bar').text().replace(".","").replace(",",".")*1
  newMoney = actualMoney + totalPrice
  var options = {
    symbol : "hT",
    decimal : ",",
    thousand: ".",
    precision : 2,
    format: "%v %s"
  };

  if (jQuery('div#total_price').length === 0) {
    jQuery('<div id=\"total_price\" style="position: absolute; top: 430px; left: 315px;">hT: ' + accounting.formatMoney(totalPrice, options) + ' (' + accounting.formatMoney(newMoney, options) + ')</div>').insertAfter('div#referrals')
  } else {
    jQuery('div#total_price').text("hT: " + accounting.formatMoney(totalPrice, options) + " (" + accounting.formatMoney(newMoney, options) + ")")
  }
}
function updateTotalPoints() {
  actualPoints = jQuery('span#pkt').text().replace(".","").replace(",",".")*1
  newPoints = actualPoints + totalPoints
  var options = {
    decimal : ",",
    thousand: ".",
    precision : 0,
    format: "%v"
  };

  if (jQuery('div#total_points').length === 0) {
    jQuery('<div id=\"total_points\" style="position: absolute; top: 443px; left: 315px;">Punkte: ' + accounting.formatMoney(totalPoints, options) + ' (' + accounting.formatMoney(newPoints, options) + ')</div>').insertAfter('div#referrals')
  } else {
    jQuery('div#total_points').text("Punkte: " + accounting.formatMoney(totalPoints, options) + " (" + accounting.formatMoney(newPoints, options) + ")")
  }
}
function changeTinyFilter(diseaseName, roomName) {
  KHConfigValues.selectedDiseaseName = diseaseName
  KHConfigValues.selectedRoomsName = roomName
  storeKHConfigValues();
  index = findInArray(getSelectOptionsArray(document.getElementById("toggle_rooms")), KHConfigValues.selectedRoomsName)
  if (index != -1) {
    document.getElementById("toggle_rooms").selectedIndex = index
  }
  jQuery('div#tiny_filter').text(getTinyFilterString())
  checkAllPatients()
}
function changePatientView(tinyView) {
  var actualIndex = 0
  KHConfigValues.selectedPatientsIndex = document.getElementById("toggle_patients").selectedIndex
  actualIndex = document.getElementById("toggle_diseases").selectedIndex
  KHConfigValues.selectedNumberOfDiseases = document.getElementById("toggle_diseases")[actualIndex].value
  actualIndex = document.getElementById("toggle_recievers").selectedIndex
  KHConfigValues.selectedDoctorsName = document.getElementById("toggle_recievers")[actualIndex].value
  if (tinyView) {
    document.getElementById("toggle_rooms").selectedIndex = 0
    KHConfigValues.selectedRoomsName = document.getElementById("toggle_rooms")[0].value
    document.getElementById("toggle_diseasesNames").selectedIndex = 0
    KHConfigValues.selectedDiseaseName = document.getElementById("toggle_diseasesNames")[0].value
  } else {
    actualIndex = document.getElementById("toggle_rooms").selectedIndex
    KHConfigValues.selectedRoomsName = document.getElementById("toggle_rooms")[actualIndex].value
    actualIndex = document.getElementById("toggle_diseasesNames").selectedIndex
    KHConfigValues.selectedDiseaseName = document.getElementById("toggle_diseasesNames")[actualIndex].value
  }
  storeKHConfigValues();
  checkAllPatients()
}
function getOptionsString(array) {
  var optionsString = ""
  for (var i = 0; i < array.length; i++) {
    optionsString += "<option>" + array[i] + "</option>"
  }
  return optionsString
}
function changeSorting(column) {
  if (KHConfigValues.columnsToSort[column] == 0 && column != 1) {
    for (var i = 0; i < KHConfigValues.columnsToSort.length; i++) {
      if (i != 1) {
        KHConfigValues.columnsToSort[i] = 0
      }
    }
  }
  KHConfigValues.columnsToSort[column]++
  if (KHConfigValues.columnsToSort[column] === 2) {
    KHConfigValues.columnsToSort[column] = -1
  }
  
  storeKHConfigValues();
  setSortingIcons()
  sortPatients()
}
function setSortingIcons() {
  for (var i = 0; i < KHConfigValues.columnsToSort.length; i++) {
    if (KHConfigValues.columnsToSort[i] === 0) {
      jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_patients_headers'))[i]).text(headers[i])
      jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_patients_headers'))[i]).css('padding-bottom', '0px')
      jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_patients_headers'))[i]).css('margin-top', '0px')
    } else if (KHConfigValues.columnsToSort[i] === 1) {
      jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_patients_headers'))[i]).text(headers[i] + "  ")
      jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_patients_headers'))[i]).append('<img style="position: relative; top: 3px;" src="http://icons.primail.ch/arrows/up.gif" />')
      jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_patients_headers'))[i]).css('padding-bottom', '2px')
      jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_patients_headers'))[i]).css('margin-top', '-2px')
    } else if (KHConfigValues.columnsToSort[i] === -1) {
      jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_patients_headers'))[i]).text(headers[i] + "  ")
      jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_patients_headers'))[i]).append('<img style="position: relative; top: 3px;" src="http://icons.primail.ch/arrows/down.gif" />')
      jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_patients_headers'))[i]).css('padding-bottom', '2px')
      jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_patients_headers'))[i]).css('margin-top', '-2px')
    }
  }
}
function getName(object) {
  return jQuery('div[class^="ref_spatline"]', object)[0].innerHTML
}
function countDiseases(object) {
  return jQuery('div[class^=d_a_15]', object).length
}
function getDiseases(object) {
  return jQuery('div[class^=d_a_15]', object)
}
function getDiseaseNames(object) {
  diseaseNames = new Array()
  allDiseases = jQuery('div[class^=d_a_15]', object)
  allDiseases.each(function() {
    actualDisease = jQuery(this).attr('title')
    if (!isInArray(diseaseNames, actualDisease)) {
      diseaseNames.push(actualDisease)
    }
  })
  return diseaseNames
}
function getDiseaseID(object) {
  return jQuery(object).attr('class').split(" ")[1].split("_")[1]*1
}
function getReciever(object) {
  return jQuery('div[class^="ref_spatline"]', object)[2].innerHTML
}
function getRooms(object) {
 rooms = new Array()
 allDiseases = jQuery('div[class^=d_a_15]', object)
 allDiseases.each(function() {
   actualRoom = getRoomForDisease(jQuery(this).attr('class').split(" ")[1])
   if (!isInArray(rooms, actualRoom)) {
     rooms.push(actualRoom)
   }
 })
 return rooms
}
function getSortingFunction(columnToSort, sortingDirection) {
  if (columnToSort === 0) {
    return function (left, right) {
      left = getName(left)
      right = getName(right)
      if (left < right) {
        return -1 * sortingDirection;
      } else if (left === right) {
        return 0;
      } else {
        return 1 * sortingDirection;
      }
    }
  } else if (columnToSort === 1) {
    return function (left, right) {
      left = countDiseases(left)
      right = countDiseases(right)
      if (left < right) {
        return -1 * sortingDirection;
      } else if (left === right) {
        return 0;
      } else {
        return 1 * sortingDirection;
      }
    }
  } else if (columnToSort === 2) {
    return function (left, right) {
      left = getReciever(left)
      right = getReciever(right)
      if (left < right) {
        return -1 * sortingDirection;
      } else if (left === right) {
        return 0;
      } else {
        return 1 * sortingDirection;
      }
    }
  } else if (columnToSort === 3) {
    return function (left, right) {
      left = getPoints(left)*1
      right = getPoints(right)*1
      if (left < right) {
        return -1 * sortingDirection;
      } else if (left === right) {
        return 0;
      } else {
        return 1 * sortingDirection;
      }
    }
  } else if (columnToSort === 4) {
    return function (left, right) {
      left = getPrice(left)*1
      right = getPrice(right)*1
      if (left < right) {
        return -1 * sortingDirection;
      } else if (left === right) {
        return 0;
      } else {
        return 1 * sortingDirection;
      }
    }
  } else if (columnToSort === 5) {
    return function (left, right) {
      left = gethTPerTime(left)*1
      right = gethTPerTime(right)*1
      if (left < right) {
        return -1 * sortingDirection;
      } else if (left === right) {
        return 0;
      } else {
        return 1 * sortingDirection;
      }
    }
  } else if (columnToSort === 6) {
    return function (left, right) {
      left = getPointsPerTimeSorting(left)*1
      right = getPointsPerTimeSorting(right)*1
      if (left < right) {
        return -1 * sortingDirection;
      } else if (left === right) {
        return 0;
      } else {
        return 1 * sortingDirection;
      }
    }
  }
}
function sortPatients() {
  //remove Pats for sorting
  reciPatsToSort = jQuery('div[id^="rPat"][class^="cursorclickable"]', jQuery('div#referral_patients')).remove()
  sendPatsToSort = jQuery('div[id^="sPat"][class^="cursorclickable"]', jQuery('div#referral_patients')).remove()
  
  numberOfColumnsToSort = 0
  columnToSort = -1
  for (var i = 0; i < KHConfigValues.columnsToSort.length; i++) {
    if (KHConfigValues.columnsToSort[i] != 0) {
      numberOfColumnsToSort++
      if (i != 1) {
        columnToSort = i
      }
    }
  }
  if (numberOfColumnsToSort == 1) {
    //single Column Sort
    if (columnToSort == -1) {
      columnToSort = 1
    }
    reciPatsToSort = sortPatientList(reciPatsToSort, getSortingFunction(columnToSort, KHConfigValues.columnsToSort[columnToSort]))
    sendPatsToSort = sortPatientList(sendPatsToSort, getSortingFunction(columnToSort, KHConfigValues.columnsToSort[columnToSort]))
  } else if (numberOfColumnsToSort == 2) {
    //Double Column Sort
    //sorting after Column 1
    reciPatsToSort = sortPatientList(reciPatsToSort, getSortingFunction(1, KHConfigValues.columnsToSort[1]))
    sendPatsToSort = sortPatientList(sendPatsToSort, getSortingFunction(1, KHConfigValues.columnsToSort[1]))
    if (KHConfigValues.columnsToSort[1] == 1) {
      for (var i = 1; i < 7; i++) {
        reciPartToSort = jQuery(jQuery(reciPatsToSort).filter(function(){ return jQuery(jQuery(this).children()[1]).children().length == i}))
        reciPatsToSort = jQuery(jQuery(reciPatsToSort).filter(function(){ return jQuery(jQuery(this).children()[1]).children().length != i}))
        reciPartToSort = sortPatientList(reciPartToSort, getSortingFunction(columnToSort, KHConfigValues.columnsToSort[columnToSort]))
        reciPatsToSort = reciPatsToSort.add(reciPartToSort)

        sendPartToSort = jQuery(sendPatsToSort).filter(function(){ return jQuery(jQuery(this).children()[1]).children().length == i})
        sendPatsToSort = jQuery(sendPatsToSort).filter(function(){ return jQuery(jQuery(this).children()[1]).children().length != i})
        sendPartToSort = sortPatientList(sendPartToSort, getSortingFunction(columnToSort, KHConfigValues.columnsToSort[columnToSort]))
        sendPatsToSort = sendPatsToSort.add(sendPartToSort)
      }
    } else if (KHConfigValues.columnsToSort[1] == -1) {
      for (var i = 6; i > 0; i--) {
        reciPartToSort = jQuery(jQuery(reciPatsToSort).filter(function(){ return jQuery(jQuery(this).children()[1]).children().length == i}))
        reciPatsToSort = jQuery(jQuery(reciPatsToSort).filter(function(){ return jQuery(jQuery(this).children()[1]).children().length != i}))
        reciPartToSort = sortPatientList(reciPartToSort, getSortingFunction(columnToSort, KHConfigValues.columnsToSort[columnToSort]))
        reciPatsToSort = reciPatsToSort.add(reciPartToSort)

        sendPartToSort = jQuery(sendPatsToSort).filter(function(){ return jQuery(jQuery(this).children()[1]).children().length == i})
        sendPatsToSort = jQuery(sendPatsToSort).filter(function(){ return jQuery(jQuery(this).children()[1]).children().length != i})
        sendPartToSort = sortPatientList(sendPartToSort, getSortingFunction(columnToSort, KHConfigValues.columnsToSort[columnToSort]))
        sendPatsToSort = sendPatsToSort.add(sendPartToSort)
      }
    }
  }

  //add Sorted Pats
  reciPatsToSort.insertAfter('#referral_reci_head')
  sendPatsToSort.insertAfter('#referral_send_head')
}
function sortPatientList(listToSort, sortingFunction) {
  //add Merge Sort
  /*!
   * Merge Sort in JavaScript v1.0
   * http://github.com/sidewaysmilk/merge-sort
   *
   * Copyright (c) 2011, Justin Force
   * Licensed under the BSD 3-Clause License
   */
  
  /*jslint browser: true, indent: 2 */
  /*global jQuery */
  (function () {
    'use strict';
    // Add stable merge sort method to Array prototype
    if (!Array.mergeSort) {
      Array.prototype.mergeSort = function (compare) {
        var length = this.length,
          middle = Math.floor(length / 2);
  
        // define default comparison function if none is defined
        if (!compare) {
          compare = function (left, right) {
            if (left  <  right) {
              return -1;
            } else if (left === right) {
              return 0;
            } else {
              return 1;
            }
          };
        }
  
        if (length < 2) {
          return this;
        }
  
        function merge(left, right, compare) {
          var result = [];
          while (left.length > 0 || right.length > 0) {
            if (left.length > 0 && right.length > 0) {
              if (compare(left[0], right[0]) <= 0) {
                result.push(left[0]);
                left = left.slice(1);
              } else {
                result.push(right[0]);
                right = right.slice(1);
              }
            } else if (left.length > 0) {
              result.push(left[0]);
              left = left.slice(1);
            } else if (right.length > 0) {
              result.push(right[0]);
              right = right.slice(1);
            }
          }
          return result;
        }
        return merge(
          this.slice(0, middle).mergeSort(compare),
          this.slice(middle, length).mergeSort(compare),
          compare
        );
      };
    }
    // Add merge sort to jQuery if it's present
    if (window.jQuery !== undefined) {
      jQuery.fn.mergeSort = function (compare) {
        return jQuery(Array.prototype.mergeSort.call(this, compare));
      };
      jQuery.mergeSort = function (array, compare) {
        return Array.prototype.mergeSort.call(array, compare);
      };
    }
  }());
  //End Merge Sort
  return listToSort.mergeSort(sortingFunction)
}
function getPrice(object) {
  if (jQuery('.ref_spatline', object).length == 5) {
    var priceToParse = jQuery(jQuery('.ref_spatline', object)[3]).text()
  } else {
    var priceToParse = jQuery(jQuery('.ref_spatline', object)[4]).text()
  }
  return formatPrices(priceToParse.substr(0, priceToParse.indexOf(' '))).replace(",",".")
}
function getPoints(object) {
  if (jQuery('.ref_spatline', object).length > 5) {
    return jQuery(jQuery('.ref_spatline', object)[3]).text()
  } else {
    return -1
  }
}
function formatPrices(priceToFormat) {
  return priceToFormat.replace(".", "")
}
function getDiseasesDuration(id) {
  return Global.availableDiseases[id].basetime
}
function getMultiRooms(object) {
 rooms = new Array()
 multiRooms = new Array()
 allDiseases = jQuery('div[class^=d_a_15]', object)
 allDiseases.each(function() {
   actualRoom = getRoomForDisease(jQuery(this).attr('class').split(" ")[1])
   if (!isInArray(rooms, actualRoom)) {
     rooms.push(actualRoom)
   } else {
     multiRooms.push(actualRoom)
   }
 })
 return multiRooms
}
function isInArray(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return true
    }
  }
  return false
}
function hidePats(Patient, anzahlKrankheiten) {
  if (countDiseases(Patient) === anzahlKrankheiten) {
    jQuery(Patient).hide()
    numberOfHiddenPats++
    return true
  }
  return false
}
function hidePatsGreater(Patient, anzahlKrankheiten) {
  if (countDiseases(Patient) > anzahlKrankheiten) {
    jQuery(Patient).hide()
    numberOfHiddenPats++
    return true
  }
  return false
}
function hidePatsExcept(Patient, anzahlKrankheiten) {
  if (countDiseases(Patient) != anzahlKrankheiten) {
    jQuery(Patient).hide()
    numberOfHiddenPats++
    return true
  }
  return false
}
function hidePatsNotTo(Patient, reciever) {
  if (getReciever(Patient) != reciever) {
    jQuery(Patient).hide()
    numberOfHiddenPats++
    return true
  }
  return false
}
function hidePatsNotForRoom(Patient, room) {
  if (!isInArray(getRooms(Patient), room)) {
    jQuery(Patient).hide()
    numberOfHiddenPats++
    return true
  }
  return false
}
function hidePatsNotWithDiseases(Patient, disease) {
  if (!isInArray(getDiseaseNames(Patient), disease)) {
    jQuery(Patient).hide()
    numberOfHiddenPats++
    return true
  }
  return false
}
function hidePatsNotMulti(Patient, room) {
  if (room == "alle Räume") {
    if (!getMultiRooms(Patient).length) {
      jQuery(Patient).hide()
      numberOfHiddenPats++
      return true
    }
  } else {
    if (!isInArray(getMultiRooms(Patient), room)) {
      jQuery(Patient).hide()
      numberOfHiddenPats++
      return true
    }
  }
  return false
}
function hidePatsMulti(Patient) {
  if (getMultiRooms(Patient).length) {
    jQuery(Patient).hide()
    numberOfHiddenPats++
    return true
  }
  return false
}
function checkIfPatNeedsToBeHidden(patient) {
  //to ensure that all are visible
  jQuery(patient).show()
  //Patients Filter
  if (KHConfigValues.selectedPatientsIndex == 1) {
    if (hidePats(patient, 1)) {
      return false
    }
  } else if (KHConfigValues.selectedPatientsIndex == 2) {
    if (hidePatsGreater(patient, 1)) {
      return false
    }
  } else if (KHConfigValues.selectedPatientsIndex == 3) {
    if (hidePatsMulti(patient)) {
      return false
    }
  } else if (KHConfigValues.selectedPatientsIndex == 4) {
    if (hidePatsNotMulti(patient, KHConfigValues.selectedRoomsName)) {
      return false
    }
  }
  //Dieseases Filter
  if (KHConfigValues.selectedNumberOfDiseases != "# Krankheiten") {
    if (hidePatsExcept(patient, KHConfigValues.selectedNumberOfDiseases)) {
      return false
    }
  }
  //Recievers Filter
  if (KHConfigValues.selectedDoctorsName != "alle Ärzte") {
    if (hidePatsNotTo(patient, KHConfigValues.selectedDoctorsName)) {
      return false
    }
  }
  //Rooms Filter
  if (KHConfigValues.selectedRoomsName != "alle Räume") {
    if (hidePatsNotForRoom(patient, KHConfigValues.selectedRoomsName)) {
      return false
    }
  }
  //Disease Filter
  if (KHConfigValues.selectedDiseaseName != "alle Krankheiten") {
    if (hidePatsNotWithDiseases(patient, KHConfigValues.selectedDiseaseName)) {
      return false
    }
  }
  return true
}
function checkIfPatNeedsToBeHiddenByTinyGeneral(patient) {
  //to ensure that all are visible
  jQuery(patient).show()
  //Patients Filter
  if (KHConfigValues.selectedPatientsIndex == 1) {
    if (hidePats(patient, 1)) {
      return false
    }
  } else if (KHConfigValues.selectedPatientsIndex == 2) {
    if (hidePatsGreater(patient, 1)) {
      return false
    }
  } else if (KHConfigValues.selectedPatientsIndex == 3) {
    if (hidePatsMulti(patient)) {
      return false
    }
  } else if (KHConfigValues.selectedPatientsIndex == 4) {
    if (hidePatsNotMulti(patient, KHConfigValues.selectedRoomsName)) {
      return false
    }
  }
  //Dieseases Filter
  if (KHConfigValues.selectedNumberOfDiseases != "# Krankheiten") {
    if (hidePatsExcept(patient, KHConfigValues.selectedNumberOfDiseases)) {
      return false
    }
  }
  //Recievers Filter
  if (KHConfigValues.selectedDoctorsName != "alle Ärzte") {
    if (hidePatsNotTo(patient, KHConfigValues.selectedDoctorsName)) {
      return false
    }
  }
  return true
}
function checkIfPatNeedsToBeHiddenByTinySpecial(patient) {
  //to ensure that all are visible
  if (jQuery(patient).is(':visible')) {
    //Rooms Filter
    if (KHConfigValues.selectedRoomsName != "alle Räume") {
      if (hidePatsNotForRoom(patient, KHConfigValues.selectedRoomsName)) {
        return false
      }
    }
    //Disease Filter
    if (KHConfigValues.selectedDiseaseName != "alle Krankheiten") {
      if (hidePatsNotWithDiseases(patient, KHConfigValues.selectedDiseaseName)) {
        return false
      }
    }
    return true
  } else {
    return false
  }
}
function checkAllPatients() {
  analysePatients()
  updateTotalPrice()
  updateTotalPoints()
  updateSelectedNumberOfPats()
  updateNumberOfDiseases()
  if (debugMode) {
    updateProgressTime()
  }
  if (KHConfigValues.tiny) {
    jQuery(jQuery('div#referral_patients_menu')).remove()
    addTinyOptions()
  }
}
function getDiseaseBasePoints(diseaseId) {
  healTime = Global.availableDiseases["" + diseaseId].basetime
  healTimeMin = healTime / 60
  healTimeWithMedi = healTimeMin / 2
  levelNeeded = Global.availableDiseases["" + diseaseId].level
  return Math.pow(Math.ceil(healTimeWithMedi / 10), 1.5) + 1 + levelNeeded
}
function getPointsForDisease(diseaseId, level, medsUsed) {
  if (medsUsed) {
    return getDiseaseBasePoints(diseaseId) * (levelBonus*(level-1)+1)
  } else {
    return (getDiseaseBasePoints(diseaseId)-1) * (levelBonus*(level-1)+1)
  }
}
function getBasePointsForPatient(patientId, medsUsed) {
  allDiseasesBasePoints = 0
  if (patientDiseasesStorage["p"+patientId]) {
    allDiseases = patientDiseasesStorage["p"+patientId]
    for (var i = 0; i < allDiseases.length; i++) {
      if (medsUsed) {
        allDiseasesBasePoints += getDiseaseBasePoints(allDiseases[i])
      } else {
        allDiseasesBasePoints += getDiseaseBasePoints(allDiseases[i])-1
      }
    }
    return allDiseasesBasePoints
  } else {
    return -1
  }
}
function getPointsForPatient(patientId, level, medsUsed) {
  if (patientDiseasesStorage["p"+patientId] != undefined) {
    pointsForPiper = Math.floor((getBasePointsForPatient(patientId, medsUsed)+BonusForMultiDiseases(patientDiseasesStorage["p"+patientId].length))*((level-1)*levelBonus+1))
    pointsWithWWBonus = pointsForPiper
    
    if (KHConfigValues.wwLevel == 10) {
      pointsWithWWBonus = pointsForPiper * 1.05 * 1.05 * 1.1
    } else if (KHConfigValues.wwLevel >= 6) {
      pointsWithWWBonus = pointsForPiper * 1.05 * 1.05
    } else if (KHConfigValues.wwLevel >= 1) {
      pointsWithWWBonus = pointsForPiper * 1.05
    }
    
    officePoints = Math.floor(pointsWithWWBonus)
    return officePoints
  } else {
    return -1
  }
}
function BonusForMultiDiseases(numberOfDiseases) {
  switch (numberOfDiseases) {
    case 1:
      return 0
    case 2:
      return (0.37722 + 0.38499) / 2
    case 3:
      return (0.94791 + 0.96850) / 2
    case 4:
      return (1.65636 + 1.65701) / 2
    case 5:
      return (2.46768 + 2.56625) / 2
    case 6:
      return (3.38966 + 3.39235) / 2
  }
}
function getPatientId(patient) {
  return jQuery(patient).attr('onclick').split("(")[1].split(",")[0]*1
}
function getRestTreatmentTimeMin(object) {
  allDiseases = getDiseases(object)
  totalTreatmentTime = 0
  for (var i = 0; i < allDiseases.length; i++) {
    totalTreatmentTime += getDiseasesDuration(getDiseaseID(allDiseases[i]))
  }
  return totalTreatmentTime = totalTreatmentTime / 2 / 60
}
function gethTPerTime(object) {
  payment = getPrice(object)
  restTreatmentTimeMin = getRestTreatmentTimeMin(object)
  return payment / restTreatmentTimeMin
}
function getPointsPerTime(object, patientId, level, medsUsed) {
  restTreatmentTimeMin = getRestTreatmentTimeMin(object)
  points = getPointsForPatient(patientId, level, medsUsed)
  return points / restTreatmentTimeMin
}
function getPointsPerTimeSorting(object) {
  return jQuery(jQuery(object).children()[6]).text().replace(",",".")
}
function analysePatient(patient, recieved) {
  patientId = getPatientId(patient)

  //counting
  numberOfPats++

  //adding the ID to Array
  patientIDsInReferral.push("p"+patientId)
  
  var actualPoints = 0
  //add Points
  if (jQuery('[class^=ref_spatline]', patient).length == 5) {
    if (pointsCalculation) {
      jQuery(jQuery('[class^=ref_spatline]', patient)[2]).hide()
      actualPoints = getPointsForPatient(patientId, level, true)
      jQuery('<div class="ref_spatline" style="width:62px;">' + actualPoints + '</div>').insertAfter(jQuery('[class=ref_spatline]', patient)[2])
    }
  }
  //add hT/Min
  var options = {
    symbol: "hT",
    decimal : ",",
    thousand: ".",
    precision : 2,
    format: "%v %s"
  };
  if (jQuery('[class^=ref_spatline]', patient).length == 6) {
    jQuery('<div class="ref_spatline" style="width:69px;">' + accounting.formatMoney(gethTPerTime(patient), options) + '</div>').insertAfter(jQuery('[class=ref_spatline]', patient)[4])
  }
  if (pointsCalculation) {
    //add points/Min
    var options = {
      decimal : ",",
      thousand: ".",
      precision : 2,
      format: "%v"
    };
    if (jQuery('[class^=ref_spatline]', patient).length == 7) {
      jQuery('<div class="ref_spatline" style="width:69px;">' + accounting.formatMoney(getPointsPerTime(patient, patientId, level, true), options) + '</div>').insertAfter(jQuery('[class=ref_spatline]', patient)[5])
    }
    //depending on Config hide ht/Min or p/min
    if (KHConfigValues.points) {
      jQuery(jQuery('[class^=ref_spatline]', patient)[5]).hide()
    } else {
      jQuery(jQuery('[class^=ref_spatline]', patient)[6]).hide()
    }
  }
  
  //changeColums Width
  jQuery(jQuery('[class^=ref_spatline]', patient)[1]).attr('style', 'width:96px;')
  jQuery(jQuery('[class^=ref_spatline]', patient)[4]).attr('style', 'width:79px;')
  
  //add Doctor Name to Tooltip
  if (recieved) {
    jQuery(jQuery(jQuery(patient).children()[7]).children()[1]).attr('title', 'Überweisung von "' + getReciever(patient) + '" annehmen')
    jQuery(jQuery(jQuery(patient).children()[7]).children()[2]).attr('title', 'Überweisung von "' + getReciever(patient) + '" ablehnen')
  } else {
    jQuery(jQuery(jQuery(patient).children()[7]).children()[2]).attr('title', 'Überweisung an "' + getReciever(patient) + '" zurückziehen')
  }

  //Options
  numberOfDiseases = countDiseases(patient)
  if (!isInArray(diseasesMenuArray, numberOfDiseases)) {
    diseasesMenuArray.push(numberOfDiseases)
  }
  reciever = getReciever(patient)
  if (!isInArray(doctorsMenuArray, reciever)) {
    doctorsMenuArray.push(reciever)
  }
  rooms = getRooms(patient)
  for (var i = 0; i < rooms.length; i++) {
    if (!isInArray(roomsMenuArray, rooms[i])) {
      roomsMenuArray.push(rooms[i])
    }
  }
  diseasesNames = getDiseaseNames(patient)
  for (var i = 0; i < diseasesNames.length; i++) {
    if (!isInArray(diseasesNamesMenuArray, diseasesNames[i])) {
      diseasesNamesMenuArray.push(diseasesNames[i])
    }
  }
  
  if (KHConfigValues.tiny) {
    if (checkIfPatNeedsToBeHiddenByTinyGeneral(patient)) {
      //totalDiseasesCounting
      countedDiseasesPatient = new Array()
      countedRoomsPatient = new Array()
      for (var i = 0; i < countDiseases(patient); i++) {
        if (!countedRoomsPatient[Global.availableDiseases[getDiseaseID(getDiseases(patient)[i])].room[0]]) {
          countedRoomsPatient[Global.availableDiseases[getDiseaseID(getDiseases(patient)[i])].room[0]] = 1
        }
        
        if (!countedDiseasesPatient[getDiseaseID(getDiseases(patient)[i])]) {
          countedDiseasesPatient[getDiseaseID(getDiseases(patient)[i])] = 1
        } else {
          countedDiseasesPatient[getDiseaseID(getDiseases(patient)[i])]++
        }
      }
  
      for (var i = 0; i < countedDiseasesPatient.length; i++) {
        if (countedDiseasesPatient[i] > 0) {
          if (!tinyCountedDiseases[i]) {
            tinyCountedDiseases[i] = 0
          }
          tinyCountedDiseases[i] += countedDiseasesPatient[i]
        }
      }
      for (var i = 0; i < countedRoomsPatient.length; i++) {
        if (countedRoomsPatient[i] > 0) {
          if (!tinyCountedRooms[i]) {
          tinyCountedRooms[i] = 0
          }
          tinyCountedRooms[i] += countedRoomsPatient[i]
        }
      }
    }
  }

  //restoreFilter
  if (KHConfigValues.tiny) {
    isPatientNotHidden = checkIfPatNeedsToBeHiddenByTinySpecial(patient)
  } else {
    isPatientNotHidden = checkIfPatNeedsToBeHidden(patient)
  }
  if (isPatientNotHidden) {
    //price
    if (recieved) {
      totalRecievePrice += getPrice(patient)*1
    } else {
      totalSendPrice += getPrice(patient)*1
    }
    //points
    if (pointsCalculation) {
      totalPoints += getPoints(patient)*1
    }
    //diseases
    for (var i = 0; i < countDiseases(patient); i++) {
      if (!countedDiseases[getDiseaseID(getDiseases(patient)[i])]) {
        countedDiseases[getDiseaseID(getDiseases(patient)[i])] = 1
      } else {
        countedDiseases[getDiseaseID(getDiseases(patient)[i])]++
      }
    }
  }
}
function analysePatients() {
  numberOfPats = 0
  numberOfHiddenPats = 0
  totalSendPrice = 0
  totalRecievePrice = 0
  totalPoints = 0
  countedDiseases = new Array()
  diseasesMenuArray = new Array()
  doctorsMenuArray = new Array()
  roomsMenuArray = new Array()
  diseasesNamesMenuArray = new Array()
  tinyCountedDiseases = new Array()
  tinyCountedRooms = new Array()
  patientIDsInReferral = new Array()
  levelString = jQuery('#level').text()
  level = levelString.substr(levelString.indexOf('(')+2, (levelString.lastIndexOf(' ')-(levelString.indexOf('(')+2)))*1

  //recieved Patients
  jQuery('div[id^="rPat"][class^="cursorclickable"]', jQuery('div#referral_patients')).each(function() {
    analysePatient(this, true)
  })
  if (!jQuery('div[id^="rPat"][class^="cursorclickable"]', jQuery('div#referral_patients')).is(':visible')) {
    jQuery('div#referral_reci_head').hide()
  } else {
    jQuery('div#referral_reci_head').show()
  }

  //send Patients
  jQuery('div[id^="sPat"][class^="cursorclickable"]', jQuery('div#referral_patients')).each(function() {
    analysePatient(this, false)
  })
  if (!jQuery('div[id^="sPat"][class^="cursorclickable"]', jQuery('div#referral_patients')).is(':visible')) {
    jQuery('div#referral_send_head').hide()
  } else {
    jQuery('div#referral_send_head').show()
  }
  //sort sendOptions
  diseasesMenuArray.sort(function(a,b){return a - b})
  doctorsMenuArray.sort()
  roomsMenuArray.sort()
  diseasesNamesMenuArray.sort()

  totalDiseasesCount = 0
  totalDiseasesDuration = 0
  for (var i = 0; i < countedDiseases.length; i++) {
    if (countedDiseases[i] != undefined) {
      //counting
      totalDiseasesCount += countedDiseases[i]
      //duration
      totalDiseasesDuration += countedDiseases[i] * getDiseasesDuration(i)
    }
  }
  savePatientDiseasesStorage()
}
function storeKHConfigValues() {
  //remove old version from localStorage
  localStorage.removeItem('KHConfigValues' + userName);
  //write actual version to localStorage
  localStorage.setItem('KHConfigValues' + userName, JSON.stringify(KHConfigValues));
}
function sortConfigMenu() {
  menuToSort = jQuery('#toolsMenu').children().remove();
  //add Merge Sort
  /*!
   * Merge Sort in JavaScript v1.0
   * http://github.com/sidewaysmilk/merge-sort
   *
   * Copyright (c) 2011, Justin Force
   * Licensed under the BSD 3-Clause License
   */
  
  /*jslint browser: true, indent: 2 */
  /*global jQuery */
  (function () {
    'use strict';
    // Add stable merge sort method to Array prototype
    if (!Array.mergeSort) {
      Array.prototype.mergeSort = function (compare) {
        var length = this.length,
          middle = Math.floor(length / 2);
  
        // define default comparison function if none is defined
        if (!compare) {
          compare = function (left, right) {
            if (left  <  right) {
              return -1;
            } else if (left === right) {
              return 0;
            } else {
              return 1;
            }
          };
        }
  
        if (length < 2) {
          return this;
        }
  
        function merge(left, right, compare) {
          var result = [];
          while (left.length > 0 || right.length > 0) {
            if (left.length > 0 && right.length > 0) {
              if (compare(left[0], right[0]) <= 0) {
                result.push(left[0]);
                left = left.slice(1);
              } else {
                result.push(right[0]);
                right = right.slice(1);
              }
            } else if (left.length > 0) {
              result.push(left[0]);
              left = left.slice(1);
            } else if (right.length > 0) {
              result.push(right[0]);
              right = right.slice(1);
            }
          }
          return result;
        }
        return merge(
          this.slice(0, middle).mergeSort(compare),
          this.slice(middle, length).mergeSort(compare),
          compare
        );
      };
    }
    // Add merge sort to jQuery if it's present
    if (window.jQuery !== undefined) {
      jQuery.fn.mergeSort = function (compare) {
        return jQuery(Array.prototype.mergeSort.call(this, compare));
      };
      jQuery.mergeSort = function (array, compare) {
        return Array.prototype.mergeSort.call(array, compare);
      };
    }
  }());
  //End Merge Sort
  
  sortedMenu = menuToSort.mergeSort(function (left, right) {
    left = getEntryName(left)
    right = getEntryName(right)
    if (left < right) {
      return -1;
    } else if (left === right) {
      return 0;
    } else {
      return 1;
    }
  });

  jQuery(sortedMenu).appendTo('#toolsMenu');
}
//End KHAdvancedReferral
//Begin Script
injectScript();
injectScriptStart(injectStartReady);
//End Script