module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('VegetableCategory', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'vegetable_category'
  })

  return Model
}
