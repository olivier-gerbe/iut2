var obj_label = {};
obj_label['job-unit'] = "Emploi";
obj_label['diploma-unit'] = "Diplôme";
obj_label['diploma-unit IUT2'] = "Diplôme IUT2";
obj_label['formation-unit'] = "Formation";
obj_label['internship-unit'] = "Stage";
obj_label['alternance-unit'] = "Alternance";
obj_label['experience_perso-unit'] = "Expérience personnelle";
obj_label['project-unit'] = "Projet tuteuré";

var view_label = new Array();
view_label['resume'] = "Vue d'ensemble";
view_label['academiques'] = "Formations académiques";
view_label['autresformations'] = "Autres formations";
view_label['experiencespro'] = "Expériences professionnelles";
view_label['experiencesperso'] = "Expériences personnelles";
view_label['langues'] = "Langues";
view_label['traitsperso'] = "Traits de personnalité";
view_label['projet'] = "Projet";
view_label['cours'] = "Cours";
view_label['description'] = "Ma description";
view_label['competence'] = "Mes compétences préférées";
view_label['metier'] = "Mon métier";
view_label['carte'] = "Ma carte";


//================================
function getNavbar(portfolioid) {
//================================
	var navbar = "";
	var ids = "portfolioid="+portfolioid;
	navbar += "<div class='navbar'>";
	navbar += "    <div class='navbar-inner'>";
	navbar += "      <div class='container-fluid'>";
	navbar += "        <a data-target='.navbar-responsive-collapse' data-toggle='collapse' class='btn btn-navbar'><span class='icon-bar'></span><span class='icon-bar'></span><span class='icon-bar'></span></a>";
	if (l_userrole=='etudiant')
		navbar += "        <a href='#' onclick=\"javascript:show_view('accueil');\" class='brand'>";
	if (l_userrole=='superviseur')
		navbar += "        <a href='mainSuperviseur.htm?"+ids+"' class='brand'>";
	navbar += "        <em class='icon-fixed-width icon-home'></em> E<strong>&middot;</strong>portfolio4*</a>";
	navbar += "        <div class='nav-collapse collapse navbar-responsive-collapse'>";
	navbar += "          <ul class='nav'>";
	navbar += "            <!-- <li class='active'><a href='#'><em class='icon-fixed-width icon-home'></em>Accueil</a> </li>-->";

	if ((g_userrole=='etudiant' || l_userrole=='superviseur')) {
        navbar += "            <li class='dropdown'>";
        navbar += "              <a data-toggle='dropdown' class='dropdown-toggle' href='#'><em class='fa fa-heart'></em> Réseau social<strong class='caret'></strong></a>";
        navbar += "              <ul class='dropdown-menu'>";
        if (elgg_auth_cas) {
	        navbar += "                <li><a href='"+elgg_url_absolute+"services/api/rest/xml/?method=auth.cas&redir=/activity' target='_blank'>Activités du réseau</a></li>";
	        navbar += "                <li><a href='"+elgg_url_absolute+"services/api/rest/xml/?method=auth.cas&redir=/activity/owner/"+USER.username_node.text()+"' target='_blank'>Mon activité</a></li>";
	        navbar += "                <li><a href='"+elgg_url_absolute+"services/api/rest/xml/?method=auth.cas&redir=/groups/member/"+USER.username_node.text()+"' target='_blank'>Mes groupes</a></li>";
	        navbar += "                <li><a href='"+elgg_url_absolute+"services/api/rest/xml/?method=auth.cas&redir=/friends/"+USER.username_node.text()+"' target='_blank'>Mes contacts</a></li>";
	        navbar += "                <li><a href='"+elgg_url_absolute+"services/api/rest/xml/?method=auth.cas&redir=/messages/inbox/"+USER.username_node.text()+"' target='_blank'>Mes messages privés</a></li>";
	        navbar += "                <li><a href='"+elgg_url_absolute+"services/api/rest/xml/?method=auth.cas&redir=/profile/"+USER.username_node.text()+"' target='_blank'>Mon profil</a></li>";
        } else {
	        navbar += "                <li><a href='"+elgg_url_base+"thewire/all' target='_blank'>Mur du réseau</a></li>";
	        navbar += "                <li><a href='"+elgg_url_base+"activity/owner/"+USER.username_node.text()+"' target='_blank'>Mes publications</a></li>";
	        navbar += "                <li><a href='"+elgg_url_base+"groups/member/"+USER.username_node.text()+"' target='_blank'>Mes groupes</a></li>";
	        navbar += "                <li><a href='"+elgg_url_base+"friends/"+USER.username_node.text()+"' target='_blank'>Mes contacts</a></li>";
	        navbar += "                <li><a href='"+elgg_url_base+"messages/inbox/"+USER.username_node.text()+"' target='_blank'>Mes messages privés</a></li>";
	        navbar += "                <li><a href='"+elgg_url_base+"profile/"+USER.username_node.text()+"' target='_blank'>Mon profil</a></li>";
        }
        navbar += "              </ul>";
        navbar += "            </li>";
}

/*
	if ((g_userrole=='etudiant' || l_userrole=='superviseur')   && elgg_url_base.indexOf("eportfolium")>-1) {
			navbar += "            <li class='dropdown'>";
			navbar += "              <a data-toggle='dropdown' class='dropdown-toggle' href='#'><em class='icon-heart'></em> Réseau social<strong class='caret'></strong></a>";
			navbar += "              <ul class='dropdown-menu'>";
			navbar += "                <li><a href='"+elgg_url_base+"activity'>Mur du réseau</a></li>";
			navbar += "                <li><a href='"+elgg_url_base+"activity/owner/"+USER.username_node.text()+"?auth_token="+g_elgg_token+"' target='_blank'>Mes publications</a></li>";
			navbar += "                <li><a href='"+elgg_url_base+"groups/member/"+USER.username_node.text()+"?authModeReq=CAS' target='_blank'>Mes groupes</a></li>";
			navbar += "                <li><a href='"+elgg_url_base+"friends/"+USER.username_node.text()+"?authModeReq=CAS' target='_blank'>Mes contacts</a></li>";
			navbar += "                <li><a href='"+elgg_url_base+"messages/inbox/"+USER.username_node.text()+"?authModeReq=CAS' target='_blank'>Mes messages privés</a></li>";
			navbar += "                <li><a href='"+elgg_url_base+"profile/"+USER.username_node.text()+"?authModeReq=CAS' target='_blank'>Mon profil</a></li>";
			navbar += "              </ul>";
			navbar += "            </li>";
		}
*/	
	if (l_userrole=='etudiant'){
		navbar += "            <li class='dropdown'>";
		navbar += "              <a data-toggle='dropdown' class='dropdown-toggle' href='#'><i class='fa fa-suitcase'></i> Mon e-portfolio<strong class='caret'></strong></a>";
		navbar += "         	  <ul class='dropdown-menu'>";
		navbar += "                <li class='nav-header'><i class='fa fa-suitcase'></i> Mon histoire</li>";
		navbar += "            	  <li><a onclick=\"javascript:show_view('historique','resume')\" href='#'>Vue d'ensemble</a></li>";
		navbar += "            	  <li><a onclick=\"javascript:show_view('historique','academiques')\" href='#'>Mes formations académiques</a></li>";
		navbar += "            	  <li><a onclick=\"javascript:show_view('historique','autresformations')\" href='#'>Mes autres formations</a></li>";
		navbar += "            	  <li><a onclick=\"javascript:show_view('historique','experiencespro')\" href='#'>Mes expériences pro.</a></li>";
		navbar += "            	  <li><a onclick=\"javascript:show_view('historique','experiencesperso')\" href='#'>Mes expériences perso.</a></li>";
		navbar += "            	  <li><a onclick=\"javascript:show_view('historique','langues')\" href='#'>Mes langues.</a></li>";
		navbar += "            	  <li><a onclick=\"javascript:show_view('historique','traitsperso')\" href='#'>Mes traits de personnalité</a></li>";
		navbar += "               <li class='divider'><br/></li>";
		navbar += "                <li class='nav-header'><i class='fa fa-suitcase'></i> Mon bilan</li>";
		navbar += "                <li><a href='#' onclick=\"javascript:show_view('competence','resume')\">Vue d'ensemble</a></li>";
		navbar += "                <li><a href='#' onclick=\"javascript:show_view('competence','metiers')\">Métiers</a></li>";
		navbar += "                <li><a href='#' onclick=\"javascript:show_view('competence','autres1')\">Transversales</a></li>";
		navbar += "                <li><a href='#' onclick=\"javascript:show_view('competence','autres2')\">Personnelles</a></li>";
		navbar += "                <li><a href='#' onclick=\"javascript:show_view('competence','langues')\">Linguistiques</a></li>";
		navbar += "                <li><a href='#' onclick=\"javascript:show_view('competence','traitsperso')\">Traits de personnalité</a></li>";
		navbar += "              </ul>";
		navbar += "            </li>";
//		navbar += "            <li class='dropdown'>";
//		navbar += "              <a data-toggle='dropdown' class='dropdown-toggle' href='#'><i class='fa fa-briefcase'></i> Mes Cours<strong class='caret'></strong></a>";
//		navbar += "              <ul class='dropdown-menu'>";
//		navbar += "                <li><a href='#' onclick=\"javascript:show_view('cours','list')\">Mon année</a></li>";
//		navbar += "              </ul>";
//		navbar += "            </li>";
		navbar += "            <li class='dropdown'>";
		navbar += "              <a data-toggle='dropdown' class='dropdown-toggle' href='#'><i class='fa fa-rocket'></i> Mon projet<strong class='caret'></strong></a>";
		navbar += "              <ul class='dropdown-menu'>";
		navbar += "                <li><a href='#' onclick=\"javascript:show_view('projet','description')\">Ma description</a></li>";
		navbar += "                <li><a href='#' onclick=\"javascript:show_view('projet','competence')\">Mes compétences préférées</a></li>";
		navbar += "                <li><a href='#' onclick=\"javascript:show_view('projet','metier')\">Mon métier</a></li>";
		navbar += "                <li><a href='#' onclick=\"javascript:show_view('projet','carte');loadBubbleTreeMap();\">Ma carte</a></li>";
		navbar += "              </ul>";
		navbar += "            </li>";
		navbar += "            <li class='dropdown'>";
		navbar += "              <a data-toggle='dropdown' class='dropdown-toggle' href='#'><em class='fa fa-book'></em> Mes CV<strong class='caret'></strong></a>";
		navbar += "              <ul class='dropdown-menu'>";
		navbar += "                <li><a href='#' onclick=\"javascript:show_view('cv','list')\">Lister les CV</a></li>";
		navbar += "                <li><a href='#' onclick=\"javascript:show_view('cv','create')\">Créer un CV</a></li>";
//		navbar += "                <li class='divider'><br/></li>";
//		navbar += "                <li class='nav-header'>Aide</li>";
//		navbar += "                <li><a href='#'>Guide de création de CV</a></li>";
//		navbar += "                <li><a href='#'>Demander un avis</a></li>";
//		navbar += "                <li><a href='#'>Prendre RDV avec un coach</a></li>";
		navbar += "              </ul>";
		navbar += "            </li>";
		if (g_userrole=='etudiant') {
			navbar += "            <li><a href='#' onclick=\"javascript:show_view('suivi')\"><i class='fa fa-tasks'></i> Mon suivi</a></li>";
		}
	}
	if (l_userrole=='superviseur'){
		navbar += "            <li><a href='#'><i class='fa fa-tasks'></i> Mes e-portfolios suivis</a></li>";		
	}
	if (l_userrole=='etudiant' && g_userrole!='etudiant'){
		navbar += "            <li><a href='#'><i class='fa fa-user btn-danger'></i> <span style='font-weight:bold;font-size:120%' id='profile-etudiant'></span></a></li>";
	}
	
	navbar += "          </ul>";
	navbar += "          <ul class='nav pull-right'>";
//	navbar += "            <li><a href='#'>Espace pro.</a></li>";
//	navbar += "            <li class='divider-vertical'><br/></li>";
//	navbar += "            <li><a href='#'><em class='icon-fixed-width icon-envelope'></em>(1)</a></li>";
//	navbar += "            <li><a href='#'><em class='icon-fixed-width icon-flag'></em>(10)</a></li>";
	navbar += "           <li><a data-toggle='dropdown' class='dropdown-toggle' href='#'>"+USER.firstname_node.text()+" "+USER.lastname_node.text()+" <em class='icon-cog'></em></a>";
	navbar += "              <ul class='dropdown-menu'>";
	navbar += "               <li><a href='../..'><em class='fa fa-times'></em> Se déconnecter</a></li>";
	navbar += "                <li><a href='#' onclick=\"javascript:show_view('profil','')\"><em class='fa fa-user'></em> Mon compte</a></li>";
	navbar += "              </ul>";
	navbar += "              <br/> ";
	navbar += "            </li>";
	navbar += "          </ul>";
	navbar += "        </div>";
	navbar += "      </div>";
	navbar += "    </div>";
	navbar += "  </div>";
	return navbar;
}




