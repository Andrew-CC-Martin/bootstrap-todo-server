const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

// Allow cross-origin requests
app.use(cors())
// support parsing of application/json type post data
app.use(bodyParser.json())
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/todos', async (_req, res) => {
  const todos = [
    {
      id: 0,
      text: 'buy milk',
    },
    {
      id: 1,
      text: 'go to post office',
    },
    {
      id: 2,
      text: 'do laundry',
    },
  ]
  res.send({ todos })
})

const port = process.env.PORT || '4000'
app.listen(port)
console.log(`Listening on port: ${port}`)
