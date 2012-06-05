// ==UserScript==
// @name          KHAdvancedMemberlist
// @version       1.0
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
    script.id = 'KHAdvancedMemberlistStart';
    script.type = 'text/javascript';
    script.textContent += "(" + callback.toString() + ")();\n";
    document.body.appendChild (script);
  }
}
function injectStartReady() {
  initAdvancedMemberlistFunction = window.setInterval("initAdvancedMemberlist();", 100);
}
//Begin Injection
function injectScript() {
  var variablesToAdd = new Array();
  variablesToAdd.push("debugMode");
  variablesToAdd.push("KHConfigValues");
  variablesToAdd.push("userName");
  variablesToAdd.push("initAdvancedMemberlistFunction");

  var functionsToAdd = new Array();
  functionsToAdd.push(addAdvancedMemberlistOptions);
  functionsToAdd.push(daysBetweenDates);
  functionsToAdd.push(initAdvancedMemberlist);
  functionsToAdd.push(formatMemberlist);
  functionsToAdd.push(generateAdvancedMemberlistConfigOptions);
  functionsToAdd.push(generateConfigBase);
  functionsToAdd.push(getMemberlistFooter);
  functionsToAdd.push(getMemberlistHeader);
  functionsToAdd.push(getMemberRow);
  functionsToAdd.push(getStatusIcon);
  functionsToAdd.push(saveAdvancedMemberlistConfig);
  functionsToAdd.push(sortConfigMenu);
  functionsToAdd.push(storeKHConfigValues);
  functionsToAdd.push(recogniseAdvancedMemberlistWindows);

  var script = document.createElement("script");
  script.id = 'KHAdvancedMemberlist';
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
//Begin AdvancedMemberlist
function initAdvancedMemberlist() {
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
    if (typeof KHConfigValues.timeSpanGreen == 'undefined') {
      KHConfigValues.timeSpanGreen = 7;
    }
    if (typeof KHConfigValues.timeSpanYellow == 'undefined') {
      KHConfigValues.timeSpanYellow = 14;
    }
    if (typeof KHConfigValues.timeSpanOrange == 'undefined') {
      KHConfigValues.timeSpanOrange = 28;
    }
    if (typeof KHConfigValues.timeSpanRed == 'undefined') {
      KHConfigValues.timeSpanRed = 90;
    }
    storeKHConfigValues();

    //interval Functions
    window.setInterval("recogniseAdvancedMemberlistWindows()", 200);
    window.clearInterval(initAdvancedMemberlistFunction);
    if (debugMode) {
      console.log("KHAdvancedMemberlist loaded");
    }
  } else {
    if (debugMode) {
      console.log("KHAdvancedMemberlist not loaded");
    }
  }
}
function recogniseAdvancedMemberlistWindows() {
  if (jQuery('div#g_members').is(':visible') && !jQuery('table', jQuery('div#g_members')).length) {
    formatMemberlist();
  } else if (jQuery('div#b').length && !jQuery('div#KHAdvancedMemberlistOptions').length) {
    addAdvancedMemberlistOptions();
  }
}
function formatMemberlist() {
  newMemberlist = "";
  oldMemberlist = jQuery('div#g_members').children().remove();

  newMemberlist += getMemberlistHeader();
  breakPoint = 0;
  for (var i = 0; i < oldMemberlist.length ; i++) {
    if (jQuery(oldMemberlist[i]).get(0).tagName == "B") {
      breakPoint = i-1;
      break;
    }
    if (jQuery(oldMemberlist[i]).get(0).tagName != "BR") {
      newMemberlist += getMemberRow(oldMemberlist[i]);
    }
  }
  
  newMemberlist += getMemberlistFooter();
  jQuery(newMemberlist).appendTo('div#g_members');
  jQuery(oldMemberlist.splice(breakPoint, oldMemberlist.length-breakPoint)).appendTo('div#g_members');
  jQuery('div[class=cursorclickable]', jQuery('div#g_members')).css('float','');
}
function getMemberlistHeader() {
  htmlCode = "";
  htmlCode += "<table cellspacing=\"0\";>";
  htmlCode += "<tr>";
  htmlCode += "<td width=\"170\" style=\"font-weight:bold;border-bottom: 1px solid black;border-right: 1px solid black;\">Arztname</td>";
  htmlCode += "<td width=\"25\" style=\"text-align:center;font-weight:bold;border-bottom: 1px solid black;border-right: 1px solid black;\">NP</td>";
  htmlCode += "<td width=\"25\" style=\"text-align:center;font-weight:bold;border-bottom: 1px solid black;border-right: 1px solid black;\">Lvl</td>";
  htmlCode += "<td width=\"85\" style=\"text-align:center;font-weight:bold;border-bottom: 1px solid black;border-right: 1px solid black;\">Login</td>";
  htmlCode += "<td width=\"50\" style=\"text-align:center;font-weight:bold;border-bottom: 1px solid black;border-right: 1px solid black;\">Status</td>";
  htmlCode += "<td width=\"50\" style=\"text-align:center;font-weight:bold;border-bottom: 1px solid black;\">Admin</td>";
  htmlCode += "</tr>";
  return htmlCode;
}
function getMemberlistFooter() {
  htmlCode = "";
  htmlCode += "</table>";
  return htmlCode;
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
function getStatusIcon(login) {
  dateArray = login.split(".");
  loginDate = new Date(dateArray[2]*1, (dateArray[1]*1)-1, (dateArray[0]*1)+1);
  today = new Date();
  timeSinceLogin = daysBetweenDates(loginDate, today);
  
  if (timeSinceLogin <= KHConfigValues.timeSpanGreen) {
    return "<div title=\"Innerhalb von " + KHConfigValues.timeSpanGreen + " Tagen eingeloggt\" style=\"position:relative;left:0px;top:1px;width:13px;height:13px;overflow:hidden\" class=\"cursorclickable\"><img src=\"http://pics.kapihospital.de/mood.png\" width=\"156\" height=\"13\" style=\"position:absolute;left:-143px;\"></div>";
  } else if (timeSinceLogin <= KHConfigValues.timeSpanYellow) {
    return "<div title=\"Innerhalb von " + KHConfigValues.timeSpanYellow + " Tagen eingeloggt\" style=\"position:relative;left:0px;top:1px;width:13px;height:13px;overflow:hidden\" class=\"cursorclickable\"><img src=\"http://pics.kapihospital.de/mood.png\" width=\"156\" height=\"13\" style=\"position:absolute;left:-78px;\"></div>";
  } else if (timeSinceLogin <= KHConfigValues.timeSpanOrange) {
    return "<div title=\"Innerhalb von " + KHConfigValues.timeSpanOrange + " Tagen eingeloggt\" style=\"position:relative;left:0px;top:1px;width:13px;height:13px;overflow:hidden\" class=\"cursorclickable\"><img src=\"http://pics.kapihospital.de/mood.png\" width=\"156\" height=\"13\" style=\"position:absolute;left:-26px;\"></div>";
  } else if (timeSinceLogin <= KHConfigValues.timeSpanRed) {
    return "<div title=\"Innerhalb von " + KHConfigValues.timeSpanRed + " Tagen eingeloggt\" style=\"position:relative;left:0px;top:1px;width:13px;height:13px;overflow:hidden\" class=\"cursorclickable\"><img src=\"http://pics.kapihospital.de/mood.png\" width=\"156\" height=\"13\" style=\"position:absolute;left:-13px;\"></div>";
  } else if (timeSinceLogin > KHConfigValues.timeSpanRed) {
    return "<div title=\"Länger als " + KHConfigValues.timeSpanRed + " Tage nicht eingeloggt\" style=\"position:relative;left:0px;top:1px;width:13px;height:13px;overflow:hidden\" class=\"cursorclickable\"><img src=\"http://pics.kapihospital.de/mood.png\" width=\"156\" height=\"13\" style=\"position:absolute;left:0px;\"></div>";
  }  
}
function getMemberRow(oldEntry) {
  name = jQuery(jQuery(oldEntry).children()[0]).text().trim();
  onlineIcon = jQuery(jQuery(jQuery(oldEntry).children()[0]).children()[0]).get(0).outerHTML;
  if (jQuery(jQuery(oldEntry).children()[0]).children().length > 1) {
    np = jQuery(jQuery(jQuery(oldEntry).children()[0]).children()[1]).get(0).outerHTML;
  } else {
    np = "";
  }
  level = jQuery(jQuery(oldEntry).children()[1]).text().split("(")[1].split(")")[0].trim();
  levelString = jQuery(jQuery(oldEntry).children()[1]).text().split("(")[0].split("[")[1].trim();
  login = jQuery(jQuery(oldEntry).children()[1]).text().split("(")[2].split(")")[0];
  status = getStatusIcon(login);
  if (!jQuery(jQuery(oldEntry).children()[2]).length) {
    admin = "";
  } else {
    admin = jQuery(jQuery(oldEntry).children()[2]).get(0).outerHTML;
  }
  htmlCode = "";
  htmlCode += "<tr>";
  htmlCode += "<td style=\"border-right: 1px solid black;\">" + name + "</td>";
  htmlCode += "<td style=\"border-right: 1px solid black;\" align=\"center\">" + np + "</td>";
  htmlCode += "<td style=\"border-right: 1px solid black;\" align=\"center\"><div title=\"" + levelString + "\">" + level + "</div></td>";
  htmlCode += "<td style=\"border-right: 1px solid black;\" align=\"center\">" + login + "&nbsp" + onlineIcon + "</td>";
  htmlCode += "<td style=\"border-right: 1px solid black;\" align=\"center\">" + status + "</td>";
  htmlCode += "<td>" + admin + "</td>";
  htmlCode += "</tr>";
  return htmlCode;
}
function storeKHConfigValues() {
  //remove old version from localStorage
  localStorage.removeItem('KHConfigValues' + userName);
  //write actual version to localStorage
  localStorage.setItem('KHConfigValues' + userName, JSON.stringify(KHConfigValues));
}
function addAdvancedMemberlistOptions() {
  //check if ConfigBase present
  if (!jQuery('ul#KHOptions').length) {
    jQuery(generateConfigBase()).insertAfter('div#b');
  }

  //add AdvancedMembelist Options to ConfigBase
  jQuery(generateAdvancedMemberlistConfigOptions()).appendTo('div#KHOptionsContent');
  jQuery('<li><a href="#KHAdvancedMemberlistOptions" data-toggle="tab">KHAdvancedMemberlist</a></li>').appendTo('ul#toolsMenu');
  jQuery('#toolsMenu').parent().show();
  sortConfigMenu();
  
  //set AdvancedMemberlist Options
  jQuery('#TimeSpanGreenConfig').val(KHConfigValues.timeSpanGreen);
  jQuery('#TimeSpanYellowConfig').val(KHConfigValues.timeSpanYellow);
  jQuery('#TimeSpanOrangeConfig').val(KHConfigValues.timeSpanOrange);
  jQuery('#TimeSpanRedConfig').val(KHConfigValues.timeSpanRed);
}
function generateAdvancedMemberlistConfigOptions() {
  htmlCode = "";
  htmlCode += "<div class=\"tab-pane\" id=\"KHAdvancedMemberlistOptions\" style=\"margin-left:10px;margin-top:-18px;\">";
  htmlCode += "    <table cellspacing=\"0\" cellpadding=\"0\">";
  htmlCode += "    <tr>";
  htmlCode += "    <td width=\"18\">";
  htmlCode += "      <div style=\"width:13px;height:13px;overflow:hidden\" class=\"cursorclickable\">";
  htmlCode += "        <img src=\"http://pics.kapihospital.de/mood.png\" width=\"156\" height=\"13\" style=\"position:relative;left:-143px;overflow:hidden\">";
  htmlCode += "      </div>";
  htmlCode += "    </td>";
  htmlCode += "    <td>";
  htmlCode += "      <input type=\"number\" value=\"7\" id=\"TimeSpanGreenConfig\" onchange=\"saveAdvancedMemberlistConfig()\" style=\"width:40px;\"> Tage";
  htmlCode += "    </td>";
  htmlCode += "    <td width=\"8\">&nbsp;</td>";
  htmlCode += "    <td width=\"18\">";
  htmlCode += "      <div style=\"width:13px;height:13px;overflow:hidden\" class=\"cursorclickable\">";
  htmlCode += "        <img src=\"http://pics.kapihospital.de/mood.png\" width=\"156\" height=\"13\" style=\"position:relative;left:-78px;overflow:hidden\">";
  htmlCode += "      </div>";
  htmlCode += "    </td>";
  htmlCode += "    <td>";
  htmlCode += "      <input type=\"number\" value=\"14\" id=\"TimeSpanYellowConfig\" onchange=\"saveAdvancedMemberlistConfig()\" style=\"width:40px;\"> Tage";
  htmlCode += "    </td>";
  htmlCode += "    <td width=\"8\">&nbsp;</td>";
  htmlCode += "    <td width=\"18\">";
  htmlCode += "      <div style=\"width:13px;height:13px;overflow:hidden\" class=\"cursorclickable\">";
  htmlCode += "        <img src=\"http://pics.kapihospital.de/mood.png\" width=\"156\" height=\"13\" style=\"position:relative;left:-26px;overflow:hidden\">";
  htmlCode += "      </div>";
  htmlCode += "    </td>";
  htmlCode += "    <td>";
  htmlCode += "      <input type=\"number\" value=\"28\" id=\"TimeSpanOrangeConfig\" onchange=\"saveAdvancedMemberlistConfig()\" style=\"width:40px;\"> Tage";
  htmlCode += "    </td>";
  htmlCode += "    <td width=\"8\">&nbsp;</td>";
  htmlCode += "    <td width=\"18\">";
  htmlCode += "      <div style=\"width:13px;height:13px;overflow:hidden\" class=\"cursorclickable\">";
  htmlCode += "        <img src=\"http://pics.kapihospital.de/mood.png\" width=\"156\" height=\"13\" style=\"position:relative;left:-13px;overflow:hidden\">";
  htmlCode += "      </div>";
  htmlCode += "    </td>";
  htmlCode += "    <td>";
  htmlCode += "      <input type=\"number\" value=\"90\" id=\"TimeSpanRedConfig\" onchange=\"saveAdvancedMemberlistConfig()\" style=\"width:40px;\"> Tage";
  htmlCode += "    </td>";
  htmlCode += "  </tr>";
  htmlCode += "  </table>";
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
function saveAdvancedMemberlistConfig() {
  KHConfigValues.timeSpanGreen = jQuery('#TimeSpanGreenConfig').val();
  KHConfigValues.timeSpanYellow = jQuery('#TimeSpanYellowConfig').val();
  KHConfigValues.timeSpanOrange = jQuery('#TimeSpanOrangeConfig').val();
  KHConfigValues.timeSpanRed = jQuery('#TimeSpanRedConfig').val();

  storeKHConfigValues();
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
//End AdvancedMemberlist
//Begin Script
injectScript();
injectScriptStart(injectStartReady);
//End Script