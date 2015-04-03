// Then we broke up soon/X...
// Three stories (Lie / Truth / Half-truth) ... one interaction with each.
// Did you skip or not? Tie that into the sections.
// Your final choice, a whaaaaaat.

function Start_Outro(){

	// Just clear dialogue & stuff.
	queue(ClearScene,0);
	
	/////// SET UP SCENE ////////

	Show("background","coffeehouse_2");
	Show("cup","cup_steam",{x:44,y:359});
	Show("nicky","coffee_nicky_still");

	PlaySound("bg","coffeehouse",{loop:-1, volume:0.7});

	///////////////////////////////

	if($.breaking_up_soon){
		N("Aztán három hét múlva szakítottunk.");
	}else{
		N("Aztán három hét múlva szakítottunk.");
	}

	// Weave - intro
	if($.main_menu_convo_1==1){
		p("...");
		N("Mondtam, hogy nem meleg unikornisokkal végződik majd a sztori.");
	}else if($.main_menu_convo_1==3){
		p("...");
		N("Megmondtam. Semmi vér, csak könnyek.");
	}else if($.main_menu_convo_2==1){
		p("...");
		N("Igazad volt a játék elején. Kicsit tényleg depressziós vagyok.");
	}

	Choose({
		"Ez nagyon... megindító.":function(message){
			p(message);
			N("Engedd szabadjára az érzéseidet, barátom.");
			Closure();
		},
		"Ó, jesszus, ez eléggé megrázó...":function(message){
			p(message);
			N("Az, nem tagadom.");
			Closure();
		},
		"Nem számítottam rá, hogy ez következik majd...":function(message){
			p(message);
			N("Hát ja... Mi se számítottunk rá.");
			Closure();
		}
	});

}

function Closure(){

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);

	p("Úúú.");
	p("Konkrétan szarul érzem magam, amiért ugyanolyanok a párbeszéd buborékjaim, mint az apádnak.");

	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("Érdekes, hogy emlékszel rá. Csak az övé különbözik a többi karaktertől.");
	N("Egyébként természetesen minden nevet megváltoztattam, kivéve az enyémet.");
	N("Ezt a kisöcsém miatt tettem, mert ő nem tehet semmiről.");
	N("És az apámat is én írtam bele a történetbe, mert egyébként még 2010 előtt elhagyta a családunkat.");

	if($.main_menu_convo_2==3){
		N("Látod, megmondtam, hogy ez egy igaz történeten alapuló játék tele hazugságokkal.");
	}
	
	p("Akkor is adhattál volna az én szövegemnek egy másik színt.");
	N("Nem igazán volt fontos a dolog, amikor csináltam a játékot.");
	N("Mit gondolsz ezek után, hogy zárult végül a sztori?");

	if($.main_menu_convo_2==2){
		N("Ne aggódj, ahogy a legelején is mondtam, itt nincsenek jó vagy rossz válaszok.");
	}

	$.coming_out_stories_left = 3;
	$.order_of_stories = [];

	Choose({
		"Haver, tényleg nem tudom, nyögd már ki!": function(message){
			p(message);
			N("Oké-oké, már is elmondom, mi történt végül.");
			N("...és mi történt azután, meg azután.");
			p("MONDD MÁR!");
			Closure_Story();
		},
		"Azért végül jobbra fordultak a dolgok, ugye?": function(message){
			p(message);
			N("Persze! Mindhárom verzióban jobbra fordultak a dolgok.");
			p("DE HOGYAN?");
			Closure_Story();
		},
		"Virágok, szivárványok és meleg unikornisok?": function(message){
			p(message);
			N("Naná! Legalább egy verziónak így kellett végződnie.");
			p("A vágtató unikornisoknál nincs jobb happy end, ez tény.");
			Closure_Story();
		}
	});

}

function Closure_Story(){

	if($.coming_out_stories_left==3){
		N("Melyik lezárást akarod először hallani?");
		N("Nyugi, elmondom majd mind a hármat.");
	}else if($.coming_out_stories_left==2){
		N("Oké, melyik lezárás legyen a következő?");
	}else if($.coming_out_stories_left==1){
		N("Végül, íme az utolsó verzió...");
	}else{
		Finale_1();
		return;
	}

	$.coming_out_stories_left -= 1;

	var options = [];
	if(!$.told_story_lie) options["A hazugság."]=Tell_Me_A_Lie;
	if(!$.told_story_truth) options["Az igazság."]=Tell_Me_A_Truth;
	if(!$.told_story_half_truth) options["A féligazság."]=Tell_Me_A_Half_Truth; 
	Choose(options);

}

