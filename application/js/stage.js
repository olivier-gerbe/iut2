		
//========================================================
//========================================================
//===================== STAGE ============================
//========================================================
//========================================================

var stages_byid = {};
var stages_list = [];

//==================================
UIFactory["Stage"] = function( node )
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	this.begin_nodeid = $("asmContext:has(metadata[semantictag='date-begin'])",node).attr('id');
	this.duration_nodeid = $("asmContext:has(metadata[semantictag='duration'])",node).attr('id');
	this.secteur_pro_nodeid = $("asmContext:has(metadata[semantictag='secteur-pro'])",node).attr('id');
	this.secteur_environnement_nodeid = $("asmContext:has(metadata[semantictag='secteur-environnement'])",node).attr('id');
	this.school_nodeid = $("asmContext:has(metadata[semantictag='school'])",node).attr('id');
	this.cadre_nodeid = $("asmContext:has(metadata[semantictag='cadre-formation'])",node).attr('id');
	this.realizations_nodeid = $("asmContext:has(metadata[semantictag='job-realizations'])",node).attr('id');
	this.missions_nodeid = $("asmContext:has(metadata[semantictag='job-missions'])",node).attr('id');
	this.attestation_nodeid = $("asmContext:has(metadata[semantictag='attestation'])",node).attr('id');
	this.memoire_nodeid = $("asmContext:has(metadata[semantictag='memoire'])",node).attr('id');
	this.apport_nodeid = $("asmContext:has(metadata[semantictag='apport'])",node).attr('id');
	this.comp_attestation_nodeid = $("asmContext:has(metadata[semantictag='comp-attestation'])",node).attr('id');
	this.domaine_metier_nodeid = $("asmContext:has(metadata[semantictag='domaine-metier'])",node).attr('id');
	this.stage_entreprise_taille_nodeid = $("asmContext:has(metadata[semantictag='stage-entreprise-taille'])",node).attr('id');
	this.stage_entreprise_nat_nodeid = $("asmContext:has(metadata[semantictag='stage-entreprise-nat'])",node).attr('id');
	//------------------------
	this.formulaire_nodeid = $("asmContext:has(metadata[semantictag='formulaire'])",node).attr('id');
	//------------------------
	this.name_nodeid  = $("asmContext:has(metadata[semantictag='estb-name'])",node).attr('id');
	this.street_nodeid  = $("asmContext:has(metadata[semantictag='street'])",node).attr('id');
	this.town_nodeid  = $("asmContext:has(metadata[semantictag='town'])",node).attr('id');
	this.postalcode_nodeid  = $("asmContext:has(metadata[semantictag='postalcode'])",node).attr('id');
	this.country_nodeid  = $("asmContext:has(metadata[semantictag='country'])",node).attr('id');
	this.stage_lieu_nodeid = $("asmContext:has(metadata[semantictag='stage-lieu'])",node).attr('id');
	this.website_nodeid  = $("asmContext:has(metadata[semantictag='website'])",node).attr('id');
	this.logo_nodeid  = $("asmContext:has(metadata[semantictag='logo'])",node).attr('id');
	this.service_nodeid  = $("asmContext:has(metadata[semantictag='service'])",node).attr('id');

	this.referent_prenom_nodeid  = $("asmContext:has(metadata[semantictag='referent-prenom'])",node).attr('id');
	this.referent_nom_nodeid  = $("asmContext:has(metadata[semantictag='referent-nom'])",node).attr('id');
	this.referent_titre_nodeid  = $("asmContext:has(metadata[semantictag='referent-titre'])",node).attr('id');
	this.referent_email_nodeid  = $("asmContext:has(metadata[semantictag='referent-email'])",node).attr('id');
	this.referent_telephone_nodeid  = $("asmContext:has(metadata[semantictag='referent-telephone'])",node).attr('id');
	//---- contacts -------------------
	this.contacts = [];
	var contacts_sect = $("asmUnitStructure:has(metadata[semantictag='contact'])",node);
	for ( var i = 1; i < contacts_sect.length; i++) {
		this.contacts[i-1] = new UIFactory['Contact'](contacts_sect[i]);
	}
	// ---------------------------------------
	this.ppn_nodeid = $("asmContext:has(metadata[semantictag*='DUT-PPN'])",node).attr('id');
	this.ref_nodeid = $("asmContext:has(metadata[semantictag*='IUT2-referentiel'])",node).attr('id');
	this.dom_nodeid = $("asmContext:has(metadata[semantictag*='domaine-comps'])",node).attr('id');
	this.dom2a_nodeid = $("asmContext:has(metadata[semantictag*='dom2a-autres'])",node).attr('id');
	this.dom2b_nodeid = $("asmContext:has(metadata[semantictag*='dom2b-autres'])",node).attr('id');
	this.dom2c_nodeid = $("asmContext:has(metadata[semantictag*='dom2c-autres'])",node).attr('id');
	// ---------------------------------------
	this.comps_metiers_node = $("metadata[semantictag*='comps-metiers']",node).parent();
	this.comps2_metiers_node = $("metadata[semantictag*='comps2-metiers']",node).parent();
	this.comps_autres_node = $("metadata[semantictag*='comps-autres']",node).parent();
	this.comps2_autres_node2a = $("metadata[semantictag*='comps2a-autres']",node).parent();
	this.comps2_autres_node2b = $("metadata[semantictag*='comps2b-autres']",node).parent();
	this.comps2_autres_node2c = $("metadata[semantictag*='comps2c-autres']",node).parent();

//	this.eval_competences = [];
	this.eval_qualites_perso = [];
	this.view_eval_qualites_perso = [];

	// ---------------------------------------
	this.qualites_perso_node = $("metadata[semantictag*='section-qualite_perso']",node).parent();
	this.comments_nodeid  = $("asmContext:has(metadata[semantictag='comments-tuteur'])",node).attr('id');
};

