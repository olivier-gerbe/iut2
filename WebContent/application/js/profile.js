//========================================================
//========================================================
//===================== Profile =======================
//========================================================
//========================================================
var profiles_byid = {};
var profiles_list = [];

/// Check namespace existence
if( UIFactory === undefined )
{
  var UIFactory = {};
}

//==================================
UIFactory["Profile"] = function(node)
//==================================
{
	this.id = $(node).attr('id');
	this.node = node;
	this.photo_nodeid = $("asmContext:has(metadata[semantictag='photo'])",node).attr('id');
	this.firstname_nodeid = $("asmContext:has(metadata[semantictag='firstname'])",node).attr('id');
	this.lastname_nodeid = $("asmContext:has(metadata[semantictag='lastname'])",node).attr('id');
	this.email_nodeid = $("asmContext:has(metadata[semantictag='email'])",node).attr('id');
	this.profil_inter_qs = $("asmContext:has(metadata[semantictag*='profil-inter-question-select'])",node);
	this.periode_nodeid = $($("asmContext:has(metadata[semantictag*='periode-sejours-etranger'])",node)[0]).attr('id');
	this.sejours_nodeid = $($("asmContext:has(metadata[semantictag*='total-sejours-etranger'])",node)[0]).attr('id');
	this.superviseur_nodeid = $($("asmContext:has(metadata[semantictag*='superviseur'])",node)[0]).attr('id');
	if (this.superviseur_nodeid!=undefined)
		this.superviseur = (UICom.structure["ui"][this.superviseur_nodeid].resource.getText()=='o') ? true : false;
};

//==================================
UIFactory["Profile"].prototype.displayView = function(destid,type,lang)
//==================================
{
	var profile = $('iframe').contents();

	var html = "";
	$("#"+destid).html(html);  // on vide html
	if (type==null || type=='short') {
		var photo = UICom.structure["ui"][this.photo_nodeid].resource.getView(destid+"_short_photo");
		var firstname = UICom.structure["ui"][this.firstname_nodeid].resource.getView(destid+"_short_firstname");
		var lastname = UICom.structure["ui"][this.lastname_nodeid].resource.getView(destid+"_short_lastname");
		html += "<span id='"+destid+"_short_photo'>"+photo+"</span> ";
		html += "<h4 class='media-heading'>Bonjour,</h4>";
		html += "<h4 class='media-heading'>";
		html += "<span id='"+destid+"_short_firstname'>"+firstname+"</span> ";
		html += "<span id='"+destid+"_short_lastname'>"+lastname+"</span> ";
		html += "</h4>";
	}
	if (type==null || type=='photo') {
		var photo = UICom.structure["ui"][this.photo_nodeid].resource.getView(destid+"_short_photo");
		html += "<span id='"+destid+"_short_photo'>"+photo+"</span> ";
	}
	if (type==null || type=='lastname_firstname') {
		var firstname = UICom.structure["ui"][this.firstname_nodeid].resource.getView(destid+"_short_firstname");
		var lastname = UICom.structure["ui"][this.lastname_nodeid].resource.getView(destid+"_short_lastname");
		html += "<span id='"+destid+"_short_lastname' class='lastname'>"+lastname+"</span> ";
		html += "<span id='"+destid+"_short_firstname' class='lastname'>"+firstname+"</span> ";
	}
	if (type==null || type=='firstname_lastname') {
		var firstname = UICom.structure["ui"][this.firstname_nodeid].resource.getView(destid+"_short_firstname");
		var lastname = UICom.structure["ui"][this.lastname_nodeid].resource.getView(destid+"_short_lastname");
		html += "<span id='"+destid+"_short_firstname' class='lastname'>"+firstname+"</span> ";
		html += "<span id='"+destid+"_short_lastname' class='lastname'>"+lastname+"</span> ";
	}
	if (type=='detail') {
		html += "<div class='alert alert-block'>";
//		html += "<span  class='btn editbutton' onclick=\"javascript:profiles_byid['"+this.id+"'].displayEditor('"+destid+"');\" data-title='éditer' rel='tooltip'><i class='icon-pencil'></i></span>";
		//-------------------------------
		var firstname = UICom.structure["ui"][this.firstname_nodeid].resource.getView(destid+"_detail_firstname");
		html += "<h4><span id='"+destid+"_detail_firstname'>"+firstname+"</span> "+UICom.structure["ui"][this.lastname_nodeid].resource.getView()+"</h4>";
		html += "<h5>"+UICom.structure["ui"][this.email._nodeid].resource.getView()+"</h5>";
		//-------------------------------
		html += "</div><!-- class='alert alert-orange alert-block'-->";
	}
	var obj = $(html);
	$("#"+destid).append(obj);
};
//==================================
UIFactory["Profile"].prototype.displayEditor = function(destid,type,lang) {
//==================================
//	var html = "<div id='profile_"+this.id+"' class='profile alert alert-block'></div>";
//	$("#"+destid).html(html);
//	$("#profile_"+this.id).append($("<div>Photo<span id='help-profil-photo'></span></div>"));
	UICom.structure["ui"][this.photo_nodeid].resource.displayEditor("profil-photo");
//	$("profil").append($("<br><br><label id='email_profil' class='inline'>Courriel<span id='help-profil-courriel'></span> : </label>"));
	$("#email_profil").append(UICom.structure["ui"][this.email_nodeid].resource.getEditor());
	//----------------------
//	$("#profil").append($("<div class='titre1' >Mon profil interculturel</div>"));
	for (var i=0; i<this.profil_inter_qs.length;i++){
		var uuid = $(this.profil_inter_qs[i]).attr("id");
		html  = "<label class='inline profil_inter'>";
		html += UICom.structure["ui"][uuid].getLabel() + " <span id='profil_inter_"+uuid+"'></span>";
		html += "</label>";
		$("#profil-interculturel").append($(html));
		UICom.structure["ui"][uuid].resource.displayEditor("profil_inter_"+uuid);
	}
	displayControlGroup_displayEditor("profil-interculturel",UICom.structure["ui"][this.periode_nodeid].getLabel(),"profil_inter_"+this.periode_nodeid,this.periode_nodeid,"radio");
	$("#profile").append($("<label id='profil_inter_"+this.sejours_nodeid+"' class='inline profil_inter'>"+UICom.structure["ui"][this.sejours_nodeid].getLabel()+" </label>"));
	$("#profil_inter_"+this.sejours_nodeid).append(UICom.structure["ui"][this.sejours_nodeid].resource.getEditor());
	//----------------------
	if (g_userrole!='etudiant'){
		$('#'+destid+' input, #'+destid+' select').attr("disabled", true);
		$('#'+destid+' button').prop("disabled", true);
	}
};