var footer = "";
footer += "<div class='row row-padded'>";
/*
footer += "<div class='muted' style='float:right'>propulsé par Karuta</div>";
footer += "<p class='muted' align='center'>E-portfolio4* - copyright IUT 2 Grenoble 2014 -<a href=''>Mentions l&eacute;gales</a> -<a href=''>Cr&eacute;dits</a> -<a href=''>Contact</a></p>";
*/
//footer += "<table style='width: 100%;'><tr><td align='left'><img src='../img/logoiut2footer.png'/></td><td align='center'><span class='muted' align='center'>E-portfolio4*&nbsp;&mdash;&nbsp;copyright IUT 2 Grenoble 2014&nbsp;&mdash;&nbsp;<a href=''>Mentions l&eacute;gales</a>&nbsp;&mdash;&nbsp;<a href=''>Cr&eacute;dits</a>&nbsp;&mdash;&nbsp;<a href=''>Contact</a></span></td>";
footer += "<table style='width: 100%;'><tr><td align='left'><img src='../img/logoiut2footer.png'/></td><td align='center'><span class='muted' align='center'>E<strong>&middot;</strong>portfolio4*&nbsp;&mdash;&nbsp;copyright IUT 2 Université Grenoble Alpes 2014-2016</span></td>";
footer += "<td align='right'><img src='../img/logokarutafooter.png'/></td>";
footer += "</tr></table>";
footer += "</div>";


