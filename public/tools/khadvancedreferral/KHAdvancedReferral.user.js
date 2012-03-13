// ==UserScript==
// @name          KHAdvancedReferral
// @version       0.5b
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

  initKHManager()
  //Interval Function
  window.setInterval("recogniseKHManagerWindow()", 100)
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
variablen.push("send_head = \"Von dir überwiesene Patienten\"")
variablen.push("numberOfSendPats = 0")
variablen.push("numberOfHiddenSendPats = 0")
variablen.push("totalSendPrice = 0")
variablen.push("totalRecievePrice = 0")
variablen.push("headers = new Array(\"Patientenname\", \"Krankheiten\", \"Empfänger\", \"Kosten\")")
variablen.push("columnToSort = -1")
variablen.push("sortingDirection = 0")
variablen.push("countedDiseases = new Array()")
variablen.push("totalDiseasesCount = 0")
variablen.push("diseaseDurations = new Array()")
variablen.push("totalDiseasesDuration = 0")
variablen.push("sendDiseases")
variablen.push("sendReciever")
variablen.push("sendRooms")
variablen.push("actualSendPatientsIndex = 0")
variablen.push("actualSendNumberOfDiseases = \"# Krankheiten\"")
variablen.push("actualSendRecieverName = \"alle Empfänger\"")
variablen.push("actualSendRoomsName = \"alle Räume\"")
variablen.push("startTime = 0")
variablen.push("endTime = 0")
variablen.push("debug = true")
variablen.push("tiny = false")

