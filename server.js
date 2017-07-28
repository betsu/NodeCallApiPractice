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
            var data = result['records']['location'];
            var location = data[0]['parameter'];
            var weather = data[0]['weatherElement'];
            var city = location.findIndex(function(item, index){
                return item['parameterName'] == 'CITY'
            });
            var town = location.findIndex(function(item, index){
                return item['parameterName'] == 'TOWN'
            });
            var temp = weather.findIndex(function(item, index){
                return item['elementName'] == 'TEMP'
            });

            data.forEach(function(value, index){
                var cityName = value['parameter'][city]['parameterValue'];
                var townName =  value['parameter'][town]['parameterValue'];
                var tempValue = value['weatherElement'][temp]['elementValue'];
                if(cityName == '臺北市'){
                    console.log("臺北市 "+ townName +" 溫度 " + tempValue +" 度")
                }
            });
    	})
    }).end();
};

get();