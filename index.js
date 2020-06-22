const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const { appConfig } = require('./src/constants')
const usersRouter = require('./src/routes/users')
const todosRouter = require('./src/routes/todos')
const wakeupRouter = require('./src/routes/wakeup')

const app = express()

const port = process.env.PORT || appConfig.DEFAULT_PORT

// Allow cross-origin requests
app.use(cors())
// support parsing of application/json type post data
app.use(bodyParser.json())
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/users', usersRouter)
app.use('/todos', todosRouter)
app.use('/wakeup', wakeupRouter)

app.listen(port)
console.log(`Listening on port: ${port}`)