function Is_Last_Story(){
	if($.coming_out_stories_left==0){
		if($.asked_about && $.asked_credits){
			p("Megint jössz a válaszlehetőségekkel, pedig tudom, hogy a végén ugyanoda lyukadunk ki...");
		}else{
			p("Miért csináltál több válaszlehetőséget, ha mindegy hová klikkelek, egyféle vége van a sztorinak?");
			N("Nem tudom. Haladjunk.");
		}
	}
}



function Tell_Me_A_Lie(message){

	$.told_story_lie = true;
	$.order_of_stories.push("lie");

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("Nagyon szépen végződött a történetem.");
	Is_Last_Story();

	N("Elmenekültem otthonról, és nem volt nálam más, csak egy sporttáska, tele ehető alsónadrágokkal.");
	if($.im_a_poet){
		N("Elutaztam a nagy fehér Északra. Abból éltem, hogy amatőr verseket írtam idegeneknek.");
	}else{
		N("Elutaztam a nagy fehér Északra. Abból éltem, hogy viccesnek szánt webes játékokat csináltam.");
	}
	N("Virágokat ettem. Követtem a szivárványt. És persze összebarátkoztam egy meleg unikornissal.");
	p("...");
	N("Végül Alaszkában kötöttem ki, ahol összebarátkoztam két másik biszexuálissal, Bonnie-val és Clyde-dal.");
	N("Bonnie egy harmincas évei közepén járó nő volt, Clyde pedig egy alig negyvenes férfi.");

	// FAMILY WITH BENEFITS
	// Weave in -- top or bottom

	Choose({
		"Asszem az ehető alsó egyszerre jelent ruházkodást és ételt is.": function(message){
			$.outro_convo_lie = 1;
			p(message);
			N("A rugalmasságomnak hála kevés helyet foglalnak el a cuccaim!");
			Tell_Me_A_Lie_2();
		},
		"Ez egy elbaszott sztori a kúrásról.": function(message){
			$.outro_convo_lie = 2;
			p(message);
			N("AZ ÉN SZTORIM. AZ ÉN SZABÁLYAIM.");
			Tell_Me_A_Lie_2();
		},
		"...vén kecske.": function(message){
			$.outro_convo_lie = 3;
			p(message);
			N("Aki megnyalta a sót.");
			Tell_Me_A_Lie_2();
		}
	});
}
function Tell_Me_A_Lie_2(){
	
	N("Befogadtak, mint egy árva gyereket, és én lettem a kis játékszerük.");

	if($.outro_convo_lie==1){
		p("...újabb bizonyítéka a rugalmasságodnak.");
	}

	switch($.top_or_bottom){
		case "top": N("Mint tudjuk, általában én vagyok 'a férfi' a párkapcsolatokban."); break;
		case "bottom": N("Mint tudjuk, általában én vagyok 'a nő' a párkapcsolatokban."); break;
		case "versatile": N("Mint tudjuk, néha én vagyok 'a lány' a párkapcsolatokban."); break;
	}

	N("Felneveltek, szerettek és a társadalom produktív tagjává tettek.");

	switch($.outro_convo_lie){
		case 2: p("És ha közelebbről megnézed ezt a repedést, benne még több apró repedés van."); break;
		case 3: p("..."); break;
	}

	N("Ők lettek az új családom.");
	N("Család... extrákkal.");

	p("...");

	Closure_Story();

}





function Tell_Me_A_Truth(message){

	$.told_story_truth = true;
	$.order_of_stories.push("truth");

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("Íme az igazság...");
	Is_Last_Story();

	N("Megfogadtam Jack tanácsát és kiparodizáltam az Eredetet az új játékomban.");
	switch($.inception_answer){
		case "awake": N("Igazából mikor cseteltünk nem mondtam, hogy szerintem Cobb ébren volt az Eredet végén."); break;
		case "dream": N("Igazából mikor cseteltünk nem mondtam, hogy az Eredet végét csak álmodja a főhős."); break;
		case "neither": N("Még mindig nem hiszem, hogy számít, hogy az Eredet végén eldől-e a búgócsiga."); break;
	}
	N("Az elkészült játék a Reimagine egész sikeres volt.");
	N("Ennek köszönhetően pár hónappal később programozó lettem az EA-nél. Elég messzire költöztem a családomtól.");

	Choose({
		"Őő, Electronic Arts...?": function(message){
			$.outro_convo_truth = 3;
			p(message);

			N("Ja, tudom, tudom.");
			N("Már bánom, hogy ilyen kis béna játékokat csináltam, mint ez is.");
			p("Hát bánhatod is.");
			Tell_Me_A_Truth_2();
		},
		"És a munkahelyed LMBTQ barát?": function(message){
			$.outro_convo_truth = 2;
			p(message);

			N("Igen, szuper hely.");
			p("Na, ennek örülök.");
			Tell_Me_A_Truth_2();
		},
		"Ó, az EA király, ők csinálták a Simset, nem?": function(message){
			$.outro_convo_truth = 1;
			p(message);

			N("Ja! Bár én nem azon dolgoztam, hanem egy webes verzióján a--");
			N("[NEM FEDHETEM FEL, BOCSIKA.]");
			p("Ó. Menő.");
			Tell_Me_A_Truth_2();
		}
	});

}
function Tell_Me_A_Truth_2(){
	
	N("Az EA után független lettem.");
	N("De még mindig tartom a kapcsolatot az ottani kollégákkal az EA-tól, és nem is költöztem el onnan.");

	N("Sokkal profibb lettem.");
	N("És sokkal nyitottabb és barátságosabb.");
	N("Végre kezdek magamra találni.");

	switch($.outro_convo_truth){
		case 1: p("Alig várom, hogy bejelentsem a szuper új játékomat."); break;
		case 2: p("De komolyan, az EA az egyik legjobb munkahely a világon."); break;
		case 3: p("De most komolyan. Electronic Arts."); break;
	}

	Closure_Story();

}





