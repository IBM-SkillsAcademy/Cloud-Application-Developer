let port = process.env.VCAP_APP_PORT || 8080;
let path = require('path');
let bodyParser = require('body-parser');


//Express Web Framework, and create a new express server
let express = require('express'),
	app = express();
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//Routes modules
let index = require('./routes'),
    author = require('./routes/author');
	
//In case the caller access any URI under the root /, call index route
app.use('/', index);

//In case the caller access any URI under /author, call author route
app.use('/author', author);


// start server on the specified port and binding host
app.listen(port);
