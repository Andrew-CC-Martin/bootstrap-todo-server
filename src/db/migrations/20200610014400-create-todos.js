module.exports = {
  up: (queryInterface, Sequelize) => (queryInterface.createTable('todos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    text: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  })
  ),
  down: (queryInterface, _Sequelize) => queryInterface.dropTable('todos'),
}
