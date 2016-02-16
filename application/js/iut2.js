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
footer += "<table style='width: 100%;'><tr><td align='left'><img src='../img/logoiut2footer.png'/></td><td align='center'><span class='muted' align='center'>E<strong>&middot;</strong>portfolio4*&nbsp;&mdash;&nbsp;copyright IUT 2 Grenoble 2014</span></td>";
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

/* Envoi de données */

//==================================
function send_data() {
//==================================
	var str = "";
	str +=data2send("Diplomas",diplomas_list);
	str +=data2send("Formations",formations_list);
	str +=data2send("Stages",stages_list);
	str +=data2send("Alternances",alternances_list);
	str +=data2send("Projets",projets_list);
	str +=data2send("Experiences",experiences_list);
	str +=data2send("ExperiencePersos",experience_persos_list);
	str +=data2send_langues();
	str +=data2send("Profile",profiles_list);
	str +=data2send("TestPersos",TestPersos_list);
	alert(str);
	/*
	$.ajax({
		type : "POST",
		contentType: "application/xml",
		dataType : "text",
		data : str,
		url : "../../../"+serverVER+"/logging?n=1&user=false",
		success : function() {
		}
	});
	*/
}

//==================================
function data2send(type,obj_list) {
//==================================
	var str = "<"+type+">";
	for (var i=0; i<obj_list.length;i++){
		str +=obj_list[i].get_data2send();
	}
	str += "</"+type+">";
	return str;
}

//==================================
function getDataByTypeTag(type,restype,node,semtag) {
//==================================
	var str = "";
//	var content = $(restype,$("asmContext:has(metadata[semantictag='"+semtag+"'])",node)).text();
	var cxt_node = $("asmContext:has(metadata[semantictag*='"+semtag+"'])",node);
	if (cxt_node != null) {
		var content = $(restype,$("asmResource[xsi_type!='nodeRes'][xsi_type!='context']",cxt_node)).text();
		str = "<"+type+">"+content+"</"+type+">";
		
	}
//	alert(type+":"+str);
	return str;
}

var semtag_evaltypes = new Array();
semtag_evaltypes['autoeval']="eval-etudiant";
semtag_evaltypes['progres_eval']="like-etudiant";
//==================================
function getCompetencies2send(node,evaltypes_list) {
//==================================
	var str = "<competences>";
	var competencies = $("asmUnitStructure:has(> metadata[semantictag='competence-tra-child'])",$("asmUnitStructure:has(> metadata[semantictag='activi-parent']):has(> asmContext:has(> metadata[semantictag='activite']):has(> asmResource:has(> portfoliocode:contains('IUT2_International'))))",node));
	for  ( var i = 0; i < competencies.length; i++) {
		str += "<competence-trans>";
		str += getDataByTypeTag("competence-code","value",competencies[i],"competence-trans");
		for  ( var j = 0; j < evaltypes_list.length; j++) {
			str += getDataByTypeTag(evaltypes_list[j],"value",competencies[i],semtag_evaltypes[evaltypes_list[j]]);
		}
		str += "</competence-trans>";
	}
	str += "</competences>";
//	alert("competence:"+str);
	return str;
}