function addFunctions() {
  var functionsToAdd = new Array(initKHManager, recogniseKHManagerWindow, progressKHManagerWindow, addTinyOptions, addClassicOptions, updateAnalyseTime, updateNumberOfSendDiseases, getMultiRooms, hidePats, hidePatsGreater, hidePatsExcept, hidePatsNotTo, hidePatsNotForRoom, hidePatsNotMulti, hidePatsMulti, checkIfPatNeedsToBeHidden, checkAllSendPatients, updateTotalPrice, updateNumberOfSendPats, removeSendFilter, getSelectOptionsArray, findInArray, getOptionsString, getRoomForDisease, getLongTimeString, getDiseasesDuration, getDiseases, getDiseaseID, isInArray, countDiseases, getReciever, getRooms, getName, getPrice, changeSorting, sortPatients, setSortingIcons, changeSendPatientView, analyseSendPatients)
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
function initKHManager() {
  diseaseDurations = new Array()
  diseaseDurations[1] = 4800
  diseaseDurations[2] = 9600
  diseaseDurations[3] = 600
  diseaseDurations[4] = 600
  diseaseDurations[5] = 9600
  diseaseDurations[6] = 1800
  diseaseDurations[7] = 14400
  diseaseDurations[8] = 9600
  diseaseDurations[9] = 8400
  diseaseDurations[10] = 5400
  diseaseDurations[11] = 7200
  diseaseDurations[12] = 9600
  diseaseDurations[13] = 18000
  diseaseDurations[14] = 21600
  diseaseDurations[15] = 57600
  diseaseDurations[16] = 18600
  diseaseDurations[17] = 15600
  diseaseDurations[18] = 5400
  diseaseDurations[19] = 14400
  diseaseDurations[20] = 25200
  diseaseDurations[21] = 12000
  diseaseDurations[22] = 18000
  diseaseDurations[23] = 5400
  diseaseDurations[24] = 36000
  diseaseDurations[26] = 7200
  diseaseDurations[27] = 28800
  diseaseDurations[28] = 13200
  diseaseDurations[29] = 18000
  diseaseDurations[30] = 8400
  diseaseDurations[31] = 7500
  diseaseDurations[32] = 43200
  diseaseDurations[33] = 5400
  diseaseDurations[34] = 10800
  diseaseDurations[35] = 1800
  diseaseDurations[36] = 6000
  diseaseDurations[37] = 3600
  diseaseDurations[38] = 50400
  diseaseDurations[39] = 10800
  diseaseDurations[40] = 16200
  diseaseDurations[41] = 57600
  diseaseDurations[42] = 12600
  diseaseDurations[43] = 25200
  diseaseDurations[44] = 6300
  diseaseDurations[45] = 6000
  diseaseDurations[46] = 5400
  diseaseDurations[47] = 14400
  diseaseDurations[48] = 9000
  diseaseDurations[49] = 9000
  diseaseDurations[50] = 21600
  diseaseDurations[51] = 13200
  diseaseDurations[52] = 64800
  diseaseDurations[53] = 14400
  diseaseDurations[54] = 43200
  diseaseDurations[55] = 28800
  diseaseDurations[56] = 18600
  diseaseDurations[57] = 14400
  diseaseDurations[58] = 43200
  diseaseDurations[59] = 18000
  diseaseDurations[60] = 43200
  diseaseDurations[61] = 12600
  diseaseDurations[62] = 21600
  diseaseDurations[63] = 14400
  diseaseDurations[64] = 21600
  diseaseDurations[65] = 28800
  diseaseDurations[66] = 9000
  diseaseDurations[67] = 10800
  diseaseDurations[68] = 21600
  diseaseDurations[69] = 86400
  diseaseDurations[70] = 12600
  diseaseDurations[71] = 9000
  diseaseDurations[72] = 23400
  diseaseDurations[73] = 27000
  diseaseDurations[74] = 18000
  diseaseDurations[75] = 28800
  diseaseDurations[76] = 14400
  diseaseDurations[77] = 17100
  diseaseDurations[78] = 10800
  diseaseDurations[79] = 8400
  diseaseDurations[80] = 14400
  diseaseDurations[81] = 17100
  diseaseDurations[82] = 14400
  diseaseDurations[83] = 13500
  diseaseDurations[84] = 7200
  diseaseDurations[85] = 10800
  diseaseDurations[86] = 12600
  diseaseDurations[87] = 7200
  diseaseDurations[88] = 14400
  diseaseDurations[89] = 13500
  diseaseDurations[90] = 28800
  diseaseDurations[91] = 21600
  diseaseDurations[92] = 26400
  diseaseDurations[93] = 18000
  diseaseDurations[94] = 17100
  diseaseDurations[95] = 43200
  diseaseDurations[96] = 7200
  diseaseDurations[97] = 14400
  diseaseDurations[98] = 12900
  diseaseDurations[99] = 12000
  diseaseDurations[100] = 12000
  diseaseDurations[101] = 43200
  diseaseDurations[102] = 14400
  diseaseDurations[103] = 14400
  diseaseDurations[104] = 14400
  diseaseDurations[105] = 28800
  diseaseDurations[106] = 18000
  diseaseDurations[107] = 10200
  diseaseDurations[108] = 7200
  diseaseDurations[109] = 28800
  diseaseDurations[110] = 18000
  diseaseDurations[111] = 15720
  diseaseDurations[112] = 7200
  diseaseDurations[113] = 10800
  diseaseDurations[114] = 28800
}
function recogniseKHManagerWindow() {
  if (jQuery('div#referrals').is(':visible')) {
    progressKHManagerWindow()
  }
}
function getLongTimeString(time) {
  years = Math.floor(time / 31622400)
  rest = time%31622400
  months = Math.floor(rest / 2635300)
  rest = rest%2635200
  days = Math.floor(rest / 86400)
  rest = rest%86400
  hour = Math.floor(rest / 3600)
  rest = rest%3600
  min = Math.floor(rest/ 60)
  sek = rest%60
  timeString = ""
  if (years > 0) {
    if (years > 1) {
      timeString += years + " Jahre "
    } else {
      timeString += "1 Jahr "
    }
  }
  if (months > 0) {
    if (months > 1) {
      timeString += months + " Monate "
    } else {
      timeString += "1 Monat "
    }
  }
  if (days > 0) {
    if (days > 1) {
      timeString += days + " Tage "
    } else {
      timeString += "1 Tag "
    }
  }
  if (hour > 0) {
    if (hour > 1) {
      timeString += hour + " Stunden "
    } else {
      timeString += "1 Stunde"
    }
  }
  if (min > 0) {
    if (min > 1) {
      timeString += min + " Minuten "
    } else {
      timeString += "1 Minute"
    }
  }
  if (sek > 0) {
    if (sek > 1) {
      timeString += sek + " Sekunden "
    } else {
      timeString += "1 Sekunde"
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
  checkAllSendPatients()
}
function progressKHManagerWindow() {
  //Wenn nothing to recieve hide
  if (jQuery('div#referral_reci').is(':visible') && !jQuery('div[id^="rPat"][class^="cursorclickable"]', jQuery('div#referral_reci')).length) {
    jQuery('div#referral_reci').hide()
    jQuery('br', jQuery('div#referrals')).hide()
  }

  if (jQuery('div#send_options').length === 0) {
    analyseSendPatients()

    //addNumberOfSendPatients
    updateNumberOfSendPats()
      
    //addNumberOfDiseases
    updateNumberOfSendDiseases()
    
    //addTotalPrice
    updateTotalPrice()
    
    //add Sorting
    if (jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send')).length === 5) {
      jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[0].setAttribute('onclick', 'changeSorting(0)')
      jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[1].setAttribute('onclick', 'changeSorting(1)')
      jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[2].setAttribute('onclick', 'changeSorting(2)')
      jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[3].setAttribute('onclick', 'changeSorting(3)')
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
function addTinyOptions() {
  if (jQuery('div#send_options').length === 0) {
    jQuery('<div id=\"send_options\" style=\"margin-bottom:7px;\"></div>').insertAfter('div#referral_send_head')
  }
}
function addClassicOptions() {
  //add Options
  if (jQuery('div#send_options').length === 0) {
    jQuery('<div id=\"send_options\" style=\"margin-bottom:7px;\"><select id=\"toggle_patients\" onChange=\"changeSendPatientView()\" style=\"width:149px\"><option>alle Patienten</option><option>keine Simulanten</option><option>nur Simulanten</option><option>keine MultiPats</option><option>nur MultiPats</option></select><select id=\"toggle_diseases\" onChange=\"changeSendPatientView()\" style=\"margin-left:3px;width:111px\"><option># Krankheiten</option>' + getOptionsString(sendDiseases) + '</select><select id=\"toggle_recievers\" onChange=\"changeSendPatientView()\" style=\"margin-left:3px;width:107px;\"><option>alle Empfänger</option>' + getOptionsString(sendReciever) + '</select><select id=\"toggle_rooms\" onChange=\"changeSendPatientView()\"><option>alle Räume</option>' + getOptionsString(sendRooms) + '</select><div style=\"float:right; margin-right: 10px; margin-top:4px; width: 15px; background-repeat:none; background-image:url(http://pics.kapihospital.de/referral_icons_15.jpg); background-position: -75px 0px;\" onclick=\"removeSendFilter()\">&nbsp;</div></div>').insertAfter('div#referral_send_head')
  }
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
    jQuery('<div id=\"total_diseasecount\" style="position: absolute; top: 430px; left: 188px;">' + totalDiseasesCount + ' : ' + diseaseCountString + '<br />Behandlungszeit: ' + getLongTimeString(totalDiseasesDuration) + '</div>').insertAfter('div#referrals')
  } else {
    jQuery('div#total_diseasecount').html(totalDiseasesCount + " : " + diseaseCountString + "<br />Behandlungszeit: " + getLongTimeString(totalDiseasesDuration))
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
function changeSendPatientView() {
  var actualIndex = 0
  actualSendPatientsIndex = document.getElementById("toggle_patients").selectedIndex
  actualIndex = document.getElementById("toggle_diseases").selectedIndex
  actualSendNumberOfDiseases = document.getElementById("toggle_diseases")[actualIndex].value
  actualIndex = document.getElementById("toggle_recievers").selectedIndex
  actualSendRecieverName = document.getElementById("toggle_recievers")[actualIndex].value
  actualIndex = document.getElementById("toggle_rooms").selectedIndex
  actualSendRoomsName = document.getElementById("toggle_rooms")[actualIndex].value
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
  for (var i = 0; i < 4; i++) {
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
  }
  $sortedPats.insertAfter(jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[4])
}
function getPrice(object) {
  var priceToParse = jQuery(jQuery('.ref_spatline', object)[3]).text()
  return formatPrices(priceToParse.substr(0, priceToParse.indexOf(' '))).replace(",",".")
}
function getDiseasesDuration(id) {
  return diseaseDurations[id]
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
  return true
}
function checkAllSendPatients() {
  analyseSendPatients()
  updateTotalPrice()
  updateNumberOfSendPats()
  updateNumberOfSendDiseases()
  if (debug) {
    updateAnalyseTime()
  }
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
  jQuery('div[id^="sPat"][class^="cursorclickable"]', jQuery('div#referral_send')).each(function() {
    //counting
    numberOfSendPats++

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

    //restoreFilter
    if (checkIfPatNeedsToBeHidden(this)) {
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
}
//End Manager
//Begin Script
addFunctions()
addJQuery(readyJQuery)
addAccounting(readyAccounting)
//End Script