/* =======================================================
	Copyright 2015 - ePortfolium - Licensed under the
	Educational Community License, Version 2.0 (the "License"); you may
	not use this file except in compliance with the License. You may
	obtain a copy of the License at

	http://opensource.org/licenses/ECL-2.0

	Unless required by applicable law or agreed to in writing,
	software distributed under the License is distributed on an "AS IS"
	BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
	or implied. See the License for the specific language governing
	permissions and limitations under the License.
   ======================================================= */


//==================================
function displaySocialNetworkIUT2(destid)
//==================================
{
	getElggUser();
	$.ajaxSetup({async: false});
	setUserGroups($(USER.username_node).text());
	$.ajaxSetup({async: true});
	var html = "";
	html += "		<div class='form-group'>";
	html += "			<div class='wire-label' data-toggle='tooltip' data-placement='top' title=\"Pour publier un lien link(url), pour publier une image image(url)\" ><em class='fa fa-comment-o'></em> Quelque chose &agrave; publier sur le r&eacute;seau social interne ? <span class='fa fa-info-circle fa-lg'></span></div> ";
	html += "			<textarea class='form-control' rows='2' id='wire-message' ></textarea>";
	html += "			<table><tr>";
	html += "				<td class='publish-button'>";
	html += "					<span onclick=\"postWire('"+destid+"-body');\" class='action-button'>Publier</span>";
	html += "				</td>";
	html += "				<td class='publish_on'>&nbsp;sur&nbsp;</td> ";
	html += "				<td class='group-button'>";
	html += "					<span class='dropdown dropdown-button'>";
	html += "						<span class='button' data-toggle='dropdown' type='button' aria-haspopup='true' aria-expanded='false'><span id='publish-group' value='0'>Public</span>&nbsp;<span class='caret'></span></span>";
	html += "						<ul id='select-group' class='dropdown-menu' role='menu' aria-labelledby='list-menu'>";
	html += "						</ul>";
	html += "					</span>";
	html += "				</td>";
	html += "			</tr></table>";
	html += "		</div>";

	$("#"+destid+"-head").append($(html));
	$('div[data-toggle="tooltip"]').tooltip();

	html = "<div class='panels'>";

	html += "	<ul class='nav nav-tabs' role='tablist'>";
	html += "		<li role='presentation' class='active'><a href='#activities' aria-controls='activities' role='tab' data-toggle='tab'>Activités du réseau</a></li>";
	html += "		<li role='presentation'><a href='#public' aria-controls='public' role='tab' data-toggle='tab'>Tous les murs</a></li>";
	html += "		<li role='presentation'><a href='#groups' aria-controls='groups' role='tab' data-toggle='tab'>Les murs de mes groupes</a></li>";
	html += "	</ul>";

	html += "	<div class='tab-content'>";
	html += "		<div role='tabpanel' class='tab-pane active' id='activities'></div>";
	html += "		<div role='tabpanel' class='tab-pane' id='public'>...</div>";
	html += "		<div role='tabpanel' class='tab-pane' id='groups'>...</div>";
	html += "	</div>";

	html += "</div>";
	display_select_group("select-group");
	$("#"+destid+"-body").append($(html));
	//------------------------------
	getNumberUnreadMessages('numberunreadmessages')
	getRiverFeed('activities');
	getWall('public');
	displayGroupWalls('groups');
	displayGroupList('mesgroupes');
	var currentTexfieldInterval = setInterval(function(){getRiverFeed('activities');getWall('public');displayGroupWalls('groups');},g_elgg_refreshing);
}



//=================================================================================================
//=================================================================================================
//=====================================  ACTIVITIES  ==============================================
//=================================================================================================
//=================================================================================================


