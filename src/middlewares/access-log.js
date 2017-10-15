const logger = require('../services/logger')
const _ = require('lodash')

module.exports = (req, res, next) => {
  logger.info(JSON.stringify({
    message: `[ACCESS] ${req.method} ${req.url}`,
    body: _.mapValues(req.body, (value, key) => {
      if (key === 'password') return 'xxx'
      return value
    }),
    headers: req.headers
  }))
  next()
}
