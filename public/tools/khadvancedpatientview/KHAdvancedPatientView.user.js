// ==UserScript==
// @name          KHAdvancedPatientView
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
    script.id = 'KHAdvancedPatientViewStart';
    script.type = 'text/javascript';
    script.textContent += "(" + callback.toString() + ")();\n";
    document.body.appendChild (script);
  }
}
function injectStartReady() {
  initAdvancedPatientViewFunction = window.setInterval("initAdvancedPatientView();", 100);
}
//Begin Injection
function injectScript() {
  var variablesToAdd = new Array();
  variablesToAdd.push("debugMode");
  variablesToAdd.push("levelBonus = 0.025");
  variablesToAdd.push("maxEarning = 0");
  variablesToAdd.push("maxPayment = 0");
  variablesToAdd.push("medCosts = 0");
  variablesToAdd.push("minEarning = 0");
  variablesToAdd.push("minPayment = 0");
  variablesToAdd.push("patDiseases = new Array()");
  variablesToAdd.push("pointsWithMeds = 0");
  variablesToAdd.push("pointsWithoutMeds = 0");
  variablesToAdd.push("KHConfigValues");
  variablesToAdd.push("userName");
  variablesToAdd.push("initAdvancedPatientViewFunction");
  
  var functionsToAdd = new Array();
  functionsToAdd.push(addAdvancedPatientViewOptions);
  functionsToAdd.push(BonusForMultiDiseases);
  functionsToAdd.push(formatPatientPrices);
  functionsToAdd.push(generateAdvancedPatientViewConfigOptions);
  functionsToAdd.push(generateConfigBase);
  functionsToAdd.push(generateWWLevelConfigOptions);
  functionsToAdd.push(getBasePoints);
  functionsToAdd.push(getDiseaseBasePoints);
  functionsToAdd.push(getMedCosts);
  functionsToAdd.push(getMedIdForDisease);
  functionsToAdd.push(getMedPrice);
  functionsToAdd.push(getPatientPoints);
  functionsToAdd.push(getPatientPointsForDisease);
  functionsToAdd.push(getPatientPrices);
  functionsToAdd.push(getTime);
  functionsToAdd.push(getTimeString);
  functionsToAdd.push(initAdvancedPatientView);
  functionsToAdd.push(processPatientDiseases);
  functionsToAdd.push(progressPatientViewWindow);
  functionsToAdd.push(recogniseAdvancedPatientViewWindows);
  functionsToAdd.push(saveAdvancedPatientViewConfig);
  functionsToAdd.push(saveWWConfig);
  functionsToAdd.push(storeKHConfigValues);
  
  var script = document.createElement("script");
  script.id = 'KHAdvancedPatientView';
  script.type = 'text/javascript';
  
  for (var x = 0; x < variablesToAdd.length; x++) {
    script.textContent += ("var " + variablesToAdd[x] + ";\n");
  }
  
  script.textContent += "\n"
  
  for (var x = 0; x < functionsToAdd.length; x++) {
    script.textContent += (functionsToAdd[x].toString() + "\n\n");
  }
  document.body.appendChild(script);
}
//End Injection
//Begin AdvancedPatientView
function initAdvancedPatientView() {
  if (typeof jQuery != 'undefined') {
    //check if Dev Mode
    if (window.location.search == "?dev") {
      debugMode = true
    } else {
      debugMode = false
    }

    userName = jQuery('#username').text();
  
    //restore KHConfigValues
    if (localStorage.getItem('KHConfigValues' + userName) != null) {
      KHConfigValues = JSON.parse(localStorage.getItem('KHConfigValues' + userName));
    } else {
      KHConfigValues = new Object();
    }
    //Check for Script Values
    if (typeof KHConfigValues.wwLevel == 'undefined') {
      KHConfigValues.wwLevel = 0;
    }
    //Check for Script Values
    if (typeof KHConfigValues.useMedBonus == 'undefined') {
      KHConfigValues.useMedBonus = false;
    }
    storeKHConfigValues();
  
    //interval Functions
    window.setInterval("recogniseAdvancedPatientViewWindows()", 200);
    window.clearInterval(initAdvancedPatientViewFunction);
    if (debugMode) {
      console.log("KHAdvancedPatientView loaded");
    }
  } else {
    if (debugMode) {
      console.log("KHAdvancedPatientView not loaded");
    }
  }
}
function recogniseAdvancedPatientViewWindows() {
  if (jQuery('div#b').length && !jQuery('div#KHAdvancedPatientViewOptions').length) {
    addAdvancedPatientViewOptions();
  } else if (jQuery('div#msgwindow').is(':visible')) {
    if (jQuery('div#msgwindow').css('background-image') == "url(http://pics.kapihospital.de/medicalrecord_1.png)" ||
        jQuery('div#msgwindow').css('background-image') == "url(\"http://pics.kapihospital.de/medicalrecord_1.png\")") {
      progressPatientViewWindow();
    }
  }
}
function getPatientPrices(pricesToParse) {
  minPayment = formatPatientPrices(pricesToParse.substr(0,pricesToParse.indexOf(' '))).replace(",",".")*1;
  maxPayment = formatPatientPrices(pricesToParse.substr(pricesToParse.indexOf('-')+2, pricesToParse.length-3-(pricesToParse.indexOf('-')+2))).replace(",",".")*1;

  //WW Bonus 8 Level 10% hT
  if (KHConfigValues.wwLevel >= 8) {
    minPayment *= 1.1;
    maxPayment *= 1.1;
  }
}
function formatPatientPrices(priceToFormat) {
  return priceToFormat.replace(".", "");
}
function getTime(timeString) {
  timeArray = timeString.split(":");
  return timeArray[2]*1 + timeArray[1] * 60 + timeArray[0] * 3600;
}
function getTimeString(time) {
  hour = Math.floor(time / 3600);
  rest = time%3600;
  min = Math.floor(rest/ 60);
  sek = rest%60;
  hourString = hour < 10 ? "0" + hour : "" + hour;
  minString = min < 10 ? "0" + min : "" + min;
  sekString = sek < 10 ? "0" + sek : "" + sek;
  return hourString + ":" + minString + ":" + sekString;
}
function getDiseaseBasePoints(diseaseId) {
  healTime = Global.availableDiseases["" + diseaseId].basetime
  healTimeMin = healTime / 60
  healTimeWithMedi = healTimeMin / 2
  levelNeeded = Global.availableDiseases["" + diseaseId].level
  return Math.pow(Math.ceil(healTimeWithMedi / 10), 1.5) + 1 + levelNeeded
}
function getBasePoints(medsUsed) {
  patientID = jQuery('div#med_price').children().text().split(" ")[1]*1;
  allDiseasesBasePoints = 0;
  
  allDiseases = Global.refPatients.get("p" + patientID).diseases
  for (var i = 0; i < allDiseases.length; i++) {
    if (medsUsed) {
      allDiseasesBasePoints += getDiseaseBasePoints(allDiseases[i])
    } else {
      allDiseasesBasePoints += getDiseaseBasePoints(allDiseases[i])-1
    }
  }
  return allDiseasesBasePoints
}
function BonusForMultiDiseases(numberOfDiseases) {
  switch (numberOfDiseases) {
    case 1:
      return 0
    case 2:
      return (0.37722 + 0.38499) / 2
    case 3:
      return (0.94791 + 0.96850) / 2
    case 4:
      return (1.65636 + 1.65701) / 2
    case 5:
      return (2.46768 + 2.56625) / 2
    case 6:
      return (3.38966 + 3.39235) / 2
  }
}
function getPatientPoints(level, medsUsed) {
  patientID = jQuery('div#med_price').children().text().split(" ")[1]*1;
  numberOfDiseases = Global.refPatients.get("p" + patientID).diseases.length;
  pointsForPiper = Math.floor((getBasePoints(medsUsed)+BonusForMultiDiseases(numberOfDiseases))*((level-1)*levelBonus+1))
  pointsWithWWBonus = pointsForPiper
  
  if (KHConfigValues.wwLevel == 10) {
    pointsWithWWBonus = pointsForPiper * 1.05 * 1.05 * 1.1
  } else if (KHConfigValues.wwLevel >= 6) {
    pointsWithWWBonus = pointsForPiper * 1.05 * 1.05
  } else if (KHConfigValues.wwLevel >= 1) {
    pointsWithWWBonus = pointsForPiper * 1.05
  }
  
  officePoints = Math.floor(pointsWithWWBonus)
  return officePoints
}
function getMedCosts() {
  medCosts = 0.0;
  patientID = jQuery('div#med_price').children().text().split(" ")[1].split("P")[0]*1;
  patDiseases = Global.refPatients.get("p" + patientID).diseases;

  for (var i = 0; i < patDiseases.length; i++) {
    medId = getMedIdForDisease(patDiseases[i]);
    medCosts += getMedPrice(medId);
  }
  return medCosts;
}
function processPatientDiseases(level) {
  //value Calculation
  medCosts = getMedCosts();
  pointsWithMeds = getPatientPoints(level, true);
  pointsWithoutMeds = getPatientPoints(level, false);
  patientID = jQuery('div#med_price').children().text().split(" ")[1]*1;
  patDiseases = Global.refPatients.get("p" + patientID).diseases;

  //time changing
  for (var i = 0; i < patDiseases.length; i++) {
    if (jQuery('div[id*=time]', jQuery('div#medi_diseases').children()[i]).text().indexOf("Dauer:") === 0) {
      oldTimeString = jQuery('span', jQuery('div[id*=time]', jQuery('div#medi_diseases').children()[i])).text();
      time = getTime(oldTimeString);
      if (KHConfigValues.wwLevel >= 9) {
        time = time * 0.9;
      }
      if (KHConfigValues.useMedBonus) {
        //researchBonus
        medId = getMedIdForDisease(patDiseases[i]);
        rLevel = Global.availableMedics.get("med" + medId).rlevel;
        time = Math.floor(time * (1-(50+rLevel)/100));
      }
      newTimeString = getTimeString(time)
      jQuery('span', jQuery('div[id*=time]', jQuery('div#medi_diseases').children()[i])).text(newTimeString);
    }
  }
  minEarning = minPayment - medCosts;
  maxEarning = maxPayment - medCosts;
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
function getPatientPointsForDisease(diseaseId, level, medsUsed) {
  if (diseaseBasePoints[diseaseId] != -1) {
    if (medsUsed) {
      return diseaseBasePoints[diseaseId] * (levelBonus*level+1)
    } else {
      return (diseaseBasePoints[diseaseId]-1) * (levelBonus*level+1)
    }
  } else {
    return 0.0
  }
}
function saveWWConfig() {
  KHConfigValues.wwLevel = jQuery('#wwLevel').val()
  setAPOverlay();
  storeKHConfigValues();
}
function progressPatientViewWindow() {
  if (!jQuery('div#payment').length) {
    //getting PlayerLevel
    var levelString = jQuery('#level').text()
    var level = levelString.substr(levelString.indexOf('(')+2, (levelString.lastIndexOf(' ')-(levelString.indexOf('(')+2)))*1
    //getting original min and max Prices
    getPatientPrices(jQuery('span[style="color:red;font-weight:bold;font-size:x-large;"]', jQuery('div#med_price')).text())
    //remove of the old Prices
    jQuery('div[style="position:absolute;bottom:10px;right:10px;"]', jQuery('div#med_price')).remove()
    
    //working over all Diseases
    processPatientDiseases(level)
    
    var options = {
      symbol : "hT",
      decimal : ",",
      thousand: ".",
      precision : 2,
      format: "%v %s"
    };
    //add points
    jQuery('<div id="points" style="position:absolute;color:grey;bottom:35px;left:0px;">Punkte<br />mit Medis <span style="color:red;">' + pointsWithMeds + '</span><br />ohne Medis <span style="color:red;">' + pointsWithoutMeds + '</span></div>').appendTo('div#med_price')
    //add zahlt
    jQuery('<div id="payment" style="position:absolute;bottom:60px;right:10px;">zahlt <span style="color:red;font-weight:bold;font-size:large;">' + accounting.formatMoney(minPayment, options) + ' - ' + accounting.formatMoney(maxPayment, options) + '</span></div>').appendTo('div#med_price')
    //add MedPrices
    jQuery('<div id="medcosts" style="position:absolute;bottom:40px;right:10px;">Medikamentenkosten <span style="color:red;font-weight:bold;font-size:large;">' + accounting.formatMoney(medCosts, options) + '</span></div>').appendTo('div#med_price')
    //add Earning
    jQuery('<div id="earning" style="position:absolute;bottom:10px;right:10px;">Gewinn <span style="color:red;font-weight:bold;font-size:x-large;">' + accounting.formatMoney(minEarning, options) + ' - ' + accounting.formatMoney(maxEarning, options) +'</span></div>').appendTo('div#med_price')
    if (KHConfigValues.wwLevel > 0) {
      //add WWBonusSentence
      jQuery('<div id="wwClue" style="position:absolute;left:90px;color:red">Die Boni durch das<br />WW Stufe ' + KHConfigValues.wwLevel +'<br />wurden hinzugerechnet!</div>').insertAfter('div#medi_kick')
      if (jQuery('div#medi_wunder').length) {
        jQuery('div#medi_wunder').css('left','235px')
        jQuery('div#medi_wunder').next().css('left','270px')
      }
    }
  }
}
function addAdvancedPatientViewOptions() {
  //check if ConfigBase present
  if (!jQuery('ul#KHOptions').length) {
    jQuery(generateConfigBase()).insertAfter('div#b');
  }
  //check if wwConfig is present
  if (!jQuery('div#KHWWConfig').length) {
    jQuery(generateWWLevelConfigOptions()).appendTo('div#KHOptionsContent');
    jQuery('<li><a href="#KHWWConfig" data-toggle="tab">Allgemein</a></li>').insertAfter(jQuery('ul#KHOptions').children()[0]);
  }

  //add AdvancedReferral Options to ConfigBase
  jQuery(generateAdvancedPatientViewConfigOptions()).appendTo('div#KHOptionsContent');
  jQuery('<li><a href="#KHAdvancedPatientViewOptions" data-toggle="tab">KHAdvancedPatientView</a></li>').appendTo('ul#toolsMenu');
  jQuery('#toolsMenu').parent().show();
  sortConfigMenu();
  
  //hide Menu if not used
  if (!jQuery('#toolsMenu').children().length) {
    jQuery('#toolsMenu').parent().hide();
  }

  //set AdvancedPatientView Options
  if(KHConfigValues.useMedBonus) {
    jQuery('#useMedBonusConfig:checkbox').val(["true"]);
  }
}
function generateWWLevelConfigOptions() {
  htmlCode = "";
  htmlCode += "<div class=\"tab-pane\" id=\"KHWWConfig\" style=\"margin-left:10px;margin-top:-18px;\">";
  htmlCode += "  Abgeschlossene Weltwunderstufe der ÄV: <input id=\"wwLevel\" type=\"number\" onchange=\"saveWWConfig()\" min=\"0\" max=\"10\" style=\"width:40px;\" value=\"10\">";
  htmlCode += "</div>";
  return htmlCode;
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
function generateAdvancedPatientViewConfigOptions() {
  htmlCode = "";
  htmlCode += "<div class=\"tab-pane\" id=\"KHAdvancedPatientViewOptions\" style=\"margin-left:10px;margin-top:-18px;\">";
  htmlCode += "  Behandlungszeit mit Medis (+Forschungslevel): <input type=\"checkbox\" value=\"true\" id=\"useMedBonusConfig\" onchange=\"saveAdvancedPatientViewConfig()\" style=\"vertical-align:-2px;\">";
  htmlCode += "</div>";
  return htmlCode;
}
function saveAdvancedPatientViewConfig() {
  if (!!jQuery('#useMedBonusConfig:checked').val()) {
    KHConfigValues.useMedBonus = true;
  } else {
    KHConfigValues.useMedBonus = false;
  }

  storeKHConfigValues();
}
function storeKHConfigValues() {
  //remove old version from localStorage
  localStorage.removeItem('KHConfigValues' + userName);
  //write actual version to localStorage
  localStorage.setItem('KHConfigValues' + userName, JSON.stringify(KHConfigValues));
}
//End AdvancedPatientView
//Begin Script
injectScript();
injectScriptStart(injectStartReady);
//End Script