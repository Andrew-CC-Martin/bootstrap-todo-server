const faker = require('faker')

const models = require('../models/index')

/**
 * Generate an object which container attributes needed
 * to successfully create a user instance.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object} An object to build the user from.
 */
const data = async (props = {}) => {
  const defaultProps = {
    email: faker.internet.email(),
    fullName: faker.fake('{{name.lastName}}, {{name.firstName}} {{name.suffix}}'),
    password: faker.internet.password(),
  }
  return { ...defaultProps, ...props }
}

/**
 * Generates a user instance from the properties provided.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object} A user instance
 */
const createUser = async (props = {}) => models.users.create(await data(props))

module.exports = createUser
