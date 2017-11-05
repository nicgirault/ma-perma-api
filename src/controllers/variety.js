const createError = require('http-errors')
const { validationResult } = require('express-validator/check')

const { Variety } = require('../models')

module.exports.create = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  return Variety.create({
    name: req.body.name,
    flowerId: req.body.flowerId,
    imageUrl: req.body.imageUrl
  })
  .then((flower) => res.status(201).json(flower))
  .catch((err) => {
    if (err.name === 'SequelizeUniqueConstraintError') return next(createError.BadRequest('VARIETY_ALREADY_EXISTS'))
    next(err)
  })
}

module.exports.getById = (req, res, next) => {
  Variety.findById(req.params.varietyId, {include: ['comments', 'dealers']})
  .then((variety) => {
    if (!variety) return next(createError.NotFound('VARIETY_NOT_FOUND'))
    res.json(variety)
  })
  .catch((err) => next(err))
}
