const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const models = require('../db/models/index')
const { validateEmail } = require('../utils')

const router = express.Router()

router.put('/add', async (req, res) => {
  const { body: { email, fullName, rawPassword } } = req

  const validEmail = validateEmail(email)
  // todo - validate password

  if (validEmail) {
    const salt = await bcrypt.genSalt()
    const encryptedPassword = await bcrypt.hash(rawPassword, salt)
    try {
      const { id } = await models.users.create({ email, fullName, password: encryptedPassword })

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

router.post('/login', async (req, res) => {
  const { body: { email, rawPassword } } = req
  try {
    const user = await models.users.findOne({
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

module.exports = router