//================================
function getNavbar2(portfolioid) {
//================================
	var navbar = "";
	var ids = "portfolioid="+portfolioid;
	navbar += "<div class='navbar'>";
	navbar += "    <div class='navbar-inner'>";
	navbar += "      <div class='container-fluid'>";
	navbar += "        <a data-target='.navbar-responsive-collapse' data-toggle='collapse' class='btn btn-navbar'><span class='icon-bar'></span><span class='icon-bar'></span><span class='icon-bar'></span></a>";
	if (l_userrole=='etudiant')
		navbar += "        <a href='mainEtudiant.htm?"+ids+"' class='brand'>";
	if (l_userrole=='superviseur')
		navbar += "        <a href='mainSuperviseur.htm?"+ids+"' class='brand'>";
	navbar += "        <em class='icon-fixed-width icon-home'></em> E-portfolio4*</a>";
	navbar += "        <div class='nav-collapse collapse navbar-responsive-collapse'>";
	navbar += "          <ul class='nav'>";
	navbar += "            <!-- <li class='active'><a href='#'><em class='icon-fixed-width icon-home'></em>Accueil</a> </li>-->";
	if (g_userrole=='etudiant' || l_userrole=='superviseur' || l_userrole=='tuteur') {
        navbar += "            <li class='dropdown'>";
        navbar += "              <a data-toggle='dropdown' class='dropdown-toggle' href='#'><em class='icon-heart'></em> Réseau social<strong class='caret'></strong></a>";
        navbar += "              <ul class='dropdown-menu'>";
        navbar += "                <li><a href='"+elgg_url_absolute+"services/api/rest/xml/?method=auth.cas&redir=/activity?authModeReq=CAS'>Mur du réseau</a></li>";
        navbar += "                <li><a href='"+elgg_url_absolute+"services/api/rest/xml/?method=auth.cas&redir=/activity/owner/"+USER.username_node.text()+"?authModeReq=CAS' target='_blank'>Mes publications</a></li>";
        navbar += "                <li><a href='"+elgg_url_absolute+"services/api/rest/xml/?method=auth.cas&redir=/groups/member/"+USER.username_node.text()+"?authModeReq=CAS' target='_blank'>Mes groupes</a></li>";
        navbar += "                <li><a href='"+elgg_url_absolute+"services/api/rest/xml/?method=auth.cas&redir=/friends/"+USER.username_node.text()+"?authModeReq=CAS' target='_blank'>Mes contacts</a></li>";
        navbar += "                <li><a href='"+elgg_url_absolute+"services/api/rest/xml/?method=auth.cas&redir=/messages/inbox/"+USER.username_node.text()+"?authModeReq=CAS' target='_blank'>Mes messages privés</a></li>";
        navbar += "                <li><a href='"+elgg_url_absolute+"services/api/rest/xml/?method=auth.cas&redir=/profile/"+USER.username_node.text()+"?authModeReq=CAS' target='_blank'>Mon profil</a></li>";
        navbar += "              </ul>";
        navbar += "            </li>";
}
	
	navbar += "          </ul>";
	navbar += "          <ul class='nav pull-right'>";
//	navbar += "            <li><a href='#'>Espace pro.</a></li>";
//	navbar += "            <li class='divider-vertical'><br/></li>";
//	navbar += "            <li><a href='#'><em class='icon-fixed-width icon-envelope'></em>(1)</a></li>";
//	navbar += "            <li><a href='#'><em class='icon-fixed-width icon-flag'></em>(10)</a></li>";
	navbar += "           <li><a data-toggle='dropdown' class='dropdown-toggle' href='#'>"+USER.firstname_node.text()+" "+USER.lastname_node.text()+"&nbsp;<em class='icon-cog'></em></a>";
	navbar += "              <ul class='dropdown-menu'>";
	navbar += "               <li><a href='accueil_eportfolio/index.html'><em class='icon-signout'></em> Se déconnecter</a></li>";
	navbar += "                <li><a href='profile.htm?"+ids+"'><em class='icon-fixed-width icon-user'></em> Mon compte</a></li>";
	navbar += "              </ul>";
	navbar += "              <br/> ";
	navbar += "            </li>";
	navbar += "          </ul>";
	navbar += "        </div>";
	navbar += "      </div>";
	navbar += "    </div>";
	navbar += "  </div>";
	return navbar;
}
/*
//à déplacer dans karuta.js ???
//==================================
function displayControlGroup_getView(destid,label,controlsid,nodeid) {
//==================================
	$("#"+destid).append($("<div class='control-group'><label class='control-label'>"+label+"</label><div id='"+controlsid+"' class='controls'></div></div>"));
	$("#"+controlsid).append(UICom.structure["ui"][nodeid].resource.getView());
}

//==================================
function displayControlGroup_displayView(destid,label,controlsid,nodeid,type,classitem) {
//==================================
	if (classitem==null)
		classitem="";
	$("#"+destid).append($("<div class='control-group'><label class='control-label "+classitem+"'>"+label+"</label><div id='"+controlsid+"' class='controls'></div></div>"));
	$("#"+controlsid).append(UICom.structure["ui"][nodeid].resource.getView());
}
*/

