const { validateEmail } = require('./utils')

describe('src > utils > validateEmail', () => {
  const validEmail = 'cool@email.com'
  const invalidEmail = 'banana'

  it('identifies valid emails', () => {
    expect(validateEmail(validEmail)).toEqual(true)
  })

  it('identifies invalid emails', () => {
    expect(validateEmail(invalidEmail)).toEqual(false)
  })
})
