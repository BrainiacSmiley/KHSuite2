// ==UserScript==
// @name          KHOpticalFixes
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
  if (jQuery('div#videotv').length) {
    jQuery('div#videotv').css('z-index', '-1')
  }
  if (jQuery('div#schatzsuche').length) {
    jQuery('div#schatzsuche').css('z-index', '-1')
  }
}
//Begin Script
addJQuery(readyJQuery)
//End Script