const logger = require('../services/logger')

module.exports = (err, req, res, next) => {
  logger.error(err)
  if (res.headersSent) {
    return next(err)
  }

  if (!err.statusCode) {
    return next(err)
  }

  err.json = {
    code: err.message,
    data: err.meta
  }
  res.status(err.statusCode).json(err.json)
}
