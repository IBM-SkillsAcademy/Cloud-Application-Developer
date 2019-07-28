// index.js - Index route module
let express = require('express');
let router = express.Router();

//Provides utilities for dealing with directories
let path = require('path');

// Home page route
router.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;
