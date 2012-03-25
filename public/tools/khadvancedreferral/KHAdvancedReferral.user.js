// ==UserScript==
// @name          KHAdvancedReferral
// @version       2.0b
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

  initKHAdvancedReferral()
  //Interval Function
  window.setInterval("recogniseKHAdvancedReferralWindow()", 100)
  window.setInterval("recogniseKHAdvancedReferralOptionsWindow()", 100)
}

function addAccounting(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://raw.github.com/josscrowcroft/accounting.js/master/accounting.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function readyAccounting() {
}
//Begin Injection
var variablen = new Array()
variablen.push("send_head_old = \"Von dir überwiesene Patienten\"")
variablen.push("send_head = \"Ausgewählte Patienten\"")
variablen.push("numberOfSendPats = 0")
variablen.push("numberOfHiddenSendPats = 0")
variablen.push("totalSendPrice = 0")
variablen.push("totalRecievePrice = 0")
variablen.push("headers = new Array(\"Patientenname\", \"Krankheiten\", \"Empfänger\", \"Punkte\", \"Kosten\", \"hT/Min\", \"Pkt/Min\")")
variablen.push("columnToSort = -1")
variablen.push("sortingDirection = 0")
variablen.push("countedDiseases = new Array()")
variablen.push("totalDiseasesCount = 0")
variablen.push("totalDiseasesDuration = 0")
variablen.push("sendDiseases")
variablen.push("sendReciever")
variablen.push("sendRooms")
variablen.push("sendDiseasesNames")
variablen.push("actualSendPatientsIndex = 0")
variablen.push("actualSendNumberOfDiseases = \"# Krankheiten\"")
variablen.push("actualSendRecieverName = \"alle Empfänger\"")
variablen.push("actualSendRoomsName = \"alle Räume\"")
variablen.push("actualSendDiseaseName = \"alle Krankheiten\"")
variablen.push("startTime = 0")
variablen.push("endTime = 0")
variablen.push("debug = false")
variablen.push("tiny = false")
variablen.push("points = false")
variablen.push("tinyCountedRooms = new Array()")
variablen.push("tinyCountedDiseases = new Array()")
variablen.push("levelBonus = 0.025")
variablen.push("patientDiseasesStorage = new Object()")
variablen.push("wwLevel = 0")
variablen.push("patientIDsInReferral = new Array()")

