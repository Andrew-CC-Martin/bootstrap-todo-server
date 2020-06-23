const supertest = require('supertest')

const models = require('../../db/models/index')
const app = require('../../app')
const { sampleUser: { samplePassword, sampleFullName } } = require('../../constants')

const request = supertest(app)

describe('user creation page', () => {
  beforeAll(async () => {
    await models.sequelize.sync()
  })

  beforeEach(async () => {
    await models.todos.destroy({ truncate: { cascade: true } })
    await models.users.destroy({ truncate: { cascade: true } })
  })

  afterAll(async () => {
    await models.sequelize.close()
  })

  it('can create a user', async () => {
    const { statusCode } = await request.put('/users/add')
      .send({ email: 'cool@email.com', rawPassword: samplePassword, fullName: sampleFullName })

    expect(statusCode).toBe(200)
  })

  it('cant create a user without a name', async () => {
    const { statusCode } = await request.put('/users/add')
      .send({ email: 'cool@email.com', rawPassword: samplePassword })

    expect(statusCode).toBe(500)
  })

  it('cant create a user with an invalid email', async () => {
    const { statusCode } = await request.put('/users/add')
      .send({ email: 'bademail.com', rawPassword: samplePassword })

    expect(statusCode).toBe(500)
  })

  it('returns a json web token', async () => {
    const { text } = await request.put('/users/add')
      .send({ email: 'cool@email.com', rawPassword: samplePassword, fullName: sampleFullName })

    const { jsonWebToken } = JSON.parse(text)

    expect(jsonWebToken).toEqual(expect.stringContaining('eyJhb'))
  })
})