function Tell_Me_A_Half_Truth(message){
	$.told_story_half_truth = true;
	$.order_of_stories.push("half-truth");

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");

	N("Ahogy akarod...");
	Is_Last_Story();

	N("Ironikus, de kiderült, hogy Claire is bi.");
	N("Egy "+$.studying_subject+" órán derült ki.");

	p("Micsoda csavar!");

	N("Claire is bizonytalan volt az identitásában, akárcsak én.");
	N("Mindketten tapasztalatlanok voltunk. Claire csak lányokkal volt korábban, én meg csak Jackkel.");

	// CLAIRE AND I HELPED EACH OTHER EXPLORE OURSELVES, LESS GUILT, MORE EXPERIENCE.
	// Weave in -- studying what

	Choose({
		"Szóval Claire olyan, mint te csak pont ellentét...": function(message){
			$.outro_convo_half_truth = 1;
			p(message);
			N("Hát, nem hiszem, hogy lehetne ellentétpárokat állítani.");
			p("Tudod, hogy értem.");
			N("Ja, értem. Sokban hasonlítunk. A szexuális élményeinket is megbeszéltük.");
			Tell_Me_A_Half_Truth_2();
		},
		"Szóval megmutattátok egymásnak az ellenkező nem szépségeit?": function(message){
			$.outro_convo_half_truth = 3;
			p(message);
			Tell_Me_A_Half_Truth_2();
		},
		"Végül keféltetek?": function(message){
			$.outro_convo_half_truth = 2;
			p(message);
			N("Olyan, mintha a húgom lenne. Az ember nem kefél a húgával.");
			p("Oké, bocs a feltételezésért.");
			N("De amúgy beszéltünk a szexuális élményeinkről.");
			Tell_Me_A_Half_Truth_2();
		}
	});

}
function Tell_Me_A_Half_Truth_2(){
	
	N("Adtunk egymásnak tippeket.");
	N("És gyakoroltuk egymáson a smárolást is.");
	p("Oké... ööö... logikus.");

	if($.changing_schools || !$.father_oblivious){
		N("A végén mégis átkerültem az ő sulijába.");
	}

	N("Legjobb barátok voltunk és még mindig azok vagyunk! Ma mindketten az USA-ban élünk, messze a bunkó családunktól..");
	N("Segítettünk egymásnak túllépni a bizonytalanságokon. Felfedeztük önmagunkat.");
	N("Büszke bi ribancok. Így kellene hívni minket.");

	p("Milyen megható történet. Asszem.");
	
	N("És persze egymás szárnysegédjei is vagyunk.");

	p("...");

	Closure_Story();

}





