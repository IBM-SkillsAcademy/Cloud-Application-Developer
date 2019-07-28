require('dotenv').config();

const express = require('express');
let env = JSON.parse(process.env.VCAP_SERVICES);
const app = express();
const port = process.env.PORT || 5001;
const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  iam_apikey: env["tone_analyzer"][0]["credentials"]["apikey"] ,
  url: 'https://gateway-lon.watsonplatform.net/tone-analyzer/api'
});
const cors = require('cors');

app.use(cors());
app.use(express.json());

// create a GET route
// create a GET route
app.get('/tone', async (req, res) => {
    let parameters = {
        tone_input: { 'text': req.query.text },
        content_type: 'application/json'
    };

    try {
        const toneAnalysis = await toneAnalyzer.tone(parameters);
        res.send(toneAnalysis);
    } catch (error) {
        console.log(error);
        res.status(error.code).send(error);
    }
});

// log your server is running and the port
app.listen(port, () => console.log(`Listening on port ${port}`));