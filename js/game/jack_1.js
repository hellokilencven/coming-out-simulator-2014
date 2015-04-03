// PLOT BEATS:
// 1) In medias res talking about Inception
// 2) Thanks for movie, we still up to stay over tomorrow night?
// 3) You need to stop hiding... // Can't even CALL.
// Weave in previous bits of convo pieces.
// Also, FULL CIRCLE with the Inception!
// OKAY, TOO CONVOLUTED, CUT OUT THE DIFFERENT FAMILIES & TYPO parts.

function Start_Jack_1(){
	
	/////// SET UP SCENE ////////

	Show("background","bedroom");
	Show("us","bedroom_us_1");
	Show("light","bedroom_light_1",{x:0,y:159});

	PlaySound("bg","bedroom_1",{loop:-1});

	/////////////////////////////

	j("És amikor csak így egyszerűen kijelentette, hogy");
	j("'Megvettem a légitársaságot.';");
	j("...az valami zseniális volt!");
	n("Jaa, szóval ezt mondta!");
	n("Kicsit elbambultam, csak azt vettem észre, hogy rajtam kívül mindenki röhög.");
	j("Legközelebb ne a moziban aludj, hanem előtte éjszaka.");
	j("Amúgy szerinted mi volt az a búgócsigás jelenetet a végén? Azt álmodta, vagy akkor már ébren volt?");

	Choose({
		"Csak álmodta.": Inception_Dream,
		"Szerintem az már a valóságban történt.": Inception_Awake,
		"Nem számít. A lényeg, hogy újra együtt voltak.": Inception_Neither
	});

}

function Inception_Dream(message){

	$.inception_answer = "dream";

	n(message);
	j("Szóval szerinted Saito ajánlata a körözés megszűntetéséről csak hazugság volt?");
	n("Igen, az ilyen mindig hazugság...");
	j("Jaj már. Már megint depis vagy?");

	Choose({
		"A szívem szinte szétszakad a szüntelen szenvedéstől.": Sadsack,
		"Általában... kivéve, amikor veled vagyok.": function(message){
			$.im_a_poet = true;
			
			n(message);
			j("Jaj Nicky, egy melegszívű költő veszett el benned.");
			n("Hozz francia bagettet és bort, hogy igazi művésznek tűnjek,");
			n("...és csak úgy szórom majd az ilyen fennkölt bókokat.");
			n("Egyébként...");
			Thanks();
		},
		"Csak szimplán realista vagyok.": function(message){
			$.hippies = true;

			n(message);
			j("Próbáld meg pozitívabban látni a világot.");
			n("Te pedig próbálj meg kevésbé hippi lenni.");
			n("Egyébként...");
			Thanks();
		}
	});

}
function Inception_Awake(message){

	$.inception_answer = "awake";
	$.im_a_poet = true;

	n(message);
	n("Ellenkező esetben az egész film hazugság lenne.");
	n("És mi értelme egy hazugságban leélt életnek?");
	j("Jaj Nicky, egy költő veszett el benned...");
	j("Tényleg, összességében hogy tetszett a film?");

	Choose({
		"Jaaaaj, nagyon!": function(message){
			n(message);
			Thanks();
		},
		"Hát néhányszor eléggé felkavaró volt.": function(message){
			n(message);
			j("Szerintem ez volt a cél.");
			n("Akkor küldetés teljesítve.");
			n("Egyébként...");
			Thanks();
		},
		"Még most se értem teljesen, hogy miről szólt.": function(message){
			n(message);
			j("Szóval nem tetszett.");
			n("Egyébként...")
			Thanks();
		}
	});

}
function Inception_Neither(message){

	$.inception_answer = "neither";

	n(message);
	j("Hmm?");
	n("Nem is érdekelte, hogy eldől-e a toteme.");
	n("Hazugság vagy igazság... Cobbsot már nem érdekelte.");
	n("Végre boldog volt, csak ez számított.");
	j("Vagy nagyon költői vagy, vagy nagyon depresszív.");

	Choose({
		"Költő vagyok, akiben ez csak most tudatosult!": function(message){

			$.im_a_poet = true;

			n("Költő vagyok,");
			n("és eddig még csak tudatában sem voltam ennek a ténynek!");
			j("Ami tény, az tény, a kortárs költészet ékköve vagy...");
			n("Na, nem kell gúnyolódni.");
			n("Egyébként...");
			Thanks();

		},
		"A szívem szinte szétszakad a... blablabla.": Sadsack,
		"Valami ilyesmi.":function(message){

			$.hippies = true;
			$.im_a_poet = true;

			n(message);
			n("A KÖLTÉSZET FÁJDALOM. A MŰVÉSZET SZENVEDÉS.");
			j("Úgy beszélsz, mint az anyám.");
			n("A szüleid <i>annyira</i> hippik.");
			n("Egyébként...");
			Thanks();

		}
	});

}

function Sadsack(message){
	
	$.sadsack = true;

	n(message);
	j("Sajnálom.");
	j("Remélem, azért a kis mozis randink kicsit megdobta a kedved.");
	n("Naná!");
	Thanks();

}

