// ==UserScript==
// @name          KHMedHelper
// @version       2.0
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
    script.id = 'KHMedHelperStart';
    script.type = 'text/javascript';
    script.textContent += "(" + callback.toString() + ")();\n";
    document.body.appendChild (script);
  }
}
function injectStartReady() {
  initMedHelperFunction = window.setInterval("initMedHelper();", 100);
}
//Begin Injection
function injectScript() {
  var variablesToAdd = new Array();
  variablesToAdd.push("debugMode");
  variablesToAdd.push("initMedHelperFunction");

  var functionsToAdd = new Array();
  functionsToAdd.push(checkRoomsForMissingMeds);
  functionsToAdd.push(initMedHelper);

  var script = document.createElement("script");
  script.id = 'KHMedHelper';
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
//Begin MedHelper
function initMedHelper() {
  if (typeof jQuery != 'undefined') {
    //check if Dev Mode
    if (window.location.search == "?dev") {
      debugMode = true
    } else {
      debugMode = false
    }

    //Interval Function
    if (Global.ISPREMIUM) {
      window.setInterval("checkRoomsForMissingMeds()", 200);
      window.clearInterval(initMedHelperFunction);
      if (debugMode) {
        console.log("KHMedHelper loaded");
      }
    } else {
      if (debugMode) {
        console.log("KHMedHelper not loaded - no PA");
      }
    }
  } else {
    if (debugMode) {
      console.log("KHMedHelper not loaded");
    }
  }
}
function checkRoomsForMissingMeds() {
  jQuery('[class=room]', jQuery('div#hospital_content')).each(function() {
    roomId = jQuery(this).attr('id').split("r")[1]*1;
    if (roomId > 51) {
      actualRoom = Global.refRooms.get("r" + roomId);
      if (actualRoom.state == 3) {
        actualPatient = Premium._patientsCache.get("p" + actualRoom.patient);
        if (actualPatient != undefined) {
          for (property in actualPatient.diseasesCured) { 
	    if (actualPatient.diseasesCured[property] == "ONTREATMENT" && actualPatient.medsGiven[property] === 0) {
	      medId = actualPatient.meds[property];
	      //add missing MedSymbol
	      if (!jQuery('div#mediinfo_' + roomId + '_med_' + medId).length) {
	        jQuery('<div id="mediinfo_' + roomId + '_med_' + medId + '" style="position:absolute;top:5px;left:5px;font-weight:bold;background-color:white;-moz-border-radius:5px;-webkit-border-radius:5px;" class="m_a_30 m_' + medId + '_30"></div>').appendTo(this);
	      }
	    }
          }
      
          //removing old medinfo Items
          jQuery('div[id^=mediinfo_]', this).each(function() {
            medId = jQuery(this).attr('id').split("_")[3]*1;
            for( property in actualPatient.meds) {
              if (actualPatient.meds[property] == medId) {
                if (actualPatient.medsGiven[property] == 1) {
                  jQuery(this).remove();
                }
              }
            }
          })
        } else {
          jQuery('div[id^=mediinfo_]', this).remove();
        }
      } else {
        jQuery('div[id^=mediinfo_]', this).remove();
      }
    }
  })
}
//End MedHelper
//Begin Script
injectScript();
injectScriptStart(injectStartReady);
//End Script