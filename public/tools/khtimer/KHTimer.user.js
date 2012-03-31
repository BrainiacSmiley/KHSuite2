// ==UserScript==
// @name          KHTimer
// @version       4.1.1
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
    initKHTimer()
    
    //Interval Function
    window.setInterval("recogniseTimerWindows()", 1000)
    window.setInterval("progressTimer()", 1000)
    window.setInterval("recogniseTimerOptionsWindow()", 200)
    loginFunction = window.setInterval("recogniseLoginWindows()", 200)
    
    if (window.document.location.pathname == "/main.php") {
      window.clearInterval(loginFunction)
    }
  })
}
//Begin Injection
var variablen = new Array()
variablen.push("garageEndTime")
variablen.push("garageLength")
variablen.push("garageCounter")
variablen.push("garageCounterDate")
variablen.push("garageFinished = false")
variablen.push("roomTimers = new Array()")
variablen.push("finishedPatients = [0, 0, 0, 0, 0, 0, 0]")
variablen.push("garageCounterCounted = false")
variablen.push("KHTimerConfig = false")
variablen.push("FloorTimerConfig = false")
variablen.push("RoomTimerConfig = false")
variablen.push("GarageTimerConfig = false")
variablen.push("SusiTimerConfig = false")
variablen.push("FinishedTimerConfig = false")
variablen.push("LogoutTimerConfig = false")
variablen.push("LogoutTime = 0")
variablen.push("loginFunction = 0")
variablen.push("detectMainWindowFunction = 0")

