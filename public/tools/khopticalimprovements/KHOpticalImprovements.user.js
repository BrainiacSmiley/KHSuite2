// ==UserScript==
// @name          KHOpticalImprovements
// @version       2.0.1
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
    script.id = 'KHOpticalImprovementsStart';
    script.type = 'text/javascript';
    script.textContent += "(" + callback.toString() + ")();\n";
    document.body.appendChild (script);
  }
}
function injectStartReady() {
  initOpticalImprovementsFunction = window.setInterval("initOpticalImprovements();", 100);
}
//Begin Injection
function injectScript() {
  var variablesToAdd = new Array();
  variablesToAdd.push("checkSusiFunction");
  variablesToAdd.push("checkVideoTVFunction");
  variablesToAdd.push("debugMode");
  variablesToAdd.push("KHConfigValues");
  variablesToAdd.push("userName");
  variablesToAdd.push("initOpticalIMprovementsFunction");

  var functionsToAdd = new Array();
  functionsToAdd.push(addOpticalImprovementsOptions);
  functionsToAdd.push(addPointsToNextLevel);
  functionsToAdd.push(checkCampaignItem);
  functionsToAdd.push(checkRackPositions);
  functionsToAdd.push(checkSusi);
  functionsToAdd.push(checkUpjersBar);
  functionsToAdd.push(checkVideoTV);
  functionsToAdd.push(correctZIndexes);
  functionsToAdd.push(daysBetweenDates);
  functionsToAdd.push(generateConfigBase);
  functionsToAdd.push(generateOpticalImprovementsConfigOptions);
  functionsToAdd.push(getEntryName);
  functionsToAdd.push(initOpticalImprovements);
  functionsToAdd.push(isSusiOK);
  functionsToAdd.push(recogniseOpticalImprovementWindows);
  functionsToAdd.push(saveOpticalImprovementsConfig);
  functionsToAdd.push(sortConfigMenu);
  functionsToAdd.push(storeKHConfigValues);
  
  var script = document.createElement("script");
  script.id = 'KHOpticalImprovements';
  script.type = 'text/javascript';
  
  for (var x = 0; x < variablesToAdd.length; x++) {
    script.textContent += ("var " + variablesToAdd[x] + ";\n");
  }
  
  script.textContent += "\n";
  
  for (var x = 0; x < functionsToAdd.length; x++) {
    if (typeof functionsToAdd[x] != 'undefined') {
      script.textContent += (functionsToAdd[x].toString() + "\n\n");
    }
  }
  document.body.appendChild(script);
}
//End Injection
//Begin OpticalFixes
function initOpticalImprovements() {
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
    if (typeof KHConfigValues.hideCampaignItem == 'undefined') {
      KHConfigValues.hideCampaignItem = false;
    }
    if (typeof KHConfigValues.hideTV == 'undefined') {
      KHConfigValues.hideTV = false;
    }
    if (typeof KHConfigValues.susiAlertTime == 'undefined') {
      KHConfigValues.susiAlertTime = 3;
    }
    if (typeof KHConfigValues.hideUpjersBar == 'undefined') {
      KHConfigValues.hideUpjersBar = true;
    }
    storeKHConfigValues();

    jQuery(document).ready(function() {
      correctZIndexes();
      checkCampaignItem();
      checkUpjersBar();
      
      //remove Aktion Text
      if (jQuery('div#avatar').next().text() == "\"Der Fußball-EM 2012 Flausch\": Jetzt gratis zu jedem Kauf ab 9,99€") {
        jQuery('div#avatar').next().hide();
      }
    });

    //interval Functions
    checkVideoTVFunction = window.setInterval("checkVideoTV()", 200);
    checkSusiFunction = window.setInterval("checkSusi()", 200);
    window.setInterval("addPointsToNextLevel()", 200);
    window.setInterval("recogniseOpticalImprovementWindows()", 200);
    window.setInterval("checkRackPositions()", 200);
    window.clearInterval(initOpticalImprovementsFunction);
    if (debugMode) {
      console.log("KHOpticalImprovements loaded");
    }
  } else {
    if (debugMode) {
      console.log("KHOpticalImprovements not loaded");
    }
  }
}
function storeKHConfigValues() {
  //remove old version from localStorage
  localStorage.removeItem('KHConfigValues' + userName);
  //write actual version to localStorage
  localStorage.setItem('KHConfigValues' + userName, JSON.stringify(KHConfigValues));
}
function recogniseOpticalImprovementWindows() {
  if (jQuery('div#b').length && !jQuery('div#KHOpticalImprovementsOptions').length) {
    addOpticalImprovementsOptions();
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
function addOpticalImprovementsOptions() {
  //check if ConfigBase present
  if (!jQuery('ul#KHOptions').length) {
    jQuery(generateConfigBase()).insertAfter('div#b');
  }

  //add AdvancedAssignment Options to ConfigBase
  jQuery(generateOpticalImprovementsConfigOptions()).appendTo('div#KHOptionsContent');
  jQuery('<li><a href="#KHOpticalImprovementsOptions" data-toggle="tab">KHOpticalImprovements</a></li>').appendTo('ul#toolsMenu');
  jQuery('#toolsMenu').parent().show();
  sortConfigMenu();

  //set AdvancedAssignment Options
  if(KHConfigValues.hideCampaignItem) {
    jQuery('#hideCampaignItemConfig:checkbox').val(["true"]);
  }
  if(KHConfigValues.hideUpjersBar) {
    jQuery('#hideUpjersBarConfig:checkbox').val(["true"]);
  }
  if(KHConfigValues.hideTV) {
    jQuery('#hideTVConfig:checkbox').val(["true"]);
  }
  jQuery('#SusiAlertTimeConfig').val(KHConfigValues.susiAlertTime);
}
function generateOpticalImprovementsConfigOptions() {
  htmlCode = "";
  htmlCode += "<div class=\"tab-pane\" id=\"KHOpticalImprovementsOptions\" style=\"margin-left:10px;margin-top:-18px;\">";
  htmlCode += "  Aktions Item ausblenden: <input type=\"checkbox\" id=\"hideCampaignItemConfig\" value=\"true\" onchange=\"saveOpticalImprovementsConfig()\" style=\"vertical-align:-2px;\"> TV ausblenden: <input type=\"checkbox\" id=\"hideTVConfig\" value=\"true\" onchange=\"saveOpticalImprovementsConfig()\" style=\"vertical-align:-2px;\"><br />UpjersBar ausblenden: <input type=\"checkbox\" id=\"hideUpjersBarConfig\" value=\"true\" onchange=\"saveOpticalImprovementsConfig()\" style=\"vertical-align:-2px;\"> Susi Vorwarnzeit: <input id=\"SusiAlertTimeConfig\" type=\"number\" onchange=\"saveOpticalImprovementsConfig()\" value=\"3\" style=\"width:40px;\"> Tage";
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
function saveOpticalImprovementsConfig() {
  if (!!jQuery('#hideCampaignItemConfig:checked').val()) {
    KHConfigValues.hideCampaignItem = true;
  } else {
    KHConfigValues.hideCampaignItem = false;
  }
  if (!!jQuery('#hideUpjersBarConfig:checked').val()) {
    KHConfigValues.hideUpjersBar = true;
  } else {
    KHConfigValues.hideUpjersBar = false;
  }
  if (!!jQuery('#hideTVConfig:checked').val()) {
    KHConfigValues.hideTV = true;
  } else {
    KHConfigValues.hideTV = false;
  }
  KHConfigValues.susiAlertTime = jQuery('#SusiAlertTimeConfig').val();

  checkCampaignItem();
  checkUpjersBar();
  checkVideoTV();
  storeKHConfigValues();
  window.clearInterval(checkSusiFunction);
  checkSusiFunction = window.setInterval("checkSusi()", 200);
}
function correctZIndexes() {
  //z-index correction, to prevent patients crawling underneath items
  if (jQuery('div#videotv').length) {
    jQuery('div#videotv').css('z-index', '-1');
  }
  if (jQuery('div#schatzsuche').length) {
    jQuery('div#schatzsuche').css('z-index', '-1');
  }
}
function checkCampaignItem() {
  if (KHConfigValues.hideCampaignItem) {
    jQuery('div#schatzsuche').hide();
    jQuery('div#geburtstag2012').hide();
  } else {
    jQuery('div#schatzsuche').show();
    jQuery('div#geburtstag2012').show();
  }
}
function checkUpjersBar() {
  if (KHConfigValues.hideUpjersBar) {
    jQuery('div#uplogo').parent().parent().hide()
    jQuery('body').css('margin-top', '-30px');
  } else {
    jQuery('div#uplogo').parent().parent().show();
    jQuery('body').css('margin-top', '');
  }
}
function checkRackPositions() {
  jQuery('div#toprack').css('top', '159px');
  if (KHConfigValues.hideUpjersBar) {
    jQuery('div#playersofficerack').css('top', '129px');
  }
}
function addPointsToNextLevel() {
  var pointsPerLevel = [0, 0, 50, 200, 500, 1000, 3000, 12000, 17000, 28000, 40000, 70000, 115000, 165000, 220000, 280000, 350000, 440000, 550000, 800000, 1100000, 1500000, 1950000, 2450000, 3000000, 3600000, 4250000, 5000000, 6000000, 7250000, 8550000, 9900000, 11300000, 12750000, 14250000, 15800000, 17400000, 19050000, 20750000, 22500000, 24300000, 26150000, 28050000, 30000000, 32000000, 34050000, 36150000, 38300000, 40500000, 42750000, 45050000, 47400000, 49800000, 52250000, 54750000, 57300000, 59900000, 62550000, 65250000, 68000000, 70800000, 73650000, 76550000, 79500000, 82500000, 85550000, 88650000, 91800000, 95000000, 98250000, 99999999];
  var punkte = jQuery('#pkt').text().split(".").join("")*1;
  var levelString = jQuery('#level').text();
  var userLevel = levelString.substr(levelString.indexOf('(')+2, (levelString.lastIndexOf(' ')-(levelString.indexOf('(')+2)))*1;
  var options = {
    decimal : ",",
    thousand: ".",
    precision : 0,
    format: "%v"
  };

  if (typeof accounting != 'undefined') {
    jQuery('#pkt').attr('title', "Noch " + accounting.formatMoney(pointsPerLevel[userLevel+1]-punkte, options) + " Punkte bis Level " + (userLevel+1) + ".");
  }
}
function checkVideoTV() {
  if ((jQuery('div#videotv').css('background-image') == "url(http://pics.kapihospital.de/videotv_anim.gif)" || jQuery('div#videotv').css('background-image') == "url(\"http://pics.kapihospital.de/videotv_anim.gif\")") && !jQuery('div#videoreminder').length) {
    jQuery('<div id="videoreminder" class="cleaner cursorclickable" style="position: absolute; background-image: url(http://pics.kapihospital.de/roomlock.png); width: 50px; height: 50px; left: 398px; top: -8px; z-index: 1" onclick="Videoplayer.open();" title="Einmal am Tag Werbung schauen und eine gratis Wunderpille abstauben!">&nbsp;</div>').insertAfter('div#videotv');
  }
  if ((jQuery('div#videotv').css('background-image') == "url(http://pics.kapihospital.de/videotv_still.gif)" || jQuery('div#videotv').css('background-image') == "url(\"http://pics.kapihospital.de/videotv_still.gif\")")) {
    if (jQuery('div#videoreminder').length) {
      jQuery('div#videoreminder').remove();
    }
    window.clearInterval(checkVideoTVFunction);
    if (KHConfigValues.hideTV) {
      jQuery('div#videotv').hide();
    } else {
      jQuery('div#videotv').show();
    }
  }
}
function daysBetweenDates(date1, date2) {
    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24;

    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date1_ms - date2_ms);
    
    // Convert back to days and return
    return Math.round(difference_ms/ONE_DAY);
}
function isSusiOK() {
  if (!jQuery('img#susi').length) {
    return 0;
  } else {
    if (jQuery('img#susi').attr('title').split(" ")[2] != undefined) {
      var dateArray = jQuery('img#susi').attr('title').split(" ")[2].split(".");
      var susiDate = new Date(dateArray[2]*1, (dateArray[1]*1)-1, (dateArray[0]*1)+1);
      var today = new Date();
      var restTime = daysBetweenDates(susiDate, today);
      if (restTime <= KHConfigValues.susiAlertTime) {
        return restTime;
      }
    } else {
      return -1;
    }
  }
  return -1;
}
function checkSusi() {
  var susiRestTime = isSusiOK();
  if (susiRestTime != -1 && !jQuery('img#susireminder').length) {
    var susiReminderToolTip = "";
    if (susiRestTime === 0) {
      susiReminderToolTip = "Achtung Du hast keine Susi. Nur mit allen Minibehandlungen zahlt der Patient den Max-Preis!";
    } else {
      if (susiRestTime > 1) {
        susiReminderToolTip = "Achtung die Susi läuft in " + susiRestTime + " Tagen aus!";
      } else {
        susiReminderToolTip = "Achtung die Susi läuft in " + susiRestTime + " Tag aus!";
      }
    }
    if (jQuery('img#susi').length) {
      jQuery('<img id="susireminder" class="cursorclickable" width="30" style="margin-left:-8px;margin-top:-24px;margin-bottom:10px;" src="http://pics.kapihospital.de/roomlock.png" title="' + susiReminderToolTip + '">').appendTo('div#menu_miniicons');
    } else {
      jQuery('<img id="susireminder" class="cursorclickable" width="30" style="margin-left:-8px;margin-top:16px;" src="http://pics.kapihospital.de/roomlock.png" title="' + susiReminderToolTip + '">').appendTo('div#menu_miniicons');
    }
  }
  if (susiRestTime == -1 || KHConfigValues.susiAlertTime == -1) {
    if (jQuery('img#susireminder').length) {
      jQuery('img#susireminder').remove();
    }
    window.clearInterval(checkSusiFunction);
  }
}
//EndOpticalFixes
//Begin Script
injectScript();
injectScriptStart(injectStartReady);
//End Script