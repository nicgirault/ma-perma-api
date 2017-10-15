module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('VegetableCategory', {
    label: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'vegetable_category'
  })

  return Model
}
