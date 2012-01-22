// ==UserScript==
// @name          KHAdvancement
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
  //insert MainFunction
  jQuery('div#newswindow').attr('onMouseOver', 'recogniseWindow()')
  //window.setInterval("recogniseWindow()", 200)

  storedAssignmentTarget = getCookie("KHAssignmentTarget" + jQuery('#username').text())
  if (storedAssignmentTarget != null) {
    assignmentTarget = storedAssignmentTarget
  } else {
    assignmentTarget = "Bitte Arzt aus dem Addressbuch bestimmen!"
  }
  //End MainFunction
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

var variablen = new Array()
variablen[0]  = "assignmentTarget"
variablen[1]  = "minPrice = 0"
variablen[2]  = "maxPrice = 0"
variablen[3]  = "send_head = \"Von dir überwiesene Patienten\""
variablen[4]  = "$allAddresses"
variablen[5]  = "$allPats"
variablen[6]  = "actualNumberOfPats = 0"
variablen[7]  = "actualNumberOfHiddenPats = 0"
variablen[8]  = "referralVisible = false"
variablen[9]  = "actualPatientsIndex = 0"
variablen[10] = "actualNumberOfDiseases = \"# Krankheiten\""
variablen[11] = "actualRecieverName = \"alle Empfänger\""
variablen[12] = "actualRoomsName = \"alle Räume\""
variablen[13] = "referralVisible = false"
variablen[14] = "sendDiseases"
variablen[15] = "sendReciever"
variablen[16] = "sendRooms"
variablen[17] = "patStored"
variablen[18] = "columnToSort"
variablen[19] = "sortingDirection"
variablen[20] = "headers = new Array(\"Patientenname\", \"Krankheiten\", \"Empfänger\", \"Kosten\")"
variablen[21] = "$sortedPats"