//==================================
function show_view(page,view)
//==================================
{
	$("div[name='page']").hide();
	$("#"+page).show();
	if (page=="historique" && view!=null) {
		$("#view_label_histo").html(view_label[view]);
		$("#tabs_histo a[href='#"+view+"_histo']").tab('show');
	}
	if (page=="competence" && view!=null) {
		$("#view_comp").html(view_label[view]);
		$("#tabs_comp a[href='#"+view+"_comp']").tab('show');
	}
	if (page=="cours" && view!=null) {
		$("#view_cours").html(view_label[view]);
		$("#tabs_cours a[href='#"+view+"_cours']").tab('show');
	}
	if (page=="projet" && view!=null) {
		$("#view_projet").html(view_label[view]);
		$("#tabs_projet a[href='#"+view+"_projet']").tab('show');
	}
	if (page=="cv" && view!=null) {
		$("#view_cv").html(view_label[view]);
		$("#tabs_cv a[href='#"+view+"_cv']").tab('show');
	}
}

//========================================================================
//========================================================================
//====================== Extraction des données ==========================
//========================================================================
//========================================================================

//==================================
function send_begin_data_xml()
//==================================
{
	$.ajax({
		type : "POST",
		contentType: "application/xml",
		dataType : "text",
		data : "<?xml version='1.0'  encoding='UTF-8' ?><!DOCTYPE xsl:stylesheet [<!ENTITY nbsp '&amp;#160;'>]><root>",
		url : "../../../"+serverVER+"/logging?n=1&user=false",
		success : function() {
		}
	});
	$.ajax({
		type : "POST",
		contentType: "application/xml",
		dataType : "text",
		data : "<?xml version='1.0'  encoding='UTF-8' ?><!DOCTYPE xsl:stylesheet [<!ENTITY nbsp '&amp;#160;'>]><root>",
		url : "../../../"+serverVER+"/logging?n=2&user=false",
		success : function() {
		}
	});
}

//==================================
function send_end_data_xml()
//==================================
{
	$.ajax({
		type : "POST",
		contentType: "application/xml",
		dataType : "text",
		data : "</root>",
		url : "../../../"+serverVER+"/logging?n=1&user=false",
		success : function() {
		}
	});
	$.ajax({
		type : "POST",
		contentType: "application/xml",
		dataType : "text",
		data : "</root>",
		url : "../../../"+serverVER+"/logging?n=2&user=false",
		success : function() {
		}
	});
}

//==================================
function send_data_csv()
//==================================
{
	var useruuid = Number(new Date());
	//------------- Profil ---------------------------
	var str = "";
	str += useruuid+";";
	str +=data2send_csv(profiles_list);
	str +=data2send_csv(TestPersos_list);
	str +=data2send_langues_csv();
	$.ajax({
		type : "POST",
		contentType: "application/xml",
		dataType : "text",
		data : str,
		url : "../../../"+serverVER+"/logging?n=1&user=false&info=false",
		success : function() {
			$("#log").append("|<i class='icon-ok-sign'>");
		}
	});
	//------------- Stages ---------------------------
	str = "";
	str += useruuid+";";
	str +=data2send_csv(stages_list);
	$.ajax({
		type : "POST",
		contentType: "application/xml",
		dataType : "text",
		data : str,
		url : "../../../"+serverVER+"/logging?n=2&user=false&info=false",
		success : function() {
			$("#log").append("<i class='icon-ok-sign'>");
		}
	});
	//------------- Experiences pro ---------------------------
	str = "";
	str += useruuid+";";
	str +=data2send_csv(experiences_list);
	$.ajax({
		type : "POST",
		contentType: "application/xml",
		dataType : "text",
		data : str,
		url : "../../../"+serverVER+"/logging?n=3&user=false&info=false",
		success : function() {
			$("#log").append("<i class='icon-ok-sign'>");
		}
	});
//	str +=data2send("Diplomas",diplomas_list);
//	str +=data2send("Formations",formations_list);
//	str +=data2send("Alternances",alternances_list);
//	str +=data2send("Projets",projets_list);
//	str +=data2send("ExperiencePersos",experience_persos_list);
	
	
}

