//----------------------------------
var application_version = "1.0";
var application_date = "2015-11-04";
//----------------------------------
var appliname = 'iut2';
//----------------------------------
var karuta_site = 'eportfolium'; //-- eportfolium iut2 savoie
//---------
var bckname = '';
var serverBCK = "";
var serverFIL = "";
var serverVER = "";
//---------
var elgg_installed = false;
//---------
var elgg_url_base = '';
var elgg_url_absolute = 'http://eportfolio.iut2.upmf-grenoble.fr/elgg/';
var elgg_auth_cas = false;
var g_elgg_refreshing = 120000; // 120s 
//---------
if (karuta_site == 'eportfolium') {
	serverBCK = "iut2-backend/rest/api";
	serverFIL = "iut2-backend";
	serverVER = "iut2-backend";
	//---------
	elgg_url_base = '../../../elgg112/';
}
if (karuta_site == 'iut2') {
	bckname = '-iut2';
	serverBCK = "karuta-backend"+bckname+"/rest/api";
	serverFIL = "karuta-backend"+bckname;
	serverVER = "karuta-backend"+bckname;
	//---------
	elgg_url_base = 'elgg/';
	elgg_auth_cas = true;
}
//----------------------------------
var languages = [];
var languages_name = [];
languages [0] = 'fr';
languages_name ['fr'] = 'Français';
languages [1] = 'en';
languages_name ['en'] = 'English';
//----------------------------------
var NONMULTILANGCODE = 0;  // default language if non-multilingual
var LANGCODE = 0; //default value
var LANG = languages[LANGCODE]; //default value
//----------------------------------
var technical_support = "help.karuta@gmail.com";