//=================================================
function river_item(dest,node,action)
//=================================================
{
	var date = moment(node.object.time_updated);
	var html ="";
	html+= "<li class='elgg-item'>";
	html+= "<div class='elgg-image-block elgg-river-item clearfix'>";
	html+= "	<div class='elgg-image'>";
	html+= "		<div class='elgg-avatar elgg-avatar-small'>";
	html+= "			<img src='"+node.subject.avatar_url+"'>";
	html+= "		</div>";
	html+= "	</div>";
	html+= "	<div class='elgg-body'>";
	html+= "		<div class='media'>";
	html+= "			<div class='media-left'>";
	html+= "			</div>";
	html+= "			<div class='media-body'>";
	html+= "				<h5 class='media-heading'>";
	//----------------------------------
	if (node.object.owner_guid==g_elgg_userid) // test if owner
		html+= "					<i class='fa fa-times fa-lg' onclick=\"deleteWire('"+node.object_guid+"')\"></i> ";
	if (node.num_likes!='0')
		html += "				<span class='likes'>&nbsp;"+node.num_likes+"</span>";
	html+= "					<i class='fa fa-thumbs-o-up fa-lg' onclick=\"likeEntity('"+node.object_guid+"')\"></i> ";
	html+= "					<i id='plus-"+node.id+"' onclick=\"toggleComments('"+node.id+"')\" class='fa fa-plus fa-lg' style='display:none'></i> ";
	html+= "					<span class='repondre' onclick=\"toggleReplyBox('"+node.object_guid+"','river')\">Répondre</span> ";
	//----------------------------------
	html+= "					<span class='elgg-river-subject'>"+node.subject.name+"</span> ";
	html+= 						snStr[LANG][action];
	html+= " 					<span id='object-"+node.id+"'></span>";
	html+= " 					<span class='elgg-river-timestamp'><acronym title='"+date.format('LLL')+"'>"+date.fromNow()+"</acronym></span>";
	html+= "				</h5>";
	html+= " 				<div id='content-"+node.id+"'></div>";
	if (node.object.comments!=undefined) {
		$("#"+node.id+"-plus").show();
		html+= "<div id='comments-"+node.id+"' class='elgg-river-comments' style='display:none'>";
		html+= "<ul class='elgg-list elgg-river-comments'>";
		for (var i=0;i<node.object.comments.length;i++) {
			html += getComments(node.object.comments[i]);
		}
		html+= "</ul>";
		html+= "</div>";
	}
	html+= "				<div id='river-reply-"+node.object_guid+"' style='display:none'></div>";
	html+= "			</div><!-- class='media-body' -->";
	html+= "		</div><!-- class='media' -->";
	html+= "	</div><!-- class='elgg-body' -->";
	html+= "</div><!-- class='elgg-image-block elgg-river-item clearfix' -->";
	html+= "</li>";
	$(dest).append($(html));
	if (node.object.comments!=undefined)
		$("#plus-"+node.id).show();
}

	
//=================================================
function river_unknown(dest,node)
//=================================================
{
	var html ="";
	html+= "<div class='post river_unknown'>";
	html +="<img src='"+node.subject.avatar_url+"'> ";
	html +="<span>"+node.subject.name+" </span>";
	html +="<span> unknown action </span>";
	html+= "</div><!--post-->";
	$(dest).append($(html));

}


//=================================================
function river_user_default_profileiconupdate(dest,node)
//=================================================
{
	river_item(dest,node,'river_user_default_profileiconupdate');
	var html= "";
	html+= "				<div class='elgg-river-attachments clearfix'>";
	html+= "					<div class='elgg-avatar elgg-avatar-tiny'>";
	html+= "						<img src='"+node.subject.avatar_url+"'>";
	html+= "					</div>";
	html+= "				</div>";
	$("#content-"+node.id).html($(html));
}

//=================================================
function river_relationship_friend_create(dest,node)
//=================================================
{
	river_item(dest,node,'river_relationship_friend_create');
	var html= " "+node.object.name;
	$("#object-"+node.id).html(html)
}

//=================================================
function river_object_blog_create(dest,node)
//=================================================
{
	river_item(dest,node,'river_object_blog_create');
}

//=================================================
function river_object_thewire_create(dest,node)
//=================================================
{
	river_item(dest,node,'river_object_thewire_create');
	var html= "<div>"+transcodeText(node.object.description)+"</div>";
	$("#content-"+node.id).html($(html))
}

//=================================================
function river_relationship_member_create(dest,node)
//=================================================
{
	river_item(dest,node,'river_relationship_member_create');
	var html= " "+node.object.name;
	$("#object-"+node.id).html(html)
}

//=================================================
function river_group_create(dest,node)
//=================================================
{
	river_item(dest,node,'river_group_create');
	var html= " "+node.object.name;
	$("#object-"+node.id).html(html)
}

//=================================================
function river_object_status_create(dest,node)
//=================================================
{
	river_item(dest,node,'river_object_status_create');
	var html= "<div>"+transcodeText(node.object.description)+"</div>";
	$("#content-"+node.id).html($(html))
}

//=================================================
function river_object_messageboard_create(dest,node)
//=================================================
{
	river_item(dest,node,'river_object_messageboard_create');
	var html= " "+node.object.name;
	$("#object-"+node.id).html(html)
}


//=================================================================================================
//=================================================================================================
//==========================================  THE WIRE  ===========================================
//=================================================================================================
//=================================================================================================

//==================================
function getWall(destid,groupid,tabid)
//==================================
{
	var url = '';
	if(elgg_url_absolute!='')
		url = elgg_url_absolute;
	else
		url = "../../../../"+elgg_url_base;
	url += "services/api/rest/xml/?method=group.thewire.get_posts&auth_token="+g_elgg_key+"&limit=50";
	if (groupid!=null)
		url += "&container_guid="+groupid;
	if (tabid==null)
		tabid = 'public';
	$.ajax({
		Accept: "text/html",
		dataType : "json",
		type : "GET",
		url : url,
		success : function(data) {
				displayWall("#"+destid,data,tabid);
		}
	});
}

//=================================================
function displayGroupWalls(destid)
//=================================================
{
	$("#"+destid).html("");
	for (var i=0; i<g_elgg_user_groups.length; i++) {
		var html = "<div class='group-label'>"+g_elgg_user_groups[i].name+"</div>";
		html += "<div id='group-"+i+"' class='group-posts'></div>";
		$("#"+destid).append($(html));
		getWall('group-'+i,g_elgg_user_groups[i].guid,'groups');
	}
}