//==================================
function send_data_xml()
//==================================
{
	var useruuid = Number(new Date());
	var str = "<line>";
	str += "<uuid>"+useruuid+"</uuid>";
	str +=data2send_xml("Profile",profiles_list);
	str +=data2send_xml("TestPersos",TestPersos_list);
	str +=data2send_langues_xml();
	str += "</line>";
	$.ajax({
		type : "POST",
		contentType: "application/xml",
		dataType : "text",
		data : str,
		url : "../../../"+serverVER+"/logging?n=1&user=false",
		success : function() {
			$("#log").append("<i class='icon-ok-sign'>");
		}
	});
//	str +=data2send("Diplomas",diplomas_list);
//	str +=data2send("Formations",formations_list);
	str = "<line>";
	str += "<uuid>"+useruuid+"</uuid>";
	str +=data2send_xml("Stages",stages_list);
//	str +=data2send("Alternances",alternances_list);
//	str +=data2send("Projets",projets_list);
//	str +=data2send("Experiences",experiences_list);
//	str +=data2send("ExperiencePersos",experience_persos_list);
	str += "</line>"
	
	$.ajax({
		type : "POST",
		contentType: "application/xml",
		dataType : "text",
		data : str,
		url : "../../../"+serverVER+"/logging?n=2&user=false",
		success : function() {
			$("#log").append("<i class='icon-ok-sign'>");
		}
	});
}

//==================================
function data2send_csv(obj_list) {
//==================================
	var str = "";
	for (var i=0; i<obj_list.length;i++){
		str +=obj_list[i].get_data2send_csv();
	}
	return str;
}

//==================================
function data2send_xml(type,obj_list) {
//==================================
	var str = "<"+type+">";
	for (var i=0; i<obj_list.length;i++){
		str +=obj_list[i].get_data2send_xml();
	}
	str += "</"+type+">";
	return str;
}

//==================================
function getDataByTypeTag_xml(type,restype,node,semtag) {
//==================================
	var str = "";
//	var content = $(restype,$("asmContext:has(metadata[semantictag='"+semtag+"'])",node)).text();
	var cxt_node = $("asmContext:has(metadata[semantictag*='"+semtag+"'])",node).addBack();
	for (var i=0;i<cxt_node.length;i++){
		var content = $(restype,$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",cxt_node[i])).text();
		str = "<"+type+">"+content+"</"+type+">";		
	}
//	if (cxt_node != null) {
//		var content = $(restype,$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",cxt_node)).text();
//		str = "<"+type+">"+content+"</"+type+">";		
//	}
//	alert(type+":"+str);
	return str;
}

//==================================
function getDataByTypeTag_csv(restype,node,semtag) {
//==================================
	var str = "";
	var cxt_node = $("asmContext:has(metadata[semantictag*='"+semtag+"'])",node).addBack();
	for (var i=0;i<cxt_node.length;i++){
		var content = $(restype,$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",cxt_node[i])).text();
		str = content+";";
	}
	return str;
}

var semtag_evaltypes = new Array();
semtag_evaltypes['autoeval']="eval-etudiant";
semtag_evaltypes['progres_eval']="like-etudiant";

//==================================
function getQualitesPerso2send_csv(node) {
//==================================
	var str = "";
	var evaluations = $("asmContext:has(metadata[semantictag*='eval-etudiant'])",$("asmUnitStructure:has(metadata[semantictag='section-qualite_perso'])",node));
	for  ( var i = 0; i < evaluations.length; i++) {
		str += getDataByTypeTag_csv("value",evaluations[i],"eval-etudiant");
	}
	return str;
}

//==================================
function getQualitesPerso2send_xml(node) {
//==================================
	var str = "";
	var evaluations = $("asmContext:has(metadata[semantictag*='eval-etudiant'])",$("asmUnitStructure:has(metadata[semantictag='section-qualite_perso'])",node));
	for  ( var i = 0; i < evaluations.length; i++) {
		str += getDataByTypeTag_xml("qualite-perso","value",evaluations[i],"eval-etudiant");
	}
	return str;
}

//==================================
function getCompetencies2send_csv(node,evaltypes_list) {
//==================================
	var str = "";
	str += "competence-trans;";
	var competencies_trans = $("asmUnitStructure:has(> metadata[semantictag='competence-tra-child'])",$("asmUnitStructure:has(> metadata[semantictag='activi-parent']):has(> asmContext:has(> metadata[semantictag='activite']):has(> asmResource:has(> portfoliocode:contains('IUT2_International'))))",node));
	for  ( var i = 0; i < competencies_trans.length; i++) {
		str += getDataByTypeTag_csv("value",competencies_trans[i],"competence-trans");
		for  ( var j = 0; j < evaltypes_list.length; j++) {
			str += getDataByTypeTag_csv("value",competencies_trans[i],semtag_evaltypes[evaltypes_list[j]]);
		}
		str += "";
	}
	return str;
}

//==================================
function getCompetencies2send_xml(node,evaltypes_list) {
//==================================
	var str = "<competences>";
	var competencies = $("asmUnitStructure:has(> metadata[semantictag='competence-tra-child'])",$("asmUnitStructure:has(> metadata[semantictag='activi-parent']):has(> asmContext:has(> metadata[semantictag='activite']):has(> asmResource:has(> portfoliocode:contains('IUT2_International'))))",node));
	for  ( var i = 0; i < competencies.length; i++) {
		str += "<competence-trans>";
		str += getDataByTypeTag_xml("competence-code","value",competencies[i],"competence-trans");
		for  ( var j = 0; j < evaltypes_list.length; j++) {
			str += getDataByTypeTag_xml(evaltypes_list[j],"value",competencies[i],semtag_evaltypes[evaltypes_list[j]]);
		}
		str += "</competence-trans>";
	}
	str += "</competences>";
	return str;
}


//==================================
function parsePortfolio(data) {
//==================================
	UICom.parseStructure(data);
	var proxy_nodeid = $("asmContext:has(metadata[semantictag='proxy-profile'])", data).attr('id')
	var proxyid = UICom.structure["ui"][proxy_nodeid].resource.code_node.text();
	UIFactory["Profile"].parse(proxies_data[proxyid]);
	UIFactory["Diploma"].parse(data);
	UIFactory["Formation"].parse(data);
	UIFactory["Experience"].parse(data);
	UIFactory["Stage"].parse(data);
	UIFactory["Alternance"].parse(data);
	UIFactory["Projet"].parse(data);
	UIFactory["ExperiencePerso"].parse(data);
	UIFactory["Langue"].parse(data);
	g_mother_tongueid = $("asmContext:has(metadata[semantictag='MotherTongue'])", data).attr('id');
}

//==================================
function parseTestPerso(data) {
//==================================
	UICom.parseStructure(data);
	UIFactory["TestPerso"].parse(data);
}

//==================================
function parseCV(data) {
//==================================
	UICom.parseStructure(data,'cvs');
	UIFactory["CV"].parse(data);
}

//==================================
function parseProjet(data) {
//==================================
	UICom.parseStructure(data);
	UIFactory["MonProjet"].parse(data);
}

//====================================
function chargerCarte()
//====================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/" + g_projetid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			g_projet_current = data;
			UIFactory["Bubble"].parse(data);
			dataBubble = Bubble_list[0].data;
			$("#carte_detail_projet").html("");
			$("#bubble_iframe").attr('src','bubble.html');
		}
	});
}