function addFunctions() {
  var functionsToAdd = new Array(recogniseWindow, enterAssignmentValues, getPrices, formatPrices, isNameSelected, changeActiveAssignmentIcon, changeAssignmentTarget, addAssignmentIcon, storePats, countDiseases, showNumberOfPats, hidePats, hidePatsGreater, hidePatsExcept, hidePatsNotTo, hidePatsNotForRoom, hidePatsNotMulti, hidePatsMulti, showAllPats, changePatientView, hidePatients, removeAllFilter, isInArray, findInArray, getName, getReciever, getRooms, getMultiRooms, getRoomForDisease, populateSendOptions, getDiseasesOptions, getRecieverOptions, getRoomOptions, storePats, getSelectOptionsArray, addSendOptions, getPrice, summPrices, changePrice, setCookie, getCookie, changeSorting, setSortingIcons, sortPatients)
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

//Beginn Main Function
function recogniseWindow() {
  if (jQuery('input#ref_recipient').length) {
    var idString = jQuery('div#ref_magichand')[0].getAttribute('onclick')
    var id = idString.substring(idString.indexOf("(")+1, idString.indexOf(")"))
    jQuery('div#ref_magichand')[0].setAttribute('onclick', 'storePats(' + id + ')')
    enterAssignmentValues(true)
  } else if (jQuery('input#ref_demand').length) {
    enterAssignmentValues(false)
  } else if (jQuery('div#referrals').length) {
    if (patStored) {
      patStored = false
      close_page()
    } else if ($allPats != jQuery('div[id^="sPat"][class^="cursorclickable"]')) {
      $allPats = jQuery('div[id^="sPat"][class^="cursorclickable"]')
      populateSendOptions()
      addSendOptions()
      hidePatients()
      $sortedPats = $allPats
      sortPatients()
    }
  }
  if (jQuery('div#addressbook').length) {
    if ($allAddresses != jQuery('a[class=cursorclickable]', jQuery('div#addressbook'))) {
      $allAddresses = jQuery('a[class=cursorclickable]', jQuery('div#addressbook'))
      addAssignmentIcon()
    }
  }
}
//End Main Function

//Begin Assignment
function enterAssignmentValues(useMaxPrice) {
  getPrices(jQuery('span[style="color:red;font-weight:bold;font-size:large;"]').text())
  if (jQuery('input#ref_demand').val() == "") {
    if (jQuery('input#ref_recipient').length) {
      jQuery('input#ref_recipient').val(assignmentTarget)
    }
    if (useMaxPrice) {
      jQuery('input#ref_demand').val(maxPrice)
    } else {
      jQuery('input#ref_demand').val(minPrice)
    }
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
//End Assignment

//Begin Referral
function countDiseases(object) {
  return jQuery('div[class^=d_a_15]', object).length
}
function showNumberOfPats(reset) {
  if (reset) {
    actualNumberOfPats = $allPats.length
    actualNumberOfHiddenPats = 0
  } else {
    actualNumberOfPats = $allPats.length - actualNumberOfHiddenPats
  }
  jQuery('div#referral_send_head').text(send_head + ": " + actualNumberOfPats)
}
function hidePats(Patient, anzahlKrankheiten) {
  if (countDiseases(Patient) === anzahlKrankheiten) {
    jQuery(Patient).hide()
    actualNumberOfHiddenPats++
    return true
  }
  return false
}
function hidePatsGreater(Patient, anzahlKrankheiten) {
  if (countDiseases(Patient) > anzahlKrankheiten) {
    jQuery(Patient).hide()
    actualNumberOfHiddenPats++
    return true
  }
  return false
}
function hidePatsExcept(Patient, anzahlKrankheiten) {
  if (countDiseases(Patient) != anzahlKrankheiten) {
    jQuery(Patient).hide()
    actualNumberOfHiddenPats++
    return true
  }
  return false
}
function hidePatsNotTo(Patient, reciever) {
  if (getReciever(Patient) != reciever) {
    jQuery(Patient).hide()
    actualNumberOfHiddenPats++
    return true
  }
  return false
}
function hidePatsNotForRoom(Patient, room) {
  if (!isInArray(getRooms(Patient), room)) {
    jQuery(Patient).hide()
    actualNumberOfHiddenPats++
    return true
  }
  return false
}
function hidePatsNotMulti(Patient, room) {
  if (room == "alle Räume") {
    if (!getMultiRooms(Patient).length) {
      jQuery(Patient).hide()
      actualNumberOfHiddenPats++
      return true
    }
  } else {
    if (!isInArray(getMultiRooms(Patient), room)) {
      jQuery(Patient).hide()
      actualNumberOfHiddenPats++
      return true
    }
  }
  return false
}
function hidePatsMulti(Patient) {
  if (getMultiRooms(Patient).length) {
    jQuery(Patient).hide()
    actualNumberOfHiddenPats++
    return true
  }
  return false
}
function showAllPats() {
  $allPats.each(function() {
    jQuery(this).show()
  })
  showNumberOfPats(true)
}
function changePatientView() {
  var actualIndex = 0
  actualPatientsIndex = document.getElementById("toggle_patients").selectedIndex
  actualIndex = document.getElementById("toggle_diseases").selectedIndex
  actualNumberOfDiseases = document.getElementById("toggle_diseases")[actualIndex].value
  actualIndex = document.getElementById("toggle_recievers").selectedIndex
  actualRecieverName = document.getElementById("toggle_recievers")[actualIndex].value
  actualIndex = document.getElementById("toggle_rooms").selectedIndex
  actualRoomsName = document.getElementById("toggle_rooms")[actualIndex].value
  hidePatients()
  populateSendOptions()
}
function hidePatients() {
  showNumberOfPats(true)
  var totalPrice = 0
  $allPats.each(function() {
    //to ensure that all are visible
    jQuery(this).show()
    //Patients Filter
    if (actualPatientsIndex == 1) {
      if (hidePats(this, 1))
        return
    } else if (actualPatientsIndex == 2) {
      if (hidePatsGreater(this, 1))
        return
    } else if (actualPatientsIndex == 3) {
      if (hidePatsMulti(this))
        return
    } else if (actualPatientsIndex == 4) {
      if (hidePatsNotMulti(this, actualRoomsName))
        return
    }
    //Dieseases Filter
    if (actualNumberOfDiseases != "# Krankheiten") {
      if (hidePatsExcept(this, actualNumberOfDiseases))
        return
    }
    //Recievers Filter
    if (actualRecieverName != "alle Empfänger") {
      if (hidePatsNotTo(this, actualRecieverName))
        return
    }
    //Rooms Filter
    if (actualRoomsName != "alle Räume") {
      if (hidePatsNotForRoom(this, actualRoomsName))
        return
    }
    totalPrice += getPrice(this)*1
  })

  var options = {
	symbol : "hT",
	decimal : ",",
	thousand: ".",
	precision : 2,
	format: "%v %s"
  };
  changePrice(accounting.formatMoney(totalPrice, options))
  showNumberOfPats(false)
}
function removeAllFilter() {
  document.getElementById("toggle_patients").selectedIndex = 0
  actualPatientsIndex = 0
  document.getElementById("toggle_diseases").selectedIndex = 0
  actualNumberOfDiseases = "# Krankheiten"
  document.getElementById("toggle_recievers").selectedIndex = 0
  actualRecieverName = "alle Empfänger"
  document.getElementById('toggle_rooms').selectedIndex = 0
  actualRoomsName = "alle Räume"
  hidePatients()
}
function findInArray(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i
    }
  }
  return -1
}
function isInArray(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return true
    }
  }
  return false
}
function getName(object) {
  return jQuery('div[class^="ref_spatline"]', object)[0].innerHTML
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
function populateSendOptions() {
  sendDiseases = new Array()
  sendReciever = new Array()
  sendRooms = new Array()
  $allPats.each(function() {
    if (jQuery(this).is(":visible")) {
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
    }
  })
  if (jQuery("#toggle_diseases").length) {
    jQuery("#toggle_diseases").html("<option># Krankheiten</option>" + getDiseasesOptions());
  }
  if (jQuery("#toggle_recievers").length) {
    jQuery("#toggle_recievers").html("<option>alle Empfänger</option>" + getRecieverOptions());
  }
  if (jQuery("#toggle_rooms").length) {
    jQuery("#toggle_rooms").html("<option>alle Räume</option>" + getRoomOptions());
  }
}
function getDiseasesOptions() {
  var diseasesOptions = ""
  sendDiseases.sort(function(a,b){return b - 1})
  for (var i = 0; i < sendDiseases.length; i++) {
    diseasesOptions += "<option>" + sendDiseases[i] + "</option>"
  }
  return diseasesOptions
}
function getRecieverOptions() {
  var recieverOptions = ""
  sendReciever.sort()
  for (var i = 0; i < sendReciever.length; i++) {
    recieverOptions += "<option>" + sendReciever[i] + "</option>"
  }
  return recieverOptions
}
function getRoomOptions() {
  var roomOptions = ""
  sendRooms.sort()
  for (var i = 0; i < sendRooms.length; i++) {
    roomOptions += "<option>" + sendRooms[i] + "</option>"
  }
  return roomOptions
}
function getSelectOptionsArray(object) {
  var selectOptionArray = new Array()
  for (var i = 0; i < object.length; i++) {
    selectOptionArray.push(object.options[i].text)
  }
  return selectOptionArray
}
function addSendOptions() {
  if (jQuery('div#send_options').length === 0) {
    jQuery('<div id=\"send_options\" style=\"margin-bottom:7px;\"><select id=\"toggle_patients\" onChange=\"changePatientView()\" style=\"width:149px\"><option>alle Patienten</option><option>keine Simulanten</option><option>nur Simulanten</option><option>keine MultiPats</option><option>nur MultiPats</option></select><select id=\"toggle_diseases\" onChange=\"changePatientView()\" style=\"margin-left:3px;width:111px\"><option># Krankheiten</option>' + getDiseasesOptions() + '</select><select id=\"toggle_recievers\" onChange=\"changePatientView()\" style=\"margin-left:3px;width:107px;\"><option>alle Empfänger</option>' + getRecieverOptions() + '</select><select id=\"toggle_rooms\" onChange=\"changePatientView()\"><option>alle Räume</option>' + getRoomOptions() + '</select><div style=\"float:right; margin-right: 10px; margin-top:4px; width: 15px; background-repeat:none; background-image:url(http://pics.kapihospital.de/referral_icons_15.jpg); background-position: -75px 0px;\" onclick=\"removeAllFilter()\">&nbsp;</div></div>').insertAfter('div#referral_send_head')
  }
  if (jQuery('div#total_price').length === 0) {
    jQuery('<div id=\"total_price\" style="position: absolute; top: 430px; left: 370px;">Summe: ' + summPrices() + '</div>').insertAfter('div#referrals')
  }
  if (jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send')).length === 5) {
    jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[0].setAttribute('onclick', 'changeSorting(0)')
    jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[1].setAttribute('onclick', 'changeSorting(1)')
    jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[2].setAttribute('onclick', 'changeSorting(2)')
    jQuery('div.ref_spatline.ref_spatlineheader', jQuery('#referral_send'))[3].setAttribute('onclick', 'changeSorting(3)')
  }
  document.getElementById("toggle_patients").selectedIndex = actualPatientsIndex
  index = findInArray(getSelectOptionsArray(document.getElementById("toggle_diseases")), actualNumberOfDiseases)
  if (index != -1) {
    document.getElementById("toggle_diseases").selectedIndex = index
  } else {
    document.getElementById("toggle_diseases").selectedIndex = 0
  }
  index = findInArray(getSelectOptionsArray(document.getElementById("toggle_recievers")), actualRecieverName)
  if (index != -1) {
    document.getElementById("toggle_recievers").selectedIndex = index
  } else {
    document.getElementById("toggle_recievers").selectedIndex = 0
  }
  index = findInArray(getSelectOptionsArray(document.getElementById("toggle_rooms")), actualRoomsName)
  if (index != -1) {
    document.getElementById("toggle_rooms").selectedIndex = index
  } else {
    document.getElementById("toggle_rooms").selectedIndex = 0
  }
  setSortingIcons()
}
function getPrice(object) {
  var priceToParse = jQuery(jQuery('.ref_spatline', object)[3]).text()
  return formatPrices(priceToParse.substr(0, priceToParse.indexOf(' '))).replace(",",".")
}
function summPrices() {
  totalPrice = 0
  $allPats.each(function() {
    if (jQuery(this).is(":visible")) {
      var numPrice = getPrice(this)*1
      totalPrice += numPrice
    }
  })
  var options = {
	symbol : "hT",
	decimal : ",",
	thousand: ".",
	precision : 2,
	format: "%v %s"
  };
  return accounting.formatMoney(totalPrice, options)
}
function changePrice(price) {
  jQuery('div#total_price').text("Summe: " + price)
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
function sortPatients() {
  jQuery('div[id^="sPat"][class^="cursorclickable"]').remove()
  if (columnToSort === 0) {
    $sortedPats = $allPats.mergeSort(function (left, right) {
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
    $sortedPats = $allPats.mergeSort(function (left, right) {
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
    $sortedPats = $allPats.mergeSort(function (left, right) {
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
    $sortedPats = $allPats.mergeSort(function (left, right) {
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
//End Referral

//Begin Generall
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
//End Generall

//Begin Script
addJQuery(readyJQuery)
addAccounting(readyAccounting)
addFunctions()