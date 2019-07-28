import express from 'express';
import { TweeterListener } from '../service/TweeterListener';

export class TweeterRoute {
  router = express.Router();
  tweeterListener;

  constructor(enrichmentPipeline) {
    this.routes();
    const twitOptions = {};
    this.tweeterListener = TweeterListener.getInstance(
      twitOptions,
      enrichmentPipeline
    );
  }

  routes() {
    this.router.get('/', (req, res) => {
      res.status(200).send({
        message: 'Hello Tweet!'
      });
    });

    this.router.get('/status', (req, res) => {
      const status = this.tweeterListener.getStatus();
      res.status(200).send({
        status
      });
    });
  }
}
