const { FLOWER_TYPES } = require('../config/constants')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Flower', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imageUrl: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(FLOWER_TYPES)
    }
  }, {
    tableName: 'flower'
  })

  Model.associate = (models) => {
    Model.hasMany(models.FlowerProperty, {
      as: 'properties',
      foreignKey: 'flowerId'
    })
  }

  return Model
}