//==================================
UIFactory["Stage"].prototype.displayView = function(destid,type,lang,parentid)
//==================================
{
	var html = "";
	$("#"+destid).html(html);  // to empty html
	if (type==null || type=='cv') {
		html = "<div class='row stage'><div class='span3'>";
		html += " <span id='"+destid+"_short_begin'>"+UICom.structure["ui"][this.begin_nodeid].resource.getView(destid+"_short_begin") + "</span>";
		html += " - <span id='"+destid+"_short_end'>"+UICom.structure["ui"][this.duration_nodeid].resource.getView(destid+"_short_end") + "</span>";
		
		html += "</div><div class='span8'>";
		html += "<span id='"+destid+"_short_label' class='job_title'>"+UICom.structure["ui"][this.id].getView(destid+"_short_label") + "</span>";
		html += "<div class='organisme'>"+UICom.structure["ui"][this.name_nodeid].resource.getView()+"</div>";
		html += "<div>"+UICom.structure["ui"][this.missions_nodeid].resource.getView()+"</div>";
		html += "<div>"+UICom.structure["ui"][this.realizations_nodeid].resource.getView()+"</div>";
		html += "</div></div>";
	}
	if (type==null || type=='short') {
		html += "<i class='fa fa-angle-right fa-lg'></i>&nbsp;"
		html += "<a href='#' onclick=\"javascript:$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"');$('#tabs_histo li:eq(3) a').tab('show')\">";
		html += "<span id='"+destid+"_short_label'>"+UICom.structure["ui"][this.id].getLabel(destid+"_short_label","span") + "</span>";
		html += ", <span id='"+destid+"_short_begin'>"+UICom.structure["ui"][this.begin_nodeid].resource.getView(destid+"_short_begin") + "</span>";
		html += " - <span id='"+destid+"_short_end'>"+UICom.structure["ui"][this.duration_nodeid].resource.getView(destid+"_short_end") + "</span>";
		html += ", <span id='"+destid+"_short_name'>"+UICom.structure["ui"][this.name_nodeid].resource.getView(destid+"_short_name") + "</span>";
		html += "</a>";
	}
	if (type=='detail') {
		html += "<div class='panel panel-default alert alert-vert alert-block' >";
		html += "<div class='panel-heading'>";
		html += "<h4 class='panel-title'>";
		//---------------------------------------------------------
		var writenode = ($(this.node).attr('write')=='Y')? true:false;
		if (writenode && g_userrole=='etudiant') {
			html += "<span  class='editbutton' onclick=\"javascript: confirmDel('"+this.id+"','Stage')\" data-title='supprimer' rel='tooltip'><i class='fa fa-trash-o'></i></span>";
			html += "<span  class='editbutton' onclick=\"javascript:stages_byid['"+this.id+"'].displayEditor('"+destid+"');\" data-title='éditer' rel='tooltip'>";
//			html += "<span  class='editbutton' onclick=\"javascript:stages_byid['"+this.id+"'].displayEditor_demandeEval('"+destid+"');\" data-title='éditer' rel='tooltip'>";
			
			html += "<i class='fa fa-edit'></i>";
			html += "</span>";
		}
		html += "<span data-toggle='collapse' class='editbutton' data-parent='#"+parentid+"' href='#collapse"+this.id+"' onclick=\"toggleZoom('"+this.id+"')\">";
		html += "<i id='zoom_"+this.id+"' class='fa fa-search-plus'></i>";
		html += "</span>";
		//---------------------------------------------------------
		html += UICom.structure["ui"][this.id].getView()+" ("+UICom.structure["ui"][this.begin_nodeid].resource.getView()+" - "+UICom.structure["ui"][this.duration_nodeid].resource.getView()+")";
		html += "</h4>";
		html += "</div>";
		html += "<div id='collapse"+this.id+"' class='panel-collapse collapse out'>";
		html += "<div class='panel-body'>";
		html += "<div class='row'>";
		html += "<div class='span5 attributs'>";
		html += "<div class='item'>Domaine métiers : <span class='value'>"+UICom.structure["ui"][this.domaine_metier_nodeid].resource.getView()+"</span></div>";
//		html += "<div class='item'>Secteur / Environnement : <span class='value'>"+UICom.structure["ui"][this.secteur_environnement_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Organisme de provenance : <span class='value'>"+UICom.structure["ui"][this.school_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Dans le cadre de la formation : <span class='value'>"+UICom.structure["ui"][this.cadre_nodeid].resource.getView()+"</span></div>";
		if (UICom.structure["ui"][this.attestation_nodeid].resource.getView()!="")
		html += "<div class='item'>Attestation de stage : <span class='value'>"+UICom.structure["ui"][this.attestation_nodeid].resource.getView()+"</span></div>";
		if (UICom.structure["ui"][this.memoire_nodeid].resource.getView()!="")
		html += "<div class='item'>Mémoire de stage : <span class='value'>"+UICom.structure["ui"][this.memoire_nodeid].resource.getView()+"</span></div>";
		html += "<h6>Principales missions</h6>"
		html += "<div>"+UICom.structure["ui"][this.missions_nodeid].resource.getView()+"</div>";
		html += "<h6>Principales réalisations</h6>"
		html += "<div>"+UICom.structure["ui"][this.realizations_nodeid].resource.getView()+"</div>";
		html += "</div><!-- span -->";
		html += "<div class='span5 organisme attributs'>";
		html += "<div style='float:right'>"+UICom.structure["ui"][this.logo_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>Organisme employeur :</div><br/>";
		html += "<div class='item libelle'>"+UICom.structure["ui"][this.name_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.website_nodeid].resource.getView(null,'same')+"</div>";

		html += "<div class='item'>Secteur / Environnement : <span class='value'>"+UICom.structure["ui"][this.secteur_environnement_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Taille de l'entreprise : <span class='value'>"+UICom.structure["ui"][this.stage_entreprise_taille_nodeid].resource.getView()+"</span></div>";
		html += "<div class='item'>Nationalité de l'entreprise : <span class='value'>"+UICom.structure["ui"][this.stage_entreprise_nat_nodeid].resource.getView()+"</span></div>";
		
		html += "<div class='item'>"+UICom.structure["ui"][this.service_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.street_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.town_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.postalcode_nodeid].resource.getView()+"</div>";
		html += "<div class='item'>"+UICom.structure["ui"][this.country_nodeid].resource.getView()+"</div>";
		if (UICom.structure["ui"][this.stage_lieu_nodeid].resource.getView()!="")
			html += "<div class='item'>Lieu du stage est à l'international</div>";
//			html += "<div class='item'>Lieu du stage : <span class='value'>"+UICom.structure["ui"][this.stage_lieu_nodeid].resource.getView()+"</span></div>";
		html += "<br/><div class='item'>Tuteur dans l'organisme :</div>";
		html += "<div class='value'>"+UICom.structure["ui"][this.referent_prenom_nodeid].resource.getView();
		html += " "+UICom.structure["ui"][this.referent_nom_nodeid].resource.getView();
		if (UICom.structure["ui"][this.referent_titre_nodeid].resource.getView()!="")
			html += ", "+UICom.structure["ui"][this.referent_titre_nodeid].resource.getView();
		html += "</div>";
		html += "<div class='item'><a href='mailto:"+UICom.structure["ui"][this.referent_email_nodeid].resource.getView()+"'>"+UICom.structure["ui"][this.referent_email_nodeid].resource.getView()+"</a>";
		if (UICom.structure["ui"][this.referent_telephone_nodeid].resource.getView()!="")
			html += " Tel: "+UICom.structure["ui"][this.referent_telephone_nodeid].resource.getView();
		html += "</div>";

		html += "<br/><div class='item'>Contact(s) dans l'organisme :</div>";
		for (var i=0; i<this.contacts.length; i++){
			html += "<br/><div id='"+this.contacts[i].id+"'></div>";
		}
		
		if (UICom.structure["ui"][this.comp_attestation_nodeid].resource.getView()!="")
			html += "<div class='value' style='margin-top:10px;'>Attestation de certification de compétences par l'organisme : <span class='value'>"+UICom.structure["ui"][this.comp_attestation_nodeid].resource.getView()+"</span></div>";
		if (UICom.structure["ui"][this.apport_nodeid].resource.getView().length>25){
			html += "<h6>Apport de cette expérience dans mon projet personnel professionel</h6>"
			html += "<div>"+UICom.structure["ui"][this.apport_nodeid].resource.getView()+"</div>";
		}
		html += "</div><!-- span -->";
		html += "</div><!-- row -->";
		//----------------------------------------------------------------------------------------------------
		html += "<div class='row competences-titre'>";
		//-----------------------------------------------------------------------
		view_eval_competences = new Array();
		html += "<span class='span6'><h4>Compétences liées à ce stage</h4></span>";
		html += "</div>";
		html += "<div class='row'>";
		html += "<span class='span5'>";
		html += "<h5>Compétences métiers</h5>";
		html += getEvalTableau_begin(1,this.id,destid,'Stage',0);
		//---------------------------------------------
		html += getCompetencies2(this.comps_metiers_node,false,'Stage',this.id,destid,'activite','competence-metier',0);
		html += getCompetencies2(this.comps2_metiers_node,false,'Stage',this.id,destid,'dom-metier-ref','free-comp-metier',0);
		//---------------------------------------------
		html += getEvalTableau_end();
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "<span class='span5'>";
		html += "<h5>Autres compétences (transversale, innovation)</h5>";
		html += getEvalTableau_begin(1,this.id,destid,'Stage',1);
		//---------------------------------------------
		html += getCompetencies2(this.comps_autres_node,false,'Stage',this.id,destid,'activite','competence-trans',1);
		html += getCompetencies2(this.comps2_autres_node2a,false,'Stage',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		html += getCompetencies2(this.comps2_autres_node2b,false,'Stage',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		html += getCompetencies2(this.comps2_autres_node2c,false,'Stage',this.id,destid,'dom-autre-ref','free-comp-autre',1);
		//---------------------------------------------
		html += getEvalTableau_end();
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "</div>";
		//----------------------------------------------------------------------------------------------------
		html += "<div class='row qualites_perso-titre'>";
		//-----------------------------------------------------------------------
		this.eval_qualites_perso = new Array();
		this.view_eval_qualites_perso = new Array();
		html += "<span class='span6'><h4>Qualités personnelles</h4></span>";
		html += "</div>";
		html += "<div class='row'>";
		html += "<span class='span5'>";
		html += getEvalTableau_begin(0,this.id,destid,'Qualites_perso',0);
		html += getQualitesPerso(0,this.qualites_perso_node,false,'Qualites_perso',this.id,destid,0,this.eval_qualites_perso,this.view_eval_qualites_perso);
		html += getEvalTableau_end();
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "<span class='span5'>";
		html += getEvalTableau_begin(1,this.id,destid,'Qualites_perso',0);
		html += getQualitesPerso(1,this.qualites_perso_node,false,'Qualites_perso',this.id,destid,0,this.eval_qualites_perso,this.view_eval_qualites_perso);
		html += getEvalTableau_end();
		html += "</span>";
		//-----------------------------------------------------------------------
		html += "</div>";
		//-----------------------------------------------------------------------
		html += getEvaluationCodes_bytypes(['entreprise','autoeval']);
		//-----------------------------------------------------------------------		
		html += "<div class='row'><span class='span10'>";
		html += "<h4 class='title text-noir'>Commentaire(s), remarques du tuteur en entreprise</h4>"
			html += "<div>"+UICom.structure["ui"][this.comments_nodeid].resource.getView()+"</div>";
		html += "</span></div>";
		//----------------------------------------------------------------------------------------------------
		html += "</div><!-- class='panel-collapse collapse in'-->";
		html += "</div><!-- class=''panel ...'-->";
	}
	var obj = $(html);
	$("#"+destid).append(obj);
	for (var i=0; i<this.contacts.length; i++){
		this.contacts[i].displayView(this.contacts[i].id,'detail');
	}
	//------------------ evaluation----------------------------------------
	getEvaluations_displayView(view_eval_competences);
	getEvaluations_displayView(this.view_eval_qualites_perso);
	showHeaderEvaluationTable();
};

//==================================
UIFactory["Stage"].prototype.displayEditor = function(destid,type,lang) {
//==================================
	var html = "";
	$("#"+destid).html(html);
	var div = $("<div class='alert alert-vert alert-block edition'></div>");
	$("#"+destid).append(div);
	html += "<a  class='btn btn-mini btn-vert editbutton' onclick=\"javascript:stages_byid['"+this.id+"'].displayView('"+destid+"','detail');$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"')\" data-title='éditer' rel='tooltip'>";
	html += "Quitter le mode édition";
	html += "</a>";
/*
	html += "<a  class='btn btn-mini btn-vert editbutton' onclick=\"remplirFormulaireStage('"+this.id+"')\" data-title='formulaire' rel='tooltip'>";
	html += "Remplir le questionnaire de stage";
	html += "</a>";
*/
	$(div).append($(html));
	if (g_userrole=='etudiant') {
		$(div).append($("<label id='libelle_"+this.id+"' class='inline titre'>Libellé du poste </label>"));
		$("#libelle_"+this.id).append(UICom.structure["ui"][this.id].getNodeLabelEditor());
		var row = "<div class='row'><div id='A_"+this.id+"' class='span5'></div><div id='B_"+this.id+"' class='span5'></div></div>";
		$(div).append($(row));

		$("#A_"+this.id).append($("<form id='formA_"+this.id+"' class='form-horizontal'></form>"));
		$("#formA_"+this.id).append($("<hr></hr>"));
		displayControlGroup_getEditor("formA_"+this.id,"Année de début","debut_"+this.id,this.begin_nodeid);
		displayControlGroup_getEditor("formA_"+this.id,"Durée","fin_"+this.id,this.duration_nodeid);
		displayControlGroup_displayEditor("formA_"+this.id,"Domaine métiers","dommet_"+this.id,this.domaine_metier_nodeid,"select");
//		displayControlGroup_displayEditor("formA_"+this.id,"Secteur / Environnement","senv_"+this.id,this.secteur_environnement_nodeid,"select");
		$("#formA_"+this.id).append($("<hr></hr>"));
		displayControlGroup_getEditor("formA_"+this.id,"Organisme de provenance","school_"+this.id,this.school_nodeid);
		displayControlGroup_getEditor("formA_"+this.id,"Dans le cadre de la formation","statut_"+this.id,this.cadre_nodeid);
		displayControlGroup_displayEditor("formA_"+this.id,"Attestation de stage","attestation_"+this.id,this.attestation_nodeid);
		displayControlGroup_displayEditor("formA_"+this.id,"Mémoire de stage","memoire_"+this.id,this.memoire_nodeid);

		$("#formA_"+this.id).append($("<hr></hr>"));
		$("#formA_"+this.id).append($("<label class='inline'>Principales missions</label>"));
		UICom.structure["ui"][this.missions_nodeid].resource.displayEditor("formA_"+this.id,'x100');
		$("#formA_"+this.id).append($("<hr></hr>"));
		$("#formA_"+this.id).append($("<label class='inline'>Principales réalisations</label>"));
		UICom.structure["ui"][this.realizations_nodeid].resource.displayEditor("formA_"+this.id,'x100');

		$("#B_"+this.id).append($("<form id='formB_"+this.id+"' class='form-horizontal'></form>"));
		displayControlGroup_getEditor("formB_"+this.id,"Organisme","org_"+this.id,this.name_nodeid);
		displayControlGroup_displayEditor("formB_"+this.id,"Logo","logo_"+this.id,this.logo_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,"Service","service_"+this.id,this.service_nodeid);
		$("#formB_"+this.id).append(UICom.structure["ui"][this.website_nodeid].resource.getEditor('same-control-group'));

		displayControlGroup_displayEditor("formB_"+this.id,"Secteur / Environnement","senv_"+this.id,this.secteur_environnement_nodeid,"select");
	//+
		displayControlGroup_displayEditor("formB_"+this.id,"Taille de l'entreprise","entreprisetaille_"+this.id,this.stage_entreprise_taille_nodeid,"select");
		displayControlGroup_displayEditor("formB_"+this.id,"Nationalité de l'entreprise","entreprise_nat_"+this.id,this.stage_entreprise_nat_nodeid,"radio-inline");
//		$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>Adresse</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
		$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>Lieu du stage</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));

		displayControlGroup_getEditor("formB_"+this.id,"Rue","rue_"+this.id,this.street_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,"Ville","ville_"+this.id,this.town_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,"Code postal","code_"+this.id,this.postalcode_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,"Pays","pays_"+this.id,this.country_nodeid);
	//+
		displayControlGroup_displayEditor("formB_"+this.id," ","stage_lieu_"+this.id,this.stage_lieu_nodeid,"radio-inline");
//		$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>Référent</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
		$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>Tuteur du stage en entreprise</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
		
		displayControlGroup_getEditor("formB_"+this.id,"Prénom","refprenom"+this.id,this.referent_prenom_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,"Nom","refnom"+this.id,this.referent_nom_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,"Fonction","titre_"+this.id,this.referent_titre_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,"Courriel","email_"+this.id,this.referent_email_nodeid);
		displayControlGroup_getEditor("formB_"+this.id,"Téléphone","tel_"+this.id,this.referent_telephone_nodeid);

		$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>Contact(s) du stage en entreprise</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
		for (var i=0; i<this.contacts.length; i++){
			this.contacts[i].displayEditor(this.id,"formB_"+this.id,'detail');
			$("#formB_"+this.id).append($("<div class='controls'><hr style='margin-top:11px;'></div>"));
		}

		var parentid = $("asmUnitStructure:has(metadata[semantictag='internship-contact-section'])", this.node).attr('id');
		var databack = false;
		var callback = "UIFactory['Stage'].reloadparse";
		var param2 = "'"+this.id+"'";
		var param3 = "'stages-detail'";
		var param4 = "'"+parentid+"'";
		$("#formB_"+this.id).append($("<div style='margin-bottom:15px;padding-bottom:5px;'><a  class='editbutton' href=\"javascript:importBranch('"+parentid+"','IUT2-parts','contact',"+databack+","+callback+","+param2+","+param3+","+param4+")\">Ajouter un autre contact lié à ce stage <i class='fa fa-plus-square'></i></a></div>"));

		$("#formB_"+this.id).append($("<hr style='margin-top:15px;'></hr>"));
		$("#formB_"+this.id).append($("<label class='inline'>Apport de cette expérience dans mon projet personnel professionel</label>"));
		UICom.structure["ui"][this.apport_nodeid].resource.displayEditor("formB_"+this.id,'x100');
	}
	//----------------------------------------------------------------------------------------------------
	eval_competences = new Array();
	view_eval_competences = new Array();
	html = getSectionCompetences(this.id,destid,this.ppn_nodeid,this.ref_nodeid,this.dom_nodeid,this.dom2a_nodeid,this.dom2b_nodeid,this.dom2c_nodeid,this.comps_metiers_node,this.comps2_metiers_node,this.comps_autres_node,this.comps2_autres_node2a,this.comps2_autres_node2b,this.comps2_autres_node2c,"Compétences liées à ce stage","Stage","stages-detail_histo_","vert","stages_byid");
	//----------------------------------------------------------------------------------------------------
	this.eval_qualites_perso = new Array();
	this.view_eval_qualites_perso = new Array();
	html += getSectionQualitesPerso(this.id,destid,this.qualites_perso_node,this.eval_qualites_perso,this.view_eval_qualites_perso);
	//-----------------------------------------------------------------------
	html += getEvaluationCodes_bytypes(['entreprise','autoeval']);
	//----------------------------------------------------------------------------------------------------
	$(div).append($(html));
	//------------------ evaluation----------------------------------------
	getEvaluations_display(view_eval_competences,eval_competences);
	getEvaluations_display(this.view_eval_qualites_perso,this.eval_qualites_perso);
	//-----------------------------------------------------------------------
	if (g_userrole=='tuteur') {
		html = "<div class='row'><span class='span10'><form id='formC_"+this.id+"' class='form-horizontal'></form></span></div>";
		$(div).append($(html));
		$("#formC_"+this.id).append($("<h4 class='title'>Commentaire(s), remarques du tuteur en entreprise</h4>"));
		UICom.structure["ui"][this.comments_nodeid].resource.displayEditor("formC_"+this.id);
	}
	if (g_userrole=='etudiant') {
		html = "<div class='row'>";
		html += "<a  class='btn btn-mini btn-vert editbutton' onclick=\"javascript:stages_byid['"+this.id+"'].displayView('"+destid+"','detail');$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"')\" data-title='éditer' rel='tooltip'>";
		html += "Quitter le mode édition";
		html += "</a>";
		if (eval_competences.length>0 ||this.eval_qualites_perso.length>0) {
			html += "<a  class='btn btn-mini btn-vert editbutton' onclick=\"javascript:stages_byid['"+this.id+"'].updateOwner();getEnvoiFormulaireStageBox('"+this.id+"','"+destid+"',eval_competences)\" data-title='formulaire' rel='tooltip'>";
			html += "Envoyer la demande d'évaluation de ce stage au tuteur";
			html += "</a>";		
		}
	}
	html += "</div>";
	$(div).append($(html));
	showHeaderEvaluationTable();
};

//==================================
UIFactory["Stage"].prototype.displayEditor_demandeEval= function(destid,type,lang) {
//==================================
	var submittednode = ($(this.node).attr('submit')=='Y')? true:false;
	var html = "";
	$("#"+destid).html("");
	var div = $("<div class='alert alert-vert alert-block edition'></div>");
	$("#"+destid).append(div);
	if (submittednode && g_userrole=='tuteur') {
		html += "<a  class='btn btn-mini btn-danger editbutton' onclick=\"javascript:stages_byid['"+this.id+"'].displayView('"+destid+"','detail');$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"')\" data-title='éditer' rel='tooltip'>";
		html += "Annuller";
		html += "</a>";
		html += "<span id='sendEval1_"+this.id+"'></span>";
	}
	$(div).append($(html));
//	if (g_userrole=='tuteur') {
		$(div).append($("<label id='libelle_"+this.id+"' class='inline titre'>Libellé du poste </label>"));
	//	$("#libelle_"+this.id).append(UICom.structure["ui"][this.id].getNodeLabelEditor());
		$("#libelle_"+this.id).append(UICom.structure["ui"][this.id].getView("#libelle_"+this.id));
		var row = "<div class='row'><div id='A_"+this.id+"' class='span5'></div><div id='B_"+this.id+"' class='span5'></div></div>";
		$(div).append($(row));
	//	html += "<span id='"+destid+"_short_label' class='job_title'>"+UICom.structure["ui"][this.id].getView(destid+"_short_label") + "</span>";
	
		$("#A_"+this.id).append($("<form id='formA_"+this.id+"' class='form-horizontal'></form>"));
		$("#formA_"+this.id).append($("<hr></hr>"));
	//	$("#formA_"+this.id).append($("<div class='control-group'><label class='control-label'>Année de début</label><div id='debut_"+this.id+"' class='controls'>"+UICom.structure["ui"][this.begin_nodeid].resource.getView()+"</div></div>"));
	
		displayControlGroup_getView("formA_"+this.id,"Année de début","debut_"+this.id,this.begin_nodeid);
		displayControlGroup_getView("formA_"+this.id,"Durée","fin_"+this.id,this.duration_nodeid);
		displayControlGroup_displayView("formA_"+this.id,"Domaine métiers","dommet_"+this.id,this.domaine_metier_nodeid,"select");
		$("#formA_"+this.id).append($("<hr></hr>"));
		displayControlGroup_getView("formA_"+this.id,"Organisme de provenance","school_"+this.id,this.school_nodeid);
		displayControlGroup_getView("formA_"+this.id,"Dans le cadre de la formation","statut_"+this.id,this.cadre_nodeid);
		displayControlGroup_displayView("formA_"+this.id,"Attestation de stage","attestation_"+this.id,this.attestation_nodeid);
		displayControlGroup_displayView("formA_"+this.id,"Mémoire de stage","memoire_"+this.id,this.memoire_nodeid);
	
		$("#formA_"+this.id).append($("<hr></hr>"));
		$("#formA_"+this.id).append($("<label class='inline'>Principales missions</label>"));
//		UICom.structure["ui"][this.missions_nodeid].resource.displayEditor("formA_"+this.id,'x100');
		$("#formA_"+this.id).append($("<div>"+UICom.structure["ui"][this.missions_nodeid].resource.getView()+"</div>"));
		$("#formA_"+this.id).append($("<hr></hr>"));
		$("#formA_"+this.id).append($("<label class='inline'>Principales réalisations</label>"));
//		UICom.structure["ui"][this.realizations_nodeid].resource.displayEditor("formA_"+this.id,'x100');
		$("#formA_"+this.id).append($("<div>"+UICom.structure["ui"][this.realizations_nodeid].resource.getView()+"</div>"));
	
		$("#B_"+this.id).append($("<form id='formB_"+this.id+"' class='form-horizontal'></form>"));
		displayControlGroup_getView("formB_"+this.id,"Organisme","org_"+this.id,this.name_nodeid);
		displayControlGroup_displayView("formB_"+this.id,"Logo","logo_"+this.id,this.logo_nodeid);
		displayControlGroup_getView("formB_"+this.id,"Service","service_"+this.id,this.service_nodeid);
		$("#formB_"+this.id).append(UICom.structure["ui"][this.website_nodeid].resource.getView(null,'same'));
	
		displayControlGroup_displayView("formB_"+this.id,"Secteur / Environnement","senv_"+this.id,this.secteur_environnement_nodeid,"select");
	//+
		displayControlGroup_displayView("formB_"+this.id,"Taille de l'entreprise","entreprisetaille_"+this.id,this.stage_entreprise_taille_nodeid,"select");
		displayControlGroup_displayView("formB_"+this.id,"Nationalité de l'entreprise","entreprise_nat_"+this.id,this.stage_entreprise_nat_nodeid,"radio-inline");
	//	$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>Adresse</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
		$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>Lieu du stage</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
	
		displayControlGroup_getView("formB_"+this.id,"Rue","rue_"+this.id,this.street_nodeid);
		displayControlGroup_getView("formB_"+this.id,"Ville","ville_"+this.id,this.town_nodeid);
		displayControlGroup_getView("formB_"+this.id,"Code postal","code_"+this.id,this.postalcode_nodeid);
		displayControlGroup_getView("formB_"+this.id,"Pays","pays_"+this.id,this.country_nodeid);
	//+
		displayControlGroup_displayView("formB_"+this.id," ","stage_lieu_"+this.id,this.stage_lieu_nodeid,"radio-inline");
	//	$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>Référent</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
		$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>Tuteur du stage en entreprise</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
	
		displayControlGroup_getView("formB_"+this.id,"Prénom","refprenom"+this.id,this.referent_prenom_nodeid);
		displayControlGroup_getView("formB_"+this.id,"Nom","refnom"+this.id,this.referent_nom_nodeid);
		displayControlGroup_getView("formB_"+this.id,"Fonction","titre_"+this.id,this.referent_titre_nodeid);
		displayControlGroup_getView("formB_"+this.id,"Courriel","email_"+this.id,this.referent_email_nodeid);
		displayControlGroup_getView("formB_"+this.id,"Téléphone","tel_"+this.id,this.referent_telephone_nodeid);
	
		$("#formB_"+this.id).append($("<div class='control-group'><label class='control-label'>Contact(s) du stage en entreprise</label><div class='controls'><hr style='margin-top:11px;'></div></div>"));
		for (var i=0; i<this.contacts.length; i++){
			this.contacts[i].displayView("formB_"+this.id,'detail');
			$("#formB_"+this.id).append($("<div class='controls'><hr style='margin-top:11px;'></div>"));
		}
	
		$("#formB_"+this.id).append($("<hr style='margin-top:15px;'></hr>"));
		$("#formB_"+this.id).append($("<label class='inline'>Apport de cette expérience dans mon projet personnel professionel</label>"));
		$("#formB_"+this.id).append($("<div>"+UICom.structure["ui"][this.apport_nodeid].resource.getView()+"</div>"));
//		UICom.structure["ui"][this.apport_nodeid].resource.displayEditor("formB_"+this.id,'x100');
//	}
	//----------------------------------------------------------------------------------------------------
	eval_competences = new Array();
	view_eval_competences = new Array();
	html = getSectionCompetences(this.id,destid,this.ppn_nodeid,this.ref_nodeid,this.dom_nodeid,this.dom2a_nodeid,this.dom2b_nodeid,this.dom2c_nodeid,this.comps_metiers_node,this.comps2_metiers_node,this.comps_autres_node,this.comps2_autres_node2a,this.comps2_autres_node2b,this.comps2_autres_node2c,"Compétences liées à ce stage","Stage","stages-detail_histo_","vert","stages_byid");
	//----------------------------------------------------------------------------------------------------
	this.eval_qualites_perso = new Array();
	this.view_eval_qualites_perso = new Array();
//	if (g_userrole=='etudiant') {
		html += getSectionQualitesPerso(this.id,destid,this.qualites_perso_node,this.eval_qualites_perso,this.view_eval_qualites_perso);
//	}
	//-----------------------------------------------------------------------
	html += getEvaluationCodes_bytypes(['entreprise','autoeval']);
	//----------------------------------------------------------------------------------------------------
	$(div).append($(html));
	//------------------ evaluation----------------------------------------
	getEvaluations_display(view_eval_competences,eval_competences);
	getEvaluations_display(this.view_eval_qualites_perso,this.eval_qualites_perso);
	//-----------------------------------------------------------------------
	var buttons_senEval ="";
	if (g_userrole=='tuteur') {
		html = "<div class='row'><span class='span10'><form id='formC_"+this.id+"' class='form-horizontal'></form></span></div>";
		$(div).append($(html));
		$("#formC_"+this.id).append($("<h4 class='title'>Commentaire(s), remarques du tuteur en entreprise</h4>"));
		if (submittednode) {
			UICom.structure["ui"][this.comments_nodeid].resource.displayEditor("formC_"+this.id);			
			html = "<div class='row'>";
			html += "<a  class='btn btn-mini btn-danger editbutton' onclick=\"javascript:stages_byid['"+this.id+"'].displayView('"+destid+"','detail');$('#collapse"+this.id+"').collapse('show');toggleZoom('"+this.id+"')\" data-title='éditer' rel='tooltip'>";
			html += "Annuller";
			html += "</a>";
			if (eval_competences.length>0 ||this.eval_qualites_perso.length>0) {
//			if (eval_competences.length>0) {
				buttons_senEval += "<a  class='btn btn-mini btn-vert editbutton' onclick=\"javascript:envoyerEvaluationStage('"+this.id+"','"+destid+"')\" data-title='formulaire' rel='tooltip'>";
				buttons_senEval += "Envoyer l'évaluation";
				buttons_senEval += "</a>";		
				$("#sendEval1_"+this.id).append(buttons_senEval);
				html += buttons_senEval;
			}
			html += "</div>";
		} else{
			$("#formC_"+this.id).append($("<div>"+UICom.structure["ui"][this.comments_nodeid].resource.getView()+"</div>"));
		}			
		$(div).append($(html));
	}
	showHeaderEvaluationTable();
};

//==================================
UIFactory["Stage"].reloadparseone = function(uuid,destid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/nodes/node/" + uuid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			var units = $("asmUnit:has(metadata[semantictag='internship-unit'])",data);
			stages_byid[uuid] = new UIFactory["Stage"](units[0]);
			$("#"+uuid,g_portfolio_current).replaceWith($(":root",data).children()[0]);
			stages_byid[uuid].displayEditor(destid);
			if (callback!=null)
				callback(param1,param2,param3,param4);
		}
	});
};

