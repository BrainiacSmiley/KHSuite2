// ==UserScript==
// @name          KHOpticalImprovements
// @version       1.1
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
  if (jQuery('div#videotv').length) {
    jQuery('div#videotv').css('z-index', '-1')
  }
  if (jQuery('div#schatzsuche').length) {
    jQuery('div#schatzsuche').css('z-index', '-1')
  }
  //Interval Function
  checkVideoTVFunction = window.setInterval("checkVideoTV()", 200)
}
//Begin Injection
var variablen = new Array()
variablen[0]  = "checkVideoTVFunction"

function addFunctions() {
  var functionsToAdd = new Array(checkVideoTV)
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
//Begin OpticalFixes
function checkVideoTV() {
  if (jQuery('div#videotv').css('background-image') == "url(http://pics.kapihospital.de/videotv_anim.gif)" && !jQuery('div#videoreminder').length) {
    jQuery('<div id="videoreminder" class="cleaner cursorclickable" style="position: absolute; background-image: url(http://pics.kapihospital.de/roomlock.png); width: 50px; height: 50px; left: 398px; top: -8px; z-index: 1" onclick="Videoplayer.open();" title="Einmal am Tag Werbung schauen und eine gratis Wunderpille abstauben!">&nbsp;</div>').insertAfter('div#videotv')
  }
  if (jQuery('div#videotv').css('background-image') == "url(http://pics.kapihospital.de/videotv_still.gif)") {
    if (jQuery('div#videoreminder').length) {
      jQuery('div#videoreminder').remove()
    }
    window.clearInterval(checkVideoTVFunction)
  }
}
//EndOpticalFixes
//Begin Script
addFunctions()
addJQuery(readyJQuery)
//End Script