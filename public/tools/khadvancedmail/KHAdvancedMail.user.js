// ==UserScript==
// @name          KHSampleScript
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
    script.id = 'KHAdvancedMail';
    script.type = 'text/javascript';
    script.textContent += "(" + callback.toString() + ")();\n";
    document.body.appendChild(script);
  }
}
function injectStartReady() {
  initAdvancedMailFunction = window.setInterval("initAdvancedMail();", 100);
}
//Begin Injection
function injectScript() {
  var variablesToAdd = new Array();
  variablesToAdd.push("debugMode = false");
  variablesToAdd.push("initAdvancedMailFunction");

  var functionsToAdd = new Array();
  functionsToAdd.push(initAdvancedMail);
  functionsToAdd.push(recogniseAdvancedMailWindows);
  functionsToAdd.push(selectAllReferralMails);

  var script = document.createElement("script");
  script.id = 'KHAdvancedMail';
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
//Begin SampleScript
function initAdvancedMail() {
  if (typeof jQuery != 'undefined') {
    //check if Dev Mode
    if (window.location.search == "?dev") {
      debugMode = true
    } else {
      debugMode = false
    }

    //interval Functions
    window.setInterval("recogniseAdvancedMailWindows();", 200);
    window.clearInterval(initAdvancedMailFunction);
    if (debugMode) {
      console.log("KHAdvancedMail loaded");
    }
  } else {
    if (debugMode) {
      console.log("KHAdvancedMail not loaded");
    }
  }
}
function recogniseAdvancedMailWindows() {
  if (jQuery('div#msgwindow').is(':visible')) {
    if (jQuery('div#msgwindow').css('background-image') == "url(http://pics.kapihospital.de/bg_mail.png)" ||
        jQuery('div#msgwindow').css('background-image') == "url(\"http://pics.kapihospital.de/bg_mail.png\")") {
	  if (!jQuery('input#checkallreferral').length) {
            jQuery('<input class="checkbox cursorclickable" type="checkbox" id="checkallreferral" name="checkallreferral" onclick="selectAllReferralMails();">').appendTo('div#msgNavigation');
            jQuery('div#msgNavigation').get(0).innerHTML = jQuery('div#msgNavigation').get(0).innerHTML+'alle Überweisungen';
	  }
    }
  }
}
function selectAllReferralMails() {
  allMails = jQuery('tr', jQuery('div#msgwindow'));
  for (var i= 1; i < allMails.length; i++) {
    subject = jQuery(jQuery(allMails[i]).children()[1]).text();
	if (subject == 'Überweisung angenommen' || subject == 'Überweisung zurückgewiesen') {
		jQuery(jQuery(jQuery(allMails[i]).children()[3]).children()[0]).attr('checked', true);
	}
  }
}
//End SampleScript
//Begin Script
injectScript();
injectScriptStart(injectStartReady);



//End Script