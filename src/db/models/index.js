const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const { appConfig } = require('../../constants')

const env = process.env.NODE_ENV || appConfig.DEFAULT_ENVIRONMENT

const config = require('../config/config.json')[env]

const basename = path.basename(__filename)
const db = {}

const {
  database, username, password, host,
} = config

// Connect sequelize ORM to database
// checks if env is Heroku, if so, sets sequelize to utilize the database hosted on heroku
let sequelize
if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
  })
} else {
  sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'postgres',
  })
}

sequelize.authenticate()
  .then(console.log('Connection to database has been established successfully'))
  .catch((error) => console.log('Unable to connect to the database: ', error))

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
