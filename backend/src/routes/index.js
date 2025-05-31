const route = require('express').Router()
const MiddlewareAuth = require('../middlewares/auth')
const RouteFeed = require('./feed')
const RouteAuth = require('./auth')

route.use('/auths', RouteAuth)
route.use('/feed', MiddlewareAuth.authentication, RouteFeed)

module.exports = route