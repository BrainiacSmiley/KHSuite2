// ==UserScript==
// @name          KHAdvancedMedRack
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
    jQuery('div#racknavigation_left').attr('onClick', 'generateMedRack(currentPage -1)')
    jQuery('div#racknavigation_right').attr('onClick', 'generateMedRack(currentPage +1)')
    initMeds()
    currentPage = 0;

    storedMedStackSize = getCookie("KHMedStackSize" + jQuery('#username').text())
    if (storedMedStackSize != null) {
      medStackSize = storedMedStackSize
    } else {
      medStackSize = 50
    }
    storedEpidemicStackSize = getCookie("KHEpidemicStackSize" + jQuery('#username').text())
    if (storedEpidemicStackSize != null) {
      epidemicStackSize = storedEpidemicStackSize
    } else {
      epidemicStackSize = 5
    }
    
    //Interval Functions
    window.setInterval("checkMedRack()", 200)
    window.setInterval("checkForOptionsWindow()", 200)
    window.setInterval("checkForSalesAmountWindow()", 200)
    jQuery('div#rackItems').on("dblclick", function(event) {
      openMedShop(Global.availableMedics._object["med"+event.target.getAttribute("medid")]["shop"])
    })
  })
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
variablen[0] = "allMeds"
variablen[1] = "oldRackLength"
variablen[2] = "oldMedSum"
variablen[3] = "currentPage = 0"
variablen[4] = "allMedsPages"
variablen[5] = "numberOfRackItems"
variablen[6] = "medStackSize"
variablen[7] = "epidemicStackSize"

