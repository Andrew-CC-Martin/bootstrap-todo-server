module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.addColumn('todos', 'isDone', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    })
  ),

  down: (queryInterface, _Sequelize) => queryInterface.removeColumn('todos', 'isDone'),
}
