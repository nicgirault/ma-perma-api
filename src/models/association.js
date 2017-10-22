module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Association', {
    isPositive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'vegetable_association'
  })

  Model.associate = (models) => {
    Model.belongsTo(models.Vegetable, {
      foreignKey: {
        allowNull: false
      },
      as: 'vegetableA'
    })
    Model.belongsTo(models.Vegetable, {
      foreignKey: {
        allowNull: false
      },
      as: 'vegetableB'
    })
  }

  return Model
}
