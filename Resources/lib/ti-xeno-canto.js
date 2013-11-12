/* 
 * ti-xeno-canto.js
 *
 * TiXenoCanto
 * Appcelerator Titanium porting of node.js xeno-canto
 * (https://npmjs.org/package/xeno-canto)
 *
 * CommonJS module consuming xeno-canto webservices api 2.0 
 * (http://xeno-canto.org/)
 *
 * @Copyright (c) 2013 Patrick De Marta
 * @Licensed under the terms of the GNU GPL.
 *
 * Version 0.0.2
 */


/** @constructor */
function TiXenoCanto(){
	this.entity = {};
};

/** Instance methods */

/** Search for name of advanced options*/
TiXenoCanto.prototype.search = function(query, success){
	if (!!query) {
		var url = 'http://www.xeno-canto.org/api/recordings.php?query=';

		// Duck-typing args
		if (typeof(query) === 'string') {
	
			// Normal query search name in English, Latin, Family latin
			url = url + query;	 

		} else if (typeof(query) === 'object')  {
			// Advanced search with query properties (=params)
			var getCoords = function() {
				if (!!query.coords) {
					if (!!query.coords.lat && !! query.coords.lon) {
						return 'lat:' + query.coords.lat + 'lon:' + query.coords.lon
					} else if (!!query.coords.box) {
						/** TODO box coordinates*/
					};
				};
			};
		
			var params_string = '';
			var params = [
				{ name:"" },
				{ genus: 'gen:' },
				{ recordist: 'rec:' },
				{ country: 'cnt:' },
				{ location: 'loc:' },
				{ remarks: 'rmk:' },
				{ coords: getCoords() },
				{ also:'also:' },
				{ type: 'type:' },
				{ nr: "nr:" },
				{ quality: 'q:' },
				{ qualitylt: 'q<:' },
				{ area: 'area:' }
			];

			params.map(function(p){
				var key = Object.keys(p)[0];
				if (!!query[key]) {
					params_string = params_string + p[key] + query[key] + " ";
				};
			});
				url = url + params_string;
			};

		// Make the request
		get(this, url, success);

	} else {
		throw("Null Query Error.")
	}
};

/** private */
function get(that, url, success){
	var xhr = Ti.Network.createHTTPClient({
	    onload: function() {
			that.entity = JSON.parse(this.responseText);
	        success(that);
	    },
	    onerror: function(e) {
	        Ti.API.debug(e.error);
	    },
	    timeout : 5000
	});
 	xhr.open("GET", url);
	xhr.send();
}


module.exports = TiXenoCanto;
