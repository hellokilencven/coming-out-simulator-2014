function Start(){

	$ = {};
	
	/////// SET UP SCENE ////////

	Show("background","coffeehouse");
	Show("cup","cup_steam",{x:44,y:359});
	Show("nicky","coffee_nicky_still");

	PlaySound("bg","coffeehouse",{loop:-1, volume:0.4});

	//////////////////////////////

	N("<b>COMING OUT SIMULATOR 2015</b>");
	N("Ez egy valós eseményeken alapuló játék kiegészítve kitalált dolgokkal.");
	N("Helló és üdv a játékban!");
	N("Mit szeretnél csinálni?");

	Choose({
		"Szerinted? Szeretnék játszani ezzel a... izével.": Play,
		"A rettentő hosszú háttérsztori érdekel!": function(){
			Credits("A rettentő hosszú háttérsztori érdekel!");
		},
		"Mondj el mindent erről a játékról!": function(){
			About("Mondj el mindent erről a játékról!");
		}
	});

}

function SipCoffee(message){
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	PlaySound("sfx","coffee_sip");
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");
}

function Play(message){
	
	SipCoffee(message);

	// Asked neither
	if(!$.asked_about && !$.asked_credits){
		N("Remek! Akkor vágjunk is bele!");
		N("Nem volt kedved szórakozni a háttérsztori, vagy a játékleírás olvasásával, igaz?");
		p("Hát...");
		N("Oké, oké; nem baj.");
	}
	// Asked both
	if($.asked_about && $.asked_credits){
		p(". . .");
		p("Miért lehet többféle válaszra is klikkelni, ha a játék vége ugyanaz?");
		N("Gőzöm sincs.");
	// Asked either
	}else if($.asked_about || $.asked_credits){
		N("Rendben.");
	}

	N("Utazzunk vissza az időben öt évet, egészen 2010-ig...");
	p("ÖT ÉVET fogsz elmesélni??");
	N("...addig az estéig, ami örökre megváltoztatta az életemet.");

	N("Mondd csak, hogy képzeled el a játék végét?");

	Choose({
		"Virágokkal, szivárvánnyal és meleg unikornisokkal.": function(message){
			$.main_menu_convo_1 = 1;

			p(message);
			N("Igen, pontosan így fog végződni a sztori!");
			p("Tényleg?!");
			N("Nem.");
			Play_2();
		},
		"Egy kávézóban fogsz ücsörögni a laptopoddal.": function(message){
			$.main_menu_convo_1 = 2;

			p(message);
			N("Hé, én programozok ezen a laptopon. Így készült el ez a játék is, amivel most játszol.");
			p("Mintha halogatnád a kezdést...");
			N("És ezt pont te mondod?");
			p("Touché.");
			N("Egyébként...");
			Play_2();
		},
		"MINDENT BEBORÍT MAJD A VÉÉÉR!!": function(message){
			$.main_menu_convo_1 = 3;

			p(message);
			N("Hű, kicsit eltúlzod a dolgod, a történetem azért nem ENNYIRE tragikus.");
			p("VÉÉÉÉR!!");
			N("Haver, kicsit túl sok horrort néztél...");
			Play_2();
		}
	});

}

function Play_2(){

	if(!$.asked_about){
		N("Ha nem ugrottad át a játékleírást, már tudod, hogy ez egy nagyon személyes sztori.");
		p("Ööö, jaa...");
	}

	N("Ezzel a játékkal azokat a párbeszédeket lehet újrajátszani, amiket én folytattam a szüleimmel és az exbarátommal.");
	N("Olyan dolgok hangzanak majd el, amiket kimondtunk, amit ki kellett volna mondanunk, és amiket soha nem kellett volna kimondanunk..");
	N("Nem számít, hogy melyik melyik.");
	N("Ennyi idő után már nem...");

	Choose({
		"De egy játékot sem lehet megnyerni helyes válaszok nélkül. Gondolom ezt sem.": function(message){
			$.main_menu_convo_2 = 2;

			p(message);
			N("Így van.");
			p(". . .");
			Play_3();
		},
		"Kicsit depis vagy, nem? Ez a szöveg elég lehangoló.": function(message){
			$.main_menu_convo_2 = 1;

			p(message);
			N("Az élet is ELÉGGÉ lehangoló.");
			p("Szóval depis vagy. Mondtam.");
			Play_3();
		},
		"Akkor ez egy igaz történeten alapuló játék, ami tele van hazugságokkal?": function(message){
			$.main_menu_convo_2 = 3;

			p(message);
			N("Mindegyik párbeszéd élethű, az is, ami teljes kamu. Nem az a fontos, hogy megtörtént, hanem hogy bármikor megtörténhet bárkivel.");
			p(". . .");
			Play_3();
		}
	});

}

