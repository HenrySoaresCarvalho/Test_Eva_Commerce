const express = require('express')
const UserController = require('./controllers/UserController')

const routes = express.Router()

routes.post("/user/register",UserController.store)
routes.post("/user/login",UserController.user_login)

module.exports = routes