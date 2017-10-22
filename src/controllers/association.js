const createError = require('http-errors')
const { Association } = require('../models')
const { validationResult } = require('express-validator/check')

module.exports.post = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  return Association.create({
    vegetableAId: req.params.vegetableId,
    vegetableBId: req.body.vegetableIdToAssociate,
    isPositive: req.body.isPositive
  })
  .then(() => res.status(201).send())
  .catch((err) => {
    if (err.name === 'SequelizeUniqueConstraintError') return next(createError.BadRequest('ASSOCIATION_ALREADY_EXISTS'))
    next(err)
  })
}

module.exports.get = (req, res, next) => {
  return Association.findAll()
  .then((associations) => res.status(200).send(associations))
  .catch((err) => next(err))
}

module.exports.delete = (req, res, next) => {
  return Association.findById(req.params.associationId)
  .then((association) => {
    if (!association) throw createError.NotFound('ASSOCIATION_NOT_FOUND')
    return association.destroy()
  })
  .then(() => res.status(200).send())
  .catch((err) => next(err))
}
