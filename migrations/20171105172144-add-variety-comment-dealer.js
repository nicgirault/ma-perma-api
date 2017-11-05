module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'variety',
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
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        imageUrl: {
          type: Sequelize.STRING,
          allowNull: false
        },
        flowerId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'flower',
            key: 'id',
            allowNull: false
          }
        }
      }
    )
    .then(() => {
      return queryInterface.addIndex(
        'variety',
        ['flowerId', 'name'],
        {
          indicesType: 'UNIQUE'
        }
      )
    })
    .then(() => {
      return queryInterface.createTable(
        'comment',
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
          owner: {
            type: Sequelize.STRING,
            allowNull: false
          },
          text: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          varietyId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'variety',
              key: 'id',
              allowNull: false
            }
          }
        }
      )
    })
    .then(() => {
      return queryInterface.createTable(
        'dealer',
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
          name: {
            type: Sequelize.STRING,
            allowNull: false
          },
          url: {
            type: Sequelize.STRING,
            allowNull: false
          },
          price: {
            type: Sequelize.STRING
          },
          varietyId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'variety',
              key: 'id',
              allowNull: false
            }
          }
        }
      )
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('dealer')
    .then(() => queryInterface.dropTable('comment'))
    .then(() => queryInterface.dropTable('variety'))
  }
}
