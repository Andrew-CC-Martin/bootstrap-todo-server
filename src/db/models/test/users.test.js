const models = require('../index')
const userFactory = require('../../factories/user-factory')

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
    const response = await userFactory()

    expect(response).toEqual(
      expect.objectContaining({
        email: expect.stringContaining('@'),
        fullName: expect.any(String),
        password: expect.any(String),
        id: expect.any(Number),
      }),
    )
  })
})
