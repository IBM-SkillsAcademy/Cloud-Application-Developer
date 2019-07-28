const http = require('http');
const https = require('https');

var portNumber = process.env.VCAP_APP_PORT || 8080;
	const server = http.createServer(handleRequests);
	server.listen(portNumber, function() {
	});

function handleRequests(userRequest, userResponse) {
	userResponse.writeHead(200, {'Content-Type': 'text/plain'});
	const inputData = JSON.stringify({
        "model_id": "en-es",
        "text": "Hello"
    })
	var outputData = '';
	var vcap_services = JSON.parse(process.env.VCAP_SERVICES);
	const username = 'apikey';
	const password = vcap_services.language_translator[0].credentials.apikey;

	const options = {
        hostname: 'gateway.watsonplatform.net',
        path: '/language-translator/api/v3/translate?version=2018-05-01',
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
           userResponse.end(outputData);
        });
 	});
	languageTranslatorRequest.write(inputData);
	languageTranslatorRequest.end();	
}
