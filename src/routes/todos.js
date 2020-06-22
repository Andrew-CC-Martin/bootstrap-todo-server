const express = require('express')
const jwt = require('jsonwebtoken')

const models = require('../db/models/index')

const router = express.Router()

router.get('/', async (req, res) => {
  const { headers: { authorization } } = req

  try {
    const { userId } = await jwt.verify(authorization, process.env.SECRET)

    const todos = await models.todos.findAll({
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

router.post('/add', async (req, res) => {
  const { headers: { authorization }, body: { todoInput } } = req

  try {
    const { userId } = await jwt.verify(authorization, process.env.SECRET)

    const result = await models.todos.create({ text: todoInput, userId, isDone: false })
    res.send(result)
  } catch (err) {
    res.status(500).send({
      message: `couldn't create todo: ${err.message}`,
    })
  }
})

router.put('/update/:id', async (req, res) => {
  const { headers: { authorization }, body: { todoInput, isDone }, params: { id } } = req

  try {
    const { userId } = await jwt.verify(authorization, process.env.SECRET)

    await models.todos.update({ text: todoInput, isDone }, {
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

router.delete('/delete/:id', async (req, res) => {
  const { headers: { authorization }, params: { id } } = req

  try {
    const { userId } = await jwt.verify(authorization, process.env.SECRET)

    await models.todos.destroy({
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

module.exports = router
