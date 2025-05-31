const route = require('express').Router()
const ControllerFeed = require('../controllers/feed')

route.get('/', ControllerFeed.list)

module.exports = route