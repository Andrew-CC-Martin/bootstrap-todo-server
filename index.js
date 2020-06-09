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

app.get('/hello', async (_req, res) => {
  res.send({
    result: "hello node",
  })
})

const port = process.env.PORT || '4000'
app.listen(process.env.PORT || '4000')
console.log(`Listening on port: ${port}`)
