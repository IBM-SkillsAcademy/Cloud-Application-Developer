const https = require('https');

exports.getTranslation = function getTranslation(inputData, callback) {
	var outputData = '';
	var vcap_services = JSON.parse(process.env.VCAP_SERVICES);
	const username = 'apikey';
	const password = vcap_services.language_translator[0].credentials.apikey;
	
	const options = {
		hostname: 'api.eu-gb.language-translator.watson.cloud.ibm.com',
		path: '/instances/87d327cb-31a6-4474-b687-3bd517ba8b17/v3/translate?version=2018-05-01',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Content-Length': inputData.length,
			'Authorization': 'Basic ' + Buffer.from(username + ':' + password).toString('base64')
	   }
	};
	
	const languageTranslatorRequest = https.request(options, function(languageTranslatorResponse) {
		languageTranslatorResponse.on('data', function(d) {
			outputData+=d;
		 });
	
		languageTranslatorResponse.on('end', function() {
		   callback(null, outputData);
		});
		
		languageTranslatorResponse.on('error', function(err) {
         callback(err, null);
 		});
	});
	languageTranslatorRequest.write(inputData);
	languageTranslatorRequest.end();
};
