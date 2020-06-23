const app = require('./src/app')
const { appConfig } = require('./src/constants')

const port = process.env.PORT || appConfig.DEFAULT_PORT

app.listen(port)
console.log(`Listening on port: ${port}`)
