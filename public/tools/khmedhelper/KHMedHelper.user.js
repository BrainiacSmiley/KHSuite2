// ==UserScript==
// @name          KHMedHelper
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
    //Interval Function
    window.setInterval("checkRoomsForMissingMeds()", 1000)
  })
}
//Begin Injection
function addFunctions() {
  var functionsToAdd = new Array(checkRoomsForMissingMeds)
  var script = document.createElement("script");
  
  for (var x = 0; x < functionsToAdd.length; x++) {
    script.textContent += (functionsToAdd[x].toString() + "\n\n");
  }
  document.body.appendChild(script);
}
//End Injection
//Begin MedHelper
function checkRoomsForMissingMeds() {
  jQuery('[class=room]', jQuery('div#hospital_content')).each(function() {
    roomId = jQuery(this).attr('id').split("r")[1]*1
    if (roomId > 51) {
      actualRoom = Global.refRooms.get("r" + roomId)
      if (actualRoom.state == 3) {
        actualPatient = Premium._patientsCache.get("p" + actualRoom.patient)
        if (actualPatient != undefined) {
          for( property in actualPatient.diseasesCured ) { 
	    if (actualPatient.diseasesCured[property] == "ONTREATMENT" && actualPatient.medsGiven[property] === 0) {
	      medId = actualPatient.meds[property]
	      //add missing MedSymbol
	      if (!jQuery('div#mediinfo_' + roomId + '_med_' + medId).length) {
	        jQuery('<div id="mediinfo_' + roomId + '_med_' + medId + '" style="position:absolute;top:5px;left:5px;font-weight:bold;background-color:white;-moz-border-radius:5px;-webkit-border-radius:5px;" class="m_a_30 m_' + medId + '_30"></div>').appendTo(this)
	      }
	    }
          }
      
          //removing old medinfo Items
          jQuery('div[id^=mediinfo_]', this).each(function() {
            medId = jQuery(this).attr('id').split("_")[3]*1
            for( property in actualPatient.meds) {
              if (actualPatient.meds[property] == medId) {
                if (actualPatient.medsGiven[property] == 1) {
                  jQuery(this).remove()
                }
              }
            }
          })
        } else {
          jQuery('div[id^=mediinfo_]', this).remove()
        }
      }
    }
  })
}
//End MedHelper
//Begin Script
addFunctions()
addJQuery(readyJQuery)
//End Script