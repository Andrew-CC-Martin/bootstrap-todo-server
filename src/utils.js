const validateEmail = (email) => /\S+@\S+\.\S+/.test(email)

module.exports = {
  validateEmail,
}