//==================================
UIFactory["Stage"].reloadparse = function(uuid,destid,parentid,callback,param1,param2,param3,param4) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/" + portfolioid + "?resources=true",
		success : function(data) {
			g_portfolio_current = data;
			UICom.parseStructure(data);
			UIFactory["Stage"].parse(data);
			if (uuid!=null)
				stages_byid[uuid].displayEditor(destid);
			else {
				Stages_Display('stages-short_histo','short');
				Stages_Display('stages-detail_histo','detail',parentid);
				Stages_Display('stages_cv','cv');
			}
			if (callback!=null)
				callback(param1,param2,param3,param4);
			hideMessageBox();
		}
	});
};

//==================================
UIFactory["Stage"].refresh = function(parentid,destid) 
//==================================
{
	if (parentid!=null)
		stages_byid[parentid].displayEditor(destid);
	else {
		Stages_Display('stages-short_histo','short');
		Stages_Display('stages-detail_histo','detail',$("asmStructure:has(metadata[semantictag='internships'])", g_portfolio_current).attr('id'));
		Stages_Display('stages_cv','cv');
}
};

//==================================
UIFactory["Stage"].parse = function(data) 
//==================================
{
	stages_byid = {};
	stages_list = [];
	var units = $("asmUnit:has(metadata[semantictag='internship-unit'])",data);
	var tableau = new Array();
	for ( var i = 0; i < units.length; i++) {
		var uuid = $(units[i]).attr('id');
		stages_byid[uuid] = new UIFactory["Stage"](units[i]);
		//------------------
		var date_debut = UICom.structure["ui"][$("asmContext:has(metadata[semantictag='date-begin'])",units[i]).attr('id')].resource.getView();
		tableau[i] = [date_debut,uuid];
	}
	var newTableau = tableau.sort(sortOn1Desc);
	for (var i=0; i<newTableau.length; i++){
		stages_list[i] = stages_byid[newTableau[i][1]];
	}
};