//==================================
UIFactory["Profile"].parse = function(data) 
//==================================
{
	profiles_byid = {};
	profiles_list = [];
	var elts = $("asmRoot:has(metadata[semantictag*='profile'])",data);
	for ( var i = 0; i < elts.length; i++) {
		profiles_byid[$(elts[i]).attr('id')] = new UIFactory["Profile"](elts[i]);
		profiles_list[i] = profiles_byid[$(elts[i]).attr('id')];
	}
};

//==================================
UIFactory["Profile"].refresh = function(parentid,destid) 
//==================================
{alert(parendid);
	if (parentid!=null)
		profiles_byid[parentid].displayEditor(destid);
	else {
		profiles_list[0].displayView('profile-short','short');
		profiles_list[0].displayEditor('profile-detail');
	}
};

//==================================
UIFactory["Profile"].reloadparse = function(uuid,destid,parentid) 
//==================================
{
	$.ajax({
		type : "GET",
		dataType : "xml",
		url : "../../../"+serverBCK+"/portfolios/portfolio/" + portfolioid + "?resources=true",
		success : function(data) {
			UICom.parseStructure(data);
			UIFactory["Profile"].parse(data);
			if (uuid!=null)
				profiles_byid[uuid].displayEditor(destid);
			else {
				Profiles_Display('profiles-short','short');
				Profiles_Display('profiles-detail','detail',parentid);
			}
		}
	});
};

//==================================
UIFactory["Profile"].prototype.get_data2send_csv = function()
//==================================
{
	var str = "";
	for (var i=0; i<this.profil_inter_qs.length;i++){
		tmp = $("value",$("asmResource[xsi_type='Get_Resource']",this.profil_inter_qs[i])).text();
		str += tmp+";";
	}
	str += getDataByTypeTag_csv("value",this.node,"periode-sejours-etranger");
	str += getDataByTypeTag_csv("text",this.node,"total-sejours-etranger");
	return str;
};

//==================================
UIFactory["Profile"].prototype.get_data2send_xml = function()
//==================================
{
	var str = "<Profile-inter>";
	for (var i=0; i<this.profil_inter_qs.length;i++){
		var uuid = $(this.profil_inter_qs[i]).attr("id");
		str += "<profil-inter-question>";
		var tmp = $("code",$("asmResource[xsi_type='nodeRes']",this.profil_inter_qs[i])).text();
		str += "<code>"+tmp+"</code>";
		tmp = $("value",$("asmResource[xsi_type='Get_Resource']",this.profil_inter_qs[i])).text();
		str += "<value>"+tmp+ "</value>";
		str += "</profil-inter-question>";
	}
	str += getDataByTypeTag_xml("periode-sejours-etranger","value",this.node,"periode-sejours-etranger");
	str += getDataByTypeTag_xml("total-sejours-etranger","text",this.node,"total-sejours-etranger");
	str += "</Profile-inter>";
//	alert(str);
	return str;
};


