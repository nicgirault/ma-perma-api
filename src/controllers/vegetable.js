const { Vegetable, VegetableCategory } = require('../models')
const { validationResult } = require('express-validator/check')

module.exports.create = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  return Vegetable.create({
    name: req.body.name,
    category: req.body.categoryId,
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

module.exports.createCategory = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  return VegetableCategory.create({label: req.body.label})
  .then(() => res.status(201).send())
  .catch((err) => next(err))
}

module.exports.getCategories = (req, res, next) => {
  return VegetableCategory.findAll()
  .then((categories) => res.send(categories))
  .catch((err) => next(err))
}
