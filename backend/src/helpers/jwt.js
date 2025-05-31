if(!process.env.NODE_ENV) {
  require('dotenv').config({path: '.env'})
}
const jwt = require('jsonwebtoken')

module.exports = {
  sign: function (payload, expiresIn = '24h', secret = process.env.JWT_SECRET) {
    return jwt.sign(payload, secret, {
      expiresIn
    })
  },
  verify: function (token, secret = process.env.JWT_SECRET) {
    try {
      const result = jwt.verify(token, secret)
      return result
    } catch (error) {
      return error
    }
  }
}