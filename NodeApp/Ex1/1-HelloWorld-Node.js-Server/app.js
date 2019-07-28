var http = require("http");

// Read the port from the underlying environment. 
// If not exist, use the default port: 8080
var port = process.env.VCAP_APP_PORT || 8080;

// Create the server and listen to requests on the specified port.
http.createServer(function (request, response) {
	// Set the content type of the response
	response.writeHead(200, {'Content-Type': 'text/plain'});
	
	// Write a simple Hello World message,
	// which will be shown in the user's web browser
	response.end('Hello NodeJS!');   


}).listen(port);

