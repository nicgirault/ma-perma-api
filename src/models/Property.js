const { PROPERTY_TYPES } = require('../config/constants')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Property', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM(PROPERTY_TYPES),
      allowNull: false
    }
  }, {
    tableName: 'property'
  })

  return Model
}
