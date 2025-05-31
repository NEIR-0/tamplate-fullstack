const route = require('express').Router()
const ControllerAuth = require('../controllers/auth')

route.post('/', ControllerAuth.login)
route.post('/register', ControllerAuth.register)

module.exports = route