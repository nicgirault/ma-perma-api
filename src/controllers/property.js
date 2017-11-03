const createError = require('http-errors')
const { validationResult } = require('express-validator/check')

const { Property } = require('../models')

module.exports.create = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  return Property.create({
    name: req.body.name,
    type: req.body.type
  })
  .then((property) => res.status(201).json(property))
  .catch((err) => {
    if (err.name === 'SequelizeUniqueConstraintError') return next(createError.BadRequest('PROPERTY_ALREADY_EXISTS'))
    next(err)
  })
}

module.exports.get = (req, res, next) => {
  return Property.findAll()
  .then((properties) => res.json(properties))
  .catch((err) => next(err))
}
