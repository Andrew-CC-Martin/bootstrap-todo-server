const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const usersRouter = require('./routes/users')
const todosRouter = require('./routes/todos')
const wakeupRouter = require('./routes/wakeup')

const app = express()

// Allow cross-origin requests
app.use(cors())
// support parsing of application/json type post data
app.use(bodyParser.json())
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', usersRouter)
app.use('/todos', todosRouter)
app.use('/wakeup', wakeupRouter)

module.exports = app