function Finale_1(){
	
	N("És ez az utolsó coming-out utáni rész!");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);
	
	Show("cup",null);
	Show("nicky","coffee_nicky_throw");
	PlaySound("sfx","coffee_throw");

	Wait(1000);
	Show("nicky","coffee_nicky_still_2");

	//////////////////////////

	N("Kedves játékos, nem tudtam nem észrevenni, hogy...");
	if($.order_of_stories[0]=="truth"){
		N("Az igazságot választottad először.");
	}else if($.order_of_stories[2]=="truth"){
		N("Az igazságot hagytad utoljára.");
	}else if($.order_of_stories[0]=="lie"){
		N("A hazugságot akartad először hallani.");
	}else{
		N("A hazugságot hagytad utoljára.");
	}
	N("Mit mond ez el rólad?...");
	p("...");

	p("Tudod... Általában, ha egy játéknak több lehetséges befejezése is van, nem mindegyiket lehet egyszerre lejátszani.");
	N("Komolyan azt gondoltad, van itt egyáltalán befejezés??");

	Choose({
		"Hadd találgassak... Ez még csak a kezdet?": function(message){
			p(message);
			N("Ez még csak a ke... Ó. Ja, így van. A kezdet.");
			Finale_2();
		},
		"Hát ja. Na, ennek a játéknak vége, ugye?": function(message){
			p(message);
			N("Igen, de a történet, ami az én személyes történetem, folytatódik.");
			Finale_2();
		},
		"Basszus milyen hosszú még ez a játék?": function(message){
			p(message);
			N("Nyugi, a következő kattintás az utolsó. Tényleg.");
			Finale_2();
		}
	});

}

function Finale_2(){

	Show("nicky","coffee_nicky_packup_1");

	N(". . .");
	N("Tudod, ha visszamehetnék és újraélhetnék minden lehetséges döntést ezzel kapcsolatban...");
	N("... amit valamilyen módon meg is tettem ezzel a játékkal...");
	N("... Nem változtatnék semmin.");

	Show("nicky","coffee_nicky_packup_2");

	// SERIOUSNESS.
	PlaySound("sfx","laptop_shut");
	PlaySound("bg","bedroom_1",{loop:-1, volume:0.4});

	p("? ? ?");

	if($.punched){
		N("Az elolvasott SMS-eim. Hogy iskolát kellett váltanom. A pofon.");
	}else if($.father_oblivious==false){
		N("Az elolvasott SMS-eim. Hogy iskolát kellett váltanom. Az összes sértés, amit a fejemhez vágtak.");
	}else if($.changing_schools){
		N("Az elolvasott SMS-eim. Hogy iskolát kellett váltanom. A 'melegrehab' ötlete Clairrel.");	
	}else{
		N("Az elolvasott SMS-eim. Hogy nincs több szabad órám iskola után. A 'melegrehab' ötlete Clairrel.");
	}

	N("A dolog Stockholm-szindrómás értelmében az egészért hálás vagyok.");

	Choose({
		"Mi van?": Finale_3,
		"Mi vaan???": Finale_3,
		"Mi vaaaaaaaaaaaaaaan???!!!!?!?!?": Finale_3
	});

}

function Finale_3(message){

	p(message);

	PlaySound("sfx","laptop_pack");
	Show("nicky","coffee_nicky_packup_3");

	N("Igen, hálás vagyok!");
	N("Nem lettem volna ilyen motivált abban, hogy a saját sorsom kovácsa legyek... ha ezt megelőzően nem lett volna az életem egy kalap szar.");

	PlaySound("sfx","laptop_pack_2");
	Show("nicky","coffee_nicky_packup_4");

	N("A három történetem... Hazugság,  igazság, féligazság... legalább egy dolog igaz mindháromra.");
	N("Hogy idővel jobb lesz.");

	p("...");

	N("És...");
	N("Végül...");
	N("Ebben a hosszú, egyszerű és kicsit fájdalmas játékban...");
	N("Ahol azok ellen játszottam, akiknek mellettem kellett volna állniuk...");

	p("...");

	N("Én nyertem.");
	N("...");
	N("Én nyertem.");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);

	// CUTSCENE -- MY NEW BOYFRIEND
	Wait(1000);
	
	PlaySound("sfx2","laptop_pack");
	Show("nicky","coffee_nicky_date_1");
	Wait(1000);
	
	PlaySound("sfx","step_2");
	Show("nicky","coffee_nicky_date_2");
	Wait(1000);
	
	PlaySound("sfx","step_1");
	Show("nicky","coffee_nicky_date_3");
	Wait(1000);
	
	PlaySound("sfx","step_2",{volume:0.75});
	Show("nicky","coffee_nicky_date_4");
	Wait(1000);

	PlaySound("sfx","step_1",{volume:0.5});
	Show("nicky",null);
	Wait(1000);

	PlaySound("sfx","step_2",{volume:0.25});
	Choose({
		"Ismétlés?": Finale_4
	});

}
function Finale_4(message){
	
	p(message);
	N("Az életben nincs ismétlés.");
	p("...")
	p("...")
	p("Oké. Értem.")
	p("Köszi a játékot!")
	

	Wait(800);
	queue(function(){
		document.getElementById("game").setAttribute("screen","blank");
	},1000);
	//queue(ClearScene,0); // coz the sound's cool!
	queue(function(){
		document.getElementById("game").setAttribute("screen","credits");
	},0);


}


