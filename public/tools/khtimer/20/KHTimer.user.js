// ==UserScript==
// @name          KHTimer
// @version       2.0
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
variablen.push("finishedPatients = 0")
variablen.push("garageCounterCounted = false")

function addFunctions() {
  var functionsToAdd = new Array(initKHTimer, recogniseTimerWindows, progressGarageTimerWindow, progressGarageFinished, getTimeString, getTimeStringShort, getTodaysDate, resetCounter, progressTimer, setKHTimerCookies, getMinTimerForFloor, getMinTimerForKH, setCookie, getCookie)
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
}
function recogniseTimerWindows() {
  if (jQuery('div#msgwindow').is(':visible')) {
    if (jQuery('div#ga_time').is(':visible')) {
      progressGarageTimerWindow()
    } else if(jQuery('div#ga_finished').is(':visible')) {
      progressGarageFinished()
    }
  }
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
  min = 2147483647
  for (var i = 1; i < 18; i++) {
    if (array[1][i] != undefined) {
      if (min > array[1][i]) {
        min = array[1][i]
      }
    }
  }
  for (var i = 1; i < array.length; i++) {
    if (array[i] != undefined) {
      for (var j = 52; j < array[i].length; j++) {
        if (array[i][j] != undefined) {
          if (min > array[i][j]) {
            min = array[i][j]
          }
        }
      }
    }
  }
  if (min == 2147483647) {
    return -1
  } else {
    return min
  }
}
function resetCounter() {
  finishedPatients = 0
  jQuery('span#counter_kh').text("Fertige Behandlungen: " + finishedPatients)
}
function progressTimer() {
  var now = Math.floor((new Date()).getTime()/1000)
  if (!roomTimers[Global.selectedFloor]) {
    roomTimers[Global.selectedFloor] = new Array()
  }

  //GarageTimer
  if (!jQuery('div#gradient_border_garage').length && garageEndTime != -1) {
    jQuery('<div id="gradient_border_garage" class="gradient_border" style="top:533px;left:539px;"><div id="gradient_garage" class="gradient_small" style="width:0px;"><span id="timer_garage" style="position:absolute;font-size:9px;left:-1px;top:-13px;background-color:white;width:80px;">&nbsp;</span></div></div>').appendTo('div#hospital_content')
  } else {
    if (garageEndTime == -1 && jQuery('div#gradient_border_garage').length > 0) {
      jQuery('div#gradient_border_garage').remove()
    }
  }
  //Gradient and TimerValue for GarageTimer
  actualQuest = garageCounter + 1
  if (now >= garageEndTime) {
    jQuery('div#gradient_garage').css('width','40px')
    jQuery('span#timer_garage').text(actualQuest + "/8 | Fertig!")
    if (!garageCounterCounted && jQuery('div#gradient_border_garage').length > 0) {
      finishedPatients++
      garageCounterCounted = true
    }
  } else {
    var gradientPercent = Math.floor((garageLength-(garageEndTime-now)) / garageLength * 40)
    jQuery('div#gradient_garage').css('width', gradientPercent)
    jQuery('span#timer_garage').text(actualQuest + "/8 | " + getTimeString(garageEndTime-now))
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
      jQuery('<span id="timer_r' + roomNr + '" class="medamount" style="position:absolute;font-size:9px;top:111px;left:' + (18 + (roomNr-1)*40) + 'px;background-color:white;width:32px;">&nbsp;</span>').appendTo('div#hospital_content')
    }
    //updateTime
    if (roomTimers[1][roomNr] > endTime) {
      roomTimers[1][roomNr] = endTime
    }
    //Timer tick
    jQuery('span#timer_r' + roomNr).text("" + getTimeStringShort(roomTimers[1][roomNr]-now))
    
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
        jQuery(jQuery('div[class^=gradient_border]')[i]).children().html('<span id="timer_r' + roomNr + '" class="medamount" style="position:absolute;font-size:9px;left:-1px;top:-15px;background-color:white;width:50px;">&nbsp;</span>')
      }
      //updateTime
      if (roomTimers[Global.selectedFloor][roomNr] > endTime) {
        roomTimers[Global.selectedFloor][roomNr] = endTime
      }
      //Timer tick
      jQuery(jQuery('div[class^=gradient_border]')[i]).children().children().text("" + getTimeString(roomTimers[Global.selectedFloor][roomNr]-now))
    }
  }
  //check if all timers in array still valid
  //check for abort
  for (var i = 1; i < 18; i++) {
    if (roomTimers[1][i] != undefined) {
      if (!jQuery('div#treatmentr' + i).length) {
        if (roomTimers[1][i] <= now) {
          finishedPatients++
        }
        roomTimers[1][i] = undefined
        jQuery('span#timer_r' + i).remove()
      }
    }
  }
  for (var i = 52; i < roomTimers[Global.selectedFloor].length; i++) {
    if (roomTimers[Global.selectedFloor][i] != undefined) {
      if (!jQuery('div#gradient_border_r' + i).length) {
        if (roomTimers[Global.selectedFloor][i] <= now) {
          finishedPatients++
        }
        roomTimers[Global.selectedFloor][i] = undefined
      }
    }
  }
  //check for ending
  for (var i = 1; i < roomTimers.length; i++) {
    if (roomTimers[i] != undefined) {
      for (var j = 52; j < roomTimers[i].length; j++) {
        if (roomTimers[i][j] != undefined) {
          if (roomTimers[i][j] <= now) {
            finishedPatients++
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
    jQuery('<span id="timer_floor" class="medamount" style="position:absolute;font-size:9px;top:133px;left:32px;background-color:white;width:86px;">&nbsp;</span>').appendTo('div#hospital_content')
  } else {
    if (roomTimers[Global.selectedFloor][0] == -1 && jQuery('span#timer_floor').length > 0) {
      jQuery('span#timer_floor').remove()
    }
  }
  //FloorTimer tick
  jQuery('span#timer_floor').text("Etage: " + getTimeString(roomTimers[Global.selectedFloor][0]-now))

  //shortestTimer KH
  roomTimers[0] = getMinTimerForKH(roomTimers)
  //check if GarageTimer is the shortest
  if (jQuery('div#gradient_border_garage').length > 0 && garageEndTime >= now) {
    if (roomTimers[0] > garageEndTime || roomTimers[0] == -1) {
      roomTimers[0] = garageEndTime
    }
  }
  //KHTimer
  if (!jQuery('span#timer_kh').length && roomTimers[0] != -1) {
    jQuery('<span id="timer_kh" class="medamount" style="position:absolute;font-size:9px;top:6px;left:32px;background-color:white;width:72px;">&nbsp;</span>').appendTo('div#hospital_content')
  } else {
    if ((roomTimers[0] == -1) && jQuery('span#timer_kh').length > 0) {
      jQuery('span#timer_kh').remove()
    }
  }
  //KHTimer tick
  jQuery('span#timer_kh').text("KH: " + getTimeString(roomTimers[0]-now))
  
  //KHTimer in Document Title
  if (roomTimers[0] != -1) {
    title = "Kapi Hospital - Deine kostenlose Browserspiel-Simulation im Krankenhaus!"
    if (finishedPatients > 0) {
      document.title = getTimeString(roomTimers[0]-now) + " | " + finishedPatients + " | "+ title
    } else {
      document.title = getTimeString(roomTimers[0]-now) + " | " + title
    }
  }
  
  //finishedPatientsCounter
  if (!jQuery('span#counter_kh').length && roomTimers[0] != -1) {
    jQuery('<span id="counter_kh" class="medamount" onclick="resetCounter()" style="position:absolute;font-size:9px;top:6px;left:122px;background-color:white;width:129px;">&nbsp;</span>').appendTo('div#hospital_content')
  } else {
    if ((roomTimers[0] == -1) && jQuery('span#counter_kh').length > 0) {
      jQuery('span#counter_kh').remove()
    }
  }
  //PatientsCounter tick
  jQuery('span#counter_kh').text("Fertige Behandlungen: " + finishedPatients)
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
/*
// How to get the gradients
jQuery('div[class^=gradient_border]').length

//Timer Code

for (var i = 0; i < Global.refRooms.values().length; i++) {
  if (Global.refRooms.values()[i].willend > 0 && Global.refRooms.values()[i].willend < 24*60*60) {
    console.log(Global.refRooms.values()[i].name + ": " + Global.refRooms.values()[i].willend + " Position: " + Global.refRooms.values()[i].topleft)
  }
}*/