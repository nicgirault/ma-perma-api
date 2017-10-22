module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'vegetable_association',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        vegetableAId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'vegetable',
            key: 'id',
            allowNull: false
          },
          unique: 'association_vegetables'
        },
        vegetableBId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'vegetable',
            key: 'id',
            allowNull: false
          },
          unique: 'association_vegetables'
        },
        isPositive: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        }
      }
    ).then(() => {
      return queryInterface.addIndex(
        'vegetable_association',
        ['vegetableAId', 'vegetableBId'],
        {
          indicesType: 'UNIQUE'
        }
      )
    }).then(() => {
      return queryInterface.addColumn(
        'vegetable',
        'sowingPeriod',
        {
          type: Sequelize.STRING
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'vegetable',
        'harvestPeriod',
        {
          type: Sequelize.STRING
        }
      )
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('vegetable_association')
    .then(() => queryInterface.removeColumn('vegetable', 'sowingPeriod'))
    .then(() => queryInterface.removeColumn('vegetable', 'harvestPeriod'))
  }
}
