module.exports = (sequelize, DataTypes) => {
  const todos = sequelize.define('todos', {
    text: {
      type: DataTypes.STRING,
      unique: true,
    }
  }, {})
  todos.associate = function(models) {
    // associations can be defined here
  }
  return todos
}