//====================================
function clickBubble(node)
//====================================
{
	Bubble_bubbles_byid[node.id].displayView("carte_detail_projet")
}

//====================================
function selectPortfolio(data)
//====================================
{
	var codePortfolio = "-portfolio";// + useridentifier;
	var codeProfile = "-profile";
	var codeCV = "-cv";
	var codeProjet = "-projet";
	var codeTraitsPerso = "-TraitsPersonnalite";
	var portfolios = $("portfolio",data);
	UIFactory["Portfolio"].parse(data);
	for ( var i=0;i<portfolios.length;i++)
		{
		var current_code = $("code:first",portfolios[i]).text();
		if (current_code.indexOf(codePortfolio)>-1) {
			g_portfolioid = $(portfolios[i]).attr("id");
			portfolioid = g_portfolioid;
		}
		if (current_code.indexOf(codeProfile)>-1) {
			g_profilecode = current_code;
			g_profileid = $(portfolios[i]).attr("id");
		}
		if (current_code.indexOf(codeCV)>-1) {
			g_cvcode = current_code;
			g_cvid = $(portfolios[i]).attr("id");
		}
		if (current_code.indexOf(codeProjet)>-1) {
			g_projetcode = current_code;
			g_projetid = $(portfolios[i]).attr("id");
		}
		if (current_code.indexOf(codeTraitsPerso)>-1) {
			g_traitspersoid = $(portfolios[i]).attr("id");
		}
	}
		//----------------
	$.ajaxSetup({async: false});
	//----------------
	$.ajax({ // get group-role for the user
		Accept: "application/xml",
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/credential/group/" + g_portfolioid,
		success : function(data) {
			var usergroups = $("group",data);
			g_userrole = $("role",usergroups[0]).text();
		}
	});
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/"+g_portfolioid+"?resources=true",
		success : function(data) {
			g_portfolio_current = data;
			UICom.parseStructure(data);
			var navbar = getNavbar(g_portfolioid);
			$("#navbar").html(navbar);
			var proxy_nodeid = $("asmContext:has(metadata[semantictag='proxy-profile'])", data).attr('id')
			var proxyid = UICom.structure["ui"][proxy_nodeid].resource.code_node.text();
			UIFactory["Profile"].parse(proxies_data[proxyid]);
			profiles_list[0].displayView('profile-short','short');
			profiles_list[0].displayView('profil-short','short');
			profiles_list[0].displayEditor('profil-detail');
			if (l_userrole=='etudiant' && g_userrole!='etudiant'){
				profiles_list[0].displayView('profile-etudiant','lastname_firstname');
			}
			//===========HISTOIRE==================
			$("#info-window-body").html("Traitement Mon histoire...");
			UIFactory["Diploma"].parse(data);
			Diplomas_Display('diplomes-short_histo','short');
			Diplomas_Display('diplomes-detail_histo','detail',$("asmStructure:has(metadata[semantictag='diplomas'])", data).attr('id'));
			//--------------------
			UIFactory["Formation"].parse(data);
			Formations_Display('formations-short_histo','short');
			Formations_Display('formations-detail_histo','detail',$("asmStructure:has(metadata[semantictag='formations'])", data).attr('id'));
			//--------------------
			UIFactory["Experience"].parse(data);
			Experiences_Display('experiences-short_histo','short');
			Experiences_Display('experiences-detail_histo','detail',$("asmStructure:has(metadata[semantictag='jobs'])", data).attr('id'));
			//--------------------
			UIFactory["Stage"].parse(data);
			Stages_Display('stages-short_histo','short');
			Stages_Display('stages-detail_histo','detail',$("asmStructure:has(metadata[semantictag='internships'])", data).attr('id'));
			//--------------------
			UIFactory["Alternance"].parse(data);
			Alternances_Display('alternances-short_histo','short');
			Alternances_Display('alternances-detail_histo','detail',$("asmStructure:has(metadata[semantictag='alternances'])", data).attr('id'));
			//--------------------
			UIFactory["Projet"].parse(data);
			Projets_Display('projets-short_histo','short');
			Projets_Display('projets-detail_histo','detail',$("asmStructure:has(metadata[semantictag='projects'])", data).attr('id'));
			//--------------------
			UIFactory["ExperiencePerso"].parse(data);
			ExperiencePersos_Display('exp-persos-short_histo','short');
			ExperiencePersos_Display('exp-persos-detail_histo','detail',$("asmStructure:has(metadata[semantictag='experiences-persos'])", data).attr('id'));
			//--------------------
			UIFactory["Langue"].parse(data);
			g_mother_tongueid = $("asmContext:has(metadata[semantictag='MotherTongue'])", data).attr('id');
			Langues_Display('langues-short_histo','short');
			Langues_Display('langues-detail_histo','detail',$("asmUnit:has(metadata[semantictag='langues-unit'])", data).attr('id'),g_mother_tongueid);
			//--------------------
			$.ajax({
				type : "GET",
				dataType : "xml",
				url : "../../../"+serverBCK+"/portfolios/portfolio/" + g_traitspersoid + "?resources=true",
				success : function(data) {
					UICom.parseStructure(data);
					UIFactory["TestPerso"].parse(data);
					TestPerso_Display('traitsperso-short_histo','short',g_traitspersoid);
					TestPerso_Display('traitsperso-detail_histo','detail',g_traitspersoid);
					//--------------------
					TestPerso_Display('traitsperso-short_comp','short-result',g_traitspersoid);
					TestPerso_Display('traitsperso-detail_comp','detail-result',g_traitspersoid);
				}
			});
			//================COMPETENCE=============
			$("#info-window-body").html("Traitement Mon bilan...");
			displayCompetencesMetiers(data);
			//-----------------------------------------------
			displayCompetencesTrans(data)
			//-----------------------------------------------
			displayCompetencesAutres(data)
			//--------------------
			Langues_Display('langues-short_comp','comp-short');
			Langues_Display('langues-detail_comp','comp');
			//================== SUIVI===========
			$("#info-window-body").html("Traitement Mon suivi...");
			var supervisor_lastname_nodeid = $("asmContext:has(metadata[semantictag='supervisor_lastname'])",data).attr('id');
			var supervisor_firstname_nodeid = $("asmContext:has(metadata[semantictag='supervisor_firstname'])",data).attr('id');
			var supervisor_email_nodeid = $("asmContext:has(metadata[semantictag='supervisor_email'])",data).attr('id');
			supervisor_email = UICom.structure["ui"][supervisor_email_nodeid].resource.getView();
			$("#supervisor-lastname").html(UICom.structure["ui"][supervisor_lastname_nodeid].resource.getView());
			$("#supervisor-firstname").html(UICom.structure["ui"][supervisor_firstname_nodeid].resource.getView());
			//--------------------
			UIFactory["Feedback"].parse(data,g_portfolioid);
			var parentid = $("asmUnitStructure:has(metadata[semantictag='questions_answers'])",data).attr('id');
			UIFactory["Feedback"].displayQuestionEditor('demande','detail',null,parentid);
			UIFactory["Feedback"].displayAll('feedbacks','detail',g_portfolioid);
			//=============================
			$('a[data-toggle=tooltip]').tooltip({html:true});
			$(".fa").hover(function(){
				$('body').css('cursor', 'zoom-in');
				$('body').css('cursor', 'default');
			});
			//---------------- CVs --------------------------
			$("#info-window-body").html("Chargement des CVs...");
			$.ajax({
				type : "GET",
				dataType : "xml",
				url : "../../../"+serverBCK+"/portfolios/portfolio/"+g_cvid+"?resources=true",
				success : function(data) {
					UICom.parseStructure(data,'cvs');
					UIFactory["CV"].parse(data);
					cvs_Display('list_cvs_short','short');
					g_cv.displayEditor('list_cvs_detail','detail');
				}
			});
			//---------------------- Projet -------------------
			$("#info-window-body").html("Chargement du projet...");
			$.ajax({
				type : "GET",
				dataType : "xml",
				url : "../../../"+serverBCK+"/portfolios/portfolio/" + g_projetid + "?resources=true",
				success : function(data) {
					UICom.parseStructure(data);
					g_projet_current = data;
					UIFactory["MonProjet"].parse(data);
					//------ description ----------
					UIFactory["MonProjet"].displayView('description_detail_projet','description');						
					//------ compétences ----------
					UIFactory["MonProjet"].displayView('projet_metiers','projet_metiers');						
					UIFactory["MonProjet"].displayView('projet_trans','projet_trans');						
					UIFactory["MonProjet"].displayView('projet_autres','projet_autres');						
					//------ carte ----------
					UIFactory["Bubble"].parse(data);
					dataBubble = Bubble_list[0].data;
					g_current_mapid = Bubble_list[0].id;
					var urlS = "../../../"+serverFIL+'/direct?uuid='+g_current_mapid+'&role=all&lang=fr&l=4&d=500';
					$.ajax({
						type : "POST",
						dataType : "text",
						contentType: "application/xml",
						url : urlS,
						success : function (data){
							var url = window.location.href;
							var serverURL = url.substring(0,url.indexOf("/"+appliname));
							g_carte_url = serverURL+"/iut2/application/htm/carte-publique.htm?i="+data;
							$("#qrcode-carte").qrcode({text:g_carte_url,size:100,background: 'white'});
							var text = document.getElementById("qrcode-carte").toDataURL("image/jpeg");
							putQRcodePourCV(text);
/*							$.ajax({
								type : "GET",
								dataType : "xml",
								url : "../../../"+serverBCK+"/nodes?portfoliocode=" + g_projetcode + "&semtag=qrcode",
								success : function(data) {
									var nodeid = $("asmContext:has(metadata[semantictag='qrcode'])",data).attr('id');
									var xml = "<asmResource xsi_type='Field'>";
									xml += "<text lang='"+LANG+"'>"+text+"</text>";
									xml += "</asmResource>";
									$.ajax({
										type : "PUT",
										contentType: "application/xml",
										dataType : "text",
										data : xml,
										url : "../../../"+serverBCK+"/resources/resource/" + nodeid,
										success : function(data) {
										}
									});
								}
							});*/
						
						}
					});
					$("#info-window").hide();
				}
			});
			//---------------------------------------------------
		}
	});
	//-------------------------------------------------
