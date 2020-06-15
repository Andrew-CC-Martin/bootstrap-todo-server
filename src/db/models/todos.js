module.exports = (sequelize, DataTypes) => {
  const todos = sequelize.define('todos', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {})
  todos.associate = (models) => {
    // associations can be defined here
    todos.belongsTo(models.user, {
      foreignKey: 'user_id',
    })
  }
  return todos
}
