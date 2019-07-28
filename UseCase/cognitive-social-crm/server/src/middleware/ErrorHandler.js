import logger from '../util/Logger';

export function errorHandler(error, req, res, next) {
  logger.error('Error: ', error);
  res.json({ error });
}