//	$("#url-to-copy").attr('value',g_carte_url);
	$("#carte-link").attr('href',g_carte_url);
	$("#copy-button").attr('data-clipboard-text',g_carte_url);
	var urlcopybutton = new ZeroClipboard( $("#copy-button") );
	urlcopybutton.on( "ready", function( readyEvent ) {
	   //alert( "ZeroClipboard SWF is ready!" );
	  urlcopybutton.on( "aftercopy", function( event ) {
	    // `this` === `urlcopybutton`
	    // `event.target` === the element that was clicked
		    alert("L'URL a été copié");
	  } );
	} );
	//-------------------------------------------------
	$.ajaxSetup({async: true});
	fetchEuropassCriteres();
	getLangues();
}

//==================================
function putQRcodePourCV(qrcode)
//==================================
{
	if (g_qrcode_cv_nodeid == "")
		$.ajax({
			type : "GET",
			dataType : "xml",
			url : "../../../"+serverBCK+"/nodes?portfoliocode=" + g_projetcode + "&semtag=qrcode",
			qrcode : qrcode,
			success : function(data) {
				if ($("asmContext:has(metadata[semantictag='qrcode'])",data).length>0) {
					g_qrcode_cv_nodeid = $("asmContext:has(metadata[semantictag='qrcode'])",data).attr('id');
					var xml = "<asmResource xsi_type='Field'>";
					xml += "<text lang='"+LANG+"'>"+this.qrcode+"</text>";
					xml += "</asmResource>";
					$.ajax({
						type : "PUT",
						contentType: "application/xml",
						dataType : "text",
						data : xml,
						url : "../../../"+serverBCK+"/resources/resource/" + g_qrcode_cv_nodeid,
						success : function(data) {
						}
					});
				} else {
					$.ajax({
						type : "GET",
						dataType : "xml",
						url : "../../../"+serverBCK+"/nodes?portfoliocode=" + g_projetcode + "&semtag=projet_carte",
						qrcode : qrcode,
						success : function(data) {
							var rootid = $("asmUnit",data).attr('id');
							var srcecode = "IUT2composantes.IUT2-parts";
							var srcetag = "qrcode";
							//  if databack is true callback(data,param2,param3,param4) else callback(param2,param3,param4)
							var databack = false;
							var callback = putQRcodePourCV;
							var param2 = this.qrcode;
							importBranch(rootid,srcecode,srcetag,databack,callback,param2);
						}
					});
				}
			}
		});
	else {
		var xml = "<asmResource xsi_type='Field'>";
		xml += "<text lang='"+LANG+"'>"+qrcode+"</text>";
		xml += "</asmResource>";
		$.ajax({
			type : "PUT",
			contentType: "application/xml",
			dataType : "text",
			data : xml,
			url : "../../../"+serverBCK+"/resources/resource/" + g_qrcode_cv_nodeid,
			success : function(data) {
			}
		});
	}
}

