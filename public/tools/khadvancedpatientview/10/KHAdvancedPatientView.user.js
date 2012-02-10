// ==UserScript==
// @name          KHAdvancedPatientView
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
    initAdvancedPatientView()
    
    //Interval Functions
    window.setInterval("recogniseAdvancedPatientViewWindows()", 200)
  })
}
function addAccounting(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://raw.github.com/josscrowcroft/accounting.js/master/accounting.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
function readyAccounting() {
}
//Begin Injection
var variablen = new Array()
variablen.push("minPayment = 0")
variablen.push("maxPayment = 0")
variablen.push("minEarning = 0")
variablen.push("maxEarning = 0")
variablen.push("medCosts = 0")
variablen.push("patDiseases = new Array()")
variablen.push("diseaseBasePoints = new Array()")
variablen.push("levelBonus = 0.025")
variablen.push("pointsWithMeds = 0")
variablen.push("pointsWithoutMeds = 0")
variablen.push("wwLevel = 0")

function addFunctions() {
  var functionsToAdd = new Array(initAdvancedPatientView, recogniseAdvancedPatientViewWindows, progressPatientViewWindow, progressWWAccountOptionsWindow, getPatientPrices, formatPatientPrices, getTime, getTimeString, processPatientDiseases, getDiseaseId, getMedIdForDisease, getMedPrice, getPointsForDisease, saveWWConfig, setCookie, getCookie)
  var script = document.createElement("script");
  
  for (var x = 0; x < variablen.length; x++) {
    script.textContent += ("var " + variablen[x] + "\n");
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
  diseaseBasePoints[1]   =  11.007246  //Gebrochener Arm
  diseaseBasePoints[2]   =  27.620998  //Gebrochenes Bein
  diseaseBasePoints[3]   =   3.009433  //Brecheritis
  diseaseBasePoints[4]   =   3.009433  //Nasenflügelakne
  diseaseBasePoints[5]   =  27.620998  //Schädelbrummen
  diseaseBasePoints[6]   =   6.820921  //Schürfwunde
  diseaseBasePoints[7]   =  73.552380  //Dauerschnupfen
  diseaseBasePoints[8]   =  33.636991  //Rummelplatzkrankheit
  diseaseBasePoints[9]   =  29.523329  //Faulenzia
  diseaseBasePoints[10]  =  45.195681  //Grippeimpfung
  diseaseBasePoints[11]  =  21.704600  //Segelohrentzündung
  diseaseBasePoints[12]  =  28.616632  //Zwergfellentzündung
  diseaseBasePoints[13]  =  92.076727  //Venenverwesung
  diseaseBasePoints[14]  = 112.356377  //Ohrschneckenauswanderung
  diseaseBasePoints[15]  = 354.571490  //Sonnenbankbrand
  diseaseBasePoints[16]  =  84.015151  //Haarbruch
  diseaseBasePoints[17]  = -1  //Lippenblütlerwarze
  diseaseBasePoints[18]  =  18.162337  //Fränkisches Wurzelfieber
  diseaseBasePoints[19]  =  54.576958  //Furunkelfunkeln
  diseaseBasePoints[20]  = 134.284750  //Ohr-Schmalzlocke
  diseaseBasePoints[21]  =  46.619517  //Stinkekäsefuß
  diseaseBasePoints[22]  =  84.089743  //Kussmundatem
  diseaseBasePoints[23]  =  43.174837  //Fleuchhusten
  diseaseBasePoints[26]  =  21.704600  //Wechselbalgjahre
  diseaseBasePoints[27]  = 157.575668  //Würfelhusten
  diseaseBasePoints[28]  =  66.482679  //Spülwurm
  diseaseBasePoints[29]  =  78.079877  //Rot-Grün-Fieber
  diseaseBasePoints[30]  =  26.524578  //Luftpocken
  diseaseBasePoints[31]  =  37.510869  //Marserianerimpfung
  diseaseBasePoints[32]  = 256.048780  //Hitzewallung
  diseaseBasePoints[33]  =  53.332353  //Mumpitzimpfung
  diseaseBasePoints[34]  =  41.006329  //Wasserallergie
  diseaseBasePoints[35]  =  21.844292  //Arbeitsallergie
  diseaseBasePoints[36]  =  28.182867  //Schlaflosigkeit
  diseaseBasePoints[37]  =  29.197769  //Dauermüdigkeit
  diseaseBasePoints[38]  = 314.323170  //Kopflausbuben
  diseaseBasePoints[39]  =  40.107843  //Zungenverknotung
  diseaseBasePoints[40]  =  96.241551  //Fingernagelbruch
  diseaseBasePoints[41]  = 376.485454  //Kampfadern
  diseaseBasePoints[42]  = -1  //Pobackenflattern
  diseaseBasePoints[43]  = -1  //Schleimbeutelüberproduktion
  diseaseBasePoints[44]  =  22.698808  //Galliensteine
  diseaseBasePoints[45]  =  28.182867  //Koffeinhypersensibilität
  diseaseBasePoints[46]  = -1  //Koffeinmangel
  diseaseBasePoints[47]  = -1  //Fußfliegenpilz
  diseaseBasePoints[48]  =  31.631648  //Aufgerollte Fußnägel
  diseaseBasePoints[49]  =  38.632378  //Nagelbettwackeln
  diseaseBasePoints[50]  = -1  //Rotes Kniekehlchen
  diseaseBasePoints[51]  =  58.482394  //Frosch im Hals
  diseaseBasePoints[54]  = 244.015151  //Rosengürtel
  diseaseBasePoints[56]  =  90.033333  //Bad-Hair-Day-Syndrom
  diseaseBasePoints[61]  =  50.476531  //Nierenkiesel
  diseaseBasePoints[66]  =  31.631648  //Knorpelverknautschung
  diseaseBasePoints[67]  =  39.012195  //Herzschmerzgeschnulze
  diseaseBasePoints[68]  = 106.411350  //Dickdarmdiätsyndrom
  diseaseBasePoints[69]  = 638.940350  //Innenohr voller HAuS
  diseaseBasePoints[71]  =  34.638829  //Herzklappenklappern
  diseaseBasePoints[77]  =  82.085964  //Darmvergilbung
  diseaseBasePoints[78]  =  47.013513  //Flederhöhlenkopf
  diseaseBasePoints[79]  =  39.581070  //Silberblick
  diseaseBasePoints[80]  =  59.571136  //Brett vorm Kopf
  diseaseBasePoints[81]  =  95.060975  //Tomaten auf den Augen
  diseaseBasePoints[82]  =  66.577777  //viereckige Augen
  diseaseBasePoints[83]  =  67.586600  //Sauklaue
  diseaseBasePoints[84]  =  38.695418  //Schnarcheritis
  diseaseBasePoints[85]  =  59.012195  //Zahnschmerzen
  diseaseBasePoints[86]  =  56.477229  //Dicker Kopf
  diseaseBasePoints[87]  =  37.696744  //Drehwurm
  diseaseBasePoints[88]  =  66.577777  //Heimweh
  diseaseBasePoints[89]  = -1  //Zahnstein
  diseaseBasePoints[90]  = 145.585714  //Sturmfrisur
  diseaseBasePoints[91]  =  99.367827  //Zweckenbefall
  diseaseBasePoints[92]  = 144.200091  //Bierbauch
  diseaseBasePoints[93]  =  92.080028  //Brüllfroschrülpsen
  diseaseBasePoints[94]  =  75.093039  //Milchbart
  diseaseBasePoints[96]  =  41.702213  //Rapunzelsyndrom
  diseaseBasePoints[97]  =  76.520531  //Feuermal
  diseaseBasePoints[98]  =  63.483333  //Frostbeulen
  diseaseBasePoints[99]  =  56.619380  //Barthaarverzwirbelung
  diseaseBasePoints[100] =  61.644144  //Gehirndurchzug
  diseaseBasePoints[101] = -1  //Zwei linke Hände
  diseaseBasePoints[102] =  74.547297  //Stumpfe Zähne
  diseaseBasePoints[103] =  70.576726  //Pferdefuß
  diseaseBasePoints[104] =  74.557571  //Hummeln im Hintern
  diseaseBasePoints[105] = 162.650602  //Stinkebefall
  diseaseBasePoints[106] = 101.102409  //Tränensäcke
  diseaseBasePoints[107] =  54.027027  //Schlitzohr
  diseaseBasePoints[108] =  59.518072  //Holzkopf
  diseaseBasePoints[109] = -1  //Feuchte Aussprache
  diseaseBasePoints[110] =  97.108013  //Lampenfieber
  diseaseBasePoints[111] =  83.397457  //Knoblauchfahne
  diseaseBasePoints[112] =  53.758519  //Currywurstjieper
  diseaseBasePoints[113] =  37.007462  //Eierkopf
  diseaseBasePoints[114] = 160.725830  //Glatzitis
  
  storedWWLevel = getCookie("KHWWLevel" + jQuery('#username').text())
  if (storedWWLevel != null) {
    wwLevel = storedWWLevel
  } else {
    wwLevel = 0
  }
}
function recogniseAdvancedPatientViewWindows() {
  if (jQuery('div#b').length && !jQuery('div#WWConfig').length) {
    progressWWAccountOptionsWindow()
  } else if (jQuery('div#msgwindow').is(':visible')) {
    if (jQuery('div#msgwindow').css('background-image') == "url(http://pics.kapihospital.de/medicalrecord_1.png)" ||
        jQuery('div#msgwindow').css('background-image') == "url(\"http://pics.kapihospital.de/medicalrecord_1.png\")") {
      progressPatientViewWindow()
    }
  }
}
function getPatientPrices(pricesToParse) {
  minPayment = formatPatientPrices(pricesToParse.substr(0,pricesToParse.indexOf(' '))).replace(",",".")*1
  maxPayment = formatPatientPrices(pricesToParse.substr(pricesToParse.indexOf('-')+2, pricesToParse.length-3-(pricesToParse.indexOf('-')+2))).replace(",",".")*1

  //WW Bonus 8 Level 10% hT
  if (wwLevel >= 8) {
    minPayment *= 1.1
    maxPayment *= 1.1
  }
}
function formatPatientPrices(priceToFormat) {
  return priceToFormat.replace(".", "")
}
function getTime(timeString) {
  timeArray = timeString.split(":")
  return timeArray[2]*1 + timeArray[1] * 60 + timeArray[0] * 3600
}
function getTimeString(time) {
  hour = Math.floor(time / 3600)
  rest = time%3600
  min = Math.floor(rest/ 60)
  sek = rest%60
  if (hour < 10) {
    hourString = "0" + hour
  } else {
    hourString = "" + hour
  }
  if (min < 10) {
    minString = "0" + min
  } else {
    minString = "" + min
  }
  if (sek < 10) {
    sekString = "0" + sek
  } else {
    sekString = "" + sek
  }
  return hourString + ":" + minString + ":" + sekString
}
function processPatientDiseases(level) {
  patDiseases.length = 0
  medCosts = 0
  pointsWithMeds = 0
  pointsWithoutMeds = 0

  $patDiseases = jQuery('div#medi_diseases').children()
  for (var i = 0; i < $patDiseases.length-1; i++) {
    patDiseases.push(jQuery('div[id*=name]', jQuery($patDiseases[i])).text())
  }

  //value Calculation
  for (var i = 0; i < patDiseases.length; i++) {
    diseaseId = getDiseaseId(patDiseases[i])
    medId = getMedIdForDisease(diseaseId)
    medCosts += getMedPrice(medId)
    pointsWithMeds += getPointsForDisease(diseaseId, level, true)
    pointsWithoutMeds += getPointsForDisease(diseaseId, level, false)
    if (wwLevel >= 9 && jQuery('div[id*=time]', jQuery('div#medi_diseases').children()[i]).text().indexOf("Dauer:") === 0) {
      oldTimeString = jQuery('span', jQuery('div[id*=time]', jQuery('div#medi_diseases').children()[i])).text()
      oldTime = getTime(oldTimeString)
      newTime = oldTime * 0.9
      newTimeString = getTimeString(newTime)
      jQuery('span', jQuery('div[id*=time]', jQuery('div#medi_diseases').children()[i])).text(newTimeString)
    }
  }
  pointsWithMeds += patDiseases.length-1
  pointsWithoutMeds += patDiseases.length-1
  pointsWithMeds = Math.floor(pointsWithMeds)
  pointsWithoutMeds = Math.floor(pointsWithoutMeds)

  if (wwLevel >= 1) {
    pointsWithMeds *= 1.05
    pointsWithoutMeds *= 1.05
  }
  if (wwLevel >= 6) {
    pointsWithMeds *= 1.05
    pointsWithoutMeds *= 1.05
  }
  if (wwLevel == 10) {
    pointsWithMeds *= 1.1
    pointsWithoutMeds *= 1.1
  }
  pointsWithMeds = Math.floor(pointsWithMeds)
  pointsWithoutMeds = Math.floor(pointsWithoutMeds)
  minEarning = minPayment - medCosts
  maxEarning = maxPayment - medCosts
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
function getPointsForDisease(diseaseId, level, medsUsed) {
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
  wwLevel = jQuery('#wwLevel').val()
  var cookieName = "KHWWLevel" + jQuery('#username').text()
  setCookie(cookieName, wwLevel, 100, "/", window.location.hostname)
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
    if (wwLevel > 0) {
      //add WWBonusSentence
      jQuery('<div id="wwClue" style="position:absolute;left:90px;color:red">Die Boni durch das<br />WW Stufe ' + wwLevel +'<br />wurden hinzugerechnet!</div>').insertAfter('div#medi_kick')
      if (jQuery('div#medi_wunder').length) {
        jQuery('div#medi_wunder').css('left','235px')
        jQuery('div#medi_wunder').next().css('left','270px')
      }
    }
  }
}
function progressWWAccountOptionsWindow() {
  if (!jQuery('div#KHAdvancedMedRackConfig').length) {
    jQuery('<div id="WWConfig" style="margin-top: 60px;">Abgeschlossene Weltwunderstufe der ÄV: <input id="wwLevel" type="number" size="4" onChange="saveWWConfig()" value="' + wwLevel + '" min="0" max="10"></div>').insertAfter('div#b')
  } else {
    jQuery('<div id="WWConfig">Abgeschlossene Weltwunderstufe der ÄV: <input id="wwLevel" type="number" size="4" onChange="saveWWConfig()" value="' + wwLevel + '" min="0" max="10"></div>').insertAfter('div#KHAdvancedMedRackConfig')
  }
}
//End AdvancedPatientView
//Begin General
function setCookie(name, value, expires, path, domain) {
  // set time, it's in milliseconds
  var today = new Date();
  today.setTime(today.getTime());
  if (expires) {
    expires = expires * 1000 * 60 * 60 * 24;
  }
  var expires_date = new Date(today.getTime() + (expires));
  
  document.cookie = name + "=" + escape(value) +
  ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
  ( ( path ) ? ";path=" + path : "" ) +
  ( ( domain ) ? ";domain=" + domain : "" );
}
function getCookie(check_name) {
  var a_all_cookies = document.cookie.split( ';' );
  var a_temp_cookie = '';
  var cookie_name = '';
  var cookie_value = '';
  var b_cookie_found = false; // set boolean t/f default f

  for (i = 0; i < a_all_cookies.length; i++) {
    // now we'll split apart each name=value pair
    a_temp_cookie = a_all_cookies[i].split( '=' );

    // and trim left/right whitespace while we're at it
    cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

    // if the extracted name matches passed check_name
    if (cookie_name == check_name) {
      b_cookie_found = true;
      // we need to handle case where cookie has no value but exists (no = sign, that is):
      if ( a_temp_cookie.length > 1 ) {
      	cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
      }
      // note that in cases where cookie is initialized but no value, null is returned
      return cookie_value;
      break;
    }
    a_temp_cookie = null;
    cookie_name = '';
  }
  if (!b_cookie_found) {
    return null;
  }
}
//End General
//Begin Script
addFunctions()
addAccounting(readyAccounting)
addJQuery(readyJQuery)
//End Script