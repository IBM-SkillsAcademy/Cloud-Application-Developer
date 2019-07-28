// import { NextFunction, Request, Response } from 'express';
import express from 'express';
import path from 'path';
import { default as config, ENV } from '../config';
// import logger from '../util/Logger';

export class MiddleWare {
  static appMiddleware(app) {
    return (req, res, next) => {
      if (config.environment === ENV.prod) {
        app.use(express.static(path.join(__dirname, '../../../client')));
      }
      next();
    };
  }
}
