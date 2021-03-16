const express = require('express')
const ProductController = require('./controllers/ProductController')
const UserController = require('./controllers/UserController')

const routes = express.Router()

routes.post("/user/register",UserController.store)
routes.post("/user/login",UserController.user_login)

routes.post("/product/register",UserController.authenticator,ProductController.store)

module.exports = routes