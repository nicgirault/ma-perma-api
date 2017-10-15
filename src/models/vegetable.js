module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Vegetable', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'vegetable'
  })

  return Model
}
