# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.delete_all
admin = User.create!(:name => "Sarzema",
                     :email => "khplanner@gmx.de",
                     :password => "foobar",
                     :password_confirmation => "foobar")
admin.toggle!(:admin)

DoctorLevel.create!(:level_name => "Blutiger Anf�nger (1)", :points => 0, :level_text => "Ab sofort kannst du Brecheritis und Nasenfl�gelakne behandeln! Au�erdem kannst du nun den Raum Behandlungsraum und Aufenthaltsraum bauen!")
DoctorLevel.create!(:level_name => "Nachttisch-Reiniger (2)", :points => 50, :level_text => "Ab sofort kannst du Gebrochener Arm behandeln! Au�erdem kannst du nun den Raum R�ntgenraum und Weihnachtsbaum bauen!")
DoctorLevel.create!(:level_name => "Urinbeutelwechsler (3)", :points => 200, :level_text => "Ab sofort kannst du Sch�rfwunde behandeln! Au�erdem kannst du nun den Raum Krankenbett bauen!")
DoctorLevel.create!(:level_name => "Bettpfannenreiniger (4)", :points => 500, :level_text => "Ab sofort kannst du Gebrochenes Bein und Sch�delbrummen behandeln! Au�erdem kannst du nun den Raum Blumenk�bel bauen!")
DoctorLevel.create!(:level_name => "Pf�rtner (5)", :points => 1000, :level_text => "Ab sofort kannst du Zwergfellentz�ndung behandeln! Au�erdem kannst du nun den Raum Burger-Bude bauen!")
DoctorLevel.create!(:level_name => "Nachtw�chter (6)", :points => 3000, :level_text => "Ab sofort kannst du Segelohrentz�ndung und Fr�nkisches Wurzelfieber und Wechselbalgjahre behandeln! Au�erdem kannst du nun den Raum Ultraschall und M�llk�bel bauen!")
DoctorLevel.create!(:level_name => "W�rmflaschenbef�ller (7)", :points => 12000, :level_text => "Ab sofort kannst du Luftpocken und Galliensteine behandeln! Au�erdem kannst du nun den Raum Showb�hne bauen!")
DoctorLevel.create!(:level_name => "Spritzenputzer (8)", :points => 17000, :level_text => "Ab sofort kannst du Aufgerollte Fu�n�gel und Knorpelverknautschung behandeln! Au�erdem kannst du nun den Raum Orthop�die und Telefonzelle bauen!")
DoctorLevel.create!(:level_name => "Kinderschreck (9)", :points => 28000, :level_text => "Ab sofort kannst du Eierkopf behandeln! Au�erdem kannst du nun den Raum Kaffeestube bauen!")
DoctorLevel.create!(:level_name => "Blinddarm-Binder (10)", :points => 40000, :level_text => "Ab sofort kannst du Rummelplatzkrankheit und Faulenzia behandeln! Au�erdem kannst du nun den Raum Psychotherapie und Kleiner Brunnen bauen!")
DoctorLevel.create!(:level_name => "Praktikant (11)", :points => 70000, :level_text => "Ab sofort kannst du Herzschmerzgeschnulze und Herzklappenklappern behandeln! Au�erdem kannst du nun den Raum EKG / EEG und Colaautomat bauen!")
DoctorLevel.create!(:level_name => "Aushilfe (12)", :points => 115000, :level_text => "Ab sofort kannst du Furunkelfunkeln und Zungenverknotung behandeln! Au�erdem kannst du nun den Raum Operationssaal bauen!")
DoctorLevel.create!(:level_name => "Schleimhaut-Schnippler (13)", :points => 165000, :level_text => "Ab sofort kannst du Wasserallergie und Nierenkiesel behandeln! Au�erdem kannst du nun den Raum Laboratorium und Klapperndes Gebiss bauen!")
DoctorLevel.create!(:level_name => "Gipsbemaler (14)", :points => 220000, :level_text => "Ab sofort kannst du Stinkek�sefu� behandeln! Au�erdem kannst du nun den Raum Putzwagen bauen!")
DoctorLevel.create!(:level_name => "Brechbecherreiniger (15)", :points => 280000, :level_text => "Ab sofort kannst du Nagelbettwackeln behandeln! Au�erdem kannst du nun den Raum Toiletten bauen!")
DoctorLevel.create!(:level_name => "Essenswagenfahrer (16)", :points => 350000, :level_text => "Ab sofort kannst du Schlaflosigkeit und Koffeinhypersensibilit�t und Milchbart behandeln! Au�erdem kannst du nun den Raum Dunkelkammer bauen!")
DoctorLevel.create!(:level_name => "Teddydoktor (17)", :points => 440000, :level_text => "Ab sofort kannst du Brett vorm Kopf behandeln!")
DoctorLevel.create!(:level_name => "Krankenhaus-Clown (18)", :points => 550000, :level_text => "Ab sofort kannst du Marserianerimpfung und Arbeitsallergie behandeln! Au�erdem kannst du nun den Raum Gummizelle bauen!")
DoctorLevel.create!(:level_name => "Blutspender (19)", :points => 800000, :level_text => "Ab sofort kannst du Haarbruch und Rot-Gr�n-Fieber und Flederh�hlenkopf und Dicker Kopf und Lykantropitis behandeln! Au�erdem kannst du nun den Raum Tomographie bauen!")
DoctorLevel.create!(:level_name => "Ampullen�ffner (20)", :points => 1100000, :level_text => "Ab sofort kannst du Silberblick und Emosyndrom behandeln!")
DoctorLevel.create!(:level_name => "Holzbeinverl�ngerer (21)", :points => 1500000, :level_text => "Ab sofort kannst du Sonnenbankbrand und Frosch im Hals und Vampitis behandeln! Au�erdem kannst du nun den Raum Tropenmedizin bauen!")
DoctorLevel.create!(:level_name => "Arztkittelb�gler (22)", :points => 1950000, :level_text => "Ab sofort kannst du Drehwurm und Zweckenbefall behandeln!")
DoctorLevel.create!(:level_name => "Skalpellsch�rfer (23)", :points => 2450000, :level_text => "Ab sofort kannst du Dauerm�digkeit und Darmvergilbung und Schnarcheritis behandeln!")
DoctorLevel.create!(:level_name => "Narko...*schnarch* (24)", :points => 3000000, :level_text => "Ab sofort kannst du viereckige Augen und Heimweh und Barthaarverzwirbelung behandeln!")
DoctorLevel.create!(:level_name => "Krankenbettenschieber (25)", :points => 3600000, :level_text => "Ab sofort kannst du Kussmundatem und Bad-Hair-Day-Syndrom und Sauklaue behandeln!")
DoctorLevel.create!(:level_name => "Hustensaftschmuggler (26)", :points => 4250000, :level_text => "Ab sofort kannst du Rapunzelsyndrom und Frostbeulen und Schlitzohr behandeln!")
DoctorLevel.create!(:level_name => "Party-Psychologe (27)", :points => 5000000, :level_text => "Ab sofort kannst du Roseng�rtel und Innenohr voller Hammer, Amboss und Steigb�gel und Sturmfrisur behandeln! Au�erdem kannst du nun den Raum Nuklearmedizin bauen!")
DoctorLevel.create!(:level_name => "Tropfsteinleger (28)", :points => 6000000, :level_text => "Ab sofort kannst du Pferdefu� und Holopocken behandeln!")
DoctorLevel.create!(:level_name => "Tablettenbutler (29)", :points => 7250000, :level_text => "Ab sofort kannst du Sp�lwurm und Dickdarmdi�tsyndrom und Gehirndurchzug behandeln! Au�erdem kannst du nun den Raum Zahnmedizin bauen!")
DoctorLevel.create!(:level_name => "Hypochonderschreck (30)", :points => 8550000, :level_text => "Ab sofort kannst du Knoblauchfahne und Strohkopf behandeln!")
DoctorLevel.create!(:level_name => "Sch�ner Chirurg (31)", :points => 9900000, :level_text => "Ab sofort kannst du Dauerschnupfen und Fleuchhusten und Zahnschmerzen behandeln!")
DoctorLevel.create!(:level_name => "Schwesternschreck (32)", :points => 11300000, :level_text => "Ab sofort kannst du Stumpfe Z�hne und Hummeln im Hintern behandeln!")
DoctorLevel.create!(:level_name => "Infusionsbeutelh�nger (33)", :points => 12750000, :level_text => "Ab sofort kannst du Grippeimpfung und Venenverwesung und Br�llfroschr�lpsen behandeln!")
DoctorLevel.create!(:level_name => "Leukozytenz�hler (34)", :points => 14250000, :level_text => "Ab sofort kannst du Feuermal und Ringfingerschwur behandeln!")
DoctorLevel.create!(:level_name => "Organspender (35)", :points => 15800000, :level_text => "Ab sofort kannst du Ohrschneckenauswanderung behandeln!")
DoctorLevel.create!(:level_name => "Zahnsteinmetz (36)", :points => 17400000, :level_text => "Ab sofort kannst du Tomaten auf den Augen und Zombiefizitis behandeln!")
DoctorLevel.create!(:level_name => "Medizinmann (37)", :points => 19050000, :level_text => "Ab sofort kannst du (Ohr-)Schmalzlocke und Hippiephilie behandeln!")
DoctorLevel.create!(:level_name => "H�moglobinf�rber (38)", :points => 20750000, :level_text => "Ab sofort kannst du Lampenfieber und Currywurstjieper behandeln!")
DoctorLevel.create!(:level_name => "Hexendoktor (39)", :points => 22500000, :level_text => "Ab sofort kannst du W�rfelhusten und Hitzewallung behandeln!")
DoctorLevel.create!(:level_name => "Schonkostkoster (40)", :points => 24300000, :level_text => "Ab sofort kannst du Bierbauch und Tollwutfiffi behandeln!")
DoctorLevel.create!(:level_name => "Voodoo-Priester (41)", :points => 26150000, :level_text => "Ab sofort kannst du Mumpitzimpfung und Kopflausbuben behandeln!")
DoctorLevel.create!(:level_name => "Knochenbrecher (42)", :points => 28050000, :level_text => "Ab sofort kannst du Tr�nens�cke und Glatzitis behandeln!")
DoctorLevel.create!(:level_name => "Sanit�ter (43)", :points => 30000000, :level_text => "Ab sofort kannst du Fingernagelbruch und Kampfadern behandeln!")
DoctorLevel.create!(:level_name => "Pflasterkleber (44)", :points => 32000000, :level_text => "Ab sofort kannst du Stinkebefall und Holzkopf behandeln!")
DoctorLevel.create!(:level_name => "Stationsschwester (45)", :points => 34050000, :level_text => "Ab sofort kannst du Pobackenflattern und Schleimbeutel�berproduktion behandeln!")
DoctorLevel.create!(:level_name => "Z�pfchenk�nig (46)", :points => 36150000, :level_text => "Ab sofort kannst du Zwei linke H�nde und Feuchte Aussprache behandeln!")
DoctorLevel.create!(:level_name => "Blumendoktor (47)", :points => 38300000, :level_text => "Ab sofort kannst du Koffeinmangel und Fu�fliegenpilz behandeln!")
DoctorLevel.create!(:level_name => "Pillenmeister (48)", :points => 40500000, :level_text => "Ab sofort kannst du Zahnstein und Wurzelekzem behandeln!")
DoctorLevel.create!(:level_name => "Veterin�r (49)", :points => 42750000, :level_text => "Ab sofort kannst du Rotes Kniekehlchen behandeln!")
DoctorLevel.create!(:level_name => "Salbenfee (50)", :points => 45050000, :level_text => "Ab sofort kannst du Lippenbl�tlerwarze behandeln!")
DoctorLevel.create!(:level_name => "Krankenkassen-Kassierer (51)", :points => 47400000, :level_text => "Ab sofort kannst du Flatterndes Nabelpiercing behandeln!")
DoctorLevel.create!(:level_name => "Bandagenkasper (52)", :points => 49800000, :level_text => "Ab sofort kannst du Rundr�cken behandeln!")
DoctorLevel.create!(:level_name => "Rettungswagenfahrer (53)", :points => 52250000, :level_text => "Ab sofort kannst du Peitschenfloh behandeln!")
DoctorLevel.create!(:level_name => "Furunkelfakir (54)", :points => 54750000, :level_text => "Ab sofort kannst du Gurgelhupf behandeln!")
DoctorLevel.create!(:level_name => "Erste-Hilfe-Leister (55)", :points => 57300000, :level_text => "Ab sofort kannst du Leberk�serk�ltung behandeln!")
DoctorLevel.create!(:level_name => "Schleimbeutelscheich (56)", :points => 59900000, :level_text => "Ab sofort kannst du Seekrankheit behandeln!")
DoctorLevel.create!(:level_name => "Medizinstudent (57)", :points => 62550000, :level_text => "Ab sofort kannst du Kiefernzapfenverrenkung behandeln!")
DoctorLevel.create!(:level_name => "Gallensteinmurmler (58)", :points => 65250000, :level_text => "Ab sofort kannst du Salzf�sschen behandeln!")
DoctorLevel.create!(:level_name => "Erste-Hilfe-Ausbilder (59)", :points => 68000000, :level_text => "Ab sofort kannst du Milzbier�berdruss behandeln!")
DoctorLevel.create!(:level_name => "Pickelpr�fer (60)", :points => 70800000, :level_text => "Ab sofort kannst du Schieldr�sensyndrom behandeln!")
DoctorLevel.create!(:level_name => "Allgemeinmediziner (61)", :points => 73650000, :level_text => "Ab sofort kannst du Katzenjammern behandeln!")
DoctorLevel.create!(:level_name => "Vorkammerj�ger (62)", :points => 76550000, :level_text => "Ab sofort kannst du Muskelk�tzchen behandeln!")
DoctorLevel.create!(:level_name => "Wunderheiler (63)", :points => 79500000, :level_text => "Ab sofort kannst du Akkuschrauberpunkturl�cher behandeln!")
DoctorLevel.create!(:level_name => "Betten�berzieher (64)", :points => 82500000, :level_text => "Ab sofort kannst du Lungenseifenblasen behandeln!")
DoctorLevel.create!(:level_name => "Dr. Frankenstein (65)", :points => 85550000, :level_text => "Ab sofort kannst du Solarplexusd�mmerung behandeln!")
DoctorLevel.create!(:level_name => "Schockhocker (66)", :points => 88650000, :level_text => "Ab sofort kannst du Tomatenmarkgef�llte Knochen behandeln!")
DoctorLevel.create!(:level_name => "El Doctore (67)", :points => 91800000, :level_text => "Ab sofort kannst du Einhornhautentz�ndung behandeln!")
DoctorLevel.create!(:level_name => "Tablettenschubse (68)", :points => 95000000, :level_text => "Ab sofort kannst du Zwirbeldr�senverzwirbelung behandeln!")
DoctorLevel.create!(:level_name => "verr�ckter Professor (69)", :points => 98250000, :level_text => "Ab sofort kannst du gest�rtes Wurzelchakra behandeln!")
DoctorLevel.create!(:level_name => "Hospital Chef (70)", :points => 99999999)