function Thanks(){
	
	n("...szeretném megköszönni, hogy rábeszéltél végül az Eredetre.");
	j("Nincs mit.");
	j("Amúgy meg kellene csinálnod az Eredet paródiáját egy ilyen webes játékban!");
	n("Senki se játszaná végig...");
	n("Programozás helyett inkább találkozzunk holnap este!");

	j("Szuper ötlet!");
	n("Remélem meg tudom győzni anyámékat, hogy engedjenek át éjszakára is.");

	j("Remélem nem azt mondtad nekik megint, hogy csak tanultunk.");
	n("Majd úgy teszek, mintha egész éjjel a félévi vizsgákra készültünk volna, jó?");

	j("Egy ilyen kaliberű dologról nem hazudhatsz akármeddig.");
	n("Jack...");

	Choose({
		"Ők sohasem tudhatják meg.": function(message){
			$.coming_out_readiness="no";
			n(message);
			j("Nicky, most komolyan; soha?");
			Hiding();
		},
		"Bár elmondhatnám nekik az igazat.": function(message){
			$.coming_out_readiness="yes";
			n(message);
			Hiding();
		},
		"Még nem készültem fel rá, hogy beavassam őket.": function(message){
			$.coming_out_readiness="maybe";
			n(message);
			j("Szívesen segítek benne, ha gondolod.");
			Hiding();
		}
	});

}

function Hiding(){

	j("Nicky, ez a rejtőzködés felemészti a lelked is.");

	if($.inception_answer=="awake"){
		j("Ahogy te is mondtad az előbb, 'mi értelme egy hazugságban leélt életnek'?");
	}
	if($.inception_answer=="dream"){
		j("Ez így nem egy... hogy is mondtad az előbb? Nem egy irdatlan nagy hazugság?");
	}

	if($.sadsack){
		j("Az előbb azt mondtad, hogy a szíved szétszakad a szenvedéstől.");
		j("Tudom, hogy az nem csak egy vicc volt.");
	}

	n("Jaj Jack, ugyan már...");
	j("Én már előbújtam a szüleimnek tavaly.");
	if($.hippies){
		n("Ez így egyáltalán nem fair!");
		n("Te és a szüleid megrögzött hippik vagytok!");
		n("Amikor nálatok vagyok, könyökölni lehet a fűszagra.");
		j("Hé! Az a lábfájásukra van, oké?");
		n("Annyi spangli után csoda, hogy érzik a lábukat.");
		j("A lényeg, hogy a szüleim tökre támogatják az előbújást.");
	}else{
		j("Velem is nagyon megértőek voltak!");
	}

	j("Most Kanadában vagy. Itt az emberek többsége pozitívan viszonyul az ilyesmihez.");
	j("Miért gondolod, hogy pont a szüleid, akik feltétel nélkül szeretnek nem lennének megértőek?");

	Choose({
		"Tradicionális ázsiai család vagyunk. A szüleim nem ennyire toleránsak.": Hiding_2,
		"Nem tudom... Talán tényleg csak rá kellene szánnom magam.": Hiding_2,
		"Ők a tanulást leszámítva semmmit sem támogatnak.": Hiding_2
	});

}

function Hiding_2(message){
	
	n(message);

	if($.coming_out_readiness=="no"){
		n("Még egyszer; ők SOHA NEM TUDHATJÁK MEG.");
	}

	j("Talán csak máshogy kellene hozzáállnod a beszélgetéshez.");
	j("Velem is mindig csak üzenetekben kommunikálsz telefonálás helyett.");
	j("...mert azt gondolod, hogy az emberek nem szívesen hallgatnának végig.");
	j("De ők a szüleid és mindig szeretni fognak téged.");

	n("Bár így lenne...");

	j("Oké, az üzengetés is a kommunikáció egy fajtája.");
	j("Egy kiüresedett, felszínes és lélektelen formája.");

	if($.im_a_poet){
		n("Ilyen modoros szavakkal, te is majdnem olyan jó lennél amatőr költőnek, mint én.");
		j("Áá, én inkább az a rapper típus vagyok.");
	}

	if($.coming_out_readiness=="yes"){
		j("Te is azt kívánod magadban, hogy bárcsak elmondhatnád nekik.");
		j("Tedd meg.");
	}else{
		j("Nicky.");
	}
	j("Mondd el nekik ma este.");

	Choose({
		"Ma este?! Kizárt.": Hiding_3,
		"Hát... Megpróbálhatom.": Hiding_3,
		"Inkább majd csak utalok rá óvatosan.": Hiding_3
	});

}

function Hiding_3(message){
	
	n(message);
	j(". . .");
	n("Nem akarom sokkolni az álszent lelkivilágukat.");
	n("De valahogy meg kell győznöm őket, ha át akarok menni hozzád holnap este.");
	n("Majd felhozom a tanulást, hogy mennyit segítesz benne.");
	j(". . .");
	n("Kész van a vacsora, le kell mennem a földszintre.");

	j("Hé... amúgy én egyetértek veled.");
	n("Miben?");
	j("A véleményeddel, hogy mit jelentett a film utolsó jelenete.");
	switch($.inception_answer){
		case "dream": j("Cobb szerintem is benne ragadt egy álomban, és hazugságban élt tovább."); break;
		case "awake": j("Cobb szerintem is a valósgban csatlakozott a családjához."); break;
		case "neither": j("Szerintem sem számít az igazság, addig a pontig, amíg Cobb boldognak érzi magát."); break;
	}
	n("Aha. Értem.");
	j("Akkor jó.");
	if($.coming_out_readiness=="maybe"){
		j("Azért remélem meggondolod magad és elmondod nekik az igazat.");
	}
	j("Sok szerencsét. Mindenképp írj egy óra múlva!");

	var insult = "";
	if($.hippies) insult+=" kis hippi";
	if($.im_a_poet) insult+=" amatőr költők gyöngye";
	n("Szia.");
	if(insult!=""){
		n("Te"+insult+".");
	}else{
		n("Te kis gyagyás.");
	}

	Jack_1_End();

}

function Jack_1_End(){
	Clear();
	Start_Dinner_1();
}
