module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('FlowerProperty', {
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'flower_property'
  })

  Model.associate = (models) => {
    Model.belongsTo(models.Flower, {
      foreignKey: {
        allowNull: false
      },
      as: 'flower'
    })
    Model.belongsTo(models.Property, {
      foreignKey: {
        allowNull: false
      },
      as: 'property'
    })
  }

  return Model
}
