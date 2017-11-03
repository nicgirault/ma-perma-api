module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'flower_relation',
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
        flowerAId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'flower',
            key: 'id',
            allowNull: false
          }
        },
        flowerBId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'flower',
            key: 'id',
            allowNull: false
          }
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true
        },
        type: {
          type: Sequelize.ENUM('ASSOCIATE_WITH', 'DONT_ASSOCIATE_WITH', 'DONT_PRECEDE'),
          allowNull: false
        }
      }
    ).then(() => {
      return queryInterface.addIndex(
        'flower_relation',
        ['flowerAId', 'flowerBId'],
        {
          indicesType: 'UNIQUE'
        }
      )
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('flower_relation')
  }
}