//==================================
UIFactory["Stage"].remove = function(uuid,parentid,destid)
//==================================
{
	UICom.DeleteNode(uuid);
	if(parentid!="undefined" && destid!="undefined"){
		$("#"+uuid,stages_byid[parentid].node).remove();
		stages_byid[uuid] = new UIFactory["Stage"](stages_byid[parentid].node);
		stages_byid[parentid].displayEditor(destid);
	} else {
		$("#"+uuid,g_portfolio_current).remove();
		UIFactory["Stage"].parse(g_portfolio_current);
		Stages_Display('stages-short_histo','short');
		Stages_Display('stages-detail_histo','detail',$("asmStructure:has(metadata[semantictag='internships'])", g_portfolio_current).attr('id'));
		Stages_Display('stages_cv','cv');
	}
};

//==================================
UIFactory["Stage"].prototype.updateOwner = function()
//==================================
{
	var nodeid  = $("asmContext:has(metadata[semantictag='nom-etudiant'])",this.node).attr('id');
	var xml = "<asmResource xsi_type='Field'>";
	xml += "<text lang='fr'>"+USER.firstname_node.text()+" "+USER.lastname_node.text()+"</text>";
	xml += "<text lang='en'>"+USER.firstname_node.text()+" "+USER.lastname_node.text()+"</text>";
	xml += "</asmResource>";
	$.ajax({
		type : "PUT",
		contentType: "application/xml",
		dataType : "text",
		data : xml,
		url : "../../../"+serverBCK+"/resources/resource/" + nodeid,
		success : function() {
		}
	});
};

