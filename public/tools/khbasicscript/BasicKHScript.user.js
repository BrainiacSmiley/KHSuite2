// ==UserScript==
// @name          BasicKHScript
// @version       1.0
// @include       http://de.kapihospital.com/*
// @include       http://*.de.kapihospital.com/*
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.id = 'KHAddedJQuery';
  script.type = 'text/javascript';
  script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.id = 'BasicKHScriptStart';
    script.type = 'text/javascript';
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function readyJQuery() {
  jQuery.noConflict();

  //Bootstrap Tab
  script = document.createElement("script");
  script.id = 'KHAddedBootstrapTab';
  script.type = 'text/javascript';
  script.src = 'http://twitter.github.com/bootstrap/assets/js/bootstrap-tab.js';
  document.body.appendChild(script);

  //Boostrap Dropdown
  script = document.createElement("script");
  script.id = 'KHAddedBootstrapDropdown';
  script.type = 'text/javascript';
  script.src = 'http://twitter.github.com/bootstrap/assets/js/bootstrap-dropdown.js';
  document.body.appendChild(script);

  //Accounting
  script = document.createElement("script");
  script.id = 'KHAddedAccounting';
  script.type = 'text/javascript';
  script.src = 'https://raw.github.com/josscrowcroft/accounting.js/master/accounting.min.js';
  document.body.appendChild(script);

  //Bootstrap css
  css = document.createElement("link");
  css.id = 'KHAddedBootstrapCSS';
  css.rel = 'stylesheet';
  css.type = 'text/css';
  css.href = 'http://khsuite.herokuapp.com/tools/bootstrap.css';
  document.body.appendChild(css);
}

addJQuery(readyJQuery);