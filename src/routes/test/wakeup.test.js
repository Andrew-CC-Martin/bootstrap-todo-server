const supertest = require('supertest')

const app = require('../../app')
const models = require('../../db/models/index')

const request = supertest(app)

describe('user creation page', () => {
  beforeAll(async () => {
    await models.sequelize.sync()
  })

  afterAll(async () => {
    await models.sequelize.close()
  })

  it('can wake up app', async () => {
    const { res: { text } } = await request.get('/wakeup')
    expect(text).toBe('app awake')
  })
})
