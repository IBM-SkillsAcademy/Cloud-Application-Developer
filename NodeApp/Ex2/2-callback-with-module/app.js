const http = require('http');
const translatorModule = require('./translator');

var portNumber = process.env.VCAP_APP_PORT || 8080;
	const server = http.createServer(handleRequests);
	server.listen(portNumber, function() {
	});

function handleRequests(userRequest, userResponse) {
	userResponse.writeHead(200, {'Content-Type': 'text/plain'});
	const inputData = JSON.stringify({
        "model_id": "en-es",
        "text": "Hello"
    });
    var callback = function(error, translatorOutput) {
		if (error) {
			userResponse.end(error);
		} else {
			userResponse.end('Translation output: ' + translatorOutput);
		}
	};  
    translatorModule.getTranslation(inputData, callback);	
}
