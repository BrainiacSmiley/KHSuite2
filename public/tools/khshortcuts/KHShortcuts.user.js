// ==UserScript==
// @name          KHShortcuts
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
  jQuery(document).ready(function() {
    window.addEventListener("keydown",function(event){
      if (event.altKey) {
        switch (event.keyCode) {
          case 49: //Floor 1
            goToFloor(1)
            event.preventDefault();
            break;
          case 50: //Floor 2
            goToFloor(2)
            event.preventDefault();
            break;
          case 51: //Floor 3
            goToFloor(3)
            event.preventDefault();
            break;
          case 52: //Floor 4
            goToFloor(4)
            event.preventDefault();
            break;
          case 53: //Floor 5
            goToFloor(5)
            event.preventDefault();
            break;
          case 66: // B:Boerse
            openExchange()
            event.preventDefault();
            break
          case 71: // G:Garage
            openGarage()
            event.preventDefault();
            break;
          case 77: // M:Überweisungsmappe
            openReferral()
            event.preventDefault();
            break;
          case 79: // O:Olga
            openOlga()
            event.preventDefault();
            break;
        }
      }
    },false);
  })
}
//Begin Injection
function addFunctions() {
  var functionsToAdd = new Array(openGarage, openExchange, openReferral, openOlga, goToFloor)
  var script = document.createElement("script");
  
  for (var x = 0; x < functionsToAdd.length; x++) {
    script.textContent += (functionsToAdd[x].toString() + "\n\n");
  }
  document.body.appendChild(script);
}
//End Injection
//Begin Shortcuts
function openGarage() {
  show_page('garage')
}
function openExchange() {
  show_page('exchange')
}
function openReferral() {
  show_page('referral')
}
function openOlga() {
  show_page('patientnurse')
}
function goToFloor(level) {
  if (jQuery('#floor_jump_' + level).length) {
    jQuery('#floor_jump_' + level).click()
  }
}
//End Shortcuts
//Begin Script
addFunctions()
addJQuery(readyJQuery)
//End Script