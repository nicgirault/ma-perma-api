const { Vegetable, VegetableCategory } = require('../models')
const { validationResult } = require('express-validator/check')

module.exports.create = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  return Vegetable.create({
    name: req.body.name,
    category: req.body.categoryId
  })
  .then(() => res.status(201).send())
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
