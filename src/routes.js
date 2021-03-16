const express = require('express')
const ProductController = require('./controllers/ProductController')
const UserController = require('./controllers/UserController')

const routes = express.Router()

routes.post("/user/register",UserController.store)
routes.post("/user/login",UserController.user_login)

routes.post("/product/register",UserController.authenticator,ProductController.store)
routes.get("/product",ProductController.get_all_products)
routes.get("/product/:id",ProductController.get_product_by_id)

module.exports = routes