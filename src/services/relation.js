const { Relation, Sequelize } = require('../models')

module.exports.getRelatedFlowersId = (flowerId) => {
  const Op = Sequelize.Op
  return Relation.findAll({
    where: {
      [Op.or]: [
        {flowerAId: flowerId},
        {flowerBId: flowerId}
      ]
    }
  })
}

module.exports.validateUnicity = (flowerAId, flowerBId) => {
  const Op = Sequelize.Op

  if (flowerAId === flowerBId) throw new Error('CANNOT_ASSOCIATE_TO_ITSELF')
  return Relation.findAll({
    where: {
      [Op.or]: [
        {flowerAId: flowerAId},
        {flowerBId: flowerAId}
      ]
    }
  })
  .then((relations) => {
    relations.forEach((relation) => {
      if (
        (
          relation.flowerAId === parseInt(flowerAId, 10) &&
          relation.flowerBId === flowerBId
        ) ||
        (
          relation.flowerAId === flowerBId &&
          relation.flowerBId === parseInt(flowerAId, 10)
        )
      ) {
        throw new Error('RELATION_ALREADY_EXISTS')
      }
    })

    return true
  })
}
