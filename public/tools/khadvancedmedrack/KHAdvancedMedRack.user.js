// ==UserScript==
// @name          KHAdvancedMedRack
// @version       2.2
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
    script.id = 'KHAdvancedMedRackStart';
    script.type = 'text/javascript';
    script.textContent += "(" + callback.toString() + ")();\n";
    document.body.appendChild (script);
  }
}
function injectStartReady() {
  initAdvancedMedRackFunction = window.setInterval("initAdvancedMedRack();", 100);
}
//Begin Injection
function injectScript() {
  var variablesToAdd = new Array();
  variablesToAdd.push("allMeds");
  variablesToAdd.push("allMedsPages");
  variablesToAdd.push("amountAlreadyEntered");
  variablesToAdd.push("currentPage = 0");
  variablesToAdd.push("debugMode = false");
  variablesToAdd.push("KHConfigValues");
  variablesToAdd.push("lastEnteredMed");
  variablesToAdd.push("numberOfRackItems");
  variablesToAdd.push("oldCountedAvailabledMeds = 0");
  variablesToAdd.push("oldMedSum");
  variablesToAdd.push("oldRackLength");
  variablesToAdd.push("oldShoppingSum");
  variablesToAdd.push("userName");
  variablesToAdd.push("initAdvancedMedRackFunction");

  var functionsToAdd = new Array();
  functionsToAdd.push(addAdvancedMedRackOptions);
  functionsToAdd.push(changeMedsBackgrounds);
  functionsToAdd.push(checkMedRack);
  functionsToAdd.push(countAvailableMeds);
  functionsToAdd.push(generateAdvancedMedRackConfigOptions);
  functionsToAdd.push(generateConfigBase);
  functionsToAdd.push(generateMedRack);
  functionsToAdd.push(generateRackPages);
  functionsToAdd.push(getEntryName);
  functionsToAdd.push(getMedAmountNeeded);
  functionsToAdd.push(getMedAvailibleAmount);
  functionsToAdd.push(getMedBackground);
  functionsToAdd.push(getMedId);
  functionsToAdd.push(getMedPrice);
  functionsToAdd.push(getMedsAvailibleForRoom);
  functionsToAdd.push(getMedsToShop);
  functionsToAdd.push(getRackObject);
  functionsToAdd.push(initAdvancedMedRack);
  functionsToAdd.push(initMeds);
  functionsToAdd.push(isInArray);
  functionsToAdd.push(openMedShop);
  functionsToAdd.push(progressShoppingAmountWindow);
  functionsToAdd.push(recogniseAdvancedMedRackWindows);
  functionsToAdd.push(saveAdvancedMedRackConfig);
  functionsToAdd.push(setMedPrices);
  functionsToAdd.push(sortConfigMenu);
  functionsToAdd.push(storeKHConfigValues);
  functionsToAdd.push(sumMedPrices);
  functionsToAdd.push(sumMedShopPrices);
  functionsToAdd.push(medAmountEnough);
  functionsToAdd.push(checkMedAmounts);

  var script = document.createElement("script");
  script.id = 'KHAdvancedMedRack';
  script.type = 'text/javascript';
  
  for (var x = 0; x < variablesToAdd.length; x++) {
    script.textContent += ("var " + variablesToAdd[x] + ";\n");
  }
  
  script.textContent += "\n";
  
  for (var x = 0; x < functionsToAdd.length; x++) {
    script.textContent += (functionsToAdd[x].toString() + "\n\n");
  }
  document.body.appendChild(script);
}
//End Injection
//Begin AdvancedMedRack
function initAdvancedMedRack() {
  if (typeof jQuery != 'undefined') {
    //check if Dev Mode
    if (window.location.search == "?dev") {
      debugMode = true
    } else {
      debugMode = false
    }

    initMeds();
    currentPage = 0;
  
    userName = jQuery('#username').text();
  
    //restore KHConfigValues
    if (localStorage.getItem('KHConfigValues' + userName) != null) {
      KHConfigValues = JSON.parse(localStorage.getItem('KHConfigValues' + userName));
    } else {
      KHConfigValues = new Object();
    }
    //Check for Script Values
    if (typeof KHConfigValues.medStackSize == 'undefined') {
      KHConfigValues.medStackSize = 50;
    }
    if (typeof KHConfigValues.epidemicStackSize == 'undefined') {
      KHConfigValues.epidemicStackSize = 5;
    }
    //Check for Script Values
    if (typeof KHConfigValues.medWarningStackSize == 'undefined') {
      KHConfigValues.medWarningStackSize = 5;
    }
    if (typeof KHConfigValues.epidemicWarningStackSize == 'undefined') {
      KHConfigValues.epidemicWarningStackSize = 1;
    }
    storeKHConfigValues();
  
    //Add new Functions to KH
    jQuery('div#racknavigation_left').attr('onClick', 'generateMedRack(currentPage -1)');
    jQuery('div#racknavigation_right').attr('onClick', 'generateMedRack(currentPage +1)');
    jQuery('div#rackItems').on("dblclick", function(event) {
      openMedShop(Global.availableMedics._object["med"+event.target.getAttribute("medid")]["shop"]);
    });
    
    //Interval Functions
    window.setInterval("checkMedRack()", 200);
    window.setInterval("recogniseAdvancedMedRackWindows()", 200);
    window.clearInterval(initAdvancedMedRackFunction);
    if (debugMode) {
      console.log("KHAdvancedMedRack loaded");
    }
  } else {
    if (debugMode) {
      console.log("KHAdvancedMedRack not loaded");
    }
  }
}
function initMeds() {
  allMeds = new Array(16);
  //Behandlungsraum
  allMeds[0] = new Array(1, 2, 6, 5, 12, 11, 10, 909);
  //Röntgenraum
  allMeds[1] = new Array(3, 4, 18, 58, 73);
  //Ultraschall
  allMeds[2] = new Array(26, 44, 30, 113, 94, 99, 52, 75);
  //Orthopädie
  allMeds[3] = new Array(48, 66, 49, 80, 103, 904, 110, 55, 60);
  //Psychotherapie
  allMeds[4] = new Array(8, 9, 34, 902, 88, 96, 27, 33, 108, 50);
  //EKG / EEG
  allMeds[5] = new Array(71, 67, 79, 37, 83, 100, 907, 41, 46);
  //Operationssaal
  allMeds[6] = new Array(19, 39, 77, 107, 40, 101, 53, 65);
  //Laboratorium
  allMeds[7] = new Array(61, 21, 86, 22, 98, 905, 38, 105, 43, 74);
  //Dunkelkammer
  allMeds[8] = new Array(36, 45, 900, 78, 84, 56, 90, 111, 20, 32, 76);
  //Gummizelle
  allMeds[9] = new Array(35, 31, 901, 82, 93, 95, 57, 24, 64);
  //Tomographie
  allMeds[10] = new Array(29, 16, 91, 13, 97, 106, 63, 72);
  //Tropenmedizin
  allMeds[11] = new Array(51, 15, 87, 7, 104, 14, 114, 47, 908, 17);
  //Nuklearmedizin
  allMeds[12] = new Array(69, 54, 903, 23, 81, 112, 92, 42, 109, 59);
  //Zahnmedizin
  allMeds[13] = new Array(68, 28, 906, 85, 102, 89, 62, 70);
  //Area 51
  allMeds[14] = new Array(115, 116, 117, 118, 119);
  //Wunderpille
  allMeds[15] = new Array(1);
  allMeds[15][0] = 899;
  
}
function recogniseAdvancedMedRackWindows() {
  if (jQuery('div#b').length && !jQuery('div#KHAdvancedMedRackOptions').length) {
    addAdvancedMedRackOptions();
  } else if (jQuery('div#dlg_message').is(':visible')) {
    if (jQuery('div#dlg_header').text() == "Frage") {
      if (jQuery('input[class^=inputamount]').length) {
        progressShoppingAmountWindow();
      }
    }
  }
}
function getEntryName(entry) {
  return jQuery(entry).children().text();
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
function addAdvancedMedRackOptions() {
  //check if ConfigBase present
  if (!jQuery('ul#KHOptions').length) {
    jQuery(generateConfigBase()).insertAfter('div#b');
  }

  //add AdvancedAssignment Options to ConfigBase
  jQuery(generateAdvancedMedRackConfigOptions()).appendTo('div#KHOptionsContent');
  jQuery('<li><a href="#KHAdvancedMedRackOptions" data-toggle="tab">KHAdvancedMedRack</a></li>').appendTo('ul#toolsMenu');
  jQuery('#toolsMenu').parent().show();
  sortConfigMenu();

  //set AdvancedAssignment Options
  jQuery('#medicStackSize').val(KHConfigValues.medStackSize);
  jQuery('#epidemicStackSize').val(KHConfigValues.epidemicStackSize);
  jQuery('#medicWarningStackSize').val(KHConfigValues.medWarningStackSize);
  jQuery('#epidemicWarningStackSize').val(KHConfigValues.epidemicWarningStackSize);
}
function generateAdvancedMedRackConfigOptions() {
  htmlCode = "";
  htmlCode += "<div class=\"tab-pane\" id=\"KHAdvancedMedRackOptions\" style=\"margin-left:10px;margin-top:-18px;\">";
  htmlCode += "  Normale Meds: Mindestmenge <input id=\"medicWarningStackSize\" type=\"number\" onchange=\"saveAdvancedMedRackConfig()\" value=\"110\" style=\"width:50px;\"> | Kaufmenge <input id=\"medicStackSize\" type=\"number\" onchange=\"saveAdvancedMedRackConfig()\" value=\"110\" style=\"width:50px;\"> proStapel.<br/>";
  htmlCode += "  Seuchen Meds: Mindestmenge <input id=\"epidemicWarningStackSize\" type=\"number\" onchange=\"saveAdvancedMedRackConfig()\" value=\"5\"  style=\"width:50px;\"> | Kaufmenge <input id=\"epidemicStackSize\" type=\"number\" onchange=\"saveAdvancedMedRackConfig()\" value=\"5\"  style=\"width:50px;\"> pro Stapel.";
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
function getRackObject(id) {
  for (var i = 0; i < Rack.elements.length; i++) {
    if (Rack.elements[i].product === id) {
      return Rack.elements[i];
    }
  }
  return null;
}
function setMedPrices(medSum, medShopSum) {
  if (jQuery('div#medPrices').length) {
    jQuery('div#medPrices').html("Medikamentenwert: " + medSum + "<br />Neuauffüllung: " + medShopSum);
  } else {
    jQuery('<div id="medPrices" class="medamount" style="height: 28px; position: absolute; left: 4px; width: 210px; top: 485px; z-index: 100">Medikamentenwert: ' + sumMedPrices() + '<br />Neuauffüllung: ' + sumMedShopPrices() + '</div>').appendTo('div#toprack');
  }
}
function countAvailableMeds() {
  countedAvailableMeds = 0;
  for (var i = 0; i < Rack.elements.length; i++) {
    countedAvailableMeds += Rack.elements[i].amount;
  }
  return countedAvailableMeds;
}
function checkMedRack() {
  if (Rack != null) {
    if (Rack.elements != null) {
      if (oldRackLength != Rack.elements.length) {
        oldRackLength = Rack.elements.length;
        currentPage = 0;
        generateRackPages();
        generateMedRack(currentPage);
      }
    
      if (allMedsPages[currentPage].length > (jQuery('div', jQuery('div#rackItems')).length/3) ||
          oldCountedAvailabledMeds != countAvailableMeds()) {
        oldCountedAvailabledMeds = countAvailableMeds();
        generateMedRack(currentPage);
      }
    
      newMedSum = sumMedPrices();
      newShoppingSum = sumMedShopPrices();
      if (oldMedSum != newMedSum || oldShoppingSum != newShoppingSum) {
        oldMedSum = newMedSum;
        oldShoppingSum = newShoppingSum;
        setMedPrices(newMedSum, newShoppingSum);
      }
      changeMedsBackgrounds();
      checkMedAmounts();
    }
  }
}
function changeMedsBackgrounds() {
  jQuery('[class^="med ri_a ri_"]', jQuery('div#rackItems')).each(function() {
    medId = jQuery(this).attr('medid')*1;
    medClass = jQuery(this).attr('class').split("_");
    medClass[2] = getMedBackground(medId);
    jQuery(this).attr('class', medClass.join("_"));
  });
}
function checkMedAmounts() {
  jQuery('div.medamount', jQuery('div#rackItems')).each(function() {
    medId = jQuery(this).parent().attr('medid')*1;
    amount = jQuery(this).text()*1;
    if (!medAmountEnough(medId, amount)) {
      jQuery(this).css('background-color', 'red');
      jQuery(this).css('color', 'white');
    } else {
      jQuery(this).removeAttr('style');
    }
  });
}
function medAmountEnough(medId, amount) {
  if (medId < 899 && amount < KHConfigValues.medWarningStackSize) {
    return false;
  }
  if (medId >899 && amount < KHConfigValues.epidemicWarningStackSize) {
    return false;
  }
  return true;
}
function getMedBackground(medId) {
  //Psychotherapie, Gummizelle, Area 51 = schwarz = 0
  if (isInArray(allMeds[4], medId) ||
      isInArray(allMeds[9], medId) ||
      isInArray(allMeds[14], medId)) {
    return 1;
  }
  //Behandlungsraum, EKG / EEG, Tomographie, Wunderpille = rot = 1
  else if (isInArray(allMeds[0], medId) ||
           isInArray(allMeds[5], medId) ||
           isInArray(allMeds[10], medId) ||
		   isInArray(allMeds[15], medId)) {
    return 2;
  }
  //Röntgenraum, Operationssaal, Tropenmedizin = blau = 2
  else if (isInArray(allMeds[1], medId) ||
           isInArray(allMeds[6], medId) ||
           isInArray(allMeds[11], medId)) {
    return 3;
  }
  //Ultraschall, Laboratorium, Nuklearmedizin = grün = 3
  else if (isInArray(allMeds[2], medId) ||
           isInArray(allMeds[7], medId) ||
           isInArray(allMeds[12], medId)) {
    return 4;
  }
  //Orthopädie, Dunkelkammer, Zahnmedizin = lila = 4
  else if (isInArray(allMeds[3], medId) ||
           isInArray(allMeds[8], medId) ||
           isInArray(allMeds[13], medId)) {
    return 5;
  }
}
function isInArray(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return true
    }
  }
  return false
}
function getMedsAvailibleForRoom(room) {
  var medsForRoom = new Array();
  for (var i = 0; i < allMeds[room].length; i++) {
    if (getRackObject(allMeds[room][i]) != null) {
      medsForRoom.push(allMeds[room][i]);
    }
  }
  return medsForRoom;
}
function generateRackPages() {
  allMedsPages = new Array(1);
  pageToFill = 0;
  allMedsPages[pageToFill] = new Array();
  for (var i = 0; i < allMeds.length; i++) {
    actualMedsToAdd = getMedsAvailibleForRoom(i);
    if (allMedsPages[pageToFill].length + actualMedsToAdd.length > 16) {
      allMedsPages.push(new Array());
      pageToFill++;
    }
    for (var j = 0; j < actualMedsToAdd.length; j++) {
      allMedsPages[pageToFill].push(actualMedsToAdd[j]);
    }
  }
}
function getMedPrice(id) {
  for (var med in Global.availableMedics._object) {
    if (Global.availableMedics._object[med.toString()].id === id*1) {
      return Global.availableMedics._object[med.toString()].price;
    }
  }
  return 0.0;
}
function getMedId(name) {
  for (var med in Global.availableMedics._object) {
    if (Global.availableMedics._object[med.toString()].name === name) {
      return Global.availableMedics._object[med.toString()].id;
    }
  }
  return -1;
}
function sumMedPrices() {
  var sumMeds = 0;
  for (var i = 0; i < Rack.elements.length; i++) {
    sumMeds += Rack.elements[i].amount * getMedPrice(Rack.elements[i].product)*1;
  }
  var options = {
	symbol : "hT",
	decimal : ",",
	thousand: ".",
	precision : 2,
	format: "%v %s"
  };
  return accounting.formatMoney(sumMeds, options);
}
function getMedsToShop(level) {
  var medsToShop = new Array();
  if (level >= 1) {
    medsToShop.push(1, 2);
  }
  if (level >= 2) {
    medsToShop.push(3);
  }
  if (level >= 3) {
    medsToShop.push(6);
  }
  if (level >= 4) {
    medsToShop.push(5, 4);
  }
  if (level >= 5) {
    medsToShop.push(12);
  }
  if (level >= 6) {
    medsToShop.push(26, 11, 18);
  }
  if (level >= 7) {
    medsToShop.push(44, 30);
  }
  if (level >= 8) {
    medsToShop.push(48, 66);
  }
  if (level >= 9) {
    medsToShop.push(113);
  }
  if (level >= 10) {
    medsToShop.push(8, 9);
  }
  if (level >= 11) {
    medsToShop.push(71, 67);
  }
  if (level >= 12) {
    medsToShop.push(19, 39);
  }
  if (level >= 13) {
    medsToShop.push(34, 61);
  }
  if (level >= 14) {
    medsToShop.push(21);
  }
  if (level >= 15) {
    medsToShop.push(49);
  }
  if (level >= 16) {
    medsToShop.push(36, 94, 45);
  }
  if (level >= 17) {
    medsToShop.push(80);
  }
  if (level >= 18) {
    medsToShop.push(35, 31);
  }
  if (level >= 19) {
    medsToShop.push(900, 29, 16, 78, 86);
  }
  if (level >= 20) {
    medsToShop.push(902, 79);
  }
  if (level >= 21) {
    medsToShop.push(901, 51, 15, 87);
  }
  if (level >= 22) {
    medsToShop.push(91);
  }
  if (level >= 23) {
    medsToShop.push(77, 37, 84);
  }
  if (level >= 24) {
    medsToShop.push(88, 99, 82);
  }
  if (level >= 25) {
    medsToShop.push(56, 22, 83);
  }
  if (level >= 26) {
    medsToShop.push(96, 98, 107);
  }
  if (level >= 27) {
    medsToShop.push(90, 69, 54);
  }
  if (level >= 28) {
    medsToShop.push(103, 903);
  }
  if (level >= 29) {
    medsToShop.push(68, 100, 28);
  }
  if (level >= 30) {
    medsToShop.push(111, 906);
  }
  if (level >= 31) {
    medsToShop.push(7, 85, 23);
  }
  if (level >= 32) {
    medsToShop.push(104, 102, 115);
  }
  if (level >= 33) {
    medsToShop.push(10, 13, 93, 116);
  }
  if (level >= 34) {
    medsToShop.push(97, 907);
  }
  if (level >= 35) {
    medsToShop.push(14);
  }
  if (level >= 36) {
    medsToShop.push(904, 81, 117);
  }
  if (level >= 37) {
    medsToShop.push(909, 20);
  }
  if (level >= 38) {
    medsToShop.push(110, 112, 118);
  }
  if (level >= 39) {
    medsToShop.push(27, 32);
  }
  if (level >= 40) {
    medsToShop.push(92, 905, 119);
  }
  if (level >= 41) {
    medsToShop.push(33, 38);
  }
  if (level >= 42) {
    medsToShop.push(114, 106);
  }
  if (level >= 43) {
    medsToShop.push(40, 41);
  }
  if (level >= 44) {
    medsToShop.push(108, 105);
  }
  if (level >= 45) {
    medsToShop.push(42, 43);
  }
  if (level >= 46) {
    medsToShop.push(109, 101);
  }
  if (level >= 47) {
    medsToShop.push(46, 47);
  }
  if (level >= 48) {
    medsToShop.push(908, 89);
  }
  if (level >= 49) {
    medsToShop.push(50);
  }
  if (level >= 50) {
    medsToShop.push(17);
  }
  if (level >= 51) {
    medsToShop.push(53);
  }
  if (level >= 52) {
    medsToShop.push(95);
  }
  if (level >= 53) {
    medsToShop.push(57);
  }
  if (level >= 54) {
    medsToShop.push(52);
  }
  if (level >= 55) {
    medsToShop.push(59);
  }
  if (level >= 56) {
    medsToShop.push(24);
  }
  if (level >= 57) {
    medsToShop.push(62);
  }
  if (level >= 58) {
    medsToShop.push(55);
  }
  if (level >= 59) {
    medsToShop.push(64);
  }
  if (level >= 60) {
    medsToShop.push(58);
  }
  if (level >= 61) {
    medsToShop.push(70);
  }
  if (level >= 62) {
    medsToShop.push(60);
  }
  if (level >= 63) {
    medsToShop.push(73);
  }
  if (level >= 64) {
    medsToShop.push(63);
  }
  if (level >= 65) {
    medsToShop.push(76);
  }
  if (level >= 66) {
    medsToShop.push(65);
  }
  if (level >= 67) {
    medsToShop.push(72);
  }
  if (level >= 68) {
    medsToShop.push(74);
  }
  if (level >= 69) {
    medsToShop.push(75);
  }
  return medsToShop;
}
function getMedAvailibleAmount(id) {
  if (getRackObject(id) != null) {
    return getRackObject(id).amount;
  } else {
    return 0;
  }
}
function getMedAmountNeeded(id) {
  if (id > 899) {
    amountToShop = KHConfigValues.epidemicStackSize;
  } else {
    amountToShop = KHConfigValues.medStackSize;
  }
  return amountToShop - getMedAvailibleAmount(id);
}
function sumMedShopPrices() {
  var sumShopMeds = 0;
  var levelString = jQuery('#level').text();
  var level = levelString.substr(levelString.indexOf('(')+2, (levelString.lastIndexOf(' ')-(levelString.indexOf('(')+2)))*1;
  var medsToShop = getMedsToShop(level);
  var amountToShop = 0;
  
  for (var i = 0; i < medsToShop.length; i++) {
    missingAmount = getMedAmountNeeded(medsToShop[i]);
    if (missingAmount > 0) {
      sumShopMeds += getMedPrice(medsToShop[i])*1 * missingAmount;
    }
  }

  var options = {
	symbol : "hT",
	decimal : ",",
	thousand: ".",
	precision : 2,
	format: "%v %s"
  };
  return accounting.formatMoney(sumShopMeds, options);
}
function generateMedRack(page) {
  if (page < 0) {
    page = allMedsPages.length-1;
  }
  if (page > allMedsPages.length-1) {
    page = 0;
  }

  currentPage = page;
  jQuery('div', jQuery('div#rackItems')).remove();
  Global.rackItems = new Array();
  for (var i = 0; i < allMedsPages[page].length; i++) {
    Global.rackItems.push(new RackItem(getRackObject(allMedsPages[page][i])));
  }
}
function saveAdvancedMedRackConfig() {
  KHConfigValues.medStackSize = jQuery('#medicStackSize').val();
  KHConfigValues.epidemicStackSize = jQuery('#epidemicStackSize').val();
  KHConfigValues.medWarningStackSize = jQuery('#medicWarningStackSize').val();
  KHConfigValues.epidemicWarningStackSize = jQuery('#epidemicWarningStackSize').val();
  storeKHConfigValues();
  checkMedRack();
}
function storeKHConfigValues() {
  //remove old version from localStorage
  localStorage.removeItem('KHConfigValues' + userName);
  //write actual version to localStorage
  localStorage.setItem('KHConfigValues' + userName, JSON.stringify(KHConfigValues));
}
function openMedShop(shop) {
  var today = (new Date()).getDay();
  if (shop < 3 || Global.ISPREMIUM || today === 3 || today === 6) {
    if (shop > 0) {
      show_page("shop"+shop);
    } else {
     Dialog.information("Wunderpillen können nicht gekauft werden. Du bekommst sie einmal täglich durch den Fernseher, oder durch die Pillenwerkstatt.");
    }
  } else {
    Dialog.information("Dieser Shop kann heute nicht erreicht werden! Als nicht PA Spieler bitte bis Mittwoch oder Samstag warten. Oder auf PA upgraden.");
  }
}
function progressShoppingAmountWindow() {
  if (lastEnteredMed != jQuery('b', jQuery('div#inputme')).text()) {
    lastEnteredMed = jQuery('b', jQuery('div#inputme')).text();
    amountAlreadyEntered = false;
  }
  if (jQuery('input[class^=inputamount]').val() == 0 && !amountAlreadyEntered) {
    missingAmount = getMedAmountNeeded(getMedId(jQuery('b', jQuery('div#inputme')).text()));
    if (missingAmount > 0) {
      amountAlreadyEntered = true;
      jQuery('input[class^=inputamount]').val(missingAmount);
      Cart.validateItemValue(0, 1000, jQuery('input[class^=inputamount]')[0]);
    }
  }
}
//End AdvancedMedRack
//Begin Script
injectScript();
injectScriptStart(injectStartReady);
//End Script