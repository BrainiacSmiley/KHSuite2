// ==UserScript==
// @name          KHShortcuts
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
    script.id = 'KHShortcutsStart';
    script.type = 'text/javascript';
    script.textContent += "(" + callback.toString() + ")();\n";
    document.body.appendChild (script);
  }
}
function injectStartReady() {
  initShortcutsFunction = window.setInterval("initShortcuts();", 100);
}
//Begin Injection
function injectScript() {
  var variablesToAdd = new Array();
  variablesToAdd.push("debugMode = false");
  variablesToAdd.push("initShortcutsFunction");

  var functionsToAdd = new Array();
  functionsToAdd.push(initShortcuts);
  functionsToAdd.push(goToFloor);

  var script = document.createElement("script");
  script.id = 'KHShortcuts';
  script.type = 'text/javascript';

  for (var x = 0; x < variablesToAdd.length; x++) {
    script.textContent += ("var " + variablesToAdd[x] + ";\n");
  }
 
  script.textContent += "\n";
  
  for (var x = 0; x < functionsToAdd.length; x++) {
    script.textContent += (functionsToAdd[x].toString() + "\n\n");
  }
  document.body.appendChild(script);
}
//End Injection
//Begin Shortcuts
function initShortcuts() {
  if (typeof jQuery != 'undefined') {
    //check if Dev Mode
    if (window.location.search == "?dev") {
      debugMode = true
    } else {
      debugMode = false
    }

    window.addEventListener("keydown",function(event){
      if (event.altKey) {
        switch (event.keyCode) {
          case 49: //Floor 1
            goToFloor(1);
            event.preventDefault();
            break;
          case 50: //Floor 2
            goToFloor(2);
            event.preventDefault();
            break;
          case 51: //Floor 3
            goToFloor(3);
            event.preventDefault();
            break;
          case 52: //Floor 4
            goToFloor(4);
            event.preventDefault();
            break;
          case 53: //Floor 5
            goToFloor(5);
            event.preventDefault();
            break;
          case 66: // B:Boerse
            show_page('exchange');
            event.preventDefault();
            break
          case 71: // G:Garage
            show_page('garage');
            event.preventDefault();
            break;
          case 77: // M:Überweisungsmappe
            show_page('referral');
            event.preventDefault();
            break;
          case 79: // O:Olga
            show_page('patientnurse');
            event.preventDefault();
            break;
          case 83: // S:Statistik
            if (Global.ISPREMIUM) {
              show_page('premiumstats');
              event.preventDefault();
              break;
            } else {
              Dialog.information("Statistik ist nur mit PA abrufbar!");
            }
        }
      }
    }, false);

    window.clearInterval(initShortcutsFunction);
    if (debugMode) {
      console.log("KHShortcuts loaded");
    }
  } else {
    if (debugMode) {
      console.log("KHShortcuts not loaded");
    }
  }
}
function goToFloor(level) {
  if (jQuery('#floor_jump_' + level).length) {
    jQuery('#floor_jump_' + level).click()
  }
}
//End Shortcuts
//Begin Script
injectScript();
injectScriptStart(injectStartReady);
//End Script