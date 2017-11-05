module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Dealer', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'dealer'
  })

  Model.associate = (models) => {
    Model.belongsTo(models.Variety, {
      as: 'variety'
    })
  }

  return Model
}