function addFunctions() {
  var functionsToAdd = new Array(initKHTimer, recogniseTimerWindows, recogniseLoginWindows, recogniseTimerOptionsWindow, progressSyncCounter, progressPortalLoginWindow, progressMainLoginWindow, progressGarageTimerWindow, progressGarageFinished, progressKHTimerAccountOptionsWindow, setLoginCookie, submitPortalLoginForm, submitMainLoginForm, getTimeString, getTimeStringShort, getTodaysDate, resetCounter, progressTimer, setKHTimerCookies, getMinTimerForFloor, getMinTimerForKH, saveKHTimerConfig, summArray, getFinishedPlaces, setCookie, getCookie)
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
//Begin KHTimer
function initKHTimer() {
  storedGarageEndTime = getCookie("KHGarageEndTime" + jQuery('#username').text())
  if (storedGarageEndTime != null) {
    garageEndTime = storedGarageEndTime
  } else {
    garageEndTime = -1
  }
  storedGarageLength = getCookie("KHGarageLength" + jQuery('#username').text())
  if (storedGarageLength != null) {
    garageLength = storedGarageLength
  } else {
    garageLength = 0
  }
  
  storedGarageCounter = getCookie("KHGarageCounter" + jQuery('#username').text())
  if (storedGarageCounter != null) {
    garageCounter = storedGarageCounter*1
  } else {
    garageCounter = 0
  }

  storedGarageFinished = getCookie("KHGarageFinished" + jQuery('#username').text())
  if (storedGarageFinished != null) {
    if (storedGarageFinished == "true") {
      garageFinished = true
    } else if (storedGarageFinished == "false") {
      garageFinished = false
    }
  } else {
    garageFinished = false
  }

  storedGarageCounterDate = getCookie("KHGarageCounterDate" + jQuery('#username').text())
  if (storedGarageCounterDate != null) {
    garageCounterDate = storedGarageCounterDate
  } else {
    garageCounterDate = getTodaysDate()
  }
  if (garageCounterDate != getTodaysDate()) {
    garageCounterDate = getTodaysDate()
    garageCounter = 0
  }

  storedKHTimerConfig = getCookie("KHTimerConfig" + jQuery('#username').text())
  if (storedKHTimerConfig != null) {
    if (storedKHTimerConfig == "true") {
      KHTimerConfig = true
    } else if (storedKHTimerConfig == "false") {
      KHTimerConfig = false
    }
  } else {
    KHTimerConfig = true
  }

  storedFloorTimerConfig = getCookie("FloorTimerConfig" + jQuery('#username').text())
  if (storedFloorTimerConfig != null) {
    if (storedFloorTimerConfig == "true") {
      FloorTimerConfig = true
    } else if (storedFloorTimerConfig == "false") {
      FloorTimerConfig = false
    }
  } else {
    FloorTimerConfig = true
  }

  storedRoomTimerConfig = getCookie("RoomTimerConfig" + jQuery('#username').text())
  if (storedRoomTimerConfig != null) {
    if (storedRoomTimerConfig == "true") {
      RoomTimerConfig = true
    } else if (storedRoomTimerConfig == "false") {
      RoomTimerConfig = false
    }
  } else {
    RoomTimerConfig = true
  }

  storedGarageTimerConfig = getCookie("GarageTimerConfig" + jQuery('#username').text())
  if (storedGarageTimerConfig != null) {
    if (storedGarageTimerConfig == "true") {
      GarageTimerConfig = true
    } else if (storedGarageTimerConfig == "false") {
      GarageTimerConfig = false
    }
  } else {
    GarageTimerConfig = true
  }

  storedSusiTimerConfig = getCookie("SusiTimerConfig" + jQuery('#username').text())
  if (storedSusiTimerConfig != null) {
    if (storedSusiTimerConfig == "true") {
      SusiTimerConfig = true
    } else if (storedSusiTimerConfig == "false") {
      SusiTimerConfig = false
    }
  } else {
    SusiTimerConfig = true
  }

  storedFinishedTimerConfig = getCookie("FinishedTimerConfig" + jQuery('#username').text())
  if (storedFinishedTimerConfig != null) {
    if (storedFinishedTimerConfig == "true") {
      FinishedTimerConfig = true
    } else if (storedFinishedTimerConfig == "false") {
      FinishedTimerConfig = false
    }
  } else {
    FinishedTimerConfig = true
  }

  storedLogoutTimerConfig = getCookie("LogoutTimerConfig" + jQuery('#username').text())
  if (storedLogoutTimerConfig != null) {
    if (storedLogoutTimerConfig == "true") {
      LogoutTimerConfig = true
    } else if (storedLogoutTimerConfig == "false") {
      LogoutTimerConfig = false
    }
  } else {
    LogoutTimerConfig = true
  }

  storedLogoutTime = getCookie("KHLogoutTime")
  if (storedLogoutTime != null) {
    LogoutTime = storedLogoutTime * 1
  } else {
    LogoutTime = -1
  }
}
function recogniseTimerWindows() {
  if (jQuery('div#msgwindow').is(':visible')) {
    if (jQuery('div#ga_time').is(':visible')) {
      progressGarageTimerWindow()
    } else if (jQuery('div#ga_finished').is(':visible')) {
      progressGarageFinished()
    } else if (jQuery('div#ga_done').is(':visible')) {
      progressSyncCounter()
    }
  }
}
function recogniseTimerOptionsWindow() {
  if (jQuery('div#b').length && !jQuery('div#KHTimerOptions').length) {
    progressKHTimerAccountOptionsWindow()
  }
}
function recogniseLoginWindows() {
  if (jQuery('div#port_login_top').is(':visible')) {
    progressPortalLoginWindow()
  } else if (jQuery('form#login_form').is(':visible')) {
    progressMainLoginWindow()
  }
}
function progressPortalLoginWindow() {
  jQuery('#port_login_submit').attr('onclick', 'submitPortalLoginForm()')
  jQuery('#port_login_submit').attr('onkeypressed', 'submitPortalLoginForm()')
  
}
function progressMainLoginWindow() {
  jQuery('form#login_form').attr('onsubmit', 'return submitMainLoginForm()')
  jQuery('input[type="button"]', jQuery('form#login_form')).attr('onclick', 'submitMainLoginForm()')
}
function progressSyncCounter() {
  garageCounter = jQuery('div#ga_done').text().split(" ")[0]*1
  setKHTimerCookies()
}
function setLoginCookie() {
  var cookieName = "KHLogoutTime"
  var now = Math.floor((new Date()).getTime()/1000)
  var logoutTime = now + 7200 + 4
  setCookie(cookieName, logoutTime, 100, "/", "." + window.location.hostname)
}
function submitPortalLoginForm() {
  setLoginCookie()
  UpjersPortalFakeForm('log')
}
function submitMainLoginForm() {
  setLoginCookie()
  return checkFormAndSubmit('login_form')
}
function progressKHTimerAccountOptionsWindow() {
  if (!jQuery('div#KHOptions').length) {
    jQuery('<div id="KHOptions" style="margin-top: 60px;"></div>').insertAfter('div#b')
  }
  jQuery('<div id="KHTimerOptions">Timer:<input type="checkbox" onchange="saveKHTimerConfig()" value="true" id="KHTimerConfig">KH<input type="checkbox" onchange="saveKHTimerConfig()" value="true" id="FloorTimerConfig">Etage<input type="checkbox" onchange="saveKHTimerConfig()" value="true" id="RoomTimerConfig">Räume<input type="checkbox" onchange="saveKHTimerConfig()" value="true" id="GarageTimerConfig">Garage<input type="checkbox" onchange="saveKHTimerConfig()" value="true" id="SusiTimerConfig">Susi<input type="checkbox" onchange="saveKHTimerConfig()" value="true" id="FinishedTimerConfig">Fertige<input type="checkbox" onchange="saveKHTimerConfig()" value="true" id="LogoutTimerConfig">Logout</div></div>').appendTo('div#KHOptions')
  if(KHTimerConfig) {
    jQuery('#KHTimerConfig:checkbox').val(["true"])
  }
  if(FloorTimerConfig) {
    jQuery('#FloorTimerConfig:checkbox').val(["true"])
  }
  if(RoomTimerConfig) {
    jQuery('#RoomTimerConfig:checkbox').val(["true"])
  }
  if(GarageTimerConfig) {
    jQuery('#GarageTimerConfig:checkbox').val(["true"])
  }
  if(SusiTimerConfig) {
    jQuery('#SusiTimerConfig:checkbox').val(["true"])
  }
  if(FinishedTimerConfig) {
    jQuery('#FinishedTimerConfig:checkbox').val(["true"])
  }
  if(LogoutTimerConfig) {
    jQuery('#LogoutTimerConfig:checkbox').val(["true"])
  }
}
function saveKHTimerConfig() {
  if (!!jQuery('#KHTimerConfig:checked').val()) {
    KHTimerConfig = true
  } else {
    KHTimerConfig = false
  }
  var cookieName = "KHTimerConfig" + jQuery('#username').text()
  setCookie(cookieName, KHTimerConfig, 100, "/", window.location.hostname)

  if (!!jQuery('#FloorTimerConfig:checked').val()) {
    FloorTimerConfig = true
  } else {
    FloorTimerConfig = false
  }
  var cookieName = "FloorTimerConfig" + jQuery('#username').text()
  setCookie(cookieName, FloorTimerConfig, 100, "/", window.location.hostname)

  if (!!jQuery('#RoomTimerConfig:checked').val()) {
    RoomTimerConfig = true
  } else {
    RoomTimerConfig = false
  }
  var cookieName = "RoomTimerConfig" + jQuery('#username').text()
  setCookie(cookieName, RoomTimerConfig, 100, "/", window.location.hostname)

  if (!!jQuery('#GarageTimerConfig:checked').val()) {
    GarageTimerConfig = true
  } else {
    GarageTimerConfig = false
  }
  var cookieName = "GarageTimerConfig" + jQuery('#username').text()
  setCookie(cookieName, GarageTimerConfig, 100, "/", window.location.hostname)

  if (!!jQuery('#SusiTimerConfig:checked').val()) {
    SusiTimerConfig = true
  } else {
    SusiTimerConfig = false
  }
  var cookieName = "SusiTimerConfig" + jQuery('#username').text()
  setCookie(cookieName, SusiTimerConfig, 100, "/", window.location.hostname)

  if (!!jQuery('#FinishedTimerConfig:checked').val()) {
    FinishedTimerConfig = true
  } else {
    FinishedTimerConfig = false
  }
  var cookieName = "FinishedTimerConfig" + jQuery('#username').text()
  setCookie(cookieName, FinishedTimerConfig, 100, "/", window.location.hostname)

  if (!!jQuery('#LogoutTimerConfig:checked').val()) {
    LogoutTimerConfig = true
  } else {
    LogoutTimerConfig = false
  }
  var cookieName = "LogoutTimerConfig" + jQuery('#username').text()
  setCookie(cookieName, LogoutTimerConfig, 100, "/", window.location.hostname)
}
function progressGarageTimerWindow() {
  var now = Math.floor((new Date()).getTime()/1000)
  if (garageEndTime != now + Garage.ends) {
    garageEndTime = now + Garage.ends
    garageLength = Garage.duration
    garageFinished = false
    setKHTimerCookies()
  }
}
function getTimeString(time) {
  hour = Math.floor(time / 3600)
  rest = time%3600
  min = Math.floor(rest/ 60)
  sek = rest%60
  if (hour < 10) {
    hourString = "0" + hour
  } else {
    hourString = "" + hour
  }
  if (min < 10) {
    minString = "0" + min
  } else {
    minString = "" + min
  }
  if (sek < 10) {
    sekString = "0" + sek
  } else {
    sekString = "" + sek
  }
  return hourString + ":" + minString + ":" + sekString
}
function getTimeStringShort(time) {
  hour = Math.floor(time / 3600)
  rest = time%3600
  min = Math.floor(rest/ 60)
  sek = rest%60
  if (hour < 10) {
    hourString = "0" + hour
  } else {
    hourString = "" + hour
  }
  if (min < 10) {
    minString = "0" + min
  } else {
    minString = "" + min
  }
  if (sek < 10) {
    sekString = "0" + sek
  } else {
    sekString = "" + sek
  }
  return minString + ":" + sekString
}
function getTodaysDate() {
  var today = new Date()
  return today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear()
}
function progressGarageFinished() {
  if (!garageFinished) {
    garageEndTime = -1
    garageLength = 0
    garageCounter++
    garageFinished = true
    setKHTimerCookies()
  }
}
function setKHTimerCookies() {
  var cookieName = "KHGarageEndTime" + jQuery('#username').text()
  setCookie(cookieName, garageEndTime, 100, "/", window.location.hostname)
  var cookieName = "KHGarageLength" + jQuery('#username').text()
  setCookie(cookieName, garageLength, 100, "/", window.location.hostname)
  var cookieName = "KHGarageCounter" + jQuery('#username').text()
  setCookie(cookieName, garageCounter, 100, "/", window.location.hostname)
  var cookieName = "KHGarageCounterDate" + jQuery('#username').text()
  setCookie(cookieName, garageCounterDate, 100, "/", window.location.hostname)
  var cookieName = "KHGarageFinished" + jQuery('#username').text()
  setCookie(cookieName, garageFinished, 100, "/", window.location.hostname)
}
function getMinTimerForFloor(array) {
  min = 2147483647
  for (var i = 52; i < array.length; i++) {
    if (array[i] != undefined) {
      if (min > array[i]) {
        min = array[i]
      }
    }
  }
  if (min == 2147483647) {
    return -1
  } else {
    return min
  }
}
function getMinTimerForKH(array) {
  min = new Array()
  min[0] = 2147483647
  for (var i = 1; i < 18; i++) {
    if (array[1][i] != undefined) {
      if (min[0] > array[1][i]) {
        min[0] = array[1][i]
        min[1] = "S"
      }
    }
  }
  for (var i = 1; i < array.length; i++) {
    if (array[i] != undefined) {
      for (var j = 52; j < array[i].length; j++) {
        if (array[i][j] != undefined) {
          if (min[0] > array[i][j]) {
            min[0] = array[i][j]
            min[1] = ""+i
          }
        }
      }
    }
  }
  if (min[0] == 2147483647) {
    min[0] = -1
  }
  return min
}
function resetCounter() {
  for (var i = 0; i < finishedPatients.length; i++) {
    finishedPatients[i] = 0
  }
  jQuery('span#counter_kh').text("Fertige Behandlungen: 0")
}
function summArray(array) {
  sum = 0
  for (var i = 0; i < array.length; i++) {
    sum += array[i]
  }
  return sum
}
function getFinishedPlaces() {
  finishedPlaces = ""
  for (var i = 0; i < finishedPatients.length; i++) {
    if (finishedPatients[0] > 0 && i == 0) {
      finishedPlaces += "S"
    }
    if (finishedPatients[i] > 0 && i > 0 && i < 6) {
      if (finishedPlaces != "" ) {
        finishedPlaces += " | " + i
      } else {
        finishedPlaces += i
      }
    }
    if (finishedPatients[6] > 0 && i == 6) {
      if (finishedPlaces != "" ) {
        finishedPlaces += " | G"
      } else {
        finishedPlaces += "G"
      }
    }
  }
  return finishedPlaces
}
function progressTimer() {
  var now = Math.floor((new Date()).getTime()/1000)
  if (!roomTimers[Global.selectedFloor]) {
    roomTimers[Global.selectedFloor] = new Array()
  }
  if (!roomTimers[0]) {
    roomTimers[0] = new Array()
  }

  //GarageTimer
  if (!jQuery('div#gradient_border_garage').length && garageEndTime != -1) {
    if (GarageTimerConfig) {
      jQuery('<div id="gradient_border_garage" class="gradient_border" style="top:533px;left:539px;"><div id="gradient_garage" class="gradient_small" style="width:0px;"><span id="timer_garage" style="position:absolute;font-size:9px;left:-1px;top:-13px;background-color:white;width:80px;">&nbsp;</span></div></div>').appendTo('div#hospital_content')
    } else {
      jQuery('<div id="gradient_border_garage" class="gradient_border" style="top:533px;left:539px;"><div id="gradient_garage" class="gradient_small" style="width:0px;"><span id="timer_garage" style="position:absolute;font-size:9px;left:-1px;top:-13px;background-color:white;width:80px;display:none;">&nbsp;</span></div></div>').appendTo('div#hospital_content')
    }
  } else {
    if ((garageEndTime == -1 && jQuery('div#gradient_border_garage').length > 0)) {
      jQuery('div#gradient_border_garage').remove()
    }
  }
  //Gradient and TimerValue for GarageTimer
  actualQuest = garageCounter + 1
  if (now >= garageEndTime) {
    jQuery('div#gradient_garage').css('width','40px')
    jQuery('span#timer_garage').text(actualQuest + "/8 | Fertig!")
    if (!garageCounterCounted && jQuery('div#gradient_border_garage').length > 0) {
      finishedPatients[6]++
      garageCounterCounted = true
    }
  } else {
    var gradientPercent = Math.floor((garageLength-(garageEndTime-now)) / garageLength * 40)
    jQuery('div#gradient_garage').css('width', gradientPercent)
    jQuery('span#timer_garage').text(actualQuest + "/8 | " + getTimeString(garageEndTime-now))
    if ((garageEndTime-now) <= 30) {
      jQuery('span#timer_garage').css('background-color', 'green')
    }
    garageCounterCounted = false
  }
  
  //Mini-Timers
  for (var i = 1; i < jQuery('div[id^=treatment]').length; i++) {
    actualID = jQuery(jQuery('div[id^=treatment]')[i]).attr('id')
    roomNr = actualID.split("r")[2]
    endTime = now + Global.refRooms._object["r"+roomNr].willend
    if (!jQuery('span#timer_r' + roomNr).length) {
      //add Timer
      roomTimers[1][roomNr] = endTime
      if (SusiTimerConfig) {
        jQuery('<span id="timer_r' + roomNr + '" class="medamount" style="position:absolute;font-size:9px;top:111px;left:' + (18 + (roomNr-1)*40) + 'px;background-color:white;width:32px;">&nbsp;</span>').appendTo('div#hospital_content')
      } else {
        jQuery('<span id="timer_r' + roomNr + '" class="medamount" style="position:absolute;font-size:9px;top:111px;left:' + (18 + (roomNr-1)*40) + 'px;background-color:white;width:32px;display:none">&nbsp;</span>').appendTo('div#hospital_content')
      }
    }
    //updateTime
    if (roomTimers[1][roomNr] > endTime) {
      roomTimers[1][roomNr] = endTime
    }
    //Timer tick
    jQuery('span#timer_r' + roomNr).text("" + getTimeStringShort(roomTimers[1][roomNr]-now))
    if ((roomTimers[1][roomNr]-now) <= 30) {
      jQuery('span#timer_r' + roomNr).css('background-color', 'green')
    }
    
    //removeTimer
    if (jQuery('span#timer_r' + roomNr).length > 0 && !jQuery('div#treatmentr' + roomNr).length) {
    }
  }
    
  //RoomTimers
  for (var i = 0; i < jQuery('div[class^=gradient_border]').length; i++) {
    actualID = jQuery(jQuery('div[class^=gradient_border]')[i]).attr('id')
    if (actualID != "gradient_border_garage") {
      roomNr = actualID.split("_")[2].replace("r","")
      endTime = now + Global.refRooms._object["r"+roomNr].willend
      if (jQuery(jQuery('div[class^=gradient_border]')[i]).children().html() == "") {
        //add Timer
        roomTimers[Global.selectedFloor][roomNr] = endTime
        if (RoomTimerConfig) {
          jQuery(jQuery('div[class^=gradient_border]')[i]).children().html('<span id="timer_r' + roomNr + '" class="medamount" style="position:absolute;font-size:9px;left:-1px;top:-15px;background-color:white;width:50px;">&nbsp;</span>')
        } else {
          jQuery(jQuery('div[class^=gradient_border]')[i]).children().html('<span id="timer_r' + roomNr + '" class="medamount" style="position:absolute;font-size:9px;left:-1px;top:-15px;background-color:white;width:50px;display:none">&nbsp;</span>')
        }
      }
      //updateTime
      if (roomTimers[Global.selectedFloor][roomNr] > endTime) {
        roomTimers[Global.selectedFloor][roomNr] = endTime
      }
      //Timer tick
      jQuery(jQuery('div[class^=gradient_border]')[i]).children().children().text("" + getTimeString(roomTimers[Global.selectedFloor][roomNr]-now))
      if ((roomTimers[Global.selectedFloor][roomNr]-now) <= 30) {
        jQuery(jQuery('div[class^=gradient_border]')[i]).children().children().css('background-color', 'green')
      }
    }
  }
  //check if all timers in array still valid
  //check for abort
  for (var i = 1; i < 18; i++) {
    if (roomTimers[1][i] != undefined) {
      if (!jQuery('div#treatmentr' + i).length) {
        if (roomTimers[1][i] <= now) {
          finishedPatients[0]++
        }
        roomTimers[1][i] = undefined
        jQuery('span#timer_r' + i).remove()
      }
    }
  }
  //check for ending
  for (var i = 1; i < roomTimers.length; i++) {
    if (roomTimers[i] != undefined) {
      for (var j = 52; j < roomTimers[i].length; j++) {
        if (roomTimers[i][j] != undefined) {
          if (roomTimers[i][j] <= now) {
            finishedPatients[i]++
            roomTimers[i][j] = undefined
          }
        }
      }
    }
  }
  //shortestTimer per Floor
  roomTimers[Global.selectedFloor][0] = getMinTimerForFloor(roomTimers[Global.selectedFloor])

  //FloorTimer
  if (!jQuery('span#timer_floor').length && roomTimers[Global.selectedFloor][0] != -1) {
    if (FloorTimerConfig) {
      jQuery('<span id="timer_floor" class="medamount" style="position:absolute;font-size:9px;top:133px;left:32px;background-color:white;width:86px;">&nbsp;</span>').appendTo('div#hospital_content')
    } else {
      jQuery('<span id="timer_floor" class="medamount" style="position:absolute;font-size:9px;top:133px;left:32px;background-color:white;width:86px;display:none;">&nbsp;</span>').appendTo('div#hospital_content')
    }
  } else {
    if ((roomTimers[Global.selectedFloor][0] == -1 || !FloorTimerConfig) && jQuery('span#timer_floor').length > 0) {
      jQuery('span#timer_floor').remove()
    }
  }
  //FloorTimer tick
  jQuery('span#timer_floor').text("Etage: " + getTimeString(roomTimers[Global.selectedFloor][0]-now))
  if ((roomTimers[Global.selectedFloor][0]-now) <= 30) {
    jQuery('span#timer_floor').css('background-color', 'green')
  } else {
    jQuery('span#timer_floor').css('background-color', 'white')
  }

  //shortestTimer KH
  roomTimers[0][0] = getMinTimerForKH(roomTimers)[0]
  roomTimers[0][1] = getMinTimerForKH(roomTimers)[1]
  //check if GarageTimer is the shortest
  if (jQuery('div#gradient_border_garage').length > 0 && garageEndTime >= now) {
    if (roomTimers[0][0] > garageEndTime || roomTimers[0][0] == -1) {
      roomTimers[0][0] = garageEndTime
      roomTimers[0][1] = "G"
    }
  }
  //KHTimer
  if (!jQuery('span#timer_kh').length && roomTimers[0][0] != -1) {
    if (KHTimerConfig) {
      jQuery('<span id="timer_kh" class="medamount" title="S = Susi | 1-5 = Etage | G = Garage" style="position:absolute;font-size:9px;top:6px;left:32px;background-color:white;width:93px;">&nbsp;</span>').appendTo('div#hospital_content')
    } else {
      jQuery('<span id="timer_kh" class="medamount" title="S = Susi | 1-5 = Etage | G = Garage" style="position:absolute;font-size:9px;top:6px;left:32px;background-color:white;width:93px;display:none;">&nbsp;</span>').appendTo('div#hospital_content')
    }
  } else {
    if ((roomTimers[0][0] == -1 || !KHTimerConfig) && jQuery('span#timer_kh').length > 0) {
      jQuery('span#timer_kh').remove()
    }
  }
  //KHTimer tick
  jQuery('span#timer_kh').text("KH: " + getTimeString(roomTimers[0][0]-now) + " (" + roomTimers[0][1] + ")")
  if ((roomTimers[0][0]-now) <= 30) {
    jQuery('span#timer_kh').css('background-color', 'green')
  } else {
    jQuery('span#timer_kh').css('background-color', 'white')
  }
  
  //KHTimer in Document Title
  finishedPatientsTotal = summArray(finishedPatients)
  title = "Kapi Hospital"// - Deine kostenlose Browserspiel-Simulation im Krankenhaus!"
  if (roomTimers[0][0] != -1) {
    if (finishedPatientsTotal > 0) {
      document.title = getTimeString(roomTimers[0][0]-now) + " (" + roomTimers[0][1] + ")" + " | " + finishedPatientsTotal + " | " + title
    } else {
      document.title = getTimeString(roomTimers[0][0]-now) + " (" + roomTimers[0][1] + ")" + " | " + title
    }
  } else {
    if (finishedPatientsTotal > 0) {
      document.title = finishedPatientsTotal + " | " + title
    } else {
      document.title = title
    }
  }
  
  //finishedPatientsCounter
  if (!jQuery('span#counter_kh').length && (roomTimers[0][0] != -1 || finishedPatientsTotal > 0) && FinishedTimerConfig) {
    jQuery('<span id="counter_kh" class="medamount" title="S = Susi | 1-5 = Etage | G = Garage" onclick="resetCounter()" style="position:absolute;font-size:9px;top:6px;left:427px;background-color:white;width:260px;">&nbsp;</span>').appendTo('div#hospital_content')
  } else {
    if (((roomTimers[0][0] == -1 && finishedPatientsTotal === 0) || !FinishedTimerConfig) && jQuery('span#counter_kh').length > 0) {
      jQuery('span#counter_kh').remove()
    }
  }
  //PatientsCounter tick
  if (finishedPatientsTotal > 0) {
    jQuery('span#counter_kh').text("Fertige Behandlungen: " + finishedPatientsTotal + " (" + getFinishedPlaces() + ")")
  } else {
    jQuery('span#counter_kh').text("Fertige Behandlungen: " + finishedPatientsTotal)
  }
  
  //LogoutTimer
  if (!jQuery('span#timer_logout').length && LogoutTimerConfig && LogoutTime != -1) {
    jQuery('<span id="timer_logout" class="medamount" title="Zeit bis zum automatischen Logout" style="position:absolute;font-size:9px;top:6px;left:152px;background-color:white;width:93px;">&nbsp;</span>').appendTo('div#hospital_content')
  } else {
    if (!LogoutTimerConfig) {
      jQuery('span#timer_logout').remove()
    }
  }
  //LogoutTimer tick
  if (LogoutTime-now > 0) {
    jQuery('span#timer_logout').text("Logout: " + getTimeString(LogoutTime-now))
  } else {
    jQuery('span#timer_logout').text("Bitte reloggen!")
  }
  if ((LogoutTime-now) <= 30) {
    jQuery('span#timer_logout').css('background-color', 'green')
  } else {
    jQuery('span#timer_logout').css('background-color', 'white')
  }
}
//End KHTimer
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
//End Script