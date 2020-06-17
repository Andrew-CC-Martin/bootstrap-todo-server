module.exports = (sequelize, DataTypes) => {
  const todos = sequelize.define('todos', {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, {})
  todos.associate = (models) => {
    // associations can be defined here
    todos.belongsTo(models.user, {
      foreignKey: 'userId',
    })
  }
  return todos
}
