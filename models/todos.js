module.exports = (sequelize, DataTypes) => {
  const todos = sequelize.define('todos', {
    text: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {})
  todos.associate = (_models) => {
    // associations can be defined here
  }
  return todos
}
