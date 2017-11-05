module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Variety', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'variety'
  })

  Model.associate = (models) => {
    Model.belongsTo(models.Flower, {
      as: 'flower'
    })
    Model.hasMany(models.Comment, {
      as: 'comments',
      foreignKey: 'varietyId'
    })
    Model.hasMany(models.Dealer, {
      as: 'dealers',
      foreignKey: 'varietyId'
    })
  }

  return Model
}
