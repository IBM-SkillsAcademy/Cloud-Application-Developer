import express from 'express';
// import { Request, Response } from 'express';
import logger from '../util/Logger';
// import { CloudantDAO } from '../dao/CloudantDAO';

export class AnalysisRoute {
  router = express.Router();
  cloudantDAO;

  constructor(cloudantDAO) {
    this.routes();
    this.cloudantDAO = cloudantDAO;
  }

  routes() {
    this.router.get('/', (req, res) => {
      res.status(200).send({
        message: 'Hello There! Welcome to the Cognitive Social App!'
      });
    });

    this.router.get('/sentimentOverTime', (req, res) => {
      this.cloudantDAO.sentimentOvertime((err, result) => {
        if (err) {
          logger.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(result);
        }
      });
    });

    this.router.get('/sentimentTrend', (req, res) => {
      this.cloudantDAO.sentimentTrend((err, result) => {
        if (err) {
          logger.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(result);
        }
      });
    });

    this.router.get('/sentimentSummary', (req, res) => {
      this.cloudantDAO.sentimentSummary((err, result) => {
        if (err) {
          logger.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(result);
        }
      });
    });

    this.router.get('/keywordsSummary', (req, res) => {
      this.cloudantDAO.keywordsSummary((err, result) => {
        if (err) {
          logger.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(result);
        }
      });
    });

    this.router.get('/emotionalToneOvertime', (req, res) => {
      this.cloudantDAO.emotionalToneOvertime((err, result) => {
        if (err) {
          logger.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(result);
        }
      });
    });

    this.router.get('/listByPostDate', (req, res) => {
      const skip = Number(req.query.skip);
      const limit = Number(req.query.limit);
      this.cloudantDAO.listByPostDate(skip, limit, (err, result) => {
        if (err) {
          logger.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(result);
        }
      });
    });
  }
}
