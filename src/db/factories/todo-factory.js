const faker = require('faker')
const models = require('../models/index')
const userFactory = require('./user-factory')

/**
 * Generate an object which container attributes needed
 * to successfully create a todo instance.
 *
 * @param  {Object} props Properties to use for the todo.
 *
 * @return {Object} object to build the todo from.
 */
const data = async (props = {}) => {
  const { dataValues: { id } } = await userFactory()
  const defaultProps = {
    text: faker.random.words(),
    isDone: faker.random.boolean(),
    userId: id,
  }
  return { ...defaultProps, ...props }
}

/**
 * Generates a todo instance from the properties provided.
 *
 * @param  {Object} props Properties to use for the todo.
 *
 * @return {Object} A todo instance
 */
const createTodo = async (props = {}) => models.todos.create(await data(props))

module.exports = createTodo
