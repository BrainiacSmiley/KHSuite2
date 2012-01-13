// ==UserScript==
// @name          KHAdvancement
// @version       0.6
// @include       http://*kapihospital.com/*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function readyJQuery() {
  jQuery.noConflict();
  //insert MainFunction
  jQuery('div#newswindow').attr('onMouseOver', 'recogniseWindow()')
  storedAssignmentTarget = getCookie("KHAssignmentTarget" + jQuery('#username').text())
  if (storedAssignmentTarget != null) {
    assignmentTarget = storedAssignmentTarget
  } else {
    assignmentTarget = "Bitte Arzt aus dem Addressbuch bestimmen!"
  }
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
variablen[0] = "assignmentTarget"
variablen[1]  = "minPrice = 0"
variablen[2]  = "maxPrice = 0"
variablen[3]  = "send_head = \"Von dir überwiesene Patienten\""
variablen[4] = "$allAddresses"
variablen[5]  = "$allPats"
variablen[6]  = "actualNumberOfPats = 0"
variablen[7]  = "actualNumberOfHiddenPats = 0"
variablen[8]  = "referralVisible = false"
variablen[9]  = "actualPatientsIndex = 0"
variablen[10]  = "actualNumberOfDiseases = \"# Krankheiten\""
variablen[11] = "actualRecieverName = \"alle Empfänger\""
variablen[12] = "actualRoomsName = \"alle Räume\""
variablen[13] = "referralVisible = false"
variablen[14] = "sendDiseases"
variablen[15] = "sendReciever"
variablen[16] = "sendRooms"
variablen[17] = "patStored"