//=================================================
function displayWall(dest,data,tabid)
//=================================================
{
	if (data.status==-1)
		$(dest).html("<div class='empty-wall'>"+snStr[LANG]['empty-wall']+"</div>");
	else {
		$(dest).html("");
		for (var i=0;i<data.result.length;i++) {
			display_post(dest,data.result[i],tabid);
		}
	}
}

//=================================================
function displayGroupList(destid)
//=================================================
{
	var url = elgg_url_absolute+"services/api/rest/xml/?method=auth.cas&redir=/groups/profile/";
	$("#"+destid).html("");
	for (var i=0; i<g_elgg_user_groups.length; i++) {
		var html = "";
		html += "<li><a target='_blank' href='"+url+g_elgg_user_groups[i].guid+"'>"+g_elgg_user_groups[i].name+"</a></li>";
		$("#"+destid).append($(html));
	}
}


//=================================================
function display_post(dest,node,tabid)
//=================================================
{
	try {
		var date = moment(node.time_created);
		var html ="";
		html+= "<li class='elgg-item'>";
		html+= "<div class='elgg-image-block elgg-river-item clearfix'>";
		html+= "	<div class='elgg-image'>";
		html+= "		<div class='elgg-avatar elgg-avatar-small'>";
		html+= "			<img src='"+node.owner.avatar_url+"'>";
		html+= "		</div>";
		html+= "	</div>";
		html+= "	<div class='elgg-body'>";
		html+= "		<div class='media'>";
		html+= "			<div class='media-left'>";
		html+= "			</div>";
		html+= "			<div class='media-body'>";
		html+= "				<h5 class='media-heading'>";
		//----------------------------------
		if (node.owner.guid==g_elgg_userid) // test if owner
			html+= "					<i class='fa fa-times fa-lg' onclick=\"deleteWire('"+node.guid+"')\"></i> ";
		if (node.num_likes!='0')
			html += "				<span class='likes'>&nbsp;"+node.num_likes+"</span>";
		html+= "					<i class='fa fa-thumbs-o-up fa-lg' onclick=\"likeEntity('"+node.guid+"')\"></i> ";
		html+= "					<span id='plus-"+tabid+node.guid+"' onclick=\"toggleComments('"+tabid+node.guid+"')\" class='fa fa-plus fa-lg' style='display:none'></span> ";
		html+= "					<span class='repondre' onclick=\"toggleReplyBox('"+node.guid+"','groups')\">Répondre</span> ";
		//----------------------------------
		html+= "					<span class='elgg-river-subject'>"+node.owner.name+"</span> ";
		html+= 						snStr[LANG]['river_object_status_create'];
		html+= " 					<span class='elgg-river-timestamp'><acronym title='"+date.format('LLL')+"'>"+date.fromNow()+"</acronym></span>";
		html+= "				</h5>";
		html+= "				<div>"+transcodeText(node.description)+"</div>";
		if (node.object!=undefined && node.object.comments!=undefined) {
			html+= "<div id='comments-"+tabid+node.guid+"' class='elgg-river-comments' style='display:none'>";
			html+= "<ul class='elgg-list elgg-river-comments'>";
			for (var i=0;i<node.object.comments.length;i++) {
				html += getComments(node.object.comments[i]);
			}
			html+= "</ul>";
			html+= "</div>";
		}
		html+= "				<div id='"+tabid+"-reply-"+node.guid+"' style='display:none'></div>";
		html+= "			</div><!-- class='media-body' -->";
		html+= "		</div><!-- class='media' -->";
		html+= "	</div><!-- class='elgg-body' -->";
		html+= "</div><!-- class='elgg-image-block elgg-river-item clearfix' -->";
		html+= "</li>";
		$(dest).append($(html));
		//------------ if there are comments we show them
		if (node.object!=undefined && node.object.comments!=undefined)
			$("#plus-"+tabid+node.guid).show();
	} catch(e) {
		var nop = null;
		//alert("une erreur s'est produite dans l'affichage du post:"+node.guid+" - "+e)
	}
}


//=================================================================================================
//=================================================================================================
//==========================================  THE MESSAGES  =======================================
//=================================================================================================
//=================================================================================================

//==================================
function getNumberUnreadMessages(destid)
//==================================
{
	var url = "../../../../"+elgg_url_base+"services/api/rest/xml";
	var data = "auth_token="+g_elgg_key+"&method=messages.count_unread";
	$.ajax({
		Accept: "json",
		dataType : "json",
		type : "GET",
		url : url,
		data : data,
		success : function(data) {
			displayNumberUnreadMessages("#"+destid,data);
		},
		error : function(jqxhr,textStatus) {
			alert("getRiverFeed : Oups! "+jqxhr.responseText);
		}
	});
	
}

//=================================================
function displayNumberUnreadMessages(dest,data)
//=================================================
{
	$(dest).html("");
	$(dest).html(data.result);
}