//==================================
function Stages_Display(destid,type,parentid) {
//==================================
	$("#"+destid).html("");
	var html ="";
	if (type=='detail') {
		//  if databack is true callback(data,param2,param3,param4) else callback(param2,param3,param4)
		var databack = false;
		var callback = "UIFactory['Stage'].reloadparse";
		var param2 = "null";
		var param3 = "'"+destid+"'";
		var param4 = "'"+parentid+"'";
		html += "<div class='titre2'><span class='titre1'>Stages</span>";
		if (g_userrole=='etudiant') {
			html += "<a  class='editbutton' href=\"javascript:setMessageBox('Création ...');showMessageBox();importBranch('"+parentid+"','IUT2-parts','internship-unit',"+databack+","+callback+","+param2+","+param3+","+param4+")\">";
			html += "Ajouter un stage <i class='fa fa-plus-square'>";
			html += "</a></div>";
		}
	}
	if (type=='short' &&  stages_list.length>0)
		html += "<h5>Stage(s)</h5>";
	if (type=='detail' || type=='short') {
		html += "<div class='panel-group' id='accordion_"+destid+"'></div>";
		$("#"+destid).html(html);
		for ( var i = 0; i < stages_list.length; i++) {
			$("#accordion_"+destid).append($("<div id='"+destid+"_"+stages_list[i].id+"'></div>"));			
			stages_list[i].displayView(destid+"_"+stages_list[i].id,type,null,"accordion_"+destid);
		}
	}
	if (type=='cv') {
		for ( var i = 0; i < stages_list.length; i++) {
			var uuid = stages_list[i].id;
			$("#"+destid).append($("<div id='exp_"+uuid+"'></div>"));			
			stages_list[i].displayView("exp_"+uuid,'cv',null,"accordion_"+destid);
		}
	}
}

