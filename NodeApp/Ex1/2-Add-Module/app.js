var http = require("http");
var dateModule = require('./currentDate');

// Read the port from the underlying environment. 
// If not exist, use the default port: 8080
var port = process.env.VCAP_APP_PORT || 8080;

// Create the server and listen to requests on the specified port.
http.createServer(function (request, response) {
	// Set the content type of the response
	response.writeHead(200, {'Content-Type': 'text/plain'});
	
	// Write a simple Hello World message appended with the current date
	response.end('Hello NodeJS! The time now is: ' + dateModule.currentDateTime());
   


}).listen(port);

