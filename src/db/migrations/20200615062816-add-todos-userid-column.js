module.exports = {
  up: (queryInterface, Sequelize) => (
    queryInterface.addColumn('todos', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    })
  ),

  down: (queryInterface, _Sequelize) => (
    queryInterface.removeColumn('todos', 'userId')
  ),
}
