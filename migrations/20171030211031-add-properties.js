module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'property',
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
          unique: true,
          allowNull: false
        },
        type: {
          type: Sequelize.ENUM('CALENDAR', 'DESCRIPTION', 'USAGE', 'ENVIRONMENT'),
          allowNull: false
        }
      }
    )
    .then(() => {
      return queryInterface.createTable(
        'flower_property',
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
          propertyId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'property',
              key: 'id',
              allowNull: false
            }
          },
          flowerId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'flower',
              key: 'id',
              allowNull: false
            }
          },
          value: {
            type: Sequelize.STRING,
            allowNull: false
          }
        }
      )
    }).then(() => {
      return queryInterface.addIndex(
        'flower_property',
        ['flowerId', 'propertyId'],
        {unique: true}
      )
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('flower_property')
    .then(() => queryInterface.dropTable('property'))
  }
}
