const _ = require('lodash')
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
        .map((association) => association.vegetableAId === vegetableId ? association.vegetableBId : association.vegetableAId),
      negativeAssociations: _.filter(associations, (association) => !association.isPositive)
        .map((association) => association.vegetableAId === vegetableId ? association.vegetableBId : association.vegetableAId)
    }
  })
}