function addFunctions() {
  var functionsToAdd = new Array(initKHAdvancedReferral, recogniseKHAdvancedReferralWindow, recogniseKHAdvancedReferralOptionsWindow, progressAdvancedReferralReferralDetailWindow, progressAdvancedReferralPatientViewWindow, progressKHAdvancedReferralAccountOptionsWindow, progressKHAdvancedReferralWindow, getDiseaseBasePoints, savePatientDiseasesStorage, saveWWConfig, formatPrices, getPointsForPatient, getPatientId, addTinyOptions, saveKHAdvancedReferralConfig, addClassicOptions, updateAnalyseTime, updateNumberOfSendDiseases, getMultiRooms, hidePats, hidePatsGreater, hidePatsExcept, hidePatsNotTo, hidePatsNotForRoom, hidePatsNotMulti, hidePatsMulti, hidePatsNotWithDiseases, checkIfPatNeedsToBeHidden, checkAllSendPatients, updateTotalPrice, updateNumberOfSendPats, removeSendFilter, getSelectOptionsArray, findInArray, getOptionsString, getRoomForDisease, getLongTimeString, getDiseasesDuration, getDiseases, getDiseaseID, isInArray, countDiseases, getDiseaseNames, changeTinyFilter, getReciever, getRooms, getName, getPrice, changeSorting, sortPatients, setSortingIcons, changeSendPatientView, restoreFilterSelection, analyseSendPatients, checkIfPatNeedsToBeHiddenByTinyGeneral, checkIfPatNeedsToBeHiddenByTinySpecial, getRow, getColumn, getPoints, gethTPerTime, getPointsPerTime, removeTinyFilter, BonusForMultiDiseases, getRestTreatmentTimeMin, getBasePointsForPatient, getTinyFilterString, setCookie, getCookie)
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
//Begin Manager
function initKHAdvancedReferral() {
  //restoreSelection Options from Cookie
  storedTinyOptions = getCookie("KHAdvancedReferralTinyOptions" + jQuery('#username').text())
  if (storedTinyOptions != null) {
    if (storedTinyOptions == "true") {
      tiny = true
    } else if (storedTinyOptions == "false") {
      tiny = false
    }
  } else {
    tiny = true
  }

  //restoreDisplay witch column
  storedPointsOptions = getCookie("KHAdvancedReferralPointsOptions" + jQuery('#username').text())
  if (storedPointsOptions != null) {
    if (storedPointsOptions == "true") {
      points = true
    } else if (storedPointsOptions == "false") {
      points = false
    }
  } else {
    points = false
  }

  //restore WWCookie
  storedWWLevel = getCookie("KHWWLevel" + jQuery('#username').text())
  if (storedWWLevel != null) {
    wwLevel = storedWWLevel
  } else {
    wwLevel = 0
  }

  //check if Dev Mode
  if (window.location.search == "?dev") {
    debug = true
  } else {
    debug = false
  }
  
  //restore patientDiseaseStorage
  patientDiseasesStorage = JSON.parse(localStorage.getItem('patientDiseasesStorage'));
  if (patientDiseasesStorage == undefined) {
    patientDiseasesStorage = new Object()
  }
}
function saveWWConfig() {
  wwLevel = jQuery('#wwLevel').val()
  var cookieName = "KHWWLevel" + jQuery('#username').text()
  setCookie(cookieName, wwLevel, 100, "/", window.location.hostname)
}
function recogniseKHAdvancedReferralWindow() {
  if (jQuery('div#referrals').is(':visible')) {
    if (jQuery('div#ref_divdetailsbig').is(':visible') &&
       (jQuery('div#ref_divdetailsbig').css('background-image') == "url(http://pics.kapihospital.de/bg_referral_02.jpg)" ||
        jQuery('div#ref_divdetailsbig').css('background-image') == "url(\"http://pics.kapihospital.de/bg_referral_02.jpg\")")) {
      progressAdvancedReferralReferralDetailWindow()
    } else {
      progressKHAdvancedReferralWindow()
    }
  } else if (jQuery('div#msgwindow').is(':visible')) {
    if (jQuery('div#msgwindow').css('background-image') == "url(http://pics.kapihospital.de/medicalrecord_1.png)" ||
        jQuery('div#msgwindow').css('background-image') == "url(\"http://pics.kapihospital.de/medicalrecord_1.png\")") {
      progressAdvancedReferralPatientViewWindow()
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
  
  //only for debuging and bonus calculation
  basePointsFromUpjers = jQuery(jQuery('div#ref_detcost').children()[0]).text().split(" ")[2]*1
  basePointsCalculated = getBasePointsForPatient(patientID, true)
  differenze = basePointsFromUpjers - basePointsCalculated
  if (!jQuery('div#mypionts').length) {
    jQuery('<div id="mypionts">Berechnete Punkte: ' + basePointsCalculated + ' | Differenz: ' + differenze + '</div>').appendTo('div#ref_detcost')
  }
  //end debugging bonus calculation
}
function savePatientDiseasesStorage() {
  //cleaning of patientDiseasesStorage
  for (var p in patientDiseasesStorage) {
    if (!isInArray(patientIDsInReferral, p)) {
      delete patientDiseasesStorage[p]
    }
  }
  //remove old version from localStorage
  localStorage.removeItem('patientDiseasesStorage');
  //write actual version to localStorage
  localStorage.setItem('patientDiseasesStorage', JSON.stringify(patientDiseasesStorage));
}
function recogniseKHAdvancedReferralOptionsWindow() {
  if (jQuery('div#b').length && !jQuery('div#KHAdvancedReferralOptions').length) {
    progressKHAdvancedReferralAccountOptionsWindow()
  }
}
function progressKHAdvancedReferralAccountOptionsWindow() {
  if (!jQuery('div#KHOptions').length) {
    jQuery('<div id="KHOptions" style="margin-top: 60px;"></div>').insertAfter('div#b')
  }
  jQuery('<div id="KHAdvancedReferralOptions">Filter Ansicht: <select id="khadvancedreferralconfigfilter" onChange="saveKHAdvancedReferralConfig()"><option>Classic</option><option>Tiny</option></select>&nbsp;Pro Zeit Spalte: <select id="khadvancedreferralconfigcolumn" onChange="saveKHAdvancedReferralConfig()"><option>hT</option><option>Punkte</option></div>').appendTo('div#KHOptions')
  if (tiny) {
    jQuery('select#khadvancedreferralconfigfilter').val('Tiny')
  } else {
    jQuery('select#khadvancedreferralconfigfilter').val('Classic')
  }
  if (points) {
    jQuery('select#khadvancedreferralconfigcolumn').val('Punkte')
  } else {
    jQuery('select#khadvancedreferralconfigcolumn').val('hT')
  }
  if (!jQuery('div#KHWWConfig').length) {
    jQuery('<div id="KHWWConfig">Abgeschlossene Weltwunderstufe der ÄV: <input id="wwLevel" type="number" size="4" onChange="saveWWConfig()" value="' + wwLevel + '" min="0" max="10"></div>').appendTo('div#KHOptions')
  }

}
function saveKHAdvancedReferralConfig() {
  if (jQuery('select#khadvancedreferralconfigfilter').val() == "Tiny") {
    tiny = true
  } else {
    tiny = false
  }
  var cookieName = "KHAdvancedReferralTinyOptions" + jQuery('#username').text()
  setCookie(cookieName, tiny, 100, "/", window.location.hostname)

  if (jQuery('select#khadvancedreferralconfigcolumn').val() == "Punkte") {
    points = true
  } else {
    points = false
  }
  var cookieName = "KHAdvancedReferralPointsOptions" + jQuery('#username').text()
  setCookie(cookieName, points, 100, "/", window.location.hostname)
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
      if (years > 1) {
        timeString += " Jahre "
      } else {
        timeString += " Jahr "
      }
    }
  }
  if (months > 0) {
    timeString += months
    if (shortStrings) {
      timeString += " M "
    } else {
      if (months > 1) {
        timeString += " Monate "
      } else {
        timeString += " Monat "
      }
    }
  }
  if (days > 0) {
    timeString += days
    if (shortStrings) {
      timeString += " T "
    } else {
      if (days > 1) {
        timeString += " Tage "
      } else {
        timeString += " Tag "
      }
    }
  }
  if (hour > 0) {
    timeString += hour
    if (shortStrings) {
      timeString += " Std "
    } else {
      if (hour > 1) {
        timeString += " Stunden "
      } else {
        timeString += " Stunde "
      }
    }
  }
  if (min > 0) {
    timeString += min
    if (shortStrings) {
      timeString += " min "
    } else {
      if (min > 1) {
        timeString += " Minuten "
      } else {
        timeString += " Minute "
      }
    }
  }
  if (sek > 0) {
    timeString += sek
    if (shortStrings) {
      timeString += " sek"
    } else {
      if (sek > 1) {
        timeString += " Sekunden"
      } else {
        timeString += " Sekunde"
      }
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
function removeSendFilter() {
  document.getElementById("toggle_patients").selectedIndex = 0
  actualSendPatientsIndex = 0
  document.getElementById("toggle_diseases").selectedIndex = 0
  actualSendNumberOfDiseases = "# Krankheiten"
  document.getElementById("toggle_recievers").selectedIndex = 0
  actualSendRecieverName = "alle Empfänger"
  document.getElementById('toggle_rooms').selectedIndex = 0
  actualSendRoomsName = "alle Räume"
  actualSendDiseaseName = "alle Krankheiten"
  checkAllSendPatients()
}
function progressKHAdvancedReferralWindow() {
  //Wenn nothing to recieve hide
  if (jQuery('div#referral_reci').is(':visible') && !jQuery('div[id^="rPat"][class^="cursorclickable"]', jQuery('div#referral_reci')).length) {
    jQuery('div#referral_reci').hide()
    jQuery('br', jQuery('div#referrals')).hide()
  }

  if (jQuery('div[id^="sPat"][class^="cursorclickable"]', jQuery('div#referral_send')).length > 0) {
    if (jQuery('div#send_options').length === 0) {
      analyseSendPatients()
  
      //addNumberOfSendPatients
      updateNumberOfSendPats()
        
      //addNumberOfDiseases
      updateNumberOfSendDiseases()
      
      //addTotalPrice
      updateTotalPrice()
      
      //add Sorting
      if (jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send')).length > 0) {
        jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[0].setAttribute('onclick', 'changeSorting(0)')
        jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[1].setAttribute('onclick', 'changeSorting(1)')
        jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[1]).attr('style', 'width:96px;')
        jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[2].setAttribute('onclick', 'changeSorting(2)')
        jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[2]).hide()
        jQuery('<div class="ref_spatline ref_spatlineheader" style="width:62px;" title="Punkte mit Medis" onclick="changeSorting(3)">' + headers[3] + '</div>').insertAfter(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[2])
        jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[4].setAttribute('onclick', 'changeSorting(4)')
        jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[4]).attr('style', 'width:79px;')
        jQuery('<div class="ref_spatline ref_spatlineheader" style="width:69px;" title="Punkte pro Minute Behandlungszeit mit Medis" onclick="changeSorting(5)">' + headers[5] + '</div>').insertAfter(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[4])
        jQuery('<div class="ref_spatline ref_spatlineheader" style="width:69px;" title="hT\'s pro Minute Behandlungszeit mit Medis" onclick="changeSorting(6)">' + headers[6] + '</div>').insertAfter(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[5])
      }
      //depending on Config hide ht/Min or p/min
      if (points) {
        jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[5]).hide()
      } else {
        jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[6]).hide()
      }

      //restoreOld Sorting Options
      if (columnToSort != -1 && sortingDirection != 0) {
        setSortingIcons()
        sortPatients()
      }
  
      if (tiny) {
        addTinyOptions()
      } else {
        addClassicOptions()
      }    
      
      //debug analyseTime
      if (debug) {
        updateAnalyseTime()
      }
    }
  }
}
function addTinyOptions() {
  if (jQuery('div#send_options').length === 0) {
    jQuery('<div id=\"send_options\" style=\"margin-bottom:7px;\"><center>Allg. Filter: <select id=\"toggle_patients\" onChange=\"changeSendPatientView()\" style=\"width:129px\"><option>alle Patienten</option><option>keine Simulanten</option><option>nur Simulanten</option><option>keine MultiPats</option><option>nur MultiPats</option></select><select id=\"toggle_diseases\" onChange=\"changeSendPatientView()\" style=\"margin-left:3px;width:111px;\"><option># Krankheiten</option>' + getOptionsString(sendDiseases) + '</select><select id=\"toggle_recievers\" onChange=\"changeSendPatientView()\" style=\"margin-left:3px;width:107px;\"><option>alle Empfänger</option>' + getOptionsString(sendReciever) + '</select><select id=\"toggle_rooms\" onChange=\"changeSendPatientView()\" style=\"display:none;\"><option>alle Räume</option>' + getOptionsString(sendRooms) + '</select><div title=\"Alle Filter entfernen\" style=\"float:right; margin-right: 10px; margin-top:4px; width: 15px; background-repeat:none; background-image:url(http://pics.kapihospital.de/referral_icons_15.jpg); background-position: -75px 0px;\" onclick=\"removeSendFilter()\">&nbsp;</div></center><table style=\"border-spacing: 0px 3px;\"><tbody>' + getRow(2) + getRow(3) + getRow(9) + getRow(12) + getRow(13) + getRow(5) + getRow(1) + getRow(4) + getRow(8) + getRow(10) + getRow(7) + getRow(15) + getRow(16) + getRow(17) + '</tbody></table><center><div id=\"tiny_filter\">' + getTinyFilterString() + '</div></center><div title=\"Tiny Filter entfernen\" style=\"float:right;margin-left:10px;margin-top:-4px; width: 15px; background-repeat:none; background-image:url(http://pics.kapihospital.de/referral_icons_15.jpg); background-position: -75px 0px;\" onclick=\"removeTinyFilter()\">&nbsp;</div><select id=\"toggle_diseasesNames\" onChange=\"changeSendPatientView()\" style=\"margin-left: 210px;display:none;\"><option>alle Krankheiten</option>' + getOptionsString(sendDiseasesNames) + '</select></div>').insertBefore('div#referral_send_head')
  }
  restoreFilterSelection()
}
function getTinyFilterString() {
  tinyFilterString = "Tiny Filter: "
  if (actualSendRoomsName != "alle Räume") {
    tinyFilterString += "Raum = " + actualSendRoomsName
  }
  if (actualSendDiseaseName != "alle Krankheiten") {
    tinyFilterString += "Krankheit = " + actualSendDiseaseName
  }
  if (tinyFilterString == "Tiny Filter: ") {
    tinyFilterString += "kein Filter"
  }
  return tinyFilterString
}
function removeTinyFilter() {
  actualSendRoomsName = "alle Räume"
  actualSendDiseaseName = "alle Krankheiten"
  jQuery('div#tiny_filter').text(getTinyFilterString())
  checkAllSendPatients()
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
  //add Options
  if (jQuery('div#send_options').length === 0) {
    jQuery('<div id=\"send_options\" style=\"margin-bottom:7px;\"><select id=\"toggle_patients\" onChange=\"changeSendPatientView()\" style=\"width:149px\"><option>alle Patienten</option><option>keine Simulanten</option><option>nur Simulanten</option><option>keine MultiPats</option><option>nur MultiPats</option></select><select id=\"toggle_diseases\" onChange=\"changeSendPatientView()\" style=\"margin-left:3px;width:111px\"><option># Krankheiten</option>' + getOptionsString(sendDiseases) + '</select><select id=\"toggle_recievers\" onChange=\"changeSendPatientView()\" style=\"margin-left:3px;width:107px;\"><option>alle Empfänger</option>' + getOptionsString(sendReciever) + '</select><select id=\"toggle_rooms\" onChange=\"changeSendPatientView()\"><option>alle Räume</option>' + getOptionsString(sendRooms) + '</select><div title=\"Alle Filter entfernen\" style=\"float:right; margin-right: 10px; margin-top:14px; width: 15px; background-repeat:none; background-image:url(http://pics.kapihospital.de/referral_icons_15.jpg); background-position: -75px 0px;\" onclick=\"removeSendFilter()\">&nbsp;</div><select id=\"toggle_diseasesNames\" onChange=\"changeSendPatientView()\" style=\"margin-left: 210px;\"><option>alle Krankheiten</option>' + getOptionsString(sendDiseasesNames) + '</select></div>').insertAfter('div#referral_send_head')
  }
  restoreFilterSelection()
}
function restoreFilterSelection() {
  //restoreOptionsSelection
  document.getElementById("toggle_patients").selectedIndex = actualSendPatientsIndex
  index = findInArray(getSelectOptionsArray(document.getElementById("toggle_diseases")), actualSendNumberOfDiseases)
  if (index != -1) {
    document.getElementById("toggle_diseases").selectedIndex = index
  } else {
    document.getElementById("toggle_diseases").selectedIndex = 0
    changeSendPatientView()
  }
  index = findInArray(getSelectOptionsArray(document.getElementById("toggle_recievers")), actualSendRecieverName)
  if (index != -1) {
    document.getElementById("toggle_recievers").selectedIndex = index
  } else {
    document.getElementById("toggle_recievers").selectedIndex = 0
    changeSendPatientView()
  }
  index = findInArray(getSelectOptionsArray(document.getElementById("toggle_rooms")), actualSendRoomsName)
  if (index != -1) {
    document.getElementById("toggle_rooms").selectedIndex = index
  } else {
    document.getElementById("toggle_rooms").selectedIndex = 0
    changeSendPatientView()
  }
}
function updateAnalyseTime() {
  analyseTime = endTime - startTime
  if (jQuery('div#analyse_time').length === 0) {
    jQuery('<div id=\"analyse_time\" style="position: absolute; top: 430px; left: 33px;">Time: ' + analyseTime + 'ms</div>').insertAfter('div#referrals')
  } else {
    jQuery('div#analyse_time').text("Time: " + analyseTime + "ms")
  }
}
function updateNumberOfSendDiseases() {
  if (totalDiseasesCount > 1) {
    diseaseCountString = "Krankheiten"
  } else {
    diseaseCountString = "Krankheit"
  }
  if (jQuery('div#total_diseasecount').length === 0) {
    jQuery('<div id=\"total_diseasecount\" style="position: absolute; top: 430px; left: 188px;">' + totalDiseasesCount + ' : ' + diseaseCountString + '<br />Behandlungszeit mit Medis: ' + getLongTimeString(totalDiseasesDuration/2, true) + '</div>').insertAfter('div#referrals')
  } else {
    jQuery('div#total_diseasecount').html(totalDiseasesCount + " : " + diseaseCountString + "<br />Behandlungszeit mit Medis: " + getLongTimeString(totalDiseasesDuration/2, true))
  }
}
function updateNumberOfSendPats() {
  totalSendPats = numberOfSendPats-numberOfHiddenSendPats
  jQuery('div#referral_send_head').text(send_head + ": " + totalSendPats)
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
    jQuery('<div id=\"total_price\" style="position: absolute; top: 430px; left: 315px;">Summe: ' + accounting.formatMoney(totalPrice, options) + ' (' + accounting.formatMoney(newMoney, options) + ')</div>').insertAfter('div#referrals')
  } else {
    jQuery('div#total_price').text("Summe: " + accounting.formatMoney(totalPrice, options) + " (" + accounting.formatMoney(newMoney, options) + ")")
  }
}
function changeTinyFilter(diseaseName, roomName) {
  actualSendDiseaseName = diseaseName
  actualSendRoomsName = roomName
  index = findInArray(getSelectOptionsArray(document.getElementById("toggle_rooms")), actualSendRoomsName)
  if (index != -1) {
    document.getElementById("toggle_rooms").selectedIndex = index
  }
  jQuery('div#tiny_filter').text(getTinyFilterString())
  checkAllSendPatients()
}
function changeSendPatientView() {
  var actualIndex = 0
  actualSendPatientsIndex = document.getElementById("toggle_patients").selectedIndex
  actualIndex = document.getElementById("toggle_diseases").selectedIndex
  actualSendNumberOfDiseases = document.getElementById("toggle_diseases")[actualIndex].value
  actualIndex = document.getElementById("toggle_recievers").selectedIndex
  actualSendRecieverName = document.getElementById("toggle_recievers")[actualIndex].value
  actualIndex = document.getElementById("toggle_rooms").selectedIndex
  actualSendRoomsName = document.getElementById("toggle_rooms")[actualIndex].value
  actualIndex = document.getElementById("toggle_diseasesNames").selectedIndex
  actualSendDiseaseName = document.getElementById("toggle_diseasesNames")[actualIndex].value
  checkAllSendPatients()
}
function getOptionsString(array) {
  var optionsString = ""
  for (var i = 0; i < array.length; i++) {
    optionsString += "<option>" + array[i] + "</option>"
  }
  return optionsString
}
function changeSorting(column) {
  if (columnToSort != column) {
    columnToSort = column
    sortingDirection = 1
  } else {
    sortingDirection++
    if (sortingDirection === 2) {
      sortingDirection = -1
    }
  }
  setSortingIcons()
  sortPatients()
}
function setSortingIcons() {
  for (var i = 0; i < headers.length; i++) {
    jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[i]).text(headers[i])
    jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[i]).css('padding-bottom', '0px')
    jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[i]).css('margin-top', '0px')
  }
  if (sortingDirection === 0) {
    jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[columnToSort]).text(headers[columnToSort])
    jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[columnToSort]).css('padding-bottom', '0px')
    jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[columnToSort]).css('margin-top', '0px')
  } else if (sortingDirection === 1) {
    jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[columnToSort]).text(headers[columnToSort] + "  ")
    jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[columnToSort]).append('<img style="position: relative; top: 3px;" src="http://icons.primail.ch/arrows/up.gif" />')
    jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[columnToSort]).css('padding-bottom', '2px')
    jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[columnToSort]).css('margin-top', '-2px')
  } else if (sortingDirection === -1) {
    jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[columnToSort]).text(headers[columnToSort] + "  ")
    jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[columnToSort]).append('<img style="position: relative; top: 3px;" src="http://icons.primail.ch/arrows/down.gif" />')
    jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[columnToSort]).css('padding-bottom', '2px')
    jQuery(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[columnToSort]).css('margin-top', '-2px')
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
function sortPatients() {
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

  var patsToSort = jQuery('div[id^="sPat"][class^="cursorclickable"]', jQuery('div#referral_send'))
  jQuery('div[id^="sPat"][class^="cursorclickable"]', jQuery('div#referral_send')).remove()
  if (columnToSort === 0) {
    $sortedPats = patsToSort.mergeSort(function (left, right) {
      left = getName(left)
      right = getName(right)
      if (left < right) {
        return -1 * sortingDirection;
      } else if (left === right) {
        return 0;
      } else {
        return 1 * sortingDirection;
      }
    })
  } else if (columnToSort === 1) {
    $sortedPats = patsToSort.mergeSort(function (left, right) {
      left = countDiseases(left)
      right = countDiseases(right)
      if (left < right) {
        return -1 * sortingDirection;
      } else if (left === right) {
        return 0;
      } else {
        return 1 * sortingDirection;
      }
    })
  } else if (columnToSort === 2) {
    $sortedPats = patsToSort.mergeSort(function (left, right) {
      left = getReciever(left)
      right = getReciever(right)
      if (left < right) {
        return -1 * sortingDirection;
      } else if (left === right) {
        return 0;
      } else {
        return 1 * sortingDirection;
      }
    })
  } else if (columnToSort === 3) {
    $sortedPats = patsToSort.mergeSort(function (left, right) {
      left = getPoints(left)*1
      right = getPoints(right)*1
      if (left < right) {
        return -1 * sortingDirection;
      } else if (left === right) {
        return 0;
      } else {
        return 1 * sortingDirection;
      }
    })
  } else if (columnToSort === 4) {
    $sortedPats = patsToSort.mergeSort(function (left, right) {
      left = getPrice(left)*1
      right = getPrice(right)*1
      if (left < right) {
        return -1 * sortingDirection;
      } else if (left === right) {
        return 0;
      } else {
        return 1 * sortingDirection;
      }
    })
  } else if (columnToSort === 5) {
    $sortedPats = patsToSort.mergeSort(function (left, right) {
      left = gethTPerTime(left)*1
      right = gethTPerTime(right)*1
      if (left < right) {
        return -1 * sortingDirection;
      } else if (left === right) {
        return 0;
      } else {
        return 1 * sortingDirection;
      }
    })
  } else if (columnToSort === 6) {
    $sortedPats = patsToSort.mergeSort(function (left, right) {
      left = getPointsPerTime(left)*1
      right = getPointsPerTime(right)*1
      if (left < right) {
        return -1 * sortingDirection;
      } else if (left === right) {
        return 0;
      } else {
        return 1 * sortingDirection;
      }
    })
  }
  $sortedPats.insertAfter(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send')).length-1])
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
    numberOfHiddenSendPats++
    return true
  }
  return false
}
function hidePatsGreater(Patient, anzahlKrankheiten) {
  if (countDiseases(Patient) > anzahlKrankheiten) {
    jQuery(Patient).hide()
    numberOfHiddenSendPats++
    return true
  }
  return false
}
function hidePatsExcept(Patient, anzahlKrankheiten) {
  if (countDiseases(Patient) != anzahlKrankheiten) {
    jQuery(Patient).hide()
    numberOfHiddenSendPats++
    return true
  }
  return false
}
function hidePatsNotTo(Patient, reciever) {
  if (getReciever(Patient) != reciever) {
    jQuery(Patient).hide()
    numberOfHiddenSendPats++
    return true
  }
  return false
}
function hidePatsNotForRoom(Patient, room) {
  if (!isInArray(getRooms(Patient), room)) {
    jQuery(Patient).hide()
    numberOfHiddenSendPats++
    return true
  }
  return false
}
function hidePatsNotWithDiseases(Patient, disease) {
  if (!isInArray(getDiseaseNames(Patient), disease)) {
    jQuery(Patient).hide()
    numberOfHiddenSendPats++
    return true
  }
  return false
}
function hidePatsNotMulti(Patient, room) {
  if (room == "alle Räume") {
    if (!getMultiRooms(Patient).length) {
      jQuery(Patient).hide()
      numberOfHiddenSendPats++
      return true
    }
  } else {
    if (!isInArray(getMultiRooms(Patient), room)) {
      jQuery(Patient).hide()
      numberOfHiddenSendPats++
      return true
    }
  }
  return false
}
function hidePatsMulti(Patient) {
  if (getMultiRooms(Patient).length) {
    jQuery(Patient).hide()
    numberOfHiddenSendPats++
    return true
  }
  return false
}
function checkIfPatNeedsToBeHidden(patient) {
  //to ensure that all are visible
  jQuery(patient).show()
  //Patients Filter
  if (actualSendPatientsIndex == 1) {
    if (hidePats(patient, 1)) {
      return false
    }
  } else if (actualSendPatientsIndex == 2) {
    if (hidePatsGreater(patient, 1)) {
      return false
    }
  } else if (actualSendPatientsIndex == 3) {
    if (hidePatsMulti(patient)) {
      return false
    }
  } else if (actualSendPatientsIndex == 4) {
    if (hidePatsNotMulti(patient, actualSendRoomsName)) {
      return false
    }
  }
  //Dieseases Filter
  if (actualSendNumberOfDiseases != "# Krankheiten") {
    if (hidePatsExcept(patient, actualSendNumberOfDiseases)) {
      return false
    }
  }
  //Recievers Filter
  if (actualSendRecieverName != "alle Empfänger") {
    if (hidePatsNotTo(patient, actualSendRecieverName)) {
      return false
    }
  }
  //Rooms Filter
  if (actualSendRoomsName != "alle Räume") {
    if (hidePatsNotForRoom(patient, actualSendRoomsName)) {
      return false
    }
  }
  //Disease Filter
  if (actualSendDiseaseName != "alle Krankheiten") {
    if (hidePatsNotWithDiseases(patient, actualSendDiseaseName)) {
      return false
    }
  }
  return true
}
function checkIfPatNeedsToBeHiddenByTinyGeneral(patient) {
  //to ensure that all are visible
  jQuery(patient).show()
  //Patients Filter
  if (actualSendPatientsIndex == 1) {
    if (hidePats(patient, 1)) {
      return false
    }
  } else if (actualSendPatientsIndex == 2) {
    if (hidePatsGreater(patient, 1)) {
      return false
    }
  } else if (actualSendPatientsIndex == 3) {
    if (hidePatsMulti(patient)) {
      return false
    }
  } else if (actualSendPatientsIndex == 4) {
    if (hidePatsNotMulti(patient, actualSendRoomsName)) {
      return false
    }
  }
  //Dieseases Filter
  if (actualSendNumberOfDiseases != "# Krankheiten") {
    if (hidePatsExcept(patient, actualSendNumberOfDiseases)) {
      return false
    }
  }
  //Recievers Filter
  if (actualSendRecieverName != "alle Empfänger") {
    if (hidePatsNotTo(patient, actualSendRecieverName)) {
      return false
    }
  }
  return true
}
function checkIfPatNeedsToBeHiddenByTinySpecial(patient) {
  //to ensure that all are visible
  if (jQuery(patient).is(':visible')) {
    //Rooms Filter
    if (actualSendRoomsName != "alle Räume") {
      if (hidePatsNotForRoom(patient, actualSendRoomsName)) {
        return false
      }
    }
    //Disease Filter
    if (actualSendDiseaseName != "alle Krankheiten") {
      if (hidePatsNotWithDiseases(patient, actualSendDiseaseName)) {
        return false
      }
    }
    return true
  } else {
    return false
  }
}
function checkAllSendPatients() {
  analyseSendPatients()
  updateTotalPrice()
  updateNumberOfSendPats()
  updateNumberOfSendDiseases()
  if (debug) {
    updateAnalyseTime()
  }
  if (tiny) {
    jQuery(jQuery('div#send_options')).remove()
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
  pointsForPiper = Math.floor((getBasePointsForPatient(patientId, medsUsed)+BonusForMultiDiseases(patientDiseasesStorage["p"+patientId].length))*((level-1)*levelBonus+1))
  pointsWithWWBonus = pointsForPiper
  
  if (wwLevel == 10) {
    pointsWithWWBonus = pointsForPiper * 1.05 * 1.05 * 1.1
  } else if (wwLevel >= 6) {
    pointsWithWWBonus = pointsForPiper * 1.05 * 1.05
  } else if (wwLevel >= 1) {
    pointsWithWWBonus = pointsForPiper * 1.05
  }
  officePoints = Math.floor(pointsWithWWBonus)
  return officePoints
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
  totalPoints = getPointsForPatient(patientId, level, medsUsed)
  return totalPoints / restTreatmentTimeMin
}
function analyseSendPatients() {
  //add number of Send Patients
  startTime = new Date().getTime()
  numberOfSendPats = 0
  numberOfHiddenSendPats = 0
  totalSendPrice = 0
  countedDiseases = new Array()
  sendDiseases = new Array()
  sendReciever = new Array()
  sendRooms = new Array()
  sendDiseasesNames = new Array()
  tinyCountedDiseases = new Array()
  tinyCountedRooms = new Array()
  patientIDsInReferral = new Array()
  levelString = jQuery('#level').text()
  level = levelString.substr(levelString.indexOf('(')+2, (levelString.lastIndexOf(' ')-(levelString.indexOf('(')+2)))*1
  jQuery('div[id^="sPat"][class^="cursorclickable"]', jQuery('div#referral_send')).each(function() {
    patientId = getPatientId(this)

    //counting
    numberOfSendPats++

    //adding the ID to Array
    patientIDsInReferral.push("p"+patientId)

    //add Points
    if (jQuery('[class=ref_spatline]', this).length == 5) {
      jQuery(jQuery('[class=ref_spatline]', this)[2]).hide()
      jQuery('<div class="ref_spatline" style="width:62px;">' + getPointsForPatient(patientId, level, true) + '</div>').insertAfter(jQuery('[class=ref_spatline]', this)[2])
    }
    //add hT/Min
    var options = {
      symbol: "hT",
      decimal : ",",
      thousand: ".",
      precision : 2,
      format: "%v %s"
    };
    if (jQuery('[class=ref_spatline]', this).length == 6) {
      jQuery('<div class="ref_spatline" style="width:69px;">' + accounting.formatMoney(gethTPerTime(this), options) + '</div>').insertAfter(jQuery('[class=ref_spatline]', this)[4])
    }
    //add points/Min
    var options = {
      decimal : ",",
      thousand: ".",
      precision : 2,
      format: "%v"
    };
    if (jQuery('[class=ref_spatline]', this).length == 7) {
      jQuery('<div class="ref_spatline" style="width:69px;">' + accounting.formatMoney(getPointsPerTime(this, patientId, level, true), options) + '</div>').insertAfter(jQuery('[class=ref_spatline]', this)[5])
    }
    //depending on Config hide ht/Min or p/min
    if (points) {
      jQuery(jQuery('[class=ref_spatline]', this)[5]).hide()
    } else {
      jQuery(jQuery('[class=ref_spatline]', this)[6]).hide()
    }
    
    //changeColums Width
    jQuery(jQuery('[class=ref_spatline]', this)[1]).attr('style', 'width:96px;')
    jQuery(jQuery('[class=ref_spatline]', this)[4]).attr('style', 'width:79px;')

    //Options
    numberOfDiseases = countDiseases(this)
    if (!isInArray(sendDiseases, numberOfDiseases)) {
      sendDiseases.push(numberOfDiseases)
    }
    reciever = getReciever(this)
    if (!isInArray(sendReciever, reciever)) {
      sendReciever.push(reciever)
    }
    rooms = getRooms(this)
    for (var i = 0; i < rooms.length; i++) {
      if (!isInArray(sendRooms, rooms[i])) {
        sendRooms.push(rooms[i])
      }
    }
    diseasesNames = getDiseaseNames(this)
    for (var i = 0; i < diseasesNames.length; i++) {
      if (!isInArray(sendDiseasesNames, diseasesNames[i])) {
        sendDiseasesNames.push(diseasesNames[i])
      }
    }
    
    if (tiny) {
      if (checkIfPatNeedsToBeHiddenByTinyGeneral(this)) {
        //totalDiseasesCounting
        countedDiseasesPatient = new Array()
        countedRoomsPatient = new Array()
        for (var i = 0; i < countDiseases(this); i++) {
          if (!countedRoomsPatient[Global.availableDiseases[getDiseaseID(getDiseases(this)[i])].room[0]]) {
            countedRoomsPatient[Global.availableDiseases[getDiseaseID(getDiseases(this)[i])].room[0]] = 1
          }
          
          if (!countedDiseasesPatient[getDiseaseID(getDiseases(this)[i])]) {
            countedDiseasesPatient[getDiseaseID(getDiseases(this)[i])] = 1
          } else {
            countedDiseasesPatient[getDiseaseID(getDiseases(this)[i])]++
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
    if (tiny) {
      isPatientNotHidden = checkIfPatNeedsToBeHiddenByTinySpecial(this)
    } else {
      isPatientNotHidden = checkIfPatNeedsToBeHidden(this)
    }
    if (isPatientNotHidden) {
      //price
      totalSendPrice += getPrice(this)*1
      //diseases
      for (var i = 0; i < countDiseases(this); i++) {
        if (!countedDiseases[getDiseaseID(getDiseases(this)[i])]) {
          countedDiseases[getDiseaseID(getDiseases(this)[i])] = 1
        } else {
          countedDiseases[getDiseaseID(getDiseases(this)[i])]++
        }
      }
    }
  })
  //sort sendOptions
  sendDiseases.sort(function(a,b){return a - b})
  sendReciever.sort()
  sendRooms.sort()
  sendDiseasesNames.sort()

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
  endTime = new Date().getTime()
  savePatientDiseasesStorage()
}
//End Manager
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
addAccounting(readyAccounting)
//End Script