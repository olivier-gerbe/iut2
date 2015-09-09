		
//========================================================
//========================================================
//===================== TestPerso ============================
//========================================================
//========================================================

var TestPersos_byid = {};
var TestPersos_list = [];

var TestPersos_label = [];
TestPersos_label[0] = "Ouverture d'esprit";
TestPersos_label[1] = "Ethnocentrisme";
TestPersos_label[2] = "Stabilité émotionnelle";
TestPersos_label[3] = "Capacité à communiquer";
TestPersos_label[4] = "Empathie";
TestPersos_label[5] = "Complexité attributionnelle";
TestPersos_label[6] = "Confiance en soi";

var TestPersos_texte = [];
TestPersos_texte[0] = "Qualifie l'attitude d'une personne faisant preuve d'une grande tolérance, manifestant de l'intérêt, de la curiosité et de la compréhension pour les idées qui différent en partie.";
TestPersos_texte[1] = "Tendance à privilégier les normes et valeurs de sa propre société pour analyser les autres sociétés.";
TestPersos_texte[2] = "Capacité de l’individu a être au plus juste de lui même (ses émotions, ses sensations, ses motivations et les fluctuations de ces états) et à rester présent face aux différents évènements (ou responsabilités) prévus ou imprévus qu’il va vivre.";
TestPersos_texte[3] = "Cette capacité est axée sur la mobilisation des informations et des ressources permettant de s'exprimer à l'aide de divers types de langages, en tenant compte du contexte.";
TestPersos_texte[4] = "L'empathie consiste à saisir avec autant d'exactitude que possible, les références internes et les composantes émotionnelles d'une autre personne et à les comprendre comme si l'on était cette autre personne.";
TestPersos_texte[5] = "Lors de l’analyse d’un phénomène ou d’un comportement, tendance à préférer les explications complexes aux explications simples.";
TestPersos_texte[6] = "Évaluation réaliste et ponctuelle qu’on a les ressources nécessaires pour affronter une situation particulière.";

//==================================
UIFactory["TestPerso"] = function( node )
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	this.trait_personnalites = $("asmContext:has(metadata[semantictag*='question'])",node);
};

//==================================
UIFactory["TestPerso"].prototype.displayView = function(destid,type,lang,parentid)
//==================================
{
	var html = "";
	$("#"+destid).html(html);  // to empty html
	var html = "";
	for (var i=0; i<this.trait_personnalites.length;i++){
		var uuid = $(this.trait_personnalites[i]).attr("id");
		html  = "<div class='trait_personnalite'>";
		html += UICom.structure["ui"][uuid].getLabel() + UICom.structure["ui"][uuid].resource.getView();
		html += "</div><!-- class='trait_personnalite'-->";
	}
	$("#"+destid).html(html);
};
//==================================
UIFactory["TestPerso"].prototype.displayEditor = function(destid,type,lang) {
//==================================
	var html = "";
	for (var i=0; i<this.trait_personnalites.length;i++){
		var uuid = $(this.trait_personnalites[i]).attr("id");
		html  = "<div class='trait_personnalite'>";
		html += UICom.structure["ui"][uuid].getLabel() + " <span id='trait_"+uuid+"'></span>";
		html += "</div><!-- class='trait_personnalite'-->";
		$("#"+destid).append($(html));
		UICom.structure["ui"][uuid].resource.displayEditor("trait_"+uuid);
	}
};

//==================================
UIFactory["TestPerso"].prototype.displayResult = function(destid,type,lang) {
//==================================
	var html = "";
	$("#"+destid).html(html);  // to empty html
	var html = "";
	html += "<div class='row'>";
	html +="<div class='span5'>";
	for (var i=1; i<8;i++){
		var questions = $("asmContext:has(metadata[semantictag*='question"+i+"'])",this.node);
		var sum = 0;
		var manque = false;
		for (var j=0;j<questions.length;j++){
			var uuid = $(questions[j]).attr("id");
			var value = parseInt(decrypt(UICom.structure["ui"][uuid].resource.value_node.text().substring(3),g_rc4key).substring(3));
			if (isNaN(value))
				manque =true;
			else
				sum += value;
		}
		if (i==5)
			html +="</div><div class='span1'></div><div class='span5'>";
		html += "<h4>"+TestPersos_label[i-1]+"</h4>";
		html += "<p>"+TestPersos_texte[i-1]+"</p>";
		var result = (sum/questions.length).toFixed(1);
		if (result<2)
			html += "<img src='../img/trait-echelle1.png'/>";
		else if (result<4)
			html += "<img src='../img/trait-echelle2.png'/>";
		else if (result<6)
			html += "<img src='../img/trait-echelle3.png'/>";
		else if (result<8)
			html += "<img src='../img/trait-echelle4.png'/>";
		else
			html += "<img src='../img/trait-echelle5.png'/>";
		html += " " + result +"/10";
		if (manque)
			html += " Attention - Des questions n'ont pas été renseignées.";
	}
	html += "</div><!-- class='span'-->"
	html += "</div><!-- class='row'-->";
	$("#"+destid).html(html);
};

