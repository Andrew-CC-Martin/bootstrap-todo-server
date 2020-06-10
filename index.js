const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Sequelize, DataTypes } = require('sequelize')

const config = require('./database/config/config.json');
const todoModel = require('./database/models/todos')
const { appConfig } = require('./constants')

const app = express()

const env = process.env.NODE_ENV || appConfig.DEFAULT_ENVIRONMENT;
const { database, username, password, host } = config[env]

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: 'postgres'
})

sequelize.authenticate()
  .then(console.log('Connection to database has been established successfully'))
  .catch(error => console.log('Unable to connect to the database: ', error))

const Todo = todoModel(sequelize, DataTypes)

// Allow cross-origin requests
app.use(cors())
// support parsing of application/json type post data
app.use(bodyParser.json())
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/todos/add', async (req, res) => {
  const { body: { todoInput } } = req

  try {
    const result = await Todo.create({ text: todoInput })
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: `couldn't create todo: ${err.message}`
    })
  }
})

app.delete('/todos/delete/:id', async (req, res) => {
  const { params: { id } } = req

  try {
    await Todo.destroy({ 
      where: {
        id
      }
    })

    res.sendStatus(200)
  } catch (err) {
    res.status(500).send({
      message: `couldn't delete todo: ${err.message}`
    })
  }
})

app.get('/todos', async (_req, res) => {
  const todos = await Todo.findAll()

  res.send({ todos })
})


const port = process.env.PORT || '4000'
app.listen(port)
console.log(`Listening on port: ${port}`)
