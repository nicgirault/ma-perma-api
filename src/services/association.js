const _ = require('lodash')
const createError = require('http-errors')
const { Association, Sequelize } = require('../models')

module.exports.getAssociatedVegetablesId = (vegetableId) => {
  const Op = Sequelize.Op
  return Association.findAll({
    where: {
      [Op.or]: [
        {vegetableAId: vegetableId},
        {vegetableBId: vegetableId}
      ]
    }
  })
  .then((associations) => {
    return {
      positiveAssociations: _.filter(associations, (association) => association.isPositive)
        .map((association) => association.vegetableAId === parseInt(vegetableId) ? association.vegetableBId : association.vegetableAId),
      negativeAssociations: _.filter(associations, (association) => !association.isPositive)
        .map((association) => association.vegetableAId === parseInt(vegetableId) ? association.vegetableBId : association.vegetableAId)
    }
  })
}

module.exports.validateUnicity = (vegetableAId, vegetableBId) => {
  const Op = Sequelize.Op

  if (vegetableAId === vegetableBId) throw new Error('CANNOT_ASSOCIATE_TO_ITSELF')
  return Association.findAll({
    where: {
      [Op.or]: [
        {vegetableAId: vegetableAId},
        {vegetableBId: vegetableAId}
      ]
    }
  })
  .then((associations) => {
    associations.forEach((association) => {
      if (
        (
          association.vegetableAId === parseInt(vegetableAId, 10) &&
          association.vegetableBId === vegetableBId
        ) ||
        (
          association.vegetableAId === vegetableBId &&
          association.vegetableBId === parseInt(vegetableAId, 10)
        )
      ) {
        throw new Error('ASSOCIATION_ALREADY_EXISTS')
      }
    })

    return true
  })
}