//==================================
UIFactory["TestPerso"].loadparse = function(uuid,destid,type) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/" + uuid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			UIFactory["TestPerso"].parse(data);
			if (type=='detail')
				TestPersos_byid[uuid].displayEditor(destid);
			if (type=='detail-result')
				TestPersos_byid[uuid].displayResult(destid);
		}
	});
};

//==================================
UIFactory["TestPerso"].refresh = function(parentid,destid) 
//==================================
{
	if (parentid!=null)
		TestPersos_byid[parentid].displayEditor(destid);
	else {
		TestPersos_Display('TestPersos-short','short');
		TestPersos_Display('TestPersos-detail','detail',$("asmStructure:has(metadata[semantictag='internships'])", g_portfolio_current).attr('id'));
	}
};

//==================================
UIFactory["TestPerso"].parse = function(data) 
//==================================
{
	var uuid = "";
	var items = $("portfolio",data);
	for ( var i = 0; i < items.length; i++) {
		try {
			uuid = $(items[i]).attr('id');
			TestPersos_byid[uuid] = new UIFactory["TestPerso"](items[i]);
		} catch(e) {
			alert("Error:"+uuid);
		}
	}
};

//==================================
UIFactory["TestPerso"].remove = function(uuid)
//==================================
{
	UICom.DeleteNode(uuid);
	$("#"+uuid,g_portfolio_current).remove();
	UIFactory["TestPerso"].parse(g_portfolio_current);
	TestPersos_Display('TestPersos-short','short');
	TestPersos_Display('TestPersos-detail','detail',$("asmStructure:has(metadata[semantictag='internships'])", g_portfolio_current).attr('id'));
};

//==================================
function getTraits(uuid,type)
//==================================
{
	if($('#key'+type).val()!='') {
		g_rc4key = $('#key'+type).val();
		$('#key'+type).val("");
		$("#traits-personnalites"+type).html("");
		UIFactory.TestPerso.loadparse(uuid,'traits-personnalites'+type,type);
	} else {
		$("#traits-personnalites"+type).html("Vous devez saisir une clé.");
	}
}

//==================================
function TestPerso_Display(destid,type,test_perso_nodeid) {
//==================================
	$("#"+destid).html("");
	var html ="";
	if (type=='detail' || type=='detail-result') {
		html += "<div class='titre2'><span class='titre1'>Mes traits de personnalités</span>";
		var uuid = UICom.structure["ui"][test_perso_nodeid].resource.getView();
		div = "<div><p>Les réponses du test de personnalité sont confidentielles. Elles sont encryptées grâce à une clé que vous êtes seul à connaître. ";
		div += "Cette clé n'est pas mémorisée dans le système. Vous devrez retaper cette même clé à chaque fois que vous voudrez accéder au test ou aux résultats du test. ";
		div += "Si vous oubliez votre clé, vous devrez en saisir une nouvelle et recommencer le test.";
		div += "<br><br>Tapez votre clé : <input type='password' id='key"+type+"' type='text' style='vertical-align:top;'/> <button style='vertical-align:middle;' onclick=\"javascript:getTraits('"+uuid+"','"+type+"');\">ok</button></p></div>";
		div += "<div id='traits-personnalites"+type+"' class='alert alert-rose alert-block edition'></div>";
		$("#"+destid).append($(div));
	}
	if (type=='short') {
		html = "<span><i class='fa fa-angle-right fa-lg'></i>&nbsp;<a href='#' onclick=\"javascript:$('#tabs_histo li:eq(6) a').tab('show')\">Voir le formulaire de test</span>";
		$("#"+destid).append($(html));
	}
	if (type=='short-result') {
		html = "<span><i class='fa fa-angle-right fa-lg'></i>&nbsp;<a href='#' onclick=\"javascript:$('#tabs_comp li:eq(5) a').tab('show')\">Voir le résultat du test</span>";
		$("#"+destid).append($(html));
	}

}

