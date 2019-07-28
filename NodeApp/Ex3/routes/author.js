// author.js - Author route module
let express = require('express');
let articleServices = require('../services/articleServices');
let router = express.Router();

router.post('/', function (req, res) {
    	articleServices.extractArticleAuthorNames(req, function(err, response) {
        if (err)
            res.status(500).send('error: ' + err);
        else
            res.send(response);
    });


});

module.exports = router;