//==============================
function formulaireBox()
//==============================
{
	var html = "";
	html += "\n<!-- ==================== Formualaire box ============= -->";
	html += "\n<div id='formulaire-window' class='modal hide fade'>";
	html += "\n		<div id='formulaire-window-header' class='modal-header'>";
	html += "\n			Questionnaire";
	html += "\n		</div>";
	html += "\n		<div id='formulaire-window-body' class='modal-body'>";
	html += "\n		</div>";
	html += "\n		<div id='formulaire-window-footer' class='modal-footer'></div>";
	html += "\n	</div>";
	html += "\n<!-- ============================================== -->";
	return html;
}

//==================================
function createUserPortfolio(template,code,userid,role) {
//==================================
	var portfolioid = UIFactory["Portfolio"].instantiate_bycode(template,code);
	UIFactory["Portfolio"].shareUser(portfolioid,userid,role);
	UIFactory["Portfolio"].unshareUser(portfolioid,userid,'designer');
	return portfolioid;
}

//==================================
function remplirFormulaireStage(uuid) {
//==================================
	//---- test si formulaire existe ---
	if (UICom.structure["ui"][stages_byid[uuid].formulaire_nodeid].resource.getView()==''){
		var template = "IUT2-formulaire-stage";
		var code = USER.username_node.text()+"-formstage-"+uuid;
		// var portfolioid = execByNodeJS('createUserPortfolio',template,code,userid,role);
		var portfoliouuid = createUserPortfolio(template,code,USER.id,'etudiant');
		$(UICom.structure["ui"][stages_byid[uuid].formulaire_nodeid].resource.text_node[LANGCODE]).text(portfoliouuid);
		UICom.structure["ui"][stages_byid[uuid].formulaire_nodeid].resource.save();
	}
	//----------------------------------
	var formulaireid = UICom.structure["ui"][stages_byid[uuid].formulaire_nodeid].resource.getView();
	g_edit = true;
	g_display_type = 'standard';
	portfolioid = formulaireid;
	$("#formulaire-window-body").html("");
	$.ajaxSetup({async: false});
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/" + formulaireid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			UIFactory["Portfolio"].parse(data);
			UIFactory["Portfolio"].displayPortfolio('formulaire-window-body',g_display_type,LANGCODE,g_edit);
			$('a[data-toggle=tooltip]').tooltip({html:true});
		}
	});
	$.ajaxSetup({async: true});
	var buttons = "<span class='btn' onclick=\"javascript:portfolioid=g_portfolioid;$('#formulaire-window').modal('hide');\">" + karutaStr[LANG]["Close"] + "</span>";
	document.getElementById('formulaire-window-footer').innerHTML = buttons;
	$("#formulaire-window").modal('show');
}

