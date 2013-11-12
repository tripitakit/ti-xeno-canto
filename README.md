#TiXenoCanto

Appcelerator Titanium CommonJS HttpClient interface module for
xeno-canto webservices api 2.0 (http://xeno-canto.org/). 

Ti porting of node.js xeno-canto module (https://npmjs.org/package/xeno-canto).

**Easy simple/advanced searches against xeno-canto database.**

"The service provides a database of bird song and sound recordings contributed 
and maintained by enthusiasts worldwide.It provides access to search the
connection and play or download recordings and to submit new recordings.
Discussion forums encourage interactions among members of the birding community 
to exchange information about bird song and related topics.

API methods support search against the database by specifying the formal Latin 
name of a bird species. Returned data provide listings of all recordings 
maintained by the service for that species, either with or without URLs for
audio and still image files, or optionally a request can retrieve a single
representative recording. Methods also provide summary statistics about
listings relevant to the species named in the request." 


## Installation
Copy ti-xeno-canto.js in your Resources/lib, or another location of your choice.

(The following example will assume the module installed in Resources/lib).

## Usage example

app.js
```javascript

/** Require the constructor and create a new search instance object */
var TiXenoCanto = require('lib/ti-xeno-canto');
var ti_xeno_canto = new TiXenoCanto();

/** Define a simple query using a string with the english common name */
var simple_search = "bearded bellbird";

/** Define an advanced query using an object with some query properties.
    Complete list of query properties: https://npmjs.org/package/xeno-canto */
var advanced_search = {
	name:'orthonyx',
	country: 'papua',
	location: 'tari'
};

/** Switch test for simple/advanced search examples */
var query = simple_search; //advanced_search

/** Minimal UI  */
var win = Ti.UI.createWindow({
	backgroundColor:'white',
	layout: 'vertical',
});

var textArea = Ti.UI.createTextArea({
	scrollable: true,
});

win.add(textArea);

win.addEventListener('open', function(){
	
	/** search! */
	ti_xeno_canto.search(query, function(self){
	
		/** the callback receive a reference of the TiXenoCanto instance, 
		the response object is stored in the instance variable 'entity' */
		textArea.setValue(self.entity);
	});
});

win.open();
```



##Response Properties

- numRecordings: the total number of recordings found for this query
- numSpecies: the total number of species found for this query
- page: the page number of the results page that is being displayed
- numPages: the total number of pages available for this query
- recordings: an array of recording objects, described in detail below


##Recording object properties

- id: the catalogue number of the recording on xeno-canto
- gen: the generic name of the species
- sp: the specific name of the species
- en: the English name of the species
- rec: the name of the recordist
- cnt: the country where the recording was made
- loc: the name of the locality
- lat: the latitude of the recording in decimal coordinates
- lng: the longitude of the recording in decimal coordinates
- type: the sound type of the recording (e.g. 'call', 'song', etc). This is generally a comma-separated list of sound types.
- file: the URL to the audio file
- lic: the URL describing the license of this recording
- url: the URL specifying the details of this recording


##Advanced search parameters##

* name [string]  commong english name, scientific name, or family latin name
* genus [string] 
* recordist [string] recordist name
* country [string] 
* location: [string]
* remarks: [string]
* coords: [object] {lat [string], lon [string]}
* also: [string]
* type: [string]
* nr: [string] catalog number 
* quality: [string]
* qualitylt: [string] quality less than
* area: [string]
```

## API Reference
###[npm: xeno-canto](https://npmjs.org/package/xeno-canto)


### License
Copyright (c) 2013 Patrick De Marta  
Licensed under the [GNU GPL license](http://www.gnu.org/licenses/) .


