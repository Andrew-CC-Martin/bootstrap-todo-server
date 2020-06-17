module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {})
  users.associate = (models) => {
    // associations can be defined here
    users.hasMany(models.todos, {
      foreignKey: 'userId',
    })
  }
  return users
}
