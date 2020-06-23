const express = require('express')

const router = express.Router()

//  endpoint used to wake up the free heroku server (which sleeps afer 15min of inactivity)
router.get('/', (_req, res) => {
  res.send('app awake')
})

module.exports = router
