const createError = require('http-errors')
const { validationResult } = require('express-validator/check')

const { Comment } = require('../models')

module.exports.create = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() })
  }

  return Comment.create({
    owner: req.body.owner,
    varietyId: req.body.varietyId,
    text: req.body.text
  })
  .then((comment) => res.status(201).json(comment))
  .catch((err) => {
    if (
      err.name === 'SequelizeForeignKeyConstraintError'
    ) return next(createError.NotFound('VARIETY_NOT_FOUND'))
    next(err)
  })
}
