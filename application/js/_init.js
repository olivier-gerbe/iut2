//----------------------------------
var application_version = "1.0";
var application_date = "2015-11-04";
//----------------------------------
var appliname = 'iut2';
//----------------------------------
//=== eportfolium
var elgg_url_base = '../../../elgg112/';
var elgg_url_absolute = '';
var elgg_auth_cas = false;
//=== IUT 2
//var elgg_url_base = 'elgg/';
//var elgg_url_absolute = 'http://eportfolio.iut2.upmf-grenoble.fr/elgg/';
//var elgg+auth_cas = false;

var elgg_installed = true;
var g_elgg_refreshing = 120000; // 120s 
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

//=== eportfolium
var bckname = '';
var serverBCK = "iut2-backend/rest/api";
var serverFIL = "iut2-backend";
var serverVER = "iut2-backend";

/*
//=== IUT 2
var bckname = '-iut2';
var serverBCK = "karuta-backend"+bckname+"/rest/api";
var serverFIL = "karuta-backend"+bckname;
var serverVER = "karuta-backend"+bckname;
*/
//----------------------------------
var technical_support = "help.karuta@gmail.com";
