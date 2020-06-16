module.exports = (sequelize, DataTypes) => {
  const todos = sequelize.define('todos', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
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