function addFunctions() {
  var functionsToAdd = new Array(initMeds, getRackObject, setMedPrices, checkMedRack, getMedsAvailibleForRoom, generateRackPages, getMedPrice, getMedId, getMedAvailibleAmount, getMedAmountNeeded, getMedsToShop, sumMedPrices, sumMedShopPrices, generateMedRack, checkForOptionsWindow, checkForSalesAmountWindow, saveConfig, setCookie, getCookie, openMedShop, enterShoppingAmount)
  var script = document.createElement("script");
  
  for (var x = 0; x < variablen.length; x++) {
    script.textContent += ("var " + variablen[x] + "\n");
  }
  
  script.textContent += "\n"
  
  for (var x = 0; x < functionsToAdd.length; x++) {
    script.textContent += (functionsToAdd[x].toString() + "\n\n");
  }
  document.body.appendChild(script);
}
function initMeds() {
  allMeds = new Array(15)
  allMeds[0] = new Array(1, 2, 6, 5, 12, 11, 10, 909)
  allMeds[1] = new Array(3, 4, 18, 58, 73)
  allMeds[2] = new Array(26, 44, 30, 113, 94, 99, 52, 75)
  allMeds[3] = new Array(48, 66, 49, 80, 103, 904, 110, 55, 60)
  allMeds[4] = new Array(8, 9, 34, 902, 88, 96, 27, 33, 108, 50)
  allMeds[5] = new Array(71, 67, 79, 37, 83, 100, 907, 41, 46)
  allMeds[6] = new Array(19, 39, 77, 107, 40, 101, 53, 65)
  allMeds[7] = new Array(61, 21, 86, 22, 98, 905, 38, 105, 43, 74)
  allMeds[8] = new Array(36, 45, 900, 78, 84, 56, 90, 111, 20, 32, 76)
  allMeds[9] = new Array(35, 31, 901, 82, 93, 95, 57, 24, 64)
  allMeds[10] = new Array(29, 16, 91, 13, 97, 106, 63, 72)
  allMeds[11] = new Array(51, 15, 87, 7, 104, 14, 114, 47, 908, 17)
  allMeds[12] = new Array(69, 54, 903, 23, 81, 112, 92, 42, 109, 59)
  allMeds[13] = new Array(68, 28, 906, 85, 102, 89, 62, 70)
  allMeds[14] = new Array(1)
  allMeds[14][0] = 899
}
function getRackObject(id) {
  for (var i = 0; i < Rack.elements.length; i++) {
    if (Rack.elements[i].product === id) {
      return Rack.elements[i]
    }
  }
  return null
}
function setMedPrices() {
  if (jQuery('div#medPrices').length) {
    jQuery('div#medPrices').html("Medikamentenwert: " + sumMedPrices() + "<br />Neuauffüllung: " + sumMedShopPrices())
  } else {
    jQuery('<div id="medPrices" class="medamount" style="height: 28px; position: absolute; left: 4px; width: 210px; top: 485px; z-index: 100">Medikamentenwert: ' + sumMedPrices() + '<br />Neuauffüllung: ' + sumMedShopPrices() + '</div>').appendTo('div#toprack')
  }
}
function checkMedRack() {
  if (oldRackLength != Rack.elements.length) {
    oldRackLength = Rack.elements.length
    currentPage = 0
    generateRackPages()
    generateMedRack(currentPage)
  }
  /*if (numberOfRackItems != jQuery('div', jQuery('div#rackItems')).length/3) {
    generateMedRack(currentPage)
  }*/
  if (oldMedSum != sumMedPrices()) {
    oldMedSum = sumMedPrices()
    setMedPrices()
  }
}
function getMedsAvailibleForRoom(room) {
  var medsForRoom = new Array()
  for (var i = 0; i < allMeds[room].length; i++) {
    if (getRackObject(allMeds[room][i]) != null) {
      medsForRoom.push(allMeds[room][i])
    }
  }
  return medsForRoom
}
function generateRackPages() {
  allMedsPages = new Array(1)
  pageToFill = 0;
  allMedsPages[pageToFill] = new Array()
  for (var i = 0; i < allMeds.length; i++) {
    actualMedsToAdd = getMedsAvailibleForRoom(i)
    if (allMedsPages[pageToFill].length + actualMedsToAdd.length > 16) {
      allMedsPages.push(new Array())
      pageToFill++
    }
    for (var j = 0; j < actualMedsToAdd.length; j++) {
      allMedsPages[pageToFill].push(actualMedsToAdd[j])
    }
  }
}
function getMedPrice(id) {
  for (var med in Global.availableMedics._object) {
    if (Global.availableMedics._object[med.toString()].id === id*1) {
      return Global.availableMedics._object[med.toString()].price
    }
  }
  return 0.0
}
function getMedId(name) {
  for (var med in Global.availableMedics._object) {
    if (Global.availableMedics._object[med.toString()].name === name) {
      return Global.availableMedics._object[med.toString()].id
    }
  }
  return -1
}
function sumMedPrices() {
  var sumMeds = 0
  for (var i = 0; i < Rack.elements.length; i++) {
    sumMeds += Rack.elements[i].amount * getMedPrice(Rack.elements[i].product)*1
  }
  var options = {
	symbol : "hT",
	decimal : ",",
	thousand: ".",
	precision : 2,
	format: "%v %s"
  };
  return accounting.formatMoney(sumMeds, options)
}
function getMedsToShop(level) {
  var medsToShop = new Array()
  if (level >= 1) {
    medsToShop.push(1, 2)
  }
  if (level >= 2) {
    medsToShop.push(3)
  }
  if (level >= 3) {
    medsToShop.push(6)
  }
  if (level >= 4) {
    medsToShop.push(5, 4)
  }
  if (level >= 5) {
    medsToShop.push(12)
  }
  if (level >= 6) {
    medsToShop.push(26, 11, 18)
  }
  if (level >= 7) {
    medsToShop.push(44, 30)
  }
  if (level >= 8) {
    medsToShop.push(48, 66)
  }
  if (level >= 9) {
    medsToShop.push(113)
  }
  if (level >= 10) {
    medsToShop.push(8, 9)
  }
  if (level >= 11) {
    medsToShop.push(71, 67)
  }
  if (level >= 12) {
    medsToShop.push(19, 39)
  }
  if (level >= 13) {
    medsToShop.push(34, 61)
  }
  if (level >= 14) {
    medsToShop.push(21)
  }
  if (level >= 15) {
    medsToShop.push(49)
  }
  if (level >= 16) {
    medsToShop.push(36, 94, 45)
  }
  if (level >= 17) {
    medsToShop.push(80)
  }
  if (level >= 18) {
    medsToShop.push(35, 31)
  }
  if (level >= 19) {
    medsToShop.push(900, 29, 16, 78, 86)
  }
  if (level >= 20) {
    medsToShop.push(902, 79)
  }
  if (level >= 21) {
    medsToShop.push(901, 51, 15, 87)
  }
  if (level >= 22) {
    medsToShop.push(91)
  }
  if (level >= 23) {
    medsToShop.push(77, 37, 84)
  }
  if (level >= 24) {
    medsToShop.push(88, 99, 82)
  }
  if (level >= 25) {
    medsToShop.push(56, 22, 83)
  }
  if (level >= 26) {
    medsToShop.push(96, 98, 107)
  }
  if (level >= 27) {
    medsToShop.push(90, 69, 54)
  }
  if (level >= 28) {
    medsToShop.push(103, 903)
  }
  if (level >= 29) {
    medsToShop.push(68, 100, 28)
  }
  if (level >= 30) {
    medsToShop.push(111, 906)
  }
  if (level >= 31) {
    medsToShop.push(7, 85, 23)
  }
  if (level >= 32) {
    medsToShop.push(104, 102)
  }
  if (level >= 33) {
    medsToShop.push(10, 13, 93)
  }
  if (level >= 34) {
    medsToShop.push(97, 907)
  }
  if (level >= 35) {
    medsToShop.push(14)
  }
  if (level >= 36) {
    medsToShop.push(904, 81)
  }
  if (level >= 37) {
    medsToShop.push(909, 20)
  }
  if (level >= 38) {
    medsToShop.push(110, 112)
  }
  if (level >= 39) {
    medsToShop.push(27, 32)
  }
  if (level >= 40) {
    medsToShop.push(92, 905)
  }
  if (level >= 41) {
    medsToShop.push(33, 38)
  }
  if (level >= 42) {
    medsToShop.push(114, 106)
  }
  if (level >= 43) {
    medsToShop.push(40, 41)
  }
  if (level >= 44) {
    medsToShop.push(108, 105)
  }
  if (level >= 45) {
    medsToShop.push(42, 43)
  }
  if (level >= 46) {
    medsToShop.push(109, 101)
  }
  if (level >= 47) {
    medsToShop.push(46, 47)
  }
  if (level >= 48) {
    medsToShop.push(908, 89)
  }
  if (level >= 49) {
    medsToShop.push(50)
  }
  if (level >= 50) {
    medsToShop.push(17)
  }
  if (level >= 51) {
    medsToShop.push(53)
  }
  if (level >= 52) {
    medsToShop.push(95)
  }
  if (level >= 53) {
    medsToShop.push(57)
  }
  if (level >= 54) {
    medsToShop.push(52)
  }
  if (level >= 55) {
    medsToShop.push(59)
  }
  if (level >= 56) {
    medsToShop.push(24)
  }
  if (level >= 57) {
    medsToShop.push(62)
  }
  if (level >= 58) {
    medsToShop.push(55)
  }
  if (level >= 59) {
    medsToShop.push(64)
  }
  if (level >= 60) {
    medsToShop.push(58)
  }
  if (level >= 61) {
    medsToShop.push(70)
  }
  if (level >= 62) {
    medsToShop.push(60)
  }
  if (level >= 63) {
    medsToShop.push(73)
  }
  if (level >= 64) {
    medsToShop.push(63)
  }
  if (level >= 65) {
    medsToShop.push(76)
  }
  if (level >= 66) {
    medsToShop.push(65)
  }
  if (level >= 67) {
    medsToShop.push(72)
  }
  if (level >= 68) {
    medsToShop.push(74)
  }
  if (level >= 69) {
    medsToShop.push(75)
  }
  return medsToShop
}
function getMedAvailibleAmount(id) {
  if (getRackObject(id) != null) {
    return getRackObject(id).amount
  } else {
    return 0
  }
}
function getMedAmountNeeded(id) {
  if (id > 899) {
    amountToShop = epidemicStackSize
  } else {
    amountToShop = medStackSize
  }
  return amountToShop - getMedAvailibleAmount(id)
}
function sumMedShopPrices() {
  var sumShopMeds = 0
  var levelString = jQuery('#level').text()
  var level = levelString.substr(levelString.indexOf('(')+2, (levelString.lastIndexOf(' ')-(levelString.indexOf('(')+2)))*1
  var medsToShop = getMedsToShop(level)
  var amountToShop = 0
  
  for (var i = 0; i < medsToShop.length; i++) {
    missingAmount = getMedAmountNeeded(medsToShop[i])
    if (missingAmount > 0) {
      sumShopMeds += getMedPrice(medsToShop[i])*1 * missingAmount
    }
  }

  var options = {
	symbol : "hT",
	decimal : ",",
	thousand: ".",
	precision : 2,
	format: "%v %s"
  };
  return accounting.formatMoney(sumShopMeds, options)
}
function generateMedRack(page) {
  if (page < 0) {
    page = 0
  }
  if (page > allMedsPages.length-1) {
    page = allMedsPages.length-1
  }

  currentPage = page
  numberOfRackItems = 0
  jQuery('div', jQuery('div#rackItems')).remove()
  Global.rackItems = new Array();
  for (var i = 0; i < allMedsPages[page].length; i++) {
    Global.rackItems.push(new RackItem(getRackObject(allMedsPages[page][i])))
    numberOfRackItems++
  }
}
function checkForOptionsWindow() {
  if (jQuery('div#b').length && !jQuery('div#KHAdvancedMedRackConfig').length) {
    jQuery('<div id="KHAdvancedMedRackConfig" style="margin-top: 60px;">Normale Meds pro Stapel: <input id="medicStackSize" type="number" onChange="saveConfig()" value="' + medStackSize + '"><br />Seuchen Meds pro Stapel: <input id="epidemicStackSize" type="number" onChange="saveConfig()" value="' + epidemicStackSize + '"></div>').insertAfter('div#b')
  }
}
function checkForSalesAmountWindow() {
  if (jQuery('div#dlg_message').is(':visible')) {
    if (jQuery('div#dlg_header').text() == "Frage") {
      if (jQuery('input[class^=inputamount]').length) {
        enterShoppingAmount()
      }
    }
  }
}
function saveConfig() {
  medStackSize = jQuery('#medicStackSize').val()
  epidemicStackSize = jQuery('#epidemicStackSize').val()
  var cookieName = "KHMedStackSize" + jQuery('#username').text()
  setCookie(cookieName, medStackSize, 100, "/", window.location.hostname)
  var cookieName = "KHEpidemicStackSize" + jQuery('#username').text()
  setCookie(cookieName, epidemicStackSize, 100, "/", window.location.hostname)
  checkMedRack()
}
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
function openMedShop(shop) {
  var today = (new Date()).getDay();
  if (shop < 3 || Global.ISPREMIUM || today === 3 || today === 6) {
    if (shop > 0) {
      show_page("shop"+shop)
    } else {
     alert("Wunderpillen können nicht gekauft werden. Du bekommst sie einmal täglich durch den Fernseher, oder durch die Pillenwerkstatt.")
    }
  } else {
    alert("Dieser Shop kann heute nicht erreicht werden! Als nicht PA Spieler bitte bis Mittwoch oder Samstag warten. Oder auf PA upgraden.")
  }
}
function enterShoppingAmount() {
  if (jQuery('input[class^=inputamount]').val() == 0) {
    missingAmount = getMedAmountNeeded(getMedId(jQuery('b', jQuery('div#inputme')).text()))
    if (missingAmount > 0) {
      jQuery('input[class^=inputamount]').val(missingAmount)
      Cart.validateItemValue(0, 1000, jQuery('input[class^=inputamount]')[0]);
    }
  }
}

addFunctions()
addAccounting(readyAccounting)
addJQuery(readyJQuery)