function Play_3(){

	N("A játék során a 2010-es énemmel fogsz játszani.");
	if(!$.asked_credits){
		N("Ha nem olvastad el a háttérsztorit, akkor annyit rólam, hogy a (még nem teljesen hivatalos) nevem Nick Case. Csak, hogy tudd.");
		p("Ööö, oké.");
	}

	var whatISay;
	switch($.main_menu_convo_1){
		case 1: whatISay = "Ez a játék nem szívárványokon vágtató meleg unikornisokkal fog végződni. "; break;
		case 2: whatISay = "Ez a játék egy előbújás története, a fejlődésnek és a múlttal való megbékélésnek a története. "; break;
		case 3: whatISay = "Ez a játék nem vérrel, hanem könnyekkel fog végződni. "; break;
	}
	switch($.main_menu_convo_2){
		case 1: whatISay += "Bocsi, amiért kicsit lehangolóra sikerült."; break;
		case 2: whatISay += "És nincsenek jó válaszok."; break;
		case 3: whatISay += "És tele van hazugságokkal."; break;
	}
	N(whatISay);

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);

	p("Hé, én ezt csak úgy mondtam...");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);

	Wait(500);
	Show("nicky","coffee_nicky_throw");
	PlaySound("sfx","coffee_throw");
	
	Wait(1000);
	Show("nicky","coffee_nicky_still_2");
	Wait(500);
	
	N("Amikor játszol...");
	N("Bölcsen válogasd meg a szavaidat.");
	N("Minden karakter emlékezni fog mindenre, amit nekik mondtál. Vagy nem mondtál.");
	p("Ja. Ennek ellenére te generáltad a választási lehetőségeimet a főmenüben.");
	N("Nagyjából.");

	N(". . .");
	N("Vannak dolgok, amikre nehéz nem emlékezni.");
	
	Clear();
	Start_Jack_1();

}

function Credits(message){

	$.asked_credits = true;
	
	if($.asked_about){
		SipCoffee(message);
	}else{
		SipCoffee("A borzasztó hosszú háttérsztori érdekel!");
	}
	
	N("Oké, akkor először hadd mutatkozzam be.");
	N("Helló, a nevem Nick Case.");
	N("Ez nem valami hivatásos nevem, ez az IGAZI nevem.");

	p("Ez nagyon furcsa, haver.");
	if($.asked_about){
		p("Mintha az előbb azt mondtad volna, hogy ez a saját történeted.");
	}else{
		p("Mindegy. Végül is akkor te csináltad ezt a játékot, ugye?");
	}

	N("Így van, írója, programozója, grafikusa és főszereplője vagyok a Coming Out Simulatornak.");

	if($.asked_about){
		p("Mindezt saját magadnak?");
		p("Már mondtam és még mondani fogom...");
		p("Nagyon nárcisztikus vagy.");
		N("Nos, ez nem csak rólam szól.");
		N("Csak a zajokat és a zenéket csinálta más. Azokat csak úgy letöltöttem a netről.");
	}else{
		N("Csak a zajokat és a zenéket csinálta más. Azokat csak úgy letöltöttem a netről.");
	}

	N("Bár többnyire a játék mögött csak én vagyok...");
	N("...a sztori mögött sok ember van.");

	if($.asked_about){
		Choose({
			"Ha már így szóba került, kezdjünk játszani!": Play
		});
	}else{
		Choose({
			"Most, hogy ezt megbeszéltük, akár játszhatnánk is.": Play,
			"Miért csináltad meg ezt a játékot? (Játékleírás)": function(){
				About("Miért csináltad meg ezt a játékot??");
			}
		});
	}

}

function About(message){

	$.asked_about = true;

	SipCoffee(message);

	if($.asked_credits){
		N("Szerettem volna elmesélni a történetemet.");
	}else{
		N("Ez a játék...");
		N("...több egy társalgás-szimulátornál, nekem ez tényleg...");
		N("...egy nagyon személyes történet.");
	}
	
	p("Hát persze, te kis egoista.");
	N("...kösz.");

	if($.asked_credits){
		p("Habár ha tényleg az lennél, az igazi nevedet használnád.");
		N("Már mondtam neked hogy ez az IGAZI ne-..");
		p("Okééé, okéé, felfogtam...");
	}

	N("Ezt a játékot egy játékkészítő versenyre csináltam. Jó kifogás volt a gép előtt ülésre, és biztosított egy határidőt is.");
	p("Gondolom az utolsó pillanatig halogattad az elküldését.");
	N("Hát... ja.");
	N("Jut eszembe, ezt a játékot bárki letöltheti és módosíthatja, mint most a Hello90 blog.");
	N("Nyílt forráskódú, akárcsak a szexualitásom.");

	p("SASTAPS!");
	N("Akarsz még hallani programozós vicceket?");
	p("Kösz, de most inkább... nem.");

	if($.asked_credits){
		Choose({
			"Csak hadd játszak végre ezzel a játékkal.": Play
		});
	}else{
		Choose({
			"Túl vagyunk a rossz vicceken is, most már játszhatunk végre?": Play,
			"Szóval ki is vagy te? (Háttérsztori)": function(){
				Credits("Szóval ki is vagy te?");
			}
		});
	}

}
