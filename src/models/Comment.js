module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Comment', {
    owner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'comment'
  })

  Model.associate = (models) => {
    Model.belongsTo(models.Variety, {
      as: 'variety'
    })
  }

  return Model
}
