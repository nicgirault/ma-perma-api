module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'vegetable',
      'imageUrl',
      {
        type: Sequelize.STRING
      }
    )
    .then(() => {
      return queryInterface.addIndex(
        'vegetable',
        ['name'],
        {
          indexName: 'uniqueNameIndex',
          indicesType: 'UNIQUE'
        }
      )
    })
    .then(() => {
      return queryInterface.addIndex(
        'vegetable_category',
        ['label'],
        {
          indexName: 'uniqueLabelIndex',
          indicesType: 'UNIQUE'
        }
      )
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('vegetable', 'uniqueNameIndex')
    .then(() => queryInterface.removeConstraint('vegetable_category', 'uniqueLabelIndex'))
    .then(() => queryInterface.removeColumn('vegetable', 'imageUrl'))
  }
}