function addFunctions() {
  var functionsToAdd = new Array(recogniseWindow, enterAssignmentValues, getPrices, formatPrices, isNameSelected, changeActiveAssignmentIcon, changeAssignmentTarget, addAssignmentIcon, storePats, countDiseases, showNumberOfPats, hidePats, hidePatsGreater, hidePatsExcept, hidePatsNotTo, hidePatsNotForRoom, hidePatsNotMulti, hidePatsMulti, showAllPats, changePatientView, hidePatients, removeAllFilter, isInArray, findInArray, getReciever, getRooms, getMultiRooms, getRoomForDisease, populateSendOptions, getDiseasesOptions, getRecieverOptions, getRoomOptions, storePats, getSelectOptionsArray, addSendOptions, getPrice, summPrices, changePrice, setCookie, getCookie)
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
function hidePats(anzahlKrankheiten) {
  $allPats.each(function() {
    if (countDiseases(this) === anzahlKrankheiten && jQuery(this).is(':visible')) {
      jQuery(this).hide()
      actualNumberOfHiddenPats++
    }
  })
}
function hidePatsGreater(anzahlKrankheiten) {
  $allPats.each(function() {
    if (countDiseases(this) > anzahlKrankheiten && jQuery(this).is(':visible')) {
      jQuery(this).hide()
      actualNumberOfHiddenPats++
    }
  })
}
function hidePatsExcept(anzahlKrankheiten) {
  $allPats.each(function() {
    if (countDiseases(this) != anzahlKrankheiten && jQuery(this).is(':visible')) {
      jQuery(this).hide()
      actualNumberOfHiddenPats++
    }
  })
}
function hidePatsNotTo(reciever) {
  $allPats.each(function() {
    if (getReciever(this) != reciever && jQuery(this).is(':visible')) {
      jQuery(this).hide()
      actualNumberOfHiddenPats++
    }
  })
}
function hidePatsNotForRoom(room) {
  $allPats.each(function() {
    if (!isInArray(getRooms(this), room) && jQuery(this).is(':visible')) {
      jQuery(this).hide()
      actualNumberOfHiddenPats++
    }
  })
}
function hidePatsNotMulti(room) {
  $allPats.each(function() {
    if (room == "alle Räume") {
      if (!getMultiRooms(this).length && jQuery(this).is(':visible')) {
        jQuery(this).hide()
        actualNumberOfHiddenPats++
      }
    } else {
      if (!isInArray(getMultiRooms(this), room) && jQuery(this).is(':visible')) {
        jQuery(this).hide()
        actualNumberOfHiddenPats++
      }
    }
  })
}
function hidePatsMulti() {
  $allPats.each(function() {
    if (getMultiRooms(this).length && jQuery(this).is(':visible')) {
      jQuery(this).hide()
      actualNumberOfHiddenPats++
    }
  })
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
  showAllPats()
  //toggle Patients
  if (actualPatientsIndex == 1) {
    hidePats(1)
  } else if (actualPatientsIndex == 2) {
    hidePatsGreater(1)
  } else if (actualPatientsIndex == 3) {
    hidePatsMulti()
  } else if (actualPatientsIndex == 4) {
    hidePatsNotMulti(actualRoomsName)
  }
  //toggle Dieseases
  if (actualNumberOfDiseases != "# Krankheiten") {
    hidePatsExcept(actualNumberOfDiseases)
  }
  //toggle Recievers
  if (actualRecieverName != "alle Empfänger") {
    hidePatsNotTo(actualRecieverName)
  }
  //toggle Rooms
  if (actualRoomsName != "alle Räume") {
    hidePatsNotForRoom(actualRoomsName)
  }
  changePrice(summPrices())
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
function getRoomForDisease(diseaseId) {
  //Behandlungsraum
  var room1Diseases = new Array("d_3_15", "d_4_15", "d_5_15", "d_6_15", "d_10_15", "d_11_15", "d_12_15", "d_909_15")
  if (isInArray(room1Diseases, diseaseId)) {
    return "Behandlungsraum"
  }
  //Röntgenraum
  var room2Diseases = new Array("d_1_15", "d_2_15", "d_18_15", "d_58_15", "d_73_15")
  if (isInArray(room2Diseases, diseaseId)) {
    return "Röntgenraum"
  }
  //Ultraschall
  var room3Diseases = new Array("d_26_15", "d_30_15", "d_44_15", "d_52_15", "d_75_15", "d_94_15", "d_99_15", "d_113_15")
  if (isInArray(room3Diseases, diseaseId)) {
    return "Ultraschall"
  }
  //Orthopädie
  var room4Diseases = new Array("d_48_15", "d_49_15", "d_55_15", "d_60_15", "d_66_15", "d_80_15", "d_103_15", "d_110_15", "d_904_15")
  if (isInArray(room4Diseases, diseaseId)) {
    return "Orthopädie"
  }
  //Psychotherapie
  var room5Diseases = new Array("d_8_15", "d_9_15", "d_27_15", "d_33_15", "d_34_15", "d_50_15", "d_88_15", "d_96_15", "d_108_15", "d_902_15")
  if (isInArray(room5Diseases, diseaseId)) {
    return "Psychotherapie"
  }
  //EKG / EEG
  var room6Diseases = new Array("d_37_15", "d_41_15", "d_46_15", "d_67_15", "d_71_15", "d_79_15", "d_83_15", "d_100_15", "d_907_15")
  if (isInArray(room6Diseases, diseaseId)) {
    return "EKG / EEG"
  }
  //Operationssaal
  var room7Diseases = new Array("d_19_15", "d_39_15", "d_40_15", "d_53_15", "d_65_15", "d_77_15", "d_101_15", "d_107_15")
  if (isInArray(room7Diseases, diseaseId)) {
    return "Operationssaal"
  }
  //Laboratorium
  var room8Diseases = new Array("d_21_15", "d_22_15", "d_38_15", "d_43_15", "d_61_15", "d_74_15", "d_86_15", "d_98_15", "d_105_15", "d_905_15")
  if (isInArray(room8Diseases, diseaseId)) {
    return "Laboratorium"
  }
  //Dunkelkammer
  var room9Diseases = new Array("d_20_15", "d_32_15", "d_36_15", "d_45_15", "d_56_15", "d_76_15", "d_78_15", "d_84_15", "d_90_15", "d_111_15", "d_900_15")
  if (isInArray(room9Diseases, diseaseId)) {
    return "Dunkelkammer"
  }
  //Gummizelle
  var room10Diseases = new Array("d_24_15", "d_31_15", "d_35_15", "d_57_15", "d_64_15", "d_82_15", "d_93_15", "d_95_15", "d_901_15")
  if (isInArray(room10Diseases, diseaseId)) {
    return "Gummizelle"
  }
  //Tomographie
  var room11Diseases = new Array("d_13_15", "d_16_15", "d_29_15", "d_63_15", "d_72_15", "d_91_15", "d_97_15", "d_106_15")
  if (isInArray(room11Diseases, diseaseId)) {
    return "Tomographie"
  }
  //Tropenmedizin
  var room12Diseases = new Array("d_7_15", "d_14_15", "d_15_15", "d_17_15", "d_47_15", "d_51_15", "d_87_15", "d_104_15", "d_114_15", "d_908_15")
  if (isInArray(room12Diseases, diseaseId)) {
    return "Tropenmedizin"
  }
  //Nuklearmedizin
  var room13Diseases = new Array("d_23_15", "d_42_15", "d_54_15", "d_59_15", "d_69_15", "d_81_15", "d_92_15", "d_109_15", "d_112_15", "d_903_15")
  if (isInArray(room13Diseases, diseaseId)) {
    return "Nuklearmedizin"
  }
  //Zahnmedizin
  var room14Diseases = new Array("d_28_15", "d_62_15", "d_68_15", "d_70_15", "d_85_15", "d_89_15", "d_102_15", "d_906_15")
  if (isInArray(room14Diseases, diseaseId)) {
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