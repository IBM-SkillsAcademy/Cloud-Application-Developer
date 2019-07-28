import { Promise } from 'es6-promise';
const watson = require('watson-developer-cloud');
import winston from 'winston';
import config from '../config';

export class EnrichmentPipeline {
  static getInstance() {
    if (this.enrichmentPipeline === undefined) {
      this.enrichmentPipeline = new EnrichmentPipeline();
    }
    return this.enrichmentPipeline;
  }

  static enrichmentPipeline;

  LOGGER = winston.createLogger({
    level: config.log_level,
    transports: [
      new winston.transports.Console({ format: winston.format.simple() })
    ]
  });

  nlu;
  toneAnalyzer;

  //configuring nlu parameters to be sent to the nlu analyze api
  nluParams = {
    features: {
      emotion: {},
      sentiment: {},
      entities: {
        emotion: false,
        sentiment: false,
        limit: 2
      },
      keywords: {
        emotion: false,
        sentiment: false,
        limit: 2
      }
    }
  };

  toneParams = {};

  constructor() {
    //init nlu apis
    //if local environment, it reads credentials by default from .env file
    // NATURAL_LANGUAGE_UNDERSTANDING_IAM_APIKEY and NATURAL_LANGUAGE_UNDERSTANDING_URL
    this.nlu = new watson.NaturalLanguageUnderstandingV1({
      version: '2018-03-16'
    });

    //init tone analyzer api,
    // if local environment it reads the credentials by default from .env file,
    // TONE_ANALYZER_IAM_APIKEY and TONE_ANALYZER_URL
    this.toneAnalyzer = new watson.ToneAnalyzerV3({
      version: '2017-09-21'
    });
  }

  //send the text through the enrichment pipeline to analyze it
  // it extracts the keywords and sentiment from nlu enrichment
  // then extracts the emotional tone from tone analuzer enrichment
  enrich(text) {
    return new Promise((resolve, reject) => {
      try {
        const enrichmentPromises = [
          this.nluEnrichment(text),
          this.toneEnrichment(text)
        ];
        Promise.all(enrichmentPromises)
          .then(enrichments => {
            const response = {};
            for (const e of enrichments) {
              const ets = e;
              response[Object.keys(e)[0]] = ets[Object.keys(e)[0]];
            }
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  nluEnrichment(text) {
    return new Promise((resolve, reject) => {
      try {
        this.nluParams.text = text;
        this.nluParams.language = 'en';
        this.nlu.analyze(this.nluParams, (err, success) => {
          if (err) {
            this.LOGGER.error('NLU: ' + err);
            return reject('NLU: ' + err);
          }
          resolve({ nlu: success });
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  toneEnrichment(text) {
    return new Promise((resolve, reject) => {
      try {
        this.toneParams.text = text;
        this.toneParams.sentences = false;
        this.toneAnalyzer.tone(this.toneParams, (err, success) => {
          if (err) {
            this.LOGGER.error('Tone: ' + err);
            return reject('Tone: ' + err);
          }
          resolve({ tone: success });
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}
