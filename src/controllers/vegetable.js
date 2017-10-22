const { Vegetable, VegetableCategory } = require('../models')
const AssociationService = require('../services/association')
const { validationResult } = require('express-validator/check')

module.exports.create = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  return Vegetable.create({
    name: req.body.name,
    categoryId: req.body.categoryId,
    imageUrl: req.body.imageUrl
  })
  .then(() => res.status(201).send())
  .catch((err) => next(err))
}

module.exports.get = (req, res, next) => {
  return Vegetable.findAll({include: 'category'})
  .then((vegetables) => res.send(vegetables))
  .catch((err) => next(err))
}

module.exports.getById = (req, res, next) => {
  return Promise.all([
    Vegetable.findById(req.params.vegetableId, {include: ['category']}),
    AssociationService.getAssociatedVegetablesId(req.params.vegetableId)
  ])
  .then(([vegetable, associations]) => res.send(Object.assign(vegetable.toJSON(), associations)))
  .catch((err) => next(err))
}

module.exports.createCategory = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  return VegetableCategory.create({name: req.body.name})
  .then(() => res.status(201).send())
  .catch((err) => next(err))
}

module.exports.getCategories = (req, res, next) => {
  return VegetableCategory.findAll()
  .then((categories) => res.send(categories))
  .catch((err) => next(err))
}
