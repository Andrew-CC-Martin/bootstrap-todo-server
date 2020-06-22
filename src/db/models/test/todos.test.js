const models = require('../index')
const todoFactory = require('../../factories/todo-factory')

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

  it('can create a todo', async () => {
    const response = await todoFactory()

    expect(response).toEqual(
      expect.objectContaining({
        text: expect.any(String),
        isDone: expect.any(Boolean),
        id: expect.any(Number),
        userId: expect.any(Number),
      }),
    )
  })
})
