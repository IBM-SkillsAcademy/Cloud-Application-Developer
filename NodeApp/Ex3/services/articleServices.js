// Watson Natural Language Understanding third party module
//Specify the release for the Natural Language Understanding service
let NaturalLanguageUnderstandingV1 =
require('watson-developer-cloud/natural-language-understanding/v1.js');
let natural_language_understanding = new NaturalLanguageUnderstandingV1({
  version: '2018-11-16',
  iam_apikey: SET_YOUR_APIKEY,
url: 'https://gateway-lon.watsonplatform.net/natural-language-understanding/api'
}); 
//error message for missing URL
const MISSING_URL_ERROR = 'URL not passed';


/*
 * Call Watson NLU Service to extract the list of author names for the requested article URL 
*/
exports.extractArticleAuthorNames = function(req , callback){
	//If the url is not passed, return error to the caller
	if(req===null||req.body===null||req.body.url===null){
		callback(MISSING_URL_ERROR,null);
		return;
	}
	// url is the parameter passed in the POST request to /author
// It contains the URL of the article
// The metadata feature returns the author, title, and publication date. 
    var parameters = {
        'url': req.body.url,
        'features': {
            'metadata': {}
        }
    };

// Call the Watson service and return the list of authors
    natural_language_understanding.analyze(parameters,  function(err, response) {
        if (err)
            callback(err,null);
        else
            callback(null,response.metadata.authors);
    });





};
