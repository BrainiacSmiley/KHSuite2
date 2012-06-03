// ==UserScript==
// @name          KHTimer
// @version       5.0
// @include       http://*.de.kapihospital.com/main.php*
// @include       http://de.kapihospital.com/*
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
    script.id = 'KHTimerStart';
    script.type = 'text/javascript';
    script.textContent += "(" + callback.toString() + ")();\n";
    document.body.appendChild (script);
  }
}
function injectStartReady() {
  initTimerFunction = window.setInterval("initTimer();", 100);
}
//Begin Injection
function injectScript() {
  var variablesToAdd = new Array();
  variablesToAdd.push("debugMode = false");
  variablesToAdd.push("finishedPatients = [0, 0, 0, 0, 0, 0, 0]");
  variablesToAdd.push("garageCounterCounted = false");
  variablesToAdd.push("loginFunction = 0");
  variablesToAdd.push("roomTimers = new Array()");
  variablesToAdd.push("KHConfigValues");
  variablesToAdd.push("userName");
  variablesToAdd.push("initTimerFunction");

  var functionsToAdd = new Array();
  functionsToAdd.push(addTimerOptions);
  functionsToAdd.push(generateTimerConfigOptions);
  functionsToAdd.push(getCookie);
  functionsToAdd.push(getEntryName);
  functionsToAdd.push(getFinishedPlaces);
  functionsToAdd.push(getMinTimerForFloor);
  functionsToAdd.push(getMinTimerForKH);
  functionsToAdd.push(getTimeString);
  functionsToAdd.push(getTimeStringShort);
  functionsToAdd.push(getTodaysDate);
  functionsToAdd.push(initTimer);
  functionsToAdd.push(progressDocumentTitle);
  functionsToAdd.push(progressFinishedPatientsCounter);
  functionsToAdd.push(progressFloorTimer);
  functionsToAdd.push(progressGarageFinished);
  functionsToAdd.push(progressGarageTimer);
  functionsToAdd.push(progressGarageTimerWindow);
  functionsToAdd.push(progressKHTimer);
  functionsToAdd.push(progressLogoutTimer);
  functionsToAdd.push(progressMainLoginWindow);
  functionsToAdd.push(progressMiniTimer);
  functionsToAdd.push(progressPortalLoginWindow);
  functionsToAdd.push(progressRoomTimer);
  functionsToAdd.push(progressSyncCounter);
  functionsToAdd.push(progressTimer);
  functionsToAdd.push(recogniseLoginWindows);
  functionsToAdd.push(recogniseTimerOptionsWindow);
  functionsToAdd.push(recogniseTimerWindows);
  functionsToAdd.push(resetCounter);
  functionsToAdd.push(saveKHTimerConfig);
  functionsToAdd.push(setCookie);
  functionsToAdd.push(setLoginTime);
  functionsToAdd.push(sortConfigMenu);
  functionsToAdd.push(storeKHConfigValues);
  functionsToAdd.push(submitMainLoginForm);
  functionsToAdd.push(submitPortalLoginForm);
  functionsToAdd.push(summArray);
  functionsToAdd.push(generateConfigBase);
  
  var script = document.createElement("script");
  script.id = 'KHTimer';
  script.type = 'text/javascript';
  
  for (var x = 0; x < variablesToAdd.length; x++) {
    script.textContent += ("var " + variablesToAdd[x] + ";\n");
  }
  
  script.textContent += "\n"
  
  for (var x = 0; x < functionsToAdd.length; x++) {
    if (typeof functionsToAdd[x] != 'undefined') {
      script.textContent += (functionsToAdd[x].toString() + "\n\n");
    }
  }
  document.body.appendChild(script);
}
//End Injection
//Begin KHTimer
function initTimer() {
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
    if (typeof KHConfigValues.garageEndTime == 'undefined') {
      KHConfigValues.garageEndTime = -1;
    }
    if (typeof KHConfigValues.garageLength == 'undefined') {
      KHConfigValues.garageLength = 0;
    }
    if (typeof KHConfigValues.garageCounter == 'undefined') {
      KHConfigValues.garageCounter = 0;
    }
    if (typeof KHConfigValues.garageFinished == 'undefined') {
      KHConfigValues.garageFinished = false;
    }
    if (typeof KHConfigValues.garageCounterDate == 'undefined') {
      KHConfigValues.garageCounterDate = getTodaysDate();
    } else if (KHConfigValues.garageCounterDate != getTodaysDate()) {
      KHConfigValues.garageCounterDate = getTodaysDate();
      KHConfigValues.garageCounter = 0;
    }
    if (typeof KHConfigValues.KHTimerConfig == 'undefined') {
      KHConfigValues.KHTimerConfig = true;
    }
    if (typeof KHConfigValues.FloorTimerConfig == 'undefined') {
      KHConfigValues.FloorTimerConfig = true;
    }
    if (typeof KHConfigValues.RoomTimerConfig == 'undefined') {
      KHConfigValues.RoomTimerConfig = true;
    }
    if (typeof KHConfigValues.GarageTimerConfig == 'undefined') {
      KHConfigValues.GarageTimerConfig = true;
    }
    if (typeof KHConfigValues.SusiTimerConfig == 'undefined') {
      KHConfigValues.SusiTimerConfig = true;
    }
    if (typeof KHConfigValues.FinishedTimerConfig == 'undefined') {
      KHConfigValues.FinishedTimerConfig = true;
    }
    if (typeof KHConfigValues.LogoutTimerConfig == 'undefined') {
      KHConfigValues.LogoutTimerConfig = true;
    }
    if (typeof KHConfigValues.LogoutTime == 'undefined') {
      KHConfigValues.LogoutTime = -1;
    }
    storedLogoutTime = getCookie("KHLogoutTime")
    if (storedLogoutTime != null) {
      KHConfigValues.LogoutTime = storedLogoutTime * 1
    }
    storeKHConfigValues();

    //Interval Function
    var loginFunction = window.setInterval("recogniseLoginWindows()", 200);
    
    if (window.document.location.pathname == "/main.php") {
      window.clearInterval(loginFunction);
      window.setInterval("recogniseTimerWindows()", 1000);
      window.setInterval("progressTimer()", 1000);
      window.setInterval("recogniseTimerOptionsWindow()", 200);
    }
    window.clearInterval(initTimerFunction);
    if (debugMode) {
      console.log("KHTimer loaded");
    }
  } else {
    if (debugMode) {
      console.log("KHTimer not loaded");
    }
  }
}
function storeKHConfigValues() {
  //remove old version from localStorage
  localStorage.removeItem('KHConfigValues' + userName);
  //write actual version to localStorage
  localStorage.setItem('KHConfigValues' + userName, JSON.stringify(KHConfigValues));
}
function recogniseTimerWindows() {
  if (jQuery('div#msgwindow').is(':visible')) {
    if (jQuery('div#ga_time').is(':visible')) {
      progressGarageTimerWindow();
    } else if (jQuery('div#ga_finished').is(':visible')) {
      progressGarageFinished();
    } else if (jQuery('div#ga_done').is(':visible')) {
      progressSyncCounter();
    }
  }
}
function recogniseTimerOptionsWindow() {
  if (jQuery('div#b').length && !jQuery('div#KHTimerOptions').length) {
    addTimerOptions();
  }
}
function recogniseLoginWindows() {
  if (jQuery('div#port_login_top').is(':visible')) {
    progressPortalLoginWindow();
  } else if (jQuery('form#login_form').is(':visible')) {
    progressMainLoginWindow();
  }
}
function progressPortalLoginWindow() {
  jQuery('#port_login_submit').attr('onclick', 'submitPortalLoginForm()');
  jQuery('#port_login_submit').attr('onkeypressed', 'submitPortalLoginForm()');
}
function progressMainLoginWindow() {
  jQuery('form#login_form').attr('onsubmit', 'return submitMainLoginForm()');
  jQuery('input[type="button"]', jQuery('form#login_form')).attr('onclick', 'submitMainLoginForm()');
}
function progressSyncCounter() {
  KHConfigValues.garageCounter = jQuery('div#ga_done').text().split(" ")[0]*1;
  storeKHConfigValues();
  progressGarageFinished();
}
function setLoginTime() {
  var cookieName = "KHLogoutTime"
  var now = Math.floor((new Date()).getTime()/1000)
  var logoutTime = now + 7200 + 4
  setCookie(cookieName, logoutTime, 100, "/", "." + window.location.hostname)
}
function submitPortalLoginForm() {
  setLoginTime();
  UpjersPortalFakeForm('log');
}
function submitMainLoginForm() {
  setLoginTime();
  return checkFormAndSubmit('login_form');
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
function addTimerOptions() {
  //check if ConfigBase present
  if (!jQuery('ul#KHOptions').length) {
    jQuery(generateConfigBase()).insertAfter('div#b');
  }

  //add AdvancedAssignment Options to ConfigBase
  jQuery(generateTimerConfigOptions()).appendTo('div#KHOptionsContent');
  jQuery('<li><a href="#KHTimerOptions" data-toggle="tab">KHTimer</a></li>').appendTo('ul#toolsMenu');
  jQuery('#toolsMenu').parent().show();
  sortConfigMenu();

  //set Timer Options
  if(KHConfigValues.KHTimerConfig) {
    jQuery('#KHTimerConfig:checkbox').val(["true"]);
  }
  if(KHConfigValues.FloorTimerConfig) {
    jQuery('#FloorTimerConfig:checkbox').val(["true"]);
  }
  if(KHConfigValues.RoomTimerConfig) {
    jQuery('#RoomTimerConfig:checkbox').val(["true"]);
  }
  if(KHConfigValues.GarageTimerConfig) {
    jQuery('#GarageTimerConfig:checkbox').val(["true"]);
  }
  if(KHConfigValues.SusiTimerConfig) {
    jQuery('#SusiTimerConfig:checkbox').val(["true"]);
  }
  if(KHConfigValues.FinishedTimerConfig) {
    jQuery('#FinishedTimerConfig:checkbox').val(["true"]);
  }
  if(KHConfigValues.LogoutTimerConfig) {
    jQuery('#LogoutTimerConfig:checkbox').val(["true"]);
  }
}
function saveKHTimerConfig() {
  if (!!jQuery('#KHTimerConfig:checked').val()) {
    KHConfigValues.KHTimerConfig = true;
  } else {
    KHConfigValues.KHTimerConfig = false;
  }

  if (!!jQuery('#FloorTimerConfig:checked').val()) {
    KHConfigValues.FloorTimerConfig = true;
  } else {
    KHConfigValues.FloorTimerConfig = false;
  }

  if (!!jQuery('#RoomTimerConfig:checked').val()) {
    KHConfigValues.RoomTimerConfig = true;
  } else {
    KHConfigValues.RoomTimerConfig = false;
  }

  if (!!jQuery('#GarageTimerConfig:checked').val()) {
    KHConfigValues.GarageTimerConfig = true;
  } else {
    KHConfigValues.GarageTimerConfig = false;
  }

  if (!!jQuery('#SusiTimerConfig:checked').val()) {
    KHConfigValues.SusiTimerConfig = true;
  } else {
    KHConfigValues.SusiTimerConfig = false;
  }

  if (!!jQuery('#FinishedTimerConfig:checked').val()) {
    KHConfigValues.FinishedTimerConfig = true;
  } else {
    KHConfigValues.FinishedTimerConfig = false;
  }

  if (!!jQuery('#LogoutTimerConfig:checked').val()) {
    KHConfigValues.LogoutTimerConfig = true;
  } else {
    KHConfigValues.LogoutTimerConfig = false;
  }
  storeKHConfigValues();
}
function progressGarageTimerWindow() {
  var now = Math.floor((new Date()).getTime()/1000)
  if (KHConfigValues.garageEndTime != now + Garage.ends) {
    KHConfigValues.garageEndTime = now + Garage.ends;
    KHConfigValues.garageLength = Garage.duration;
    KHConfigValues.garageFinished = false;
    storeKHConfigValues();
  }
}
function getTimeString(time) {
  hour = Math.floor(time / 3600);
  rest = time%3600;
  min = Math.floor(rest/ 60);
  sek = rest%60;
  if (hour < 10) {
    hourString = "0" + hour;
  } else {
    hourString = "" + hour;
  }
  if (min < 10) {
    minString = "0" + min;
  } else {
    minString = "" + min;
  }
  if (sek < 10) {
    sekString = "0" + sek;
  } else {
    sekString = "" + sek;
  }
  return hourString + ":" + minString + ":" + sekString;
}
function getTimeStringShort(time) {
  hour = Math.floor(time / 3600);
  rest = time%3600;
  min = Math.floor(rest/ 60);
  sek = rest%60;
  if (hour < 10) {
    hourString = "0" + hour;
  } else {
    hourString = "" + hour;
  }
  if (min < 10) {
    minString = "0" + min;
  } else {
    minString = "" + min;
  }
  if (sek < 10) {
    sekString = "0" + sek;
  } else {
    sekString = "" + sek;
  }
  return minString + ":" + sekString;
}
function getTodaysDate() {
  var today = new Date();
  return today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();
}
function progressGarageFinished() {
  if (!KHConfigValues.garageFinished) {
    KHConfigValues.garageEndTime = -1;
    KHConfigValues.garageLength = 0;
    KHConfigValues.garageCounter++;
    KHConfigValues.garageFinished = true;
    storeKHConfigValues();
  }
}
function getMinTimerForFloor(array) {
  min = 2147483647;
  for (var i = 52; i < array.length; i++) {
    if (array[i] != undefined) {
      if (min > array[i]) {
        min = array[i];
      }
    }
  }
  if (min == 2147483647) {
    return -1;
  } else {
    return min;
  }
}
function getMinTimerForKH(array) {
  min = new Array();
  min[0] = 2147483647;
  for (var i = 1; i < 18; i++) {
    if (array[1][i] != undefined) {
      if (min[0] > array[1][i]) {
        min[0] = array[1][i];
        min[1] = "S";
      }
    }
  }
  for (var i = 1; i < array.length; i++) {
    if (array[i] != undefined) {
      for (var j = 52; j < array[i].length; j++) {
        if (array[i][j] != undefined) {
          if (min[0] > array[i][j]) {
            min[0] = array[i][j];
            min[1] = ""+i;
          }
        }
      }
    }
  }
  if (min[0] == 2147483647) {
    min[0] = -1;
  }
  return min;
}
function resetCounter() {
  for (var i = 0; i < finishedPatients.length; i++) {
    finishedPatients[i] = 0;
  }
  jQuery('span#counter_kh').text("Fertige Behandlungen: 0");
}
function summArray(array) {
  sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}
function getFinishedPlaces() {
  finishedPlaces = "";
  for (var i = 0; i < finishedPatients.length; i++) {
    if (finishedPatients[0] > 0 && i == 0) {
      finishedPlaces += "S";
    }
    if (finishedPatients[i] > 0 && i > 0 && i < 6) {
      if (finishedPlaces != "" ) {
        finishedPlaces += " | " + i;
      } else {
        finishedPlaces += i;
      }
    }
    if (finishedPatients[6] > 0 && i == 6) {
      if (finishedPlaces != "" ) {
        finishedPlaces += " | G";
      } else {
        finishedPlaces += "G";
      }
    }
  }
  return finishedPlaces;
}
function progressGarageTimer(now) {
  if (!jQuery('div#gradient_border_garage').length && KHConfigValues.garageEndTime != -1) {
    if (KHConfigValues.GarageTimerConfig) {
      jQuery('<div id="gradient_border_garage" class="gradient_border" style="top:535px;left:539px;" onclick="script:show_page(\'garage\')"><div id="gradient_garage" class="gradient_small" style="width:0px;"><span id="timer_garage" class="medamount" style="position:absolute;font-size:9px;left:0px;top:-15px;background-color:white;width:90px;">&nbsp;</span></div></div>').appendTo('div#hospital_content');
    } else {
      jQuery('<div id="gradient_border_garage" class="gradient_border" style="top:535px;left:539px;display:none;" onclick="script:show_page(\'garage\')"><div id="gradient_garage" class="gradient_small" style="width:0px;display:none;"><span id="timer_garage" class="medamount" style="position:absolute;font-size:9px;left:0px;top:-15px;background-color:white;width:90px;display:none;">&nbsp;</span></div></div>').appendTo('div#hospital_content');
    }
  } else {
    if ((KHConfigValues.garageEndTime == -1 && jQuery('div#gradient_border_garage').length > 0) || !KHConfigValues.GarageTimerConfig) {
      jQuery('div#gradient_border_garage').remove();
    }
  }
  //Gradient and TimerValue for GarageTimer
  actualQuest = KHConfigValues.garageCounter + 1;
  if (now >= KHConfigValues.garageEndTime) {
    jQuery('div#gradient_garage').css('width','40px');
    jQuery('span#timer_garage').text(actualQuest + "/8 | Fertig!");
    if (!garageCounterCounted && jQuery('div#gradient_border_garage').length > 0) {
      finishedPatients[6]++;
      garageCounterCounted = true;
    }
  } else {
    var gradientPercent = Math.floor((KHConfigValues.garageLength-(KHConfigValues.garageEndTime-now)) / KHConfigValues.garageLength * 40);
    jQuery('div#gradient_garage').css('width', gradientPercent);
    jQuery('span#timer_garage').text(actualQuest + "/8 | " + getTimeString(KHConfigValues.garageEndTime-now));
    if ((KHConfigValues.garageEndTime-now) <= 30) {
      jQuery('span#timer_garage').css('background-color', 'green');
    }
    garageCounterCounted = false;
  }
}
function progressMiniTimer(now) {
  for (var i = 1; i < jQuery('div[id^=treatment]').length; i++) {
    actualID = jQuery(jQuery('div[id^=treatment]')[i]).attr('id');
    roomNr = actualID.split("r")[2];
    endTime = now + Global.refRooms._object["r"+roomNr].willend;
    if (!jQuery('span#timer_r' + roomNr).length) {
      //add Timer
      roomTimers[1][roomNr] = endTime;
      if (KHConfigValues.SusiTimerConfig) {
        jQuery('<span id="timer_r' + roomNr + '" class="medamount" style="position:absolute;font-size:9px;top:111px;left:' + (18 + (roomNr-1)*40) + 'px;background-color:white;width:32px;">&nbsp;</span>').appendTo('div#hospital_content');
      } else {
        jQuery('<span id="timer_r' + roomNr + '" class="medamount" style="position:absolute;font-size:9px;top:111px;left:' + (18 + (roomNr-1)*40) + 'px;background-color:white;width:32px;display:none">&nbsp;</span>').appendTo('div#hospital_content');
      }
    }
    //updateTime
    if (roomTimers[1][roomNr] > endTime) {
      roomTimers[1][roomNr] = endTime;
    }
    //Timer tick
    jQuery('span#timer_r' + roomNr).text("" + getTimeStringShort(roomTimers[1][roomNr]-now));
    if ((roomTimers[1][roomNr]-now) <= 30) {
      jQuery('span#timer_r' + roomNr).css('background-color', 'green');
    }
    
    //removeTimer
    if (jQuery('span#timer_r' + roomNr).length > 0 && !jQuery('div#treatmentr' + roomNr).length) {
      jQuery('span#timer_r' + roomNr).remove();
    }
  }
}
function progressRoomTimer(now) {
  for (var i = 0; i < jQuery('div[class^=gradient_border]').length; i++) {
    actualID = jQuery(jQuery('div[class^=gradient_border]')[i]).attr('id');
    if (actualID != "gradient_border_garage" && actualID != "questfortschritt_border") {
      roomNr = actualID.split("_")[2].replace("r","");
      endTime = now + Global.refRooms._object["r"+roomNr].willend;
      if (jQuery(jQuery('div[class^=gradient_border]')[i]).children().html() == "") {
        //add Timer
        roomTimers[Global.selectedFloor][roomNr] = endTime;
        if (KHConfigValues.RoomTimerConfig) {
          jQuery(jQuery('div[class^=gradient_border]')[i]).children().html('<span id="timer_r' + roomNr + '" class="medamount" style="position:absolute;font-size:9px;left:-1px;top:-15px;background-color:white;width:50px;">&nbsp;</span>');
        } else {
          jQuery(jQuery('div[class^=gradient_border]')[i]).children().html('<span id="timer_r' + roomNr + '" class="medamount" style="position:absolute;font-size:9px;left:-1px;top:-15px;background-color:white;width:50px;display:none">&nbsp;</span>');
        }
      }
      //updateTime
      if (roomTimers[Global.selectedFloor][roomNr] > endTime) {
        roomTimers[Global.selectedFloor][roomNr] = endTime;
      }
      //Timer tick
      jQuery(jQuery('div[class^=gradient_border]')[i]).children().children().text("" + getTimeString(roomTimers[Global.selectedFloor][roomNr]-now));
      if ((roomTimers[Global.selectedFloor][roomNr]-now) <= 30) {
        jQuery(jQuery('div[class^=gradient_border]')[i]).children().children().css('background-color', 'green');
      }
      //Timer ausblenden
      if (KHConfigValues.RoomTimerConfig) {
        jQuery(jQuery('div[class^=gradient_border]')[i]).children().children().show();
      } else {
        jQuery(jQuery('div[class^=gradient_border]')[i]).children().children().hide();
      }  
    }
  }
  //check if all timers in array still valid
  //check for abort
  for (var i = 1; i < 18; i++) {
    if (roomTimers[1][i] != undefined) {
      if (!jQuery('div#treatmentr' + i).length) {
        if (roomTimers[1][i] <= now) {
          finishedPatients[0]++;
        }
        roomTimers[1][i] = undefined;
        jQuery('span#timer_r' + i).remove();
      }
    }
  }
  //check for ending
  for (var i = 1; i < roomTimers.length; i++) {
    if (roomTimers[i] != undefined) {
      for (var j = 52; j < roomTimers[i].length; j++) {
        if (roomTimers[i][j] != undefined) {
          if (roomTimers[i][j] <= now) {
            finishedPatients[i]++;
            roomTimers[i][j] = undefined;
          }
        }
      }
    }
  }
}
function progressFloorTimer(now) {
  //shortestTimer per Floor
  roomTimers[Global.selectedFloor][0] = getMinTimerForFloor(roomTimers[Global.selectedFloor]);

  if (!jQuery('span#timer_floor').length && roomTimers[Global.selectedFloor][0] != -1) {
    if (KHConfigValues.FloorTimerConfig) {
      jQuery('<span id="timer_floor" class="medamount" style="position:absolute;font-size:9px;top:133px;left:32px;background-color:white;width:86px;">&nbsp;</span>').appendTo('div#hospital_content');
    } else {
      jQuery('<span id="timer_floor" class="medamount" style="position:absolute;font-size:9px;top:133px;left:32px;background-color:white;width:86px;display:none;">&nbsp;</span>').appendTo('div#hospital_content');
    }
  } else {
    if ((roomTimers[Global.selectedFloor][0] == -1 || !KHConfigValues.FloorTimerConfig) && jQuery('span#timer_floor').length > 0) {
      jQuery('span#timer_floor').remove();
    }
  }
  //FloorTimer tick
  jQuery('span#timer_floor').text("Etage: " + getTimeString(roomTimers[Global.selectedFloor][0]-now));
  if ((roomTimers[Global.selectedFloor][0]-now) <= 30) {
    jQuery('span#timer_floor').css('background-color', 'green');
  } else {
    jQuery('span#timer_floor').css('background-color', 'white');
  }
}
function progressKHTimer(now) {
  //shortestTimer KH
  roomTimers[0][0] = getMinTimerForKH(roomTimers)[0];
  roomTimers[0][1] = getMinTimerForKH(roomTimers)[1];
  //check if GarageTimer is the shortest
  if (jQuery('div#gradient_border_garage').length > 0 && KHConfigValues.garageEndTime >= now && KHConfigValues.GarageTimerConfig) {
    if (roomTimers[0][0] > KHConfigValues.garageEndTime || roomTimers[0][0] == -1) {
      roomTimers[0][0] = KHConfigValues.garageEndTime;
      roomTimers[0][1] = "G";
    }
  }
  if (!jQuery('span#timer_kh').length && roomTimers[0][0] != -1) {
    if (KHConfigValues.KHTimerConfig) {
      jQuery('<span id="timer_kh" class="medamount" title="S = Susi | 1-5 = Etage | G = Garage" style="position:absolute;font-size:9px;top:6px;left:32px;background-color:white;width:93px;">&nbsp;</span>').appendTo('div#hospital_content');
    } else {
      jQuery('<span id="timer_kh" class="medamount" title="S = Susi | 1-5 = Etage | G = Garage" style="position:absolute;font-size:9px;top:6px;left:32px;background-color:white;width:93px;display:none;">&nbsp;</span>').appendTo('div#hospital_content');
    }
  } else {
    if ((roomTimers[0][0] == -1 || !KHConfigValues.KHTimerConfig) && jQuery('span#timer_kh').length > 0) {
      jQuery('span#timer_kh').remove();
    }
  }
  //KHTimer tick
  jQuery('span#timer_kh').text("KH: " + getTimeString(roomTimers[0][0]-now) + " (" + roomTimers[0][1] + ")");
  if ((roomTimers[0][0]-now) <= 30) {
    jQuery('span#timer_kh').css('background-color', 'green');
  } else {
    jQuery('span#timer_kh').css('background-color', 'white');
  }
}
function progressDocumentTitle(now) {
  finishedPatientsTotal = summArray(finishedPatients);
  title = "Kapi Hospital"// - Deine kostenlose Browserspiel-Simulation im Krankenhaus!";
  if (roomTimers[0][0] != -1) {
    if (finishedPatientsTotal > 0) {
      document.title = getTimeString(roomTimers[0][0]-now) + " (" + roomTimers[0][1] + ")" + " | " + finishedPatientsTotal + " | " + title;
    } else {
      document.title = getTimeString(roomTimers[0][0]-now) + " (" + roomTimers[0][1] + ")" + " | " + title;
    }
  } else {
    if (finishedPatientsTotal > 0) {
      document.title = finishedPatientsTotal + " | " + title;
    } else {
      document.title = title;
    }
  }
}
function progressFinishedPatientsCounter() {
  if (!jQuery('span#counter_kh').length && (roomTimers[0][0] != -1 || finishedPatientsTotal > 0) && KHConfigValues.FinishedTimerConfig) {
    jQuery('<span id="counter_kh" class="medamount" title="S = Susi | 1-5 = Etage | G = Garage" onclick="resetCounter()" style="position:absolute;font-size:9px;top:6px;left:427px;background-color:white;width:260px;">&nbsp;</span>').appendTo('div#hospital_content');
  } else {
    if (((roomTimers[0][0] == -1 && finishedPatientsTotal === 0) || !KHConfigValues.FinishedTimerConfig) && jQuery('span#counter_kh').length > 0) {
      jQuery('span#counter_kh').remove();
    }
  }
  //PatientsCounter tick
  if (finishedPatientsTotal > 0) {
    jQuery('span#counter_kh').text("Fertige Behandlungen: " + finishedPatientsTotal + " (" + getFinishedPlaces() + ")");
  } else {
    jQuery('span#counter_kh').text("Fertige Behandlungen: " + finishedPatientsTotal);
  }
}
function progressLogoutTimer(now) {
  if (!jQuery('span#timer_logout').length && KHConfigValues.LogoutTimerConfig && KHConfigValues.LogoutTime != -1) {
    jQuery('<span id="timer_logout" class="medamount" title="Zeit bis zum automatischen Logout" style="position:absolute;font-size:9px;top:6px;left:152px;background-color:white;width:93px;">&nbsp;</span>').appendTo('div#hospital_content');
  } else {
    if (!KHConfigValues.LogoutTimerConfig) {
      jQuery('span#timer_logout').remove();
    }
  }
  //LogoutTimer tick
  if (KHConfigValues.LogoutTime-now > 0) {
    jQuery('span#timer_logout').text("Logout: " + getTimeString(KHConfigValues.LogoutTime-now));
  } else {
    jQuery('span#timer_logout').text("Bitte reloggen!");
  }
  if ((KHConfigValues.LogoutTime-now) <= 30) {
    jQuery('span#timer_logout').css('background-color', 'green');
  } else {
    jQuery('span#timer_logout').css('background-color', 'white');
  }
}
function progressTimer() {
  var now = Math.floor((new Date()).getTime()/1000);
  if (!roomTimers[Global.selectedFloor]) {
    roomTimers[Global.selectedFloor] = new Array();
  }
  if (!roomTimers[0]) {
    roomTimers[0] = new Array();
  }

  //GarageTimer
  progressGarageTimer(now);
  
  //MiniTimer
  progressMiniTimer(now);
    
  //RoomTimer
  progressRoomTimer(now);
  
  //FloorTimer
  progressFloorTimer(now);

  //KHTimer
  progressKHTimer(now);
  
  //Document Title
  progressDocumentTitle(now);
  
  //finishedPatientsCounter
  progressFinishedPatientsCounter();
  
  //LogoutTimer
  progressLogoutTimer(now);
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
function generateTimerConfigOptions() {
  htmlCode = "";
  htmlCode += "<div class=\"tab-pane\" id=\"KHTimerOptions\" style=\"margin-left:10px;margin-top:-18px;\">";
  htmlCode += "Timer:<input type=\"checkbox\" onchange=\"saveKHTimerConfig()\" value=\"true\" id=\"KHTimerConfig\" style=\"vertical-align:-2px;\">KH<input type=\"checkbox\" onchange=\"saveKHTimerConfig()\" value=\"true\" id=\"FloorTimerConfig\" style=\"vertical-align:-2px;\">Etage<input type=\"checkbox\" onchange=\"saveKHTimerConfig()\" value=\"true\" id=\"RoomTimerConfig\" style=\"vertical-align:-2px;\">Räume<input type=\"checkbox\" onchange=\"saveKHTimerConfig()\" value=\"true\" id=\"GarageTimerConfig\" style=\"vertical-align:-2px;\">Garage<input type=\"checkbox\" onchange=\"saveKHTimerConfig()\" value=\"true\" id=\"SusiTimerConfig\" style=\"vertical-align:-2px;\">Susi<input type=\"checkbox\" onchange=\"saveKHTimerConfig()\" value=\"true\" id=\"FinishedTimerConfig\" style=\"vertical-align:-2px;\">Fertige<input type=\"checkbox\" onchange=\"saveKHTimerConfig()\" value=\"true\" id=\"LogoutTimerConfig\" style=\"vertical-align:-2px;\">Logout";
  htmlCode += "</div>";
  return htmlCode;
}
function storeKHConfigValues() {
  //remove old version from localStorage
  localStorage.removeItem('KHConfigValues' + userName);
  //write actual version to localStorage
  localStorage.setItem('KHConfigValues' + userName, JSON.stringify(KHConfigValues));
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
//End KHTimer
//Begin Script
injectScript();
injectScriptStart(injectStartReady);
//End Script