//==================================
function getEnvoiFormulaireStageBox(uuid,destid,eval_competences)
//==================================
{
	var refnom = $($('#refnom'+uuid).children().eq(0)).val();
	var refprenom = $($('#refprenom'+uuid).children().eq(0)).val();
//	alert (refnom);
//	var refemail = UICom.structure["ui"][refemail_nodeid].resource.getView();
//	var refnom = UICom.structure["ui"][refnom_nodeid].resource.getView();
	var refemail = $($('#email_'+uuid).children().eq(0)).val();
	var html = "";
	var buttons = "";
	var js2 = "javascript:$('#alert-window').modal('hide')";
	if (refprenom!='' && refnom!='' && refemail!='') {
		html = "<div style='margin-bottom:5px'>Vous désirez envoyer une demande de validation de vos compétences de stage à";
		html += "<div class='value'>"+refprenom+" "+refnom;
		html += "<br/>Êtes-vous sûr ?";
		html += "</div>";		
		var js1 = "javascript:envoyerFormulaireStage('"+uuid+"','"+destid+"','"+refemail+"','tuteur')";
		buttons = " <span class='btn btn-mini btn-vert' onclick=\""+js1+";\">"+appStr[LANG]['oksending']+"</span>";
		buttons += " <span class='btn btn-mini btn-red btn-danger' onclick=\""+js2+";\">"+appStr[LANG]['cancelsending']+"</span>";
	} else{
		html = "<div style='margin-bottom:5px'>Vous désirez envoyer une demande de validation de vos compétences de stage.";
		html += "<br/>Veuillez renseigner le nom et l'adresse mail du tuteur en entreprise renseignée sur cette page !";
		html += "</div>";		
		buttons = " <span class='btn btn-mini btn-red' onclick=\""+js2+";\">"+karutaStr[LANG]['Close']+"</span>";
	}
	$("#alert-window-body").html($(html));
	// ------------------------------------
	$("#alert-window-footer").html($(buttons));

	$("#alert-window").removeClass('alert-bleu alert-orange alert-vert alert-violet');
	$("#alert-window").addClass('alert-vert');
	$("#alert-window").modal('show');
}

