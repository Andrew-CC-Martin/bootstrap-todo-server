const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { Sequelize, DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const config = require('./src/db/config/config.json')
const todoModel = require('./src/db/models/todos')
const userModel = require('./src/db/models/users')
const { appConfig } = require('./src/constants')
const { validateEmail } = require('./src/utils')

const app = express()

const port = process.env.PORT || appConfig.DEFAULT_PORT
const env = process.env.NODE_ENV || appConfig.DEFAULT_ENVIRONMENT

const {
  database, username, password, host,
} = config[env]

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

const Todo = todoModel(sequelize, DataTypes)

const User = userModel(sequelize, DataTypes)

// Allow cross-origin requests
app.use(cors())
// support parsing of application/json type post data
app.use(bodyParser.json())
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }))

app.put('/users/add', async (req, res) => {
  const { body: { email, fullName, rawPassword } } = req

  const validEmail = validateEmail(email)
  // todo - validate password

  if (validEmail) {
    const salt = await bcrypt.genSalt()
    const encryptedPassword = await bcrypt.hash(rawPassword, salt)
    try {
      const { id } = await User.create({ email, fullName, password: encryptedPassword })

      const jsonWebToken = await jwt.sign(
        { userId: id },
        process.env.SECRET,
      )
      res.send({ jsonWebToken })
    } catch (err) {
      console.log('couldn\'t create user. err.message:', err.message)
      res.status(500).send({
        message: `couldn't create user: ${err.message}`,
      })
    }
  }

  if (!validEmail) {
    res.status(500).send({
      message: 'couldn\'t create user: invalid email',
    })
  }
})

app.post('/users/login', async (req, res) => {
  const { body: { email, rawPassword } } = req
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    })

    const match = await bcrypt.compare(rawPassword, user.password)

    if (match) {
      // generate jwt
      const jsonWebToken = await jwt.sign(
        { userId: user.id },
        process.env.SECRET,
      )
      res.send({ jsonWebToken })
    }
  } catch (err) {
    res.status(500).send({
      message: `couldn't log in: ${err.message}`,
    })
  }
})

app.post('/todos/add', async (req, res) => {
  const { headers: { authorization }, body: { todoInput } } = req

  try {
    const { userId } = await jwt.verify(authorization, process.env.SECRET)

    const result = await Todo.create({ text: todoInput, userId, isDone: false })
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: `couldn't create todo: ${err.message}`,
    })
  }
})

app.put('/todos/update/:id', async (req, res) => {
  const { headers: { authorization }, body: { todoInput, isDone }, params: { id } } = req

  try {
    const { userId } = await jwt.verify(authorization, process.env.SECRET)

    await Todo.update({ text: todoInput, isDone }, {
      where: {
        id,
        userId,
      },
    })

    res.sendStatus(200)
  } catch (err) {
    res.status(500).send({
      message: `couldn't update todo: ${err.message}`,
    })
  }
})

app.delete('/todos/delete/:id', async (req, res) => {
  const { headers: { authorization }, params: { id } } = req

  try {
    const { userId } = await jwt.verify(authorization, process.env.SECRET)

    await Todo.destroy({
      where: {
        id,
        userId,
      },
    })

    res.sendStatus(200)
  } catch (err) {
    res.status(500).send({
      message: `couldn't delete todo: ${err.message}`,
    })
  }
})

app.get('/todos', async (req, res) => {
  const { headers: { authorization } } = req

  try {
    const { userId } = await jwt.verify(authorization, process.env.SECRET)

    const todos = await Todo.findAll({
      where: {
        userId,
      },
      order: [
        ['id', 'ASC'],
      ],
    })

    res.send({ todos })
  } catch (err) {
    res.status(500).send({
      message: `couldn't get todos: ${err.message}`,
    })
  }
})

app.listen(port)
console.log(`Listening on port: ${port}`)
