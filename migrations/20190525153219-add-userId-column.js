'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Records',
      'userId',
      {
        type: Sequelize.INTEGER,
      },
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Records', 'userId', {})
  },
}
