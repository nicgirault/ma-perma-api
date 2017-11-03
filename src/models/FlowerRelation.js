const { FLOWER_RELATION_TYPES } = require('../config/constants')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Relation', {
    type: {
      type: DataTypes.ENUM(FLOWER_RELATION_TYPES),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'flower_relation'
  })

  Model.associate = (models) => {
    Model.belongsTo(models.Flower, {
      foreignKey: {
        allowNull: false
      },
      as: 'flowerA'
    })
    Model.belongsTo(models.Flower, {
      foreignKey: {
        allowNull: false
      },
      as: 'flowerB'
    })
  }

  return Model
}
