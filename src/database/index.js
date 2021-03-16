const Sequelize = require('sequelize')
const config = require("../config/database")
const Product = require('../models/Product')
const User = require('../models/User') 

const connection = new Sequelize(config)

User.init(connection)
Product.init(connection)
Product.associate(connection.models)

module.exports = connection;