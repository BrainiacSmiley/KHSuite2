// ==UserScript==
// @name          KHAdvancedAssignment
// @version       2.0
// @include       http://*kapihospital.com/*
// @exclude       http://forum.de.kapihospital.com/*
// ==/UserScript==

function addExternalCSS() {
  css = document.createElement("link");
  css.setAttribute("rel", "stylesheet")
  css.setAttribute("type", "text/css")
  css.setAttribute("href", "http://khsuite.herokuapp.com/tools/bootstrap.css")
  document.body.appendChild(css);
}
function addExternalScripts(callback) {
  //analyse already existing scripts
  jQueryFound = false;
  bootstrapTabFound = false;
  bootstrapTabDropdownDound = false;
  for (var i = 0; i < document.getElementsByTagName('script').length; i++) {
    if (document.getElementsByTagName('script')[i].src == "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js") {
      jQueryFound = true;
    }
    else if (document.getElementsByTagName('script')[i].src == "http://twitter.github.com/bootstrap/assets/js/bootstrap-tab.js") {
      bootstrapTabFound = true;
    }
    else if (document.getElementsByTagName('script')[i].src == "http://twitter.github.com/bootstrap/assets/js/bootstrap-dropdown.js") {
      bootstrapTabDropdownDound = true;
    }
  }
  if (!jQueryFound) {
    script = document.createElement("script");
    script.setAttribute("type","text/javascript");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
    script.addEventListener('load', function() {
      if (!bootstrapTabFound) {
        script = document.createElement("script");
        script.setAttribute("type","text/javascript");
        script.setAttribute("src", "http://twitter.github.com/bootstrap/assets/js/bootstrap-tab.js");
        document.body.appendChild(script);
      }
      if (!bootstrapTabDropdownDound) {
        script = document.createElement("script");
        script.setAttribute("type","text/javascript");
        script.setAttribute("src", "http://twitter.github.com/bootstrap/assets/js/bootstrap-dropdown.js");
        document.body.appendChild(script);
      }
      var script = document.createElement("script");
      script.textContent = "(" + callback.toString() + ")();";
      document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
  } else {
    if (!bootstrapTabFound) {
      script = document.createElement("script");
      script.setAttribute("type","text/javascript");
      script.setAttribute("src", "http://twitter.github.com/bootstrap/assets/js/bootstrap-tab.js");
      document.body.appendChild(script);
    }
    if (!bootstrapTabDropdownDound) {
      script = document.createElement("script");
      script.setAttribute("type","text/javascript");
      script.setAttribute("src", "http://twitter.github.com/bootstrap/assets/js/bootstrap-dropdown.js");
      document.body.appendChild(script);
    }
    callBackScript = document.createElement("script");
    callBackScript.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(callBackScript);
  }
}
function readyJQuery() {
  jQuery.noConflict();
  jQuery(document).ready(function() {
    initAdvancedAssignment();
    
    //interval Functions
    window.setInterval("recogniseAdvancedAssignmentWindows()", 200);
  });
}
//Begin Injection
function addFunctions() {
  var variablen = new Array();
  variablen.push("$allAddresses");
  variablen.push("alreadyEnteredPatName = \"\"");
  variablen.push("assignmentTarget");
  variablen.push("KHConfigValues");
  variablen.push("maxPrice = 0");
  variablen.push("minPrice = 0");
  variablen.push("patStored");
  variablen.push("patientDiseasesStorage");
  variablen.push("userName");

  var functionsToAdd = new Array();
  functionsToAdd.push(addAdvancedAssignmentsOptions);
  functionsToAdd.push(addAssignmentIcon);
  functionsToAdd.push(changeActiveAssignmentIcon);
  functionsToAdd.push(changeAssignmentTarget);
  functionsToAdd.push(formatPrices);
  functionsToAdd.push(generateAdvancedAssignmentConfigOptions);
  functionsToAdd.push(generateConfigBase);
  functionsToAdd.push(getAssignmentPrice);
  functionsToAdd.push(getDiseaseId);
  functionsToAdd.push(getExchangePrice);
  functionsToAdd.push(getMedIdForDisease);
  functionsToAdd.push(getMedPrice);
  functionsToAdd.push(getPrices);
  functionsToAdd.push(initAdvancedAssignment);
  functionsToAdd.push(isNameSelected);
  functionsToAdd.push(progressAddressbook);
  functionsToAdd.push(progressAssignmentWindow);
  functionsToAdd.push(progressExchangeWindow);
  functionsToAdd.push(progressExchangePayloadWindow);
  functionsToAdd.push(progressReferralWindow);
  functionsToAdd.push(recogniseAdvancedAssignmentWindows);
  functionsToAdd.push(saveAdvancedAssignmentConfig);
  functionsToAdd.push(stillNeededMedsCosts);
  functionsToAdd.push(storePats);
  functionsToAdd.push(storeKHConfigValues);

  var script = document.createElement("script");
  
  for (var x = 0; x < variablen.length; x++) {
    script.textContent += ("var " + variablen[x] + "\n")
  }
  
  script.textContent += "\n"
  
  for (var x = 0; x < functionsToAdd.length; x++) {
    if (typeof functionsToAdd[x] != 'undefined') {
      script.textContent += (functionsToAdd[x].toString() + "\n\n");
    }
  }
  document.body.appendChild(script);
}
//End Injection
//Begin AdvancedAssignment
function initAdvancedAssignment() {
  userName = jQuery('#username').text()

  //restore KHConfigValues
  if (localStorage.getItem('KHConfigValues' + userName) != undefined) {
    KHConfigValues = JSON.parse(localStorage.getItem('KHConfigValues' + userName));
  } else {
    KHConfigValues = new Object()
  }
  //Check for Script Values
  if (KHConfigValues.assignmentTarget == undefined) {
    KHConfigValues.assignmentTarget = "Bitte Arzt aus dem Addressbuch bestimmen!";
  }
  if (KHConfigValues.autoAssignment == undefined) {
    KHConfigValues.autoAssignment = true;
  }
  if (KHConfigValues.exchangePrice == undefined) {
    KHConfigValues.exchangePrice = 1
  }
  if (KHConfigValues.assignmentPrice == undefined) {
    KHConfigValues.assignmentPrice = 0
  }
  if (KHConfigValues.exchangePercent == undefined) {
    KHConfigValues.exchangePercent = 80
  }
  if (KHConfigValues.assignmentPercent == undefined) {
    KHConfigValues.assignmentPercent = 100
  }
  storeKHConfigValues();
}
function recogniseAdvancedAssignmentWindows() {
  if (jQuery('div#ref_divdetailsbig').is(':visible')) {
    if (jQuery('div#ref_divdetailsbig').css('background-image') == "url(http://pics.kapihospital.de/bg_referral_03.jpg)" ||
        jQuery('div#ref_divdetailsbig').css('background-image') == "url(\"http://pics.kapihospital.de/bg_referral_03.jpg\")") {
      progressAssignmentWindow();
    }
    else if (jQuery('div#ref_divdetailsbig').css('background-image') == "url(http://pics.kapihospital.de/bg_exchange_03.jpg)" ||
             jQuery('div#ref_divdetailsbig').css('background-image') == "url(\"http://pics.kapihospital.de/bg_exchange_03.jpg\")") {
      if (jQuery('div#dlg_payload').is(':visible')) {
        progressExchangePayloadWindow();
      } else {
        progressExchangeWindow();
      }
    }
    if (jQuery('div#addressbook').is(':visible')) {
      progressAddressbook();
    }
  } else if (jQuery('div#referrals').is(':visible')) {
    progressReferralWindow();
  } else if (jQuery('div#b').length && !jQuery('div#KHAdvancedAssignmentOptions').length) {
    addAdvancedAssignmentsOptions()
  }

}
function progressAssignmentWindow() {
  idString = jQuery('div#ref_magichand')[0].getAttribute('onclick');
  id = idString.substring(idString.indexOf("(")+1, idString.indexOf(")"));
  jQuery('div#ref_magichand')[0].setAttribute('onclick', 'storePats(' + id + ')');

  if (alreadyEnteredPatName != jQuery('div#ref_detname').text()) {
    alreadyEnteredPatName = jQuery('div#ref_detname').text();
    jQuery('input#ref_recipient').val(KHConfigValues.assignmentTarget);
    jQuery('input#ref_demand').val(getAssignmentPrice());

    //StorePat for PointsCalculation
    if (!navigator.userAgent.toLowerCase().indexOf("firefox") != -1 && patientDiseasesStorage != undefined) {
      patientID = jQuery('#ref_magichand').attr('onclick').split("(")[1].split(")")[0]*1;
      patientDiseasesStorage["p"+patientID] = Global.refPatients.get("p" + patientID).diseases;
      //remove old version from localStorage
      localStorage.removeItem('patientDiseasesStorage');
      //write actual version to localStorage
      localStorage.setItem('patientDiseasesStorage', JSON.stringify(patientDiseasesStorage));
    }

    if (KHConfigValues.autoAssignment) {
      jQuery('#ref_magichand').click();
    }
  }
}
function getAssignmentPrice() {
  getPrices(jQuery('span[style="color:red;font-weight:bold;font-size:large;"]', jQuery('div#ref_detcost')).text());

  switch(KHConfigValues.assignmentPrice) {
    case "0":
      return maxPrice;
    case "1":
      return minPrice;
    case "2":
      return maxPrice.replace(".","").replace(",",".")*1 - stillNeededMedsCosts();
    case "3":
      return minPrice.replace(".","").replace(",",".")*1 - stillNeededMedsCosts();
    case "-1":
      return maxPrice.replace(".","").replace(",",".")*1 * KHConfigValues.assignmentPercent*1 / 100;
  }
}
function getExchangePrice() {
  getPrices(jQuery('span[style="color:red;font-weight:bold;font-size:large;"]', jQuery('div#ref_pays')).text())

  switch(KHConfigValues.exchangePrice) {
    case "0":
      return maxPrice;
    case "1":
      return minPrice;
    case "2":
      return maxPrice.replace(".","").replace(",",".")*1 - stillNeededMedsCosts();
    case "3":
      return minPrice.replace(".","").replace(",",".")*1 - stillNeededMedsCosts();
    case "-1":
      return maxPrice.replace(".","").replace(",",".")*1 * KHConfigValues.assignmentPercent*1 / 100;
  }
}
function stillNeededMedsCosts() {
  medsCosts = 0;
  $diseasesNeedMeds = jQuery('div#ref_detdis').children().filter(function(){ return jQuery(jQuery(this).children()[3]).text() == "unbehandelt"});
  for (var i = 0; i < $diseasesNeedMeds.length; i++) {
    diseasesName = jQuery(jQuery($diseasesNeedMeds[i]).children()[1]).text()
    diseaseId = getDiseaseId(diseasesName)
    medId = getMedIdForDisease(diseaseId)
    medsCosts += getMedPrice(medId)
  }
  //getting two decimals
  medsCosts = Math.round(medsCosts * 100) / 100
  return medsCosts;
}
function getDiseaseId(name) {
  for (var disease in Global.availableDiseases) {
    if (Global.availableDiseases[disease.toString()].name === name) {
      return Global.availableDiseases[disease.toString()].id
    }
  }
  return -1
}
function getMedIdForDisease(diseaseId) {
  switch (diseaseId) {
    case 1:
      return 3 
    case 2:
      return 4 
    case 3:
      return 2 
    case 4:
      return 1
    default:
      return diseaseId
  }
}
function getMedPrice(id) {
  for (var med in Global.availableMedics._object) {
    if (Global.availableMedics._object[med.toString()].id === id*1) {
      return Global.availableMedics._object[med.toString()].price
    }
  }
  return 0.0
}
function progressExchangeWindow() {
  if (alreadyEnteredPatName != jQuery('div#ref_detname').text()) {
    alreadyEnteredPatName = jQuery('div#ref_detname').text()
    jQuery('input#ref_demand').val(getExchangePrice())

    if (KHConfigValues.autoAssignment) {
      jQuery('#ref_magichand').click();
    }
  }
}
function progressExchangePayloadWindow() {
  if (KHConfigValues.autoAssignment) {
    jQuery('#btn_yes').click();
  }
}
function progressReferralWindow() {
  if (patStored) {
    patStored = false;
    close_page();
  }
}
function progressAddressbook() {
  if ($allAddresses != jQuery('a[class=cursorclickable]', jQuery('div#addressbook'))) {
    $allAddresses = jQuery('a[class=cursorclickable]', jQuery('div#addressbook'));
    addAssignmentIcon();
  }
}
function getPrices(pricesToParse) {
  minPrice = formatPrices(pricesToParse.substr(0,pricesToParse.indexOf(' ')));
  maxPrice = formatPrices(pricesToParse.substr(pricesToParse.indexOf('-')+2, pricesToParse.length-3-(pricesToParse.indexOf('-')+2)));
}
function formatPrices(priceToFormat) {
  return priceToFormat.replace(".", "");
}
function isNameSelected(nameToCheck) {
  if (KHConfigValues.assignmentTarget == nameToCheck) {
    return -60;
  } else {
    return -15;
  }
}
function changeActiveAssignmentIcon() {
  $allAddresses.each(function() {
    var actualName = jQuery(this).text();
    jQuery('[id="' + actualName +'"]').css('background-position', isNameSelected(actualName) + "px 0px");
  });
}
function changeAssignmentTarget(newTarget) {
  KHConfigValues.assignmentTarget = newTarget;
  storeKHConfigValues();
  changeActiveAssignmentIcon();

  //use new AssignmentTarget
  jQuery('input#ref_recipient').val(KHConfigValues.assignmentTarget);
}
function storeKHConfigValues() {
  //remove old version from localStorage
  localStorage.removeItem('KHConfigValues' + userName);
  //write actual version to localStorage
  localStorage.setItem('KHConfigValues' + userName, JSON.stringify(KHConfigValues));
}
function addAssignmentIcon() {
  jQuery(jQuery('#addressbook').children()[2]).css('width',"250px");
  jQuery(jQuery('#addressbook').children()[2]).css('left',"15px");
  $allAddresses.each(function() {
    actualName = jQuery(this).text();
    if (!jQuery('[id="' + actualName +'"]').length) {
      jQuery('<div id=\"' + actualName + '\" style=\"float: left; margin-left: 10px; margin-right: 5px; width: 15px; background-repeat:none; background-image:url(http://pics.kapihospital.de/referral_icons_15.jpg); background-position: ' + isNameSelected(actualName) + 'px 0px;\" onclick=\"changeAssignmentTarget(\'' + actualName + '\')\">&nbsp;</div>').insertAfter(this);
    }
  })
}
function storePats(id) {
  patStored = true;
  Referral.sendReferral(id);
}
function addAdvancedAssignmentsOptions() {
  //cehck if ConfigBase present
  if (!jQuery('div#KHOptions').length) {
    jQuery(generateConfigBase()).insertAfter('div#b');
  }

  //add AdvancedAssignment Options to ConfigBase
  jQuery(generateAdvancedAssignmentConfigOptions()).appendTo('div#KHOptionsContent');
  jQuery('<li><a href="#KHAdvancedAssignmentOptions" data-toggle="tab">KHAdvancedAssignment</a></li>').appendTo('ul#toolsMenu');

  //set AdvancedAssignment Options
  if(KHConfigValues.autoAssignment) {
    jQuery('#AutoAssignmentConfig:checkbox').val(["true"]);
  }
  jQuery('#ExchangePriceConfig').val(KHConfigValues.exchangePrice);
  jQuery('#AssignmentPriceConfig').val(KHConfigValues.assignmentPrice);
  jQuery('#ExchangePercentConfig').val(KHConfigValues.exchangePercent);
  jQuery('#AssignmentPercentConfig').val(KHConfigValues.assignmentPercent);

  if (KHConfigValues.exchangePrice == "-1") {
    jQuery("#ExchangePercentConfig").removeAttr("disabled");
  }
  if (KHConfigValues.assignmentPrice == "-1") {
    jQuery("#AssignmentPercentConfig").removeAttr("disabled");
  }
}
function generateAdvancedAssignmentConfigOptions() {
  htmlCode = "";
  htmlCode += "<div class=\"tab-pane\" id=\"KHAdvancedAssignmentOptions\">";
  htmlCode += "<table cellspacing=\"0\" cellpadding=\"0\" style=\"margin-top:-18px;\">";
  htmlCode += "<thead>";
  htmlCode += "  <td>&nbsp;</td>";
  htmlCode += "  <td align=\"center\">Börse</td>";
  htmlCode += "  <td align=\"center\">Überweisung</td>";
  htmlCode += "</thead>";
  htmlCode += "<tbody>";
  htmlCode += "<tr>";
  htmlCode += "  <td align=\"center\">Auto<br>Überweisung</td>";
  htmlCode += "  <td>";
  htmlCode += "    <select id=\"ExchangePriceConfig\" onchange=\"saveAdvancedAssignmentConfig()\">";
  htmlCode += "      <option value=\"0\">MaxPreis</option>";
  htmlCode += "      <option value=\"1\">MinPreis</option>";
  htmlCode += "      <option value=\"2\">MaxPreis-MedPreis</option>";
  htmlCode += "      <option value=\"3\">MinPreis-MedPreis</option>";
  htmlCode += "      <option value=\"-1\">%MaxPreis</option>";
  htmlCode += "    </select>";
  htmlCode += "  </td>";
  htmlCode += "  <td>";
  htmlCode += "    <select id=\"AssignmentPriceConfig\" onchange=\"saveAdvancedAssignmentConfig()\">";
  htmlCode += "      <option value=\"0\">MaxPreis</option>";
  htmlCode += "      <option value=\"1\">MinPreis</option>";
  htmlCode += "      <option value=\"2\">MaxPreis-MedPreis</option>";
  htmlCode += "      <option value=\"3\">MinPreis-MedPreis</option>";
  htmlCode += "      <option value=\"-1\">%MaxPreis</option>";
  htmlCode += "    </select>";
  htmlCode += "  </td>";
  htmlCode += "</tr>";
  htmlCode += "<tr>";
  htmlCode += "  <td align=\"center\">";
  htmlCode += "    <input type=\"checkbox\" value=\"true\" id=\"AutoAssignmentConfig\" onchange=\"saveAdvancedAssignmentConfig()\">";
  htmlCode += "  </td>";
  htmlCode += "  <td>";
  htmlCode += "    <input type=\"number\" disabled=\"disabled\" value=\"\" id=\"ExchangePercentConfig\" onchange=\"saveAdvancedAssignmentConfig()\">";
  htmlCode += "  </td>";
  htmlCode += "  <td>";
  htmlCode += "    <input type=\"number\" disabled=\"disabled\" value=\"\" id=\"AssignmentPercentConfig\" onchange=\"saveAdvancedAssignmentConfig()\">";
  htmlCode += "  </td>";
  htmlCode += "</tr>";
  htmlCode += "</tbody></table>";
  htmlCode += "</div>";
  return htmlCode
}
function generateConfigBase() {
  htmlCode = "";
  htmlCode += "<ul id=\"KHOptions\" class=\"nav nav-tabs\" style=\"margin-top: 60px;\">";
  htmlCode += "<li><a href=\"#\" data-toggle=\"tab\">KHTools Config</a></li>";
  htmlCode += "  <li class=\"dropdown\">";
  htmlCode += "    <a href=\"#\" class=\"dropdown-toggle active\" data-toggle=\"dropdown\">Tool <b class=\"caret\"></b></a>";
  htmlCode += "    <ul id=\"toolsMenu\" class=\"dropdown-menu\">";
  htmlCode += "    </ul>";
  htmlCode += "  </li>";
  htmlCode += "</ul>";
  htmlCode += "<div id=\"KHOptionsContent\" class=\"tab-content\">";
  htmlCode += "</div>";
  return htmlCode;
}
function saveAdvancedAssignmentConfig() {
  if (!!jQuery('#AutoAssignmentConfig:checked').val()) {
    KHConfigValues.autoAssignment = true;
  } else {
    KHConfigValues.autoAssignment = false;
  }
  KHConfigValues.exchangePrice = jQuery('#ExchangePriceConfig').val();
  KHConfigValues.assignmentPrice = jQuery('#AssignmentPriceConfig').val();
  KHConfigValues.exchangePercent = jQuery('#ExchangePercentConfig').val();
  KHConfigValues.assignmentPercent = jQuery('#AssignmentPercentConfig').val();
  
  if (KHConfigValues.exchangePrice == "-1") {
    jQuery("#ExchangePercentConfig").removeAttr("disabled");
  } else {
    jQuery("#ExchangePercentConfig").attr("disabled", "disabled");
  }
  if (KHConfigValues.assignmentPrice == "-1") {
    jQuery("#AssignmentPercentConfig").removeAttr("disabled");
  } else {
    jQuery("#AssignmentPercentConfig").attr("disabled", "disabled");
  }

  storeKHConfigValues();
}
//End AdvancedAssignment
//Begin Script
addExternalCSS();
addFunctions();
addExternalScripts(readyJQuery);
//End Script