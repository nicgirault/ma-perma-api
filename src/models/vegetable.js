module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Vegetable', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'vegetable'
  })

  Model.associate = (models) => {
    Model.belongsTo(models.VegetableCategory, {
      foreignKey: {
        allowNull: false
      },
      as: 'category'
    })
  }

  return Model
}
