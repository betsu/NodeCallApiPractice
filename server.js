var http = require('http');
var extServerOptions = {
    hostname: 'opendata.cwb.gov.tw',
    path: '/api/v1/rest/datastore/O-A0001-001',
    headers : {
        "Authorization" : 'CWB-0DE53F3F-5D5E-4432-897B-3733B4CDFF3E'
    },
    method: 'GET'
};
var rawData = '';

function get() {
    http.request(extServerOptions, function (response) {
    	response.setEncoding('utf8');
    	response.on('data', function(chunk){
    		rawData += chunk;
    	})
    	response.on('end', function(chunk){
    		var result = JSON.parse(rawData);
    		
    	})
    }).end();
};
 
get();