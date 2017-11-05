const createError = require('http-errors')
const { validationResult } = require('express-validator/check')

const { Flower, FlowerProperty } = require('../models')
const RelationService = require('../services/relation')

module.exports.create = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  return Flower.create({
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    imageUrl: req.body.imageUrl
  })
  .then((flower) => res.status(201).json(flower))
  .catch((err) => {
    if (err.name === 'SequelizeUniqueConstraintError') return next(createError.BadRequest('FLOWER_ALREADY_EXISTS'))
    next(err)
  })
}

module.exports.addProperty = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  return FlowerProperty.create({
    flowerId: req.params.flowerId,
    propertyId: req.body.propertyId,
    value: req.body.value
  })
  .then((flowerProperty) => res.status(201).json(flowerProperty))
  .catch((err) => {
    if (
      err.name === 'SequelizeForeignKeyConstraintError' &&
      err.index === 'flower_property_propertyId_fkey'
    ) return next(createError.NotFound('PROPERTY_NOT_FOUND'))
    if (
      err.name === 'SequelizeForeignKeyConstraintError' &&
      err.index === 'flower_property_flowerId_fkey'
    ) return next(createError.NotFound('FLOWER_NOT_FOUND'))
    if (err.name === 'SequelizeUniqueConstraintError') return next(createError.BadRequest('FLOWER_PROPERTY_ALREADY_EXISTS'))
    next(err)
  })
}

module.exports.delete = (req, res, next) => {
  return Flower.destroy({where: {id: req.params.flowerId}})
  .then(() => res.json())
  .catch((err) => next(err))
}

module.exports.get = (req, res, next) => {
  return Flower.findAll({order: [['name', 'ASC']]})
  .then((flowers) => res.json(flowers))
  .catch((err) => next(err))
}

module.exports.getById = (req, res, next) => {
  return Promise.all([
    Flower.findById(req.params.flowerId, {include: [{
      association: 'properties',
      include: 'property'
    }, 'varieties']}),
    RelationService.getRelatedFlowersId(req.params.flowerId)
  ])
  .then(([flower, relations]) => {
    if (!flower) return next(createError.NotFound('FLOWER_NOT_FOUND'))
    res.json(Object.assign(flower.toJSON(), {relations: relations}))
  })
  .catch((err) => next(err))
}

module.exports.patch = (req, res, next) => {
  return Flower.findById(req.params.flowerId)
  .then((flower) => {
    if (!flower) return next(createError.NotFound('FLOWER_NOT_FOUND'))
    if (req.body.name) flower.name = req.body.name
    if (req.body.description) flower.description = req.body.description
    if (req.body.imageUrl) flower.imageUrl = req.body.imageUrl
    return flower.save()
  })
  .then((flower) => res.json(flower))
  .catch((err) => next(err))
}
