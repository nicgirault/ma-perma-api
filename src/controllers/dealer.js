const createError = require('http-errors')
const { validationResult } = require('express-validator/check')

const { Dealer } = require('../models')

module.exports.create = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  return Dealer.create({
    name: req.body.name,
    url: req.body.url,
    varietyId: req.body.varietyId,
    price: req.body.price
  })
  .then((comment) => res.status(201).json(comment))
  .catch((err) => {
    if (
      err.name === 'SequelizeForeignKeyConstraintError'
    ) return next(createError.NotFound('VARIETY_NOT_FOUND'))
    next(err)
  })
}
