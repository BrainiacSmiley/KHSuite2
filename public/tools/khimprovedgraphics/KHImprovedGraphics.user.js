// ==UserScript==
// @name          KHImprovedGraphics
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
    script.id = 'KHIMprovedGraphicsStart';
    script.type = 'text/javascript';
    script.textContent += "(" + callback.toString() + ")();\n";
    document.body.appendChild (script);
  }
}
function injectStartReady() {
  initImprovedGraphicsFunction = window.setInterval("initImprovedGraphics();", 100);
}
//Begin Injection
function injectScript() {
  var variablesToAdd = new Array();
  variablesToAdd.push("debugMode");
  variablesToAdd.push("KHConfigValues");
  variablesToAdd.push("userName");
  variablesToAdd.push("initImprovedGraphicsFunction");

  var functionsToAdd = new Array();
  functionsToAdd.push(changeCleaningWagon);
  functionsToAdd.push(changeGraphics);
  functionsToAdd.push(changeMassagebank);
  functionsToAdd.push(initImprovedGraphics);
  functionsToAdd.push(showAnimatedCoinRoom);
  functionsToAdd.push(upgradeRooms);
  functionsToAdd.push(recogniseImprovedGraphicsWindows);
  functionsToAdd.push(generateConfigBase);
  functionsToAdd.push(generateImprovedGraphicsConfigOptions);
  functionsToAdd.push(sortConfigMenu);
  functionsToAdd.push(saveImprovedGraphicsConfig);
  functionsToAdd.push(addImprovedGraphicsOptions);
  functionsToAdd.push(storeKHConfigValues);

  var script = document.createElement("script");
  script.id = 'KHImprovedGraphics';
  script.type = 'text/javascript';
  
  for (var x = 0; x < variablesToAdd.length; x++) {
    script.textContent += ("var " + variablesToAdd[x] + ";\n");
  }
  
  script.textContent += "\n"
  
  for (var x = 0; x < functionsToAdd.length; x++) {
    script.textContent += (functionsToAdd[x].toString() + "\n\n");
  }
  document.body.appendChild(script);
}
//End Injection
//Begin ImprovedGraphics
function initImprovedGraphics() {
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
    if (typeof KHConfigValues.changeCleaningWagon == 'undefined') {
      KHConfigValues.changeCleaningWagon = true;
    }
    if (typeof KHConfigValues.upgradeRoomGraphics == 'undefined') {
      KHConfigValues.upgradeRoomGraphics = true;
    }
    if (typeof KHConfigValues.changeMassage == 'undefined') {
      KHConfigValues.changeMassage = true;
    }
    storeKHConfigValues();

    //interval Functions
    window.setInterval("changeGraphics()", 200);
    window.setInterval("recogniseImprovedGraphicsWindows()", 200);
    window.clearInterval(initImprovedGraphicsFunction);
    if (debugMode) {
      console.log("KHImprovedGraphics loaded");
    }
  } else {
    if (debugMode) {
      console.log("KHImprovedGraphics not loaded");
    }
  }
}
function recogniseImprovedGraphicsWindows() {
  if (jQuery('div#b').length && !jQuery('div#KHImprovedGraphicsOptions').length) {
    addImprovedGraphicsOptions();
  }
}
function changeGraphics() {
  jQuery('[class^=room]', jQuery('div#hospital_content')).each(function () {
    if (KHConfigValues.changeCleaningWagon) {
      changeCleaningWagon(this);
    }
    if (KHConfigValues.changeMassage) {
      changeMassagebank(this);
    }
    if (KHConfigValues.upgradeRoomGraphics) {
      upgradeRooms(this);
    }
    showAnimatedCoinRoom(this);
  });
}
function changeCleaningWagon(room) {
  if (jQuery(room).css('background-image') == "url(http://pics.kapihospital.de/25.0.2.gif)" ||
      jQuery(room).css('background-image') == "url(\"http://pics.kapihospital.de/25.0.2.gif\")" ||
      jQuery(room).css('background-image') == "url(http://pics.kapihospital.de/25.0.3.1.gif)" ||
      jQuery(room).css('background-image') == "url(\"http://pics.kapihospital.de/25.0.3.1.gif\")") {
    jQuery(room).css('background-image', 'url(http://pics.kapihospital.de/41.0.2.gif)');
  }
}
function changeMassagebank(room) {
  if (jQuery(room).css('background-image') == "url(http://pics.kapihospital.de/31.0.2.gif)" ||
      jQuery(room).css('background-image') == "url(\"http://pics.kapihospital.de/31.0.2.gif\")" ||
      jQuery(room).css('background-image') == "url(http://pics.kapihospital.de/31.0.3.1.gif)" ||
      jQuery(room).css('background-image') == "url(\"http://pics.kapihospital.de/31.0.3.1.gif\")") {
    jQuery(room).css('background-image', 'url(http://pics.kapihospital.de/28.0.3.1.gif)');
  }
}
function showAnimatedCoinRoom(room) {
  roomID = jQuery(room).css('background-image').split("/")[3].split(".")[0]*1;
  grafikName = "";
  switch (roomID) {
    case 18:
      grafikName = roomID + ".0.2";
      break;
    case 19:
    case 20:
    case 21:
    case 28:
    case 31:
    case 32:
    case 37:
    case 42:
      grafikName = roomID + ".0.3.1";
      break;
  }
  if (grafikName != "") {
    jQuery(room).css('background-image', 'url(http://pics.kapihospital.de/' + grafikName + '.gif)');
  }
}
function upgradeRooms(room) {
  roomGrafik = jQuery(room).css('background-image').split("/")[3].split(".");
  roomID = roomGrafik[0]*1;
  if (roomGrafik[2] != 1) {
    switch (roomID) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 7:
      case 8:
      case 9:
      case 10:
      case 12:
      case 13:
      case 15:
      case 16:
      case 17:
      case 39:
        roomGrafik[1] = 3;
        if (navigator.userAgent.toLowerCase().indexOf("firefox") != -1) {
          jQuery(room).css('background-image', 'url("http://pics.kapihospital.de/' + roomGrafik.join("."));
        } else {
          jQuery(room).css('background-image', 'url(http://pics.kapihospital.de/' + roomGrafik.join("."));
        }
        break;
      case 27:
        if (roomGrafik[2] = 3) {
          roomGrafik[3] = 3;
          jQuery(room).css('background-image', 'url(http://pics.kapihospital.de/' + roomGrafik.join("."));
        }
        break;
    }
  }
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
function addImprovedGraphicsOptions() {
  //check if ConfigBase present
  if (!jQuery('ul#KHOptions').length) {
    jQuery(generateConfigBase()).insertAfter('div#b');
  }

  //add AdvancedAssignment Options to ConfigBase
  jQuery(generateImprovedGraphicsConfigOptions()).appendTo('div#KHOptionsContent');
  jQuery('<li><a href="#KHImprovedGraphicsOptions" data-toggle="tab">KHImprovedGraphics</a></li>').appendTo('ul#toolsMenu');

  //show Menu
  jQuery('#toolsMenu').parent().show();
  sortConfigMenu();
  
  //set ImprovedGraphics Options
  if (KHConfigValues.changeCleaningWagon) {
    jQuery('#changeCleaningWagonConfig:checkbox').val(["true"]);
  }
  if (KHConfigValues.upgradeRoomGraphics) {
    jQuery('#upgradeRoomGraphicsConfig:checkbox').val(["true"]);
  }
  if (KHConfigValues.changeMassage) {
    jQuery('#changeMassageConfig:checkbox').val(["true"]);
  }
}
function generateImprovedGraphicsConfigOptions() {
  htmlCode = "";
  htmlCode += "<div class=\"tab-pane\" id=\"KHImprovedGraphicsOptions\" style=\"margin-left:10px;margin-top:-18px;\">";
  htmlCode += "  Sylvester Blume statt Putzwagen: <input type=\"checkbox\" value=\"true\" id=\"changeCleaningWagonConfig\" onChange=\"saveImprovedGraphicsConfig()\" style=\"vertical-align:-2px;\"><br />";
  htmlCode += "  Lese Sessel statt Massageliege: <input type=\"checkbox\" value=\"true\" id=\"changeMassageConfig\" onChange=\"saveImprovedGraphicsConfig()\" style=\"vertical-align:-2px;\"><br />";
  htmlCode += "  Maximale Upgrade Grafik für die Räume: <input type=\"checkbox\" value=\"true\" id=\"upgradeRoomGraphicsConfig\" onChange=\"saveImprovedGraphicsConfig()\" style=\"vertical-align:-2px;\"><br />";
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
function saveImprovedGraphicsConfig() {
  if (!!jQuery('#changeCleaningWagonConfig:checked').val()) {
    KHConfigValues.changeCleaningWagon = true;
  } else {
    KHConfigValues.changeCleaningWagon = false;
  }
  if (!!jQuery('#upgradeRoomGraphicsConfig:checked').val()) {
    KHConfigValues.upgradeRoomGraphics = true;
  } else {
    KHConfigValues.upgradeRoomGraphics = false;
  }
  if (!!jQuery('#changeMassageConfig:checked').val()) {
    KHConfigValues.changeMassage = true;
  } else {
    KHConfigValues.changeMassage = false;
  }

  storeKHConfigValues();
  lastFloor = -1;
}
//End ImprovedGraphics
//Begin Script
injectScript();
injectScriptStart(injectStartReady);
//End Script