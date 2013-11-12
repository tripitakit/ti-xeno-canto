/* 
 * app.js
 *
 * TiXenoCanto usage example 
 * Appcelerator Titanium Titanium porting of xeno-canto.js
 * (https://npmjs.org/package/xeno-canto)
 *
 * CommonJS module consuming xeno-canto webservices api 2.0 
 * (http://xeno-canto.org/)
 *
 * @Copyright (c) 2013 Patrick De Marta
 * @Licensed under the terms of the GNU GPL.
 */

'use strict'

/** Example of usage */

var TiXenoCanto = require('lib/ti-xeno-canto');
var ti_xeno_canto = new TiXenoCanto();

/** for the complete list of query properties see
	https://npmjs.org/package/xeno-canto */
var query = {
	name:'orthonyx',
	country: 'papua',
	location: 'tari'
};

var win = Ti.UI.createWindow({
	backgroundColor:'white',
	layout: 'vertical',
});
var textArea = Ti.UI.createTextArea({
	scrollable: true,
});
win.add(textArea);
win.addEventListener('open', function(){
	ti_xeno_canto.search(query, function(self){
		textArea.setValue(self.entity);
	});
});
win.open();