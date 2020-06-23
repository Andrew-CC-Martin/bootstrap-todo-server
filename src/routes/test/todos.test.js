const supertest = require('supertest')

const models = require('../../db/models/index')

const app = require('../../app')
const { sampleUser: { samplePassword, sampleFullName } } = require('../../constants')

const request = supertest(app)

describe('src > routes > test > todos', () => {
  let token

  beforeAll(async () => {
    await models.sequelize.sync()
  })

  beforeEach(async () => {
    await models.todos.destroy({ truncate: { cascade: true } })
    await models.users.destroy({ truncate: { cascade: true } })

    const { text } = await request.put('/users/add')
      .send({ email: 'cool@email.com', rawPassword: samplePassword, fullName: sampleFullName })

    const { jsonWebToken } = JSON.parse(text)
    token = jsonWebToken
  })

  afterAll(async () => {
    await models.todos.destroy({ truncate: { cascade: true } })
    await models.users.destroy({ truncate: { cascade: true } })
    await models.sequelize.close()
  })

  it('can add a todo', async () => {
    const { statusCode } = await request.post('/todos/add')
      .set('Authorization', token)
      .send({ todoInput: 'do stuff' })

    expect(statusCode).toBe(200)
  })

  it('creates todo with isDone false', async () => {
    const { body } = await request.post('/todos/add')
      .set('Authorization', token)
      .send({ todoInput: 'do stuff' })

    expect(body.isDone).toBe(false)
  })
})
