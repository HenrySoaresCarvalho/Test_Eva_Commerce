const express = require('express')
const ProductController = require('./controllers/ProductController')
const UserController = require('./controllers/UserController')

const routes = express.Router()

routes.post("/user/register",UserController.store)
routes.post("/user/login",UserController.user_login)
routes.get("/user/:id",UserController.get_user)
routes.get("/user",UserController.get_all_users)

routes.post("/product/register",UserController.authenticator,ProductController.store)
routes.get("/product",UserController.authenticator,ProductController.get_all_products)
routes.get("/product/:id",UserController.authenticator,ProductController.get_product_by_id)
routes.delete("/product/:id",UserController.authenticator,ProductController.remove_product)

module.exports = routes
