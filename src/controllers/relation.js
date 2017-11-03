const createError = require('http-errors')
const { Relation } = require('../models')
const { validationResult } = require('express-validator/check')

module.exports.get = (req, res, next) => {
  return Relation.findAll()
  .then((relations) => res.status(200).json(relations))
  .catch((err) => next(err))
}

module.exports.delete = (req, res, next) => {
  return Relation.destroy({where: {id: req.params.relationId}})
  .then(() => res.status(200).send())
  .catch((err) => next(err))
}

module.exports.post = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  return Relation.create({
    flowerAId: req.body.flowerAId,
    flowerBId: req.body.flowerBId,
    type: req.body.type
  })
  .then(() => res.status(201).json())
  .catch((err) => {
    if (err.name === 'SequelizeUniqueConstraintError') return next(createError.BadRequest('RELATION_ALREADY_EXISTS'))
    next(err)
  })
}
