module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.addColumn('todos', 'user_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })
  ),

  down: (queryInterface, _Sequelize) => (
    queryInterface.removeColumn('todos', 'user_id')
  ),
}
