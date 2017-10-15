module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'vegetable_category',
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
          allowNull: false,
          unique: true
        }
      }
    ).then(() => {
      return queryInterface.createTable(
        'vegetable',
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
            allowNull: false,
            unique: true
          },
          imageUrl: {
            type: Sequelize.STRING,
            allowNull: false
          },
          categoryId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'vegetable_category',
              key: 'id',
              allowNull: false
            }
          }
        }
      )
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('vegetable')
    .then(() => queryInterface.dropTable('vegetable_category'))
  }
}