//==================================
function envoyerFormulaireStage(uuid,destid,email,role) {
//==================================
	$('#alert-window').modal('hide');
	submit(uuid);
/*
	for (var i=0; i<eval_competences.length;i++){
		submit(eval_competences[i]);
	}
	var eval_qualites_perso =stages_byid[uuid].eval_qualites_perso;
	for (var i=0; i<eval_qualites_perso.length;i++){
		submit(eval_qualites_perso[i]);
	}
//	UIFactory['Stage'].reloadparse(uuid,destid);
	UIFactory['Stage'].reloadparse(null,null,uuid);
//	stages_byid[uuid].displayView(destid+"_"+uuid,'detail',null,"accordion_"+destid);
*/
//post /directlink?uuid=&user=&role=
//	var urlS = "../../../"+serverBCK+'/nodes/node/'+uuid+'/action/directlink?user=&role=';
	var urlS = "../../../"+serverFIL+'/direct?uuid='+uuid+'&email='+email+'&role='+role;
	$.ajax({
		type : "POST",
		dataType : "text",
		contentType: "application/xml",
		url : urlS,
		success : function (data){
			sendMail_Stage(data,email);
		}
	});
	window.location.reload();
//	UIFactory['Stage'].reloadparse(null,null,$("asmStructure:has(metadata[semantictag='internships'])", g_portfolio_current).attr('id'),null);

	/*
	UIFactory['Stage'].reloadparse(null,null,$("asmStructure:has(metadata[semantictag='internships'])", g_portfolio_current).attr('id'),null);
	Stages_Display('stages-short','short');
	Stages_Display('stages-detail','detail',$("asmStructure:has(metadata[semantictag='internships'])", g_portfolio_current).attr('id'));	
*/
}
/*
//==================================
function sendMail_Stage(encodeddata,email) {
//==================================
	var url = serveur+"application/htm/demande-evaluation-stage.htm?i="+encodeddata+"&page=stage";
	var message="Bonjour,";
	message +="<br/>";
	message +="Demande d'évaluation de stage:";
	message +="<br/>";
	message +=url;
	message +="<br/>";
	message +="<Admin IUT2>";
	var dataString = "sender=IUT2&recipient="+email+"&subject=Demande d'évaluation de stage&message="+message;
	$.ajax({
		type : "POST",
		dataType : "text",
		url : "../../../"+serverFIL+"/mail",
		data: dataString,
		success : function(data) {
			alert("Envoie de courriel - OK !\nURL="+url);
		}
	});
}
*/
//==================================
function sendMail_Stage(encodeddata,email) {
//==================================
	var url = window.location.href;
	var serverURL = url.substring(0,url.indexOf(appliname)-1);
	var url = serverURL+"application/htm/demande-evaluation-stage.htm?i="+encodeddata+"&amp;page=stage";
//	var url = serveur+"application/htm/demande-evaluation-stage.htm?i="+encodeddata+"&page=stage";
	var message="Bonjour,";
	message +="&lt;br/&gt;";
	message +="Demande d'évaluation de stage:";
	message +="&lt;br/&gt;";
	message +=url;
	message +="&lt;br/&gt;";
	message +="Admin IUT2";
	var xml ="<node>";
	xml +="<sender>IUT2</sender>";
	xml +="<recipient>"+email+"</recipient>";
	xml +="<subject>Demande d'évaluation de stage</subject>";
	xml +="<message>"+message+"</message>";
	xml +="</node>";
	$.ajax({
		type : "POST",
		dataType : "xml",
		url : "../../../"+serverFIL+"/mail",
		data: xml,
		success : function(data) {
//			alert("Envoie de courriel - OK !\nURL="+url);
		}
	});
}

//==================================
function envoyerEvaluationStage(uuid,destid) {
//==================================
	submit(uuid);
	window.location.reload();
//	UIFactory['Stage'].reloadparse(null,null,uuid);
}