//====================================
function fetchPPNmetier()
//====================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes?portfoliocode=IUT2ppns.IUT2-PPNs&semtag=DUT-PPN",
		success : function(data) {
			var ppns = $("node",data);
			for (var i=0; i<ppns.length; i++){
				var code_ppn = $("code",$("asmResource[xsi_type='Item']",ppns[i])).text();
				$.ajax({
					type : "GET",
					dataType : "xml",
					url : "../../../"+serverBCK+"/nodes?portfoliocode="+code_ppn+"&semtag=domaine-metier",
					code_ppn: code_ppn,
					success : function(data) {
							var code_metier = $("code",$("asmResource[xsi_type='Get_Resource']",data)).text();
							var idx = this.code_ppn.indexOf('.');
							if (idx>0)
								g_ppn_domaines[this.code_ppn.substring(idx+1)] = code_metier;
							g_ppn_domaines[this.code_ppn] = code_metier;
					}
				});

			}
		}
	});
}

//====================================
function fetchDomaineMetier()
//====================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes?portfoliocode=IUT2referentiels.IUT2-referentiel-autres&semtag=domaine-metier",
		success : function(data) {
			var domaines = $("node",data);
			for (var i=0; i<domaines.length; i++){
				var code_domaine = $("code",$("asmResource[xsi_type='Item']",domaines[i])).text();
				var label_domaine = $("label[lang="+LANG+"]",$("asmResource[xsi_type='Item']",domaines[i])).text();
							g_domaines[code_domaine] = label_domaine;
			}
		}
	});
}

//====================================
function fetchEuropassCriteres()
//====================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes?portfoliocode=europass.rubrics&semtag=europass&semtag_parent=Listening&code_parent=Listening",
		success : function(data) {
			g_Get_Get_Resource_caches["europass.rubrics.#Listening.europass.label"] = data;
		}
	});
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes?portfoliocode=europass.rubrics&semtag=europass&semtag_parent=Reading&code_parent=Reading",
		success : function(data) {
			g_Get_Get_Resource_caches["europass.rubrics.#Reading.europass.label"] = data;
		}
	});
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes?portfoliocode=europass.rubrics&semtag=europass&semtag_parent=SpokenInteraction&code_parent=SpokenInteraction",
		success : function(data) {
			g_Get_Get_Resource_caches["europass.rubrics.#SpokenInteraction.europass.label"] = data;
		}
	});
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes?portfoliocode=europass.rubrics&semtag=europass&semtag_parent=SpokenProduction&code_parent=SpokenProduction",
		success : function(data) {
			g_Get_Get_Resource_caches["europass.rubrics.#SpokenProduction.europass.label"] = data;
		}
	});
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes?portfoliocode=europass.rubrics&semtag=europass&semtag_parent=Writing&code_parent=Writing",
		success : function(data) {
			g_Get_Get_Resource_caches["europass.rubrics.#Writing.europass.label|"] = data;
			g_Get_Get_Resource_caches["europass.rubrics.#Writing.europass.label"] = data;
		}
	});
}

